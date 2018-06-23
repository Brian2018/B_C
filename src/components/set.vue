<template>
	<div class="set">
		<div class="header"><span @click="$router.back()">个人中心</span>设置</div>
		<ul class="ul_list">
			<li @click="$router.push({path:'/personal_msg',name:'personal_msg',query:{six_id:six_id}})"><span>个人信息</span><i class="item_link"></i></li>
			<li @click="$router.push({path:'/account_set'})"><span>账户设置</span><i class="item_link"></i></li>			
		</ul>
		<p><span>资金、礼品券、优惠券变更推送通知</span><label :class="{ 'active': selected }" @click='addclass()'></label></p>
		<p @click="$router.push({path:'/about'})"><span>关于六度</span><i class="item_link"></i></p>
		<p @click="$router.push({path:'/'})">退出登录</p>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				selected:false,
				six_id:'',
			}			
		},
		methods:{
			addclass(){
				this.selected=this.selected === false? true:false;
			}
		},
		mounted(){
			this.six_id=this.$route.query.six_id;
		}
	}
</script>
<style>
.set{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
}
.set>ul>li{
	height: 0.9rem;
	line-height: 0.9rem;
}
.set>p{
	margin-top: 0.2rem;
	height: 0.9rem;
	width: 100%;
	position: relative;
	font-size: 0.32rem;
	text-align: center;
	line-height: 0.9rem;
	background: #fff;
}
.set>p>span{
	float: left;
	padding-left: 0.32rem;
}
.set>p>label{
	display: block;
	float:right;
	margin-right: 0.32rem;
	height: inherit;
	width: 0.76rem;
	background: url(./img/cos.png) center no-repeat;
	background-size: 0.76rem 0.4rem;
}
.set>p>label.active{
	background: url(./img/cos-open.png) center no-repeat;
	background-size: 0.76rem 0.4rem;
}
.set>p:after{
	content: '';
	height: 1px;
	width: inherit;
	background: #e0e0e0;
	position: absolute;
	bottom: 0;
	left: 0;
	display: block;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.set>p:before{
	content: '';
	height: 1px;
	width: inherit;
	background: #e0e0e0;
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
</style>