<template>
	<div class="main">
		<div class="box-l">
			<p>
				<router-link :to="{name: 'index'}">良仓</router-link><span>></span>
				<router-link v-if="$route.query.catId" :to="{name: 'classify', query:{catId: $route.query.catId} }">{{nowQueryCatId.title}}</router-link>
				<router-link v-else :to="{name: 'classify', query:{catId: goods.cat_id} }">{{nowQueryCatId.title}}</router-link><span>></span>
				<router-link v-if="$route.query.Id" :to="{name: 'classify', query:{catId: $route.query.catId,Id: $route.query.Id} }">{{ nowQueryId.product_content }}</router-link><span v-if="$route.query.Id">></span>
				<!-- <router-link :to="{name: 'product', query:{catId: $route.query.catId,Id: $route.query.Id,goodsId :$route.query.goodsId} }">LinkTitle</router-link> -->
				<a href="javascript:;">{{ goods.goods_name }}</a>
			</p>
			<!-- <div class="detail">
				<div class="detail-l">
					<div class="left">
						<div class="slide"></div>
						<img class="active" src="../../assets/images/banner-r.jpg" alt="">
					</div>
					<div class="right">
						<img class="big-img" src="../../assets/images/banner-r.jpg" alt="">
					</div>
					<div class="smallbanner-box">
					</div>
					<a class="prev" href="javascript:;"></a>
					<a class="next" href="javascript:;"></a>
				</div>
				<p><a href=""></a></p>
				<p><a href=""></a></p>
				<p></p>
				<p>价格:	<span></span></p>
				<p><span>免运费</span>	<span>正版授权</span></p>
				<p>
					颜色:
					<span><a href="javascripts:;"><img src="../../assets/images/banner-r.jpg" alt=""><br/>情人节喵咪</a>	</span>
					<span><a href="javascripts:;"><img src="../../assets/images/banner-r.jpg" alt=""><br/>梦幻深海</a>	</span>
				</p>
				<p>
					数量:
					<input class="add-number" type="number" value="1">
				</p>
				<p>
					<input type="submit" value="立即购买">
					<input type="button" value="加入购物车">
					<input type="button" value="分享">
				</p>
				<div class="product_banner">
				</div>
				<div class="detail-bt">
					<p>品牌简介</p>
					<p>来自巴伐利亚，阿尔卑斯山脚下的创意 PINK STORIES缘起巴伐利亚山谷下的一家人。在14个月的拉丁美洲旅行后旅行的灵感，爱的启发对色彩，对设计对花样生活的追求促成了PINK STORIES 品牌的诞生。</p>
					<p>购物指南</p>
					<p>— 所有商品均为正品保证。</p>
					<p>— 中国大陆地区免运费 （偏远地区、受疫情和自然灾害影响、受节假日特殊活动等影响时，需承担部分运费)。</p>
					<p>— 包邮默认商家合作快递，如指定快递请联系客服，并承担运费差额。</p>
					<p>— 蜡烛、液态品、手表等含电池产品无法空运，运输时间相较普通空运件会更久。</p>
					<p>— 如出现产品质量问题请在签收后72小时内联系客服。</p>
					<a class="aftersale">
						<span>售后须知</span>
						<div>
							<div>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
							</div>
						</div>
					</a>
				</div>
			</div> -->
			<div class="detail">
				<div class="detail-l">
					<div class="left" @mouseenter="enlargeStart">
						<div class="slide" @mousemove="enlarge" :style="{left : slideNowLeft+'px',top : slideNowTop + 'px'}"></div>
						<img :src="activeSrc" alt="'goods.banner'">
						</div>
					<div class="right">
						<img class="big-img" :src="activeSrc" alt="" :style="largeStyle">
					</div>
					<div class="smallbanner-box">
						<ul class="smallbanner" :style="{left : -smallbannerLeft*70 + 'px'}">
							<li v-for="item in goods.banner" :key="item" @mouseover="activeSrc = item" class="">
								<img :src="item" :key="item" />
							</li>
						</ul>
					</div>
					<a v-if="smallbannerLength>5" v-show="smallbannerLeft>0" @click="smallbannerLeft--" class="prev" href="javascript:;"></a>
					<a v-if="smallbannerLength>5" v-show="smallbannerLeft<smallbannerLength-5" @click="smallbannerLeft++" class="next" href="javascript:;"></a>
				</div>
				<p><a href="">{{ goods.star_number }}</a></p>
				<p><a href="">{{ goods.brand_name }}</a></p>
				<p>{{ goods.goods_name }}</p>
				<p>价格:	<span>￥{{ goods.price }}</span></p>
				<p><span>免运费</span>	<span>正版授权</span></p>
				<p>
					颜色:
					<!-- <span><a href="javascripts:;"><img src="../../assets/images/banner-r.jpg" alt=""><br>情人节喵咪</a>	</span> -->
					<!-- <span><a href="javascripts:;"><img src="../../assets/images/banner-r.jpg" alt=""><br>梦幻深海</a>	</span> -->
				</p>
				<p>
					数量:
					<!-- <input class="add-number" type="number" value="1"> -->
					<div class="btn-content">
						<span class="reduce" @click="reduceAdd('reduce')">-</span>
						<input type="text" class="num" v-model="goods.goods_number" @keyup="reduceAdd($event.target.value)"/>
						<span class="add" @click="reduceAdd('add')">+</span>
					</div>

				</p>
				<p>
					<input @click="clickBuyHandler" type="submit" value="立即购买">
					<input @click="clickAddHandler" type="button" value="加入购物车">
					<input type="button" value="分享">
				</p>
				<div class="product_banner">
					<img v-for="item in goods.product_banner" :src="item" :key="item"/>
				</div>
				<div class="detail-bt">
					<p>品牌简介</p>
					<p>{{ brandDesc }}</p>
					<p>购物指南</p>
					<p>— 所有商品均为正品保证。</p>
					<p>— 中国大陆地区免运费 （偏远地区、受疫情和自然灾害影响、受节假日特殊活动等影响时，需承担部分运费)。</p>
					<p>— 包邮默认商家合作快递，如指定快递请联系客服，并承担运费差额。</p>
					<p>— 蜡烛、液态品、手表等含电池产品无法空运，运输时间相较普通空运件会更久。</p>
					<p>— 如出现产品质量问题请在签收后72小时内联系客服。</p>
					<a class="aftersale">
						<span>售后须知</span>
						<div>
							<div>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
								<p>温馨提示:</p>
								<p>如您订购的是生鲜冷冻商品，建议您收货时开箱检验。如发现变质或破损、漏发错发等情况，请于签收后48小时内对商品及包装外箱拍照并发给在线客服，我们将尽速进行处理。</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="box-r">
			<h4>猜你喜欢</h4>
			<div>
				<a href=""><img src="../../assets/images/banner-r.jpg" alt=""><p>方形泡泡蜡</p></a>
				<p>PINK STORIES</p>
				<p><span>￥175</span>	<span>￥188</span></p>
			</div>
			<div>
				<a href=""><img src="../../assets/images/banner-r.jpg" alt=""><p>方形泡泡蜡</p></a>
				<p>PINK STORIES</p>
				<p><span>￥175</span>	<span>￥188</span></p>
			</div>
			<div>
				<a href=""><img src="../../assets/images/banner-r.jpg" alt=""><p>方形泡泡蜡</p></a>
				<p>PINK STORIES</p>
				<p><span>￥175</span>	<span>￥188</span></p>
			</div>
			<div>
				<a href=""><img src="../../assets/images/banner-r.jpg" alt=""><p>方形泡泡蜡</p></a>
				<p>PINK STORIES</p>
				<p><span>￥175</span>	<span>￥188</span></p>
			</div>
		</div>
	</div>

