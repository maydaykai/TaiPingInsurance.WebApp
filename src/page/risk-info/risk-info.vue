<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group v-bind:style="{ margin: '.5rem 0 .25rem' }">
      <yd-cell-item>
        <span slot="right"></span>
        <span slot="left">{{ plateNo }}</span>
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
              <option value="50000">5万</option>
              <option value="100000">10万</option>
              <option value="200000">20万</option>
              <option value="300000">30万</option>
              <option value="500000">50万</option>
              <option value="1000000">100万</option>
              <option value="1500000">150万</option>
              <option value="2000000">200万</option>
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
              <option value="10000">1万</option>
              <option value="20000">2万</option>
              <option value="30000">3万</option>
              <option value="40000">4万</option>
              <option value="50000">5万</option>
              <option value="100000">10万</option>
              <option value="200000">20万</option>
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
        <div style="width:23%">
          <yd-cell-item arrow type="label">
            <select slot="right" v-model="coverageAmountD4">
              <option value="10000">1万/座</option>
              <option value="20000">2万/座</option>
              <option value="30000">3万/座</option>
              <option value="40000">4万/座</option>
              <option value="50000">5万/座</option>
              <option value="100000">10万/座</option>
              <option value="200000">20万/座</option>
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
          <yd-checkbox v-model="coverageF" :size="checkboxSize">玻璃破碎险</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item arrow type="label">
            <select slot="right" v-model="coverageTypeF">
              <option value="0">国产</option>
              <option value="1">进口</option>
            </select>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageZ" :size="checkboxSize">自燃损失险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageMZ" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageL" :size="checkboxSize">车身划痕险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageML" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item arrow type="label">
            <select slot="right" v-model="coverageAmountL">
              <option value="2000">2000</option>
              <option value="5000">5000</option>
              <option value="10000">10000</option>
              <option value="20000">20000</option>
            </select>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageX1" :size="checkboxSize">涉水险</yd-checkbox>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageMX1" :size="checkboxSize">不计免赔</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageQ3" :size="checkboxSize">指定专修厂</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
      <yd-flexbox v-bind:style="{'margin-left': '5%'}">
        <yd-flexbox-item>
          <yd-checkbox v-model="coverageZ3" :size="checkboxSize">车损无法找到第三方</yd-checkbox>
        </yd-flexbox-item>
        <div style="width:20%">
          <yd-cell-item>
            <span slot="right">投保</span>
          </yd-cell-item>
        </div>
      </yd-flexbox>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander" :disabled="!baseInsureSwitch && !businessInsureSwitch">下一步</yd-button>
    </yd-button-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"
  import {YDUIFormValidate, goTop} from '@/config/mUtils'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      let now = new Date();
      let nowDate = now.toLocaleDateString();
      let lastYearDate = new Date(now.setFullYear(now.getFullYear() - 1)).toLocaleDateString();
      return{
        title:'选择套餐', // 标题
        nowDate:nowDate,
        lastYearDate:lastYearDate,
        checkboxSize: 13,
        baseInsureSwitch:true, // 交强险
        businessInsureSwitch:true, // 商业险
        baseBeginDate:nowDate,// 交强险生效日期
        businessBeginDate:nowDate,// 商业险生效日期
        coverageA: true,// 车辆损失险
        coverageMA: true,// 车辆损失险 不计免赔
        coverageB: true,// 第三者责任险
        coverageMB: true,// 第三者责任险 不计免赔
        coverageAmountB: 200000,// 第三者责任险 金额
        coverageD3: true,// 司机责任险
        coverageMD3: true,// 司机责任险 不计免赔
        coverageAmountD3: 30000,// 司机责任险 金额
        coverageD4: true,// 乘客责任险
        coverageMD4: true,// 乘客责任险 不计免赔
        coverageAmountD4: 30000,// 乘客责任险 金额
        coverageG1: true,// 全车盗抢险
        coverageMG1: true,// 全车盗抢险 不计免赔
        coverageF: true,// 玻璃破碎险
        coverageTypeF: "0",// 玻璃破碎险 类型
        coverageZ: true,// 自燃损失险
        coverageMZ: true,// 自燃损失险 不计免赔
        coverageL: true,// 车身划痕险
        coverageML: true,// 车身划痕险 不计免赔
        coverageAmountL: 30000,// 车身划痕险 金额
        coverageX1: true,// 涉水险
        coverageMX1: true,// 涉水险 不计免赔
        coverageQ3: true,// 指定专修厂
        coverageZ3: true,// 车损无法找到第三方
      }
    },
    watch: {
      coverageA:function(){
        if(!this.coverageA){
          this.coverageMA = this.coverageA;
        }
      },
      coverageB:function(){
        if(!this.coverageB){
          this.coverageMB = this.coverageB;
        }
      },
      coverageD3:function(){
        if(!this.coverageD3){
          this.coverageMD3 = this.coverageD3;
        }
      },
      coverageD4:function(){
        if(!this.coverageD4){
          this.coverageMD4 = this.coverageD4;
        }
      },
      coverageG1:function(){
        if(!this.coverageG1){
          this.coverageMG1 = this.coverageG1;
        }
      },
      coverageZ:function(){
        if(!this.coverageZ){
          this.coverageMZ = this.coverageZ;
        }
      },
      coverageL:function(){
        if(!this.coverageL){
          this.coverageML = this.coverageL;
        }
      },
      coverageX1:function(){
        if(!this.coverageX1){
          this.coverageMX1 = this.coverageX1;
        }
      },
    },
    mounted(){
      goTop();
    },

    components:{
      headTop,
      footGuide
    },

    computed:{
      ...mapState({
        plateNo(state){
          if(!state.plateNo){
            this.INIT_PLATE_NUMBER();
          }
          return state.plateNo;
        },orderNo(state){
          if(!state.orderNo){
            this.INIT_ORDER_NUMBER();
          }
          return state.orderNo;
        }
      }),
    },

    methods:{
      ...mapMutations([
        'INIT_PLATE_NUMBER','INIT_ORDER_NUMBER','SAVE_QUOTED_PRICE'
      ]),
      clickHander() {
        let validate = YDUIFormValidate(this.$refs);
        if(!validate)return;

        var url = "premiumCalculate";
        var bsList = this.getBsList();
        console.log(bsList);
        var risk = this.getRiskList();
        console.log(risk);

        var orderInfo = {
          orderNo: this.orderNo
        };
        var premiumCalculateInfo = {
          order: orderInfo,
          bsList: bsList,
          risk: risk
        };
        this.$http.post(url,premiumCalculateInfo).then(response => {
          console.log(response);
          if(response.data.success ==="true"){
            var data = JSON.parse(response.data.data);
            this.SAVE_QUOTED_PRICE(data);
            this.$router.push({path:'/quoted-price'});
          }else{
            this.$dialog.toast({
              mes: response.data.message,
              timeout: 1500
            });
          }
        });        
      },
      getBsList(){
        var bsList = new Array();
        if(this.coverageA){
          let item = {
            kindCode: "01",
            relatedInd: this.coverageMA ? "1" : "0",
            insured: 0,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageB){
          let item = {
            kindCode: "02",
            relatedInd: this.coverageMB ? "1" : "0",
            insured: this.coverageAmountB,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageD3){
          let item = {
            kindCode: "041",
            relatedInd: this.coverageMD3 ? "1" : "0",
            insured: this.coverageAmountD3,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageD4){
          let item = {
            kindCode: "044",
            relatedInd: this.coverageMD4 ? "1" : "0",
            insured: this.coverageAmountD4,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageG1){
          let item = {
            kindCode: "03",
            relatedInd: this.coverageMG1 ? "1" : "0",
            insured: 0,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageF){
          let item = {
            kindCode: "11",
            relatedInd: "0",
            insured: 0,
            quantity: 0,
            glassType: this.coverageTypeF
          };
          bsList.push(item);
        }
        if(this.coverageZ){
          let item = {
            kindCode: "13",
            relatedInd: this.coverageMZ ? "1" : "0",
            insured: 0,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageL){
          let item = {
            kindCode: "21",
            relatedInd: this.coverageML ? "1" : "0",
            insured: this.coverageAmountL,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageX1){
          let item = {
            kindCode: "23",
            relatedInd: this.coverageMX1 ? "1" : "0",
            insured: 0,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageQ3){
          let item = {
            kindCode: "31",
            relatedInd: "0",
            insured: 0,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        if(this.coverageZ3){
          let item = {
            kindCode: "51",
            relatedInd: "0",
            insured: 0,
            quantity: 0,
            glassType: ""
          };
          bsList.push(item);
        }
        return bsList;
      },
      getRiskList(){
        var risk = new Array();
        if(this.baseInsureSwitch){
          let item = {
            startDate: this.baseBeginDate,
            riskCode: "BZ"
          };
          risk.push(item);
        }
        if(this.businessInsureSwitch){
          let item = {
            startDate: this.businessBeginDate,
            riskCode: "BS"
          };
          risk.push(item);
        }
        return risk;
      }
    }
  }

</script>
