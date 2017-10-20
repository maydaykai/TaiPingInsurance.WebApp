<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
      <yd-list theme="4" :style="{ margin: '1rem 0 .25rem' }">
        <yd-list-item v-for="item in imgList" key="title" type="a" href="javascript:;" @click.native="clickHander(item.title)">
          <img slot="img" :src="item.img" style="height:20px;">
          <span slot="title">{{item.title}}</span>
          <yd-list-other slot="other">
            <div>
              <span class="list-price"><em>参考价：</em>{{item.price}}</span>
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
        imgList: [
          {img: "//img1.shikee.com/try/2016/06/23/14381920926024616259.jpg", title: "东风日产EQ7204AC 2.0L 天籁 CVT 2011款 XL 5座 ", price: 156.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/21/10172020923917672923.jpg", title: "东风日产EQ7204AC 2.0L 天籁 CVT 2011款 XL 5座 ", price: 256.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/23/15395220917905380014.jpg", title: "东风日产EQ7204AC 2.0L 天籁 CVT 2011款 XL 5座 ", price: 356.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/25/14244120933639105658.jpg", title: "东风日产EQ7204AC 2.0L 天籁 CVT 2011款 XL 5座 ", price: 456.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/26/12365720933909085511.jpg", title: "东风日产EQ7204AC 2.0L 天籁 CVT 2011款 XL 5座 ", price: 556.23, w_price: 89.36},
          {img: "//img1.shikee.com/try/2016/06/19/09430120929215230041.jpg", title: "东风日产EQ7204AC 2.0L 天籁 CVT 2011款 XL 5座 ", price: 656.23, w_price: 89.36}
        ]
      }
    },
    mounted(){

    },

    components:{
      headTop,
      footGuide
    },

    computed:{
    },

    methods:{
      ...mapMutations([
        'SAVE_FRAME_NUMBER'
      ]),
      clickHander(title) {
        console.log(title);
        this.$router.replace({path:'/car-info'})
      }
    }
  }

</script>
