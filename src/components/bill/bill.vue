<template>
	<div class="bill">
		<div class="page_title">
			<div class="header"><span @click="go_back"></span>账单明细</div>
			<ul class="title">
				<li v-for="(item,index) in title" :class='{"active":item.isActive}' @click="choose(index)"><label>{{item.name}}</label><i></i></li>	  
			</ul>
		</div>	
		<div class="page-loadmore">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
					<ul class="ul_list detail_list page-loadmore-list">
						<li v-for='(item,index) in funds_detail' @click="go_detail(index)">
							<p>{{item.remark}}<span>{{item.add_time}}</span></p>
							<p>余额：{{item.balance}} <label>{{item.money}}</label></p>
						</li>					
					</ul>
					<div slot="top" class="mint-loadmore-top">
						<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
						<span v-show="topStatus === 'loading'">
							<mt-spinner type="snake"></mt-spinner>
						</span>
					</div>
					<div slot="bottom" class="mint-loadmore-bottom">
						<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
						<span v-show="bottomStatus === 'loading'">
							<mt-spinner type="snake"></mt-spinner>
						</span>
					</div>
				</mt-loadmore>
			</div>
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
			user_id:'',
			app_key:'',
			funds_detail:[],
			type:'',
			'title':[{'name':'资金明细',isActive:true},{'name':'优惠券明细',isActive:false},{'name':'礼品券明细',isActive:false}],
			allLoaded:false,
			list: [],
			topStatus: '',
			wrapperHeight: 0,
			translate: 0,
			moveTranslate: 0,
			allLoaded: false,
			bottomStatus: '',
			wrapperHeight: 0,
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
		choose(index){
			this.title.forEach(function(obj){
				obj.isActive = false;
			})
			if (index==0) {
				this.type='bill';
				this.data[2]=this.type;
			}else if(index==1) {
				this.type='优惠券';
				this.data[2]=this.type;
			}else if(index==2) {
				this.type='礼品券';
				this.data[2]=this.type;
			}
			this.title[index].isActive=true;
			var user_id='user_id='+this.user_id;
			if (this.title[index]['name']=='优惠券明细'||this.type=='优惠券') {			
				var url=this.HOST+'bill/getCouponsBill/key/' + this.app_key;
				this.$axios.post(url,user_id).then((res)=>{
					this.funds_detail=res['data']['data'];
					console.log(this.funds_detail);
					this.funds_detail.forEach(function(obj){
						obj.add_time=obj.add_time.substring(0,10);					
					})
				})
			}else if (this.title[index]['name']=='礼品券明细'||this.type=='礼品券') {
				var url=this.HOST+'bill/getGiftBill/key/' + this.app_key;
				this.$axios.post(url,user_id).then((res)=>{
					this.funds_detail=res['data']['data'];
					this.funds_detail.forEach(function(obj){
						obj.add_time=obj.add_time.substring(0,10);					
					})
				})
			}else if (this.title[index]['name']=='资金明细'||this.type=='bill') {				
				var url=this.HOST+'bill/getCapitalBill/key/' + this.app_key;
				this.$axios.post(url,user_id).then((res)=>{
					this.funds_detail=res['data']['data'];
					this.funds_detail.forEach(function(obj){
						obj.add_time=obj.add_time.substring(0,10);					
					})
				})
			}
		},
		handleTopChange(status) {
			this.moveTranslate = 1;
			this.topStatus = status;
		},
		translateChange(translate) {
			const translateNum = +translate;
			this.translate = translateNum.toFixed(2);
			this.moveTranslate = (1 + translateNum / 70).toFixed(2);
		},
		loadTop() {
			setTimeout(() => {
				let firstValue = this.list[0];
				for (let i = 1; i <= 10; i++) {
					this.list.unshift(firstValue - i);
				}
				this.$refs.loadmore.onTopLoaded();
			}, 1500);
		},
		handleBottomChange(status) {
			this.bottomStatus = status;
		},
		loadBottom() {
			setTimeout(() => {
				let lastValue = this.list[this.list.length - 1];
				if (lastValue < 40) {
					for (let i = 1; i <= 10; i++) {
						this.list.push(lastValue + i);
					}
				} else {
					this.allLoaded = true;
				}
				this.$refs.loadmore.onBottomLoaded();
			}, 1500);
		},
		go_detail(index){
			if (this.type=='bill') {				
				this.data.push(this.funds_detail[index]);
				this.$store.commit('SET_MSG',this.data);
				this.$router.push('/bill_detail');
			}else{			
				this.data.push(this.funds_detail[index]);
				this.$store.commit('SET_MSG',this.data);
				this.$router.push('/coupon_gift_detail');
			}
			
		},
		go_back(){
			this.$store.commit('SET_MSG',this.data);
			this.$router.back();
		}
	},
	created() {
		for (let i = 1; i <= 20; i++) {
			this.list.push(i);
		}
	},
	mounted() {
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
		this.type=this.data[2];	
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
		this.app_key = md5.digest('hex');		     		
		if (this.type=='bill') {
			this.choose(0);
		}else if (this.type=='优惠券') {
			this.choose(1);
		}else if (this.type=='礼品券') {
			this.choose(2);
		}		
	}
}
</script>
<style>
@component-namespace page {
	@component loadmore {
		width: 100%;
		overflow-x: hidden;
		@descendent desc {
			text-align: center;
			color: #666;
			padding-bottom: 5px;
			&:last-of-type {
				border-bottom: solid 1px #eee;
			}
		}

		@descendent listitem {
			height: 50px;
			line-height: 50px;
			border-bottom: solid 1px #eee;
			text-align: center;
			&:first-child {
				border-top: solid 1px #eee;
			}
		}

		@descendent wrapper {
			margin-top: -1px;
			overflow: scroll;
		}

		.mint-spinner {
			display: inline-block;
			vertical-align: middle;
		}
	}
}
@component loading-background{
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	transition: .2s linear;
}
@component mint-loadmore-top,@component mint-loadmore-bottom  {
	span {
		display: inline-block;
		transition: .2s linear;
		vertical-align: middle;
		@when rotate {
			transform: rotate(180deg);
		}
	}
}
.mint-loadmore-top, .mint-loadmore-bottom{
	font-size: 0.3rem !important;
	text-align: center !important;
}
.mint-spinner-snake{
	display: block;
	margin: 0 auto;
}

.bill{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
}
.bill>.page-loadmore{
	margin-top: 1.6rem;
}
.bill .title{
	background: #fff;
	height:0.72rem;
	width: 100%;
	position: relative;
}
.bill .title:after{
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
.bill .title>li{
	width: 33%;
	height: 0.5rem;
	list-style: none;
	font-size: 0.28rem;
	color: #333;
	line-height: 0.7rem;
	text-align: center;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	-webkit-justify-content: center;
	-webkit-align-items: center;
	margin-top: 0.1rem;
	float: left;
	background: url(../img/jiantou_down.png) 2.1rem center no-repeat;
	background-size: 0.16rem;
}
.bill .title>li.active{
	background: url(../img/jiantou_up.png) 2.1rem center no-repeat;
	background-size: 0.16rem;
	color: #00bcd4;
}
.bill .title>li:nth-child(2){
	border-right: 1px solid #d9d7d7;
	border-left:1px solid #d9d7d7;
}
.bill .ul_list{
	margin: 0;
	float: left;
}
.bill .ul_list:before{
	height: 0;
}
</style>