<template>
	<div class="erdu_page page">
		<div class="page_title">
			<div class="header"><span @click="$router.back()"></span>二度好友</div>
		</div>		
		<div class="list" v-if="erdu_list" style="margin-top:0.88rem">
			<!-- <p><span>A</span></p> -->			
			<template v-for='(item,index) in erdu_list'>
				<span><label for="">{{index}}</label></span> 
				<ul class="ul_list">
					<li v-for="user in item">
						<span><img :src="user.image_url" alt=""></span>
						<div>
							<label>{{user.second_friend_name}}</label>
							<span>共同好友：{{user.common_friend_name}}</span>
						</div>
						<button>添加</button>
					</li>					
				</ul>
			</template>
		</div>
		<div class="nav_right">
			<a v-for='(item,index) in erdu_list'>{{index}}</a>		
		</div>
	</div>
</template>
<script>
import crypto from 'crypto'
export default{
	data(){
		return{
			user_id:'',
			erdu_list: '',
		}
	},
	mounted(){		
		this.erdu_list = new Object()
		this.user_id=this.$route.query.user_id;
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
		var app_key = md5.digest('hex');			
		var url=this.HOST+'Friend/getAllSecondFriends/key/'+app_key;
		var user_id='user_id='+this.user_id;
		this.$axios.post(url,user_id).then((res)=>{			
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
			this.erdu_list = object;
		})
	}
}
</script>
<style>
.erdu_page>.list>p{
	height: 0.4rem;
	font-size:0.24rem;
	color:#7a797a;
}
.erdu_page>.list>p>span{
	float: left;
	margin-left: 0.32rem;
}
.erdu_page>.list>.ul_list{
	font-size:0.28rem;
	color:#333333;
	margin:0;
	float: left;
}
.erdu_page>.list>span{
	display: block;
	width: 100%;
	height: 0.4rem;
	background:#f5f7f7;
	float: left;
	text-align: left;
	font-size: 0.24rem;
}
.erdu_page>.list>span>label{
	margin-left: 0.32rem;
}
.erdu_page>.list>.ul_list>li{
	height: 1.16rem;
}
.erdu_page>.list>.ul_list>li>span{
	display: block;
	width: 0.7rem;
	height: 0.7rem;
	border-radius: 50%;
	margin-right: 0.3rem;
	float: left;
	margin-top: 0.25rem;
	background: url(../img/head.png) center no-repeat;
	background-size: 0.7rem;
}
.erdu_page>.list>.ul_list>li>span>img{
	border-radius: 50%;
}
.erdu_page>.list>.ul_list>li>div{
	float: left;
}
.erdu_page>.list>.ul_list>li>button{
	display: block;
	float: right;
	border:1px solid #cccccc;
	border-radius:0.04rem;
	width:0.98rem;
	height:0.52rem;
	background: #fff;
	margin-right: 0.5rem;
	margin-top: 0.35rem;
	font-size:0.24rem;
	color:#666060;
}
.erdu_page>.list>.ul_list>li label{
	display: block;
	line-height: 0.7rem;
}
.erdu_page>.list>.ul_list>li span{
	display: block;
	line-height: 0.2rem;
	font-size:0.24rem;
	color:#949494;
}
</style>