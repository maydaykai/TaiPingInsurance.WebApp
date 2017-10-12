import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const carInfo = r => require.ensure([], () => r(require('../page/car-info/car-info')), 'car-info')
const riskInfo = r => require.ensure([], () => r(require('../page/risk-info/risk-info')), 'risk-info')


export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页
    {
      path: '/home/:cityid',
      component: home
    },
    //首页
    {
      path: '/home',
      component: home
    },
    //选择城市
    {
      path: '/city',
      component: city
    },
    //车辆信息填写
    {
      path: '/car-info',
      component: carInfo
    },
    //险种信息填写
    {
      path: '/risk-info',
      component: riskInfo
    },
  ]
}]
