<template>
  <yd-tabbar fixed>
    <yd-tabbar-item title="首页" link="#" active>
      <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
    <yd-tabbar-item title="个人中心" link="#" active dot>
      <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
  </yd-tabbar>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{

            }
        },
        created(){

        },
        mounted(){

        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

    }

</script>

