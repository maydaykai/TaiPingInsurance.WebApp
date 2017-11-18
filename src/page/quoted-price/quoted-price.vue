<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
      <yd-cell-group :style="{ margin: '.5rem 0 .25rem' }">
        <yd-pullrefresh :callback="getPrice" ref="pullrefresh">
        <yd-flexbox>
          <div style="padding: 0.1rem 0 0.1rem .24rem;"><img src="../../assets/images/tplogo.png" height="60" /><span class="yd-navbar-center">中国太平</span></div>
          <yd-flexbox-item><p style="color:#f6ab1a;font-size: .75rem;text-align:right;padding-right: .3rem">{{totalAmount}}<i style="color:#f6ab1a;font-size: .25rem;">元</i></p></yd-flexbox-item>
          <div style="padding-right: 0.24rem;"><yd-button type="primary" @click.native="clickHander">确认报价</yd-button></div>
        </yd-flexbox>
        <!-- <div class="car-quote-operate yd-accordion-head">查看报价明细<i class="yd-accordion-rotated"></i></div> -->
        </yd-pullrefresh>
      </yd-cell-group>
      <yd-grids-group :rows="3" item-height="1rem">
        <yd-grids-item>
            <span slot="text">险种名称</span>
        </yd-grids-item>
        <yd-grids-item>
            <span slot="text">金额(元)</span>
        </yd-grids-item>
        <yd-grids-item>
            <span slot="text">保额(元)</span>
        </yd-grids-item>
        <div v-for="item in quotedList" :key="item.kindCode">
        <yd-grids-item>
            <span slot="text" style="width:50%">{{item.kindName}}</span>
        </yd-grids-item>
        <yd-grids-item>
            <span slot="text">{{item.priceTaxTotal}}</span>
        </yd-grids-item>
        <yd-grids-item>
            <span slot="text">{{item.sumInsured}}</span>
        </yd-grids-item>
        </div>
    </yd-grids-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import {getStore, setStore, goTop} from '@/config/mUtils'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      return{
        title:'选择报价', // 标题
        totalAmount:0,
        quotedList:[]
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      this.$destroy()
      next()
    },

    mounted(){
      //this.getPrice();
      console.log(this.quotedPrice);
      this.totalAmount = this.quotedPrice.totalAmount;
      this.quotedList = this.quotedPrice.itemKindBS;
    },

    components:{
      headTop
    },

    computed:{
      ...mapState([
        'orderNo','quotedPrice'
      ]),
    },

    methods:{
      clickHander() {
        this.$router.push({path:'/person-info'});
      },
      getPrice(){
        var url = "recommended";
        this.$http.post(url,{
          orderNo: this.orderNo
        }).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            var data = JSON.parse(response.data.data);
            this.totalAmount = data.totalAmount;
            this.$refs.pullrefresh.$emit('ydui.pullrefresh.finishLoad');
          }else{
            this.$dialog.toast({
              mes: response.data.message,
              timeout: 1500
            });
          }
        });
      },
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
    display: inline;
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
