<template>
  <div class="mbnav mb-only">
    <img class="logo" src="../assets/images/logo.png" alt="Sortie">
    <div >
      <img class="menu" src="../assets/menu.png" alt="">
      <img class="close" src="../assets/close.png" alt="">
    </div>
    <div class=" mb-only">
      <ul class=" mbnavbar" id="mbnavbar">
        <li>
          <router-link to="/">首页</router-link>
        </li>

        <li class="tab" v-for="item in tabArr"
             :class="[langValue==='Chinese'?'bold':'',$route.path == item.path ? 'active':'' ]"
             :v-key="item.path">
          <router-link :to="item.path">
            {{item.name}}
          </router-link>
        </li>


      </ul>
    </div>

  </div>

</template>

<script>
  import $ from 'jquery'

  export default {
    name: "mainnavbar",
    data(){
      return{
        searchInput: '',
        langOptions: [
          {
            value: 'Chinese',
            label: '中文'
          }, {
            value: 'English',
            label: 'English'
          },
        ],
        langValue: 'Chinese',

        tabArrCn:[{name:'关于我们',path:'/about'},{name:'电子刊',path:'/magazine'},{name:'资讯活动',path:'/news'},{name:'商店',path:'/store'}],
        tabArrEn:[{name:'ABOUT',path:'/about'},{name:'MAGAZINE',path:'/magazine'},{name:'NEWS',path:'/news'},{name:'STORE',path:'/store'}],
        tabArr:[],
      }
    },
    prop:['path'],
    methods: {
      handleScoll() {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top > 110) {
          document.getElementById('nav') && document.getElementById('nav').classList.add('fixed')
        } else {
          document.getElementById('nav') && document.getElementById('nav').classList.remove('fixed')
        }
        //固定 tab
        if (top > 440) {
          document.getElementById('tab') && document.getElementById('tab').classList.add('fixed')
        } else {
          document.getElementById('tab') && document.getElementById('tab').classList.remove('fixed')
        }

      },
    },
    mounted() {
      this.tabArr = this.tabArrCn //默认是中文导航

      this.$nextTick(() => {
        this.handleScoll();
        addEventListener('scroll', this.handleScoll);
      });

      $('.menu').click(function () {
        $('.mbnav').addClass('active');
        $('.close').show('fast');
      })
      $('.close').click(function () {
        $('.close').hide('fast');
        $('.mbnav').removeClass('active');
      })
    },
    watch:{
      $route:{
        handler(val,oldval){
          $('.close').hide('fast');
          $('.mbnav').removeClass('active');
        },
        // 深度观察监听
        deep: true
      }
    },
    destroyed() {
      removeEventListener('scroll', this.handleScoll);
    }
  }
</script>

<style scoped>
  .mbnav {
    position: fixed;left: 0;top: 0;
    background: white;
    width: 100%;
    height: 45px;
    line-height: 45px;
    z-index: 888;
  }
  .logo{
    width: 50px;
  }
  .mbnav .mbnavbar{
    transition: all .5s;
    transform-origin: top;
    transform: scaleY(0);
    height: 0;
  }
  .mbnav.active .mbnavbar{
    transform: scaleY(1);
    height: auto;
  }
  li{
    list-style: none;
  }
  .mbnav ul {
    margin: 0px auto;
    max-width: 1030px;
    padding: 60px 0;
    background: rgba(0,0,0,.85);
    position: relative;
    z-index: 10;
  }

  .mbnav ul li {
    color: white;
    margin: 0 5%;
    padding: 0px 32px;
    text-align: left;
    line-height: 45px;
    position: relative;
    border-bottom: 1px solid rgba(255,255,255,.23);
  }

  .mbnav ul li a {
    color: rgb(255, 255, 255);
    font-size: 16px;
    display: block;
    cursor: pointer;
  }


  .subNav {
    transition: all .35s;
    transform-origin: top;
    white-space: nowrap;
    transform: scaleY(0);
    height: 0;
    overflow: hidden;
    bottom: 0;
    left: 0;
  }

  .subNav dd {
    margin: 0 20px;
  }
  .mbnavbar li:hover .subNav {
    transform: scaleY(1);
    height: auto;
  }
  .menu{
    position: absolute;z-index: 99;
    left: 15px;top:15px;
    width: 20px;
  }
  .close{
    position: absolute;z-index: 99;
    right: 14px;top: 13px;
    width: 20px;
    display: none;
  }

  @media (max-width: 769px) {
    .nav ul {
      float: left;
    }
    .nav ul li {
      padding: 0 20px;
    }
  }



</style>
