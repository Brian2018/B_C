<template>
	<div class="add_friend_page page">
		<div class="header"><span @click="$router.back()"></span>添加好友</div>
		<div class="p_border">
			<p>
				<span></span><input type="number" placeholder="手机号" maxlength="13" v-model="val">
				<i class="item_close"  v-if="this.val!=''" @click="clear"></i>
			</p>			
		</div>
		<div class="scan p_border">
			<img src="../img/Scan code_icon.png" alt="">
			<div>
				<span>扫一扫</span>
				<label for="">扫描二维码添加好友</label>
			</div>			
			<i class="item_link"></i>
		</div>
		<div class="erdu p_border">
			<img src="../img/possible person_icon.png" alt="">
			<div>
				<span>二度好友</span>
				<label for="">添加您可能认识的人</label>
			</div>			
			<i class="item_link"></i>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				val:'',
			}
		},
		methods:{
			clear(){
				this.val='';
			}
		}
	}
</script>
<style>
	.add_friend_page>.p_border{
		height: 0.98rem;
		width: 100%;
		background: #fff;
		font-size: 0.28rem;
	}
	.add_friend_page>div.p_border>p{
		height: 0.5rem;
		width: 6.86rem;
		margin:0.24rem 0.32rem;
		border-bottom: 1px solid #00bcd4;
		float: left;
	}
	.add_friend_page>div.p_border>p>input{
		height: 0.49rem;
		border: 0;
		float: left;
		width: 5.8rem;
		margin-left: 0.2rem;
	}
	.add_friend_page>div.p_border>p>span{
		display: block;
		width: 0.3rem;
		height: inherit;
		background: url(../img/yingyong_search.png) center no-repeat;
		background-size: 0.3rem;
		float: left;
	}
	.add_friend_page>.scan,.add_friend_page>.erdu{
		height: 1.2rem;
		width: 100%;
		background: #fff;
		float:left;
	}
	.add_friend_page>.scan>img,.add_friend_page>.erdu>img{
		display: block;
		width: 0.72rem;
		border-radius: 0.02rem;
		margin-top: 0.25rem;
		float: left;
		margin-left: 0.32rem;
	}
	.add_friend_page>.scan>div,.add_friend_page>.erdu>div{
		margin-left: 0.2rem;
		float: left;
	}
	.add_friend_page>.scan>div>span,.add_friend_page>.erdu>div>span{
		font-size:0.28rem;
		color:#333333;
		display: block;
		text-align: left;
		width: 3rem;
		margin-top: 0.2rem;
		height: 0.2rem;
		line-height: 0.4rem;
	}
	.add_friend_page>.scan>div>label,.add_friend_page>.erdu>div>label{
		font-size:0.24rem;
		color:#999999;
		text-align: left;
		display: block;
		width: 4rem;
		line-height: 0.8rem;
	}
</style>