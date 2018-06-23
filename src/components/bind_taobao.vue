<template>
	<div class="bind_taobao">
		<div class="header_taobao"><span @click="$router.back()">取消</span>淘宝会员名<label>保存</label></div>
		<p class="p_border"><label>淘宝会员名</label>
			<input name="taobao_account" value="" type="text" placeholder="请输入您的淘宝会员名">    
		</p>
		<span>淘宝会员名每天最多修改两次，十八省商城消费后，优惠券、礼品券均依据该淘宝会员名进行返现。</span>
	</div>
</template>
<style>
.bind_taobao{
	background-color: #f5f5f5;
	width: 100%;
	height: 100%;
	position: absolute;
}
.bind_taobao>.header_taobao{
	position: relative;
	width: inherit;
	height: 0.88rem;
	background: #fff;
	font-family: PingFangSC-Medium;
	font-size: 0.34rem;
	color: #262626;
	letter-spacing: 1.35px;
	line-height: 0.88rem;
}
.bind_taobao>.header_taobao>span{
	float: left;
	margin-left: 0.32rem;
}
.bind_taobao>.header_taobao>label{
	float: right;
	margin-right: 0.32rem;
}
.bind_taobao>p{
	height: 0.90rem;
    background: #fff;
    line-height: 0.90rem;
    margin-bottom: 0.20rem;
    position: relative;
    font-size: 0.32rem;
    color: #000;
}
.bind_taobao>p>label{
	float: left;
	margin-left: 0.32rem;
}
.bind_taobao>p>input{
	width: calc(100% - 2.55rem);
    float: left;
    color: #000;
    font-size: 0.28rem;
    border: 0;
    outline: none;
    line-height: 0.35rem;
    padding: 0;
    margin: 0;
    margin-left: 0.30rem;
    height: 0.87rem;
}
.bind_taobao>span{
	display: block;
	font-size: 0.2rem;
    color: #999;
    margin-left: 0.32rem;
    margin-right: 0.32rem;
    line-height: 0.3rem;
    text-align: left;
}
</style>