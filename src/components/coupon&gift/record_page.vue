<template>
	<div class="record_page page">
		<div class="page_title">
			<div class="header"><span @click="$router.back()"></span>{{text}}转赠&受赠记录</div>
			<div class="record_title">
				<div :class="{'active':is_avtive}" @click='check1'><span>转赠</span></div>
				<div :class="{'active':!is_avtive}" @click='check2'><span>受赠</span></div>
			</div>
		</div>		
		<mt-tab-container v-model="active" swipeable style="margin-top:1.68rem">
			<mt-tab-container-item id="tab-container1">
				<ul class="ul_list detail_list">
					<li v-for='(item,index) in send_list' @click="$router.push({path:'/detail_page'})">
						<p>{{item.remark}}<span>{{item.add_time}}</span></p>
						<p>{{text}}余额：{{item.balance}} <label>{{item.money}}</label></p>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="tab-container2">
				<ul class="ul_list detail_list">
					<li v-for='(item,index) in accept_list' @click="$router.push({path:'/detail_page'})">
						<p>{{item.remark}}<span>{{item.add_time}}</span></p>
						<p>{{text}}余额：{{item.balance}} <label>{{item.money}}</label></p>
					</li>
				</ul>
			</mt-tab-container-item>				
		</mt-tab-container>
	</div>
</template>
<script>
import crypto from 'crypto'
export default{
	data(){
		return{
			text:'',
			active:'tab-container1',
			is_avtive:true,
			user_id:'',
			accept_list:[],
			send_list:[],
			type:'',
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
			}else{
				this.is_avtive = false;								
			}
		}
	},
	mounted(){
		this.user_id=this.$route.query.user_id;
		this.text=this.$route.query.text;
		var data =new Array();
		data['user_id'] = this.user_id;
		data['type'] = this.text=='优惠券'?'coupons':'gift';
		data['shorthand'] =false;	      	      
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
.record_page .record_title{
	height: 0.8rem;
	width: inherit;
	position: relative;
	background: #fff;
}
.record_page .record_title:after{
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
.record_page .record_title>div{
	width: 50%;
	height: inherit;
	float: left;
	font-size: 0.3rem;
	color: #999999;
	text-align: center;
	line-height: 0.8rem;
}
.record_page .record_title>div>span{
	display: block;
	width: max-content;
	height: 0.76rem;
	margin: 0 auto;
}
.record_page .record_title>div.active>span {
	color: #00bcd4;
	border-bottom: 0.04rem solid #00bcd4;
}
.record_page ul{
	margin-top: 0;
}
.record_page ul:before{
	height: 0;
}
</style>