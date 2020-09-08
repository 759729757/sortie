<template>
  <div>
    <div class="banner-warp container">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in banner">
          <div>
            <router-link to="magazine">
              <p>
                <img :src="item.headImg" alt=""  />
              </p>
            </router-link>
            <h4>{{item.name}}</h4>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 如果需要导航按钮 -->
<!--      <div class="swiper-button-prev" slot="navigation"></div>-->
<!--      <div class="swiper-button-next" slot="navigation"></div>-->
    </div>
<!--    新闻模块-->
    <News></News>

  </div>
</template>

<script>
  import NavClient from '../components/nav'
  import MbNavClient from '../components/mbnav'
  import News from '../components/news'
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import {getMagazine,getAbout} from '../api'

    export default {
      name: "index",
      components:{
        NavClient,Swiper,
        SwiperSlide,News,MbNavClient
      },
      props:[],
      data(){
        return{
          banner:[],
          swiperOptions: {
            loop:true,
            initialSlide:0,
            slidesPerView :'auto',
            // slidesPerView :document.documentElement.clientWidth < 768 ? 1 : 3,
            spaceBetween : 0,
            // pagination: {//分页器
            //   el: '.swiper-pagination'
            // },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            updateOnWindowResize: true,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true//修改swiper的父元素时，自动初始化swiper
            // Some Swiper option/callback...
          },

        }
      },
      directives: {
        swiper: directive
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.$swiper
        }
      },
      methods:{

      },
      mounted() {
        // this.swiper.slideTo(3, 1000, false);

        var self = this;
        // window.onresize = function(){ // 定义窗口大小变更通知事件
        //   console.log(document.documentElement.clientWidth);
        //   if(document.documentElement.clientWidth < 768){
        //     self.swiperOptions.slidesPerView = 1
        //   }
        // };
        getMagazine().then(res=>{
          console.log('getMagazine',res)
          this.banner = res.data;
        })

      },

    }
</script>

<style scoped>
  .banner-warp{position: relative;color: #646363;}
  .swiper-container{border-bottom: 1px solid #000;padding-bottom: 10px;margin-bottom: 20px;}
  .banner-warp .swiper-slide p{position: relative;overflow: hidden;}
  .banner-warp .swiper-slide p::before{position: absolute;width: 100%;height: 100%;content: '';left: 0;top: 0;
    z-index: 99;background-color: rgba(0,0,0,.4);opacity: 0;transition: all .3s;}
  .banner-warp .swiper-slide p:hover::before{opacity: 1;}
  .swiper-slide{
    width: 33.33%;
  }
  /deep/.swiper-button-prev, .swiper-container-rtl .swiper-button-next{
    left: -40px;    opacity: 1;
    color: black;
    font-weight: bold;
  }
  /deep/.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    right: -40px;    opacity: 1;
    color: black;
    font-weight: bold;
  }
  /deep/.swiper-slide{
    padding: 0 10px;
  }
  @media (max-width: 768px) {
    .swiper-slide{
      width:100%;
    }
    .swiper-container{
      border-bottom-width: 2px;
    }
    .swiper-button-next,.swiper-button-prev{display: none;}
  }


  .el-pagination{max-width: 100%;}



</style>
