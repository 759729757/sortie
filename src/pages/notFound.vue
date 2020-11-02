<template>
  <div>
    <h1 class="page-container">404 page not found</h1>

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

  .page-container {
    margin-top: 25vh;
    text-align: center;
    color: rgb(192, 204, 218);
  }




</style>
