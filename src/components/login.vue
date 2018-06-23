<template>
  <div class="login">
    <div class="register"><span id="register" @click="$router.push({path:'/register'})">注册</span></div>
    <img src="./img/logo_1@3x.png">
    <div class="login_style">
      <div v-for="(item,index) in login" :key="item.id" @click="addClassFun(index)" :class="[item.class, {'active': item.is_check}]">{{item.name}}<div></div></div>
    </div>
    <div class="input phone" v-if="show"> 
      <input type="number" maxlength="11" placeholder="请输入手机号" v-model="val" v-on:input ="inputFunc"><span @click="clear" v-if="this.val!=''"><img src="./img/delete_icon@3x.png" alt=""></span>  
    </div>
    <div class="input phone" v-else="show"> 
      <input type="number" maxlength="11" placeholder="请输入手机号（无需注册）" v-model="val" v-on:input ="inputFunc"><span v-if="this.val!=''" @click="clear"></span>     
    </div>
    <div class="input password" v-if="show">
      <input :type="inputType" v-model="pas_val" placeholder="请输入密码" v-on:input ="inputFunc"><span v-if="this.pas_val!=''" @click="see"><img :src="img_src" alt=""></span><label @click="$router.push({path:'/forget_pas'})">忘记密码</label>
    </div>     
    <div  class="input" v-else="show">
      <input style="width:5rem"  v-model="pas_val" type="text" placeholder="请输入验证码" v-on:input ="inputFunc"><span v-show="code" @click='send'>发送验证码</span><span v-show="!code">{{count}}S</span>
      <p>未注册过的手机号将自动保存为六度账号</p>
    </div>
    <div class="button button_active" v-if="active_btn" @click="_login"><span><label v-if='loading'></label>登录</span></div> 
    <div class="button" v-else="active_btn">登录</div>   
<!--     <p>第三方登录</p>
    <ul>
      <li class="wechat"></li>
      <li class="qq"></li>
      <li class="weibo"></li>
    </ul> -->
    <p>copyright © 2016  六度科技版权所有</p>
  </div>
