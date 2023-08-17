<template>
	<!-- {{getCatId}} -->
	<!-- 分类商品 -->
	<div class="main">
		<p>
			<router-link :to="{name: 'index'}">良仓</router-link>&gt;
			<router-link :to="{name: 'shop'}">商店</router-link>&gt;
			<router-link v-if="$route.query.catId" :to="{name: 'classify', query:{catId: $route.query.catId} }">{{nowQueryCatId.title}}</router-link><span v-if="$route.query.Id">></span>
			<router-link v-if="$route.query.Id" :to="{name: 'classify', query:{catId: $route.query.catId,Id: $route.query.Id} }">{{ nowQueryId.product_content }}</router-link>
		</p>
			<!-- <h3 v-for="(item,index) in smallCatList" :key="item.cat_id" v-if="item.cat_id==catId" >
				{{ item.title }}:
				<span v-if="item.cat_id==catId" v-for="item in smallCatList[index].data">{{ item.id }}</span>
			</h3> -->
			<div>
				<ul class="classifynav">
					<li>
						<a href="shop.html">新品</a>
					</li>
					<li v-for="(item,index) in catList" :key="item.cat_id">
						<router-link :to="{name: 'classify', query:{catId: item.cat_id} }">{{ item.cat_name }}</router-link>
						<!-- <a href="classify.html?catId=0045">{{ item.cat_name }}</a> -->
						<div :style="{top : index<=8 ?'31px' : '81px'}">
							<router-link v-for="item in getSmallData(item.cat_id).data" :key="item.id" :to="{name: 'classify', query:{catId: getSmallData(item).cat_id,Id: item.id} }">{{ item.product_content }}</router-link>
							
						</div>
					</li>
				</ul>
				<div class="priceselect">
	<a href="javascript:;">价格筛选<span></span></a>
	<p>
		<a class="activeoption" href="javascript:;">全部</a>
		<a href="javascript:;">0-300</a>
		<a href="javascript:;">301-1000</a>
		<a href="javascript:;">1001-2000</a>
		<a href="javascript:;">2001-4000</a>
		<a href="javascript:;">4001以上</a>
	</p>
	</div>
			</div>
		<ul class="shoplist">
			<!-- <tr> -->
				<li v-for="item in goodsList" :key="item.goods_id">
					<router-link :to="{name: 'product', query:{catId: $route.query.catId,Id: $route.query.Id,goodsId:item.goods_id} }">
						<div>
							<h1>￥{{item.price}}</h1>
							<p>{{item.goods_name}}</p>
							<span>{{item.goods_desc}}</span>
						</div>
						<img :src="item.goods_thumb" alt="">

					</router-link>
					<a href="javascript:;">
						<img :src="item.brand_thumb" alt="">{{item.brand_name}}
					</a>
					<h5>0<a href="javascript:;"></a></h5>
				</li>
			<!-- </tr> -->
		</ul>
		<jh-pagination justify-content="flex-end" v-model:now-page="nowPage" :page-count="pageCount" :color="'white'"></jh-pagination>

	</div>

</template>

