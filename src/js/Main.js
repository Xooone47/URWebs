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
				<a href="/"  id="navLogo"><img src="/images/logo.png" alt="logo" /></a>
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
  	hundleChoose: function(e) {	//处理切换登录、注册框
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
  	hundleLogin: function() {	//登录
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
  					getUserWebs();
  				} else {
  					console.log(data.error);
  				}
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
  		});
  	},
  	hundleSignup: function() {	//注册
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
  				} else {
  					console.log(data.error);
  				}
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
  		});
  	},
  	hundleSignout: function() {	//登出
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
  	addWeb: function() {
  		$.ajax({
  			url: '/addWeb',
  			type: 'POST',
  			data: {url: "www.zhihu.com",
  				webName: "zhihu",
  				groupName: "social"
  				},
  			// dataType: 'json',
  			success: function(data) {
  				console.log(data);
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
  		});
  	},
	render: function() {
		let username = this.state.username,
			password = this.state.password,
			passwordRepeat = this.state.passwordRepeat;
		if (!this.state.logIn) {
			return (
				<div className="navBottom">
					<div className="chooseLR">
                        <a href="#signin" id="chooseL" className="selectedLR" onClick={this.hundleChoose}>SIGN IN</a>
                        <a href="#signup" id="chooseR" onClick={this.hundleChoose}>SIGN UP</a>
                    </div>
                    <div className="log">
                        <div className="login">
                            <input type="text" name="username" placeholder="USERNAME" maxLength="14" value={username} onChange={this.inputChange} required />
                            <input type="password" name="password" placeholder="PASSWORD" maxLength="14" value={password} onChange={this.inputChange} required />
                            <input type="submit" value="SIGN IN" id="logSub" onClick={this.hundleLogin}/>
                        </div>
                    </div>
                    <div className="reg">
                        <div className="register">
                            <input type="text" name="username" placeholder="USERNAME" maxLength="14" value={username} onChange={this.inputChange} required />
                            <input type="password" name="password" placeholder="PASSWORD" maxLength="14" value={password} onChange={this.inputChange} required />
                            <input type="password" name="password-repeat" placeholder="PASSWORD AGAIN" maxLength="14" value={passwordRepeat} onChange={this.inputChange} required />
                            <span id="notMatch">Passwords do not match!</span>
                            <input type="submit" value="SIGN UP" id="regSub" onClick={this.hundleSignup}/>
                        </div>
                    </div>
				</div>
				);
		} else {
			return (
				<div className="navBottom">
					<button id="addWebBtn" onClick={this.addWeb}>ADD WEB</button>
					<button id="signOut" onClick={this.hundleSignout}>SIGN OUT</button>
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

let Menu = React.createClass({
	render: function() {
		return (
			<div id="Menu">
				<h1>11111</h1>
			</div>
		);
	}
});

let ColWebs = React.createClass({
	render: function() {
		return (
			<ul className="ColWebs">
				<h1>233333</h1>
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
			groups: [],
		}
	},
	render: function() {
		contentCom = this;
		if (this.state.log == false) {
			getHotWebs();
			console.log(this.state.webs);
		}
		return (
			<div className="contentContainer">
				<Menu/>
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

function getUserWebs() {
	$.ajax({
		url: '/getUserWebs',
  			type: 'POST',
  			data: {},
  			// dataType: 'json',
  			success: function(data) {
  				console.log(data);
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
	});
}

function getHotWebs() {
	$.ajax({
		url: '/getHotWebs',
  			type: 'GET',
  			data: {},
  			// dataType: 'json',
  			success: function(data) {
  				// console.log(data);
  				contentCom.setState({webs: data});
  			},
  			error:function(xhr,textStatus){
        		console.log('error', xhr, textStatus);
    		}
	});
}