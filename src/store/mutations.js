import {
  SAVE_HAS_PLATE_NUMBER,
  SAVE_PLATE_NUMBER,
  INIT_HAS_PLATE_NUMBER,
  INIT_PLATE_NUMBER,
  SAVE_FRAME_NUMBER,
  SAVE_MODEL,
  SAVE_ORDER_NUMBER,
  SAVE_IDENTIFY_NUMBER,
} from './mutation-types.js'

import {
	setStore,
	getStore,
} from '../config/mUtils'

export default {
  //保存是否有车牌号
  [SAVE_HAS_PLATE_NUMBER](state, hasPlateNo){
    state.hasPlateNo = hasPlateNo;
    setStore("hasPlateNo",hasPlateNo);
  },
  //保存车牌号
  [SAVE_PLATE_NUMBER](state, plateNo){
	  state.plateNo = plateNo;
    setStore("plateNo",plateNo);
  },
  //初始化是否有车牌号
  [INIT_HAS_PLATE_NUMBER](state){
    let initHasPlateNo = getStore('hasPlateNo');
    if (initHasPlateNo) {
      state.hasPlateNo = initHasPlateNo === "false";
    }
  },
  //初始化车牌号
  [INIT_PLATE_NUMBER](state){
    let initPlateNo = getStore('plateNo');
    if (initPlateNo) {
      state.plateNo = initPlateNo;
    }
  },
  //保存车辆识别号
  [SAVE_FRAME_NUMBER](state, frameNo){
      state.frameNo = frameNo;
  },
  //保存车型名称
  [SAVE_MODEL](state, model){
      state.model = model;
  },
  //保存订单编号
  [SAVE_ORDER_NUMBER](state, orderNo){
    state.orderNo = orderNo;
  },
  //保存身份证号码
  [SAVE_IDENTIFY_NUMBER](state, identifyNumber){
    state.identifyNumber = identifyNumber;
  },
}
