<template>
		<div class="banner">
			<img src="../../assets/images/paybanner.jpg" alt="">
		</div>
		<div class="main">
			<div class="main-top">
				<span>|</span>
				<span>购物车</span>
				<span>|</span>
				<span>付款</span>
				<span>|</span>
			</div>
			<div class="main-mid">
				<p>收货地址</p>
				<a v-if="addressListLength>4" v-show="addressLeft>0" @click="addressLeft--" class="prev" href="javascript:;"></a>
					<a v-if="addressListLength>4" v-show="addressLeft<addressListLength-4" @click="addressLeft++" class="next" href="javascript:;"></a>
				<div class="addressbox" :style="{height : addressList[0] ? '200px' : '0px'}">
					<ul class="addresslist" :style="{left:-250*addressLeft+'px'}">
						<transition-group name="address" enter-active-class="animate__animated animate__slideInDown" leave-active-class="animate__animated animate__slideOutUp">
							<li v-for="item in addressList" :key="item.address_id" :class="item.isDefault ?'active' : null">
								<p><span>{{ item.takename }}</span><span>{{item.tel}}</span></p>
								<p>{{item.province}} {{item.city}} {{item.district}}</p>
								<p>{{ item.streetname }}</p>
								<p><a :class="item.isDefault ?'' : 'set-default'" href="javascript:;" @click="item.isDefault ? '' : Setdefault(item.address_id)">{{item.isDefault ?'默认地址' : '设为默认'}}</a><span><a class="edit-address" href="javascript:;" @click="EditAddress(item.address_id)">编辑</a><a class="delete-address" href="javascript:;" @click="DeleteAddress(item.address_id)">删除</a></span></p>
							</li>
						</transition-group>

					</ul>
				</div>
				<div>
					<label><input class="new-address" type="checkbox" v-model="isAddAddress" :key="isAddAddress">使用新地址</label>
					<transition name="input" enter-active-class="animate__animated animate__rollIn">
						<form class="input-address" v-show="isAddAddress" :key="isAddAddress">
							<table>
								<tr>
									<td>收货人姓名</td>
									<td>
										<input class="takename" type="text" v-model="takename">
									</td>
								</tr>
								<tr>
									<td>省/市</td>
									<td>
										<select class="province" @click="SelectBtn" :value="province">
											<!-- <option :value="province">{{province}}</option> -->
											<option value="所在省份">所在省份</option>
											<option v-for="item in provinceOpts" :key="item.code" :value="item.name">{{ item.name }}</option>
										</select>
										<select class="city" @click="SelectBtn" :value="city">
											<!-- <option :value="city">{{city}}</option> -->
											<option value="所在市">所在市</option>
											<option v-for="item in cityOpts" :key="item.code" :value="item.name">{{ item.name }}</option>
										</select>
										<select class="county" @click="SelectBtn" :value="district">
											<!-- <option :value="district">{{district}}</option> -->
											<option value="所在区县">所在区县</option>
											<option v-for="item in districtOpts" :key="item.code" :value="item.name">{{ item.name }}</option>

										</select>
									</td>
								</tr>
								<tr>
									<td>详细地址</td>
									<td>
										<textarea class="streetname" style="resize:none;width:400px;height:20px" v-model="streetname"></textarea>
									</td>
								</tr>
								<tr>
									<td>手机号码</td>
									<td>
										<input class="tel" type="text"  v-model="tel">
									</td>
								</tr>
								<tr>
									<td></td>
									<td>
										<input type="button" class="postaddress" value="保存地址" @click="addAddress">
									</td>
								</tr>
							</table>
						</form>
					</transition>
				</div>
				<p>订单详情<a href="javascript:;" @click="cartListHide" ref="cartListHideBtn"></a></p>
				<div class="car-list" ref="cartList">
					<transition name="slide" enter-active-class="animate__animated animate__slideInDown" leave-active-class="animate__animated animate__slideOutUp">
						<!-- <table></table> -->
						<table v-show="!isCartListHide">
							<tbody>
								<tr v-for="item in nowCartList" :key="item.goods_id">
									<td>
										<img :src="item.goods_thumb || item.banner[0]" alt="">
									</td>
									<td>
										<p>{{ item.goods_name }}</p>
										<p>数量：一个;</p>
									</td>
									<td>数量：{{item.goods_number}}个</td>
									<td>￥{{item.price*item.goods_number}}</td>
								</tr>
							</tbody>
						</table>
					</transition>
				</div>
			</div>
			<div class="main-bt">
				<form>
					<table>
						<tr>
							<td>备注：</td>
							<td>
								<textarea style="resize:none;width:685px;height:28px" placeholder="您可在此写下订单备注,不得超过350字符"></textarea>
							</td>
						</tr>
						<tr>
							<td>激活代金券</td>
							<td>
								<input type="text" placeholder="请输入代金券">
							</td>
							<td>
								<a href="javascript:;">确认使用</a>
							</td>
							<td>
								<a href="">代金券使用方法</a>
							</td>
							</tr>
						<tr class="payway">
							<td>结算方式</td>
							<td>
								<label>
									<input type="radio" checked="checked" disabled>
									<img src="../../assets/images/zfb.png" alt="">
								</label>
							</td>
						</tr>
					</table>
				</form>
				<p>若您遇到支付问题，请联系客服热线 400 897 6336（工作日 09:00-18:00）</p>
				<a href="">结算</a>
				<div>
					<p>代金券减免   - 0.00元</p>
					<p>满减活动减免   - 0.00元</p>
					<p>折扣活动减免   - 0.00元</p>
					<p>付款总额 : <span class="fukuanzonge">{{priceAll}}</span></p>
					<p>¥9999999</p>
					<p>为您节省   0.00元</p>
					<p>(含¥0.00礼物包装费)</p>
				</div>
			</div>
		</div>

