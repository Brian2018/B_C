<template>
	<div class="buy_content">
		<div class="title">礼品券购买<span>（账户可提现余额为¥120.35）</span></div>
		<div class="option" v-for="(item,index) in coupon" :class="[item.class, {'active': item.is_check}]" @click="addClassFun(index)">
			<p>{{item.amount}}</p>
			<span>{{item.price}}</span>			
		</div>
		<input type="text" placeholder="输入礼品券金额">
		<p>购买：礼品券<span>¥100</span></p>
		<p>需支付：可提现余额<span>¥20</span></p>
		<div class="div_button"><button class="button">确认购买</button></div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				'coupon':[
					{
						'amount':'¥100礼+10优',
						'price':'¥100',
						'class':'first',
						'is_check':true
					},
					{
						'amount':'¥200礼+20优',
						'price':'¥200',
						'class':'second',
						'is_check':false
					},
					{
						'amount':'¥300礼+30优',
						'price':'¥300',
						'class':'third',
						'is_check':false
					},
				]
			}
		},
		methods:{
			addClassFun(index){      
		      for (var i = 0; i < this.coupon.length; i++) {
		        this.coupon[i].is_check = false;        
		      }		      
		      this.coupon[index].is_check = true;
		    },
		}
	}
</script>
