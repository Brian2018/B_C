<template>
	<div class="friend_page page">
		<div class="page_title">
			<div class="friend_title">
				好友<span @click="$router.push({path:'/add_friend'})"></span><i @click="$router.push({path:'/search_friend'})"></i>
			</div>
		</div>		
		<ul class="title_content">
			<li @click="$router.push({path:'/new_friend'})">
				<img src="../img/new_friend_icon.png" alt="">
				<label>新朋友</label>
				<span>请求添加为您的好友</span>
			</li>
			<li>
				<img src="../img/Mail list_icon.png" alt="">
				<label>通讯录</label>
				<span>邀请联系人享优惠券</span>
			</li>
			<li @click="$router.push({path:'/erdu_page',name:'erdu_page',query:{user_id:user_id}})">
				<img src="../img/possible person_icon.png" alt="">
				<label>二度好友</label>
				<span>可能认识的人</span>
			</li>
		</ul>
		<p class="list_title p_border"><span>好友</span></p>
		<div class="ul_list" v-for='(item,index) in group'>
			<p class="list" @click='show_list(index)'><i v-if="item.show"></i><a v-else="!item.show"></a>{{item.group_name}}<span>{{item.data.length}}</span></p>
			<ul class="ul_list" v-if="!item.show">
				<li v-for='(item1,index1) in item.data' @click="watch_friend(index1,index)"><span><img :src="item1.image_url" alt=""></span>{{item1.friend_name}}</li>
			</ul>
		</div>		
		<div class="main_footer border-before">
			<div class="homePage e-go-home" @click="go_home">首页</div>
			<div class="e-go-call application-active">六度好友</div>
			<div class="personCenter" @click="go_personal">个人中心</div>
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
			// show:true,
			user_id:'',
			friend_list:[],
			data:[],
			group:[],
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
		show_list(index){		
			let obj=this.group[index];
			obj.show=!obj.show;
			this.$set(this.group,index,obj);
		},
		watch_friend(index1,index){
			console.log(this.group[index].data[index1]);
			this.send_data=this.group[index].data[index1];				
			this.send_data['user']=this.user_id;
			this.send_data['six_id']=this.data[1];
			this.$store.commit('SET_MSG',this.send_data);
			this.$router.push({name:'friend_msg'});
		},
		go_home(){
			this.$store.commit('SET_MSG',this.data[1]);
			this.$router.push({path:'/home'})
		},
		go_personal(){
			this.$store.commit('SET_MSG',this.data);
			this.$router.push('/personal_center');
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
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
		var app_key = md5.digest('hex');
		var url=this.HOST+'Friend/getMyFriend/key/'+app_key;
		var user_id='user_id='+this.user_id;
//获取所有好友
		this.$axios.post(url,user_id).then((res)=>{
			this.friend_list=res['data']['data'];
			var url=this.HOST+'Friend/getGroup/key/'+app_key;
//获取所有分组
			this.$axios.post(url,user_id).then((res)=>{			
				this.group=res['data']['data'];				
				this.group.unshift({
					'group_id': 0,
					'group_name': '一度好友',
				});				
//向分组中添加好友
				for (var i = 0; i < this.group.length; i++) {
					for (var j = this.friend_list.length - 1; j >= 0; j--) {
						if(this.friend_list[j]['group_id']==this.group[i]['group_id']){	
							this.group[i]['data']= new Array();				
							this.group[i]['data'].push(this.friend_list[j]);
						}else{
							this.group[i]['data']='';
						}						
					}
					this.group[i]['show']=true;											
				}		
			})
		});		
	},

}
</script>
<style>
.friend_page .friend_title{
	height: 0.88rem;
	background: #fff;
	text-align: center; 
	font-size:0.34rem;
	color:#333333;
	line-height: 0.88rem;
	position: relative;
}
.friend_page .friend_title>span{
	position: absolute;
	display: block;
	top: 0.05rem;
	width: 0.64rem;
	height: inherit;
	background: url(../img/add_friend_icon.png) center no-repeat; 
	background-size: 0.64rem;
	right: 0.32rem;
}
.friend_page .friend_title>i{
	position: absolute;
	right: 1.1rem;
	top: 0.05rem;
	display: block;
	width: 0.64rem;
	height: inherit;
	background: url(../img/search_icon.png) center no-repeat; 
	background-size: 0.64rem;
}
.friend_page .friend_title:after{
	content: '';
	height: 1px;
	width: inherit;
	background: #ccc;
	bottom: 0;
	left: 0;
	display: block;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.friend_page .list:after{
	content: '';
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
.friend_page>.title_content{
	height: 1.48rem;
	background: #fff;
	padding: 0.3rem 0;
	position: relative;
	margin-top: 0.88rem;
}
.friend_page>.title_content>li{
	width: 2.49rem;
	float: left;
	height: inherit;
}
.friend_page>.title_content>li:nth-child(2){
	border-right: 0.01rem solid #eee; 
	border-left: 0.01rem solid #eee;
}
.friend_page>.title_content>li>img{
	width: 0.72rem;
	height: 0.72rem;
	display: block;
	margin:0 auto;
}
.friend_page>.title_content>li>label{
	font-size:0.24rem;
	color:#333333;
	text-align: center;
	display: inherit;
	line-height: 0.5rem;
}
.friend_page>.title_content>li>span{
	font-size:0.20rem;
	color:#999999;
	display: inherit;
}
.friend_page>.list_title{
	font-size:0.28rem;
	color:#00bcd4;
	height: 0.88rem;
	line-height: 0.88rem;
}
.friend_page>.list_title>span{
	float: left;
	margin-left: 0.32rem;
	width: max-content;
	height: 0.84rem;
	border-bottom: 0.04rem solid #00bcd4;
}
.friend_page .list{
	height: 0.88rem;
	width: 100%;
	background: #fff;
	position: relative;
	font-size:0.3rem;
	color:#333333;
	text-align: left;
	line-height: 0.9rem;
}
.friend_page .list>i,.friend_page .list>a{
	display: block;
	width: 0.48rem;
	height: inherit;
	background: url(../img/off.png) center no-repeat;
	background-size: 0.48rem;
	float: left;
	margin-left: 0.1rem;
}
.friend_page .list>a{
	background: url(../img/on.png) center no-repeat;
	background-size: 0.48rem;
}
.friend_page .list>span{
	font-size:0.28rem;
	color:#999999;
	line-height: 0.88rem;
	float: right;
	margin-right: 0.32rem;
}
.friend_page .ul_list{
	width: 100%;
	height: max-content;
	background:#fff;
	float: left;
	margin:0;
}
.friend_page .ul_list>li{
	height: 1rem;
	line-height: 1rem;
	font-family: PingFang-SC-Regular;
	font-size: 0.34rem;
	color: #333333;
	position: relative;
}
.friend_page .ul_list>li>span{
	display: block;
	width: 0.7rem;
	height: 0.7rem;
	border-radius: 50%;
	margin-right: 0.3rem;
	float: left;
	margin-top: 0.15rem;
	background: url(../img/head.png) center no-repeat;
	background-size: 0.7rem;
}
.friend_page .ul_list>li>span>img{
	border-radius: 50%;
}

</style>