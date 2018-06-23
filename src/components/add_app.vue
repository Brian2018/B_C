<template>
	<div class="add_app page">
		<div class="header-wrap">
			<div class="header-left-arrow e-back" @click="$router.back()" v-show="show"></div>
			<div class="header-search-wrap">
				<span class="header-magnify-glass"></span>
				<input class="header-search-input" type="text" placeholder="搜索添加内容" @click="focus" ref="search">
				<span class="delete-search-text"></span>
			</div>
			<span class="search-cancel" v-show="!show" @click="cancel">取消</span>      
		</div>
		<div class="content-wrap">
			<h1>
				<span v-for="(item,index) in title" class="border-after2" :class="[item.class, {'active': item.is_check}]" @click="addClassFun(index)">{{item.name}}</span>				
			</h1>
			<!--六度精选app-->
			<div class="6d-app-wrap" v-if="!category">
				<div class="app-single border-after2" v-if='selected'>
					<img src="http://pass.71baomu.com/Public/images/App/2017-04-13/58eed74bc2cbe.png" style="width: 1.4rem;height: 1.4rem;position: absolute;top: 0.15rem;left: 0.3rem;">
					<h1 class="single-app-title">顾问</h1>
					<span class="single-app-intro">壹身轻顾问</span>
					<!--   -->
					<span class="single-app-status add e-open" data-product_id="1344"></span>
					<!-- -->
				</div>                
				<div class="no-app" v-else='selected'><span>暂无精选应用</span></div>
			</div>
			<!--所有类别app-->
			<div class="all-app-wrap" v-else="category">				
				<div class="single-category">
					<span class="single-category-name">学习</span>
				</div>
				<div v-for="(item,index) in app_list_study" class="app-single border-after2">
					<img :src="item.app_logo_url" style="width: 1.4rem;height: 1.4rem;position: absolute;top: 0.15rem;left: 0.3rem;">
					<h1 class="single-app-title">{{item.app_name}}</h1>
					<span class="single-app-intro">{{item.remark}}</span>
					<span class="single-app-status e-go-system" :class="{'open':item.open}" data-six_product="eiisys"></span>
				</div>
				<div class="single-category">
					<span class="single-category-name">生活</span>
				</div>
				<div v-for="(item,index) in app_list_life" class="app-single border-after2">
					<img :src="item.app_logo_url" style="width: 1.4rem;height: 1.4rem;position: absolute;top: 0.15rem;left: 0.3rem;">
					<h1 class="single-app-title">{{item.app_name}}</h1>
					<span class="single-app-intro">{{item.remark}}</span>
					<span class="single-app-status e-go-system" :class="{'open':item.open}" data-six_product="eiisys"></span>
				</div>
				<div class="single-category">
					<span class="single-category-name">工作</span>
				</div>
				<div v-for="(item,index) in app_list_job" class="app-single border-after2">
					<img :src="item.app_logo_url" style="width: 1.4rem;height: 1.4rem;position: absolute;top: 0.15rem;left: 0.3rem;">
					<h1 class="single-app-title">{{item.app_name}}</h1>
					<span class="single-app-intro">{{item.remark}}</span>
					<span class="single-app-status e-go-system" :class="{'open':item.open}" data-six_product="eiisys"></span>
				</div>	                    
			</div>
		</div>
	</div>
