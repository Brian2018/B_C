<template>
	<div class="set_group page">
		<div class="page_title">
			<div class="header"><span @click="$router.back()"></span>分组管理</div>
		</div>		
		<p class="p_border" @click='add_group' style="margin-top:1.08rem"><span></span>添加分组</p>
		<ul class="ul_list">
			<li v-for='(item,index) in group' @click='choose(index)'><span>{{item.group_name}}</span></li>
		</ul>
		<div class="add_box" v-show="show">
			<p>添加分组</p><span>请为新分组输入名称</span>
			<input type="text" v-model='name' placeholder="请输入分组名">
			<div>
				<div class="btn_cancel" @click='add_cancel'>取消</div>
				<div class="btn_true" @click='add_true'>确定</div>
			</div>
		</div>
		<div class="black" v-show="show"></div>
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
			group:[],
			show:false,
			name:'',
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
			var md5 = crypto.createHash("md5");
			md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.data.user_id+this.group[index]['group_id']+this.data.user);
			var app_key = md5.digest('hex');
			var url=this.HOST+'Friend/moveFriendGroup/key/'+app_key;
			let _data='friend_id='+this.data.user_id+'&group_id='+this.group[index]['group_id']+'&user_id='+this.data.user;
			this.$axios.post(url,_data).then((res)=>{				
				console.log(res)
			});
			this.$router.push({path:'/friend_more',name:'friend_more',query:{group_name:this.group[index]['group_name']}});		
		},
		add_group(){
			this.show=true;
		},
		add_cancel(){
			this.show=false;
		},
		add_true(){
			var md5 = crypto.createHash("md5");
			md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.name+this.data['user']);
			var app_key = md5.digest('hex');
			var url=this.HOST+'Friend/addGroup/key/'+app_key;
			let _data='group_name='+this.name+'&user_id='+this.data['user'];
			this.$axios.post(url,_data).then((res)=>{				
				this.group.push({
					'group_id': res['data']['data']['group_id'],
					'group_name': this.name
				})
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
			console.log(this.data.user_id)
			var md5 = crypto.createHash("md5");
			md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.data['user']);
			var app_key = md5.digest('hex');
			var url=this.HOST+'Friend/getGroup/key/'+app_key;
			let _data='user_id='+this.data['user'];
			this.$axios.post(url,_data).then((res)=>{
				console.log(res['data']['data']);
				this.group=res['data']['data'];
				this.group.unshift({
					'group_id': 0,
					'group_name': '一度好友',
				})
			})
		}	
	}
	</script>
	<style>
	.set_group>p{
		width: 100%;
		height: 0.88rem;
		font-family: PingFang-SC-Medium;
		font-size: 0.32rem;
		color: #000000;
		line-height: 0.88rem;
		text-align: left;
	}
	.set_group>p>span{
		display: block;
		background: url(../img/add-group.png) center no-repeat;
		background-size: 0.6rem;
		width: 0.6rem;
		height: 0.6rem;
		margin: 0.14rem 0.2rem 0 0.32rem;
		float: left;
	}
	.set_group>ul{
		float: left;
		width: 100%;
	}
	.set_group>ul>li{
		width: 100%;
		height: 0.88rem;
		margin-left: 0;
		line-height: 0.88rem;
	}
	.set_group>ul>li>span{
		float: left;
		margin-left: 0.32rem;
	}
	.set_group>.add_box{
		background: #f1f1f1;
		border-radius: 0.08rem;
		width: 6.00rem;
		height: 3.66rem;
		position: absolute;
		top: 2rem;
		left: 0.75rem;
		z-index: 3;
		font-size: 0.36rem;
		text-align: center;
	}
	.set_group>.add_box>p{
		width: 100%;
		margin-top: 0.42rem;
	}
	.set_group>.add_box>span{
		display: block;
		width: 100%;
		font-size: 0.28rem;
		line-height: 0.28rem;
		color: #262626;
		text-align: center;
		margin-top: 0.1rem;
	}
	.set_group>.add_box>input{
		-webkit-appearance: none;
		width: 5.36rem;
		outline: none;
		margin-top: 0.39rem;
		height: 0.7rem;
		padding-left: 0.1rem;
		border: 1px solid #b3b3b3;
		border-radius: 4px;
		font-size: 0.28rem;
	}
	.set_group>.add_box>div{
		height: 0.88rem;
		width: 100%;
		line-height: 0.88rem;
		border-top: 1px solid #d3d3d3;
		position: absolute;
		bottom: 0;
	}
	.set_group>.add_box>div>div{
		height: initial;
		width: 2.99rem;
		float: left;
	}
	.set_group>.add_box>div>div.btn_cancel{
		border-right:0.01rem solid #d3d3d3;
	}
	.set_group>.add_box>div>div.btn_true{
		color: #30bb32;
	}
	</style>