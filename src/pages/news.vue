<template>
  <div>
    <NavClient></NavClient>



<!--    新闻模块-->
    <News></News>

  </div>
</template>

<script>
  import NavClient from '../components/nav'
  import News from '../components/news'

    export default {
      name: "newsPage",
      components:{
        NavClient,
        News
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
