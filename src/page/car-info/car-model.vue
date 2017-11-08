<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-flexbox v-bind:style="{ margin: '2rem 0 .25rem','text-align':'center','font-size':'20px','font-weight':'100' }">
      <yd-flexbox-item>请输入品牌型号获取车型</yd-flexbox-item>
    </yd-flexbox>
    <yd-flexbox v-bind:style="{ margin: '0 0 1rem','text-align':'center','font-size':'6px','color':'#ffa600' }">
      <yd-flexbox-item @click.native="frameNoDialog = true">什么是品牌型号?</yd-flexbox-item>
      <yd-popup v-model="frameNoDialog" position="center" width="90%">
        <p style="color:#F00;margin-top: 10px;">
          打开行驶证，下图红框处为车辆品牌型号。
        </p><img src="../../assets/images/brand_model.png" width="100%"/>
        <p style="text-align: center;margin-top: .25rem">
          <yd-button @click.native="frameNoDialog = false">关闭</yd-button>
        </p>
      </yd-popup>
    </yd-flexbox>
    <yd-cell-group>
      <yd-cell-item>
        <yd-input slot="right" required v-model="modelNo" ref="modelNo" placeholder="请输入车辆品牌型号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">确认</yd-button>
    </yd-button-group>
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
        frameNoDialog:false,
        modelNo:'',
      }
    },
    mounted(){
      this.modelNo = this.modelName;
    },

    components:{
      headTop,
      footGuide
    },

    computed:{
      ...mapState([
        'modelName'
      ]),
    },

    methods:{
    }
  }

</script>
