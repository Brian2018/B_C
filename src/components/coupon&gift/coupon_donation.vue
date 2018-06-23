<template>
	<div class="coupon_donation page">
		<div class="header"><span @click="$router.back()"></span>{{text}}转赠</div>
		<div class="coupon_card">
			<img v-if="text=='优惠券'" src="../img/Coupon_give_pic.png" alt="">
			<img v-else="text=='礼品券'" src="../img/Gift voucher_give_pic.png" alt="">
		</div>
		<div class="donation_button p_border">
			<a class="button" @click="$router.push({path:'/transfer_friend',name:'transfer_friend',query:{user_id:user_id,text:text}})">立即转增</a>
		</div>
		<div class="record p_border">
			<div class="record_title">
				<div :class="{'active':is_avtive}" @click='check1'><span>转赠</span></div>
				<div :class="{'active':!is_avtive}" @click='check2'><span>受赠</span></div>
			</div>
			<p>-{{text}}{{type}}记录-</p>
			<mt-tab-container v-model="active" swipeable>
				<mt-tab-container-item id="tab-container1">
					<ul>
						<li v-for='(item,index) in send_list'><span>{{item.remark}}</span><label for="">{{item.add_time}}</label></li>			
					</ul>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container2">
					<ul>
						<li v-for='(item,index) in accept_list'><span>{{item.remark}}</span><label for="">{{item.add_time}}</label></li>	
					</ul>
				</mt-tab-container-item>				
			</mt-tab-container>
			<p class="p_border see_detail" @click="$router.push({path:'/record_page',name:'record_page',query:{user_id:user_id,text:text}})"><span>查看详情</span></p>
		</div>
		<div class="return_flow p_border">
			<div class="title">{{text}}转赠说明</div>			
			<div class="list"><span></span><p>转赠对象需为您的一度好友或二度好友。</p></div>
			<div class="list"><span></span><p>{{text}}转赠后，对方将收到您的{{text}}，可以用于抵扣消费。您的好友同样可以给您赠送{{text}}。</p></div>	
		</div>
	</div>
</template>
<script>
import crypto from 'crypto'
export default{
	data(){
		return{
			text:'',
			type:'转赠',
			is_avtive:true,
			active:'tab-container1',
			user_id:'',
			accept_list:[],
			send_list:[],
		}
	},
	methods:{
		check1(){
			this.is_avtive=this.is_avtive==false?true:true;
			this.active='tab-container1';
			this.type='转赠'
		},
		check2(){
			this.is_avtive=this.is_avtive==true?false:false;
			this.active='tab-container2';
			this.type='受赠'
		}
	},
	watch:{
		active:function (newValue) {	
			if(this.active=='tab-container1'){
				this.is_avtive = true;	
				this.type='转赠'			
			}else{
				this.is_avtive = false;	
				this.type='受赠'			
			}
		}
	},
	mounted(){
		this.user_id=this.$route.query.user_id;
		this.text=this.$route.query.text;		
		var data =new Array();
	      data['user_id'] = this.user_id;
	      data['type'] = this.text=='优惠券'?'coupons':'gift';
	      data['shorthand'] =true;	      	      
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+[data['shorthand'],data['type'],data['user_id']].join(''));
		var app_key = md5.digest('hex');
		data['app_key']=app_key;
		var url='http://pass.71baomu.com/interface/Bill/selectHandserList/key/'+app_key;
		var _data='user_id='+this.user_id+'&type='+data['type']+'&shorthand='+data['shorthand'];
		this.$axios.post(url,_data).then((res)=>{
			console.log(res['data']['data']);
			this.accept_list=res['data']['data']['accept_list'];
			this.send_list=res['data']['data']['send_list'];
		})		
	}
}
</script>
<style>
.coupon_donation>.coupon_card{
	background: #fff;
}
.coupon_donation>.coupon_card>img{
	margin: 0.2rem 0.32rem;
	width: 6.86rem;
}
.coupon_donation>.donation_button{
	height: 1.28rem;
	width: 100%;
	background: #fff;
	float: left;
	margin-top: 0;
}
.coupon_donation>div>a{
	margin-top: 0.2rem;
	background: #22cae0;
}
.coupon_donation>.record{
	width: 100%;
	height: 5.2rem;
	float: left;
	font-size: 0.28rem;
	color:#666;
	position: relative;
}
.coupon_donation>.record>p{
	height: 0.6rem;
	line-height: 0.6rem;
}
.coupon_donation>.record ul{
	height: 3rem;
	overflow-y: auto;
}
.coupon_donation>.record ul li{
	font-size: 0.26rem;
	color: #999;
}
.coupon_donation>.record ul li>span{
	float: left;
	margin-left: 0.32rem;
}
.coupon_donation>.record ul li>label{
	float: right;
	margin-right: 0.32rem;
}
.coupon_donation>.record .see_detail{
	position: absolute;
	bottom: 0;
	height: 0.8rem;
	line-height: 0.8rem;
}
.coupon_donation>.record .see_detail>span{
	padding-right: 0.3rem;
	display: block;
	width: max-content;
	height: inherit;
	margin: 0 auto;
	background: url(../img/back_right.png) right center no-repeat;
	background-size: 0.2rem 0.4rem;
	font-size: 0.32rem;
	color: #00bcd4;
}
.coupon_donation>.record>.record_title{
	height: 0.8rem;
	width: inherit;
	position: relative;
}
.coupon_donation>.record>.record_title>div{
	width: 50%;
	height: inherit;
	float: left;
	font-size: 0.3rem;
	color: #999999;
	text-align: center;
	line-height: 0.8rem;    	
}
.coupon_donation>.record>.record_title>div>span{
	display: block;
	width: max-content;
	height: 0.76rem;		
	margin:0 auto;
}
.coupon_donation>.record>.record_title>div.active>span{
	color: #00bcd4;
	border-bottom:0.04rem solid #00bcd4;
}
.coupon_donation>.record>.record_title:after,.coupon_donation>.return_flow>.title:after{
	content: '';
	height: 1px;
	width: inherit;
	position: absolute;
	background: #e0e0e0;
	bottom: 0;
	left: 0;
	display: block;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.coupon_donation>.return_flow{
	height: 2.3rem;
	background: #fff;
	float: left;
	font-size: 0.3rem;
}
.coupon_donation>.return_flow>.title{
	width: 7.18rem;
	height: 0.8rem;
	line-height: 0.8rem;
	margin-left: 0.32rem;
	text-align: left;
	position: relative;
}
.coupon_donation>.return_flow>.list{
	font-size: 0.24rem;
    color: #666666;
    position: relative;
    text-align: left;
}
.coupon_donation>.return_flow>.list>span{
	position: absolute;
    top: 0.12rem;
    left: 0.32rem;
    display: block;
    width: 0.1rem;
    height: 0.1rem;
    background-color: #000;
    border-radius: 50%;
}
.coupon_donation>.return_flow>.list>p{
	margin: 0.05rem 0.32rem 0 0.6rem;
    line-height: 0.4rem;
}
</style>
