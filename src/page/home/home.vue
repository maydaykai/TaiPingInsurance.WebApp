<template>
  <yd-layout>
    <head-top :head-title="cityname" :go-back=false></head-top>
    <yd-cell-group :style="{ margin: '.5rem 0 .25rem' }">
      <yd-cell-item>
        <div slot="left">是否未上牌</div>
        <yd-switch slot="right" v-model="plateSwitch"></yd-switch>
      </yd-cell-item>
      <yd-cell-item v-show="!plateSwitch">
        <span slot="left">{{platePre}}：</span>
        <yd-input slot="right" required v-model="plateNo" ref="plateNo" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">立即查价</yd-button>
    </yd-button-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"
  import {currentcity, searchplace, groupcity} from '@/service/getData'
  import {getStore, setStore} from '@/config/mUtils'
  import getcity from '@/service/tempdata/home'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      return{
        cityid:'', // 当前城市id
        cityname:'', // 当前城市名字
        plateNo:'8903V',
        plateSwitch: false,
        platePre: "粤B",
      }
    },
    watch: {
      plateNo: function (val, oldVal) {
        if(val){
          this.plateNo = val.toUpperCase();
        }
      }
    },

    mounted(){
      this.cityid = this.$route.params.cityid;
      console.log(this.cityid);
      if(this.cityid){
        groupcity().then(o => {
          this.cityname = o.S.find(p => p.id==this.cityid).name;
          console.log(this.cityname);
        })
      }else{
        //获取当前城市名字
        currentcity(this.cityid).then(res => {
          this.cityname = res.name;
          console.log(this.cityname);
        })
      }
      //获取搜索历史记录
      if (getStore('placeHistory')) {
        this.placelist = JSON.parse(getStore('placeHistory'));
      }
    },

    components:{
      headTop,
      footGuide
    },

    computed:{
      ...mapState([
        'frameNo','modelName'
      ]),

    },
    methods:{
      ...mapMutations([
        'SAVE_HAS_PLATE_NUMBER','SAVE_PLATE_NUMBER','SAVE_MODEL_NAME'
      ]),
      clickHander() {
        const input = this.$refs.plateNo;
        let hasPlateNo = !this.plateSwitch;
        if(hasPlateNo && !input.valid){
          this.$dialog.toast({
            mes: '车牌号'+input.errorMsg,
            timeout: 1500
          });
          return;
        }
        let plateNo = this.platePre + this.plateNo;
        this.SAVE_HAS_PLATE_NUMBER(hasPlateNo);
        this.SAVE_PLATE_NUMBER(plateNo);
        var url = "judgeQuotetion";
        this.$http.get(url,{
          params: {
            licenseNo: plateNo
          }
        }).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            var data = JSON.parse(response.data.data);
            if(data.status){
              this.SAVE_MODEL_NAME(data.brandName);
              this.$router.push({path:'/car-owner'});              
            }else{
              this.$router.push({path:'/car-info'});
            }
          }else{
          }
        });
      },
    }
  }

</script>
