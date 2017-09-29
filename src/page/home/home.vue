<template>
  <div>
    <head-top :head-title="cityname"></head-top>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">yueB：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车辆信息" v-show="nextStep">
      <yd-cell-item>
        <span slot="left">车辆识别代号：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">车型/价格：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">座位数：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">发动机号：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">注册日期：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <div slot="left">是否一年内过户车：</div>
        <yd-switch slot="right" v-model="ydswitch"></yd-switch>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车主信息" v-show="nextStep">
      <yd-cell-item>
        <span slot="left">车主姓名：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车主姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证号：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入身份证号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号码：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入手机号码"></yd-input>
      </yd-cell-item>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" size="30">啦啦啦啦</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" size="30">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-cell-item arrow>
          <select slot="right">
            <option value="">支付方式</option>
            <option value="1">支付宝</option>
            <option value="2">微信</option>
            <option value="3">财付通</option>
          </select>
          </yd-cell-item>
        </yd-flexbox-item>
      </yd-flexbox>

    </yd-cell-group>
    <yd-button-group>
      <yd-button v-if="!nextStep" size="large" @click.native="clickHander">立即查价</yd-button>
      <yd-button v-else size="large" @click.native="clickHander">下一步</yd-button>
    </yd-button-group>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import headTop from "@/components/header/head"
  import footGuide from "@/components/footer/footGuide"
  import {currentcity, searchplace, groupcity} from '@/service/getData'
  import {getStore, setStore} from '@/config/mUtils'
  import getcity from '@/service/tempdata/home'

  export default {
    data(){
      return{
        inputVaule:'', // 搜索地址
        cityid:'', // 当前城市id
        cityname:'', // 当前城市名字
        placelist:[], // 搜索城市列表
        placeHistory:[], // 历史搜索记录
        historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeNone: false, // 搜索无结果，显示提示信息
        input1:'',
        input2:'',
        nextStep: false,
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

    },

    methods:{
      //发送搜索信息inputVaule
      postpois(){
        //输入值不为空时才发送信息
        if (this.inputVaule) {
          searchplace(this.cityid, this.inputVaule).then(res => {
            this.historytitle = false;
            this.placelist = res;
            this.placeNone = res.length? false : true;
          })
        }
      },
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      nextpage(index, geohash){
        let history = getStore('placeHistory');
        let choosePlace = this.placelist[index];
        if (history) {
          let checkrepeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(item => {
            if (item.geohash == geohash) {
              checkrepeat = true;
            }
          })
          if (!checkrepeat) {
            this.placeHistory.push(choosePlace)
          }
        }else {
          this.placeHistory.push(choosePlace)
        }
        setStore('placeHistory',this.placeHistory)
        this.$router.push({path:'/msite', query:{geohash}})
      },
      clickHander() {
        this.$dialog.loading.open('很快加载好了');

        setTimeout(() => {
          this.nextStep = true;
          this.$dialog.loading.close();
        }, 2000);

      }
    }
  }

</script>
