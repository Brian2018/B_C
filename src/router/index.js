import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import bind_taobao from '@/components/bind_taobao'
import personal_center from '@/components/personal_center'
import personal_msg from '@/components/personal_msg'
import vueFeedback from 'vue-feedback'
import home from '@/components/home'
import set from '@/components/set'
import balance from '@/components/balance/balance'
import recharge from '@/components/balance/recharge'
import withdrawals from '@/components/balance/withdrawals'
import addBank from '@/components/balance/addBank'
import buy_page from '@/components/balance/buy_page'
import coupon from '@/components/coupon&gift/coupon'
import gift from '@/components/coupon&gift/gift'
import bill from '@/components/bill/bill'
import bill_detail from '@/components/bill/bill_detail'
import coupon_gift_detail from '@/components/bill/coupon_gift_detail'
import ruleDescription from '@/components/coupon&gift/ruleDescription'
import use_coupon from '@/components/coupon&gift/use_coupon'
import coupon_donation from '@/components/coupon&gift/coupon_donation'
import transfer_friend from '@/components/coupon&gift/transfer_friend'
import choose_friend from '@/components/coupon&gift/choose_friend'
import transfer_input from '@/components/coupon&gift/transfer_input'
import record_page from '@/components/coupon&gift/record_page'
import detail_page from '@/components/coupon&gift/detail_page'
import friend from '@/components/friend/friend'
import search_friend from '@/components/friend/search_friend'
import add_friend from '@/components/friend/add_friend'
import erdu_page from '@/components/friend/erdu_page'
import new_friend from '@/components/friend/new_friend'
import friend_msg from '@/components/friend/friend_msg'
import friend_more from '@/components/friend/friend_more'
import set_group from '@/components/friend/set_group'
import qr_code from '@/components/qr_code'
import agreement from '@/components/agreement'
import forget_pas from '@/components/forget_pas'
import account_set from '@/components/account/account_set'
import edit_phone from '@/components/account/edit_phone'
import edit_mail from '@/components/account/edit_mail'
import edit_password from '@/components/account/edit_password'
import about from '@/components/about'
import add_app from '@/components/add_app'


Vue.use(Router)
Vue.use(vueFeedback)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,meta:{keepAlive:false,}
    },
    {	
    	path: '/register',
		name: 'register',
		component: register,meta:{keepAlive:false,}
    },
    {	
    	path: '/personal_center',
		name: 'personal_center',
		component: personal_center,meta:{keepAlive:false,}
    },
    {	
    	path: '/personal_msg',
		name: 'personal_msg',
		component: personal_msg,meta:{keepAlive:false,}
    },
    { 
      path: '/set',
    name: 'set',
    component: set,meta:{keepAlive:false,}
    },
    { 
      path: '/balance',
    name: 'balance',
    component: balance,meta:{keepAlive:false,}
    },
    { 
      path: '/buy_page', 
      name:'buy_page',   
    component: buy_page,meta:{keepAlive:false,}
    },
    { 
      path: '/coupon',  
      name:'coupon',  
    component: coupon,meta:{keepAlive:false,}
    },
    { 
      path: '/gift', 
      name:'gift',   
    component: gift,meta:{keepAlive:false,}
    },
    { 
      path: '/bind_taobao',
      name:'bind_taobao',    
    component: bind_taobao,meta:{keepAlive:false,}
    },
    { 
      path: '/recharge', 
      name:'recharge',   
    component: recharge,meta:{keepAlive:false,}
    },
    { 
      path: '/withdrawals',  
      name:'withdrawals',  
    component: withdrawals,meta:{keepAlive:false,}
    },
    { 
      path: '/addBank',   
      name:'addBank', 
    component: addBank,meta:{keepAlive:false,}
    },
     { 
      path: '/ruleDescription',
      name:'ruleDescription',    
    component: ruleDescription,meta:{keepAlive:false,}
    },
     { 
      path: '/bill',
      name:'bill',    
    component: bill,meta:{keepAlive:false,}
    },
     { 
      path: '/bill_detail',
      name:'bill_detail',    
    component: bill_detail,meta:{keepAlive:false,}
    },
     { 
      path: '/use_coupon', 
      name:'use_coupon',   
    component: use_coupon,meta:{keepAlive:false,}
    },
      { 
      path: '/coupon_donation',   
      name:'coupon_donation', 
    component: coupon_donation,meta:{keepAlive:false,}
    },
      { 
      path: '/transfer_friend', 
      name:'transfer_friend',   
    component: transfer_friend,meta:{keepAlive:false,}
    },
      { 
      path: '/choose_friend',  
      name:'choose_friend',  
    component: choose_friend,meta:{keepAlive:false,}
    },
      { 
      path: '/transfer_input',  
      name:'transfer_input',  
    component: transfer_input,meta:{keepAlive:false,}
    },
     { 
      path: '/record_page', 
      name:'record_page',   
    component: record_page,meta:{keepAlive:false,}
    },
     { 
      path: '/detail_page',   
      name:'detail_page', 
    component: detail_page,meta:{keepAlive:false,}
    },
     { 
      path: '/friend', 
      name:'friend',   
    component:friend,
    meta:{keepAlive:false,}
    },
    { 
      path: '/search_friend',
      name:'search_friend',    
    component:search_friend,meta:{keepAlive:false,}

    },
    { 
      path: '/add_friend', 
      name:'add_friend',   
    component:add_friend,meta:{keepAlive:false,}
    },
    { 
      path: '/qr_code',  
      name:'qr_code',  
    component:qr_code,meta:{keepAlive:false,}
    },
    { 
      path: '/erdu_page',  
      name:'erdu_page',  
    component:erdu_page,meta:{keepAlive:false,}
    },
     { 
      path: '/new_friend',  
      name:'new_friend',  
    component:new_friend,meta:{keepAlive:false,}
    },
      { 
      path: '/agreement',
      name:'agreement',    
    component:agreement,meta:{keepAlive:false,}
    },
      { 
      path: '/forget_pas', 
      name:'forget_pas',   
    component:forget_pas,meta:{keepAlive:false,}
    },
     { 
      path: '/account_set', 
      name:'account_set',   
    component:account_set,meta:{keepAlive:false,}
    },
     { 
      path: '/edit_phone',  
      name:'edit_phone',  
    component:edit_phone,meta:{keepAlive:false,}
    },
     { 
      path: '/edit_mail', 
      name:'edit_mail',   
    component:edit_mail,meta:{keepAlive:false,}
    },
     { 
      path: '/edit_password', 
      name:'edit_password',   
      component:edit_password,meta:{keepAlive:false,}
    },
     { 
      path: '/about',
      name:'about',    
      component:about,meta:{keepAlive:false,}
    },
     { 
      path: '/home',  
      name:'home',  
      component:home,meta:{keepAlive:false,}
    },
    { 
      path: '/add_app',
      name:'add_app',    
      component:add_app,meta:{keepAlive:false,}
    },
    { 
      path: '/friend_msg',
      name:'friend_msg',    
      component:friend_msg, meta:{keepAlive:false,}     
    },
    { 
      path: '/friend_more',
      name:'friend_more',    
      component:friend_more,meta:{keepAlive:false,}      
    },
    { 
      path: '/set_group',  
      component:set_group,meta:{keepAlive:false,}      
    },
    { 
      path: '/coupon_gift_detail',  
      component:coupon_gift_detail,meta:{keepAlive:false,}      
    },

  ]
})
