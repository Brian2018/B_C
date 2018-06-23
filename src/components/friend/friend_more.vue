<template>
	<div class="friend_more page">
		<div class="header"><span @click="$router.push('/friend_msg')"></span>更多</div>
		<p class="p_border"><span>昵称</span><label for="">{{data.nick_name}}</label></p>
		<p class="p_border"><span>备注名</span><label for="">{{data.friend_name}}</label></p>
		<p class="p_border" @click='group'><span>分组</span><i class="item_link"></i><label for="">{{data.group_name}}</label></p>
		<button class="button" v-show='!show' @click='delete_button'>删除好友</button>
		<div class="black" v-show="show"></div>
		<div class="del_box" v-show='show'>
			<div>
				<p>解除好友关系后会删除与对方的通话记录</p>
				<button @click='del_confirm'>删除</button>
			</div>
			<button @click='show=false'>取消</button>
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
			show:false,
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
		group(){
			this.$store.commit('SET_MSG',this.data);
			this.$router.push("/set_group");
		},
		delete_button(){
			this.show=true;			
		},
		del_confirm(){
			var md5 = crypto.createHash("md5");
			md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.data['user_id']+this.data['user']);
			var app_key = md5.digest('hex');
			var url=this.HOST+'Friend/delFriend/key/'+app_key;
			let _data='friend_id='+this.data['user_id']+'&user_id='+this.data['user'];
			this.$axios.post(url,_data).then((res)=>{
				this.$store.commit('SET_MSG',this.send_data);
				this.$router.push('/friend');
			})
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
		let group_name=this.$route.query.group_name;
		if (group_name!=undefined) {
			this.data.group_name=this.$route.query.group_name;
		}		
		console.log(this.data);
		this.send_data[0]=this.data.user;
		this.send_data[1]=this.data.six_id;
	}
}
</script>
<style>
	.friend_more>p{
		height: 0.88rem;
		width: 100%;
		background: #fff;
		line-height: 0.88rem;
	}
	.friend_more>p>span{
		float: left;
		margin-left: 0.32rem;
		font-size: 0.32rem;
    	color: #262626;
	}
	.friend_more>p>label{
		float: right;
	    font-size: 0.30rem;
	    color: #999999;
	    line-height: 0.88rem;
	    margin-right: 0.8rem;	    
	}
	.friend_more>button{
		position: absolute;
		bottom: 2rem;
		background: #fb6255;
	}
	.friend_more>.del_box{
	    position: fixed;
	    z-index: 3;
	    height: 3.37rem;
	    width: 7.12rem;
	    bottom: 0.2rem;
	    left: 0.18rem;
	}
	.friend_more>.del_box>div{
		background: #ffffff;
	    border-radius: 0.26rem;
	    width: 7.12rem;
	    height: 2.03rem;
	}
	.friend_more>.del_box>div>p{
		font-family: PingFang-SC-Regular;
	    font-size: 0.24rem;
	    height: 0.88rem;
	    color: #999999;
	    letter-spacing: 0.0095rem;
	    text-align: center;
	    position: relative;
	    line-height: 0.88rem;
	    border-bottom: 1px solid #e0e0e0;
	}
	.friend_more>.del_box>div>button{
		width: 100%;
		height: 1rem;
		border:0;
		background: #fff;
	    font-size: 0.36rem;
	    color: #fd3b32;
	    letter-spacing: 0.0143rem;
	    text-align: center;
	    line-height: 1rem;
	    float: left;
	    border-radius: 0.26rem;
	}
	.friend_more>.del_box>button{
		border:0;
		float: left;
		margin-top: 0.2rem;
	    background: #ffffff;
	    border-radius: 0.26rem;
	    width: 7.12rem;
	    height: 1.14rem;
	    font-family: PingFang-SC-Medium;
	    font-size: 0.36rem;
	    color: #1174db;
	    letter-spacing: 0.0143rem;
	    text-align: center;
	    line-height: 1.14rem;
	}
</style>