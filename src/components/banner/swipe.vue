<template>

	<!-- 轮播 -->
	<div class="banner-box" :style="{width : width+'px', height : setBannerHeight + 'px'}" @mouseover="mouseOver" @mouseout="mouseOut">
		<a v-if="isnext" href="javascript:;" class="prev" @click="prevH"></a>
		<a v-if="isprev" href="javascript:;" class="next" @click="nextH"></a>
		<ul
		 @transitionend="transitionEnd" 
		 :style="{
			 width : setListWidth + 'px', 
			 transform : `translateX(${-index * width}px)`,
			 transition : typeof transition == 'number' ? transition/1000 + 's' : transition
		 }"
		 >
		 
			<li v-for="item in setBannerList" :key="item.goods_id">
				<router-link :to="{path : '/home/product', query : {goodsId : item.goods_id}}">
					<img :src="item.goods_thumb">
				</router-link>
			</li>
			
		</ul>	
		<div v-if="iscircle" class="circle">
			<span v-for="(item,index) in bannerList" :key="item.goods_id" :class="index+1==(this.index||this.index+this.bannerList.length)?'sp-active':''"></span>
		</div>

		
	
	</div>
	
</template>

<script>
	
	export default {
		name : 'swipe',
		props : {
			bannerList : Array,
			width : Number,
			imageWidthHeight : Object,
			speed : {
				type : Number,
				default : 300
			},
			autoplay : Number,
			isnext : {
				type : Boolean,
				default :false
			},
			isprev : {
				type : Boolean,
				default :false
			},
			iscircle : {
				type : Boolean,
				default :false
			},
		},
		
		data(){
			return {
				bannerListChild : [],
				index : 1,
				transition : this.speed,
				timer : null,
				movelock : false
			};
		},
		
		computed : {
			setBannerList(){
				this.bannerListChild = this.bannerList.length == 0 ? [] : [this.bannerList[this.bannerList.length - 1], ...this.bannerList, this.bannerList[0]];
				return this.bannerListChild;
			},
			
			setBannerHeight(){
				return this.imageWidthHeight.height / this.imageWidthHeight.width * this.width;
			},
			
			setListWidth(){
				return this.bannerListChild.length * this.width;
			},
		},
		
		mounted(){	
			
			if(this.autoplay){
				this.autoP();
			};
		},
		
		methods : {
			// 自动播放方法
			autoP(){
				// 自动播放
				this.timer = setInterval(() => {
					// 加上过度动画
					this.transition = this.speed;
					this.movelock = true;
					this.index++;
				}, this.autoplay + this.speed);
			},
			nextH(){
				if(this.movelock){return};
				this.movelock = true;
				this.transition = this.speed;
				this.index++
			},
			prevH(){
				if(this.movelock){return};
				this.movelock = true;
				this.transition = this.speed;
				this.index--
			},
			// 鼠标移出
			mouseOut(){
				if(this.autoplay){
					this.autoP();
				};
			},
			
			//鼠标移入
			mouseOver(){
				if(this.autoplay){
					clearInterval(this.timer);
				};
			},
			
			transitionEnd(){
				// console.log(this.index);
				this.movelock = false;
				if(this.index >= this.bannerListChild.length - 1){
					// 去掉过渡
					this.transition = 'none';
					this.index = 1;
				};
				if(this.index <=0){
					this.transition = 'none';
					this.index = this.bannerListChild.length - 2;
				};

			},
		}
		
	}
	
</script>

<style scoped lang="less">
/* 轮播 */
.banner-box{
	// 要动态设置
	// width:1000px;
	// height: 475px;
	margin: 0px auto;
	position: relative;
	overflow: hidden;
	
	ul{
		// width动态设置
		// width:???
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0px;
		display: flex;
		
		li{
			height: 100%;		
			img{
				width:100%;
				height: 100%;
			}
		}
		
	}
	
	
	
}
 
</style>