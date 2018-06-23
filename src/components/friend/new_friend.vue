<template>
	<div class="new_friend page">
		<div class="header"><span @click="$router.back()"></span>新的朋友</div>
		<p class="title"><span>好友通知</span></p>
		<div class="list p_border delete">
			<div class="slider">
				<div class="content"
					@touchstart='touchStart'
					@touchmove='touchMove'
					@touchend='touchEnd'
					:style="deleteSlider">
					<span></span>
					<div>要账的<span>（通讯录好友）</span><label for="">已发送好友请求</label></div>
					<label for="">等待对方验证</label>
					<slot></slot>
				</div>
				<div class="remove" ref='remove'>
					删除
				</div>				
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
	        startX:0,   //触摸位置
	        endX:0,     //结束位置
	        moveX: 0,   //滑动时的位置
	        disX: 0,    //移动距离
	        deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
	    }	    
	},
	methods:{
		touchStart(ev){
			ev= ev || event
            //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                }
            },
        touchMove(ev){
        	ev = ev || event;
           //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
           let wd=this.$refs.remove.offsetWidth;
           if(ev.touches.length == 1) {
                // 滑动时距离浏览器左侧实时距离
                this.moveX = ev.touches[0].clientX

                //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                this.disX = this.startX - this.moveX;
                console.log(this.disX)
                // 如果是向右滑动或者不滑动，不改变滑块的位置
                if(this.disX < 0 || this.disX == 0) {
                	this.deleteSlider = "transform:translateX(0px)";
                // 大于0，表示左滑了，此时滑块开始滑动 
            }else if (this.disX > 0) {
                     //具体滑动距离我取的是 手指偏移距离*5。
                     this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
                    // 最大也只能等于删除按钮宽度 
                    if (this.disX*5 >=wd) {
                    	this.deleteSlider = "transform:translateX(-" +wd+ "px)";
                    }
                }
            }
        },
        touchEnd(ev){
        	ev = ev || event;
        	let wd=this.$refs.remove.offsetWidth;
        	if (ev.changedTouches.length == 1) {
        		let endX = ev.changedTouches[0].clientX;
        		this.disX = this.startX - endX;
        		console.log(this.disX)
                //如果距离小于删除按钮一半,强行回到起点
                
                if ((this.disX*5) < (wd/2)) {

                	this.deleteSlider = "transform:translateX(0px)";
                }else{
                    //大于一半 滑动到最大值
                    this.deleteSlider = "transform:translateX(-"+wd+ "px)";
                }
            }
        }      
    }
}
</script>
<style>
.new_friend>.list{
	font-size:0.28rem;
	color:#333333;
	background: #fff;
	height: 1.56rem;
	margin: 0;
}
.new_friend>.title{
	height: 0.6rem;	
	line-height: 0.6rem;	
}
.new_friend>.title>span{
	font-size:0.24rem;
	color:#999999;
	float: left;
	margin-left: 0.32rem;
}
.new_friend>.list  .content>span{
	display: block;
	width: 0.9rem;
	height: 0.9rem;
	border-radius: 50%;
	margin-right: 0.3rem;
	float: left;
	margin-top: 0.33rem;
	background: url(/static/img/logo_1@3x.05f6934.png) center no-repeat;
	background-size: 0.9rem;
	margin-left: 0.32rem;
}
.new_friend>.list .content div{
	height: inherit;
	text-align: left;
	float: left;
}
.new_friend>.list .content div>span{
	line-height: 1rem;
	font-size:0.24rem;
	color:#999999;
}
.new_friend>.list .content div>label{
	display: block;
	line-height: 0.1rem;
	font-size:0.24rem;
	color:#999999;
}
.new_friend>.list .content>label{
	line-height: 1.56rem;
	float: right;
	margin-right: 0.32rem;
	font-size:0.24rem;
	color:#666666;
}
.new_friend .slider{
	width: 100%;
	height: 1.56rem;
	position: relative;
	user-select: none;
}
.new_friend .slider>.content{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 100;
	transition: 0.3s;
	background: #fff;
}
.new_friend .slider>.remove{
	position: absolute;
	width:1.56rem;
	height:inherit;
	background:red;
	right: 0;
	top: 0;
	color:#fff;
	text-align: center;
	font-size: 0.32rem;
	line-height: 1.56rem;
}
</style>