</template>

<script>
export default{
	data() {
		return {
			addressList : [],
			addressListLength : 0,
			addressLeft : 0,
			isAddAddress : false,
			isCartListHide : false,
			province:'所在省份',
			city:'所在市',
			district:'所在区县',
			takename:'',
			streetname:'',
			tel:'',
			// countryOpts : {},
			provinceOpts : [],
			cityOpts : [],
			districtOpts : [],
			isEdit: null,
			// countryOpts : {this.cityList,this.districtList},
			nowCartList : [],
			cartHeight : 0
		}
	},
	created () {
		this.getCart()
		this.getAddress()
		this.getcountry({})
	},
	watch: {
		cityList(newValue, oldValue) {
			if(!newValue){return}
			newValue.then(res => {
				console.log(res);
				this.cityOpts = res
			})
		},
		districtList(newValue, oldValue) {
			if(!newValue){return}
			newValue.then(res => {
				console.log(res);
				this.districtOpts = res
			})
		},
	},
	computed: {
		// NewAddressList(){
		// 	console.log(this.addressList.unshift(...this.addressList.splice(this.addressList.findIndex(item => item.isDefault),1)))
		// 	return this.addressList.unshift(...this.addressList.splice(this.addressList.findIndex(item => item.isDefault),1))
		// },
		priceAll() {
			// console.log(1,this.$refs)
			let price = 0;
			this.nowCartList.forEach(item => {
				price += item.price*item.goods_number
			})
			// console.log(price)
			return price
		},
		cityList(){
			if(this.province != '所在省份'){
				return this.getcountry({'province':this.province})
			}
			return
		},
		districtList(){
			if(this.city != '所在市'){
				return this.getcountry({'province':this.province,'city':this.city})
			}
			return
		}
	},
	methods: {
		async getcountry(obj){
			let res = await this.jhAPI.getData('/api_country',obj);
			// console.log(res)
			if('city' in obj){
				return res.area || res
			}
			if('province' in obj){
				return res
			}
			this.provinceOpts = res
		},
		SelectBtn(e){
			if(e.pointerId){return}
			switch (e.target.className) {
				case 'province':
					this.province = e.target.value
					console.log(this.province,'change')
					break;
				case 'city':
					this.city = e.target.value
					break;
				case 'county':
					this.district = e.target.value
					break;
			
				default:
					break;
			}
			// if(e.target.className == 'province'){
			// 	this.province = e.target.value
			// }
			// console.log(e.target.className,e.target.value)
			
		},
		cartListHide() {
			this.isCartListHide = !this.isCartListHide;
			this.$refs.cartListHideBtn.style.transform = this.isCartListHide ? 'rotate(180deg)' : null;
			// this.$refs.cartList.style.height = this.isCartListHide ? '0px' : null
		},
		defaultFirst(arr){
			this.addressListLength = arr.length;
			this.addressLeft = 0;
			// console.log(arr,arr.length);
			if(arr.length <= 1){
				this.addressList = arr;
				console.log(this.addressList);
				this.isAddAddress = arr.length ? false : true
				return
			}
			arr.unshift(...arr.splice(arr.findIndex(item => item.isDefault),1));
			this.addressList = arr;
			// console.log(this.addressList);
		},
		async getAddress(){
			let res = await this.jhAPI.postData('/api_address',{userId:localStorage.token,status:'getAddress'});
			if(res.code !=0 ){
				console.log(res);
				return
			};
			if(res.data.length != 0 && !res.data.some(item => item.isDefault)){
				this.Setdefault(res.data[0].address_id);
				return
			}
			this.defaultFirst(res.data)
			// this.addressList = res.data
			// this.addressList.unshift(...this.addressList.splice(this.addressList.findIndex(item => item.isDefault),1))
		},
		async Setdefault(addressId){
			let res = await this.jhAPI.postData('/api_address',{addressId,userId:localStorage.token,status:'defaultAddress'})
			if(res.code != 0){
				console.log(res);
				return
			}
			// console.log(res.message,res.data);
			this.defaultFirst(res.data)
		},
		async addAddress(){
			let res = await this.jhAPI.postData('/api_address',
		{
			'status':'addAddress',
			'userId':localStorage.token,
			province:this.province,
			city:this.city,
			district:this.district,
			takename:this.takename,
			streetname:this.streetname,
			tel:this.tel
		});
			if(res.code !=0 ){
				console.log(res);
				return
			};
			this.province = '所在省份';
			this.city = '所在市';
			this.district= '所在区县';
			this.takename= '';
			this.streetname= '';
			this.tel= ''
			this.isAddAddress = false;
			// res.data[0].isDefault = false
			if(this.isEdit){
				this.DeleteAddress(this.isEdit);
				this.isEdit = false
				return
			}
			this.addressList.unshift(res.data[0])

			// console.log(this.addressList.length,this.addressList,res.data[0])
			if(this.addressList.length == 1){
				this.Setdefault(res.data[0].address_id)
				return
			}
			this.defaultFirst(this.addressList)
			// console.log()
			// get
		},
		EditAddress(addressId){
			// console.log(addressId)
			this.isEdit = addressId;
			this.isAddAddress = true;
			this.addressList.forEach(item => {
				if(item.address_id == addressId){
					console.log(item.address_id)
					this.province = item.province
					// console.log(this.province)
					this.city = item.city
					this.district= item.district
					this.takename= item.takename
					this.streetname= item.streetname
					this.tel= item.tel
				}

			})
			console.log(this.isEdit,)
		},
		async DeleteAddress(addressId){
			let res = await this.jhAPI.postData('/api_address',{addressId,userId:localStorage.token,status:'deleteAddress'})
			if(res.code != 0){
				console.log(res);
				return
			}
			console.log(res.message);
			this.getAddress()
			// this.defaultFirst(res.data)
		},
		async getCart(){
			if(this.$route.query.goodsId&&this.$route.query.goodsNumber){
				// console.log(this.$route.query.goodsId,this.$route.query.goodsNumber);
				this.nowCartList =await this.jhAPI.getData('/api_goods', {goodsId : this.$route.query.goodsId});
				if(!this.nowCartList[0]){return}
				this.nowCartList[0].banner.forEach((item, index) => {
					this.nowCartList[0].banner[index] = item.replace("url('", '').replace("')", '');
				});
				this.nowCartList[0].goods_number = this.$route.query.goodsNumber
				console.log(this.nowCartList)
				return
			}

			let res = await this.jhAPI.postData('/api_cart',{userId:localStorage.token,status:'viewcart'})
			if(res.code != 0){
				console.log(res);
				return
			}
			if(this.$route.query.selectedCart){
				// console.log(this.$route.query.selectedCart)
			}
			this.nowCartList = res.data.filter(item => {
				return this.$route.query.selectedCart.includes(item.goods_id)
			})
			console.log(this.nowCartList);

		}
	},
}
</script>