</template>

<script>

export default{
	data() {
		return {
			nowQueryCatId : {},
			nowQueryId : {},
			// catList : [],
			smallCatList :[],
			goods : {},
			activeSrc : '',
			brandDesc : '',
			smallbannerLength: 0,
			smallbannerLeft : 0,
			// isprev : 'block',
			// isnext : 'block',
			leftWidth : 0,
			leftHeight: 0,
			bigWidth:0,
			bigHeight:0,
			slideStartLeft : 0,
			slideStartTop : 0,
			slideNowLeft:0,
			slideNowTop:0,
			scrollTop : 0
		}	
	},
	
	async created () {
		// this.goods = await this.jhAPI.getData('/api_goods', {goodsId : this.$route.query.goodsId},'data.data.0');
		// if(!this.goods){return}
		// this.goods.banner.forEach((item, index) => {
		// 	this.goods.banner[index] = item.replace("url('", '').replace("')", '');
		// });
		// this.activeSrc = this.goods.banner[0]
		// this.smallbannerLength = this.goods.banner.length
		// this.brandDesc = this.goods.lc_recommend[5] || this.goods.lc_recommend[4]
		// console.log(this.goods);

	},

	watch: {
			'$route.query.goodsId' : {
				handler(newVal, oldVal){
					if(!newVal){return}
					// console.log(newVal)
					this.getgoods()
				},
				
				// 强制立即执行回调
				immediate : true
			},
		'$parent.$parent.smallCatList' : {
			handler(newVal, oldVal){
				this.smallCatList = this.$parent.$parent.smallCatList
				this.getQueryName()
			},
			immediate : true

		},
		'$parent.$parent.scrollTop' : {
			handler(newVal, oldVal){
				this.scrollTop = this.$parent.$parent.scrollTop
				this.slideStartTop += oldVal - newVal
				// console.log(this.scrollTop)
			},
			immediate : true

		}

	},
	computed: {
		largeStyle() {
			// console.log(this.$refs.smallimg)
			// console.log(this.slideNowLeft,this.slideNowTop)
			// let biliL = this.$refs.bigimg.offsetWidth / this.$refs.smallimg.offsetWidth
			// let biliT = this.$refs.bigimg.offsetHeight / this.$refs.smallimg.offsetHeight
			// console.log(this.bigWidth)
			return {
				left : -this.slideNowLeft*this.bigWidth/this.leftWidth + 'px',
				top : -this.slideNowTop*this.bigHeight/this.leftHeight + 'px',
			}
		}
	},
	methods: {
		async getgoods(){
			this.goods = await this.jhAPI.getData('/api_goods', {goodsId : this.$route.query.goodsId},'data.data.0');
			if(!this.goods){return}
			this.goods.banner.forEach((item, index) => {
				this.goods.banner[index] = item.replace("url('", '').replace("')", '');
			});
			this.activeSrc = this.goods.banner[0]
			this.smallbannerLength = this.goods.banner.length
			this.brandDesc = this.goods.lc_recommend[5] || this.goods.lc_recommend[4]
			console.log(this.goods);
			this.getQueryName()

		},
		getQueryName(){
			if(!this.smallCatList[0] || (!this.$route.query.catId && !this.goods.cat_id)){return}
			// console.log(this.smallCatList)
			// console.log(this.$route.query.catId,this.$route.query.Id)
			this.nowQueryCatId = this.smallCatList.find((item) => {
				return item.cat_id == (this.$route.query.catId	|| this.goods.cat_id)					
			});
			// console.log(this.nowQueryCatId.title)
			if(!this.$route.query.Id){return}
			this.nowQueryId = this.nowQueryCatId.data.find((item) => {
				return item.id == this.$route.query.Id						
			});
			// console.log(this.nowQueryId.product_content)
		},
		enlargeStart(e){
			// console.log(e)
			this.leftWidth = e.target.offsetWidth;
			this.leftHeight = e.target.offsetHeight;
			this.bigWidth = e.target.nextElementSibling.firstElementChild.width;
			this.bigHeight = e.target.nextElementSibling.firstElementChild.height;

			this.slideStartLeft = e.target.getBoundingClientRect().left;
			this.slideStartTop = e.target.getBoundingClientRect().top;
			// this.slideStartTop = e.target.getBoundingClientRect().top-this.scrollTop;
			this.slideNowLeft = e.clientX-this.slideStartLeft-e.target.childNodes[0].offsetWidth/2;
			this.slideNowTop = e.clientY-this.slideStartTop-e.target.childNodes[0].offsetHeight/2;

		// console.log(e.target,this.slideNowLeft,this.slideNowTop);

		},
		enlarge(e){
			this.slideNowLeft = e.clientX-this.slideStartLeft-e.target.offsetWidth / 2;
			this.slideNowTop = e.clientY-this.slideStartTop-e.target.offsetHeight / 2;
			// this.slideNowTop = e.clientY-this.slideStartTop-e.target.offsetHeight / 2 + this.scrollTop;
			if(this.slideNowLeft < 0){this.slideNowLeft = 0}
			else if(this.slideNowLeft > this.leftWidth - e.target.offsetWidth){this.slideNowLeft = this.leftWidth - e.target.offsetWidth}
			if(this.slideNowTop < 0){this.slideNowTop = 0}
			else if(this.slideNowTop > this.leftHeight - e.target.offsetHeight){this.slideNowTop = this.leftHeight - e.target.offsetHeight}
			// console.log(this.slideNowTop)
			// console.log(e.target,e.clientX-e.target.getBoundingClientRect().left-e.target.offsetWidth / 2)
		},
		// 点击加减
		reduceAdd(val){
			if(val == 'reduce'){
				this.goods.goods_number--;
				this.goods.goods_number = this.goods.goods_number <= 1 ? 1 : this.goods.goods_number;
			}else if(val == 'add'){
				this.goods.goods_number++;
				this.goods.goods_number = this.goods.goods_number >= 10 ? 10 : this.goods.goods_number;
			}else{
				let re =  /^([1-9]|10)$/g;
				// /^([0-9]|10)$/
				if(!re.test(val)){
					this.goods.goods_number = 10
				}

				// console.log(val,this.goods.goods_number);

			};
			
		},

		// 点击加入购物车
		async clickAddHandler(){
			let token = window.localStorage.getItem('token');
			if(!token){
				// 跳转登录页面
				this.$router.push('/login');
				alert('暂未登录，请登录');
				return;
			};
			
			// 请求后台，加车
			let res = await this.jhAPI.postData('/api_cart', {
				status : 'addcart',
				userId : token,
				goodsId : this.goods.goods_id,
				goodsNumber : this.goods.goods_number
			});
			
			if(res.code != 0){
				alert('加入购物车失败');
				console.log(res);
				return;
			};				
			alert('加入购物车成功');
		},
		
		// 点击立即购买
		clickBuyHandler(){
			// let res = await this.wjAPI.getBuyData('/api_buying', {
			// 	goodsId : this.goods.goods_id,
			// 	userId : window.localStorage.getItem('token'),
			// 	goodsNumber : this.goods.goods_number
			// });
			// if(res.code != 0){
			// 	console.log(res);
			// 	return;
			// };
			//跳转到地址
			this.$router.push('/home/address?goodsId='+this.goods.goods_id+'&goodsNumber='+this.goods.goods_number);
		}

	}
}
</script>

