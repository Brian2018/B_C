<template>
	<div class="buy_content">
		<div class="title">优惠券购买<span>（账户可提现余额为¥120.35）</span></div>
		<div class="option" v-for="(item,index) in coupon" :class="[item.class, {'active': item.is_check}]" @click="addClassFun(index)">
			<p>{{item.amount}}</p>
			<span>{{item.price}}</span>			
		</div>
		<input type="number" v-number-only placeholder="输入优惠券金额">
		<p>购买：优惠券<span>¥100</span></p>
		<p>需支付：可提现余额<span>¥20</span></p>
		<div class="div_button"><button @click='buy()' class="button">确认购买</button></div>
		<div class="black" v-if='!box_input'></div>
		<!-- <Box-input/> -->
	</div>	
</template>
<script>
export default{
	data(){
		return{
			box_input:true,
			'coupon':[
			{
				'amount':'¥100优',
				'price':'¥20',
				'class':'first',
				'is_check':true
			},
			{
				'amount':'¥500优',
				'price':'¥100',
				'class':'second',
				'is_check':false
			},
			{
				'amount':'¥1000优',
				'price':'¥200',
				'class':'third',
				'is_check':false
			}					
			],				
		}
	},
	methods:{
		addClassFun(index){      
			for (var i = 0; i < this.coupon.length; i++) {
				this.coupon[i].is_check = false;        
			}		      
			this.coupon[index].is_check = true;
		},	
		buy(){
			this.box_input=false;
		}
	},
	 directives: {
        numberOnly: {
            bind: function(el) {
                el.handler = function() {
                    el.value = el.value.replace(/\D\./, '')
                }
                el.addEventListener('input', el.handler)
            },
            unbind: function(el) {
                el.removeEventListener('input', el.handler)
            }
        }
    },	
}
</script>
<style>
.buy_content{
	background-color: #fff;
	width: inherit;
	height: 5.33rem;
	margin-top: 0.2rem;
	position: relative;
}
.buy_content:before,.buy_content>.div_button:before{
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
.buy_content:after,.buy_content>.title:after{
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
.buy_content>.title{
	height: 0.8rem;
	margin-left: 0.32rem;
	position: relative;
	font-family:PingFangSC-Regular;
	font-size:0.30rem;
	color:#333333;
	line-height:0.8rem;
	text-align: left;
	width: inherit;
}
.buy_content>.title>span{
	font-size:0.2rem;
	color:#999999;
}
.buy_content>.option{
	width: 2.14rem;
	height: 0.88rem;
	float: left;
	border:1px solid #e0e0e0;
	font-family:PingFangSC-Regular;
	font-size:0.24rem;
	color:#333333;
	text-align:center;
	margin:0.2rem 0.2rem 0.2rem 0;
	border-radius:0.04rem;
	position: relative;
}
.buy_content>.option.active{
	background: url(../img/choose_box.png) no-repeat;
	background-size: 2.14rem;
	height: 0.88rem;
	border:0;
}
.buy_content>.first{
	margin-left: 0.32rem;
}	
.buy_content>input{
	font-family:PingFangSC-Regular;
	width: 6.66rem;
	height: 0.8rem;
	border:0.01rem solid #e0e0e0;
	border-radius:0.04rem;
	font-size: 0.28rem;
	padding-left: 0.2rem;
	float: left;
	margin:0 0.32rem;		
}
.buy_content>p{
	font-size:0.24rem;
	color:#999999;
	text-align: left;
	padding-left: 0.32rem;		
	float: left;
	width: 7rem;
}
.buy_content>p>span{
	font-size:0.32rem;
	color:#333333;
}
.buy_content>.div_button{
	width: inherit;
	height: 1.25rem;
	position: relative;
	float: left;
}
.buy_content>.div_button>button{
	border:0;
	width: 6.86rem;
	height: 0.88rem;
	background:#22cae0;
	color: #fff;
	font-size: 0.32rem;
	float: left;
	margin-left: 0.32rem;	
	margin-top: 0.2rem;	
}
</style>