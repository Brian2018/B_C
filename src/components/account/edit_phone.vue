<template>
	<div class="edit_phone page">
		<div class="header"><span @click="$router.back()"></span>修改手机号</div>
		<img src="../img/bind_phone1.png" alt="">
		<p class="p_border"><span>手机号</span>165345323132423</p>
		<div class="button" v-if='!obtain' @click="send">获取验证码</div>
		<span v-if='obtain'><i></i>验证码已发送至您的手机！</span>
		<p class="p_border input" v-if='obtain'><span>验证码</span><input type="number" placeholder="请输入验证码"><label v-show='show' @click="send">重新获取验证码</label><label v-show='!show' class="count">{{count}}S</label></p>
		<div class="button" v-if='obtain'>下一步</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			obtain:false,
			show:true,
			count:'',
			timer:null,
		}
	},
	methods:{
		send(){	
			this.obtain=true;			
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.show = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000)
			}
		},
	}
}
</script>
<style>
.edit_phone{
	background: #f7fafa;		
}
.edit_phone>img{
	width: 5.05rem;
	height: 0.7rem;
	margin: 0.5rem 0;
}
.edit_phone>p{
	font-size: 0.32rem;
	color: #000;
	height: 0.9rem;
	line-height: 0.9rem;
	text-align: left;
	margin: 0;
}
.edit_phone>p>span{
	float: left;
	margin-left: 0.32rem;
	margin-right: 0.2rem;
}
.edit_phone>span{
	display: block;
	background: #fff;
	width: 100%;
	height: 0.8rem;
	line-height: 0.8rem;
	text-align: left;
	font-size: 0.24rem;
}
.edit_phone>span>i{
	display: block;
	width: 0.4rem;
	height: inherit;
	background: url(../img/choose.png) center no-repeat;
	background-size: 0.4rem;
	float: left;
	margin-left: 0.32rem;
	margin-right: 0.2rem;
}
.edit_phone>.input>span{
	float: left;
	margin-left: 0.32rem;
	color: #333;
	font-size: 0.32rem;
	margin-right: 0.2rem;
}
.edit_phone>.input>input{
	float: left;
	width: 3rem;
	border: 0;
	height: inherit;
	font-size: 0.28rem;
}
.edit_phone>.input>label{
	float: right;
	display: block;
	width: 2.3rem;
	border-left: 1px solid #e0e0e0;
	height: inherit;
	font-size: 0.28rem;
	color: #808080;
	padding-left: 0.2rem;
}
</style>