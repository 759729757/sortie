<template>
  <div class="content">
    <img src="../assets/shop.jpg"
         style="width: 70%;margin: 0 15%;">

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
