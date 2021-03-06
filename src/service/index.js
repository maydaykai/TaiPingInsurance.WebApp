import axios from "axios";
import qs from "qs";
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import router from '../router/router';

const Axios = axios.create({
  baseURL: "http://tpapics.anxinbx.com/car/", // 因为我本地做了反向代理http://tpapics.anxinbx.com/car/http://192.168.1.249:8006/car/
  timeout: 10000,
  responseType: "json",
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    Loading.open('很快加载好了');
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = "bearer " + localStorage.token;
    }
    return config;
  },
  error => {
    Toast(error);
    return Promise.reject(error.data.error.message);
  }
);
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    Loading.close();
    if (!res.data){// && !res.data.success) {
      Toast({
        mes: res.data.error.message.message
          ? res.data.error.message.message
          : res.data.error.message,
        timeout: 1500,
        icon: 'error'
      });
      return Promise.reject(res.data.error.message);
    }
    return res;
  },
  error => {
    Loading.close();
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    // if (!window.localStorage.getItem("token")) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   router.replace({path:'/login'});
    // } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      // let lifeTime =
      //   JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
      //   1000;
      // let nowTime = new Date().getTime(); // 当前时间的时间戳
      // console.log(nowTime, lifeTime);
      // console.log(nowTime > lifeTime);
      // if (nowTime > lifeTime) {
      //   Toast({
      //     mes: '登录状态信息过期,请重新登录',
      //     timeout: 1500,
      //     icon: 'error'
      //   });
      //   router.push({
      //     path: "/login"
      //   });
      // } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        if (error.response.status === 401) {
          let path = router.match(location).path;
          router.replace({path:'/login',query:{ returnUrl: path }});
        }
        if (error.response.status === 403) {
          // router.push({
          //   path: "/error/403"
          // });
          Toast({
            mes: '服务器正忙，请稍后再试！',
            timeout: 1500,
            icon: 'error'
          });
        }
        if (error.response.status === 500) {
          // router.push({
          //   path: "/error/500"
          // });
          Toast({
            mes: '服务器正忙，请稍后再试！',
            timeout: 1500,
            icon: 'error'
          });
        }
        if (error.response.status === 502) {
          // router.push({
          //   path: "/error/502"
          // });
          Toast({
            mes: '服务器正忙，请稍后再试！',
            timeout: 1500,
            icon: 'error'
          });
        }
        if (error.response.status === 404) {
          // router.push({
          //   path: "/error/404"
          // });
          Toast({
            mes: '您访问的页面不存在！',
            timeout: 1500,
            icon: 'error'
          });
        }
        if (error.response.status === 400) {
          // router.push({
          //   path: "/error/404"
          // });
          Toast({
            mes: '用户名或密码错误',
            timeout: 1500,
            icon: 'error'
          });
        }
        // if (error.response.status === 400) {
        //   router.replace({path:'/login'});
        // }
      // }
    // }
    // 返回 response 里的错误信息
    let errorInfo =  error.response.data ? error.response.data.Message : error.response;
    return Promise.reject(errorInfo);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
