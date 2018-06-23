// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { TabContainer, TabContainerItem, MessageBox, DatetimePicker,Picker, Loadmore, Swipe, SwipeItem,IndexList, IndexSection  } from 'mint-ui';
import { Upload } from 'element-ui';
import axios from "axios";
import Vuex from 'vuex'
import store from './store/store'

Vue.use(MintUI);
Vue.use(Upload);

Vue.prototype.$axios = axios;


Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);

Vue.config.productionTip = false

Vue.prototype.HOST = 'http://pass.71baomu.com/interface/'


window.eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
