<template>
		<div class="footer">
			<div class="footer-top">
				<a href="javascript:;"><span></span>良仓商店 / OUR SHOP</a>
				<div>
					<div></div>
					<div><p>全球精品</p><p>Global Selections</p></div>
					<div></div>
					<div><p>全球精品</p><p>Global Selections</p></div>
					<div></div>
					<div><p>全球精品</p><p>Global Selections</p></div>
					<div></div>
					<div><p>全球精品</p><p>Global Selections</p></div>
				</div>
			</div>
			<div class="footer-bt">
				<div>
					<a href="javascript:;"><div></div><p>iPhone Android<br/>客户端下载</p><div><div><img src="../assets/images/icon.png" alt=""></div><div><img src="../assets/images/icon.png" alt=""></div><p>下载iPhone版</p><p>下载Android版</p></div></a>
					<a href="javascript:;"><div><img src="../assets/images/icon.png" alt=""></div></a>
					<a href="javascript:;"><div><img src="../assets/images/icon.png" alt=""></div></a>
					<a href="javascript:;"><div><img src="../assets/images/icon.png" alt=""></div><div><div><img src="../assets/images/icon.png" alt=""></div></div></a>
					
				</div>
				
				
				<ul class=footer-nav>
					<li><a href="javascript:;">关于良仓</a></li>|
					<li><a href="javascript:;">服务协议</a></li>|
					<li><a href="javascript:;">隐私保护政策</a></li>|
					<li><a href="javascript:;">使用指南</a></li>|
					<li><a href="javascript:;">联系我们</a></li>|
					<li><a href="javascript:;">加入我们</a></li>|
					<li><a href="javascript:;">友情链接</a></li>|
					<li><a href="javascript:;">私信良仓</a></li>
				</ul>
				<div>
					<p>&copy; 2013-2019 北京良仓文化传播有限公司版权所有 </p>
					<p>公司名称：北京良仓文化传播有限公司  电话：010-87725610</p>
					<p>公司地址：北京朝阳区百子湾路32号6号楼1层60号.</p>
					<p>社会信用统一代码：91110105059231575L  食品许可证：JY11105160159557</p>  
					<p>图书证名称：中华人民共和国出版物经营许可证  图书证编号：新出发京零 字第 朝 150051 号</p>  
					<p>京ICP备13010677号-1 京公网安备11010502025627</p>
				</div>
			</div>
			<a :href="isTop?null:'javascript:;'" class="totop"  :style="{opacity : isTop?0:1}" @click="toTopH"></a>
		</div>
</template>

<script>
	export default{
		props: {
			isTop: Boolean,
		},
		methods: {
			toTopH() {
				document.documentElement.scrollTop=0
			}
		},
	}
</script>

<style scoped>
.footer-top{
	background:#FBFDFE;
	height:118px;
	padding: 51px 0 78px;
	border-top:1px solid #EDEDED;
	margin-top:90px
}
.footer-top a{
	display:block;
	width:170px;
	margin:0px auto;
	font-weight:bold;
	color:#9A9B9B;
	position:relative;
	padding-left:50px
}
.footer-top a span{
	position:absolute;
	width:35px;
	height:100%;
	left:15px;
	top:2px;
	background:url(../assets/images/icon.png) no-repeat -173px -351px
}

.footer-top>div{
	padding-top:42px;
	height:60px;
	width:1000px;
	margin:0px auto;
	display:flex;
}
.footer-top>div>div:nth-child(odd){
	height:60px;
	background:url(../assets/images/icon.png) no-repeat 0px -355px;
	width:56px
}
.footer-top>div>div:nth-child(even){
	color:#9A9B9B;
	padding: 9px 0 0 20px;
	flex:1
}



.footer-bt{
	background:#25292E;
	padding:40px 0px 10px
}
.footer-bt>div:first-child{
	width:1000px;
	margin:0px auto;
	height:44px;
	position:relative
}
.footer-bt>div>a:first-child{
	padding-left:60px;
	position:relative;
	color:#999A9C;
	display:flex;
	width:120px;
}

.footer-bt>div>a:first-child>div:first-child{
	width:60px;
	height:44px;
	position:absolute;
	left:0px;
	background:url(../assets/images/icon.png) -175px 0px no-repeat
}
.footer-bt>div>a:first-child>div:last-child{
	position:absolute;
	left:0px;
	top:-188px;
	width:250px;
	height:188px;
	display:flex;
	justify-content:space-around;
	align-content:flex-start;
	flex-wrap:wrap;
	display:none
}
.footer-bt>div>a:first-child>div:last-child div{
	height:98px;
	width:98px;
	overflow:hidden;
	margin-bottom:20px
}
.footer-bt>div>a:first-child>div:last-child>:first-child img{
	position:relative;
	right:0px;
	top:-47px
}
.footer-bt>div>a:first-child>div:last-child>:nth-child(2) img{
	position:relative;
	left:-99px;
	top:-47px
}
.footer-bt>div>a:first-child:hover>div:last-child{
	display:flex
}
.footer-bt>div>a:nth-child(n+2)>div{
	position:relative;
	top:-44px;
	float:right;
	margin:0px 10px;
	height:25px;
	width:24px;
	overflow:hidden
}
.footer-bt>div>a:nth-child(n+2)>:first-child img{
	position:relative;
	top:-20px
}
.footer-bt>div>a:nth-child(2) img{
	left:-125px;
}
.footer-bt>div>a:nth-child(3) img{
	left:-149px;
}
.footer-bt>div>a:nth-child(4)>:first-child img{
	left:-100.5px;
}
.footer-bt>div>a:nth-child(4)>:last-child{
  position:absolute;
	right:30px;
	top:-185px;
	height:185px;
	width:145px;
	display:none
}
.footer-bt>div>a:nth-child(4)>:last-child img{
	position:relative;
	top:-148px;
}
.footer-bt>div>a:nth-child(4)>:last-child>div{
	height:145px;
	overflow:hidden
}
.footer-bt>div>a:nth-child(4):hover>:last-child{
	display:block
}
.footer-nav{
	width:1000px;
	margin:29px auto 9px;
	display:flex;
	justify-content:flex-start;
	color:#999A9C;
	letter-spacing:5px
}
.footer-nav li{
	padding:0px 5px
}
.footer-nav li a{
	font-size:12px;
	color:#CCCCCC;
	font-size:12px;
	opacity:0.5
}
.footer-nav li:hover a{
	opacity:1
}
.footer-bt>div:last-child{
	width:1000px;
	margin:0px auto;
	color:#999A9C;
	font-size:12px;
	letter-spacing:5px;
	margin-bottom:10px;
	text-indent:1em;
	opacity:0.5
}
.footer-bt div a{
	opacity:0.7
}
.footer-bt div a:hover{
	opacity:1
}
.footer .totop{
	transition: 0.7s;
	/* display:none;
	opacity:0; */
	width:59px;
	height:59px;
	background:url(../assets/images/icon.png) -20px -813px;
	position:fixed;
	bottom:20px;
	right:20px
}
</style>