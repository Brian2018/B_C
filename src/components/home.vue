<template>
	<div class="home page">		
		<div class="app_download">
			<div class="download_close"></div>
			<div class="liudu_img"></div>
			<div class="liudu_text">
				<div class="liudu_text1">六度通行证</div>
				<div class="liudu_text2">一证在手，畅通无忧！</div>
			</div>
			<div class="open_app e-download">打开APP</div>
		</div>
		<header class="home-search load_img">
			<div class="search e-go-product" @click="$router.push({path:'/add_app'})"></div>
			<div class="edit" @click='edit'></div>
		</header>	
		<mt-swipe :auto="4000">
			<mt-swipe-item><img src="./img/header.png" alt=""></mt-swipe-item>
			<mt-swipe-item><img src="./img/header.png" alt=""></mt-swipe-item>
			<mt-swipe-item><img src="./img/header.png" alt=""></mt-swipe-item>
		</mt-swipe>	
		<div class="main_footer border-before">
			<div class="homePage e-go-home homePage-active">首页</div>
			<div class="application e-go-call" @click="go_friend">六度好友</div>
			<div class="personCenter" @click="go_person">个人中心</div>
		</div>
		<div class="app_show">
			<ul>
				<li v-for="(item,index) in app_list" class="e-go-system"  data-six_product="shengzhiji" data-product_id="1342" @click='choose_app(index)'>
					<img class="APP_img" :src="item.app_logo_url">
					<p>{{item.app_name}}</p>
					<div class="choose_white" v-if="edit_show" :class="{choose_blue:item.clicked}"></div>
				</li>               
				<li class="e-go-product" @click="$router.push({path:'/add_app',name:'add_app',query:{user_id:user_id}})" :class="{opacity:opacity}">
					<img src="./img/add_app.png" class="openApp">
					<p>开通应用</p>
				</li>
			</ul>					
		</div>
		<footer class="edit_footer" v-if="edit_show">
			<div class="delete_app e-del-myProducts">
				<div class="delete_app_img" :class="{opacity_del:choose_item}"></div>
				<div class="edit_text1" :class="{opacity_del:choose_item}">删除应用</div>
			</div>
			<div class="close_edit" @click="edit">
				<div class="close_edit_img"></div>
				<div class="edit_text2">退出编辑</div>
			</div>
		</footer>
	</div>
