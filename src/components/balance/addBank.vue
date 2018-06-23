<template>
	<div class="addBank">
		<div class="header"><span @click="$router.back()">余额</span>银行卡</div>
		<p><span>到账银行卡</span></p>
		<ul class="ul_list">
			<li v-for="(item,index) in bank_list"><span>{{item.bank}}</span><label>尾号（{{item.account}}）</label></li>
			<li><span>添加新的银行卡</span><i class="item_link"></i></li>
		</ul>
	</div>
</template>
<script>
import crypto from 'crypto'
export default{
	data(){
		return{
			user_id:'',
			bank_list:'',
		}
	},
	method:{

	},
	mounted(){
		this.user_id=this.$route.query.user_id;
		var md5 = crypto.createHash("md5");
		md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.user_id);
		var app_key = md5.digest('hex');
		var url = 'http://pass.71baomu.com/interface/account/getBankCardInfo/key/'+ app_key;
		var user_id='user_id='+this.user_id;
		this.$axios.post(url,user_id).then((res) => {
			console.log(res['data']['data']);			
			this.bank_list=res['data']['data'];	
			for (var i = this.bank_list.length - 1; i >= 0; i--) {
				this.bank_list[i]['account']=this.bank_list[i]['account'].substring(15);
			}
		})
	}
}
</script>
<style>
.addBank{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
}
.addBank>p{
	font-size: 0.24rem;
	height: 0.66rem;
	line-height: 0.66rem;
}
.addBank>p>span{
	float: left;
	margin-left: 0.32rem;
}
.addBank>ul{
	margin-top: 0;
	font-size: 0.28rem;
}
.addBank li{
	height: 0.96rem;
	line-height: 0.96rem;
}
.addBank li>label{
	font-size: 0.24rem;
	color: #B3b3b3;
	margin-left: 0.2rem;
}
</style>