<template>
  <div>
    <img class="logo" src="../../assets/images/logo.jpg" alt="">

    <div v-for="item in magazine" :key="item.name">
      <div class='box'>
        <div class="banner-warp flex-col"  >
          <img class="banner-image" :src="item.headImg" />
          <div class=" subscript">
            已有 {{item.sold}} 人订阅
          </div>
          <div class="title-warp">
            <div class="title">
              {{item.name}}
            </div>
            <div class="btn" @click="showMenu(item)" >购买</div>
          </div>
        </div>
      </div>
    </div>

    <button @click="buy">点击购买测试</button>

    <el-dialog custom-class="menu" :title="menu.name" width="100%" :show-close="false" :visible.sync="dialogTableVisible">
      <div class="menu-list">
        <div class="li" v-for="(item,index) in setMeal"
             :class="checkedMenu===index ? 'active':''"
             @click="chooseMenu(index)">
          {{item.number}}本 <span class="pull-right">￥{{item.price}}</span>
        </div>
        <div class="li"
             @click="chooseMenu(-1)"
             :class="checkedMenu=== -1  ?'active':''"
        >
          自定义:
          <el-input type="number" @focus="tradeCountFocus" @input="diyTradeCount"
                    class="input-inline" v-model="diyNumber" placeholder="请输入数字"></el-input>
          <span class="pull-right">￥{{ diyPrice }}</span>
        </div>
      </div>
      <div class="title-warp">
        <div class="btn" @click="buy()" >付款</div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import axios from 'axios';
  import {loginByCode,getMagazine} from '../../api'


  export default {
    name: "pay",
    data() {
      return {
        magazine:[],menu: {},
        dialogTableVisible:false,
        checkedMenu: 0,//选中的套餐
        setMeal: [
          { number: '1', price: '8.00' },
          { number: '10', price: '80.00' },
          { number: '100', price: '800.00' },
        ],
        order:{number: '1', price: '8.00' },diyNumber:1,diyPrice:8,
        foowwLocalStorage : {
          set: function (key, value, ttl_ms) {
            var data = { value: value, expirse: new Date(ttl_ms).getTime() };
            localStorage.setItem(key, JSON.stringify(data));
          },
          get: function (key) {
            var data = JSON.parse(localStorage.getItem(key));
            if (data !== null) {
              if (data.expirse != null && data.expirse < new Date().getTime()) {
                localStorage.removeItem(key);
              } else {
                return data.value;
              }
            }
            return null;
          }
        },

      }
    },
    methods: {
      chooseMenu(val){
        this.checkedMenu = val;
        if(val === -1)return;
        this.order = this.setMeal[val];
      },
      //点击自定义购买数量
      tradeCountFocus(){

      },
      diyTradeCount(val){
        let tradePrice = val*8,discount = this.menu.discount||1;
        if(val>300)tradePrice = tradePrice * discount;
        if(tradePrice >= 3000){
          this.$message({
            message: '由于微信限制，单笔金额不建议超过3000哦',
            type: 'warning'
          });
        }
        this.diyPrice = tradePrice;
        this.diyNumber = val;
        this.$forceUpdate();
      },
      showMenu(item){
        this.menu = item;
        this.dialogTableVisible = true;
      },

      config() {
        let url = location.href.split('?')[0];
        console.log('当前url是：', url);
        axios.get('https://wechat.studiosortie.com/commit/config?url=' + url)
          .then((res) => {
            console.log('config', res)
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx9df6ee154c684395', // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature,// 必填，签名
              jsApiList: ['chooseWXPay', "onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
            })

            wx.checkJsApi({
              jsApiList: ['chooseWXPay', "onMenuShareTimeline", "onMenuShareAppMessage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                console.log('检测', res)
              }
            });

          }).catch(function (error) {
          console.log('error', error);
        });

      },
      buy() {
        let amount = this.checkedMenu === -1 ? this.diyPrice : this.order.price;
        let tradeCount = this.checkedMenu === -1 ? this.diyNumber : this.order.number;
        let tradebody = this.menu.name;

        axios.get('https://wechat.studiosortie.com/wxPurchase',
          {
            params: {
              magazine: '5f0aaaba7c27ba61a46d253f',
              amount: amount,
              tradeCount: tradeCount,
              tradeBody: tradebody,
              buyType: 'web',//代表是网页端支付
            }
          })
          .then((data) => {
            console.log('支付数据', data)
            let paydatas = data.data.result,
              out_trade_no = data.data.out_trade_no;
            wx.chooseWXPay({
              timestamp: paydatas.timeStamp.toString(), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: paydatas.nonceStr, // 支付签名随机串，不长于 32 位
              package: "prepay_id=" + paydatas.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: paydatas.paySign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数

                console.log('支付成功后的回调函数', error);
              }
            });

          }).catch(function (error) {
          console.log('error', error);
        });

      },


    },
    mounted() {
      //如果带有code，则是登录获取token
      if (this.$route.query.code && !this.foowwLocalStorage.get("token") ){

       loginByCode({code:this.$route.query.code,state:'web'}).then(res=>{
          console.log('loginBycode:',res);
          if(res.status === 1){
          //  获取token成功
            var date = new Date().getTime();
            this.foowwLocalStorage.set('token',res.token,date+(1000*60*60*4) )//4小时过期
            //登录完成后初始化 config
            axios.defaults.headers.common['Authorization'] = res.token;
            this.config();
          }
        })

      }
      else if( !this.foowwLocalStorage.get("token") ){
      //  如果没有token
        var auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9df6ee154c684395&redirect_uri='
          + encodeURIComponent(location.href.split('?')[0]) + '&response_type=code&scope=snsapi_base&state=fuwu#wechat_redirect';
        window.location.replace(auth_url); //本地测试中需要关闭
      }
      else {
        axios.defaults.headers.common['Authorization'] = this.foowwLocalStorage.get("token");
        this.config();
      }




      getMagazine().then((res) => {
        console.log('getMagazine',res.data);
        this.magazine = res.data;
        console.log(this.magazine )
        this.$forceUpdate();
      })
    }
  }

  const foowwLocalStorage = {
    set: function (key, value, ttl_ms) {
      var data = { value: value, expirse: new Date(ttl_ms).getTime() };
      localStorage.setItem(key, JSON.stringify(data));
    },
    get: function (key) {
      var data = JSON.parse(localStorage.getItem(key));
      if (data !== null) {
        if (data.expirse != null && data.expirse < new Date().getTime()) {
          localStorage.removeItem(key);
        } else {
          return data.value;
        }
      }
      return null;
    }
  }
