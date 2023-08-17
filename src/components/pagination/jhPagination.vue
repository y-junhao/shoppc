<template>
	<div class="jh-pagination" :style="{'justify-content' : justifyContent}">
		<!-- 结构 -->
		<span :style="{color : color}" class="prev" @click="clickPrev">上一页</span>
		
		<!-- 分为两种情况：总页数小于等于5 -->
		<template v-if="pageCount <= 5">
			<a :style="{color : color}" @click="clickPage(item)" :class="{'active' : isActive == index}" href="javascript:;" v-for="(item, index) in pageCount" :key="item">{{item}}</a>
		</template>
		<!-- 分为两种情况：大于5的 -->
		<template v-else>
			<a :style="{color : color}" @click="clickPage(item)" :class="{'active' : isActive == index}" href="javascript:;" v-for="(item, index) in domHtml" :key="item">{{item}}</a>
		</template>
		
		<span :style="{color : color}" class="next" @click="clickNext">下一页</span>
		
	</div>
</template>

<script>
	export default {
		name : 'jhPagination',
		
		props : {
			nowPage : Number,
			pageCount : Number,
			color : {
				type : String,
				default : '#1989FA'
			},
			justifyContent : String
		},
		
		data(){
			return {
				// 因为下面上一页和下一页要累加累减
				nowPageChild : this.nowPage,
				// 大于5个结构内容
				domHtml : [1, 2, 3, 4, '...'],
				// 当前项位置样式
				isActive : 0
			}
		},
		
		// 侦听器
		watch : {
			nowPage : {
				handler(newVal, oldVal){
					// console.log('zi',newVal);
					
					// 验证总页数
					if(this.pageCount <= 5){
						this.domHtml = [1, 2, 3, 4, 5];
						// 设置当前页样式
						this.isActive = newVal - 1;
						return;
					};
					
					// 对这个值进行验证，分三种情况
					if(newVal <= 4){
						this.domHtml = [1, 2, 3, 4, '...'];
						// 设置当前页样式
						this.isActive = newVal - 1;
						
					}else if(newVal > 4 && newVal < this.pageCount - 3){
						this.domHtml = ['...', newVal-1, newVal, newVal+1, '...'];
						// 设置当前页样式
						this.isActive = 2;
						
					}else if(newVal >= this.pageCount - 3 && newVal <= this.pageCount){
						this.domHtml = ['...', this.pageCount-3, this.pageCount-2, this.pageCount-1, this.pageCount];
						// 设置当前页样式 8=4 7=3 10=2 9=1
						this.isActive = newVal - (this.pageCount - 4);
					}
					
					
				},
				// 页面初始化就执行一次
				immediate : true
			}
		},
		
		emits : ['update:nowPage', 'changepage'],
		
		methods : {
			// 点击下一页
			clickNext(){
				if(this.nowPage >= this.pageCount){
					return
				}
				this.$emit('update:nowPage', this.nowPage+1);
			},
			
			// 点击上一页
			clickPrev(){
				if(this.nowPage <= 1){
					return
				}
				this.$emit('update:nowPage', this.nowPage-1);
			},
			
			clickPage(val){
				if(val == ('...' || this.nowPage)){return};
				this.$emit('update:nowPage', val);
			}
		}
		
		
	}
</script>

<style scoped lang="less">
	
	.jh-pagination{
		display: flex;
		// justify-content: flex-end;
		margin-top: 50px;
		user-select: none;
		
		span, a{
			text-decoration: none;
			padding: 2px 8px;
			margin: 0px 5px;
			background-color: #999;
			text-align: center;
			line-height: 20px;
			font-size: 12px;
			// color: gray;
			// list-style: none;
			user-select: none;




			// border: 1px solid #e5e5e5;
			// border-right: none;
			// padding: 8px 12px;
			// font-size: 12px;
			// color: #1989FA;
			cursor: pointer;
		}
		
		// span:hover, a:hover{
		// 	background-color: #6CB1F7;
		// 	color: #fff !important;
		// }
		
		.next{border-right: 1px solid #e5e5e5;}
		
		// 默认样式
		.active{
			color:white;
			background-color: gray;

			// background-color: #1989FA;
			// color: #fff !important;
		}
	}
</style>
