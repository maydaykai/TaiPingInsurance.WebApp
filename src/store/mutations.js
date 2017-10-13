import {
	RECORD_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_SHOPDETAIL,
	RECORD_USERINFO,
	GET_USERINFO,
	CONFIRM_REMARK,
	CONFIRM_INVOICE,
	CHOOSE_SEARCH_ADDRESS,
	SAVE_GEOHASH,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_SHOPID,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_ADDRESS,
	SAVE_ADDDETAIL,
	SAVE_QUESTION,
	ADD_ADDRESS,
	BUY_CART,
  SAVE_HAS_PLATE_NUMBER,
  SAVE_PLATE_NUMBER,
  INIT_HAS_PLATE_NUMBER,
  INIT_PLATE_NUMBER,
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
  }
}
