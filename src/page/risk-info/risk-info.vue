<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group v-bind:style="{ margin: '1rem 0 .25rem' }">
      <yd-cell-item>
        <span slot="right"></span>
        <span slot="left" v-model="plateNo">{{ plateNo }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="保险起期">
      <yd-cell-item>
        <span slot="left">交强险/车船税：</span>
        <yd-switch slot="right" v-model="baseInsureSwitch"></yd-switch>
      </yd-cell-item>
      <yd-cell-item v-show="baseInsureSwitch" arrow>
        <span slot="left">生效日期：</span>
        <yd-datetime type="date" v-model="baseBeginDate" :startDate="lastYearDate" :endDate="nowDate" slot="right">请选择生效日期</yd-datetime>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">商业险：</span>
        <yd-switch slot="right" v-model="businessInsureSwitch"></yd-switch>
      </yd-cell-item>
      <yd-cell-item v-show="businessInsureSwitch" arrow>
        <span slot="left">生效日期：</span>
        <yd-datetime type="date" v-model="businessBeginDate" :startDate="lastYearDate" :endDate="nowDate" slot="right">请选择生效日期</yd-datetime>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="商业险套餐" v-show="businessInsureSwitch">
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageA" :size="checkboxSize">车辆损失险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageMA" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageB" :size="checkboxSize">第三者责任险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageMB" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item arrow type="label">
            <select slot="right" v-model="coverageAmountB">
              <option value="5000000">5万</option>
              <option value="10000000">10万</option>
              <option value="20000000">20万</option>
              <option value="30000000">30万</option>
              <option value="50000000">50万</option>
              <option value="100000000">100万</option>
              <option value="150000000">150万</option>
              <option value="200000000">200万</option>
            </select>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageD3" :size="checkboxSize">司机责任险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageMD3" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item arrow type="label">
            <select slot="right" v-model="coverageAmountD3">
              <option value="1000000">1万</option>
              <option value="2000000">2万</option>
              <option value="3000000">3万</option>
              <option value="4000000">4万</option>
              <option value="5000000">5万</option>
              <option value="10000000">10万</option>
              <option value="20000000">20万</option>
            </select>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageD4" :size="checkboxSize">乘客责任险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageMD4" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item arrow type="label">
            <select slot="right" v-model="coverageAmountD4">
              <option value="1000000">1万/座</option>
              <option value="2000000">2万/座</option>
              <option value="3000000">3万/座</option>
              <option value="4000000">4万/座</option>
              <option value="5000000">5万/座</option>
              <option value="10000000">10万/座</option>
              <option value="20000000">20万/座</option>
            </select>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageG1" :size="checkboxSize">全车盗抢险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageMG1" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
    </yd-cell-group>
    <yd-cell-group  v-show="businessInsureSwitch">
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">玻璃破碎险</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item arrow type="label">
            <select slot="right" v-model="ff">
              <option value="0">国产</option>
              <option value="1">进口</option>
            </select>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">自燃损失险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">车身划痕险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item arrow type="label">
            <select slot="right">
              <option value="200000">2000</option>
              <option value="500000">5000</option>
              <option value="1000000">10000</option>
              <option value="2000000">20000</option>
            </select>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">涉水险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">指定专修厂</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="checkbox1" :size="checkboxSize">车损无法找到第三方</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
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
  import {getStore, setStore, goTop} from '@/config/mUtils'
  import getcity from '@/service/tempdata/home'

  export default {
    data(){
      let now = new Date();
      let nowDate = now.toLocaleDateString();
      let lastYearDate = new Date(now.setFullYear(now.getFullYear() - 1)).toLocaleDateString();
      return{
        title:'选择套餐', // 标题
        checkboxSize: 13,
        plateNo:'', // 车牌号码
        baseInsureSwitch:true, // 交强险
        businessInsureSwitch:true, // 商业险
        baseBeginDate:nowDate,
        businessBeginDate:nowDate,
        insuredSwitch: true,
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      this.$destroy()
      next()
    },

    mounted(){
      goTop();
      let hasPlateNo = getStore('hasPlateNo');
      if(hasPlateNo === "false"){
        this.plateNo ="新车未上牌";
      }else if (getStore('plateNo')) {//获取车牌号码
        this.plateNo = getStore('plateNo');
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

        this.$router.push({path:'/quoted-price'});
        this.$dialog.loading.close();

      }
    }
  }

</script>
