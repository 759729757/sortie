<template>
  <div id="app">

<!--    <NavClient></NavClient>-->
<!--    <MbNavClient ></MbNavClient>-->
    <router-view />

    <!--    底部footer-->
<!--    <div class="footer container-full">-->
<!--      <div class="container text-center">-->
<!--        这里放网站版权信息copyright-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
  import NavClient from './components/nav'
  import MbNavClient from './components/mbnav'
  export default {
    name: 'App',
    components:{
      NavClient,MbNavClient
    },
    data(){
      return{

      }
    },
    mounted(){

    }

  }
</script>

<style>
#app {
  font-family: 微软雅黑体,Favorit SSENSE Inter1,PingFang SC,冬青黑体,Hiragino Sans GB,微软雅黑体,Microsoft YaHei,YaHei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;padding-top: 1px;
  position: relative;padding-bottom:80px;
}
*::-webkit-scrollbar{display: none;}
a{text-decoration: none;color: #000000;}
a:hover{text-decoration: none;color: #999;}
img{max-width: 100%;}
  .container{
    max-width: 1200px;
    margin: 0 auto;
  }
.footer{margin-top: 100px;background-image:linear-gradient(0, #ccc, #fff);padding: 10px;color: #999;font-size: 12px;
position: absolute;bottom: 0;left: 0;width: 100%;
}
.mb-only{
  display: none;
}
.content{
  width: 680px;margin: auto;
  margin-top: 30px;text-align: left;font-size: 14px;line-height: 26px;
  text-space: 28px;
}

@media (max-width: 769px) {
  .content,.container{
    width: 96%;
    margin: 0 2%;
  }
}
@media  (max-width: 768px){
  .pc-only{display: none;}
  .mb-only{
    display: block;
  }
  .mbnav+div{
    margin-top: 45px;
  }
  .footer{
    margin-top: 20px;
  }
}
.el-pagination{max-width: 100%;}

</style>
