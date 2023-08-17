<template>
	
	<!-- 只有路由出口 -->
	<!-- <router-view /> -->
	<router-view v-slot="{Component}">
		<!-- 路由动画 -->
		<transition 
		 name="routechange"
		 enter-active-class="animate__animated animate__slideInRight"
		 leave-active-class="animate__animated animate__slideOutLeft"
		 >
			<!-- 动态组件的形式切换 -->
			<component :is="Component"></component>	
			
		</transition>
		
	</router-view>

</template>

<script>
	
	export default {
		name : 'App'
	}
	
</script>

<style lang="less">

</style>