<style scoped>
.box-l{
width:750px;
margin-right:15px;
display:inline-block
}
.box-l>p{
font-size:14px;
color:#CECECE;
margin-bottom:10px
}
.box-l>p>a{
color:gray;
opacity:0.4
}
.box-l>p>a:hover{
opacity:1
}
.box-l>p>a:last-child{
opacity:1
}
.detail-l{
float:left;
position:relative
}
.detail-l>.left{
overflow: hidden;
width:350px;
height:350px;
position:relative
}
.detail-l>.left .slide{
position:absolute;
width:175px;
height:175px;
background:red;
opacity:0
}
.detail-l>.left:hover .slide{
opacity:0.4;
}
.detail-l>.left>img{
width:100%;
height:100%
}
.detail-l>.left:hover+.right{
display:block
}

.detail-l>.right{
width:350px;
height:350px;
position:absolute;
top:0px;
right:-400px;
overflow:hidden;
display:none
}
.detail-l>.right>img{
position:absolute;
width:700px;
height:700px
}
.smallbanner-box{
width:350px;
height:80px;
padding-top:15px;
position:relative;
overflow:hidden
}
.prev{
width:10px;
height:18px;
position:absolute;
left:-15px;
top:386px;
background:url(../../assets/images/smprev.png);
background-size:10px 18px;
z-index:1;
}

