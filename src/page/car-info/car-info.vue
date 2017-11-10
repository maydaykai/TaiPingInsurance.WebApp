<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group :style="{ margin: '.5rem 0 .25rem' }">
      <yd-cell-item>
        <span slot="right"></span>
        <span slot="left">{{ plateNo }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车主信息">
      <yd-cell-item>
        <span slot="left">车主姓名：</span>
        <yd-input slot="right" required v-model="ownerName" ref="ownerName" min="2" max="5" placeholder="请输入车主姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证号：</span>
        <yd-input slot="right" required v-model="ownerIdentity" ref="ownerIdentity" min="15" max="18" regex="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" placeholder="请输入身份证号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车辆信息">
      <yd-cell-item arrow type="link" href="car-identification-number">
        <span slot="left">车辆识别代号：</span>
        <span slot="right">{{frameNo}}</span>
      </yd-cell-item>
      <yd-cell-item arrow type="link" href="car-model">
        <span slot="left">车型/价格：</span>
        <span slot="right">{{model.configModel}}</span>
        <!--<br /><span slot="right" v-model="modelName"></span>-->
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">座位数：</span>
        <yd-spinner slot="right" max="10" unit="1" v-model="seat"></yd-spinner>
        <!--<yd-input slot="right" type="number" required v-model="seat" placeholder="请输入座位数"></yd-input>-->
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">发动机号：</span>
        <yd-input slot="right" required v-model="engineNo" ref="engineNo" min="5" max="20" placeholder="请输入发动机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">注册日期：</span>
        <yd-datetime type="date" v-model="registerDate" startDate="2000-01-01" :endDate="nowDate" slot="right"></yd-datetime>
      </yd-cell-item>
      <yd-cell-item>
        <div slot="left">是否一年内过户车：</div>
        <yd-switch slot="right" v-model="transferSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="transferSwitch">
        <yd-cell-item arrow>
          <span slot="left">过户日期：</span>
          <yd-datetime type="date" v-model="transferDate" :startDate="lastYearDate" :endDate="nowDate" slot="right">请选择过户日期</yd-datetime>
        </yd-cell-item>
      </div>
    </yd-cell-group>
    <yd-cell-group title="是否为按揭车">
      <yd-cell-item>
        <div slot="left">是否为按揭车</div>
        <yd-switch slot="right" v-model="loanSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="loanSwitch">
        <yd-cell-item >
          <span slot="left">受益人：</span>
          <yd-input slot="right" v-model="beneficiaries" min="2" max="6" placeholder="请输入受益人姓名"></yd-input>
        </yd-cell-item>
      </div>
      </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">下一步</yd-button>
    </yd-button-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"
  import {currentcity, searchplace, groupcity} from '@/service/getData'
  import {getStore, setStore, YDUIFormValidate} from '@/config/mUtils'
  import getcity from '@/service/tempdata/home'
  import {mapState, mapMutations} from 'vuex'
  import {judgeQuotetion} from '@/service/getApiData'

  export default {
    data(){
      let now = new Date();
      let nowDate = now.toLocaleDateString();
      let lastYearDate = new Date(now.setFullYear(now.getFullYear() - 1)).toLocaleDateString();
      return{
        nowDate: nowDate,
        lastYearDate:lastYearDate,
        title:'信息填写', // 标题
//        plateNo:'', // 车牌号码
        //frameNo:'', //车辆识别号
        seat:5, //座位数
        engineNo:'', //发动机号
        nextStep: false,
        registerDate: nowDate,
        transferSwitch: false,//是否一年内过户车
        transferDate: nowDate,//过户日期
        ownerName:'',//车主姓名
        ownerIdentity:'',//车主身份证号
        loanSwitch:false,//是否是按揭车
        beneficiaries:'',//受益人
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      console.log(to.path.indexOf("home"));
      if(to.path.indexOf("home") > -1) {
        this.$destroy()
      }
      next()
    },
    components:{
      headTop,
      footGuide
    },
    mounted(){
      if(this.model){
        this.seat = this.model.seat;
      }
    },
    computed:{
      ...mapState({
        plateNo(state){
          if(!state.plateNo){
            this.INIT_PLATE_NUMBER();
          }
          return state.plateNo;
        }
      ,frameNo:"frameNo",model:"model"
      }),
    },

    methods:{
      ...mapMutations([
        'INIT_PLATE_NUMBER','SAVE_ORDER_NUMBER'
      ]),
      clickHander() {
        let validate = YDUIFormValidate(this.$refs);
        if(!validate)return;

        var url = "saveOrderVehicle";
        var vehicleInfo = {
          licenseNo: this.plateNo,
          frameNo: this.frameNo,
          engineNo: this.engineNo,
          modelCode: this.model.modelCode,
          chgOwnerFlag: this.transferSwitch ? "01" : "00",
          transferDate: this.transferSwitch ? this.transferDate : "",
          singeinDate: this.registerDate,
          seat: this.seat
        };
        var carOwnerInfo = {
          name: this.ownerName,
          identifyNumber: this.ownerIdentity
        };
        var saveOrderVehicleInfo = {
          carOwnerInfo:carOwnerInfo,
          vehicleInfo:vehicleInfo
        };
        this.$http.post(url,saveOrderVehicleInfo).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            var data = JSON.parse(response.data.data);
            this.SAVE_ORDER_NUMBER(data.orderNo);
            this.$router.push({path:'/risk-info'});
          }else{
            this.$dialog.toast({
              mes: response.data.message,
              timeout: 1500
            });
          }
        });
      }
    }
  }

</script>
