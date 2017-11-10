<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <div :style="{ margin: '.5rem 0 .25rem' }"></div>
    <yd-search v-model="modelName" :on-submit="submitHandler"></yd-search>
    <yd-list theme="4">
      <yd-list-item style="height:1.75rem;" v-for="item in imgList" :key="item.modelCode" type="a" href="javascript:;" @click.native="clickHander(item)">
        <img slot="img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510229648526&di=19050158b5c497c51d843d85001fa7d8&imgtype=0&src=http%3A%2F%2Fpic27.nipic.com%2F20130122%2F10558908_131118160000_2.jpg">
        <span slot="title">{{item.configModel}}</span>
        <yd-list-other slot="other">
          <div>
            <span class="list-price"><em>购买价格：</em>{{item.purchasePrice}}</span>
          </div>
        </yd-list-other>
      </yd-list-item>
    </yd-list>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"
  import {mapState, mapMutations} from 'vuex'
  export default {
    data(){
      return{
        title:'品牌型号', // 标题
        modelName:'',
        imgList: []
      }
    },
    mounted(){
      this.modelName = this.$route.query.modelName;
      this.submitHandler();
    },

    components:{
      headTop,
      footGuide
    },

    computed:{
    },

    methods:{
      ...mapMutations([
        'SAVE_MODEL'
      ]),
      submitHandler(){
        let url = "platformModels";
        this.$http.get(url,{
          params: {
            brandName: this.modelName
          }
        }).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            if(Number(response.data.total) > 0){
              let data = JSON.parse(response.data.data);
              this.imgList = data;
            }else{
              this.$dialog.toast({
                mes: '通过搜索条件未查找到数据',
                timeout: 1500
              });
            }
          }else{
            this.$dialog.toast({
              mes: response.data.message,
              timeout: 1500
            });
          }
        });
      },
      clickHander(item) {
        this.SAVE_MODEL(item);
        this.$router.replace({path:'/car-info'});
      }
    }
  }

</script>
