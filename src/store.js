import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import  Menufilter from './assets/js/menuFilter.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
  },
  getters: {

  },
  mutations: {
    set_user: (state, user) => {//登录成功后，设置用户状态
      localStorage.setItem('token', user.obj.token)
      console.log(window.localStorage.getItem('token'));
      //localStorage.setItem('userName', user.name)
      state.user = user
    },
    unset_user: (state) => {
      localStorage.removeItem('token')
      //localStorage.removeItem('userName')
      state.user = {}
    },
    go2login:(state)=>{
      router.replace({path:'/'});
    },
    ADD_ROUTES:(state, {addrouter,reload}) => {//动态加载路由
      
      let routes = []
        Menufilter(routes, addrouter)                 //1. 将后台的路由数据 关联上components
        router.addRoutes(routes)                      // 2. 添加路由操作

      if(reload){                                      //如果是刷新操作 ，路由不跳转，保留当前路由
      
      }else{
        router.push({path:'/dgpSystemAdmin'});        // 3. 这里先写死 ，到时候后端传跳转的路由
      }
    }
  },
  actions: {
    add_Routes:({commit}, {addrouter,reload})=>{//异步触发mutitations，动态加载路由
        commit("ADD_ROUTES", {addrouter,reload})
    },
    showMessage:(state,payload)=>{  //显示信息
      Vue.prototype.$Message.info(payload);
    }
  }
})
