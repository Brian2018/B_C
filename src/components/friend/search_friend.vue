<template> 
	<div class="search_page page">
		<div class="search_head"><span @click="$router.back()"></span><div><input type="text" v-model="val"><i class="item_close" v-if="this.val!=''" @click="clear"></i></div></div>
		<p class="p_border" v-if="this.val!=''"><img src="../img/add_search_icon.png" alt="">搜索：<span>{{val}}</span></p>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				val:'',
			}
		},
		methods:{
			clear(){
				this.val='';
			}
		}
	}
</script>
<style>
	.search_page>.search_head{
		height: 0.88rem;
		background:#fff;
		width: 100%;
	}
	.search_page>.search_head>span{
		display: block;
		width: 0.45rem;
		height: inherit;
		float: left;
		background: url(../img/back.png) center no-repeat;
		background-size: 0.45rem 0.4rem;
		margin-left: 0.32rem;
	}
	.search_page>.search_head input{
		width: 5.2rem;
	    height: inherit;
	    background: #eeeeee;
	    border: 0;
	    margin-left: 0.6rem;
	    display: inline-block;
	    float: left;
	    font-size: 0.28rem;
	}
	.search_page>.search_head>div{
		float: right;
	    width: 6.33rem;
	    height: 0.56rem;
	    border-radius: 0.12rem;
	    margin: 0.16rem 0;
	    margin-right: 0.32rem;
	    background: url(../img/yingyong_search.png)0.2rem center no-repeat;
	    background-size: 0.3rem;
	    background-color: #eeeeee;
	    line-height: 0.88rem;
	}
	.search_page>p{
		height: 1.16rem;
		background: #fff;
		width: 100%;
		font-size:0.28rem;
		color:#333333;
		letter-spacing:1.11px;
		text-align: left;
		line-height: 1.16rem;
		margin:0;
	}
	.search_page>p>img{
		margin-left: 0.32rem;
		width: 0.88rem;
		float: left;
		margin-top: 0.14rem;
		margin-right: 0.2rem;
	}
	.search_page>p>span{
		font-size:0.28rem;
		color:#00bcd4;
	}
</style>