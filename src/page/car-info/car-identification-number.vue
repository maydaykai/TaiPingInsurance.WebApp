<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-flexbox v-bind:style="{ margin: '2rem 0 .25rem','text-align':'center','font-size':'20px','font-weight':'100' }">
      <yd-flexbox-item>输入车辆识别代号(VIN)</yd-flexbox-item>
    </yd-flexbox>
    <yd-flexbox v-bind:style="{ margin: '0 0 1rem','text-align':'center','font-size':'6px','color':'#ffa600' }">
      <yd-flexbox-item @click.native="frameNoDialog = true">什么是车辆识别代号(VIN)?</yd-flexbox-item>
      <yd-popup v-model="frameNoDialog" position="center" width="90%">
        <p style="color:#F00;margin-top: 10px;">
          打开行驶证，下图红框处为车辆识别代号(VIN码)，共17位字母/数字。
          </p><img src="../../assets/images/vehicleLic.png" width="100%"/>
        <p style="text-align: center;margin-top: .25rem">
          <yd-button @click.native="frameNoDialog = false">关闭</yd-button>
        </p>
      </yd-popup>
    </yd-flexbox>
    <yd-cell-group>
      <yd-cell-item>
        <yd-input slot="right" required v-model="frameNo" ref="frameNo" min="17" max="17" regex="^[A-Za-z0-9]+$" placeholder="请输入车辆识别代号"></yd-input>
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
        title:'车辆识别代号', // 标题
        frameNoDialog:false,
        frameNo:'',
      }
    },
    watch: {
      frameNo: function (val, oldVal) {
        if(val){
          this.frameNo = val.toUpperCase();
        }
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
      clickHander() {
        const input = this.$refs.frameNo;
        if(!input.valid){
          this.$dialog.toast({
            mes: '车辆识别代号'+input.errorMsg,
            timeout: 1500
          });
          return;
        }
        this.$dialog.loading.open('很快加载好了');
        this.SAVE_FRAME_NUMBER(this.frameNo);
        this.$router.go(-1);
        this.$dialog.loading.close();

      }
    }
  }

</script>
