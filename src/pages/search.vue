<template>
  <div>

    <el-input v-model="searchText" class="search-input"
              autofocus="true" @change="getData"
              placeholder="请输入搜索内容"></el-input>

    <div v-if="searchData">----------未找到您输入的内容----------</div>
<!--    新闻-->
    <news  v-if="news.length" :newsData="news"></news>

    <Footerbar></Footerbar>
  </div>
</template>

<script>
  import News from '../components/news'
  import {findNewsByName, getNews} from '../api'
  import Footerbar from '../components/footerbar'

    export default {
      name: "newsPage",
      components:{
        News,Footerbar
      },
      props:[],
      data(){
        return{
          searchText:'',
          news:[],
          searchData:false,

        }
      },
      directives: {

      },
      computed: {

      },
      methods:{
        getData(){
          findNewsByName({
            matchText:this.searchText,
          }).then(res=>{
            console.log('getNews',res)
            this.news = res.data;
            if(res.data.length) {
              this.searchData = false;
            } else{
              this.searchData = true;
            }
            this.$forceUpdate();
          })
        }
      },
      mounted() {



      },

    }
</script>

<style scoped>
  .search-input{
    width: 250px;
    margin-bottom: 30px;
  }




</style>
