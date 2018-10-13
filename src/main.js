import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//封装的axios
import {postRequest,postRequestJson} from './assets/js/axios.js'

// 一些css和公共js
import './assets/css/reset.css'
import './assets/js/jquery-1.8.0.min.js'
import './assets/js/rem.min.js'
import './assets/js/indexInit.js'
import './assets/css/dgpSystemColor.css'
import './components/table/table_styles.css'
import './assets/css/bgColor.css';

//第三方ui库
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.prototype.postRequest= postRequest
Vue.prototype.postRequestJson= postRequestJson

// 用户手动刷新页面，这是路由会被重设，要重新新增
if (localStorage.getItem('newRoute')) {
  let routes = JSON.parse(localStorage.getItem('newRoute'))
  store.dispatch("add_Routes", {addrouter:routes,reload:'reload'});
}

Vue.config.productionTip = false
Vue.use(iView);

new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
