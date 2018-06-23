<template>
	<div class="forget_pas page">
		<div class="header"><span @click="$router.back()"></span>忘记密码</div>
		<ul class="ul_list">
			<li><span>手机</span><input class="phone_input " type="text" maxlength="11" placeholder="输入手机号" v-model='phone_val'><span class="clear" @click="clear" v-if="this.phone_val!=''"><img src="./img/delete_icon@3x.png" alt=""></span></li>
			<li><span>验证码</span><input type="text" placeholder="输入验证码"><label v-show='show' @click="send">获取验证码</label><label v-show='!show' class="count">{{count}}S</label></li>	
		</ul>
		<div class="button button_active" v-if="active_btn">注册</div> 
		<div class="button" v-else="active_btn">注册</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			show:true,
			active_btn:false,
			phone_val:'',
			count:'',
			timer:null,
		}			
	},		
	methods:{
		clear(){
			this.phone_val=''
		},
		send(){				
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
	.forget_pas>ul>li{
		height: 0.96rem;
		line-height: 0.96rem;
	}
	.forget_pas>ul>li>input{
		border:0;
		width: 4rem;
		font-size: 0.28rem;
		float: left;
		height: 0.5rem;
		margin-top: 0.25rem;
	}
	.forget_pas>ul>li>label{		
		font-size: 0.28rem;
		display: block;
		font-family: PingFangSC-Regular;
		font-size: 0.28rem;
		color: #00BCD4;
		letter-spacing: 1.11px;		
		float: right;
		margin-right: 0.32rem;
	}
	.forget_pas>ul>li>span{
		font-size: 0.28rem;	
		margin-right: 0.4rem;
		float: left;
	}
	.forget_pas>ul>li>.clear{
		width: 0.28rem;
		height: 0.28rem;
		display: block;
		margin-right: 0.32rem;
		float: right;
		margin-top: 0.35rem;		
	}
</style>