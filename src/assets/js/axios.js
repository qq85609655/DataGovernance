import axios from "axios"
import store from '../../store.js';

// request时候带上Authorization
axios.interceptors.request.use(
    config => {
        if (window.localStorage.getItem('token')) {
            config.headers.Authorization = window.localStorage.getItem('token');
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

// response拦截
axios.interceptors.response.use(
    response => {
        if(response.data.msg=='未登录'|| response.data.msg=='签名已过期'){//具体的判断token失效的参数
            //this.$Message.info('登录过期');
            //alert('111');
            //this.$Message.info('111');
            store.dispatch('showMessage','登录失效！');
            localStorage.removeItem('token');
            store.commit('go2login');
        }else{
            return response
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // case 404:
                //     // 返回 401 清除token信息并跳转到登录页面
                //     store.commit('unset_user');
                //     store.commit('go2login');
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

/**
 * post请求
 * @param params (url,data,success,error)
 * @returns {*|Promise.<T>}
 */
export const postRequest = (params) => {
    return axios({
        method: 'post',
        url: params.url,
        data: params.data,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(function (data) {
        if(params.success){
            params.success(data.data);
        }
    }).catch(function (error) {
        if(params.error){
            params.error(error);
        }
    });
}
export const postRequestJson = (params) => {
    return axios({
        method: 'post',
        url: params.url,
        data: params.data,
        // transformRequest: [function (data) {
        //     let ret = ''
        //     for (let it in data) {
        //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //     }
        //     return ret
        // }],
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(function (data) {
        if(params.success){
            params.success(data.data);
        }
    }).catch(function (error) {
        if(params.error){
            params.error(error);
        }
    });
}
