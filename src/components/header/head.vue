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
  <!--<yd-navbar slot="navbar" :title="headTitle" bgcolor="#3190e8" color="#fff"></yd-navbar>-->
  <yd-navbar slot="navbar" :title="headTitle">
    <!--<div @click="$router.go(-1)" slot="left">-->
      <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
    <!--</div>-->
    <!--<router-link to="#" slot="right" @click.native="show2">-->
      <!--<yd-navbar-next-icon>前进</yd-navbar-next-icon>-->
    <!--</router-link>-->
    <!--<section @click.native="show2 = true" slot="right">-->
      <yd-icon name="type" @click.native="showMenu = true" size="25px" color="#777" slot="right"></yd-icon>
      <!--<yd-button size="large" type="danger" @click.native="show2 = true">右侧弹出</yd-button>-->
    <!--</section>-->
    <yd-popup v-model="showMenu" position="right">
      <yd-button type="danger" style="margin: 30px;" @click.native="showMenu = false">Close Right Popup</yd-button>
    </yd-popup>
  </yd-navbar>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{
              showMenu: false
            }
        },
        created(){
            //获取用户信息
//            this.getUserInfo();

        },
        mounted(){

        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
            changeState(){
              this.showMenu = true;
            }
        },

    }

</script>

