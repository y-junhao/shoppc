<template>
	<div class="box">
		<form class=zc>
			<table>
				<tr>
					
					<td class=zclogo><router-link :to="{name: 'index'}"><img src="../assets/images/zc-logo.png" alt=""></router-link></td>
				</tr>
				<tr>
					<td class="zcphone">
						<p>手机号</p>
						<input @blur="usernameBlur" v-model="username" type="text" placeholder="输入手机号">
						<!-- <span></span> -->
						<span :style="{color : usernameRules.usernameColor}" class="username-msg" v-show="usernameRules.usernameMsg">{{usernameRules.usernameMsg}}</span>
					</td>
				</tr>
				<tr>
					<td class=zccode>
						<p>验证码</p>
						<input type="text" placeholder="输入验证码">
						<a href=""><img src="../assets/images/change.png" alt=""> 看不清，换一张</a>
					</td>
				</tr>
				<tr>
					<td class=zcmm>
						<p>创建密码</p>
						<input @keyup="pwdKeyup" v-model="pwd" type="password" placeholder="6－20位字符组成，区分大小写">
						<!-- <span></span> -->
						<span :style="{color : pwdRules.pwdColor}" class="pwd-msg" v-show="pwdRules.pwdMsg">{{pwdRules.pwdMsg}}</span>
						<div><span></span><p>弱</p><span></span><p>中</p><span></span><p>强</p></div>
					</td>
				</tr>
				<tr>
					<td class=zcmm2>
						<p>密码确认</p>
						<input type="password" placeholder="确认密码">
						<span></span>
					</td>
				</tr>
				<tr>
					<td class="agree">
						<input type="checkbox" checked="checked">同意<a class="article" href="">良仓注册条款</a>
					</td>
				</tr>
				<tr>
					<td class="sign-up">
						<button @click.prevent :disabled="!isUsername || !isPwd" :style="{backgroundColor : isUsername&&isPwd ? 'black' : 'gray'}" @click="clickRegisterH">立即注册</button>
						<!-- <a>立即注册</a> -->
					</td>
				</tr>
				<tr>
					<td>
						<!-- <a href="login2.html" class="dl">登录良仓</a> -->
						<router-link class="dl" to="/login">登录良仓</router-link>
						<a href=""><div></div></a>
						<a href=""><div></div></a>
						<a href=""><div></div></a>
						<a href=""><div></div></a>
					</td>
				</tr>
			</table>
		</form>
	</div>
	<!-- <div class="register-content">
		<a href="index.html">logo</a>
		<h2>注册</h2>
		<p>
			用户名：
			<input @blur="usernameBlur" v-model="username" placeholder="3-12位数字字母" type="text" class="username-txt"/>
			<span :style="{color : usernameRules.usernameColor}" class="username-msg" v-show="usernameRules.usernameMsg">{{usernameRules.usernameMsg}}</span>
		</p>
		<p>
			密码：
			<input @keyup="pwdKeyup" v-model="pwd" placeholder="6-12位数字" type="password" class="password-txt"/>
			<span :style="{color : pwdRules.pwdColor}" class="pwd-msg" v-show="pwdRules.pwdMsg">{{pwdRules.pwdMsg}}</span>
		</p>
		<p>
			<input @click="clickRegisterH" type="button" :disabled="!isUsername || !isPwd" value="注册" class="reg-btn" />
			<router-link to="/login">已有帐号，请登录</router-link>
		</p>
	</div> -->
</template>

<script>
	
	export default {
		data(){
			return {
				// 双向绑定
				username : '',
				pwd : '',
				// 校验规则
				usernameRules : {				
					usernameMsg : '', 
					usernameColor : 'red',
				},		
				pwdRules : {
					pattern : /^[0-9]{6,12}$/g, 
					pwdMsg : '', 
					pwdColor : 'red',
				},
				// 校验状态
				isUsername : false,
				isPwd : false
			};
		},
		
		methods : {
			
			async usernameBlur(){
				
				// 同一个正则，每次使用，都要重新定义
				let re = /^[0-9a-z_]{3,12}$/g;
				// 规则
				if(!re.test(this.username)){
					this.usernameRules.usernameMsg = '用户名必须为3-12位字母数字下划线组成';
					this.usernameRules.usernameColor = 'red';
					this.isUsername = false;
					return;
				};
				
				// 查询用户名是否可用
				let res = await this.jhAPI.postData('/api_user', {
					username : this.username,
					status : 'check'
				});
				
				if(res.code == 1005){
					this.usernameRules.usernameMsg = '用户名已存在';
					this.usernameRules.usernameColor = 'red';
					this.isUsername = false;
					return;
				};
				
				if(res.code == 0){
					this.usernameRules.usernameMsg = '用户名可用';
					this.usernameRules.usernameColor = 'green';
					this.isUsername = true;
					return;
				};
				
			},
			
			pwdKeyup(){
				// console.log('aa')
				let re = /^[0-9]{6,12}$/g;
				
				if(!re.test(this.pwd)){
					this.pwdRules.pwdMsg = '密码必须为6-12位数字组成';
					this.pwdRules.pwdColor = 'red';
					this.isPwd = false;
					return;
				};
				this.pwdRules.pwdMsg = '密码可用';
				this.pwdRules.pwdColor = 'green';
				this.isPwd = true;
			},
			
			// 点击了注册按钮
			async clickRegisterH(){
				let res = await this.jhAPI.postData('/api_user', {
					username : this.username,
					password : this.pwd,
					status : 'register'
				});
				
				if(res.code != 0){
					window.alert('注册失败');
					this.username = '';
					this.pwd = '';
					return;
				};
				window.alert('注册成功');
				// this.username = '';
				// this.pwd = '';
				// 跳转登录
				this.$router.push('/login');
			},
		}
	}
	
