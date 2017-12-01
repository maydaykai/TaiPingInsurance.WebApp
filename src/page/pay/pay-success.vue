<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-flexbox v-bind:style="{ margin: '1rem 0 .25rem','text-align':'center','font-size':'6px','color':'#42b983' }">
      <yd-flexbox-item>
          <yd-icon name="checkoff"></yd-icon>
          <span>付款成功</span>
      </yd-flexbox-item>
    </yd-flexbox>
    <yd-flexbox v-bind:style="{ 'text-align':'center','font-size':'6px','color':'#42b983' }">
      <yd-flexbox-item>
          <yd-countdown :time="3" format="{%s}秒" done-text="0秒" timetype="second" :callback="doneCallBack"></yd-countdown>
          <span>后跳转到<router-link to="/order-list">这里</router-link></span>
      </yd-flexbox-item>
    </yd-flexbox>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"

  export default {
    data(){
      return{
        title:'跳转中', // 标题
      }
    },
    components:{
      headTop,
      footGuide
    },
    methods:{
        doneCallBack(){
            this.$router.replace({path:"/order-list"});
        },
    },
  }

</script>
