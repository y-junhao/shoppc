import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// 引入全局样式
import './assets/css/base.css'
import './assets/css/animate.css'

// 引入axios
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
// console.log(Qs)
// 设置默认基础路径
Axios.defaults.baseURL = 'http://159.75.89.136:3000'

let app = createApp(App)
// 挂载axios 和 序列化方法
app.config.globalProperties.qs = Qs
import swipe from './components/banner/swipe.vue'
// console.log(swipe);
app.component(swipe.name, swipe)
import jhPagination from './components/pagination/jhPagination.vue'
// console.log(jhPagination);
app.component(jhPagination.name, jhPagination)

import jhAPI from './api'
app.config.globalProperties.jhAPI = jhAPI

app.use(VueAxios, Axios)
app.use(router)
app.mount('#app')