</script>

<style scoped>
/* html,body{height: 100%;} */
.box{
	position: fixed;
	width: 100%;
	height: 100%;
	background:#999999
}
.zc{
	width:300px;
	margin:0px auto
}
.zc tr:first-child{
	text-align:center
}
.zclogo{
	padding:60px 0px;
}
input{
	color:white;
	outline:none
}
input::placeholder{
	color:white
}
.zcphone input{
	border:0px;
	font-weight:bold;
	width:300px;
	height:50px;
	background:#CBCBCB;
  padding-left:1em;
	margin-bottom:22px
}
.zcphone{
		position:relative;
}
.zcphone p{
	line-height:50px;
	font-weight:bold;
	color:white;
	position:absolute;
	left:-100px
}
.zccode input{
	border:0px;
	font-weight:bold;
	width: 225px;
	height: 50px;
	float: left;
	background:#CBCBCB;
	padding-left: 1em;
	margin-bottom:22px
}
.zccode{
		position:relative;
}
.zccode p{
	line-height:50px;
	font-weight:bold;
	color:white;
	position:absolute;
	left:-100px
}
.zccode a{
	color:white;
	position:absolute;
	right:-110px;
	top:10px
}
.zcmm input{
	border:0px;
	font-weight:bold;
	width:300px;
	height:50px;
	float: left;
	background:#CBCBCB;
	padding-left: 1em;
	margin-bottom:22px
}
.zcmm{
		position:relative;
}
.zcmm>p{
	line-height:50px;
	font-weight:bold;
	color:white;
	position:absolute;
	left:-100px
}
.zcmm div{
	width:100px;
	display:flex;
	justify-content:space-between;
	box-sizing:border-box;
	border-top:5px solid #F5F5F5;
	position:absolute;
	right:-130px;
	top:20px;
	font-size:12px
}
.zcmm div span{
	position:absolute;
	top:-5px;
	height:5px;
	width:33px;
	background:green
}
.zcmm div span:nth-of-type(1){
	background:red;
	opacity:0
}
.zcmm div span:nth-of-type(2){
	background:yellow;
	left:33px;
	opacity:0
}
.zcmm div span:nth-of-type(3){
	background:green;
	left:66px;
	opacity:0
}
.zcmm2 input{
	border:0px;
	font-weight:bold;
	width:300px;
	height:50px;
	float: left;
	background:#CBCBCB;
	padding-left: 1em;
	margin-bottom:22px
}
.zcmm2{
		position:relative;
}
.zcmm2 p{
	line-height:50px;
	font-weight:bold;
	color:white;
	position:absolute;
	left:-100px
}
.wrong{
	color:red;
	position:absolute;
	bottom:0px;
	left:0px;
}
.correct{
	color:white;
	position:absolute;
	right:-25px;
	top:15px;
	background:green;
	width:20px;
	height:20px;
	text-align:center;
	border-radius:50%
	
}
.agree{
	font-size:12px;
	color:white
}
.article{
	color:#0D79CB
}
.sign-up{
	padding-top:22px;
	
}
.sign-up button{
	/* user-select:none; */
	/* background:gray; */
	border: 0px;
	color:white;
	border-radius:4px;
	width:300px;
	height:50px;
	display:flex;
	justify-content:center;
	align-items:center;
	font-size:20px;
	margin-bottom:30px;
	font-weight:bold
}
.dl{
	color:white;
	font-weight:bold;
	text-decoration:underline
}
.zc tr:last-child{
	text-align:right;
}
.zc tr:last-child a>div{
	width:25px;
	height:25px;
	float:left;
	margin:0px 5px
}
.zc tr:last-child a:last-child div{
	background: url(../assets/images/tx.png) no-repeat
}
.zc tr:last-child a:nth-child(2) div{
	background: url(../assets/images/qq.png) no-repeat
}
.zc tr:last-child a:nth-child(3) div{
	background: url(../assets/images/wb.png) no-repeat
}
.zc tr:last-child a:nth-child(4) div{
	background: url(../assets/images/douban.png) no-repeat
}
.zc tr:last-child a:nth-child(n+2):hover{
	opacity:0.5
}
	/* .register-content{
		width:400px;
		height: 300px;
		border: 2px solid #666;
		text-align: center;
		position: fixed;
		left: 50%;
		top:50%;
		transform: translate(-50%, -50%);
	}
	.register-content p{
		margin: 30px 0px;
		position: relative;
	}
	.username-txt, .password-txt{
		outline: none;
		border: 1px solid #666;
	}
	.username-txt:focus, .password-txt:focus{
		border-color: #000;
	}
	
	.username-msg, .pwd-msg{
		position: absolute;
		left: 140px;
		bottom: -20px;
		font-size: 12px;
		color: red;
	} */
</style>