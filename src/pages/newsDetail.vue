<template>
  <div>
    <div class="content">
      <div>
        <h3 class="text-center">{{newsData.title}}</h3>
        <span class="pull-right time">{{newsData.update_date}}</span>
      </div>
      <br>
      <div class="clear content " v-if="newsData.swiper && newsData.swiper.length>0">
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
        <span v-if="newsData.author" class="pull-right" style="margin-top: 30px;">责任编辑：{{newsData.author}}</span>
      </div>
    </div>

    <div class="content recommend" v-if="recommend.length">
      <h4 class="text-center"><strong>阅读更多 READ MORE</strong></h4>
      <div v-for="item in recommend" :key="item._id"
      class="item-3" @click="toDetail(item._id)">
<!--        <a target="_blank" :href="'newsDetail?news='+item._id">-->
          <img :src="item.poster" alt="">
          <p class="text-aline">{{item.title}}</p>
<!--        </a>-->
      </div>
    </div>
    <Footerbar></Footerbar>
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
  import Footerbar from '../components/footerbar'

  export default {
      name: "newsDetail",
      data(){
        return{
          newsData:{},
          recommend:[],
          swiperOptions: {
            loop:true,
            autoplay:2000,
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
          newsTypes:''
        }
      },
      components:{
        Swiper,
        SwiperSlide,
        Footerbar
      },
      methods:{

        getCommend(){
          let params={limit:4,position:'main'}
          if(this.newsTypes)params.newsTypes = this.newsTypes;

          getNews(params).then(res=>{
            let recommend=res.data
            if(!recommend.length)return;
            recommend = recommend.filter( item => {
              return item.title != document.title
            })
            if(recommend.length ===4 ){
              recommend.pop();
            }
            console.log('recommend',recommend);
            this.recommend = recommend;
          })
        },

        toDetail:function(val){
          window.open('/newsDetail?news='+val+'&type='+this.newsTypes)
        },


      },
      directives: {
        swiper: directive
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.$swiper
        }
      },
      watch:{
        newsTypes(val){
          this.getCommend();
        },
      },
      mounted(){
        const id = this.$route.query.news;
        this.newsTypes = this.$route.query.type;
        let param = {_id :id}
        if(this.$route.query.showSoldOut){
          param.showSoldOut = 1
        }
        if(this.newsTypes === 'undefined')this.newsTypes = null;
        if(!id) this.$router.back();

        getNews(param).then(res=>{
          console.log(res)
          this.newsData=res.data[0];
          document.title = res.data[0].title;
        })
        this.getCommend();

      },

    }
</script>

<style scoped>
  a{color: inherit;}
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
.text-aline{width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.recommend{margin-top: 40px;overflow: hidden;}
.item-3{width: 33.333%;box-sizing: border-box;padding: 10px 20px;float: left;margin-top: 20px;}
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
