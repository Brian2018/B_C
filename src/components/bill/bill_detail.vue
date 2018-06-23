<template>
	<div class="bill_detail">
		<div class="header"><span @click="go_back">账单明细</span>资金明细</div>
		<div class="header_content">
			<p>{{data_detail.remark}}</p>
			<div v-if='data_detail.bill_type=="-1"'>-{{data_detail.money}}</div>
			<div v-else='data_detail.bill_type=="1"'>{{data_detail.money}}</div>
			<span>交易成功</span>
		</div>
		<p class="p_border"><span>交易类型</span><label for="">{{data_detail.remark}}</label></p>
		<ul class="ul_list">
			<li><span>可提现余额</span><label for="">-{{data_detail.money}}</label></li>
			<li v-if='this.gift_balance!="0.00"'><span>礼品券余额</span><label for="">+{{gift_balance}}</label></li>
			<li v-if='this.coupons_balance!="0.00"'><span>优惠券余额</span><label for="">+{{coupons_balance}}{{point}}</label></li>
		</ul>
		<p class="p_border"><span>创建时间</span><label for="">{{add_time}}</label></p>
	</div>
</template>
<script>
import crypto from 'crypto';
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default{
	data(){
		return{
			data:[],
			data_detail:[],
			send_data:[],
			type:'',
			coupons_balance:'',
			add_time:'',
			gift_balance:'',
			point:'',
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
			this.send_data[0]=this.data[0];	
			this.send_data[1]=this.data[1];	
			this.send_data[2]=this.type;
			this.$store.commit('SET_MSG',this.send_data);			
			this.$router.back();
		},		
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
		this.data_detail=this.data[3];
		if (this.data_detail.remark=='余额购买礼品券') {
			this.point='(额外赠送)';
		}
		console.log(this.data);
		if (this.data[2]=='bill') {
			this.type='bill';
		}else if(this.data[2]=='礼品券'){
			this.type='gift';			
		}else if(this.data[2]=='优惠券'){
			this.type='coupons';
		}
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.data_detail.id+this.type+this.data[0]);
		var app_key = md5.digest('hex');
		var url=this.HOST+'Bill/getChangeDetail/key/'+app_key;
		var _data='user_id='+this.data[0]+'&detail_id='+this.data_detail.id+'&type='+this.type;
		console.log(_data)
		this.$axios.post(url,_data).then((res)=>{
			console.log(res['data']['data']);
			this.coupons_balance=res['data']['data']['coupons_balance'];			
			this.gift_balance=res['data']['data']['gift_balance'];
			this.add_time=res['data']['data']['add_time'];
		})
	}
}
</script>
<style>
.bill_detail{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
}
.bill_detail>.header_content{
	height: 2.9rem;
	background: #fff;
	font-size: 0.28rem;
	position: relative;
	width: 100%;
}
.bill_detail>.header_content>p{
	line-height: 1rem;
}
.bill_detail>.header_content>div{
	font-size: 0.64rem;
}
.bill_detail>.header_content>span{
	font-size: 0.28rem;
	color: #999;
}
.bill_detail>p{
	font-size: 0.3rem;
	color: #333;
	height: 0.9rem;
	line-height: 0.9rem;
}
.bill_detail>ul>li{
	margin: 0;
	height: 0.9rem;
	line-height: 0.9rem;
	position: relative;
	width: 100%;
}
.bill_detail>ul>li:after,.bill_detail>.header_content:after{
	content: '';
	position: absolute;
	height: 1px;
	width: inherit;
	background: #e0e0e0;
	bottom: 0;
	left: 0;
	display: block;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.bill_detail>p>span,.bill_detail>ul>li>span{
	float: left;
	margin-left: 0.32rem;
}
.bill_detail>p>label,.bill_detail>ul>li>label{
	float: right;
	margin-right: 0.32rem;
	font-size: 0.28rem;
	color: #999;
}
</style>
