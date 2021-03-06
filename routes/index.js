var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var Web = require('../models/web.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.user);
  	res.render('index', {});
});

router.post('/signin', function(req, res) {
	var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username,function(err,user){
        if(!user){
            return res.send({"success": false,
            				"error": "USER DOES NOT EXIST"});
        }
        if(user.password!=password){
            return res.send({"success": false,
            				"error": "WRONG PASSWORD"});
        }
        req.session.user = user;
        return res.send({"success": true});
    });
});

router.post('/signup', function(req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name : req.body.username,
        password : password
    });

    User.get(newUser.name,function(err,user){
        if(user){
            err = "USERNAME ALREADY EXISTS";
        }
        if(err){
            return res.send({"success": false,
            				"error": err});
        }
        newUser.save(function(err){
            if(err){
                return res.send({"success": false,
            					"error": err});
            }
            return res.send({"success": true});
        });
    });
});

router.get("/signout", function(req,res){
    req.session.user = null;
    res.send({"success": true});
});

router.post("/addWeb",function(req,res){
    var currentUser = req.session.user;
    console.log(currentUser);
    var web = new Web(currentUser.name, req.body.url, req.body.webName, req.body.groupName);
    web.save(function(err){
        if(err){
            return res.send(err);
        }
        res.send('add successfully');
    });
});

router.post("/getUserWebs", function(req, res) {
	Web.get(req.session.user.name, function(err,webs){
   		if(err){
      		webs = [];
   		}
   		res.send(webs);
  	});
});

router.get("/getHotWebs", function(req, res) {
	var webs = [{"groupName": "Social",
				"webName": "新浪微博",
				"url": "http://weibo.com/"
				},
				{"groupName": "Social",
				"webName": "知乎",
				"url": "https://www.zhihu.com/"
				},
				{"groupName": "Social",
				"webName": "豆瓣",
				"url": "https://www.douban.com/"
				},
				{"groupName": "Coding",
				"webName": "Github",
				"url": "https://github.com/"
				},
				{"groupName": "Coding",
				"webName": "SegmentFault",
				"url": "https://segmentfault.com/"
				},
				{"groupName": "Coding",
				"webName": "React.js",
				"url": "http://reactjs.cn/"
				},
				{"groupName": "More",
				"webName": "SDCS",
				"url": "http://sdcs.sysu.edu.cn/"
				},
				{"groupName": "More",
				"webName": "百度",
				"url": "https://www.baidu.com/"
				},
				{"groupName": "More",
				"webName": "Google",
				"url": "https://www.google.com.hk/"
				}];
   	res.send(webs);
});

module.exports = router;
