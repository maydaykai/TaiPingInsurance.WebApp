<template>
  <yd-layout>
    <head-top :head-title="cityname"></head-top>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">粤B：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="车辆信息" v-show="nextStep">
      <yd-cell-item>
        <span slot="left">车辆识别代号：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车辆识别代号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">车型/价格：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入车牌号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">座位数：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入座位数"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">发动机号：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入发动机号"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">注册日期：</span>
        <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入注册日期"></yd-input>
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
    <yd-cell-group title="投保人与被保险人" v-show="nextStep">
      <yd-cell-item>
        <div slot="left">投保人同车主</div>
        <yd-switch slot="right" v-model="insuredSwitch"></yd-switch>
      </yd-cell-item>
      <div v-show="!insuredSwitch">
        <yd-cell-item >
          <span slot="left">投保人：</span>
          <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入投保人姓名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">身份证号：</span>
          <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入身份证号"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">手机号码：</span>
          <yd-input slot="right" required v-model="input1" min="5" max="5" placeholder="请输入手机号码"></yd-input>
        </yd-cell-item>
      </div>
    </yd-cell-group>
    <yd-button-group>
      <yd-button v-if="!nextStep" size="large" @click.native="clickHander">立即查价</yd-button>
      <yd-button v-else size="large" @click.native="clickHander">下一步</yd-button>
    </yd-button-group>
  </yd-layout>
</template>
