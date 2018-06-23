<template>
	<div class="balance">
		<div class="title">
			<span  @click="go_back">个人中心</span>
			余额
			<label @click="$router.push({path:'/addBank',name:addBank,query:{user_id:user_id}})">银行卡</label>
		</div>
		<div class="header_content">
			<div>余额(元)</div>
			<p>{{account}}<span>(可提现余额:<label for="">{{account}}</label>)</span></p>
		</div>	
		<p class="recharge" @click="$router.push({path:'/recharge'})"><span>充值</span><i></i></p>
		<p class="withdrawals" @click="$router.push({path:'/withdrawals',name:withdrawals,query:{user_id:user_id}})"><span>提现</span><i></i></p>
		<p class="buy" @click="$router.push({path:'/buy_page'})"><span>购买</span><i></i></p>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default{
	data(){
		return{
			account:'',
			user_id:'',
			data:[],			
		}
	},
	computed:mapState({
		msg:state => state.msg
	}),
	computed:mapGetters({
		msg:'GET_MSG',
	}),
	methods:{
		go_back(){
			this.$store.commit('SET_MSG',this.data);
			this.$router.back();
		}
	},
	mounted(){
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
		this.account=this.data[2];
		this.user_id=this.data[0];	
	}
}
</script>
<style>
.balance{
	width: 100%;
	height: 100%;
	background:#f5f7f7;
	position: fixed;
}
.balance>.title{
	height: 0.88rem;
	width: 100%;
	background-color:#00bcd4;
	font-family:PingFangSC-Regular;
	font-size:0.32rem;
	color:#ffffff;
	line-height: 0.88rem;
	text-align: center;
}
.balance>.title>span{
	position: absolute;
	float: left;
	margin-left: 0.32rem;
	display: block;
	width: max-content;
	height: max-content;
	padding-left: 0.35rem;
	background:url(../img/yingyong_back.png)0.05rem center no-repeat;
	background-size: 0.2rem;
	vertical-align: middle;
}
.balance>.title>label{
	position: absolute;
	right: 0.32rem;
}
.balance>.header_content{
	width: 100%;
	height: 3.4rem;
	background-color:#00bcd4;
	font-family:PingFangSC-Regular;
	font-size:0.28rem;
	color:#ffffff;
	float: left;
}
.balance>.header_content>div{
	text-align: left;
	padding-left: 0.32rem;
	margin-top:0.7rem;
	margin-bottom: 0.2rem;
}
.balance>.header_content>p{
	font-size:0.96rem;
	text-align: left;
	padding-left: 0.32rem;
}
.balance>.header_content>p>span{
	font-size: 0.24rem;
	padding-left: 0.1rem;		
}
.balance>p{
	height: 0.88rem;
	width: inherit;
	position: relative;
	float: left;		
	background-color: #fff;			
}
.balance>p:after,.balance>p.buy:after{
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
.balance>p>i{
	float: right;
	display: inline-block;
	width: 0.2rem;
	height: inherit;
	background: url(../img/link_to.png) center no-repeat;
	background-size: 0.2rem;
	margin-right: 0.32rem;
}
.balance>p>span{
	float: left;
	font-family:PingFangSC-Regular;
	font-size:0.32rem;
	color:#333333;	
	display: block;
	width: max-content;
	height: inherit;
	padding-left: 0.65rem;
	background:url(../img/recharge.png) left center no-repeat;
	background-size: 0.44rem;	
	line-height: 0.88rem;
	margin-left: 0.32rem;
}
.balance>p.withdrawals>span{
	background:url(../img/withdrawals.png) left center no-repeat;
	background-size: 0.44rem;
}
.balance>p.buy{
	margin-top: 0.2rem;
	position: relative;
}
.balance>p.buy:before{
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
.balance>p.buy>span{
	background:url(../img/duihuan_icon.png) left center no-repeat;
	background-size: 0.44rem;
}
</style>