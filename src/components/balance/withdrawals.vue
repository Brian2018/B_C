<template>
	<div class="withdrawals_page">
		<div class="header"><span @click="$router.back()">余额</span>提现</div>
		<p class="p_border" @click="$router.push({path:'/addBank',name:addBank,query:{user_id:user_id}})"><span>中国工商银行</span><label>(尾号5555)</label><i class="item_link"></i></p>
		<p class="tishi"><span>暂不支持提现金额+手续费<10元的提现。</span></p>
		<div class="cash_withdrawal p_border" style="margin:0">
			<label>提现金额（手续费为1.0%）</label>
			<p><span>¥</span><input type="text"><i class="item_delete"></i></p>
			<div><span>输入金额已超过可提现余额</span><label>全部提现</label></div>
		</div>
		<button class="button">申请提现</button>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				user_id:''
			}
		},
		mounted(){
			this.user_id=this.$route.query.user_id;
		}
	}
</script>
<style>
	.withdrawals_page{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}
	.withdrawals_page>p{
		height: 0.9rem;
		color: #333;
    	font-size: 0.28rem;
    	line-height: 0.9rem;
	}
	.withdrawals_page>p.tishi{
		font-family: PingFangSC-Regular;
	    height: 0.66rem;
	    line-height: 0.66rem;
	    font-size: 0.24rem;
	    color: #7A797A;
	}
	.withdrawals_page>p>span{
		margin-left: 0.32rem;
		float: left;
	}
	.withdrawals_page>p>label{
		float: left;
	}
	.cash_withdrawal{
		height: 3.05rem;
		background: #fff;
	}
	.cash_withdrawal>label{
		display: block;
		margin-left: 0.32rem;
		font-size: 0.32rem;
	    color: #666;
	    text-align: left;
	    line-height: 0.9rem;
	}
	.cash_withdrawal>p{
		width: 7.18rem;
		height: 1.2rem;
		float: left;
		margin-left: 0.32rem;
		border-bottom: 1px solid #e0e0e0;
	}
	.cash_withdrawal>p>span{
		float: left;
		font-size: 0.48rem;
		margin-left: 0.32rem;
		margin-left: 0rem;
	}
	.cash_withdrawal>p>input{
		width: calc(100% - 2.55rem);
	    float: left;
	    color: #000;
	    font-size: 1rem;
	    border: 0;
	    outline: none;
	    line-height: 0.35rem;
	    padding: 0;
	    margin: 0;
	    margin-left: 0.20rem;
	    height: 1rem;
	}
	.cash_withdrawal>div{
		font-size: 0.24rem;
		color: red;
		height: 0.9rem;
		line-height: 0.9rem;
	}
	.cash_withdrawal>div>span{
		float: left;
		margin-left: 0.32rem;
	}
	.cash_withdrawal>div>label{
		float: right;
		margin-right: 0.32rem;
		color: #00BCD4 !important
	}
</style>