</script>

<style scoped>

  .logo{margin: 20px 0;}
  .page{min-height: 98vh;display: flex;flex-direction: column;justify-content: center;}
  .box{box-sizing: border-box;display: flex;
    justify-content: center;align-items: center;text-align: center;}
  .banner-image{
    width: 100%;
  }
  .banner-warp{
    width: 90%;
    display: inline-block;
    /* box-shadow: 0 0 5px 0 #999; */
    /* border: #eee solid 1px; */
  }
  .subscript{
    font-size: 12px;
    padding: 6px 12px;text-align: right;
  }
  .nav-warp{
    margin: 20px 0;
  }
  .title{
    font-size: 22px;
  }
  .nav-warp .subTitle{
    font-size: 10px;margin-top: 10px;color: #666;
  }
  .part-warp{
    padding-bottom: 80px;
  }
  .top-warp{padding-top: 50px;border-top: 30px #eee solid;}
  .badge{
    width: 50px;height: 70px;background: #ccc;font-size: 18px;color: white;text-align: center;font-family: "宋体";font-style: italic;
  }
  .pic{width: calc(100% - 70px);display: inline-block;box-sizing: border-box;box-shadow: 0 0 5px 0 #eee;padding-bottom: 20px;margin: 0 10px;}
  .pic .describe,.pic .text-sm{padding: 10px 20px;}
  .describe{
    font-size: 14px;padding: 10px;box-sizing: border-box;
  }
  .item{margin: 20px 0;margin-top: 0;}
  .flex{align-items:stretch;}

  /* 加载动画 */
  .loading-cover{display: flex;justify-content: center;transition: .6;flex-direction: column;align-items: center;width: 100%;height: 100vh;position: fixed;z-index: 98;background: white;}
  .loading-cover.hide{animation: hide .55s .2s 1 ease-out forwards;}
  @keyframes hide{
    0%{opacity: 1;}
    100%{opacity: 0;display: none;z-index: -1;}
  }
  .loading-cover.show{display: flex;}
  .loading-cover image{position: relative;width: 65vw;border: none;
    z-index: 99;height: auto;}
  .loading-bg-black{background: black;position: relative;margin-top: -10vh;overflow: hidden;}
  .loading-bg-red{background: #d90110;position: absolute;width: 100%;left: 0;bottom: 0;transition: all .2s;}

  .title-warp{font-weight: bold;}
  .title-warp .btn{
    font-size: 17px;font-weight: lighter;margin-top: 10px;
    background: #000;display: inline-block;color: white;
    padding: 5px 20px 5px 35px;letter-spacing: 15px;
  }
  .box{margin-bottom: 10vh;}
  .main{margin-top: 5vh;}

  /deep/ .menu{
    margin: 0;
    position:fixed;bottom: 0;left: 0;right: 0;
  }
.menu-list{text-align: left;font-size: 18px;}
  .menu-list .li{
    padding: 15px 10px;border-bottom: 1px #eee solid;margin-bottom: 15px;transition: all .35s;

  }
  .menu-list .li.active{
    border: #1b6d85 dashed 1px;background: rgba(100,100,100,.35);
    color: white;text-shadow: -2px 2px 10px #ccc;
  }
  .input-inline{display: inline-block;width: 8em;border: none;}

</style>
