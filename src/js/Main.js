// main.js
let React = require('../../node_modules/react');
let ReactDOM = require('../../node_modules/react-dom');
let $ = require('../../node_modules/jquery');
let redux = require('../../node_modules/redux');

let NavTop = React.createClass({
	slideBottom: function() {
		$(".navBottom").slideToggle();
	},
	render: function() {
		return (
			<div className="navTop">
				<a href="/" id="navLogo"><img src="/images/logo.png" alt="logo" /></a>
				<button id="UrWebs" onClick={this.slideBottom}>UrWeb</button>
			</div>
			);
	}
});

let NavBottom = React.createClass({
	getInitialState: function() {
    	return {
    		logIn: false,
    		logOrReg: true,	//true时显示登录框，false时显示注册框
    		username: '',
    		password: '',
    		passwordRepeat: ''
    	};
  	},
  	handleChoose: function(e) {	//处理切换登录、注册框
  		let speed = 250;
  		if (e.target.id == "chooseL") {	
  			if (!this.state.logOrReg) {	//切换到登录框
  				this.setState({logOrReg: true});
  				$(".reg").fadeToggle(speed, function() {
                    $(".log").fadeToggle(speed);
                });
  				$("#chooseL, #chooseR").toggleClass('selectedLR');
  			}
  		} else {
  			if (this.state.logOrReg) {	//切换到注册框
  				this.setState({logOrReg: false});
  				$(".log").fadeToggle(speed, function() {
                    $(".reg").fadeToggle(speed);
                });
  				$("#chooseL, #chooseR").toggleClass('selectedLR');	
  			}
  		}
  	},
  	handleLogin: function() {	//登录
  		var that = this;
  		console.log("login");
  		$.ajax({
  			url: '/signin',
  			type: 'POST',
  			data: {"username": this.state.username,
  					"password": this.state.password},
  			dataType: 'json',
  			success: function(data) {
  				if (data.success == true) {	
  					that.setState({logIn: true});
  					contentCom.setState({log: true});
  					contentCom.getUserWebs();	//让content组件获取用户数据
  					colWebsCom.setState({showWebs: "ALL"});
  				} else {
  					console.log(data.error);
  				}
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
  		});
  	},
  	handleSignup: function() {	//注册
  		var that = this;
  		console.log("signup");
  		$.ajax({
  			url: '/signup',
  			type: 'POST',
  			data: {"username": this.state.username,
  					"password": this.state.password},
  			dataType: 'json',
  			success: function(data) {
  				if (data.success == true) {	
  					that.setState({logIn: true});
  					contentCom.setState({log: true});
  					contentCom.getUserWebs();	//让content组件获取用户数据
  					colWebsCom.setState({showWebs: "ALL"});
  				} else {
  					console.log(data.error);
  				}
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
  		});
  	},
  	handleSignout: function() {	//登出
  		var that = this;
  		console.log("signout");
  		$.ajax({
  			url: '/signout',
  			type: 'GET',
  			data: {},
  			dataType: 'json',
  			success: function(data) {
  				if (data.success == true) {	
  					that.setState({logIn: false, logOrReg: true});
  					contentCom.setState({log: false});
  					contentCom.getHotWebs();	//让content组件获取公共数据
  					colWebsCom.setState({showWebs: "ALL"});
  				}
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
  		});
  	},
  	inputChange: function(e) {	//处理登录、注册框输入改变
  		if (e.target.name == "username") {
  			this.setState({username: e.target.value});
  		} else if (e.target.name == "password") {
  			this.setState({password: e.target.value});
  		} else if (e.target.name == "password-repeat") {
  			this.setState({passwordRepeat: e.target.value});
  			if (this.state.password != e.target.value) {
  				$("#notMatch").css('display', 'block');
  				$("#regSub").attr('disabled', true);
  			} else {
  				$("#notMatch").css('display', 'none');
  				$("#regSub").attr('disabled', false);
  			}
  		}
  	},
	render: function() {
		let username = this.state.username,
			password = this.state.password,
			passwordRepeat = this.state.passwordRepeat;
		if (!this.state.logIn) {
			return (
				<div className="navBottom">
					<div className="chooseLR">
                        <a href="#signin" id="chooseL" className="selectedLR" onClick={this.handleChoose}>SIGN IN</a>
                        <a href="#signup" id="chooseR" onClick={this.handleChoose}>SIGN UP</a>
                    </div>
                    <div className="log">
                        <div className="login">
                            <input type="text" name="username" placeholder="USERNAME" maxLength="14" value={username} onChange={this.inputChange} required />
                            <input type="password" name="password" placeholder="PASSWORD" maxLength="14" value={password} onChange={this.inputChange} required />
                            <input type="submit" value="SIGN IN" id="logSub" onClick={this.handleLogin}/>
                        </div>
                    </div>
                    <div className="reg">
                        <div className="register">
                            <input type="text" name="username" placeholder="USERNAME" maxLength="14" value={username} onChange={this.inputChange} required />
                            <input type="password" name="password" placeholder="PASSWORD" maxLength="14" value={password} onChange={this.inputChange} required />
                            <input type="password" name="password-repeat" placeholder="PASSWORD AGAIN" maxLength="14" value={passwordRepeat} onChange={this.inputChange} required />
                            <span id="notMatch">Passwords do not match!</span>
                            <input type="submit" value="SIGN UP" id="regSub" onClick={this.handleSignup}/>
                        </div>
                    </div>
				</div>
				);
		} else {
			return (
				<div className="navBottom">
					<span id="welcomeTag">Hi, {this.state.username}</span>
					
					<button id="signOut" onClick={this.handleSignout}>SIGN OUT</button>
				</div>
				);
		}		
	}
});

let NavContainer = React.createClass({
	render: function() {
		return (
			<div className="navContainer">
				<NavTop/>
				<NavBottom/>
			</div>
			);
	}
});

let menuCom;
let Menu = React.createClass({
	getInitialState: function() {
		return {
			dist: []
		}
	},
	addWeb: function() {
		let that = this;
		let url = $("#addWebUrl").val();
		let webName = $("#addWebName").val();
		let groupName = $("#addWebGroup").val();
		// console.log(url, webName, groupName);
		if (url == "" || webName == "" || groupName == "") {
			console.log("fail to add web");
			return;
		}
  		$.ajax({
  			url: '/addWeb',
  			type: 'POST',
  			data: {url: url,
  				webName: webName,
  				groupName: groupName
  				},
  			// dataType: 'json',
  			success: function(data) {
  				console.log(data);
  				contentCom.getUserWebs();
  				that.resetWeb();
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
  		});
  	},
  	resetWeb: function() {
  		$("#addWebUrl").val("");
  		$("#addWebName").val("");
  		$("#addWebGroup").val("");
  	},
  	handleDist: function(e) {
  		colWebsCom.setState({showWebs: e.target.innerHTML});
  	},
	render: function() {
		menuCom = this;
		let that = this;
		let distList = this.state.dist.map(function(distItem, index) {
			return (<li key={index} className="distItem lis" onClick={that.handleDist}>{distItem}</li>)
		})
		return (
			<div id="Menu">
				<div id="addWebContainer">
					<span id="addWebHead">ADD WEB</span>
					<input type="text" id="addWebUrl" className="addWebInput" placeholder="URL" required/>
					<input type="text" id="addWebName" className="addWebInput" placeholder="WEB NAME" required/>
					<input type="text" id="addWebGroup" className="addWebInput" placeholder="GROUP" required/>
					<button id="addWebBtn" className="menuBtn" onClick={this.addWeb}>CONFIRM</button>
					<button id="resetWebBtn" className="menuBtn" onClick={this.resetWeb}>RESET</button>
				</div>
				<ul id="webDist">
					<li className="distItem lis" onClick={this.handleDist}>ALL</li>
					{distList}
				</ul>
			</div>
		);
	}
});

let colWebsCom;
let ColWebs = React.createClass({
	getInitialState: function() {
		return {
			allWebs: [],
			showWebs: "ALL"
		}
	},
	render: function() {
		colWebsCom = this;
		let allWebs = this.state.allWebs;
		if (this.state.showWebs != "ALL") {
			let newArr = []
			for (let i = 0; i < allWebs.length; i++) {
				if (allWebs[i].groupName == this.state.showWebs) {
					newArr.push(allWebs[i]);
				}
			}
			allWebs = newArr;
		}
		let webList = allWebs.map(function(web, index) {
			return (
				<li key={index} className="lis webItem">
					<a className="weburl" href={web.url} target="_blank">{web.webName}</a>
				</li>
				);
		});
		return (
			<ul id="colWebs">
				{webList}
			</ul>
		);
	}
});


let contentCom;
let Content = React.createClass({
	getInitialState: function() {
		return {
			log: false,
			webs: null,
			groups: null,
		}
	},
	getHotWebs: function() {
		let that = this;
		$.ajax({
		url: '/getHotWebs',
  			type: 'GET',
  			data: {},
  			// dataType: 'json',
  			success: function(data) {
  				let groups = [];
  				for (let i = 0; i < data.length; i++) {
  					if (groups.indexOf(data[i].groupName) < 0) {
  						groups.push(data[i].groupName);
  					}
  				}
  				that.setState({
  					webs: data,
  					groups: groups
  				});
  				colWebsCom.setState({allWebs: data});
  				menuCom.setState({dist: groups});
  				// console.log(that.state.webs, that.state.groups);
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
		});
	},
	getUserWebs: function() {
		let that = this;
		$.ajax({
		url: '/getUserWebs',
  			type: 'POST',
  			data: {},
  			// dataType: 'json',
  			success: function(data) {
  				let groups = [];
  				for (let i = 0; i < data.length; i++) {
  					if (groups.indexOf(data[i].groupName) < 0) {
  						groups.push(data[i].groupName);
  					}
  				}
  				that.setState({
  					webs: data,
  					groups: groups
  				});
  				colWebsCom.setState({allWebs: data});
  				menuCom.setState({dist: groups});
  				// console.log(that.state.webs, that.state.groups);
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
		});
	},
	componentWillMount: function() {
		this.getHotWebs();
	},
	render: function() {
		contentCom = this;
		return (
			<div id="contentContainer">
				<Menu dist={this.state.groups}/>
				<ColWebs/>
			</div>
		);
	}
});

ReactDOM.render(
	<NavContainer/>,
	document.getElementById('header')
);

ReactDOM.render(
	<Content/>,
	document.getElementById('content')
);

// function getUserWebs() {
// 	$.ajax({
// 		url: '/getUserWebs',
//   			type: 'POST',
//   			data: {},
//   			// dataType: 'json',
//   			success: function(data) {
//   				console.log(data);
//   			},
//   			error:function(xhr,textStatus){
//         		console.log('error', xhr, textStatus);
//     		}
// 	});
// }

// function getHotWebs() {
// 	$.ajax({
// 		url: '/getHotWebs',
//   			type: 'GET',
//   			data: {},
//   			// dataType: 'json',
//   			success: function(data) {
//   				// console.log(data);
//   				contentCom.setState({webs: data});
//   			},
//   			error:function(xhr,textStatus){
//         		console.log('error', xhr, textStatus);
//     		}
// 	});
// }