<template>
  <div>
<!--    新闻模块-->
    <News></News>

    <Footerbar></Footerbar>
  </div>
</template>

<script>
  import News from '../components/news'
  import Footerbar from '../components/footerbar'

    export default {
      name: "newsPage",
      components:{
        News,Footerbar
      },
      props:[],
      data(){
        return{


        }
      },
      directives: {

      },
      computed: {

      },
      methods:{

      },
      mounted() {



      },

    }
</script>

<style scoped>





</style>
