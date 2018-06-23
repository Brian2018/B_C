<template>
	<div class="edit_mail page">
		<div class="header"><span @click="$router.back()"></span>修改邮箱</div>
		<img src="../img/bind_mail1.png" alt="">
		<p class="p_border"><span>手机号</span>165345323132423</p>
		<p class="p_border input"><span>验证码</span><input type="number" placeholder="请输入验证码"><label v-show='show' @click="send">重新获取验证码</label><label v-show='!show' class="count">{{count}}S</label></p>
		<div class="button">下一步</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
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
	.edit_mail{
		background: #f7fafa;		
	}
	.edit_mail>img{
		width: 5.05rem;
		height: 0.7rem;
		margin: 0.5rem 0;
	}
	.edit_mail>p{
		font-size: 0.32rem;
		color: #000;
		height: 0.9rem;
		line-height: 0.9rem;
		text-align: left;
		margin: 0;
	}
	.edit_mail>p>span{
		float: left;
		margin-left: 0.32rem;
		margin-right: 0.2rem;
	}
	.edit_mail>.input:before{
		height: 0;
	}
	.edit_mail>p>label{
		float: right;
		display: block;
		width: 2.3rem;
		border-left: 1px solid #e0e0e0;
		height: inherit;
		font-size: 0.28rem;
		color: #808080;
		padding-left: 0.2rem;
	}
	.edit_mail>p>input{
		float: left;
		width: 3rem;
		border: 0;
		height: inherit;
		font-size: 0.28rem;
	}
</style>