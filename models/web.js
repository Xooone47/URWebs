var mongodb = require("./db");

function Web(username, url, webName, groupName, time, id){
    this.id = id;
    this.username = username;
    this.url = url;
    this.webName = webName;
    this.groupName = groupName;
    if (time) {
    	this.time = time;
    } else {
    	this.time = new Date();	
    }
};

Web.prototype.save = function save(callback){
    //存入Mongodb的文档
    var web = {
        username: this.username,
        url: this.url,
        webName: this.webName,
        groupName: this.groupName,
        time: this.time
    };

    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取posts集合
        db.collection('webs',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //为user属性添加索引
            collection.ensureIndex('username',function(err){
                //写入post文档
                collection.insert(web,{safe:true},function(err, web){
                    mongodb.close();
                    callback(err, web);
                });
            });
        });
    });
};

Web.get = function get(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取posts集合
        db.collection('webs',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //查找user属性为username的文档，如果username是null则全部匹配
            var query = {};
            if(username){
                query.username = username;
            }
            collection.find(query).sort({time:-1}).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    callback(err,null);
                }
                //封装posts为Post对象
                var webs = [];
                docs.forEach(function(doc,index){
                    var web = new Web(doc.username, doc.url, doc.webName, doc.groupName, doc.time, doc._id);
                    webs.push(web);
                });
                callback(null,webs);
            });
        });
    });
};

module.exports = Web;