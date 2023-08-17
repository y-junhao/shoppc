<template>
	<div class="main">
		<div class="main-top">
			<span>|</span>
			<span>购物车</span>
			<span>|</span>
			<span>付款</span>
			<span>|</span>
		</div>
		<div class="main-mid">
			<div v-if="!newcartList[0]" class="buy0"><img src="../../assets/images/buy0.png" alt=""><p>您的购物车还是空的</p></div>
			<div v-if="newcartList[0]" class="car-list">
				<table>
					<tr>
						<!-- <td><label><input @change="changeNewcheckAll" class="all-select" type="checkbox">全选</label></td> -->
						<td><label><input class="all-select" type="checkbox" v-model="newcheckAll">全选</label></td>
						<!-- <td><label><input @change="console.log($event.target.checked,newcheckAll)" :checked="newcheckAll" class="all-select" type="checkbox" v-model="newcheckAll">全选</label></td> -->
						<!-- <td><label><input @change="changeNewcheckAll" class="all-select" type="checkbox" v-model="newcheckAll">全选</label></td> -->
						<td>良品</td>
						<td>数量  </td>
						<td>单价(元)</td>
						<td>小计(元)</td>
						<td>操作</td>
					</tr>
					<tr v-for="item in newcartList" :key="item.id">
						<td>
							<!-- <input @change="changeOne(item.isChecked)" type="checkbox"> -->
							<input @change="newcheckAll =  item.isChecked ? newcheckAll : false " type="checkbox" v-model="item.isChecked">
							<!-- <a :href="item.hrefBaseMsg"> -->
								<router-link :to="{name: 'product', query:{goodsId: 'value'} }">
								<img :src="item.goods_thumb" alt="">
								<p>{{item.goods_name}}</p>
								<p>数量：一个;</p>
								</router-link>
							<!-- </a> -->
						</td>
						<td><a :goodsId="item.goods_id" :tonum="parseInt(item.goods_number)-1" @click="clickReduceAdd(item.goods_id, 'reduce')" class="numsubtract" href="javascript:;">-</a> <span>{{item.goods_number}}</span> <a :goodsId="item.goods_id" :tonum="parseInt(item.goods_number)+1" @click="clickReduceAdd(item.goods_id, 'add')" class="numadd" href="javascript:;">+</a></td>
						<td>{{item.price}}</td>
						<td>{{item.price * item.goods_number}}</td>
						<td><a :goodsId="item.goods_id" @click="del(item.goods_id)" class="del" href="javascript:;">删除</a></td>
				
					</tr>
				</table>
			</div>
		</div>
		<div v-if="newcartList" class="main-bt">
			<p>良品总价/ <span class="lpzongjia" v-cloak>￥{{priceAll}}</span></p>
			
			<p><router-link :to="{name: selectedCart[0] ?'address' : 'cart', query:{selectedCart} }">立即结算</router-link></p>
			<p></p>
			<a class="goback" href="javascript:;" @click="goback" >继续购物</a>
		</div>

	</div>
</template>

