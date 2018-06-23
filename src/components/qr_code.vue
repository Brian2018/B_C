<template>
	<div class="qr_code page">
		<div class="header"><span @click="$router.back()"></span>我的二维码</div>	
		<div class="qr_card">
			<img class="pic" src="./img/logo_1@3x.png" alt="">
			<span>名字</span>
			<img class="box_title" src="./img/Frame_icon.png" alt="">
			<img class="qr_pic" src="./img/QR code_icon.png" alt="">
			<p>用六度扫描二维码图案，加我好友</p>
		</div>
		<p class="preservation">保存二维码到手机</p>
		<div class="black"></div>
	</div>
</template>
<style>
	.qr_code>.header{
		z-index: 11;
	}
	.qr_code>.qr_card{
		z-index: 11;
		width: 5.5rem;
		height: 7.78rem;
		background: #fff;
		position: fixed;
		left: 50%;
		margin-left: -2.75rem;
		top: 50%;
		margin-top: -3.89rem;
	}
	.qr_code>.qr_card>span{
		font-size:0.32rem;
		color:#333333;
		text-align: center;
		display: block;
		margin:0.25rem auto;
	}
	.qr_code>.qr_card>p{
		font-size:0.24rem;
		color:#999999;
	}
	.qr_code>.qr_card>.pic{
		width: 0.9rem;
		height: 0.9rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.6rem;
	}
	.qr_code>.qr_card>.box_title{
		width: 3.81rem;
		display: block;
		margin: 0 auto;
	}
	.qr_code>.qr_card>.qr_pic{
		width: 3.6rem;
		height: 3.6rem;
		margin:0.3rem 0;
	}
	.qr_code>p{
		position: absolute;
		bottom: 2rem;
		text-align: center;
		width: 100%;
		font-size:0.24rem;
		color:#ffffff;
		letter-spacing:0.95px;
		z-index: 111;
	}
</style>