<script>
	// 引入，注册局部组件
	// import WjPagination from '../../components/pagination/WjPagination.vue'
	
	export default {
		data(){
			return {
				goodsList : [],
				pagesize : 6,
				nowPage : 1,
				pageCount : 0,
				// catId : this.$route.query.catId,
				nowQueryCatId : {},
				nowQueryId : {},
				catList : [],
				smallCatList :[]
			}
		},

		// 还可以监听路由就化
		watch : {
			'$route.query' : {
				async handler(newVal, oldVal){
					// console.log(newVal, oldVal);
					// console.log('fu',this.nowPage,newVal);
					// 默认请求第一页
					this.getQueryName();
					this.goodsList = await this.jhAPI.getData('/api_goods', {
						catId : this.$route.query.catId,
						pagesize : this.pagesize,
						page : this.nowPage
					});
					// 请求总页数
					 this.pageCount=await this.jhAPI.getData('/api_goods', {
						catId : this.$route.query.catId,
						pagesize : this.pagesize,
					},'data.page')
					
					// 设置分页器为第一页
					this.nowPage = 1;
					// console.log('fu',this.nowPage,newVal);

				},
				
				// 强制立即执行回调
				immediate : true
			},
			nowPage : {
				async handler(newVal,oldVal){
					// console.log('funowPage',newVal,oldVal)

					this.goodsList = await this.jhAPI.getData('/api_goods', {
						catId : this.$route.query.catId,
						pagesize : this.pagesize,
						page : newVal
					});
					// console.log(this.goodsList)
				}
			},
			'$parent.$parent.smallCatList' : {
				handler(newVal, oldVal){
					// console.log(newVal, oldVal);
					
					// console.log(this.$parent.$parent.smallCatList)
					this.catList = this.$parent.$parent.catList
					this.smallCatList = this.$parent.$parent.smallCatList
					// this.nowQueryCatId = this.smallCatList.find((item) => {
					// 	return item.cat_id == this.$route.query.catId						
					// });
					// // console.log(this.nowQueryCatId)
					// this.nowQueryId = this.nowQueryCatId.data.find((item) => {
					// 	return item.id == this.$route.query.Id						
					// });
					this.getQueryName()
					// console.log(this.nowQueryCatId,this.nowQueryId)
				},
				immediate : true

			}
		},
		
			
		methods : {
			getQueryName(){
				if(!this.smallCatList[0]){return}
				this.nowQueryCatId = this.smallCatList.find((item) => {
					return item.cat_id == this.$route.query.catId						
				});
				if(!this.$route.query.Id){return}
				// console.log(this.nowQueryCatId.data)
				this.nowQueryId = this.nowQueryCatId.data.find((item) => {
					return item.id == this.$route.query.Id						
				});

			},
			getSmallData(val){
				return this.smallCatList.find((item) => {
					return item.cat_id == val	|| item.data.some(item => {return item == val})
				})
			},
			toProduct(id){
				this.$router.push({path : '/home/product', query : {goodsId : id}})
			}
			
		}
		
		

	}
</script>

<style scoped>
	
	/* 热闹商品 */
	/* .main{
	width:1000px;
	margin:20px auto 0px
} */
.main>p:first-child{
	font-size:12px;
	color:#CECECE;
	margin-bottom:10px
}
.main>p{
	font-size:14px;
	color:#CECECE;
	margin-bottom:10px
}
.main>p>a{
	color:gray;
	opacity:0.4
}
.main>p>a:hover{
	opacity:1
}
.main>p>a:last-child{
	opacity:1
}

.main>div:first-of-type{
	margin-top:20px;
	display:flex;
	position:relative
}
.priceselect{
	width:200px;
	text-align:right;
	border-bottom:1px solid #EDEDED;
	position:relative;
	height:30px;
}
.priceselect>a{
	color:black;
	font-size:14px;
	/* width:100%; */
	display:block;
	height:30px;
	line-height:30px;
	box-sizing:border-box
}
.priceselect>a>span{
	background:url(../../assets/images/icon.png) no-repeat -188px -381px;
	display:inline-block;
	width:18px;
	height:30px;
	vertical-align:bottom
}

.priceselect>p{
	position:absolute;
	height:0px;
	overflow:hidden;
	right:0px;
	top:29px;
	display:none;
	width:95px;
	z-index:1;
	background:white;
	border:1px solid #949494
}
.priceselect>p:hover{
	display:block
}
.priceselect>p>a{
	color:gray;
	display:block;
	height:39px;
	text-align:left;
	line-height:39px;
	padding-left:10px;
	border-bottom:1px solid #949494;
	font-size:12px
}
.priceselect>p>a:hover{
	color:white;
	background:black
}
.priceselect>p>.activeoption{
	color:white;
	background:black
}
.classifynav{
	width:800px;
	display:flex;
	flex-wrap:wrap;
	position:relative
}
.classifynav li{
	
	margin-bottom:20px;
	width:64px;
	text-align:center;
	border-bottom:1px solid #EDEDED;
	padding-right:16px
}
.classifynav li>a:hover{
	border-bottom:1px solid black;
}
.classifynav li:first-child>a{
	padding-left:30px;
	background:url(../../assets/images/icon.png) no-repeat -173px -584px
}

.classifynav li>a{
	display:inline-block;
	color:black;
	font-size:14px;
	width:100%;
	height:30px;
	line-height:30px;
	box-sizing:border-box
}
.classifynav li>div{
	width:1000px;
	border:1px solid #ededed;
	height:100px;
	background:white;
	position:absolute;
	/* top:31px; */
	left:0px;
	z-index:1;
	display:none;
	flex-wrap:wrap;
	justify-content:space-around;
	align-content:space-around
	
}
.classifynav li:hover div{
	display:flex
}
.classifynav li>div>a{
	width:100px;
	color:black;
	font-size:12px
}
.shoplist{
	width:1000px;
	text-align:center;
	display:flex;
	flex-wrap: wrap;
	justify-content:start;
	/* margin-bottom:30px */
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
</style>