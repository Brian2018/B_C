<template>
	<div class="buy_page">
		<div class="header"><span @click="$router.back()">余额</span>购买</div>
		<div class="style">
			<div v-for="(item,index) in buy_type" :key="item.id" @click="addClassFun(index)" :class="[item.class, {'active': item.is_check}]"><span>{{item.name}}</span></div>
		</div>
		<div class="pic"></div>
		<mt-tab-container v-model="active" swipeable>
			<mt-tab-container-item id="tab-container1">	
				<div class="pic">
					<img src="../img/Coupon_banner.png" alt="">				
				</div>			
				<buyCoupon/>
				<div class="purchase_rules">
					<div>购买规则说明</div>
					<p><span></span>购买优惠券需为可提现余额</p>
					<p><span></span>购买比例为可提现余额：优惠券=1:5</p>
				</div>			
			</mt-tab-container-item>
			<mt-tab-container-item id="tab-container2">		
				<div class="pic">					
					<img src="../img/Gift voucher_banner.png" alt="">
				</div>		
				<buyGift/>	
				<div class="purchase_rules rules_gift">
					<div>购买规则说明</div>
					<p><span></span>购买礼品券需为可提现余额</p>
					<p><span></span>购买比例为可提现余额：礼品券=1:1</p>
					<p><span></span>0＜金额＜100，无额外赠送优惠券；<br></p>
					<p class="text">100≤金额＜200，赠送10元优惠券；</p>
					<p class="text">200≤金额＜300，赠送20元优惠券；</p>
					<p class="text">以此类推...</p>
				</div>		
			</mt-tab-container-item>			
		</mt-tab-container>		
	</div>
</template>
<script>
import buyCoupon from './buyCoupon.vue';
import buyGift from './buyGift.vue'
export default{
	data(){
		return{
			'buy_type':[
			{
				'name':'购买优惠券',
				'class': 'coupon',
				'is_check': true
			},
			{
				'name':'购买礼品券',
				'class': 'gift',
				'is_check': false,
			}
			],
			show:true,
			active:'tab-container1'
		}
	},
	methods:{
		addClassFun(index){ 		
			this.val='';
			this.pas_val='';
			this.active_btn=false;
			for (var i = 0; i < this.buy_type.length; i++) {
				this.buy_type[i].is_check = false;						
			}
			this.show = this.buy_type[index].name === '购买优惠券' ? true:false;
			this.active=this.buy_type[index].name==='购买优惠券'?'tab-container1':'tab-container2';
			this.buy_type[index].is_check = true;			
		},
	},
	watch:{
		active:function (newValue) {	
			if(this.active=='tab-container1'){
				this.buy_type[0].is_check = true;
				this.buy_type[1].is_check = false;
			}else{
				this.buy_type[0].is_check = false;
				this.buy_type[1].is_check = true;
			}
		}
	},
	components:{buyCoupon,buyGift}
}
</script>
<style>
.buy_page{
	height: 100%;
	width: 100%;
	background-color: #f5f7f7;
	position: absolute;
}
.buy_page>.title{
	font-family:PingFang-SC-Medium;
	font-size:0.34rem;
	color:#333333;
	text-align: center;
}
.buy_page>.style{
	width: inherit;
	position: relative;
	height: 0.8rem;
}
.buy_page>.style>div{
	font-family:PingFangSC-Regular;
	font-size:0.30rem;
	color:#999999;
	line-height:0.8rem;
	float: left;
	text-align: center;
	height: 0.8rem;
	width: 50%;
	background-color: #fff;	
	position: relative;
}
.buy_page>.style:after{
	position: absolute;
	display: block;
	content: "";
	height: 1px;
	background: #e0e0e0;
	width: inherit;
	bottom: 0;
	left: 0;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.buy_page>.style>div>span{
	font-size: 0.30rem !important;
    color: #999999 !important;
}
.buy_page>.style>div.active>span{
	color:#00bcd4 !important;
	font-size: 0.3rem !important;
}
.buy_page>.style>div.active>span{
	height: 0.76rem;
	width: max-content;
	display: block;
	margin: 0 auto;
	border-bottom: 0.04rem solid #00bcd4;
}
.buy_page .pic{
	width: 100%;
	/*	height: 3rem;*/
	/*	border-bottom: 0.01rem solid #dedede;*/
	clear: left;
	background-color: #fff;
}
.buy_page .pic>img{
	width: 6.86rem;
	height: 2.6rem;
	margin: 0.2rem 0.32rem; 
}
.buy_page .purchase_rules{
	margin-top: 0.2rem;
	width: 100%;
	height: 1.94rem;
	background: #fff;
	text-align: left;
	position: relative;
}
.buy_page .purchase_rules:before{
	position: absolute;
	display: block;
	content: "";
	height: 1px;
	background: #e0e0e0;
	width: inherit;
	top: 0;
	left: 0;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.buy_page .purchase_rules:after,.buy_page .purchase_rules>div:after{
	position: absolute;
	display: block;
	content: "";
	height: 1px;
	background: #e0e0e0;
	width: inherit;
	bottom: 0;
	left: 0;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.buy_page .rules_gift{
	height: 3.6rem;
}
.buy_page .purchase_rules>div{
	margin-left: 0.32rem;
	font-family:PingFangSC-Regular;
	font-size:0.30rem;
	color:#333333;
	height: 0.8rem;
	position: relative;
	width: 7.18rem;
	line-height: 0.8rem;
}
.buy_page .purchase_rules>p{
	font-family:PingFangSC-Regular;
	font-size:0.24rem;
	color:#666666;
	padding-left: 0.32rem;
	margin-top: 0.05rem;
	height: 0.4rem;
}
.buy_page .purchase_rules>p>span{
	display: block;
	width: 0.1rem;
	height: 0.1rem;
	border-radius: 50%; 
	background: #000;
	float: left;
	margin-top: 0.15rem;
	margin-right: 0.2rem;
}
.buy_page .purchase_rules>p.text{
	padding-left: 0.6rem;
}
</style>