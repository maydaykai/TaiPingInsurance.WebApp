// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import './config/rem'
import FastClick from 'fastclick'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
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
  strict: false,
  render: h => h(App)
})

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