</template>
<script>
import crypto from 'crypto';
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';
export default{
	data(){
		return{
			edit_show:false,
			opacity:false,
			choose_item:true,
			token:'',
			user_id:'',
			six_id:'',
			app_list:[],
			data:[],
		}
	},
	computed:mapState({
		msg:state => state.msg
	}),
	computed:mapGetters({
		msg:'GET_MSG',
	}),
	methods:{
		edit(){
			this.edit_show=this.edit_show==true?false:true;
			this.opacity=this.opacity==true?false:true;	
			return false;			
		},
		choose_app(index){
			this.app_list[index]['clicked']=this.app_list[index]['clicked']==true?false:true;
			this.choose_item=true;
			for (var i = this.app_list.length - 1; i >= 0; i--) {
				if (this.app_list[i]['clicked']==true) {
					this.choose_item=false;					
				}
			}					
		},
		go_friend(){	
			this.data[0]=this.user_id;
			this.data[1]=this.six_id;	
			this.$store.commit('SET_MSG',this.data);
			this.$router.push({path:'/friend'})
		},
		go_person(){
			this.data[0]=this.user_id;
			this.data[1]=this.six_id;
			this.$store.commit('SET_MSG',this.data);
			this.$router.push('/personal_center')
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
        this.six_id = JSON.parse(sessionStorage.obj);
        var md5 = crypto.createHash("md5");
        md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.six_id);
        var app_key = md5.digest('hex');
        var url='http://pass.71baomu.com/interface/user/getUserInfo/key/' + app_key;
        var six_id='six_id='+this.six_id;
//获取新的user_id
        this.$axios.post(url,six_id).then((res)=>{       	
        	this.user_id=res['data']['data']['user_id'];
        	this.six_id=res['data']['data']['new_six_id'];
//获取开通应用
			var md5 = crypto.createHash("md5");
	        md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
	        var app_key = md5.digest('hex');
			var url_open='http://pass.71baomu.com/interface/product/getMyProductsInfo/key/' + app_key;
			var user_id='user_id='+this.user_id;
			this.$axios.post(url_open,user_id).then((res)=>{
				this.app_list=res['data']['data'];
				for (var i = this.app_list.length - 1; i >= 0; i--) {
					this.app_list[i]['app_logo_url']='http://pass.71baomu.com'+this.app_list[i]['app_logo_url']
				}
			})      	
        })
    }
}
</script>
<style>
.home{
	background: #fff;
}
.home>.app_download{
	width: 100%;
	height: 1rem;
	background: #333;
	overflow: hidden;
}
.home>.app_download>.download_close{
	float: left;
	width: 0.38rem;
	height: 0.38rem;
	background: url(./img/close_icon_1@3x.png) center no-repeat;
	margin-top: 0.31rem;
	margin-left: 0.24rem;
	background-size: 0.38rem;
}
.home>.app_download>.liudu_img{
	float: left;
	width: 0.76rem;
	height: 0.76rem;
	background: url(./img/liudu_icon.png) center no-repeat;
	margin-top: 0.12rem;
	margin-left: 0.15rem;
	background-size: 0.7rem;
}
.home>.app_download>.liudu_text{
	float: left;
	width: 3rem;
	height: 0.62rem;
	margin-top: 0.19rem;
	margin-left: 0.2rem;
	text-align: left;
}
.home>.app_download>.liudu_text>.liudu_text1{
	font-family: PingFang-SC-Light;
	font-size: 0.28rem;
	color: #ffffff;
	letter-spacing: 0.0111rem;
	line-height: 0.28rem;
	margin-bottom: 0.1rem;
}
.home>.app_download>.liudu_text>.liudu_text2{
	font-family: PingFang-SC-Light;
	font-size: 0.24rem;
	color: #ffffff;
	letter-spacing: 0.0095rem;
	line-height: 0.24rem;
}
.home>.app_download>.open_app{
	float: right;
	width: 1.44rem;
	height: 0.56rem;
	background: #14c4e2;
	border-radius: 4px;
	margin-right: 0.32rem;
	margin-top: 0.22rem;
	font-family: PingFang-SC-Regular;
	font-size: 0.24rem;
	color: #ffffff;
	letter-spacing: 0.0095rem;
	line-height: 0.56rem;
	text-align: center;
}
.home>.home-search{		
	background-image: url(./img/liud.png);
	background-position: center;
	background-repeat: no-repeat;
	background-size: 0.80rem;
	width: 100%;
	height: 0.88rem;
}
.home>.home-search>.search{
	float: left;
	background: url(./img/search_icon1.png) center no-repeat;
	width: 0.64rem;
	height: 0.64rem;
	margin-top: 0.12rem;
	margin-left: 0.18rem;
	background-size: 0.64rem;
}
.home>.home-search>.edit{
	float: right;
	background: url(./img/edit_icon.png) center no-repeat;
	width: 0.64rem;
	height: 0.64rem;
	margin-top: 0.12rem;
	margin-right: 0.18rem;
	background-size: 0.64rem;
}
.mint-swipe{
	height: 3.05rem;
}
.mint-swipe>.mint-swipe-indicators{
	bottom: -15px;
}
.home li{
	float: left;
	flex-wrap: nowrap;
	-webkit-flex-wrap: nowrap;
	text-align: center;
	align-items: center;
	-webkit-align-items: center;
	width: 33.33%;
	height: 2.5rem;
	box-shadow: inset -1px 0px 0px 0px #e6e6e6, inset 0px -1px 0px 0px #e8e8e8;
	position: relative;
}
.home li>img{
	width: 1.4rem;
	height: 1.4rem;
	border-radius: 0.15rem;
	margin-top: 0.4rem;
}
.home li>img.openApp{
	width: 0.44rem!important;
	height: 0.44rem!important;
	margin-top: 0.88rem!important;
}
.home li>p{
	font-size: 0.24rem;
	margin-top: 0.08rem;
	padding: 0;
	color: #4d4d4d;
}
.edit_footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 1.92rem;
	background: #4dd8f0;
}
.delete_app, .close_edit {
	float: left;
	width: 50%;
	height: 1.92rem;
}
.delete_app_img {
	background: url(./img/delete_app_yes.png) center no-repeat;
	width: 0.44rem;
	height: 0.44rem;
	background-size: 0.44rem;
	margin-top: 0.45rem;
	margin-left: 1.66rem;
}
.edit_text1 {
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #ffffff;
	letter-spacing: 0.011rem;
	text-align: center;
	margin-top: 0.38rem;
}
.opacity_del{
	opacity: 0.4;
}
.close_edit_img {
	background: url(./img/close_edit.png) center no-repeat;
	width: 0.48rem;
	height: 0.44rem;
	background-size: 0.48rem;
	margin-top: 0.45rem;
	margin-left: 1.64rem;
}
.edit_text2 {
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #ffffff;
	letter-spacing: 0.011rem;
	text-align: center;
	margin-top: 0.38rem;
}
.choose_white {
	background: url(./img/choose_white.png) center no-repeat;
	width: 0.27rem;
	height: 0.27rem;
	position: absolute;
	right: 0.19rem;
	top: 0.12rem;
	background-size: 0.3rem;
}
.app_show .opacity{
	opacity: 0.33;
}
.choose_blue {
	background: url(./img/choose_blue.png) center no-repeat;
	background-size: 0.3rem;
}
</style>