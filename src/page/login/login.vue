<template>
  <yd-layout>
    <head-top :head-title="title"></head-top>
    <yd-cell-group :style="{ margin: '.5rem 0 .25rem' }">
      <yd-cell-item>
        <span slot="left">手机号码：</span>
        <yd-input slot="right" type="tel" required v-model="mobile" regex="mobile" ref="mobile" placeholder="请输入手机号码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" type="password" required v-model="password" min="6" max="16" ref="password" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" @click.native="clickHander">立即登录</yd-button>
    </yd-button-group>
  </yd-layout>
</template>
<script>
  import headTop from "@/components/header/backHead"
  import footGuide from "@/components/footer/footGuide"
  import {getStore, setStore, YDUIFormValidate} from '@/config/mUtils'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      return{
        title:'登录', // 标题
        mobile:'18823770328',//手机号码
        password:'770328',//密码
        returnUrl:'',
      }
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      this.$destroy();
      next()
    },
    mounted(){
      this.returnUrl = this.$route.query.returnUrl;
    },
    components:{
      headTop,
      footGuide
    },
    computed:{
      ...mapState([
        'plateNo','orderNo','identifyNumber'
      ]),
    },

    methods:{
      sendCode() {
        this.$dialog.loading.open('发送中...');
        setTimeout(() => {

          this.start = true;
          this.$dialog.loading.close();

          this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 1500
          });
        }, 1000);
      },
      clickHander() {
        let validate = YDUIFormValidate(this.$refs);
        if(!validate)return;
        var url = "token";
        var loginInfo = {
          username: this.mobile,
          password: this.password,
          grant_type: 'password'
        };
        this.$http.post(url,loginInfo).then(response => {
          console.log(response);
          if(response.data){
            window.localStorage.setItem('token',response.data.access_token);
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: '登录成功',
              icon: 'success',
              timeout: 1500,
              callback: function(){
                if(this.returnUrl){
                  this.$router.push({path:this.returnUrl});
                }else{
                  this.$router.push({path:'/order-list'});
                }
              }
            });
            if(this.returnUrl){
              this.$router.push({path:this.returnUrl});
            }else{
              this.$router.push({path:'/order-info'});
            }
          }else{
            this.$dialog.toast({
              mes: response.data.message,
              timeout: 1500
            });
          }
        });
      }
    }
  }

</script>
