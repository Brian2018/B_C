<template>
	<div class="friend_msg page">
		<div class="header"><span @click="back"></span>好友</div>
		<div class="header_content p_border">
			<p><span @click="more">更多</span></p>
			<img v-if='data.image_url!=null' :src="data.image_url" alt="">
			<img v-if='data.image_url==null' src="../img/head.png" alt="">
			<span>{{data.nick_name}}</span>
			<label for="">昵称：{{data.nick_name}}</label>
		</div>
		<p><span>个人信息</span></p>
		<ul class="ul_list">
			<li><a :href="'tel:'+data.phone"><span>电话</span><label for="">{{data.phone}}</label><i class="item_link"></i></a></li>
			<li><span>共同好友</span><label for="">{{CommonFriend}}</label></li>
			<li>暂无通话历史</li>
		</ul>
	</div>
</template>
<script>
import crypto from 'crypto';
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default{	 
	data(){
		return{
			user_msg:[],
			data:[],
			CommonFriend:'',
			friend_data:[],
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
		more(){
			this.friend_data['user']=this.data['user'];
			this.friend_data['six_id']=this.data['six_id'];
			this.$store.commit('SET_MSG',this.friend_data);
			this.$router.push('/friend_more');
		},
		back(){
			this.send_data[0]=this.data['user'];
			this.send_data[1]=this.data['six_id'];
			this.$store.commit('SET_MSG',this.send_data);
			this.$router.push('/friend');
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
		var md6 = crypto.createHash("md5");
		md6.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.data['user']);
		var app_key1 = md6.digest('hex');
		var url=this.HOST+'Friend/getMyFriend/key/'+app_key1;
		var user_id='user_id='+this.data['user'];
		this.$axios.post(url,user_id).then((res)=>{
			for (var i = 0; i < res['data']['data'].length; i++) {
				if(res['data']['data'][i]['user_id']==this.data.user_id){
					this.friend_data=res['data']['data'][i];
				}
			}
		});
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.data['user_id']+this.data['user']);
		var app_key = md5.digest('hex');
		var url=this.HOST+'Friend/getCommonFriend/key/'+app_key;
		let _data='friend_id='+this.data['user_id']+'&user_id='+this.data['user'];
		this.$axios.post(url,_data).then((res)=>{
			this.CommonFriend=res['data']['data'][0];
		})
	},
}
</script>
<style>
.friend_msg>.header_content{
	background: #ffffff;
	width: 7.50rem;
	height: 3.68rem;
	float: left;
	margin:0;
}
.friend_msg>.header_content:before{
	height: 0;
}
.friend_msg>.header_content>p{
	width: initial;
}
.friend_msg>.header_content>p>span{
	font-size: 0.32rem;
	color: #14c4e2;
	letter-spacing: 0.0127rem;
	position: absolute;
	top: 0.22rem;
	right: 0.32rem;
}
.friend_msg>.header_content>img{
	width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    position: absolute;
    margin-top: 0.7rem;
    left: 3.05rem;
}
.friend_msg>.header_content>span{
	display: block;
	font-size: 0.36rem;
    color: #333333;
    letter-spacing: 0.0143rem;
    margin-top: 2.25rem;
    text-align: center;
    margin-left: 2.25rem;
    max-width: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.friend_msg>.header_content>label{
	display: block;
	font-size: 0.32rem;
    color: #999999;
    letter-spacing: 0.0127rem;
    text-align: center;
    margin-left: 2.25rem;
    max-width: 2.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.friend_msg>p{
	width: initial;
	height: 0.6rem;
	line-height: 0.6rem;
	font-size: 0.28rem;
    color: #7a797a;
    letter-spacing: 0.02rem;
}
.friend_msg>p>span{
	float: left;
	margin-left: 0.32rem;
}
.friend_msg>ul{
	float: left;
	margin-top: 0;
}
.friend_msg>ul>li{
	width: 7.5rem;
	margin-left: 0;
	height: 1rem;
	background: #fff;
	line-height: 1rem;
	text-align: center;
	font-size: 0.28rem;
	color: #999999;
}
.friend_msg>ul>li>a{
	display: block;;
	width: inherit;
	height: inherit;	
	color: #333;
}
.friend_msg>ul>li span{
	float: left;
	margin:0 0.32rem;
	font-size: 0.28rem;
}
.friend_msg>ul>li label{
	float: left;
	color: #44baf5;
	font-size: 0.3rem;
}
</style>