<template>
	<!-- 头部 -->
	<div class="header" :style="{top : isTop?'0px':'-56px'}">
	<!-- <div class="header"> -->
			<div class="header-top">
				<div>
					<router-link class=logo :to="{name: 'index'}">
						<img src="../assets/images/icon.png" alt=""/>
					</router-link>
					<ul>
						<li>
							<router-link :to="{name: username ? 'index' : 'login'}">{{ username || '登录'}}</router-link>
							<p v-if="username">
								<a href="javascript:;">个人设置</a>
								<a href="javascript:;">收货信息</a>
								<a href="javascript:;">我的订单</a>
								<a class="log-out" href="javascript:;" @click="clickLoginOut" >退出</a>
							</p>
						</li>
						<li v-show="!username"><router-link :to="{name:'register'}">注册</router-link></li>|
						<li>
							<span class="cart-num" v-if="username">{{ cartList.length }}</span>
							<router-link :to="{name: username ? 'cart' : 'login'}" class="small-cart">购物车</router-link>
							<div v-if="username">
								<p v-for="item in cartList">
									<router-link :to="{name: 'product', query:{goodsId: item.goods_id} }">
										<img :src="item.goods_thumb" alt="">
								</router-link>
									<span>
										<router-link :to="{name: 'product', query:{goodsId: item.goods_id} }">{{ item.goods_name }}</router-link>
									</span>
									<span>数量:{{item.goods_number}}件</span>
									<span class="proPrice">￥{{item.goods_number*item.price}}</span>
								</p>
								<p>
									<router-link :to="{name: 'cart'}">查看我的购物车</router-link>
								</p>
							</div>
						</li>|
						<li><a class="new-message" href="javascript:;">消息</a></li>|
						<li><a href="javascript:;">添加良品</a></li>
						<li><a href="javascript:;">资质证照 / 协议规则</a></li>
					</ul>
				</div>	
			</div>
			<div class="header-bt">
				<ul>
					<li><router-link class="holdblack" :to="{name: 'index'}">首页</router-link></li>
					<li>
						<div class="sdlist list-2">
							<div class="sdmenu">
								<ul>
									<li v-for="(item,index) in catList" :key="item.cat_id" @mouseenter="nowshow = index" :style="nowshow!=null ? {top: index - nowshow >= 7 - nowshow%7 ? '100px' : '0px'} : ''">
										<router-link :to="{name: 'classify', query:{catId: item.cat_id} }">		
											<img :src="item.cat_img" alt="">
											<br>{{ item.cat_name }}<p>^</p>
										</router-link>
										<ul v-if="index == nowshow" :style="{left: -(index)%7*100 + 'px'}">
											<!-- <li>{{ nowshow }}</li> -->
											
											<li v-for="item in getSmallData(item.cat_id).data">
												<router-link :key="item.id" :to="{name: 'classify', query:{catId: getSmallData(item).cat_id,Id: item.id} }">
													{{ item.product_content }}
												</router-link>

											</li>

										</ul>

									</li>
								</ul>

							</div>
							<div class="s-r"></div>
							<p><a href="">查看所有品牌 ></a><a href="">最新到货 ></a></p>
							<a href="xsx2015"><img src="../assets/images/xsx2015.jpg" alt=""><p>新视线：  2015年7月刊</p></a>
						</div>
						<a href="javascript:;">商店</a>
					</li>
					<li>
						<div class="otherlist list-2">
							<a href="">趣物</a>
							<a href="">数码</a>
							<a href="">汽车</a>
							<a href="">文化</a>
							<a href="">时尚</a>
							<a href="">美食</a>
							<a href="">建筑</a>
							<a href="">空间</a>
							<a href="">周子</a>
							<a href="">清单</a>
							<a href="">活动</a>
							<a href="">视频</a>
						</div>
						<a href="">杂志</a>
					</li>
					<li>
						<div class="otherlist list-2">
							<a href="">男士</a>
							<a href="">家居</a>
							<a href="">数码</a>
							<a href="">工具</a>
							<a href="">玩具</a>
							<a href="">美容</a>
							<a href="">孩子</a>
							<a href="">宠物</a>
							<a href="">饮食</a>
							<a href="">运动</a>
							<a href="">文化</a>
							<a href="">女士</a>
						</div>
						<a href="">分享</a>
					</li>
					<li>
						<div class="otherlist list-2">
						</div>
						<a href="">达人</a>
					</li>
					<li>
						<div class="otherlist list-2">
						</div>
						<a href="">有偿资讯</a>
					</li>
				</ul>
				<!-- <a target="_blank"></a> -->
				<router-link :to="{name: 'search'}" target="_blank"></router-link>
				<input type="text" class="searchbox" placeholder="search...">
			</div>
		</div>	
