import { createRouter, createWebHashHistory } from 'vue-router'

// 引入一级路由页面
import HomeView from '../views/HomeView.vue'
// 懒加载路由
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
// import LoginView from '../views/LoginView.vue'
// import RegisterView from '../views/RegisterView.vue'

// 子路由组件
import HomeIndex from '../views/home-children/HomeIndex.vue'
import HomeClassify from '../views/home-children/HomeClassify.vue'
import HomeProduct from '../views/home-children/HomeProduct.vue'
import HomeCart from '../views/home-children/HomeCart.vue'
import HomeAddress from '../views/home-children/HomeAddress.vue'

const routes = [
  {
		path : '/',
		// 重定向到home下的子路由 index
		redirect : '/home/index'
	},
	
	{
		path : '/home',
		name : 'home',
		component : HomeView,
		// 子路由 LcPage
		children : [
			{path : 'index',name:'index', component : HomeIndex},
			{path : 'classify',name:'classify', component : HomeClassify},
			{path : 'product',name:'product', component : HomeProduct},
			{path : 'cart',name:'cart', component : HomeCart},
			{path : 'address',name:'address', component : HomeAddress},
			{path : 'search',name:'search', component : HomeAddress},
			{path : 'shop',name:'shop', component : HomeAddress},
		]
	},
	
	{
		path : '/login',
		name : 'login',
		component : LoginView
	},
	{
		path : '/register',
		name : 'register',
		component : RegisterView
	},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
