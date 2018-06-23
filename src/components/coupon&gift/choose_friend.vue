<template>
	<div class="yidu_friend page">
		<div class="page_title">
			<div class="header"><span @click="$router.back()"></span>选择</div>
			<p v-show="search_box"><span @click="click_input">搜索一度好友</span></p>
		</div>		
		<div class="list" style="margin-top:1.76rem;" v-show='show_list'>
			<template v-for='(item,index) in friend_list'>
				<p>{{index}}</p>				 
				<ul class="ul_list">
					<li v-for="user in item">
						<img v-if='user.image_url!=null' :src="user.image_url" alt="">
						<span v-else='user.image_url==null;'>{{user.friend_name.substring(0,1)}}</span>
						{{user.friend_name}}						
					</li>					
				</ul>
			</template>		
		</div>
		<div class="nav_right" v-show='show_list'>
			<a v-for='(item,index) in friend_list'>{{index}}</a>	
		</div>
		<div class='black' v-show="!show"></div>
		<div class="title_search" v-show="show_input">
			<div><span></span><input type="text" placeholder="搜索联系人" v-model='value' @input='input_function' @blur="focusState = false" v-focus="focusState"><i class="item_close" v-if='value!=""' @click="clear"></i></div><label @click="cancel">取消</label>
		</div>
		<div class="search_list" v-if='search' style="margin-top:0.88rem">
			<ul class="ul_list" v-if='search_list!=""'>
				<li v-for='(item,index) in search_list' @click="$router.push({path:'/transfer_input'})"><img v-if='item.image_url!=null' :src="item.image_url" alt=""><span v-else='item.image_url==null'>{{item.friend_name.substring(0,1)}}</span>{{item.friend_name}}</li>
			</ul>
			<p v-else='search_list==""' style="margin-top:50%;">无结果</p>
		</div>
	</div>
