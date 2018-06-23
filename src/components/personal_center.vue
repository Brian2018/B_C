<template>
	<div class="person_center">
		<div class="header">个人中心<label></label></div>	
		<div class="touxiang" v-fb="{cls:'touhActive'}" @click="$router.push({path:'/personal_msg',name:'personal_msg',query:{six_id:six_id}})">
			<img v-if='image_url' :src="image_url" alt="">
			<img v-else='!image_url' src="./img/head.png" alt="">
			<span>{{nick_name}}</span><i class="item_link"></i><img class="scan" src="./img/QR code_icon.png" alt="">
		</div>
		<ul class="ul_list">
			<li v-fb="{cls:'touhActive'}" @click="go_balance"><img src="./img/yuer.png" alt="">余额<i class="item_link"></i><span>¥{{account}}</span></li>
			<li v-fb="{cls:'touhActive'}" @click="go_coupon"><img src="./img/Coupon@3x.png" alt="">优惠券<i class="item_link"></i><span>¥{{coupon}}</span></li>
			<li v-fb="{cls:'touhActive'}" @click="go_gift"><img src="./img/lipinquan.png" alt="">礼品券<i class="item_link"></i><span>¥{{gift}}</span></li>
		</ul>
		<p v-fb="{cls:'touhActive'}" @click="go_bill"><img src="./img/orderlists.png" alt="">账单明细<i class="item_link"></i></p>
		<p v-fb="{cls:'touhActive'}" @click="$router.push({path:'/set',name:'set',query:{six_id:six_id}})"><img src="./img/settings.png" alt="">设置<i class="item_link"></i></p>
		<div class="main_footer border-before">
			<div class="homePage e-go-home" @click="go_home">首页</div>
			<div class="application e-go-call" @click="$router.push({path:'/friend',name:'friend',query:{user_id:user_id,six_id:six_id}})">六度好友</div>
			<div class="personCenter personCenter-active">个人中心</div>
		</div>		
	</div>	
</template>
<script>
import crypto from 'crypto';
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default{
	data(){
		return{				
			account:'',
			coupon:'',
			gift:'',
			image_url:'',
			nick_name:'',
			user_id:'',
			six_id:'',
			data:[],
			send_data:[]
		}			
	},
	computed:mapState({
		msg:state => state.msg
	}),
	computed:mapGetters({
		msg:'GET_MSG',
	}),
	methods:{
		go_home(){
			this.$store.commit('SET_MSG',this.data[1]);
			this.$router.push('/home');
		},
		go_balance(){
			this.send_data[0]=this.data[0];
			this.send_data[1]=this.six_id;
			this.send_data[2]=this.account;
			this.$store.commit('SET_MSG',this.send_data);
			this.$router.push('/balance');
		},
		go_coupon(){
			this.send_data[0]=this.data[0];
			this.send_data[1]=this.six_id;
			this.send_data[2]=this.coupon;
			this.$store.commit('SET_MSG',this.send_data);
			this.$router.push('/coupon');
		},
		go_gift(){
			this.send_data[0]=this.data[0];
			this.send_data[1]=this.six_id;
			this.send_data[2]=this.gift;
			this.$store.commit('SET_MSG',this.send_data);
			this.$router.push('/gift');
		},
		go_bill(){
			this.send_data[0]=this.data[0];
			this.send_data[1]=this.six_id;
			this.send_data[2]='bill';
			this.$store.commit('SET_MSG',this.send_data);
			this.$router.push('/bill');
		}
	},
	created(){
		if (this.msg!='') {		
			var obj=this.msg;
			var str=JSON.stringify(obj);
			//存入 
			sessionStorage.obj = str; 
			//读取 
			str = sessionStorage.obj; 
			//重新转换为对象 
			obj = JSON.parse(str);			
		}
		this.data=JSON.parse(sessionStorage.obj);		
		this.user_id=this.data[0];	
		this.six_id=this.data[1];			
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.six_id);
		var app_key = md5.digest('hex');	
		var md6 = crypto.createHash("md5");
		md6.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
		var app_key1 = md6.digest('hex');	     		
		var url_user='http://pass.71baomu.com/interface/user/getUserInfo/key/' + app_key;
		var url = 'http://pass.71baomu.com/interface/account/getAccountInfo/key/' + app_key1; 
		var six_id='six_id='+this.six_id;
		var new_user_id;
		this.$axios.post(url_user,six_id).then((res) => {			
			this.nick_name=res['data']['data']['nick_name'];
			this.image_url=res['data']['data']['image_url'];				
		});
		var data = new Object;
		data = 'user_id='+this.user_id;	
		this.$axios.post(url,data).then((res) => {			
			this.account=res['data']['data']['balance'];
			this.coupon=res['data']['data']['coupons_balance'];
			this.gift=res['data']['data']['gift_balance'];
		});			
	},

}
</script>
<style>
.person_center{
	position: fixed;
	background: #F5F7F7;
	width: 100%;
	height: 100%;
}
.person_center>header>label{
	width: 0.4px;
	height: 0.4rem;
	background: url();
}
.touxiang{
	position: relative;
	width: inherit;
	height: 1.5rem;
	background: #fff;		
	margin-top: 0.2rem;
	font-family: PingFangSC-Regular;
	font-size: 0.32rem;
	color: #333333;
	letter-spacing: 1.26px;
	line-height: 1.5rem;
	text-align: left;
}
.touxiang:after{
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
.touxiang:before{
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
.touxiang>img{
	width: 0.92rem;
	height: 0.92rem;
	border-radius: 50%;
	float: left;
	padding: 0.32rem 0.29rem;
}
.person_center>ul{
	height: 3.63rem;
}
.person_center>ul>li{
	height: 1.2rem;
	line-height: 1.2rem;
}
.person_center>ul>li>img,.person_center>p>img{
	width: 0.44rem;
	height: 0.44rem;
	float: left;
	display: inline-block;
	vertical-align: middle;
	margin-top: 0.35rem;
	margin-right: 0.2rem;
}
.person_center>ul>li>span{
	float: right;
	font-size: 0.26rem;
	color: #B3B3B3;
	letter-spacing: 1.03px;
	margin-right: 0.2rem;
}
.person_center>p{
	width: inherit;height: 1.2rem;
	font-family: PingFangSC-Regular;
	font-size: 0.30rem;
	color: #333333;
	letter-spacing: 1.18px;
	text-align: left;
	line-height: 1.2rem;
	background: #fff;
	margin-top: 0.2rem;
	position: relative;
}
.person_center>p:before{
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
.person_center>p:after{
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
.person_center>p>img{
	margin-left: 0.32rem;
}
.touhActive{
	background: #dedede !important;
}
.touxiang>img.scan{
	border-radius: 0;
	width: 0.48rem;
	height: 0.48rem;
	float: right;
	margin-top: 0.2rem;
}
</style>