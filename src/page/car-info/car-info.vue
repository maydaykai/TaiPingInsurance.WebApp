<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group :style="{ margin: '1rem 0 .25rem' }">
      <yd-cell-item>
        <span slot="right"></span>
        <span slot="left" v-model="plateNo">{{ plateNo }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车主信息">
      <yd-cell-item>
        <span slot="left">车主姓名：</span>
        <yd-input slot="right" required v-model="ownerName" ref="ownerName" min="2" max="5" placeholder="请输入车主姓名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">身份证号：</span>
        <yd-input slot="right" required v-model="ownerIdentity" ref="ownerIdentity" min="15" max="18" regex="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" placeholder="请输入身份证号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号码：</span>
        <yd-input slot="right" required v-model="ownerMobile" ref="ownerMobile" regex="mobile" placeholder="请输入手机号码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车辆信息">
      <yd-cell-item arrow type="link" href="car-identification-number">
        <span slot="left">车辆识别代号：</span>
        <span slot="right" v-model="frameNo">{{frameNo}}</span>
      </yd-cell-item>
      <yd-cell-item arrow type="link" href="car-model">
        <span slot="left">车型/价格：</span>
        <span slot="right" v-model="frameNo">{{frameNo}}<br />{{frameNo}}</span><br /><span slot="right" v-model="frameNo">{{frameNo}}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">座位数：</span>
        <yd-input slot="right" type="number" required v-model="seat" placeholder="请输入座位数"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">发动机号：</span>
        <yd-input slot="right" required v-model="engineNo" ref="engineNo" min="5" max="20" placeholder="请输入发动机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left">注册日期：</span>
        <yd-datetime type="date" v-model="registerDate" startDate="2000-01-01" :endDate="nowDate" slot="right"></yd-datetime>
      </yd-cell-item>
      <yd-cell-item>
        <div slot="left">是否一年内过户车：</div>
        <yd-switch slot="right" v-model="transferSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="transferSwitch">
        <yd-cell-item arrow>
          <span slot="left">过户日期：</span>
          <yd-datetime type="date" v-model="transferDate" :startDate="lastYearDate" :endDate="nowDate" slot="right">请选择过户日期</yd-datetime>
        </yd-cell-item>
      </div>
    </yd-cell-group>
    <yd-cell-group title="投保人与被保险人">
      <yd-cell-item>
        <div slot="left">投保人同车主</div>
        <yd-switch slot="right" v-model="insureSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="!insureSwitch">
        <yd-cell-item>
          <span slot="left">投保人：</span>
          <yd-input slot="right" v-model="insureName" min="2" max="6" placeholder="请输入投保人姓名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">身份证号：</span>
          <yd-input slot="right" v-model="insureIdentity" regex="^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$" placeholder="请输入身份证号"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码：</span>
          <yd-input slot="right" v-model="insureMobile" regex="mobile" placeholder="请输入手机号码"></yd-input>
        </yd-cell-item>
      </div>
        <yd-cell-item>
          <div slot="left">被保险人同车主</div>
          <yd-switch slot="right" v-model="insuredSwitch"></yd-switch>
        </yd-cell-item>
        <div v-show="!insuredSwitch">
          <yd-cell-item >
            <span slot="left">被保险人：</span>
            <yd-input slot="right" :required="!insuredSwitch" v-model="insuredName" max="6" placeholder="请输入被保险人姓名"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">身份证号：</span>
            <yd-input slot="right" :required="!insuredSwitch" v-model="insuredIdentity" regex="^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$" placeholder="请输入身份证号"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">手机号码：</span>
            <yd-input slot="right" :required="!insuredSwitch" v-model="insuredMobile" regex="mobile" placeholder="请输入手机号码"></yd-input>
          </yd-cell-item>
      </div>
    </yd-cell-group>

    <yd-cell-group title="是否为按揭车">
      <yd-cell-item>
        <div slot="left">是否为按揭车</div>
        <yd-switch slot="right" v-model="loanSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="loanSwitch">
        <yd-cell-item >
          <span slot="left">受益人：</span>
          <yd-input slot="right" v-model="beneficiaries" min="2" max="6" placeholder="请输入受益人姓名"></yd-input>
        </yd-cell-item>
      </div>
      </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">下一步</yd-button>
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
      let now = new Date();
      let nowDate = now.toLocaleDateString();
      let lastYearDate = new Date(now.setFullYear(now.getFullYear() - 1)).toLocaleDateString();
      return{
        nowDate: nowDate,
        lastYearDate:lastYearDate,
        title:'信息填写', // 标题
        plateNo:'', // 车牌号码
        //frameNo:'', //车辆识别号
        seat:0, //座位数
        engineNo:'', //发动机号
        nextStep: false,
        registerDate: nowDate,
        transferSwitch: false,//是否一年内过户车
        transferDate: nowDate,//过户日期
        ownerName:'',//车主姓名
        ownerIdentity:'',//车主身份证号
        ownerMobile:'',//车主手机号码
        insureSwitch: true,//投保人同车主
        insureName:'',//投保人姓名
        insureIdentity:'',//投保人身份证号
        insureMobile:'',//投保人手机号码
        insuredSwitch: true,//投保人同车主
        insuredName:'',//被保人姓名
        insuredIdentity:'',//被保人身份证号
        insuredMobile:'',//被保人手机号码
        loanSwitch: false,//投保人同车主
        beneficiaries:'',//被保人手机号码
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      console.log(to.path.indexOf("home"));
      if(to.path.indexOf("home") > -1) {
        this.$destroy()
      }
      next()
    },
    mounted(){
      let hasPlateNo = getStore('hasPlateNo');
      console.log(hasPlateNo);
      if(hasPlateNo === "false"){
        this.plateNo ="暂未上牌";
      }else if (getStore('plateNo')) {//获取车牌号码
        this.plateNo = getStore('plateNo');
      }
    },

    components:{
      headTop,
      footGuide
    },

    computed:{
      ...mapState([
        'frameNo',
      ]),
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
        let validate = this.YDUIFormValidate(this.$refs);
        if(!validate)return;
        this.$dialog.loading.open('很快加载好了');

        this.$router.push({path:'/risk-info'});
        this.$dialog.loading.close();

      },
      YDUIFormValidate(refObj) {
        for(var item in refObj){
          let obj = refObj[item];
          if(!obj.valid){
            this.$dialog.toast({
              mes: (obj.placeholder ? obj.placeholder.replace('请输入','').replace('请选择','') : '')+obj.errorMsg,
              timeout: 1500
            });
            return false;
          }
        }
        return true;
      }
    }
  }

</script>