</template>

<script>
	export default {
		props : {
			catList : Array,
			smallCatList : Array,
			username : String,
			isTop : Boolean,
			cartList : Array
		},
		// watch: {
		// 	isTop(newValue, oldValue) {
		// 		if(newValue == 0&&oldValue != 0){
		// 			this.headertop = '0px'

		// 		};
		// 		if(newValue != 0&&oldValue == 0){
		// 			this.headertop = '-56px'

		// 		}
		// 	}
		// },
		// watch: {
		// 	catList(newValue, oldValue) {
		// 		console.log(newValue);
		// 	},
		// },
		data() {
			return {
				nowshow : null
			}
		},
		methods: {
			getSmallData(val){
				return this.smallCatList.find((item) => {
					return item.cat_id == val	|| item.data.some(item => {return item == val})
				})
			},

			clickLoginOut(){
				// 清除本地存储
				// console.log(window.localStorage)
				// console.log(this.$parent)
				window.localStorage.removeItem('token');
				window.localStorage.removeItem('username');
				this.$parent.username = null;
				// console.log(this.$parent)

				// console.log(window.localStorage)

				// this.$router.push('/login')
			}

		},

	}
	
</script>

<style scoped>
	/* 头部 */
	.header{
	height:105px;
	width:100%;
	position:fixed;
	top:0px;
	z-index:99;
	transition: 0.5s;
}
.header-top{
	height:56px;
	background:#25292E;
	position:relative;
}
.header-top>div{
	width:1000px;
	height:56px;
	display:flex;
	justify-content:flex-start;
	align-items:center;
	margin:0px auto
}
.header-top>div>a{
	height:38px;
	width:95px;
	overflow:hidden
}
.header-top ul{
	width:406px;
	height:56px;
	position:absolute;
	right:50%;
	margin-right:-520px;
	display:flex;
	justify-content:space-between;
	align-items:center;
	color:#999A9C;
	font-size:12px
}
.header-top li>a{
	color:#CCCCCC;
	font-size:12px
}
.header-top li:nth-child(n+3)>a{
	opacity:0.5
}
.header-top li:nth-child(n+3)>a:hover{
	opacity:1
}
.header-top li:nth-child(3){
	position:relative
}
.header-top li:nth-child(3)>span{
	font-size:16px;
	color:#1967BD;
	line-height:12px
}
.header-top li:nth-child(3)>div{
	position:absolute;
	display:none;
	width:320px;
	z-index:1;
	background:#25292E;
	padding-top:20px;
	flex-direction:column
}
.header-top li:nth-child(3):hover>div{
	display:flex
}
.header-top li:nth-child(3)>div>p:last-child>a{
	float:left;
	width:100%;
	text-align:center;
	height:50px;
	line-height:50px;
	color:white;
	background:#7DBFDF;
	font-size:14px
}
.header-top li:nth-child(3)>div>p>a:first-child{
	color:gray
}
.header-top li:nth-child(3)>div>p>a>img{
	width:60px;
	height:60px;
	margin:10px;
	float:left
}
.header-top li:nth-child(3)>div>p>span{
	float:left;
	margin:10px 10px 0px 0px;
}
.header-top li:nth-child(3)>div>p>span>a{
	display:block;
	width:220px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	color:gray
}
.header-top li:nth-child(3)>div>p>.proPrice{
	position:relative;
	left:120px;
	top:16px
}

