<template>
	<div class="ruleDescription">
		<div class="header"><span @click="$router.back()">{{ticket}}</span>{{ticket}}规则说明</div>
		<p class="p_border"><span>{{ticket}}如何获取</span><i :class="{'active':clicked1}" @click='click_see1(this)'></i></p>
		<div class="content" v-show="clicked1">			
            1.使用可提现余额兑换优惠券，兑换比例为可提现余额：优惠券=1:5 <br>
            2.您的一度或二度好友赠送优惠券给您。<br>
			3.使用禧咖啡邀请好友首次下单，可获得5元优惠券，无上限。<br>
			4.新用户注册六度，可获赠10元优惠券。<br>
			5.使用六度好友功能，邀请好友注册六度可获赠10元优惠券。<br>
		</div>
		<p class="p_border"><span>{{ticket}}的使用场景</span><i :class="{'active':clicked2}" @click='click_see2(this)'></i></p>
		<div class="content" v-show="clicked2">			
            1.优惠券可用于十八省商城，以优惠券返现的形式消费，最多享受10%购物金额的返现，详情可进入<a href="">{{ticket}}使用</a>页面查看。
		</div>
		<p class="p_border"><span>网厅购物后，优惠券返现的相关问题</span><i :class="{'active':clicked3}" @click='click_see3(this)'></i></p>
		<div class="content" v-show="clicked3">			
            1.用户在六度平台绑定淘宝会员名，使用对应的淘宝账号在网厅消费后，六度平台即会操作返现。（礼品券返现同理，两者使用同一淘宝会员名）<br>
            2.优惠券返还的是可提现余额，用户可在六度平台消费或操作提现。
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				ticket:'',
				clicked1:false,
				clicked2:false,
				clicked3:false,
			}
		},
		methods:{			
			click_see1(){
				this.clicked1=this.clicked1==true?false:true;
			},
			click_see2(){
				this.clicked2=this.clicked2==true?false:true;
			},
			click_see3(){
				this.clicked3=this.clicked3==true?false:true;
			},
		},
		mounted(){
			this.ticket=this.$route.query.type;
		}
	}
</script>
<style>
	.ruleDescription{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}
	.ruleDescription>p{
		height: 0.94rem;
		width: 100%;
		background: #ffffff;
		font-size: 0.3rem;
		line-height: 0.94rem;
	}
	.ruleDescription>p>span{
		float: left;margin-left: 0.32rem;
	}
	.ruleDescription>p>i{
		display: block;
	    width: 0.56rem;
	    height: 0.56rem;
	    float: right;
	    margin-right: 0.22rem;
	    background: url(../img/down.png) center center no-repeat;
	    background-size: 0.56rem;
	    margin-top: 0.2rem;
	}
	.ruleDescription>p>i.active{
		background: url(../img/up.png) center center no-repeat;
	    background-size: 0.56rem
	}
	.ruleDescription>.content{
	    background: #fff;
	    padding-left: 0.36rem;
	    font-family: PingFang-SC-Regular;
	    font-size: 0.28rem;
	    color: #808080;
	    letter-spacing: 1.11px;
	    line-height: 0.4rem;
	    padding-top: 0.15rem;
	    padding-bottom: 0.15rem;
	    text-align: left;
	}
	.ruleDescription>.content>a{
		color: #00bcd4;
	}
</style>