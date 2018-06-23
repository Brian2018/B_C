<template>
	<div class="transfer_friend page">
		<div class="header"><span @click="$router.back()"></span>选择转赠对象</div>
		<p>选择转赠对象</p>
		<ul class="ul_list">
			<li @click="$router.push({path:'/choose_friend',name:'choose_friend',query:{user_id:user_id,text:text,friend:'一度'}})"><span class="pic1"></span>一度好友<i class="item_link"></i></li>
			<li @click="$router.push({path:'/choose_friend',name:'choose_friend',query:{user_id:user_id,text:text,friend:'二度'}})"><span class="pic2"></span>二度好友<i class="item_link"></i></li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				user_id:'',
				text:'',
			}
		},
		mounted(){
			this.user_id=this.$route.query.user_id;
			this.text=this.$route.query.text;
		},
	}
</script>
<style>
.transfer_friend>p{
	font-size: 0.24rem;
	color: #b3b3b3;
	text-align: left;
	margin-left: 0.32rem;
	height: 0.6rem;
	line-height: 0.6rem;
}
.transfer_friend>ul{
	margin-top: 0;
}
.transfer_friend>ul>li{
	height: 0.9rem;
	line-height: 0.9rem;
	position: relative;
}
.transfer_friend>ul>li>span{
	display: block;
	width: 0.44rem;
	height: inherit;
	margin-right: 0.2rem;
	float: left;
	background: url(../img/yidu_icon.png)center no-repeat;
	background-size: 0.44rem 0.44rem;
}
.transfer_friend>ul>li>span.pic2{
	background: url(../img/erdu_icon.png)center no-repeat;
	background-size: 0.44rem 0.44rem;
}
</style>