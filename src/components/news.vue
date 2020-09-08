<template>
  <div>
    <div class="container news-warp">

      <div class="item" v-for="item in news"
           @click="toDetail(item._id)">
        <img class="news-img" :src="item.poster" alt="">
        <p>{{item.title}}</p>
      </div>

    </div>

    <!--分页组件-->
    <el-pagination
      v-if="newsTotal"
      :page-size="6"
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
          news:[],
          newsTotal:0,
          page:1
        }
      },
      watch:{
        newsData:function (val) {
          console.log('news data')
          this.news = val
        }
      },

      methods:{
        toDetail:function(val){
          // this.$router.push({
          //   path:'/newsDetail?news='+val,
          // })
          window.open('/newsDetail?news='+val)
        },
        handleCurrentChange(val) {
          this.page = val;
          this.getData();
        },
        getData(){
          if(this.newsData){
            this.news = this.newsData
            return
          }
          getNews({
             page:this.page,
            }).then(res=>{
              console.log('getNews',res)
              this.news = res.data,
              this.newsTotal = res.count
          })
        }
      },
      mounted(){
        this.getData();
      }
    }

</script>

<style scoped>
  .news-warp{display: flex;align-items: center;flex-direction: column;justify-content: center;}
  .news-warp .item{margin-bottom: 20px;}
  .news-warp p{margin: 5px 0 15px 0;}
  .news-warp .news-img{
    width: 600px;
  }
</style>
