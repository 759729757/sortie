<template>
  <div>
    <div class="banner-warp container">
      <swiper ref="mySwiper" class="banner-top" :options="swiperOptions">
        <swiper-slide v-for="item in banner" :key="item.name">
          <div>
            <router-link to="magazine">
              <p>
                <img :src="item.headImg" alt=""  />
              </p>
            </router-link>
            <h4>{{item.subTitle}}</h4>
            <h4>{{item.name}}</h4>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 如果需要导航按钮 -->
<!--      <div class="swiper-button-prev" slot="navigation"></div>-->
<!--      <div class="swiper-button-next" slot="navigation"></div>-->
    </div>
      <div class="container">
        <div class=" news-warp left-part" id="news-warp" ref="newsWarp">
          <!--    新闻模块-->
          <div class="item" v-for="item in news"
               @click="toDetail(item._id,item.newsTypes[0])">
            <img class="news-img" :src="item.poster" alt="">
            <p>{{item.title}}</p>
          </div>
        </div>

        <div :class="'news-warp right-part '+partFixed" ref="rightPart">
          <!-- 右边banner 新闻模块-->
          <div class="item" v-for="item in newsBanner"
               @click="toDetail(item._id,item.newsTypes[0])">
            <img class="news-img" :src="item.poster" alt="">
            <p>{{item.title}}</p>
          </div>

          <!--        list 模块-->
          <div class="item list" v-for="item in newsList"
               @click="toDetail(item._id,item.newsTypes[0])">
            <img class="news-img" :src="item.poster" alt="">
            <div class="info">
              <p><strong>{{item.title}}</strong></p>
              <p>{{item.describe}}</p>
            </div>
          </div>

        </div>
      </div>


    <Footerbar></Footerbar>
  </div>
</template>

<script>
  import NavClient from '../components/nav'
  import Footerbar from '../components/footerbar'
  import MbNavClient from '../components/mbnav'
  import News from '../components/news'
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import {getMagazine,getAbout,getNews,getIndexNews} from '../api'

    export default {
      name: "index",
      components:{
        NavClient,Swiper,
        SwiperSlide,News,MbNavClient,Footerbar
      },
      props:[],
      data(){
        return{
          banner:[],news:[],newsBanner:[],newsList:[],partFixed:'',
          swiperOptions: {
            loop:true,
            initialSlide:0,
            autoplay:true,
            speed:300,
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
        toDetail:function(val,type){
          window.open('/newsDetail?news='+val+'&type='+type);
        },
        FetchNews(){
          getIndexNews().then(res=>{
            console.log(res);
            this.news = res.news;
            this.newsBanner = res.banner;
            this.newsList = res.list;
          })
        },
        handleScoll() {
          let screenH = getClientHeight();
          let newsH = this.$refs.newsWarp.offsetTop+this.$refs.newsWarp.offsetHeight;
          let rightPartH = this.$refs.rightPart.offsetHeight;

          let fullH = document.documentElement.offsetHeight || document.body.offsetHeight;
          newsH = newsH  - rightPartH;
          let bottom = fullH - screenH - 200;//底部开始显示的距离

          let top = document.documentElement.scrollTop || document.body.scrollTop;//滚动条位置

          let btmShow = top-newsH;//底部显示了多少
          if (top > 680) {
            this.partFixed = 'partFixed';
            if(btmShow > 0){
              this.$refs.rightPart.style.top = -btmShow+'px';
            }else{
              this.$refs.rightPart.style.top = '0px';
            }
          } else {
            this.partFixed = '';
          }

        },

      },
      mounted() {
        this.FetchNews();
        // this.swiper.slideTo(3, 1000, false);
        var self = this;

        getMagazine().then(res=>{
          console.log('getMagazine',res)
          this.banner = res.data;
        })
        this.$nextTick(() => {
          this.handleScoll();
          addEventListener('scroll', this.handleScoll);
        });
      },
      destroyed() {
        removeEventListener('scroll', this.handleScoll);
      }
    }

  function getClientHeight()
  {
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight)
    {
      var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    else
    {
      var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
  }
</script>

<style scoped>
  .banner-warp{position: relative;color: #646363;}
  .banner-top{padding-bottom: 10px;margin-bottom: 20px;}
  .banner-warp .swiper-slide p{position: relative;overflow: hidden;}
  .banner-warp .swiper-slide p::before{position: absolute;width: 100%;height: 100%;content: '';left: 0;top: 0;
    z-index: 99;background-color: rgba(0,0,0,.4);opacity: 0;transition: all .3s;}
  .banner-warp .swiper-slide p:hover::before{opacity: 1;}
  .banner-top .swiper-slide{
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
  /deep/.banner-top .swiper-slide{
    padding: 0 10px;
  }
  /*新闻模块*/
  .news-warp{width: 650px;}
  .left-part{float: left;}
  .news-warp .item{margin-top: 20px;display: inline-block;}
  .news-warp p{margin: 5px 0 15px 0;}
  .news-warp .news-img{
    width: 100%;
  }
  .right-part{float: right;width: 450px;}
  .news-warp .list{display: flex;flex-direction: row;flex-wrap: nowrap;}
  .list .news-img{width: 200px;display: inline-block;height: 100px;}
  .list .info{margin-left: 20px;text-align: left;}
  .partFixed{position: fixed;top: 0;right: calc(50% - 585px);}

  @media (max-width: 768px) {
    .right-part{display: none;}
    .banner-top .swiper-slide,.news-warp{
      width:100%;
    }
    .swiper-container{
      border-bottom-width: 2px;
    }
    .swiper-button-next,.swiper-button-prev{display: none;}
  }
  .el-pagination{max-width: 100%;}



</style>
