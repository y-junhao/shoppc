<template>
	<div class="main">
		
		<!-- 轮播图 -->
		<!-- <div class="banner-box">
			<a href="javascript:;" class="prev"></a>
			<a href="javascript:;" class="next"></a>
			<ul class="banner">
				<li v-for="item in bannerList" :key="item.goods_id">
					<router-link :to="{path : '/home/product', query : {goodsId : item.goods_id}}">
						<img :src="item.goods_thumb">
					</router-link>
				</li>
			</ul>
			<div class="circle">
				<span v-for="item in bannerList"></span>
			</div>
		</div>  -->
		<swipe :autoplay="2000" :banner-list="bannerList" :speed="300" :width="1000" :image-width-height="{width:1000, height : 475}" :isnext="true" :isprev="true" :iscircle="true"></swipe>
		
		<!-- 人气良品 -->
		<div class="banner-small">
			<a href="javascript:;"><img src="../../assets/images/banner2.jpg" alt=""></a>
			<a href="javascript:;"><img src="../../assets/images/banner3.jpg" alt=""></a>
			<a href="javascript:;"><img src="../../assets/images/banner4.jpg" alt=""></a>
			<a href="javascript:;"><img src="../../assets/images/banner5.jpg" alt=""></a>
			<a href="javascript:;"><img src="../../assets/images/banner6.jpg" alt=""></a>
		</div>
		<div class="c-line">
			人气良品
		</div>
		<ul class="shoplist">
			<li v-for="item in hotList" :key="item.goods_id">
				<router-link :to="{name: 'product', query:{'goodsId': item.goods_id} }"><div><h1>￥{{item.price}}</h1><p>{{item.goods_name}}</p><span>{{item.goods_desc}}</span></div><img :src="item.goods_thumb" alt=""></router-link><a href="javascript:;"><img :src="item.brand_thumb" alt="">{{item.brand_name}}</a><h5>{{item.star_number}}<a href="javascript:;"></a></h5>
			</li>
		</ul>
		<div class="more"><a href="javascript:;" @click="onMoreHandler">MORE</a>
		</div>

		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				bannerList : [],
				hotList : [],
				// 点击more的当前页
				nowPage : 1,
				// more 开关
				more : false
			}
		},
		
		async created(){
			// this.getBannerData();
			this.bannerList = await this.jhAPI.getData('/api_banner', {bannerId : 1});
			// this.getHotData(this.nowPage);
			this.hotList = await this.jhAPI.getData('/api_goods',{pagesize : 3, page : this.nowPage});
		},
		
		methods : {
			
			// 点击热门商品的方法
			toProductH(id){
				// 路由编程式跳转
				this.$router.push({'path' : '/home/product', query : {goodsId : id}});
			},
			
			// 点击more
			async onMoreHandler(){
				//节流
				if(this.more){return};			
				this.nowPage++;
				this.more = true;
				this.hotList = [...this.hotList,...await this.jhAPI.getData('/api_goods',{pagesize : 3, page : this.nowPage})];
				// this.getHotData(this.nowPage);
				this.more = false;
				// console.log(this.hotList);

			},
			
		}
	}
	
</script>

<style scoped>


::v-deep.banner-box>a:first-of-type{
	width:36px;
	height:36px;
	position:absolute;
	left:100px;
	top:50%;
	margin-top:-18px;
	background:url(../../assets/images/smprev.png) no-repeat center;
	background-size:10px 18px;
	background-color:white;
	border-radius:50%
}
::v-deep.banner-box>a:last-of-type{
	width:36px;
	height:36px;
	position:absolute;
	right:100px;
	top:50%;
	margin-top:-18px;
	background:url(../../assets/images/smnext.png) no-repeat center;
	background-size:10px 18px;
	background-color:white;
	border-radius:50%
}
::v-deep.banner-box>a{
	opacity:0.4;
	z-index :1;
}
::v-deep.banner-box>a:hover{
	opacity:1
}
::v-deep.banner-box .circle{
	width:100%;
	position:absolute;
	bottom:10px;
	text-align:center
}
::v-deep.banner-box .circle>span{
	display:inline-block;
	width:20px;
	height:4px;
	background-color:#EDEDED;
	margin:0px 5px;
}
::v-deep.banner-box .circle>.sp-active{
	background-color:black;
}

.banner-small{
	margin-top: 30px;
	width:1000px;
	height:405px;
	position:relative
}
.banner-small a{
	float:left
}
.banner-small a:nth-child(2){
	margin:0px 21px;
}
.banner-small a:nth-child(odd){
	margin-bottom:21px
}
.banner-small a:last-child img{
	width:319px;
	height:192px;
	position:absolute;
	left:0px
}
.c-line{
	padding:10px 0px;
	border-bottom:1px solid #ccc;
	text-align:center;
	color:#333;
	margin: 36px 0px 20px;
	font-size:12px
}
.shoplist{
	width:1000px;
	display:flex;
	justify-content:start;
	margin-bottom:30px;
	flex-wrap:wrap;
}
.shoplist li{
	margin:0px 8px;
	box-sizing:border-box;
	height:366px;
	width:316px;
	display:flex;
	flex-wrap:wrap;
	justify-content:space-between;
	align-content:space-between;
	position:relative
}
.shoplist div{
	position:absolute;
	width:316px;
	height:316px;
	background:rgba(6,2,2,0.7);
	opacity:0
}
.shoplist h1{
	color:yellowgreen;
	position:absolute;
	left:10px;
	top:10px
}
.shoplist p{
	position:absolute;
	top:40%;
	left:10%;
	text-align:center;
	width:80%;
	color:white;
	font-weight:bold;
	font-size:14px;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap
}
.shoplist span{
	position:absolute;
	top:50%;
	left:10%;
	width:80%;
	text-align:center;
	color:white;
	font-size:12px
}
.shoplist div:hover{
	opacity:1
}
.shoplist a{
	color:#878787;
	line-height:40px
}
.shoplist li>a:first-child img{
	width:316px;
	height:316px
}
.shoplist li>a:nth-child(2) img{
	width:34px;
	height:34px;
	padding:0px 6px 6px 0px;
	margin-right:10px
}

.shoplist li>h5{
	color:#878787;
	display:flex;
	justify-content:start;
	line-height:40px;
}
.shoplist li>h5>a:last-child{
	margin-left:5px;
	width:24px;
	height:40px;
	background: url(../../assets/images/good.png) no-repeat 0px center
}
.more{
	text-align:center;
	height: 50px;
	margin: 90px auto 0px;
	width: 148px
}
.more a{
	width:100%;
	float:left;
	box-sizing:border-box;
	border:3px solid black;
	line-height:44px;
	font-weight:bold;
	font-style:italic;
	color:black
}
.more a:hover{
	background:black;
	color:white
}

</style>