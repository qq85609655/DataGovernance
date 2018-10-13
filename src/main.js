import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "./assets/css/reset.css"
/*+++++++++++++++++++++++++++++++++*/
// 使用iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
/*+++++++++++++++++++++++++++++++++*/

/*初始化样式*/
import "./assets/css/animate.min.css"
/*全局背景色*/
import "./assets/css/bgColor.css"
import "./assets/js/jquery-1.8.0.min"
/*初始化分辨率大小*/
import "./assets/js/indexInit"
/*使用rem*/
import "./assets/js/rem.min"



Vue.config.productionTip = false
/*全局设置axios*/
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
