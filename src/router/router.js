import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/login/register')), 'register')
const me = r => require.ensure([], () => r(require('../page/me/me')), 'me')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const carOwner = r => require.ensure([], () => r(require('../page/person-info/car-owner')), 'car-owner')
const carInfo = r => require.ensure([], () => r(require('../page/car-info/car-info')), 'car-info')
const carIdentificationNumber = r => require.ensure([], () => r(require('../page/car-info/car-identification-number')), 'car-identification-number')
const carModel = r => require.ensure([], () => r(require('../page/car-info/car-model')), 'car-model')
const carModelList = r => require.ensure([], () => r(require('../page/car-info/car-model-list')), 'car-model-list')
const riskInfo = r => require.ensure([], () => r(require('../page/risk-info/risk-info')), 'risk-info')
const quotedPrice = r => require.ensure([], () => r(require('../page/quoted-price/quoted-price')), 'quoted-price')
const personInfo = r => require.ensure([], () => r(require('../page/person-info/person-info')), 'person-info')
const orderInfo = r => require.ensure([], () => r(require('../page/order-info/order-info')), 'order-info')
const orderList = r => require.ensure([], () => r(require('../page/order-info/order-list')), 'order-list')


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
    //登录
    {
      path: '/login',
      component: login
    },
    //注册
    {
      path: '/register',
      component: register
    },
    //个人中心
    {
      path: '/me',
      component: me
    },
    //选择城市
    {
      path: '/city',
      component: city
    },
    //车主信息填写
    {
      path: '/car-owner',
      component: carOwner
    },
    //车辆信息填写
    {
      path: '/car-info',
      component: carInfo
    },
    //车辆识别代号
    {
      path: '/car-identification-number',
      component: carIdentificationNumber
    },
    //车辆车型
    {
      path: '/car-model',
      component: carModel
    },
    //车辆车型
    {
      path: '/car-model-list',
      component: carModelList
    },
    //险种信息填写
    {
      path: '/risk-info',
      component: riskInfo
    },
    //报价
    {
      path: '/quoted-price',
      component: quotedPrice
    },
    //人员信息填写
    {
      path: '/person-info',
      component: personInfo
    },
    //订单信息
    {
      path: '/order-info',
      component: orderInfo
    },
    //订单列表
    {
      path: '/order-list',
      component: orderList
    },
  ]
}]
