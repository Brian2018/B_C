<template>
	<div class="edit_password page">
		<div class="header"><span @click="$router.back()"></span>修改密码</div>
		<ul class="ul_list">
			<li v-for="(item,index) in input_data"><input :type="item.inputType" :placeholder="item.placeholder" v-model='item.value'><img :src="item.src" alt="" @click='see(index)'></li>			
		</ul>
		<span @click="$router.push({path:'/forget_pas'})">忘记密码？</span>
		<div class="button">确认修改</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			'input_data':[
				{
					'inputType':'password',
					'placeholder':'请输入原密码',
					'src':'./src/components/img/Password_close@3x.png',
					'value':'val1'
				},
				{
					'inputType':'password',
					'placeholder':'请输入新密码(6-20位字母、数字的结合)',
					'src':'./src/components/img/Password_close@3x.png',
					'value':'val2'
				},
				{
					'inputType':'password',
					'placeholder':'请再次输入新密码',
					'src':'./src/components/img/Password_close@3x.png',
					'value':'val3'
				},
			]

		}			
	},		
	methods:{
		see(index){    
			if(this.input_data[index].inputType==="password") {
				this.input_data[index].inputType="text";
				this.input_data[index].src='./src/components/img/Password_open@3x.png'
			}else if(this.input_data[index].inputType==="text"){
				this.input_data[index].inputType="password";
				this.input_data[index].src='./src/components/img/Password_close@3x.png'
			}
		},
	}
}
</script>
<style>
	.edit_password{
		background-color: #f7fafa;
	}
	.edit_password>ul>li{
		height: 0.9rem;
		background: #fff;
		line-height: 0.9rem;		    
	}
	.edit_password>ul>li>input{
		width: calc(100% - 0.8rem);
		height: inherit;
		border:0;
		font-size: 0.28rem;
	}
	.edit_password>ul>li>img{
	    float: right;
	    width: 0.43rem;
	    height: 0.43rem;
	    margin-right: 0.32rem;
	    margin-top: 0.25rem;
	}
	.edit_password>span{
		float: right;
	    font-size: 0.24rem;
	    color: #33b9f4;
	    margin-top: 0.30rem;
	}
	.edit_password>.button{
		float: left;
		margin-top: 0.3rem;
	}
</style>