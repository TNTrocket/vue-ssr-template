import axios from 'axios';
import {cache} from 'util/global';
import store from '../store/';
import {MessageBox, Indicator} from 'mint-ui';
import qs from 'qs';
import router from '../router'

axios.defaults.baseURL = '/ntce-c';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.timeout = 30000;
let isShowIngError = false;
axios.interceptors.response.use(function ({data, config, status}) {
    // Do something with response data
    if (status === 200) {
        if (data.code === 10000) {
            let resultData = JSON.parse(data.data);
            return Promise.resolve(resultData);
        }else if(data.code === 10101){
            MessageBox({
                message:"登录异常",
                showConfirmButton: false,
                title:"",
                // confirmButtonText:"确认",
                closeOnClickModal:false
            });
            setTimeout(()=>{
                Indicator.close();
                MessageBox.close();
                router.push({path:'/login'});
            },2000);
            return Promise.reject(data);
        }else if(data.code === 10109){

            return Promise.reject(data.msg);
        }
        else if(data.code === 99999){
            MessageBox({
                message:"服务异常，请稍后再试",
                showConfirmButton: false,
                title:"",
                // confirmButtonText:"确认",
                closeOnClickModal:false
            });
            setTimeout(()=>{
                Indicator.close();
                MessageBox.close();
            },2000);
            return Promise.reject(data);
        }
        else {
            if (config.ignoreErrorModal) {
                return Promise.reject(data);
            } else {
                return Promise.reject(data.msg);
            }
        }
    } else {
        return Promise.reject(data);
    }
}, function (error) {
    if (!isShowIngError) {
        isShowIngError = true;
    }
    MessageBox({
        message:"您的访问超时，请检查您的网络正常重新操作",
        showConfirmButton: false,
        title:"",
        // confirmButtonText:"确认",
        closeOnClickModal:false
    });
    setTimeout(()=>{
        Indicator.close();
        MessageBox.close();
    },2000);
    return Promise.reject(error);
});

export default {
    get(url, params = {}, config = {}) {
        let {state: { user }} = store;
        return axios({
            method: 'get',
            url,
            params,
            ignoreErrorModal: config.ignoreErrorModal || false,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'token': user.token || cache.get("token")
            }
        })
    },
    post(url, data , config = {}) {
        let {state: { user }} = store;
        let cacheToken = cache.get("token") || "";
        let userToken = user.token || cacheToken;
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(data),
            ignoreErrorModal: config.ignoreErrorModal || false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'token': userToken
            }
        })
    },
    upload(url, formData, config) {
        return axios.post(url, formData, config);
    }
}