<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group :style="{ margin: '.5rem 0 .25rem' }">
      <yd-cell-item>
        <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
        <input type="text" slot="right" placeholder="请输入手机号码">

        <!-- ↓↓关键代码是这里↓↓ -->
        <yd-sendcode slot="right"
                     v-model="start"
                     @click.native="sendCode"
                     type="warning"
        ></yd-sendcode>
        <!-- ↑↑关键代码是这里↑↑ -->
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">短信验证码：</span>
        <yd-input slot="right" required v-model="msmCode" min="6" max="6" placeholder="请输入短信验证码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" required v-model="msmCode" min="6" max="6" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确认密码：</span>
        <yd-input slot="right" required v-model="msmCode" min="6" max="6" placeholder="请输入确认密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-grids-group :rows="3" item-height="10px">
    <yd-grids-item>
      <span slot="text">grids-3</span>
    </yd-grids-item>
  </yd-grids-group>
    <yd-button-group>
      <yd-button v-if="!nextStep" size="large" @click.native="clickHander">立即查价</yd-button>
      <yd-button v-else size="large" @click.native="clickHander">下一步</yd-button>
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
        title:'用户注册', // 标题
        mobile:'',//车主手机号码
        msmCode:'',//车主姓名
        start:false,
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
    mounted(){

    },
    components:{
      headTop,
      footGuide
    },
    computed:{
      ...mapState([
        'plateNo','orderNo','identifyNumber'
      ]),
    },

    methods:{
      sendCode() {
        this.$dialog.loading.open('发送中...');
        setTimeout(() => {

          this.start = true;
          this.$dialog.loading.close();

          this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 1500
          });

        }, 1000);
      },
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
        var insuredConfirmInfo = {
          carOwner:carOwner,
          order:order,
          applicant:applicant,
          insured:insured
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
