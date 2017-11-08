<template>
  <!--<header id='head_top'>-->
  <!--<slot name='logo'></slot>-->
  <!--<slot name='search'></slot>-->
  <!--<section class="head_goback" v-if="goBack" @click="$router.go(-1)">-->
  <!--<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">-->
  <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>-->
  <!--</svg>-->
  <!--</section>-->
  <!--<router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">-->
  <!--<svg class="user_avatar" v-if="userInfo">-->
  <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>-->
  <!--</svg>-->
  <!--<span class="login_span" v-else>登陆|注册</span>-->
  <!--</router-link>-->
  <!--<section class="title_head ellipsis" v-if="headTitle">-->
  <!--<span class="title_text">{{headTitle}}</span>-->
  <!--</section>-->
  <!--<slot name="edit"></slot>-->
  <!--<slot name="msite-title"></slot>-->
  <!--<slot name="changecity"></slot>-->
  <!--<slot name="changeLogin"></slot>-->
  <!--</header>-->
  <yd-layout>
  <yd-navbar slot="navbar" :title="headTitle" fixed>
    <section @click="$router.go(-1)" slot="left" v-if="goBack">
      <yd-navbar-back-icon @click="$router.go(-1)" slot="left"></yd-navbar-back-icon>
    </section>
    <yd-icon name="type" @click.native="showMenu = true" size="25px" color="#777" slot="right"></yd-icon>
  </yd-navbar>
    <div>
      <yd-popup v-model="showMenu" position="right">
        <yd-cell-item>
          <span slot="left"><yd-icon @click.native="showMenu = false" name="error-outline" size="25px" color="#777"></yd-icon></span>
        </yd-cell-item>
        <yd-cell-item @click.native="showMenu = false;$router.push({ path: '/home' })">
          <span slot="left"><yd-icon name="home-outline" size="25px" color="#f44336" style="margin-right:10px"></yd-icon>首页</span>
        </yd-cell-item>
        <yd-cell-item @click.native="showMenu = false;$router.push({ path: '/me' })">
          <span slot="left"><yd-icon name="ucenter-outline" size="25px" color="#f44336" style="margin-right:10px"></yd-icon>我的</span>
        </yd-cell-item>
        <yd-cell-item>
          <!--<span slot="left"><yd-icon name="home" size="25px" color="#f44336" margin-right="10px"></yd-icon>首页</span>-->
        </yd-cell-item>
      </yd-popup>
    </div>
  </yd-layout>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data(){
      return{
        showMenu:false,
      }
    },
    created(){

    },
    mounted(){

    },
    props: {
      headTitle:{
        required: true
      }, goBack:{
        default: true
      }
     },
    computed: {
    },
    methods: {
    },

  }

</script>

