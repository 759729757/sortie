<template>
  <div>
    <div class="content ql-editor">
      <span v-html="aboutdata.content"></span>
    </div>

    <Footerbar></Footerbar>
  </div>
</template>

<script>
  import {getAbout} from '../api'
  //引入富文本css
  import '../assets/quill.core.css'
  import '../assets/quill.snow.css'
  import Footerbar from '../components/footerbar'

    export default {
      name: "about",
      components:{
        Footerbar
      },
      props:[],
      data(){
        return{
          aboutdata:{}

        }
      },
      directives: {

      },
      computed: {

      },
      methods:{

      },
      mounted() {
        getAbout().then(res=>{
          this.aboutdata = res.data;
        })



      },

    }
</script>

<style scoped>

  @media (max-width: 769px) {
    .content{
      width: 78%;margin: auto;display: block;
    }
  }



</style>
