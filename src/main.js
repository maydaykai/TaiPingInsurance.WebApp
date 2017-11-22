// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
import store from './store/'
//import './config/rem'
import FastClick from 'fastclick'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import axiosPlugin from "./service";
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
Vue.use(YDUI);
Vue.use(axiosPlugin);

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
