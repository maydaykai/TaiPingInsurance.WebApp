<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group :style="{ margin: '1rem 0 .25rem' }">
      <yd-flexbox>
        <div style="padding: 0.1rem 0 0 .24rem;"><img src="../../assets/images/tplogo.png" height="60" /><span class="yd-navbar-center">中国太平</span></div>
        <yd-flexbox-item><p style="color:#f6ab1a;font-size: .75rem;text-align:right;padding-right: .3rem">2012.32<i style="color:#f6ab1a;font-size: .25rem;">元</i></p></yd-flexbox-item>
        <div style="padding-right: 0.24rem;"><yd-button type="primary">确认报价</yd-button></div>
      </yd-flexbox>
      <div class="car-quote-operate yd-accordion-head">查看报价明细<i class="yd-accordion-rotated"></i></div>
    </yd-cell-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import {getStore, setStore, goTop} from '@/config/mUtils'

  export default {
    data(){
      return{
        title:'选择报价', // 标题
        checkboxSize: 13,
        plateNo:'', // 车牌号码
        baseInsureSwitch:true, // 交强险
        businessInsureSwitch:true, // 商业险
        placeHistory:[], // 历史搜索记录
        historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeNone: false, // 搜索无结果，显示提示信息
        input1:'',
        input2:'',
        nextStep: false,
        insuredSwitch: true,
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      this.$destroy()
      next()
    },

    mounted(){
      goTop();
      let hasPlateNo = getStore('hasPlateNo');
      if(hasPlateNo === "false"){
        this.plateNo ="新车未上牌";
      }else if (getStore('plateNo')) {//获取车牌号码
        this.plateNo = getStore('plateNo');
      }
    },

    components:{
      headTop
    },

    computed:{

    },

    methods:{
      clickHander() {
        this.$dialog.loading.open('很快加载好了');

        this.$router.push({path:'/quoted-price'});
        this.$dialog.loading.close();

      }
    }
  }
</script>
<style scoped="">
  .iconfont {
    font-family: iconfont!important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: middle
  }
  .car-quote-operate{
    color: #999;
    text-align: center;
  }
  .car-quote-operate i {
    display: inline-block;
    *
    display: inline;
    *
    zoom: 1;
    vertical-align: middle;
    -webkit-transition: all,.25s,linear .25s;
    -moz-transition: all,.25s,linear .25s;
    -ms-transition: all,.25s,linear .25s;
    -o-transition: all,.25s,linear .25s;
    transition: all,.25s,linear .25s;
  }

  .car-quote-operate i {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
