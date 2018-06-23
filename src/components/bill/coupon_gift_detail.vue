<template>
	<div class="coupon_detail">
		<div class="header"><span @click="go_back"></span>{{type}}明细</div>
		<div class="header_content">
			<p>{{mode}}</p>
			<div v-if='data_detail.bill_type=="-1"'>-{{data_detail.money}}</div>
			<div v-else='data_detail.bill_type=="1"'>{{data_detail.money}}</div>
			<span>交易成功</span>
		</div>
		<ul class="ul_list">			
			<li><span>交易类型</span><label for="">{{mode}}</label></li>
			<li><span>详细信息</span><label for="">{{data_detail.remark}}的{{data_detail.money}}元{{type}}</label></li>
		</ul>
		<div class="MessageBoard p_border">
			<div class="content">这是赠送给你的{{type}}，快去使用吧!</div>
		</div>
		<p class="p_border"><span>创建时间</span><label for="">{{data_detail.add_time}}</label></p>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default{
	data(){
		return{
			data:[],
			send_data:[],
			data_detail:[],
			type:'',
			mode:''
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
			console.log(this.send_data);
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
		console.log(this.data)
		this.type=this.data[2];
		this.data_detail=this.data[3];
		if (this.data[3]['remark'].substring(0,2)=='转赠') {
			this.mode='转赠';
		}else{
			this.mode='受赠';
		}
	}
}
</script>
<style>
.coupon_detail{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
}
.coupon_detail>.header_content{
	height: 2.9rem;
	background: #fff;
	font-size: 0.28rem;
	position: relative;
	width: 100%;
}
.coupon_detail>.header_content>p{
	line-height: 1rem;
}
.coupon_detail>.header_content>div{
	font-size: 0.64rem;
}
.coupon_detail>.header_content>span{
	font-size: 0.28rem;
	color: #999;
}
.coupon_detail>ul>li{
	margin: 0;
	height: 0.9rem;
	line-height: 0.9rem;
	position: relative;
	width: 100%;
}
.coupon_detail>ul>li:after,.coupon_detail>.header_content:after{
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
.coupon_detail>p{
	font-size: 0.3rem;
	color: #333;
	height: 0.9rem;
	line-height: 0.9rem;
}
.coupon_detail>p>span,.coupon_detail>ul>li>span{
	float: left;
	margin-left: 0.32rem;
}
.coupon_detail>p>label,.coupon_detail>ul>li>label{
	float: right;
	margin-right: 0.32rem;
	font-size: 0.28rem;
	color: #999;
	width: 5rem;
	height: initial;
	text-align: right;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.MessageBoard {
	margin-top: 0.2rem;
	width: 100%;
	height: 1.68rem;
	font-family: PingFang-SC-Regular;
	font-size: 0.28rem;
	color: #999999;
	background-color: #fff;
	position: relative;
}
.MessageBoard>div {
	width: 6.46rem;
	height: 0.68rem;
	margin: 0.3rem 0.32rem;
	padding: 0.2rem;
	background: #f5f5f5;
	border: 1px solid #e6e6e6;
	border-radius: 0.04rem;
	float: left;
	text-align: left;
}
</style>