</template>
<script>
import crypto from 'crypto'
export default{
	data(){
		return{
			show:true,
			user_id:'',
			text:'',
			friend:'',
			friend_list:[],	
			friend_data:[],	
			search_list:[],
			value:'',
			search:false,
			show_list:true,
			show_input:false,
			search_box:true,
			focusState:false,
		}
	},
	directives: {
		focus: {
			update: function (el, {value}) {
				if (value) {
					el.focus()
				}
			}
		}
	},
	methods:{
		clear(){
			this.value='';
			this.search_list.splice(0,this.search_list.length);
			this.show_list=true;
			this.search=false;
			this.show=false;
		},
		click_input(){
			this.value='';
			this.show=false;
			this.show_input=true;
			this.search_box=false;
			this.focusState = true;
		},
		cancel(){
			this.show=true;
			this.show_input=false;
			this.search_box=true;
			this.search_list.splice(0,this.search_list.length);
			this.show_list=true;
			this.search=false;
		},
		input_function(){					
			if (this.value!='') {
				this.show_list=false;				
				this.search=true;
				this.show=true;
				this.search_list.splice(0,this.search_list.length);
				for (var i = this.friend_data.length - 1; i >= 0; i--) {
					this.search_list.push(this.friend_data[i]);
				}			
				for (var i = this.search_list.length - 1; i >= 0; i--) {
					if(this.search_list[i]['friend_name'].indexOf(this.value)==-1){					
						this.search_list.splice(i,1);
					}
				}
			}else{
				this.search_list.splice(0,this.search_list.length);
				this.show_list=true;
				this.search=false;
				this.show=false;
			}					
		},
		data_list(res){
			var list=res['data']['data'];
			var data = new Object();			
			for (var i = 0; i < list.length; i++) {
				var initial = list[i].Initial;
				if(initial == '[' || initial == '|') {
					initial = '#'
				}		
				if(data[initial]){
					data[initial].push(list[i])
				}else{
					data[initial] = [list[i]]
				}
			}
			var object = new Object()
			var keys = Object.keys(data).sort();
			for (var string of keys) {
				object[string] = data[string]
			}
			this.friend_list = object;
			console.log(this.friend_list)
		}
	},
	mounted(){		
		this.user_id=this.$route.query.user_id;
		this.text=this.$route.query.text;
		this.friend=this.$route.query.friend;
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
		var app_key = md5.digest('hex');
		var url1=this.HOST+'Friend/getMyFriend/key/'+app_key;
		var url2=this.HOST+'Friend/getAllSecondFriends/key/'+app_key;
		var user_id='user_id='+this.user_id;
		if (this.friend=='一度') {
			this.$axios.post(url1,user_id).then((res)=>{		
				console.log(res['data']['data']);
				this.friend_data=res['data']['data'];			
				this.data_list(res);				
			})
		}else if(this.friend=='二度'){
			this.$axios.post(url2,user_id).then((res)=>{					
				this.friend_data=res['data']['data'];			
				this.data_list(res);				
			})
		}	
	}
}
</script>
<style>
.yidu_friend>.page_title>p{
	background: #fff;
	height: 0.88rem;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #b3b3b3;
	text-align: center;
	float: left;
	width: 100%;
	line-height: 0.88rem;
}
.yidu_friend p>span{
	display: block;
	width: 6.86rem;
	height: 0.56rem;
	border-radius: 0.12rem;
	margin: 0.16rem 0.32rem;
	line-height: 0.56rem;
	background: url(../img/yingyong_search.png)2.2rem center no-repeat;
	background-size: 0.3rem;
	background-color: #eeeeee;
}
.yidu_friend>.list  p{
	line-height: 0.6rem;
	height: 0.6rem;
	font-size: 0.28rem;
	color: #7a797a;
	text-align: left;
	margin-left: 0.32rem;
	float: left;
}
.yidu_friend>.list ul,.search_list>ul{
	float: left;
	margin-top: 0;
	background: #fff;
}
.yidu_friend>.list ul>li,.search_list>ul>li{
	width: 6.18REM;
	height: 1rem;
	line-height: 1rem;
	margin-left: 1.32rem;
	font-family: PingFang-SC-Regular;
	font-size: 0.34rem;
	color: #333333;
	position: relative;
	float: left;	
}
.yidu_friend>.list ul>li>span,.search_list>ul>li>span{
	display: block;
	width: 0.7rem;
	height: 0.7rem;
	background-size: 0.7rem;
	border-radius: 50%;
	margin-right: 0.3rem;
	float: left;
	margin-top: 0.15rem;
	margin-left: -1rem;
	background: #ccc;
	text-align: center;
	line-height: 0.7rem;
	color: #FFF;
}
.yidu_friend>.list ul>li>img,.search_list>ul>li>img{
	display: block;
	width: 0.7rem;
	height: 0.7rem;
	border-radius: 50%;
	margin-right: 0.3rem;
	float: left;
	margin-top: 0.15rem;
	margin-left: -1rem;
	line-height: 0.7rem;
	color: #FFF;
}
.yidu_friend>.title_search{
	width: 100%;
	height: 0.88rem;
	position: fixed;
	top: 0;
	background: #fff;
	font-family: PingFangSC-Regular;
	font-size: 0.30rem;
	color: #333333;
	text-align: left;
	z-index: 111;
}
.yidu_friend>.title_search>div {
	float: left;
	width: 6.03rem;
	height: 0.56rem;
	border-radius: 0.12rem;
	margin: 0.16rem 0.2rem 0.16rem 0.32rem;
	background: url(../img/yingyong_search.png)0.2rem center no-repeat;
	background-size: 0.3rem;
	background-color: #eeeeee;
	line-height: 0.88rem;
}
.yidu_friend>.title_search>div>input {
	width: 4.8rem;
	height: inherit;
	background: #eeeeee;
	border: 0;
	margin-left: 0.6rem;
	display: inline-block;
	float: left;
}
.yidu_friend>.title_search>label{
	line-height: 0.88rem;
}
</style>