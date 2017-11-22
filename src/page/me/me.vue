<template>
  <yd-layout>
    <head-top :head-title="title" go-back="false"></head-top>
    <yd-grids-group :rows="1" style="height: 100px;margin: .5rem 0 .25rem">
      <yd-grids-item>
      </yd-grids-item>
      <yd-grids-item>
        <yd-icon slot="icon" name="ucenter-outline" size="1rem" color="#f44336"></yd-icon>
        <span slot="text">image</span>
      </yd-grids-item>      
    </yd-grids-group>
    <div>
    <yd-flexbox direction="vertical">
        <yd-flexbox-item>欢迎您：{{isLogin}}</yd-flexbox-item>
        <yd-flexbox-item>欢迎您：{{isLogin}}</yd-flexbox-item>
        <yd-flexbox-item>欢迎您：{{isLogin}}</yd-flexbox-item>
    </yd-flexbox>
    </div>
    <yd-cell-group>
      <yd-cell-item arrow type="link" href="/order-list">
        <yd-icon slot="icon" name="order" size=".42rem" color="#f44336"></yd-icon>
        <span slot="left">我的订单</span>
        <span slot="right">查看全部订单</span>
      </yd-cell-item>
      <yd-cell-item>

      </yd-cell-item>
    </yd-cell-group>
    <yd-button-group>
      <yd-button size="large" type="danger" @click.native="clickHander">注销当前用户</yd-button>
    </yd-button-group>
  </yd-layout>
</template>

<script>
  import headTop from "@/components/header/backHead"
  import {getStore, setStore, goTop} from '@/config/mUtils'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      return{
        title:'个人中心', // 标题
        isLogin:false,
        list: [

        ],
      }
    },

    //通过路由的before钩子解除router-view缓存限制
    beforeRouteLeave(to, from, next){
      if(to.path.indexOf("login") > -1) {
        this.$destroy()
      }
      next()
    },
    mounted(){
      if(!window.localStorage.getItem('token')){
        this.$router.replace({path:'/login'});
      }
    },

    components:{
      headTop
    },

    computed:{
      ...mapState([
        'orderNo'
      ]),
    },

    methods:{
      clickHander() {
        this.$dialog.confirm({
          title: '注销登录',
          mes: '您确定要注销当前登录用户吗？',
          opts: () => {
            this.logout();
          }
        });
      },
      logout() {
        window.localStorage.removeItem('token');
        this.$router.replace({path:'/login'});
      },
    }
  }
</script>
