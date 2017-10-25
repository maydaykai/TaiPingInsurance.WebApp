// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
//import './config/rem'
import FastClick from 'fastclick'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import axios from 'axios'
//添加请求拦截器
// axios.interceptors.request.use(function(config){
//   //在发送请求之前做某事
//   this.$dialog.loading.open('正在加载车辆信息，请稍后');
//   return config;
// },function(error){
//   //请求错误时做些事
//   return Promise.reject(error);
// });
//
// //添加响应拦截器
// axios.interceptors.response.use(function(response){
//   //对响应数据做些事
//   this.$dialog.loading.close();
//   return response;
// },function(error){
//   //请求错误时做些事
//   return Promise.reject(error);
// });

Vue.prototype.$http = axios;
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
Vue.use(YDUI);

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

let routerMode = 'hash'
Vue.use(VueRouter)


const router = new VueRouter({
  routes,
  mode: routerMode,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// });

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
