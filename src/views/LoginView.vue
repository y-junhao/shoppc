<template>
	<!-- <div class="register-content">
		<a href="index.html">logo</a>
		<h2>登录</h2>
		<p>
			用户名：
			<input v-model="username" placeholder="3-12位数字字母" type="text" class="username-txt"/>
		</p>
		<p>
			密码：
			<input v-model="password" placeholder="6-12位数字" type="password" class="password-txt"/>
		</p>
		<p>
			<input @click="clickLoginHandler" type="button" value="登录" class="login-btn" />
			<router-link to="/register">没有帐号，请注册</router-link>
		</p>
	</div> -->
	<div class="box">
		<div class="page1" v-show="!changepage">
			<form class="dl">
				<table>
					<tbody><tr>
						
						<td class="dllogo"><router-link :to="{name: 'index'}"><img src="../assets/images/dl-logo.png" alt=""></router-link> </td>
					</tr>
					<tr>
						<td>
							<input class="dlphone" ref="username" v-model="username" type="text" placeholder="输入手机号">
						</td>
					</tr>
					<tr>
						<td>
							<input class="dlcode" ref="password" v-model="password" type="text" placeholder="输入验证码">
							<input type="button" class="get-code" value="获取验证码">
						</td>
					</tr>
					<tr>
						<td>
							<input type="checkbox" checked="checked">自动登录
						</td>
					</tr>
					<tr>
						<td class="log-in">
							<!-- <a v-if="!username || !password">登录</a>
							<a v-else href="javascript:;" @click="clickLoginHandler">登录</a>
							<a v-if="!username || !password">登录</a> -->
							<button @click.prevent :disabled="!canlogin" @click="clickLoginHandler" :style="{backgroundColor: canlogin ? 'black' : 'gray'}">登录</button>
						</td>
					</tr>
					<tr>
						<td>
							<a href="javascript:;" class="more-ways" @click="changepage=true">更多登录方式&gt;</a>
						</td>
					</tr>
				</tbody></table>
			</form>
		</div>
		<div class=page2 v-if="changepage">
			<form class=lg2>
				<table>
					<tr>
						<td class=lg2logo>
							<router-link :to="{name: 'index'}"><img src="../assets/images/zc-logo.png" alt=""></router-link>
						</td>
					</tr>
					<tr>
						<td class="lg2phone lg2text">
							<div><input v-model="username" ref="username" type="text" placeholder="用户名/邮箱/手机号" ></div>
						</td>
					</tr>
					<tr>
						<td class="lg2mm lg2text">
							<div><input v-model="password" ref="password" type="password" placeholder="密码"></div>
						</td>
					</tr>
					<tr>
						<td class="auto">
							<input type="checkbox" checked="checked">自动登录<a href="javascript:;" class="forget">忘记密码？</a>
						</td>
					</tr>
					<tr>
						<td class="log-in">
							<!-- <a href="javascript:;" @click="clickLoginHandler">登录良仓</a> -->
							<button @click.prevent :disabled="!canlogin" @click="clickLoginHandler" :style="{backgroundColor: canlogin ? 'black' : 'gray'}">登录</button>
						</td>
					</tr>
					<tr>
						<td>
							<!-- <a href="sign.html" class="zc">注册良仓</a> -->
							<router-link class="zc" to="/register">注册良仓</router-link>
							<a href="javascript:;"><div></div></a>
							<a href="javascript:;"><div></div></a>
							<a href="javascript:;"><div></div></a>
							<a href="javascript:;"><div></div></a>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	
</template>

