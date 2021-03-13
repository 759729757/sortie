<template>
  <div class="">
    <div class="container">
      <div class="item magazine" v-for="item in magazine">
        <div @click="showQrcode">
          <div >
            <p>
              <img :src="item.headImg" alt=""  />
            </p>
          </div>
          <h4>{{item.subTitle}}</h4>
          <h4>{{item.name}}</h4>
        </div>
      </div>
    </div>


    <el-dialog
      title="微信扫一扫购买阅读码"
      :visible.sync="dialogVisible"
      width="30%">
      <img src="../../assets/payQrcode.png" alt="">
    </el-dialog>

    <Footerbar></Footerbar>
  </div>
</template>

<script>
  import News from '../../components/news'
  import {getMagazine} from '../../api'
  import Footerbar from '../../components/footerbar'

    export default {
      name: "newsPage",
      components:{
        News,Footerbar
      },
      props:[],
      data(){
        return{
          magazine:[],
          dialogVisible:false,

        }
      },
      directives: {

      },
      computed: {

      },
      methods:{
        //出示二维码
        showQrcode(){
          var ua = navigator.userAgent;

          var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

            isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

            isAndroid = ua.match(/(Android)\s+([\d.]+)/),

            isMobile = isIphone || isAndroid;

//判断
          if(isMobile){
            this.$router.push({
              path:'/pay'
            })
          }else{
            this.dialogVisible = true
          }
        },

      },
      mounted() {

        getMagazine().then(res=>{
          this.magazine = res.data
        })

      },

    }


</script>

<style scoped>
.item{width: 33.333%;margin-top: 20px;float: left;padding: 0 10px;box-sizing: border-box;}
.magazine p{position: relative;overflow: hidden;cursor: pointer;}
.magazine p::before{position: absolute;width: 100%;height: 100%;content: '';left: 0;top: 0;
  z-index: 3;background-color: rgba(0,0,0,.4);opacity: 0;transition: all .3s;}
.magazine:hover p::before{opacity: 1;}
@media (max-width: 769px) {
  .item{
    width: 100%;
  }
}



</style>
