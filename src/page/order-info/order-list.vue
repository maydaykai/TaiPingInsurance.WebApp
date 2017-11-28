<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-pullrefresh :callback="getOrderList" ref="pullrefresh">
      <yd-list theme="4"> /* 这里可选1/2/3/4/5五种样式 */
        <yd-list-item v-for="item in list" :key="item.Id" type="link" :to="{ path: 'order-info', query: { orderNo: item.Id }}" replace>
          <img slot="img" :src="item.img">
          <span slot="title">{{item.LicenseNo}}</span>
          <yd-list-other slot="other">
            <div>
              <span class="demo-list-price"><em>¥</em>{{item.TotalAmount}}</span>
              <span class="demo-list-del-price">¥{{item.TotalAmount}}</span>
            </div>
            <div>{{item.StatusName}}</div>
          </yd-list-other>
        </yd-list-item>
      </yd-list>
    </yd-pullrefresh>
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
        list: [

        ],
      }
    },

    mounted(){
      this.getOrderList();
    },

    components:{
      headTop
    },

    computed:{
      ...mapState([
        'orderNo'
      ]),
    },

    methods:{
      clickHander() {
        this.$router.push({path:'/person-info'});
      },
      getOrderList(){
        var url = "userOrderList";
        this.$http.post(url,{          
        }).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            var data = JSON.parse(response.data.data);
            this.totalAmount = response.data.total;
            this.list = data;
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
