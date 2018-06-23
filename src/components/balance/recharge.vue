<template>
	<div class="recharge_page">
		<div class="header"><span @click="$router.back()">余额</span>充值</div>
		<p class="p_border"><label>充值金额</label>
			<input name="taobao_account" value="" type="text" placeholder="请输入充值金额">    
		</p>
		<div class="recharge_type p_border">
			<p class="p_border"><span>选择支付方式</span></p>
			<div><span>微信支付</span><label>微信钱包支付</label><i class="item_link"></i></div>
		</div>
		<button class="button">确认支付</button>
	</div>
</template>
<style>
	.recharge_page{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
	}
	.recharge_page>p{
		height: 0.9rem;
		font-size: 0.32rem;
		line-height: 0.9rem;
	}
	.recharge_page>p>label{
		float: left;
		padding-left: 0.32rem
	}
	.recharge_page input[type=text] {
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
	.recharge_type>p{
		height: 0.9rem;
		line-height: 0.9rem;
	}
	.recharge_type>p>span{		
		font-size: 0.32rem;
     	color: #808080; 
    	margin-left: 0.32rem;
    	float: left;
	}
	.recharge_type>div{
		height: 1.3rem;
		line-height: 1.3rem;
		font-size: 0.28rem;
		color: #333;
	}
	.recharge_type>div>span{
		display: block;
		margin-left: 0.32rem;
		padding-left: 0.8rem;
		width: max-content;
		height: inherit;		
		background:url(../img/weixin_icon.png)left center no-repeat;
		background-size: 0.66rem;
		float: left;
	}
	.recharge_type>div>i{
		float: right;
	    display: inline-block;
	    width: 0.5rem;
	    height: inherit;
	    background: url(../img/choose.png) center no-repeat;
	    background-size: 0.5rem;
	    margin-right: 0.32rem;
	}
</style>