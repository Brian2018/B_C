<template>
	<div class="account_set page">
		<div class="header"><span @click="$router.back()"></span>账户设置</div>
		<p>我的账号</p>
		<ul class="ul_list">
			<li @click="$router.push({path:'/edit_phone'})"><span>手机号</span><a>54346343</a><i class="item_link"></i><label for="">修改</label></li>
			<li @click="$router.push({path:'/edit_mail'})"><span>邮箱</span><i class="item_link"></i><label for="">未绑定邮箱</label></li>
			<li @click="$router.push({path:'/edit_password'})"><span>登录密码</span><i class="item_link"></i><label for="">修改</label></li>
		</ul>
		<p>第三方账号绑定</p>
		<ul class="ul_list bind">
			<li @click='unbind'><img src="../img/wechat_icon_2.png" alt="" v-if='weixin_bind'><img src="../img/wechat_icon_1.png" alt="" v-else='!weixin_bind'><i class="item_link"></i><label for="">未绑定</label></li>
			<li><img src="../img/qq_icon_2.png" alt="" v-if='qq_bind'><img src="../img/qq_icon_1.png" alt="" v-else='!qq_bind'><i class="item_link"></i><label for="">未绑定</label></li>
			<li><img src="../img/weibo_icon_2.png" alt="" v-if='weibo_bind'><img src="../img/weibo_icon_1.png" alt="" v-else='!weibo_bind'><i class="item_link"></i><label for="">未绑定</label></li>
		</ul>		
	</div>
</template>
<script>
export default{
	data(){
		return{
			weixin_bind:true,
			weibo_bind:false,
			qq_bind:false,
			bind:false,
		}
	},
	methods:{
		unbind(){
			let r=confirm("是否解除微信绑定？");
			if (r==true){
				return false;
			}else{
				return false;
			}
		}
	}
}
</script>
<style>
.account_set>p{
	font-size: 0.26rem;
	color: #B3B3B3;
	height: 0.6rem;
	line-height: 0.6rem;
	margin-left: 0.32rem;
	text-align: left;
}
.account_set>ul{
	margin:0;
}
.account_set>ul>li{
	height: 1.2rem;
	background: #fff;
	font-size: 0.3rem;
	line-height: 1.2rem;
}
.account_set>ul>li>span{
	float: left;
}
.account_set>ul>li>label{
	float: right;
	margin-right: 0.2rem;
	font-size: 0.26rem;
	color: #B3B3B3;
}
.account_set>ul>li>a{
	font-size: 0.24rem;
	color: #B3B3B3;
	margin-left: 0.1rem;
}
.account_set>ul>li>img{
	width: 0.6rem;
	margin-top: 0.3rem;
}
</style>