<script>
	export default{
		data(){
			return{
				newcartList : null,
				newcheckAll : true,
				fromPath : '',
				fullPath : ''
			}
		},
		watch: {
			newcheckAll(newValue, oldValue) {
				if(newValue == false && this.newcartList.some(item => {return item.isChecked == false})){return}
				// console.log(newValue, oldValue);
				this.newcartList.forEach(item => {
					item.isChecked = this.newcheckAll;
				});
			},
			'$parent.$parent.cartList': {
				handler(newValue, oldValue) {
					console.log('fromparent',newValue)
					this.newcartList = newValue;
					console.log(this.newcartList)
					this.newcartList.forEach(item =>{
						item.isChecked = true;
					})

				},
				immediate : true
			}
		},
		computed: {
			priceAll(){
				let all = 0;
				this.newcartList.forEach(item => {
					if(item.isChecked){
						all += item.goods_number * item.price;
					};
				});
				return all;
			},
			selectedCart(){
				let idArray = [];
				this.newcartList.forEach(item => {
					if(item.isChecked){
						idArray = [...idArray,item.goods_id]
					}
				})
				// console.log(idArray)
				return idArray
			}
		
		},
		methods : {
			// toParent(){
			// 	console.log('toParent')
			// 	this.$emit('update-parent',this.newcartList)
			// },

			// async getCart(){
			// 	let res = await this.jhAPI.postData('/api_cart',{userId:localStorage.token,status:'viewcart'});
			// 	if(res.code != 0){
			// 		console.log(res);
			// 		return
			// 	};

			// 	this.newcartList = res.data;
			// 	console.log(this.newcartList)
			// 	this.newcartList.forEach(item =>{
			// 		// item.hrefBaseMsg = 'detail.html?goodsId=' + item.goods_id;
			// 		item.isChecked = true;

			// 	})

			// },
			async clickReduceAdd(id, status){
				let item = this.newcartList.find(item => {
					// if(item.goods_id != id){return}
					return item.goods_id == id
				})

				let nownum = item.goods_number;
				if(status == 'add'){
					nownum++;
					nownum = nownum >= 10 ? 10 : nownum;
				}else{
					nownum--;
					nownum = nownum <= 1 ? 1 : nownum;
				}
				if(nownum == item.goods_number){return};
				let res = await this.jhAPI.postData('/api_cart',
					{ 
						userId:localStorage.token,
						goodsId:id,
						goodsNumber:nownum,
						status:'addcart',
					}
				);
				if(res.code != 0){
					console.log(res);
					return
				};

				item.goods_number = nownum;



				// });
				
			},

			async del(id){
				let index = this.newcartList.findIndex(item => {
					return item.goods_id == id
				})

				let res = await this.jhAPI.postData('/api_cart',
					{ 
						userId:localStorage.token,
						goodsId:id,
						status:'delcart',
					}
				);
				if(res.code != 0){
					console.log(res);
					return
				};

				this.newcartList.splice(index, 1);
								// this.toParent()

			},
			goback(){
				if(this.fromPath == '/home/classify' || this.fromPath == '/home/product'){
						this.$router.push(this.fullPath);
				}else{
					this.$router.push('/');
				}

			}
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
				vm.fromPath = from.path;
				vm.fullPath = from.fullPath;	
			});
		},

	}

</script>

<style scoped>
.main-top{
	height:30px;
	margin:50px auto 10px;
	width:300px;
	color:gray;
	text-align:center;
	display:flex
}
.main-top span{
	flex:1
}
.main-top span:nth-child(2){
	color:#6393B4
}
.buy0{
	width: 640px;
	height: 280px;
	margin:96px auto 0px;
	font-size:30px;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	color:gray;
	border:3px solid;
	/* display:none */
}
.buy0 img{
	width:150px;
	height:110px
}
.car-list table{
	width:100%;
	user-select:none;
}
.car-list tr{
	display:flex;
	border-bottom:2px solid #C8C8C8
}
.car-list td{
	padding:10px 0px
}
.car-list td:nth-child(n+2){
	width:17%
}
.car-list td:first-child{
	flex:1;
	padding-right:100px
}
.car-list td:first-child a{
	color:gray
}
.car-list td:last-child a{
	color:#6393B4
}
.car-list tr:nth-child(n+2) input,.car-list img{
	float:left
}
.car-list tr:nth-child(n+2) td{
	font-size:12px
}

.car-list img{
	width:70px;
	height:70px
}
.main-bt{
	display:flex;
	flex-direction:column;
	align-items:center
}
.main-bt p{
	text-align:center;
	width:168px;
	margin-top:25px
}
.main-bt span{
	font-size:20px;
	color:#197BC9
}
.main-bt p>a{
	display:block;
	color:white;
	width:100%;
	height:30px;
	line-height:30px;
	background:#7FA6C5
}
.main-bt p:last-of-type{
	border-bottom:1px solid gray
}
.main-bt>a{
	position:relative;
	top:-13px;
	color:black;
	background:white
}

</style>