<style scoped>
.address-move{transition: .5s;}
.address-leave-active{
	position: absolute;
}
.banner{
	margin-top:10px;
	text-align:center
}
.main{
	width:1000px;
	margin:0px auto
}
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
.main-top span:nth-child(4){
	color:#6393B4
}
.main-mid{
	position:relative
}
.main-mid>p{
	padding:20px 0px;
	border-bottom:1px solid gray
}
.main-mid>p a{
	float:right;
	height:32px;
	width:32px;
	transition: 0.3s;
	background:url(../../assets/images/pa-mid-p2.png) no-repeat right 0px
}
.main-mid>a{
	/* display:none; */
	width:10px;
	height:18px;
	position:absolute;
	top:150px
}
.main-mid>a:first-of-type{
	left:-15px;
	background:url(../../assets/images/smprev.png);
	background-size:10px 18px
	
}
.main-mid>a:nth-of-type(2){
	right:-15px;
	background:url(../../assets/images/smnext.png);
	background-size:10px 18px
}
.addressbox{
	width:100%;
	position:relative;
	overflow:hidden
}
.addresslist{
	transition: 0.5s;
	position:absolute;
	user-select:none;
	display:flex
}
.addresslist>li{
	padding:15px;
	width:200px;
	height:152px;
	border:2px solid gray;
	margin:8px;
	position:relative;
}
.addresslist .active{
	border-color:#7295B1;
}
.addresslist .active>p:last-child>a:first-child{
	cursor:default;
	color:#90C9EE
}
.addresslist>li:hover{
	border-color:#7295B1;
}
.addresslist>li>p{
	font-size:13px;
	color:#999999;
	overflow:hidden;
	display:flex;
	justify-content:space-between;
}

