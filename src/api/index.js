// 专门用来数据请求, 只有这个里面才会用axios了
import axios from 'axios'
import Qs from 'qs'
// 设置默认基础路径
axios.defaults.baseURL = 'http://159.75.89.136:3000'

let jhAPI = {
	// 热门 分类 详情数据 只是地址和参数不同
	// 导航分类 
	// 轮播
	// async getData(url, data = {}){ //函数参数的默认值
	// 	// console.log('调用了getCatGoodsBannerData');
	// 	//真正做事件,发起ajax请求
	// 	let res = await axios.get(url, {params : data});
	// 	// console.log(res);
	// 	if(res.data.code != 0){
	// 		console.log('get'+url+data+'Data请求错误');
	// 		console.log(res);
	// 		return;
	// 	};
	// 	// 把数据返回去 res.data.data; [{}, {}] 是一个promise
	// 	console.log('data.data',res.data.data)
	// 	return res.data.data;
	// },
	async getData(url, data = {},accurate='data.data'){ //函数参数的默认值
		// console.log('调用了getCatGoodsBannerData');
		//真正做事件,发起ajax请求
		let res = await axios.get(url, {params : data});
		// console.log(res);
		if(res.data.code != 0){
			console.log('get'+url+data+'Data请求错误');
			console.log(res);
			return;
		};
		if(!accurate){
			return res.data.data
		}
		// 把数据返回去 res.data.data; [{}, {}] 是一个promise
		let want = accurate.split('.');
		if(want.length==2){
			return res[want[0]][want[1]]
		}else if(want.length==1){
			return res[want[0]]
		}else if(want.length==3){
			return res[want[0]][want[1]][want[2]]
		}
		
	},

	// 总页数
	// async getCatMaxPageData(url, data = {}){ //函数参数的默认值
	// 	let res = await axios.get(url, {params : data});
	// 	// console.log(res);
	// 	if(res.data.code != 0){
	// 		console.log('getCatGoodsBannerData请求错误');
	// 		console.log(res);
	// 		return;
	// 	};
	// 	return res.data.page;
	// },
	
	// 登录
	async postData(url, data = {}){ //函数参数的默认值
		let res = await axios.post(url, Qs.stringify(data));
		return res.data;
	},
	
	// 购物车
	// async getCartData(url, data = {}){ //函数参数的默认值
	// 	let res = await axios.post(url, Qs.stringify(data));
	// 	return res.data;
	// },
	
	// 立即购买
	// async getBuyData(url, data = {}){ //函数参数的默认值
	// 	let res = await axios.post(url, Qs.stringify(data));
	// 	return res.data;
	// },
	
	
	
	
};

export default jhAPI;