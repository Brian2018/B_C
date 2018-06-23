<template>
	<div class="use_coupon page">
		<div class="header"><span @click="$router.back()"></span>{{text}}使用</div>
		<div class="coupon_card">
			<img v-if="coupon" src="../img/Coupon_use_pic.png" alt="">
			<img v-if="!coupon" src="../img/Gift voucher_use_pic.png" alt="">
		</div>
		<div class="p_border">
			<a class="button" href="http://www.18sheng.com">前往十八省商城</a>
		</div>
		<div class="bind p_border">
			<p>淘宝会员名绑定</p>
			<div>
				<img src="../img/taobao_icon.png" alt="">
				<div>
					<span>淘宝会员名</span><label for="">绑定淘宝会员名，便于礼品券返现</label>
				</div>
				<i class="item_link"></i><span>未绑定</span>
			</div>
		</div>
		<div class="rule">
			<p>返现流程及规则说明</p>
			<div class="card">
				<img src="../img/process_pic.png" alt="">
			</div>
			<div class="text">
				<div class="list">
					<span></span><p>十八省商城基于淘宝平台，实现礼品券返现，需先在六度平台绑定您的淘宝会员名。（优惠券返现同理，两者使用同一淘宝会员名）</p>
				</div>
				<div class="list">
					<span></span><p>十八省商城订单确认收货后，六度平台将为您操作礼品券返现。</p>
				</div>
				<div class="list">
					<span></span><p>返还比例为礼品券：可提现余额=1:1</p>
				</div>
				<div class="list">
					<span></span><p>礼品券最多享受购物金额的全额返现。详细如下：优惠券返现以后，若礼品券余额＜剩余购物金额，则将全部礼品券返还为可提现余额；若礼品券余额≥剩余购物金额，则返还剩余购物金额的可提现余额。=1:1</p>
				</div>
				<div class="list">
					<span></span><p>返还顺序：优惠券返现＞礼品券返现。</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				text:'优惠券',
				coupon:true,
			}
		}
	}
</script>
<style>
	.use_coupon>.coupon_card{
		background: #fff;
	}
	.use_coupon>.coupon_card>img{
		margin: 0.2rem 0.32rem;
		width: 6.86rem;
	}
	.use_coupon>.p_border{
		height: 1.28rem;
		width: 100%;
		background: #fff;
		float: left;
		margin-top: 0;
	}
	.use_coupon>div>a{
		margin-top: 0.2rem;
		background: #22cae0;
	}
	.use_coupon>.bind{
		margin-top: 0.2rem;
		height: 2.2rem;
		width: 100%;
		background: #fff;
		float: left;
	}
	.use_coupon>.rule{
		margin-top: 0.2rem;
		width: 100%;
		background: #fff;
		height: 8rem;
		float: left;
		position: relative;
	}
	.use_coupon>.rule>.card>img{
		margin:0.2rem 0.32rem;
		width: 6.86rem;	
	}
	.use_coupon>.rule>.text>.list{
		font-family: PingFangSC-Regular;
	    font-size: 0.24rem;
	    color: #666666;
	    position: relative;
	    text-align: left;
	}
	.use_coupon>.rule>.text>.list>span{
		position: absolute;
	    top: 0.12rem;
	    left: 0.32rem;
	    display: block;
	    width: 0.1rem;
	    height: 0.1rem;
	    background-color: #000;
	    border-radius: 50%;
	}
	.use_coupon>.rule>.text>.list>p{
		margin: 0.05rem 0.32rem 0 0.6rem;
    	line-height: 0.4rem;
	}
	.use_coupon>.bind>p,.use_coupon>.rule>p{
		width: 7.18rem;
		margin-left: 0.32rem;
		height: 0.8rem;
		font-family: PingFangSC-Regular;
	    font-size: 0.30rem;
	    color: #333333;
	    line-height: 0.8rem;
	    text-align: left;
	    position: relative;
	}
	.use_coupon>.bind>p:after,.use_coupon>.rule>p:after,.use_coupon>.rule>.card:after{
		content: '';
		height: 1px;
		width: inherit;
		background: #ccc;
		bottom: 0;
		left: 0;
		display: block;
		-webkit-transform: scaleY(.33);
		-ms-transform: scaleY(.33);
		-o-transform: scaleY(.33);
		transform: scaleY(.33);
	}
	.use_coupon>.bind>div{
		height: 1.4rem;
	}
	.use_coupon>.bind>div>img{
		width: 0.8rem;
		float: left;
		margin-left: 0.32rem;
		margin-top: 0.3rem;
		display: block;
	}
	.use_coupon>.bind>div>div{
		margin-left: 0.2rem;
		float: left;
	}
	.use_coupon>.bind>div>div>span{
		font-size: 0.28rem;
    	color: #333333;
    	display: block;
    	text-align: left;
    	line-height: 0.9rem;
	}
	.use_coupon>.bind>div>div>label{
		font-size: 0.24rem;
    	color: #999999;
    	display: block;
    	text-align: left;
	}
	.use_coupon>.bind>div>span{
		font-size: 0.24rem;
    	color: #999999;
    	text-align: right;
    	float: right;
    	display: block;
    	line-height: 1.4rem;
    	margin-right: 0.1rem;
	}
	.use_coupon>.bind>div>i{
		float: right;
	}
</style>