.header-top li:nth-child(1),.header-top li:nth-child(4){
	position:relative
}
.header-top li:nth-child(1)>p,.header-top li:nth-child(4)>p{
	position:absolute;
	left:50%;
	display:none;
	width:190px;
	margin-left:-95px;
	z-index:1;
	background:#25292E;
	padding:20px 10px 0px
}
.header-top li:nth-child(1):hover>p,.header-top li:nth-child(4):hover>p{
	display:block
}
.header-top li:nth-child(1)>p>a,.header-top li:nth-child(4)>p>a{
	color:gray;
	display:flex;
	justify-content:space-between;
	height:44px;
	text-align:left;
	line-height:44px;
	border-bottom:1px solid #949494;
	font-size:12px
}
.header-top li:nth-child(1)>p>a:last-child{
	color:white;
	background-color:black;
	justify-content:center;
	position:absolute;
	font-size:14px;
	left:0px;
	height:50px;
	line-height:50px;
	width:210px
}
.header-top li:nth-child(1)>p>a:hover,.header-top li:nth-child(4)>p>a:hover{
	background:#2E353D
}
.header-bt{
	position:relative;
	margin:0px auto;
	height:49px;
	border-bottom:5px solid #EDEDED;
	width:1000px;
	display:flex;
	justify-content:space-between;
	align-items:center;
	background-color:white
}
.header-bt>ul{
	width:734px;
	height:46px;
	text-align:center;
	display:flex;
	position:relative
}
.header-bt>ul>li{
	flex:1;
	display:flex;
	align-items:center
}
.header-bt>ul>li>a{
	flex:1;
	color:black;
	line-height:46px;
	border-bottom:5px solid #EDEDED;
	position:relative;
	top:4px
}
.header-bt>ul>li>a:hover{
	border-bottom:5px solid black
}
.header-bt>ul>li>.holdblack{
	border-bottom:5px solid black
}
.list-2{
	width:1000px;
	padding:30px 0px;
	background:white;
	position:absolute;
	left:0px;
	top:53px;
	display:none;
	z-index:2;
	font-size:12px
}
.list-2:hover+a{
	border-bottom:5px solid black
}
.header-bt>ul>li:hover .list-2{
	display:block
}
.sdmenu{
	width:750px;
	height: 330px;
}
.sdmenu>ul{
	width:100%
	/* position: relative */
}
.sdmenu>ul>li{
	float:left;
	display:block;
	width:100px;
	position: relative
}
/* .sdmenu>ul>li:hover{
	margin-bottom: 100px;
} */
.sdmenu img{
	width:40px;
	height:40px
}
.sdmenu a{
	font-size:12px
}
.sdmenu>ul>li>a{
	float:left;
	width:100%;
	font-weight:bold;
	color:#4D4D4D
}
.sdmenu ul ul{
	width:750px;
	/* height: 100px; */
	background-color: white;
	border-top:1px solid #949494;
	position:absolute;
	top:70px;

	/* left:0px; */
	/* display: none; */
}
/* .sdmenu>ul>li:hover ul{
	display: block;
} */
/* .sdmenu ul ul:first-of-type{
	top:100px
}
.sdmenu ul ul:nth-of-type(2){
	top:183px
}
.sdmenu ul ul:last-of-type{
	top:266px
} */
.sdmenu>ul ul a{
	color:#949494
}
.sdmenu>ul ul a:hover{
	color:black
}
/* .sdmenu>ul>li{
	margin-bottom:10px;
} */
.sdmenu p{
	opacity:0;
	color:#949494
}
.sdmenu>ul>li:hover p{
	opacity:1
}
.sdmenu>ul ul>li{
	float: left;
	margin:10px 30px
}
::v-deep.sdlist>p>a{
	padding-right:50px;
	color:gray
}
::v-deep.sdlist>p{
	position:absolute;
	bottom:20px
}
::v-deep.sdlist>a{
	position:absolute;
	right:10px;
	top:30px;
	color:gray
}
::v-deep.sdlist>a img{
	width:232px;
	height:232px
}
.otherlist>a{
	color:#949494;
	float:left;
	margin:0px 100px 30px 0px
}
.header-bt>a{
	height:39px;
	line-height:46px;
	width:33px;
	background:url(../assets/images/icon.png) 33px -148px;
	position:relative;
	top:5px
}
.searchbox{
	width:260px;
	height:49px;
	position:absolute;
	/* left:33px; */
	right:-260px;
	top:0px;
	outline:none;
	border:0px;
	border-bottom:5px solid black;
	display:none
}
</style>