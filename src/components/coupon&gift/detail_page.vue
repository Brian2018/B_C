<template>
	<div class="detail_page page">
		<div class="header"><span @click="$router.back()"></span>{{text}}明细</div>
		<div class="title">
			<p>{{type}}</p>
			<div>-1.00</div>
			<span>交易成功</span>
		</div>
		<ul class="ul_list">
			<li><span>交易类型</span><label for="">{{type}}</label></li>
			<li><span>详细信息</span><label for="">您赠送给"花谢..."1.00元优惠券</label></li>
		</ul>
		<div class="message_board">
			<div class="content">这是赠送给你的优惠券，快去使用吧！</div>
		</div>
		<p class="p_border"><span>创建时间</span><label for="">2018-03-14 10:45:15</label></p>
	</div>
</template>
<script>
export default{
	data(){
		return{
			text:'优惠券',
			type:'转赠'
		}
	}
}
</script>
<style>
.detail_page>.title{
	width: 100%;
	height: 2.8rem;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #333333;
	background: #fff;
	text-align: center;
	position: relative;
}
.detail_page>.title>p{
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #333333;
	padding-top: 0.2rem;
}
.detail_page>.title>div{
	opacity: 0.9;
    font-family: PingFangSC-Regular;
    font-size: 0.64rem;
    color: #000000;
    line-height: 1.5rem;
}
.detail_page>.title>span{
	color: #999999;
}
.detail_page>ul>li{
	height: 0.9rem;
	position: relative;
	line-height: 0.9rem;
}
.detail_page>ul>li>label{
	float: right;
	margin-right: 0.32rem;
}
.detail_page>.message_board{
	height: 1.68rem;
}
.detail_page>.message_board>div{
	height: 0.68rem;
	text-align: left;
}
.detail_page>p{
	height: 0.9rem;
	line-height: 0.9rem;
	font-size: 0.30rem;
    color: #333333;
    float: left;
}
.detail_page>p>span{
	float: left;
	margin-left: 0.32rem;
}
.detail_page>p>label{
	float: right;
	margin-right: 0.32rem;
}
</style>