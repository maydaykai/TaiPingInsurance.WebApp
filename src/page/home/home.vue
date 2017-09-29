<template>
  <div class="city_container">
    <head-top :head-title="cityname">
      <router-link to="/city" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
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
      <yd-flexbox>
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
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
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

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .city_container{
    padding-top: 2.35rem;
  }
  .change_city{
    right: 0.4rem;
    @include sc(0.6rem, #fff);
    @include ct;
  }
  .city_form{
    background-color: #fff;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-top: 0.4rem;
    div{
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .input_style{
        border-radius: 0.1rem;
        margin-bottom: 0.4rem;
        @include wh(100%, 1.4rem);
      }
      .city_input{
        border: 1px solid $bc;
        padding: 0 0.3rem;
        @include sc(0.65rem, #333);
        width:80%;
        float: left;
      }
      .city_submit{
        background-color: $blue;
        @include sc(0.65rem, #fff);
      }
      label{
        width:20%;
        float: left;
      }
    }
  }
  .pois_search_history{
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-left: 0.5rem;
    @include font(0.475rem, 0.8rem);
  }
  .getpois_ul{
    background-color: #fff;
    border-top: 1px solid $bc;
    li{
      margin: 0 auto;
      padding-top: 0.65rem;
      border-bottom: 1px solid $bc;
      .pois_name{
        margin: 0 auto 0.35rem;
        width: 90%;
        @include sc(0.65rem, #333);
      }
      .pois_address{
        width: 90%;
        margin: 0 auto 0.55rem;
        @include sc(0.45rem, #999);
      }
    }
  }
  .search_none_place{
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
  }
</style>
