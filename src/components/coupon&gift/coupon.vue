<template>
	<div class="coupon">
		<div class="coupon_header"><span @click="go_back">个人中心</span>优惠券<i @click="$router.push({path:'/ruleDescription',name:'ruleDescription',query:{type:type}})"></i></div>
		<div class="header_content">
			<span>可用金额（元）</span>
			<p>{{coupon}}</p>
			<div @click='$router.push({path:"/bill"})'>购买优惠券</div>
		</div>
		<div class="coupon_content">
			<div class="use">
				<p>优惠券使用</p>
				<img @click="$router.push({path:'/use_coupon'})" src="../img/Coupon_use_pic.png" alt="">
			</div>
			<div class="give">
				<p>优惠券转增</p>
				<img @click="$router.push({path:'/coupon_donation',name:'coupon_donation',query:{user_id:user_id,text:type}})" src="../img/Coupon_give_pic.png" alt="">
			</div>
		</div>
		<span @click="go_bill">查看优惠券明细</span>
	</div>
</template>
<script type="text/javascript">
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default{
	data(){
		return{
			coupon:'',
			user_id:'',
			type:'优惠券',
			data:[],
			send_data:[],
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
		},
		go_bill(){
			this.send_data[0]=this.data[0];
			this.send_data[1]=this.data[1];			
			this.send_data[2]=this.type;
			this.$store.commit('SET_MSG',this.send_data);
			this.$router.push('/bill');
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
		this.coupon=this.data[2];
		this.user_id=this.data[0];
	}
}
</script>