.next{
width:10px;
height:18px;
position:absolute;
right:-15px;
top:386px;
background:url(../../assets/images/smnext.png);
background-size:10px 18px;
z-index:1;
}
.smallbanner{
position:absolute;
display:flex;
transition: 0.3s;
}
.smallbanner li{
width: 70px;
padding : 0px 5px;
box-sizing : border-box;
border : 1px solid white
}
.smallbanner img{
width:58px;
height:58px;
}
.smallbanner .active{
border : 1px solid black
}
.detail>p{
float:right;
width:330px;
margin:0px 10px 10px;
height:auto
}
.detail>p:first-of-type>a{
color:black;
float:left;
padding-left:20px;
font-size:12px;
line-height:12px;
background:url(../../assets/images/detail-a1.png) no-repeat;
background-size:12px
}
.detail>p:nth-of-type(2)>a{
font-size:24px;
color: #878787
}
.detail>p:nth-of-type(3){
font-size:24px
}
.detail>p:nth-of-type(4){
font-size:12px;
color:gray
}
.detail>p:nth-of-type(4)>span{
color:#1083FF;
font-size:18px;
}
.detail>p:nth-of-type(5){
padding-left:2em;
box-sizing:border-box
}
.detail>p:nth-of-type(5)>span{
padding-left: 17px;
color:gray;
}
.detail>p:nth-of-type(5)>span:first-child{
background: url(../../assets/images/myf.png) no-repeat left center;
background-size: 14px 14px;
}
.detail>p:nth-of-type(5)>span:last-child{
background: url(../../assets/images/zbsq.png) no-repeat left center;
background-size: 14px 14px;
}
.detail>p:nth-of-type(6){
color:gray;
font-size:12px;
/* display:block */
display:none
}
.detail>p:nth-of-type(6)>span{
display:inline-block;
text-align:center;
vertical-align:middle;
border:1px solid rgba(0,0,0,0)
}
.detail>p:nth-of-type(6)>span>a{
color:black;
font-size:12px
}
.detail>p:nth-of-type(6)>span:hover{
border:1px solid black
}
.detail>p:nth-of-type(6)>span>a>img{
width:34px;
height:34px
}
.detail>p:nth-of-type(7){
color:gray;
font-size:12px;
display: flex;
}
.btn-content{
	display: flex;
	margin-left: 10px;
}
.reduce, .add{
	padding: 3px 10px;
	background: #999;
	cursor: pointer;
	user-select: none;
}
.num{
	width:40px;
	height: 24px;
	text-align: center;
	outline: none;
	margin: 0 10px;
}

