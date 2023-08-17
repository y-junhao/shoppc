const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
	
	// 设置服务
	devServer : {
		host : 'localhost',
		port : 8081,
		open : true
	},
	
	// 打包路径
	// 默认不设置，打包成服务器根目录
	// 设置打包成服务器根目录下的子路径
	// publicPath : '/2302-yjhlc-history/',
	
	// 设置打包为相对路径，要使用 hash 模式打包！！！
	publicPath : './'
	
	
})
