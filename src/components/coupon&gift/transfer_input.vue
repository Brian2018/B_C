<template>
	<div class="transfer_input page">
		<div class="header"><span @click="$router.back()"></span>转赠{{text}}</div>
		<div class="donation_box">
			<h3>转赠优惠券金额</h3>
			<div class="input"><span>¥</span><input type="text" id="money" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"><i style="display: inline;"></i></div>
			<p><label for="" style="color: red;">输入金额已超过可用优惠券金额</label><span>全部转赠</span></p>			
		</div>
		<div class="message_board">
			<div>留言：
				<textarea maxlength="30">这是赠送给你的优惠券，快去使用吧！</textarea><span><label>17</label>/30</span>
			</div>			
		</div>
		<button class="button">确认赠送</button>
	</div>
</template>
<script>
export default{
	data(){
		return{
			text:'优惠券',
		}
	}
}
</script>
<style>
.transfer_input>.donation_box{
	width: 100%;
	height: 2.85rem;
	background: #fff;
	margin-top: 0.2rem;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #666666;
	position: relative;
	float: left;
}
.transfer_input>.donation_box>h3{
	margin-left: 0.32rem;
	margin-top: 0.25rem;
	color: #666666;
	text-align: left;
	font-size: 0.3rem;
}
.transfer_input>.donation_box>.input{
	height: 1rem;
	margin: 0.32rem 0.32rem 0 0.32rem;
	position: relative;
}
.transfer_input>.donation_box>.input:after{
	content: '';
	height: 1px;
	width: inherit;
	background: #ccc;
	bottom: 0;
	left: 0;
	display: block;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.transfer_input>.donation_box>.input>span{
	font-family: PingFangSC-Regular;
	font-size: 0.48rem;
	color: #000000;
	display: block;
	float: left;
}
.transfer_input>.donation_box>.input>input{
	width: 6.2rem;
	height: 1rem;
	border: 0;
	font-size: 0.8rem;
	line-height: 0.8rem;
}
.transfer_input>.donation_box>p{
	line-height: 0.8rem;
	margin: 0 0.32rem;
}
.transfer_input>.donation_box>p>label{
	float: left;
}
.transfer_input>.donation_box>p>span{
	float: right;
	color: #00bcd4;
}
.transfer_input>button{
	float: left;
}
</style>