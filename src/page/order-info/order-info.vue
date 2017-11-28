<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
  <yd-accordion :style="{ margin: '.5rem 0 .25rem' }">
    <yd-accordion-item :title="amountTitle">
      <yd-cell-item>
        <span slot="left">订单金额：</span>
        <span slot="right">{{totalAmount}}</span>
      </yd-cell-item>

    </yd-accordion-item>
    <yd-accordion-item title="车主信息">
      <yd-cell-item>
        <span slot="left">车主姓名：</span>
        <span slot="right">{{ownerName}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证号：</span>
        <span slot="right">{{ownerIdentity}}</span>
      </yd-cell-item>
    </yd-accordion-item>
    <yd-accordion-item title="投保人信息">
      <yd-cell-item>
        <span slot="left">投保人：</span>
        <span slot="right">{{insureName}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证号：</span>
        <span slot="right">{{insureIdentity}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号码：</span>
        <span slot="right">{{insureMobile}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">邮箱：</span>
        <span slot="right">{{insureEmail}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">地址：</span>
        <span slot="right">{{insureAddress}}</span>
      </yd-cell-item>
    </yd-accordion-item>
    <yd-accordion-item title="被保人信息">
      <yd-cell-item>
        <span slot="left">被保人：</span>
        <span slot="right">{{insuredName}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证号：</span>
        <span slot="right">{{insuredIdentity}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号码：</span>
        <span slot="right">{{insuredMobile}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">地址：</span>
        <span slot="right">{{insuredAddress}}</span>
      </yd-cell-item>
    </yd-accordion-item>
      <yd-accordion-item title="配送信息" v-show="dispatchShow">
        <yd-cell-item>
          <span slot="left">收件人：</span>
          <span slot="right">{{dispatchName}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码：</span>
          <span slot="right">{{dispatchMobile}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">地址：</span>
          <span slot="right">{{dispatchAddress}}</span>
        </yd-cell-item>
    </yd-accordion-item>
  </yd-accordion>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">去支付</yd-button>
    </yd-button-group>
  </yd-layout>
</template>

<script type="text/babel">
  import headTop from "@/components/header/backHead"
  import {mapState, mapMutations} from 'vuex'
  export default {
    data(){
      return{
        title:'订单详情', // 标题
        ownerName:'陈奕迅',//车主姓名
        ownerIdentity:'4816165161615616',//车主身份证号
        ownerMobile:'',//车主手机号码
        insureSwitch: true,//投保人同车主
        insureName:'',//投保人姓名
        insureIdentity:'',//投保人身份证号
        insureMobile:'',//投保人手机号码
        insureEmail:'',//投保人邮箱
        insureAddress:'',//投保人地址
        insuredSwitch: true,//被保人同车主
        insuredName:'',//被保人姓名
        insuredIdentity:'',//被保人身份证号
        insuredMobile:'',//被保人手机号码
        insuredAddress:'',//被保人地址
        dispatchShow: true,//配送信息
        dispatchName:'',//配送姓名
        dispatchMobile:'',//配送手机号码
        dispatchAddress:'',//配送地址
        totalAmount:0,
        amountTitle:"订单金额：",
      }
    },
    mounted(){
      var url = "orderList";
      var orderNo = this.$router.query.orderNo;
      if(!orderNo){
        orderNo = this.orderNo;
      }
      this.$http.get(url, {
        params: {
          orderNo: orderNo
        }
      }).then(response => {
        console.log(response);
        if (response.data.success === "true") {
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
          this.insuredAddress = data.insured.insuredAddress;//被保人地址
          if(data.dispatch){
            this.dispatchName = data.dispatch.name;//被保人姓名
            this.dispatchMobile = data.dispatch.address;//被保人手机号码
            this.dispatchAddress = data.dispatch.mobilePhone;//被保人地址
          }else{
            this.dispatchShow = false;
          }
          this.amountTitle = "订单金额："+data.common.sumInsured;
        } else {
          this.$dialog.toast({
            mes: response.data.message,
            timeout: 1500
          });
        }
      });
    },
    components:{
      headTop
    },
    computed:{
      ...mapState({
        orderNo(state){
          if(!state.orderNo){
            this.INIT_ORDER_NUMBER();
          }
          return state.orderNo;
        }
      }),
    },
    methods: {
      ...mapMutations([
        'INIT_ORDER_NUMBER'
      ]),
      clickHander() {
        var url = "paymentRegister";
        var order = {
          orderNo: this.orderNo
        };
        this.$http.post(url,order).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            var data = JSON.parse(response.data.data);
            window.location = data.payUrl;
          }else{
            this.$dialog.toast({
              mes: response.data.message,
              timeout: 1500
            });
          }
        });
      }
    },
  }
</script>
