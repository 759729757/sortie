<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="container news-warp">

      <div class="item" v-for="item in news"
           @click="toDetail(item)">
        <img class="news-img" :src="item.poster" alt="">
        <p>{{item.title}}</p>
      </div>

    </div>

    <!--分页组件-->
    <el-pagination
      v-if="newsTotal"
      :page-size="pageNum"
      :pager-count="7" @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="newsTotal">
    </el-pagination>
  </div>


</template>

<script>
  import {getNews} from '../api'

  export default {
      name: "news",
      props:[
        'newsData'
      ],
      data(){
        return{
          fullscreenLoading: false,
          news:[],
          newsTotal:0,
          page:1,
          pageNum:12
        }
      },
      watch:{
        newsData:function (val) {
          console.log('news data')
          this.news = val
        },
        $route:{
          handler(val,oldval){
            this.getData();
          },
          // 深度观察监听
          deep: true
        },
        newsType(){
          this.getData();
        }
      },

      methods:{
        toDetail:function(item){
          console.log('goto ',item)
          window.open('/newsDetail?news='+item._id+'&type='+item.newsTypes[0])
        },
        handleCurrentChange(val) {
          this.page = val;
          this.getData();
        },
        getData(){
          this.fullscreenLoading = true;
          if(this.$route.query.type){
            this.newsType = this.$route.query.type;
          }else{
            this.newsType=null;
          }
          if(this.newsData){
            this.news = this.newsData
            setTimeout(()=>{
              this.fullscreenLoading = false;
            },200)
            return
          }
          let params ={
            page:this.page,
            limit:this.pageNum
          }
          if(this.newsType)params.newsTypes = this.newsType;
          getNews(params).then(res=>{
              console.log('getNews:',res)
              this.news = res.data;
              this.newsTotal = res.count;
              setTimeout(()=>{
                this.fullscreenLoading = false;
              },200)
          })
        }
      },
      mounted(){
        this.getData();
      }
    }

</script>

<style scoped>
  .news-warp{display: block;align-items: center;flex-direction: row;
    justify-content: stretch;flex-wrap: wrap;}
  .news-warp .item{width: 46%;margin: 0 2%;margin-bottom: 20px;float: left;
    overflow: hidden;}
  .news-warp .item:nth-child(2n+1){
    clear: left;
  }
  .container.news-warp:before{display: none;}
  .news-warp p{margin: 5px 0 15px 0;width: 100%;overflow: hidden;white-space: nowrap;
  text-overflow: ellipsis;}
  .news-warp .news-img{
    width: 100%;
  }
  @media (max-width: 768px) {
    .swiper-slide,.news-warp{
      width:100%;
    }

  }
</style>
