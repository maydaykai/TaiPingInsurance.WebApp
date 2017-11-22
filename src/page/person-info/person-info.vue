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
    <yd-cell-group title="投保人与被保险人">
      <yd-cell-item>
        <div slot="left">投保人同车主</div>
        <yd-switch slot="right" v-model="insureSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="!insureSwitch">
        <yd-cell-item>
          <span slot="left">投保人：</span>
          <yd-input slot="right" :required="!insureSwitch" v-model="insureName" ref="insureName" min="2" max="6" placeholder="请输入投保人姓名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">身份证号：</span>
          <yd-input slot="right" :required="!insureSwitch" v-model="insureIdentity" ref="insureIdentity" regex="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" placeholder="请输入身份证号"></yd-input>
        </yd-cell-item>
      </div>
      <yd-cell-item>
        <span slot="left">手机号码：</span>
        <yd-input slot="right" :required="!insureSwitch" v-model="insureMobile" ref="insureMobile" min="11" regex="mobile" placeholder="请输入手机号码"></yd-input>
      </yd-cell-item>
      </div>
      <yd-cell-item>
        <span slot="left">邮箱：</span>
        <yd-input slot="right" required v-model="insureEmail" regex="email" ref="insureEmail" min="7" placeholder="请输入电子邮箱"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">地址：</span>
        <yd-input slot="right" required v-model="insureAddress" ref="insureAddress" min="7" placeholder="请输入地址"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <div slot="left">被保险人同投保人</div>
        <yd-switch slot="right" v-model="insuredSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="!insuredSwitch">
        <yd-cell-item >
          <span slot="left">被保险人：</span>
          <yd-input slot="right" :required="!insuredSwitch" v-model="insuredName" ref="insuredName" max="6" placeholder="请输入被保险人姓名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">身份证号：</span>
          <yd-input slot="right" :required="!insuredSwitch" v-model="insuredIdentity" ref="insuredIdentity" regex="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" placeholder="请输入被保险人身份证号"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码：</span>
          <yd-input slot="right" :required="!insuredSwitch" v-model="insuredMobile" ref="insuredMobile" regex="mobile" placeholder="请输入被保险人手机号码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">地址：</span>
          <yd-input slot="right" :required="!insuredSwitch" v-model="insuredAddress" ref="insuredAddress" placeholder="请输入被保险人地址"></yd-input>
        </yd-cell-item>
      </div>
      <yd-cell-item>
        <div slot="left">配送信息同投保人</div>
        <yd-switch slot="right" v-model="dispatchSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="!dispatchSwitch">
        <yd-cell-item >
          <span slot="left">收件人：</span>
          <yd-input slot="right" :required="!dispatchSwitch" v-model="dispatchName" ref="dispatchName" max="6" placeholder="请输入收件人姓名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码：</span>
          <yd-input slot="right" :required="!dispatchSwitch" v-model="dispatchMobile" ref="dispatchMobile" regex="mobile" placeholder="请输入收件人手机号码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">地址：</span>
          <yd-input slot="right" :required="!dispatchSwitch" v-model="dispatchAddress" ref="dispatchAddress" placeholder="请输入收件人地址"></yd-input>
        </yd-cell-item>
      </div>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">确认投保</yd-button>
    </yd-button-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"
  import {getStore, setStore, YDUIFormValidate} from '@/config/mUtils'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      return{
        title:'信息填写', // 标题
        ownerName:'',//车主姓名
        ownerIdentity:'',//车主身份证号
        ownerMobile:'',//车主手机号码
        insureSwitch: false,//投保人同车主
        insureName:'',//投保人姓名
        insureIdentity:'',//投保人身份证号
        insureMobile:'',//投保人手机号码
        insureEmail:'',//投保人邮箱
        insureAddress:'',//投保人地址
        insuredSwitch: false,//被保人同车主
        insuredName:'',//被保人姓名
        insuredIdentity:'',//被保人身份证号
        insuredMobile:'',//被保人手机号码
        insuredAddress:'',//被保人地址
        dispatchSwitch: false,//收件人同车主
        dispatchName:'',//配送姓名
        dispatchMobile:'',//配送手机号码
        dispatchAddress:'',//配送地址
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
    watch: {
      insureSwitch:function(){
        if(this.insureSwitch){
          this.insureName = this.ownerName;
          this.insureIdentity = this.ownerIdentity;
        }
      },
      insuredSwitch:function(){
        if(this.insureSwitch){
          this.insuredName = this.insureName;
          this.insuredIdentity = this.insureIdentity;
          this.insuredMobile = this.insureMobile;
          this.insuredAddress = this.insureAddress;
        }
      },
      dispatchSwitch:function(){
        if(this.dispatchSwitch){
          this.dispatchName = this.ownerName;
          this.dispatchMobile = this.ownerMobile;
          this.dispatchAddress = this.insureAddress;
        }
      },
    },
    mounted(){
      this.ownerIdentity = this.identifyNumber;
      var url = "insureHistory";
      this.$http.get(url,{
        params: {
          orderNo: this.orderNo,
          checkMsg: this.identifyNumber
        }
      }).then(response => {
        console.log(response);
        if(response.data.success ==="true"){
          var data = JSON.parse(response.data.data);
          this.ownerName = data.carOwner.name;
          this.ownerIdentity = data.carOwner.identifyNumber;
          this.insureName = data.applicant.appliName,//投保人姓名
          this.insureIdentity = data.applicant.identifyNumber;//投保人身份证号
          this.insureMobile = data.applicant.mobilePhone;//投保人手机号码
          this.insureEmail = data.applicant.email;//投保人邮箱
          this.insureAddress = data.applicant.appliAddress;//投保人地址
          this.insuredName = data.insured.insuredName;//被保人姓名
          this.insuredIdentity = data.insured.identifyNumber;//被保人身份证号
          this.insuredMobile = data.insured.insuredMobilePhone;//被保人手机号码
          this.insuredAddress = data.applicant.insuredAddress;//被保人地址
        }else{
          this.$dialog.toast({
            mes: response.data.message,
            timeout: 1500
          });
        }
      });
    },
    components:{
      headTop,
      footGuide
    },
    computed:{
      ...mapState([
        'plateNo','orderNo','identifyNumber',''
      ]),
    },

    methods:{
      clickHander() {
        let validate = YDUIFormValidate(this.$refs);
        if(!validate)return;
        var url = "insConfirm";
        var carOwner = {
          name: this.ownerName,
          identifyNumber: this.ownerIdentity
        };
        var order = {
          orderNo: this.orderNo
        };
        var applicant = {
          appliName: this.insureName,
          identifyNumber: this.insureIdentity,
          mobilePhone: this.insureMobile,
          email: this.insureEmail,
          appliAddress: this.insureAddress
        };
        var insured = {
          insuredName: this.insuredName,
          identifyNumber: this.insuredIdentity,
          insuredMobilePhone: this.insuredMobile,
          insuredAddress: this.insuredAddress
        };
        var dispatch = {
          name: this.dispatchName,
          address: this.dispatchAddress,
          mobilePhone: this.dispatchMobile
        };
        var insuredConfirmInfo = {
          carOwner:carOwner,
          order:order,
          applicant:applicant,
          insured:insured,
          dispatch:dispatch
        };
        this.$http.post(url,insuredConfirmInfo).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            //var data = JSON.parse(response.data.data);
            this.$router.push({path:'/order-info'});
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