</template>
<script>
import crypto from 'crypto'
export default{
	data(){
		return{
			'title':[
			{
				'name':'所有类别',					
				'is_check':true
			},
			{
				'name':'六度精选',
				'is_check':false
			}
			],
			show:true,
			category:true,
			user_id:'',
			study_id:'',
			job_id:'',
			life_id:'',
			app_list_study:[],
			app_list_job:[],
			app_list_life:[],
			selected:false,
		}
	},
	methods:{
		focus() {
			this.show=this.show==true?false:true;
			this.$refs.search.focus();
		},
		cancel(){
			this.show=this.show==true?false:true;
		},
		addClassFun(index){ 
			for (var i = 0; i < this.title.length; i++) {
				this.title[i].is_check = false;        
			}
			this.category = this.title[index].name === '所有类别' ? true:false;
			this.title[index].is_check = true;
		},
	},
	mounted(){		
		this.user_id = this.$route.query.user_id; 
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]');
		var app_key = md5.digest('hex');
		var url=this.HOST+'product/getAllProducts/key/' + app_key;		
		var md6 = crypto.createHash("md5");
		md6.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
		var app_key1 = md6.digest('hex');	
		var url_open=this.HOST+'product/getMyProductsInfo/key/' + app_key1;
//获取全部应用
this.$axios.post(url).then((res)=>{
	this.app_list=res['data']['data'];
	for (var i = this.app_list.length - 1; i >= 0; i--) {
		this.app_list[i]['app_logo_url']="http://pass.71baomu.com"+this.app_list[i]['app_logo_url'];
		if (this.app_list[i]['category_name']=='学习') {
			this.study_id=this.app_list[i]['category_id'];					
		}else if(this.app_list[i]['category_name']=='工作') {
			this.job_id=this.app_list[i]['category_id'];				
		}else if(this.app_list[i]['category_name']=='生活') {
			this.life_id=this.app_list[i]['category_id'];
		}
	};
//获取分类	
var md5 = crypto.createHash("md5");
md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.study_id);
var app_key = md5.digest('hex');						
var url_class=this.HOST+'product/getProductsByCategory/key/' + app_key;
let study_id='category_id='+this.study_id;
let job_id='category_id='+this.job_id;
let life_id='category_id='+this.life_id;			
this.$axios.post(url_class,study_id).then((res)=>{
	this.app_list_study=res['data']['data'];
	console.log(this.app_list_study)	;
	for (var i = this.app_list_study.length - 1; i >= 0; i--) {
		this.app_list_study[i]['app_logo_url']="http://pass.71baomu.com"+this.app_list_study[i]['app_logo_url'];
	}
//获取已开通应用							
var user_id='user_id='+this.user_id;
this.$axios.post(url_open,user_id).then((res)=>{
	for (var i = res['data']['data'].length - 1; i >= 0; i--) {
		for (var j = this.app_list_study.length - 1; j >= 0; j--) {
			if (this.app_list_study[j]['product_id']==res['data']['data'][i]['product_id']) {
				this.app_list_study[j]['open']=1;
			}
		}						
	}						
});
});
var md7 = crypto.createHash("md5");
md7.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.job_id);
var app_key2 = md7.digest('hex');	
var url_class=this.HOST+'product/getProductsByCategory/key/' + app_key2;	
this.$axios.post(url_class,job_id).then((res)=>{
	this.app_list_job=res['data']['data'];
	for (var i = this.app_list_job.length - 1; i >= 0; i--) {
		this.app_list_job[i]['app_logo_url']="http://pass.71baomu.com"+this.app_list_job[i]['app_logo_url'];
	}
//获取已开通应用			
var user_id='user_id='+this.user_id;
this.$axios.post(url_open,user_id).then((res)=>{
	for (var i = res['data']['data'].length - 1; i >= 0; i--) {
		for (var j = this.app_list_job.length - 1; j >= 0; j--) {
			if (this.app_list_job[j]['product_id']==res['data']['data'][i]['product_id']) {
				this.app_list_job[j]['open']=1;
			}
		}						
	}
	console.log(this.app_list_job);						
});						
});
var md8 = crypto.createHash("md5");
md8.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.life_id);
var app_key3 = md8.digest('hex');	
var url_class=this.HOST+'product/getProductsByCategory/key/' + app_key3;
this.$axios.post(url_class,life_id).then((res)=>{
	this.app_list_life=res['data']['data'];
	for (var i = this.app_list_life.length - 1; i >= 0; i--) {
		this.app_list_life[i]['app_logo_url']="http://pass.71baomu.com"+this.app_list_life[i]['app_logo_url'];
	}
//获取已开通应用			
var user_id='user_id='+this.user_id;
this.$axios.post(url_open,user_id).then((res)=>{
	for (var i = res['data']['data'].length - 1; i >= 0; i--) {
		for (var j = this.app_list_life.length - 1; j >= 0; j--) {
			if (this.app_list_life[j]['product_id']==res['data']['data'][i]['product_id']) {
				this.app_list_life[j]['open']=1;
			}
		}						
	}										
});							
});	
});		

}
}
</script>
<style>
.add_app{
	background: #f7fafa;
}
.header-wrap {
	width: 100%;
	height: 0.88rem;
	background: #14c4e2;
}
.header-left-arrow {
	width: 0.66rem;
	height: 0.88rem;
	float: left;
	background: url(./img/yingyong_back.png) 0.33rem no-repeat;
	background-size: 0.20rem 0.33rem;
}
.header-search-wrap {
	float: left;
	margin-top: 0.14rem;
	margin-left: 0.32rem;
	background: #ffffff;
	border-radius: 1rem;
	width: 6.0rem;
	height: 0.6rem;
}
.header-magnify-glass {
	width: 0.36rem;
	height: inherit;
	float: left;
	margin-left: 0.2rem;
	background: url(./img/yingyong_search.png) center center no-repeat;
	background-size: 0.24rem 0.23rem;
}
.header-search-input {
	float: left;
	margin-left: 0.58rem;
	width: 4.0rem;
	height: 0.4rem;
	margin: 0.1rem 0.1rem;
	padding: 0;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #b3b3b3;
	letter-spacing: 0.02rem;
	text-align: left;
	border: none;
	outline: none;
}
.search-cancel {
	right: 0.3rem;
	top: 0.2rem;
	position: absolute;
	font-family: PingFangSC-Regular;
	font-size: 0.3rem;
	color: #ffffff;
	letter-spacing: 0.02rem;
	text-align: left;
}
.content-wrap {
	position: relative;
	width: 7.5rem;
}
.content-wrap h1 {
	height: 0.7rem;
}
.content-wrap h1 span {
	display: block;
	float: left;
	width: 50%;
	height: 0.7rem;
	background: #ffffff;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	line-height: 0.7rem;
	text-align: center;
	letter-spacing: 0.01rem;
	font-family: PingFangSC-Regular;
	color: #b3b3b3;
	position: relative;
}
.content-wrap h1 span.active {
	box-shadow: inset 0rem -0.04rem 0rem 0rem #4dd8f0;
	color: #14c4e2;
	position: relative;
	z-index: 1;
}
.single-category {
	width: 100%;
	background: #f7fafa;
	height: 0.6rem;
}
.single-category-name {
	margin-left: 0.32rem;
	font-size: 0.28rem;
	color: #999999;
	letter-spacing: 0.02rem;
	line-height: 0.6rem;
	display: inherit;
	text-align: left;
}
.app-single {
	width: 100%;
	height: 1.7rem;
	position: relative;
	background: #ffffff;
}
.content-wrap h1 {
	height: 0.7rem;
}
.single-app-title {
	position: absolute;
	top: 0.46rem;
	left: 2rem;
	opacity: 0.8;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #262626;
	letter-spacing: 0.02rem;
	text-align: left;
}
.single-app-status {
	background: url(./img/yingyong_add.png) center no-repeat;
	background-size: 1.1rem 0.48rem;
}
.single-app-status {
	position: absolute;
	top: 0.6rem;
	left: 6.05rem;
	border-radius: 0.06rem;
	width: 1.12rem;
	height: 0.50rem;
}
.single-app-intro{
	position: absolute;
	top: 0.91rem;
	left: 2rem;
	opacity: 0.8;
	font-family: PingFangSC-Regular;
	font-size: 0.24rem;
	color: #999999;
	letter-spacing: 0.01rem;
	text-align: left;
}
.app-single:after{
	display: block;
	content: "";
	position: absolute;
	height: 1px;
	background: #e0e0e0;
	width: inherit;
	bottom: 0;
	left: 0;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.single-app-status.open {
	background: url(./img/yingyong_open.png) center center no-repeat;
	background-size: 1.1rem 0.48rem;
}
.single-app-status.download {
	background: url(./img/yingyong_download.png) center center no-repeat;
	background-size: 1.1rem 0.48rem;
}
</style>