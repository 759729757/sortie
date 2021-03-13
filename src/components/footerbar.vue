<template>
    <div class="footbar">
      <div class="flex container commend-warp">
        <div class="col-6 text-right left-part">
          <div class="poster-md" >
<!--            <div class="shadow"></div>-->
<!--            <img class="shadowImg" :src="mgzImg" alt="">-->
            <img src="../assets/images/btmimage.png" alt="">
          </div>
          <img class="qrcode" src="../assets/images/gongzhong.jpg" alt="">
        </div>
        <div class="col-6 flex-left">
          <img class="qrcode" src="../assets/images/qrcode.jpg" alt="">
          <div class="info-warp text-left">
            <p><img class="logo" src="../assets/images/logo.jpg" alt=""></p>
            <p>先锋时尚媒体</p>
            <p>电子刊物 微信小程序 公众号 微博 时装书</p>
          </div>
        </div>
      </div>
      <div>
        <div class="text-center footer-bg">
          Copyright©2020-2025 studiosortie.com All rights reserved 版权所有 <br>
          <img width="20" data-src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" class="ali-report-img" src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png">
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?spm=5176.12901015.7y9jhqsfz.28.609b525c29NqJe" style="color: #999;" target="_parent">
            浙ICP备20022161号-1
          </a>
        </div>
      </div>
    </div>
</template>

<script>
  import {getMagazine,getAbout,getNews} from '../api'
  export default {
        name: "footerbar",
        data(){
          return {
            mgzImg:''
          }
        },
        methods:{

        },
      mounted(){
        getMagazine().then(res=>{
          console.log('getMagazine',res)
          this.mgzImg = res.data[0].headImg;
        })
      }
    }
</script>

<style scoped>
  .footbar{background: white;z-index: 99;position: relative;}
  .footer-bg{
   background: rgb(24, 24, 24); color:#999;
    padding: 20px 0;
    margin-top: 80px;
  }
  .left-part{display: flex;align-items: center;justify-content: flex-end;padding-right: 40px;box-sizing: border-box;border-right: 1px #eee solid;}
  .flex-left{border-left: 1px #eee solid;padding-left: 40px;box-sizing:border-box;display: flex;flex-direction: row;justify-content: start;align-items: center;}
  .text-center{line-height: 28px;}
  .col-6{width: 50%;float: left;height: 140px;}
  .qrcode{width: 70px;}
  .logo{width: 100px;}
  .text-left{color: #666;}
  .info-warp{margin-left: 50px;font-size: 12px;}
  .poster-md{width: 110px;display: inline-block;margin-right: 70px;position: relative;}
  .poster-md img{width: 100%;
    /*box-shadow: -2px -2px 10px #ccc;*/
  }
  .shadow{width: 100%;
    height: 30px;
    position: absolute;
    left: -2px;
    bottom: 10px;
    box-shadow: -6px -4px 5px #ccc;
    transform: rotate(-13deg);
    z-index: -1;
    background: #ccc;}
  .shadowImg{transform: rotateX(-70deg) rotateZ(-15deg);position: absolute;left: -20px;
    bottom: -38px;
    z-index: -1;opacity: 0.6;
    box-shadow: -5px -5px 15px #ccc;}
  .commend-warp{padding: 30px 0;margin-top: 80px;
    border-width: 2px;z-index: 99;
    position: relative;
    background: white;
    border-right-width:0;border-left-width:0;
    border-style: solid;border-color: #eee;}

  @media (max-width: 768px) {
    .commend-warp{display: none;}
  }
</style>