<script>
	
	export default {
		data(){
			return {
				username : '',
				password : '',
				fromPath : '',
				fullPath : '',
				changepage : false
			}
		},
		watch: {
			changepage(newValue, oldValue) {
				this.username = '',
				this.password = ''
			}
		},
		computed: {
			canlogin() {
				return this.username&&this.password ? true : false
			}
		},
		beforeRouteEnter(to, from, next){
			// 这里没有直接this，可能通过第三个参数，是一个回调，里面传递了当前组件实例
			// this.fromPath = from.path;
			// this.fullPath = from.fullPath;	
			// console.log(next);
			next(vm => {
				// vm为当前组件实例
				// console.log(vm);
				// console.log(from)
				vm.fromPath = from.path;
				vm.fullPath = from.fullPath;	
			});
		},
		methods : {
			
			async clickLoginHandler(){
				//校验不能为空
				// 请求登录接口
				let res = await this.jhAPI.postData('/api_user', {
					username : this.username,
					password : this.password,
					status : 'login'
				});
				console.log(res)
				if(res.code == 1007 || res.code == 1008){
					window.alert('用户名或密码错误');
					// console.log(this.username,this.password)
					this.username = '';
					this.password = '';
					this.$refs.username.focus()
					return;
				};
				
				if(res.code == 0){
					window.alert('登录成功');
					// 存储
					window.localStorage.setItem('token', res.user_id);
					window.localStorage.setItem('username', res.username);
					// 分情况跳转
					// console.log(this.fromPath,this.fullPath)
					if(this.fromPath == '/home/classify' || this.fromPath == '/home/product'){
						this.$router.push(this.fullPath);
					}else{
						// console.log(this.$router)
						this.$router.push('/');
					}
				}

			}
		}
	}
</script>

<style scoped>
/* .page2{
	display:none
} */
.box{
	width: 100%;
}
.dl{
	width:300px;
	margin:0px auto
}
.dl tr:first-child{
	text-align:center
}
.dllogo{
	padding:60px 0px;
}
.dlphone{
	border:0px;
	outline:none;
	border-bottom: solid 1px black;
	font-size: 18px;
	width:265px;
	height:34px;
	background: url(../assets/images/dlphone.png) no-repeat 0px 6px;
  padding-left: 35px;
	margin-bottom:22px
}
.dlcode{
	border:0px;
	outline:none;
	border-bottom: solid 1px black;
	font-size: 18px;
	width: 137px;
	height: 34px;
	float: left;
	background: url(../assets/images/dlcode.png) no-repeat 2px 8px;
	padding-left: 35px;
	margin-bottom:22px
}
.get-code{
	/* float:right */
	border: solid 1px black;
	height: 35px;
	line-height: 34px;
	width: 110px;
	font-size: 16px;
	margin-left: 12px;
	border-radius: 4px;
	cursor:pointer;
	background:white
}
.log-in{
	padding-top:22px;
	
}
.log-in button{
	background:black;
	color:white;
	border-radius:4px;
	width:300px;
	height:50px;
	display:flex;
	justify-content:center;
	align-items:center;
	font-size:20px;
	margin-bottom:30px
}
.more-ways{
	color:black
}
.dl tr:last-child{
	text-align:center;
}
.page2{
	position: fixed;
	background:#999999;
	width: 100%;
	height:100%
}

.lg2{
	width:300px;
	margin:0px auto
}
.lg2 tr:first-child{
	text-align:center
}
.lg2logo{
	padding:60px 0px;
}
.lg2text>div{
	width:250px;
	padding-left:50px;
	margin-bottom:20px	
}
.lg2text input{
	border:0px;
	font-size: 14px;
	font-weight:bold;
	width:249px;
	border-left:1px solid gray;
	height:50px;
	background:#CBCBCB;
	outline:none;
	color:white
}
.lg2text input::placeholder{
	color:white
}
.lg2phone>div{
	background:#CBCBCB url(../assets/images/dlphone2.png) no-repeat 10px 11px;
}
.lg2mm>div{
	background:#CBCBCB url(../assets/images/dlmm2.png) no-repeat 10px 11px;
}
.auto{
	font-size:12px;
	color:white
}
.forget{
	float:right;
	color:white
}
.zc{
	color:white;
	font-weight:bold;
	text-decoration:underline
}
.lg2 tr:last-child{
	text-align:right;
}
.lg2 tr:last-child a>div{
	width:25px;
	height:25px;
	/* background: url(../images//qq.png) no-repeat; */
	float:left;
	margin:0px 5px
}
.lg2 tr:last-child a:last-child div{
	background: url(../assets/images/tx.png) no-repeat
}
.lg2 tr:last-child a:nth-child(2) div{
	background: url(../assets/images/qq.png) no-repeat
}
.lg2 tr:last-child a:nth-child(3) div{
	background: url(../assets/images/wb.png) no-repeat
}
.lg2 tr:last-child a:nth-child(4) div{
	background: url(../assets/images/douban.png) no-repeat
}
.lg2 tr:last-child a:nth-child(n+2):hover{
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
	display: none;
} */
</style>