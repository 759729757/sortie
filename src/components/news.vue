<template>
  <div>
    <div class="container news-warp">

      <div class="item">
        <img class="news-img" src="../assets/images/news1.jpg" alt="">
        <p>第一个新闻标题~标题不超过14文字</p>
      </div>
      <div class="item">
        <img class="news-img" src="../assets/images/news2.jpg" alt="">
        <p>第一个新闻标题~标题不超过14文字</p>
      </div>
      <div class="item">
        <img class="news-img" src="../assets/images/news3.jpg" alt="">
        <p>第一个新闻标题~标题不超过14文字</p>
      </div>
      <div class="item">
        <img class="news-img" src="../assets/images/news1.jpg" alt="">
        <p>第一个新闻标题~标题不超过14文字</p>
      </div>
      <div class="item">
        <img class="news-img" src="../assets/images/news2.jpg" alt="">
        <p>第一个新闻标题~标题不超过14文字</p>
      </div>

    </div>

    <!--分页组件-->
    <el-pagination
      :page-size="20"
      :pager-count="7"
      layout="prev, pager, next"
      :total="200">
    </el-pagination>
  </div>


</template>

<script>
    export default {
        name: "news",
        props:['news'],

    }

</script>

<style scoped>
  .news-warp{display: flex;align-items: center;flex-direction: column;justify-content: center;}
  .news-warp .item{margin-bottom: 10px;}
  .news-warp .item:first-child{margin-top: 50px;}
  .news-warp p{margin: 5px 0 15px 0;}
  .news-warp .news-img{
    width: 600px;
  }
</style>