</template>
<script>
import crypto from 'crypto'  
import {mapState} from 'vuex';
export default {
  user_id:'',
  token_code:'',
  data(){
    return {  
      code:true,
      count:'',
      timer:null,
      'login': [
      {
        'name':'普通登录',
        'class': 'ordinary',
        'is_check': true
      },
      {
        'name':'短信登录',
        'class': 'message',
        'is_check': false,
      }
      ],
      show:true,
      val:'',
      pas_val:'',
      inputType:"password",
      img_src:'./src/components/img/Password_close@3x.png',
      active_btn:false,
      loading:false,
      type:'ordinary',      
    }
  },
  computed:mapState({
    msg:state => state.msg
  }),
  methods:{
    addClassFun(index){   
      this.val='';
      this.pas_val='';
      this.active_btn=false;
      for (var i = 0; i < this.login.length; i++) {
        this.login[i].is_check = false;        
      }
      this.show = this.login[index].name === '普通登录' ? true:false;
      this.type = this.login[index].name === '普通登录' ? 'ordinary':'message';
      this.login[index].is_check = true;
    },
    clear(){
      this.val='';
    },
    see(){      
      if(this.inputType==="password") {
        this.inputType="text";
        this.img_src='./src/components/img/Password_open@3x.png'
      }else if(this.inputType==="text"){
        this.inputType="password";
        this.img_src='./src/components/img/Password_close@3x.png'
      }
    },
    inputFunc(){
      if (this.val!=''&&this.pas_val!='') {
        this.active_btn=true;
      }else{
        this.active_btn=false;
      }
    },
    _login(){   
      this.loading=true;
      var pas=this.pas_val;
      var md5 = crypto.createHash("md5");
      md5.update(pas);
      var password = md5.digest('hex');       
      var data =new Array();
      data['cmd'] = 'login';
      data['account'] = this.val;
      data['password'] =password;
      data['type'] = this.val.indexOf('@') === -1 ? 'phone' : 'email';
      var md6 = crypto.createHash("md5");
      md6.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+[data['cmd'],data['account'],password,data['type']].join(''));
      var app_key = md6.digest('hex');
      data['app_key']=app_key;
      var _data='cmd='+data["cmd"]+'&account='+data["account"]+'&password='+data["password"]+'&type='+data["type"]+'&app_key='+data["app_key"];
      var url="http://newsaas.71baomu.com:8088/saas";
      var url_msg="http://pass.71baomu.com/interface/Login/phoneLogin/key";
      var _this = this;
      if(this.type=='ordinary'){
        this.$axios.post(url,_data).then(function(res){ 
          _this.user_id=res['data']['server_response']['user_id'];       
          _this.token=res['data']['server_response']['token'];
          if (res['data']['server_response']['status_code'] == 201) {
            _this.$store.commit('SET_MSG',_this.user_id);
            _this.$router.push({path:'/home'});
          }else if(res['data']['server_response']['status_code'] == 401){
            alert('账户或密码错误请重新登录!');
            _this.loading=false;
          }else if(res['data']['server_response']['status_code'] == 404){
            alert('账户或密码错误请重新登录!');
            _this.loading=false;
          }else if(res['data']['server_response']['status_code'] == 418){
            alert('账户或密码错误请重新登录!');
            _this.loading=false;
          }else if(res['data']['server_response']['status_code'] == 406){
            alert('密码错误!');
            _this.loading=false;
          }else if(res['data']['server_response']['status_code'] == 403){
            alert('请求超时请重新登录');
            _this.loading=false;
          }            
        });
      }else if(this.type=='message'){
        this.$axios.post(url_msg,{phone:_this.val,code:password}).then(function(res){
            
        })
      }                      
    },
    send(){
      let TIME=60;
      if(!this.timer){
        this.count=TIME;
        this.code=false;
        this.timer=setInterval(()=>{
          if(this.count>0&&this.count<=TIME){
            this.count--;            
          }else{
            this.code=true;
            clearInterval(this.timer);
            this.timer=null;
          }
        },1000)
      };
      var url_msg="http://pass.71baomu.com/interface/Login/phoneLogin/key";
      this.$axios.post(url_msg,{phone:this.val}).then(function(res){

      })
    },   
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register{
  font-family: PingFang-SC-Regular;
  font-size: 0.32rem;
  color: #333333 !important;
  letter-spacing: 0;
  line-height: 0.32rem;
  text-align: right;
  margin-right: 0.4rem;
  margin-top: 0.3rem;
}
#register{
  color: #333333 !important;
}
.login>img{
  width: 1.38rem;
  height: 1.38rem;
  margin-top: 0.9rem;
  margin-bottom: 0.8rem;
}
.login_style{
  font-family: PingFang-SC-Regular;
  font-size: 0.32rem;
  color: #666666;
  letter-spacing: 0;
  line-height: 0.32rem;
  width: 3.7rem;
  height: 0.7rem;
  margin: 0 auto;
}
.login_style>.ordinary{
  position: relative;
  height: inherit;
  float: left;
}
.login_style>.ordinary>div{
  display: none;
  background: #00BCD4;
  width: 0.4rem;
  height: 0.02rem;
  position: absolute;
  bottom: 0;
  left: 0.4rem;
}
.login_style>.message{
  position: relative;
  float: right;
  height: inherit;
}
.login_style>.message>div{
  display: none;
  background: #00BCD4;
  width: 0.4rem;
  height: 0.02rem;
  position: absolute;
  bottom: 0;
  left: 0.4rem;
}
.input{
  width: 6.86rem;
  height: 1.28rem;
  border-bottom: 0.02rem solid #999999; 
  margin: 0 auto;
  position: relative;    
}
.input>input{
  border:0;
  width: inherit;    
  font-size: 0.28rem;
  line-height: 0.1rem;
  position: absolute;   
  left: 0;
  bottom: 0.2rem; 
  height: 0.5rem;
}
.input>span{
  float: right;
  font-family: PingFangSC-Regular;
  font-size: 0.24rem;
  color: #00BCD4;
  letter-spacing: 1.11px;
  position: absolute;
  right: 0;
  top: 0.6rem;
}
.input>label{
  position: absolute;
  float: right;
  font-family: PingFangSC-Regular;
  font-size: 0.24rem;
  color: #00BCD4;
  letter-spacing: 1.11px;
  top: 1.45rem;
  right: 0;
}
.active{
  color: #00BCD4;
}
.active>div{
  display: block !important;
}
.button{
  width: 6.86rem;
  height: 0.88rem;
  background: #B2EDF4;
  border-radius: 0.04rem;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #FFFFFF;
  letter-spacing: 0.0516rem;
  margin:0 auto;
  border:0;
  margin-top: 1rem;
  line-height: 0.88rem;
}
.button_active{
  background: #22CAE0;
}
.button_active>span{
  display: block;
  height: inherit;
  width: max-content;
  margin:0 auto;
}
.button_active>span>label{
  display: block;
  width: 0.36rem;
  height:inherit;
  background: url(./img/loading.png) center no-repeat;
  background-size: 0.36rem;
  padding-right: 0.05rem;
  float: left;
  animation: spin 2s infinite linear;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
p{
  font-family: PingFangSC-Regular;
  font-size: 0.28rem;
  color: #CCCCCC;
  letter-spacing: 0.013rem;
  line-height: 0.28rem;
  margin-top: 2.3rem;
  text-align: center;  }
  ul{
    width: 100%;
    height: 0.72rem;
    display: flex;
    margin-top: 0.3rem;
  }
  ul>li{   
    flex: 1;
    width: 0.72rem;
    height: 0.72rem;
    margin-bottom: 0.5rem;
  }
/*  .wechat{
    background: url(./img/wechat_icon_2@3x.png) center center no-repeat;
    background-size: 0.72rem;
  }
  .qq{
    background: url(./img/qq_icon_2@3x.png) center center no-repeat;
    background-size: 0.72rem;
  }
  .weibo{
    background: url(./img/weibo_icon_2@3x.png) center center no-repeat;
    background-size: 0.72rem;
    }*/
    .phone>span{
      position: absolute;
      float: right;
      width: 0.28rem;
      margin-top: 0.1rem;
    }
    .password>span{
      position: absolute;
      float: right;
      width: 0.48rem;
    }
    .input>p{
      font-family: PingFangSC-Regular;
      font-size: 0.24rem;
      color: #CCCCCC;
      letter-spacing: 1.11px;
      line-height: 0.24rem;
      position: absolute;
      top: -0.8rem;
    }
    .login>p{
      font-size: 0.15rem;
      color: #b3b3b3;
      text-align: center;
      width: 100%;
      margin-top: 3.4rem;
    }
    </style>