.detail>p:nth-of-type(8) input:first-child{
color:white;
background-color:black;
width:330px;
height:42px;
font-size:18px;
cursor:pointer
}
.detail>p:nth-of-type(8) input:nth-child(n+2){
width:162.5px;
height:42px;
background:white;
font-size:18px;
cursor:pointer;
margin-top:10px
}
.product_banner>img{
width:750px
}
.detail-bt>p:first-child{
font-size:18px;
margin:20px 0px;
padding-left:25px;
background:url(../../assets/images/detail-btbg1.png) no-repeat 0px center;
background-size:20px 21px;
}
.detail-bt>p:nth-child(2){
font-size:12px
}
.detail-bt>p:nth-child(3){
font-size:18px;
margin:20px 0px;
padding-left:25px;
background:url(../../assets/images/detail-btbg2.png) no-repeat 0px center;
background-size:20px 21px;
}
.detail-bt>p:nth-child(n+4){
font-size:12px;
line-height:32px
}
.aftersale{
display:block;
color:black;
margin-top:30px;
position:relative;
}
.aftersale>span{
border:1px solid black;
border-radius:2px;
padding:3px 20px
}
.aftersale>div{
width:100%;
position:absolute;
top:-628px;
font-size:12px;
display:none;
padding-bottom:50px
}
.aftersale>div:hover{
display:block
}
.aftersale>div>div{
height:500px;
padding:50px;
border:2px solid gray;
background-color:white;
}
.aftersale>span:hover+div{
display:block
}
.box-r{
width:235px;
float:right;
line-height:24px
}
.box-r>div{
padding-bottom:20px
}
.box-r>div>a{
display:block;
color:black;
font-size:12px
}
.box-r>div>a>img{
width:200px
}
.box-r>div>p{
font-size:12px;
color:gray
}
.box-r>div>p>span:first-child{
font-size:18px;
color:#3193F3
}
.box-r>div>p>span:last-child{
text-decoration:line-through
}

</style>