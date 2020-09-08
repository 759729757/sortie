<template>
  <div>
    <div class="content">
      <div>
        <h3 class="text-center">{{newsData.title}}</h3>
        <span class="pull-right time">{{newsData.update_date}}</span>
      </div>
      <br>
      <div class="clear content " v-if="newsData.swiper.length>0">
        <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
          <swiper-slide v-for="item in newsData.swiper">
            <div>
              <p>
                <img :src="item" alt=""  />
              </p>
            </div>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev" slot="navigation"></div>
        <div class="swiper-button-next" slot="navigation"></div>
      </div>

      <div class="clear ql-editor">
        <span v-html="newsData.content"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getNews} from '../api'
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  //引入富文本css
  import '../assets/quill.core.css'
  import '../assets/quill.snow.css'
  import NavClient from "../components/nav";
  import News from "../components/news";
  import MbNavClient from "../components/mbnav";

  export default {
      name: "newsDetail",
      data(){
        return{
          newsData:{},
          swiperOptions: {
            loop:true,
            initialSlide:0,
            slidesPerView :'auto',
            // slidesPerView :document.documentElement.clientWidth < 768 ? 1 : 3,
            spaceBetween : 20,
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
      components:{
        Swiper,
        SwiperSlide
      },
      methods:{

      },
      directives: {
        swiper: directive
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.$swiper
        }
      },
      mounted(){
        const id = this.$route.query.news;
        if(!id) this.$router.back();

        getNews({_id:id}).then(res=>{
          console.log(res)
          this.newsData=res.data[0];
        })

      },

    }
</script>

<style scoped>
  .content{
    width: 680px;margin: auto;
    margin-top: 30px;text-align: left;font-size: 14px;line-height: 26px;
    text-space: 28px;position: relative;
  }
  .time{
    display: block;text-align: right;
    font-size: 13px;color: #666;margin-bottom: 15px;
  }
.clear{
  clear: both;
}
.swiper{
  width: 50%;margin: auto;display: block;
}
  @media (max-width: 769px) {
    .content{
      width: 96%;
      margin: 0 2%;
    }
    .swiper-button-prev,.swiper-button-next{display: none;}
    .swiper{
      width: 94%;margin: auto;display: block;
    }
  }


</style>
