import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  hasPlateNo:true,//是否有车牌号码
  plateNo:'', //车牌号码
  frameNo:'', //车辆识别号
  modelName:'',//车型名称
  orderNo:'',//订单编号
  identifyNumber:'',//车主身份证号
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
