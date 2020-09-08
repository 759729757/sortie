<template>
  <div>
    <div class="content">
      <span v-html="aboutdata.content"></span>
    </div>

  </div>
</template>

<script>
  import {getAbout} from '../api'
  //引入富文本css
  import '../assets/quill.core.css'
  import '../assets/quill.snow.css'

    export default {
      name: "about",
      components:{

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
