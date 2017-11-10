<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group :style="{ margin: '1rem 0 .25rem' }">
      <yd-cell-item>
        <span slot="right"></span>
        <span slot="left">{{ plateNo }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车主信息">
      <yd-cell-item>
        <span slot="left">身份证号：</span>
        <yd-input slot="right" required v-model="ownerIdentity" ref="ownerIdentity" min="15" max="18" regex="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" placeholder="请输入身份证号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">下一步</yd-button>
    </yd-button-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"
  import {getStore, setStore, YDUIFormValidate} from '@/config/mUtils'
  import {mapState, mapMutations} from 'vuex'
  import {judgeQuotetion} from '@/service/getApiData'

  export default {
    data(){
      return{
        title:'信息填写', // 标题
        ownerIdentity:'',//车主身份证号
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      if(to.path.indexOf("home") > -1) {
//        this.$destroy();
      }
      next()
    },
    mounted(){
      if(!this.plateNo){
        this.$router.push({path:'/home'});
        return;
      }
    },
    components:{
      headTop,
      footGuide
    },

    computed:{
      ...mapState([
        'plateNo','frameNo','modelName'
      ]),
    },

    methods:{
      ...mapMutations([
        'SAVE_ORDER_NUMBER','SAVE_IDENTIFY_NUMBER'
      ]),
      clickHander() {
        let validate = YDUIFormValidate(this.$refs);
        if(!validate)return;
        var url = "orderNo";

        this.$http.get(url,{
          params: {
            licenseNo: this.plateNo,
            identifyNumber: this.ownerIdentity
          }
        }).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            var data = JSON.parse(response.data.data);
            this.SAVE_ORDER_NUMBER(data.orderNo);
            this.SAVE_IDENTIFY_NUMBER(this.ownerIdentity);
            this.$router.push({path:'/quoted-price'});
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
