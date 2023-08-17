<template>
	<!-- 首页页面 -->
	<div class="home">
		<!-- 调用头部组件 -->
		<lc-header :cat-list="catList" :small-cat-list="smallCatList" :username="username" :is-top="isTop" :cart-list="cartList"></lc-header>
		<!-- 调用导航分类组件 -->

		
		<!-- 子路由出口 -->


		<router-view />

		
		<!-- 调用底部组件 -->
		<lc-footer :is-top="isTop"></lc-footer>
		
	</div>
</template>

<script>
	// 引入子组件
	import LcHeader from '../components/LcHeader.vue'
	import LcFooter from '../components/LcFooter.vue'
	
	export default {
		name : 'HomeView',
		components : {
			LcHeader,
			LcFooter
		},
		data(){
			return {
				catList : [],
				smallCatList :[],
				isTop : true,
				scrollTop : 0,
				cartList : [],
				username : null
			}
		},
		
		async created(){
			// this.getCatData();
			this.catList = await this.jhAPI.getData('/api_cat');
			this.smallCatList = await this.jhAPI.getData('/api_classify')
			if(!localStorage.username || !localStorage.token){return}
			this.username = localStorage.username;
			let res = await this.jhAPI.postData('/api_cart',{userId:localStorage.token,status:'viewcart'});
			if(res.code != 0){
				console.log(res);
				return
			};

			this.cartList = res.data;

		},
		mounted () {
			window.onscroll = () => {
				this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
				this.isTop  = document.body.scrollTop || document.documentElement.scrollTop ? false : true;
			}
		},

	}
	
</script>

<style>
</style>