.addresslist>li>p:first-child{
	line-height:30px;
	border-bottom:1px solid #EDEDED
}
.addresslist>li>p:last-child{
	position:absolute;
	width:200px;
	bottom:15px
}

.addresslist>li>p:last-child a{
	color:#999999;
	margin-right:10px
}
.addresslist>li>p:last-child a:hover{
	color:#90C9EE
}
.main-mid>div>label{
	user-select:none;
	font-size:12px;
	color:#999999
}
.main-mid form{
	user-select:none;
	/* display:none; */
	padding:20px 0px
}
.main-mid form tr{
	display:flex;
	justify-content:start
}
.main-mid form td{
	margin:10px 10px;
	height:30px
}
.main-mid form td:first-child{
	width:80px
}
.main-mid form table .postaddress{
	display:block;
	color:white;
	border:0px;
	cursor:pointer;
	height:30px;
	line-height:30px;
	background:#7FA6C5;
	padding:0px 10px;
	text-align:center
}
.car-list{
	overflow:hidden;
	/* transition: 1s; */
	height: auto;
}
.car-list table{
	width:100%;
	border-bottom:3px solid gray
}
.car-list tr{
	display:flex;
	border-bottom:1px solid gray
}
.car-list td{
	padding:10px 0px;
	font-size:12px;
	color:gray
}
.car-list td img{
	width:70px;
	height:70px
}
.car-list td:nth-child(n+3){
	width:17%
}

.car-list td:nth-child(2){
	padding:10px 100px;
	flex:1;
}
.main-bt{
	position:relative
}
.main-bt form{
	margin-bottom:200px
}
.main-bt td{
	float:left;
	margin:10px 5px;
	color:gray;
	font-size:12px;
	line-height:28px
}

.main-bt textarea{
	background-color:#EEEEEE;
	border:0px;
	line-height:28px
}
.main-bt tr:nth-child(2) td:nth-child(2) input{
	height:28px;
	border:2px solid gray
}
.main-bt tr:nth-child(2) td:nth-child(3) a{
	display:block;
	color:white;
	height:30px;
	line-height:30px;
	background:#7FA6C5;
	padding:0px 10px;
	text-align:center
}
.main-bt tr:nth-child(2) td:last-child a{
	color:gray;
	text-decoration:underline
}
.payway{
	display:flex;
	flex-direction:column;
	position:absolute;
	bottom:100px;
	left:50%;
	margin-left:-40px
}
.main-bt>p{
	color:#7FA6C5;
	text-align:center;
	font-size:12px
}
.main-bt>a{
	display:block;
	color:white;
	height:30px;
	line-height:30px;
	background:#7FA6C5;
	width:168px;
	margin:10px auto 0px;
	text-align:center
}
.main-bt>div{
	position:absolute;
	right:0px;
	bottom:20px
}
.main-bt>div>p{
	text-align:right;
	font-size:12px;
	color:gray;
	line-height:36px
}
.main-bt>div>p:nth-child(4){
	font-size:15px
}
.main-bt>div>p:nth-child(4) span{
	font-size:20px;
	color:#6393B4
}
.main-bt>div>p:nth-child(5){
	color:black;
	text-decoration:line-through;
	font-style:italic;
	font-size:18px
}
.main-bt>div>p:nth-child(6){
	color:red
}

</style>