<template>
	<div class="register_content">	
		<div class="header"><span @click="$router.back()"></span>手机注册</div>	
		<div class="title"></div>
		<ul class="register_ul ul_list">
			<li><span>手机</span><input class="phone_input " type="text" maxlength="11" placeholder="输入手机号" v-model='phone_val'><span class="clear" @click="clear" v-if="this.phone_val!=''"><img src="./img/delete_icon@3x.png" alt=""></span></li>
			<li><span>验证码</span><input type="text" placeholder="输入验证码"><label v-show='show' @click="send">获取验证码</label><label v-show='!show' class="count">{{count}}S</label></li>	
			<li><span>设置密码</span><input class="pas_input" :type="inputType" placeholder="6-20位字母、数字结合" v-model='password_val'><span class="see_pas" v-if="this.password_val!=''" @click="see"><img :src="img_src" alt=""></span></li>	
		</ul>
		<div class="button button_active" v-if="active_btn">注册</div> 
		<div class="button" v-else="active_btn">注册</div>
		<p>注册即视为同意<span @click="$router.push({path:'/agreement'})">《六度服务协议》</span></p>  
	</div>	
</template>	
<script>
export default{
	data(){
		return{
			show:true,
			active_btn:false,
			phone_val:'',
			password_val:'',
			count:'',
			timer:null,
			img_src:'./src/components/img/Password_close@3x.png',
			inputType:'password'
		}			
	},		
	methods:{
		clear(){
			this.val=''
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
		see(){      
			if(this.inputType==="password") {
				this.inputType="text";
				this.img_src='./src/components/img/Password_open@3x.png'
			}else if(this.inputType==="text"){
				this.inputType="password";
				this.img_src='./src/components/img/Password_close@3x.png'
			}
		},
	}
}
</script>
<style>
.register_content{
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: #F5F7F7;
}
.register_content>p{
	font-size: 0.24rem;
    color: #666666;
    letter-spacing: 0.0095rem;
    text-align: center;
    margin-top: 0.3rem;
}
.register_content>p>span{
	color: #4dd8f0;
}	
.title{
	width: 100%;
	height: 0.5rem;
	margin-left: 0.32rem;
	font-family: PingFangSC-Medium;
	font-size: 0.24rem;
	color: #00BCD4;
	letter-spacing: 0.95px;
	line-height: 0.6rem;
	background: #F5F7F7;
	text-align: left;
}
.register_ul{
	width: inherit;
	background: #fff;	
	margin: 0;
}
.register_ul>li{		
	height: 0.98rem;	
	line-height: 0.98rem;
	width: 7.18rem;
}
.register_ul>li>input{
	border:0;
	font-size: 0.28rem;
	float: left;
	height: 0.5rem;
	margin-top: 0.25rem;
}
.register_ul>li>label{		
	font-size: 0.28rem;
	display: block;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #00BCD4;
	letter-spacing: 1.11px;		
	float: right;
	margin-right: 0.32rem;
}
.register_ul>li>span{
	font-size: 0.28rem;	
	margin-right: 0.4rem;
	float: left;
}
.button{
	width: 6.86rem;
	height: 0.88rem;
	background: #B2EDF4;
	border-radius: 0.04rem;
	font-family: PingFangSC-Regular;
	font-size: 0.32rem;
	color: #FFFFFF;
	letter-spacing: 0.0516rem;
	margin:0 auto;
	border:0;
	margin-top: 0.6rem;
	line-height: 0.88rem;
}
.button_active{
	background: #22CAE0;
}
.phone_input,.pas_input{
	width: 4.5rem;
}
.register_ul>li>.clear{
	width: 0.28rem;
	height: 0.28rem;
	display: block;
	margin-right: 0.32rem;
	float: right;
	margin-top: 0.35rem;
}
.register_ul>li>.see_pas{
	width: 0.48rem;
	float: right;
	margin-right: 0.32rem;
	margin-top: 0.25rem;
}
</style>	