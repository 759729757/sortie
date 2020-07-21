<template>
  <div>
    <NavClient></NavClient>
    <h1 class="page-container">404 page not found</h1>

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

  .page-container {
    margin-top: 25vh;
    text-align: center;
    color: rgb(192, 204, 218);
  }




</style>
