<template>
  <div class="body">
<!--    <img class="logo" src="../../assets/images/logo.jpg" alt="">-->
<!--    <div v-for="item in magazine" :key="item.name">-->
      <div class='box'>
        <div class="banner-warp flex-col"  >
          <img class="banner-image" :src="magazine[0].headImg" />
          <div class=" subscript">
            已有 {{magazine[0].sold}} 人订阅
          </div>
          <div class="title-warp">
            <div class="title">
              <div class="date">{{magazine[0].subTitle}}</div>
              {{magazine[0].name}}
            </div>
            <div class="btn" @click="showMenu(magazine[0])" >购买</div>
          </div>
        </div>
      </div>
<!--    </div>-->

    <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="all">
        <div v-for="item in magazine" class="flex-row item-list">
          <img class="poster-md" :src="item.headImg" >
          <div class="flex flex-col">
            <h4 class="text-left"><strong>{{item.name}}</strong></h4>
            <small class="text-left">
              已有 {{item.sold}} 人订阅
            </small>
            <div class="btn btn-black" @click="showMenu(item)" >点击购买</div>
          </div>
        </div>
      </el-tab-pane>
<!--      购买过的记录-->
      <el-tab-pane label="SORTIE CODE" name="code">
          <div v-for="item in userBuyList" class="flex-row item-list">
            <img class="poster-md" :src="item.magazine.headImg" >
            <div class="flex flex-col">
              <h4 class="text-left"><strong>{{item.magazine.name}}</strong></h4>
              <el-link :underline="false" type="primary">{{item.readCode}}</el-link>
              <div class="text-sm">可用：{{item.tradeCount}} 已用：{{item.readCodeUsed}}</div>
              <div class="">
                <div class="btn btn-black btn-pad" @click="readCode=item.readCode;paySuccess=true">阅读</div>
                <el-tag type="info" class="martop-20" @click="cloneCode"
                        v-clipboard:copy="item.readCode"
                        v-clipboard:success="onCopy"
                >
                  <div class="btn btn-orange btn-pad" >复制</div>
                </el-tag>

              </div>
            </div>
          </div>
      </el-tab-pane>
    </el-tabs>

<!--    支付成功弹框-->
    <el-dialog :show-close="false" :visible.sync="paySuccess" custom-class="payDialog">
      <div>
        <img class="pay-logo" src="../../assets/images/logo.png" >
        <el-link :underline="false" type="info">长按识别小程序码</el-link>
        <el-link :underline="false" type="info">首次阅读需要输入阅读码</el-link>
        <img class="qrcode" src="../../assets/images/qrcode.jpg" alt="">
        <div v-if="readCode">
          <el-link :underline="false" type="info">点击复制阅读码</el-link>
          <br>
          <el-tag type="info" class="martop-20" @click="cloneCode"
                     v-clipboard:copy="readCode"
                     v-clipboard:success="onCopy"
                     >
            <strong>{{readCode}}</strong>
          </el-tag>
        </div>
      </div>
    </el-dialog>

<!-- 选择菜单 -->
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
        <el-button class="btn" @click="buy()" v-loading.fullscreen.lock="payDisable" >付款</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import axios from 'axios';
  import {loginByCode,getMagazine,userBuy,userRecord,getUserInfoByWechat} from '../../api'

  var isDev = false;//发布是时候需要改成 false

  export default {
    name: "pay",
    data() {
      return {
        activeTabName:'all',

        payDisable:false,//支付按钮是否失效（防止重复下单)
        paySuccess:false,//成功购买后弹框
        readCode:'',//

        magazine:[],menu: {},
        userBuyList:[],//存放购买过的单
        dialogTableVisible:false,
        checkedMenu: 0,//选中的套餐 第几个
        setMeal: [
          { number: '1', price: '6.00' },
          { number: '10', price: '60.00' },
          { number: '100', price: '600.00' },
        ],
        order:{number: '1', price: '6.00' },
        diyNumber:1,diyPrice:6,


        //设置缓存的对象
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
      handleTabClick(tab, event) {
        console.log(tab, event);
        if(tab.name ==="code"){
          this.getUserBuy();
        }
      },
      onCopy(){
        console.log('成功复制');
        this.$message({
          message: '成功复制阅读码，请到小程序中使用',
          type: 'success'
        });
      },
      chooseMenu(val){
        this.checkedMenu = val;
        if(val === -1)return;
        this.order = this.setMeal[val];
      },
      //点击自定义购买数量
      tradeCountFocus(){

      },
      diyTradeCount(val){
        var price = this.singlePrice;
        let tradePrice = val*price,discount = this.menu.discount||1;
        if(val>300)tradePrice = tradePrice * discount;
        if(tradePrice >= 3000){
          this.$message({
            message: '由于微信限制，单笔金额不建议超过3000哦',
            type: 'warning'
          });
        }
        this.diyPrice = tradePrice.toFixed(2);
        this.diyNumber = val;
        this.$forceUpdate();
      },
      showMenu(item){
        console.log('show menu',item);
        var price = item.price;
        this.singlePrice = price;
        //设置价格
        this.setMeal.forEach(item=>{
          item.price = (item.number*price).toFixed(2)
        })
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
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx9df6ee154c684395', // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature,// 必填，签名
              jsApiList:['chooseWXPay', "onMenuShareTimeline", "updateTimelineShareData","updateAppMessageShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            })

            wx.ready(res => {
              wx.checkJsApi({
                jsApiList: ['chooseWXPay', "onMenuShareTimeline", "updateTimelineShareData","updateAppMessageShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                  // 以键值对的形式返回，可用的api值true，不可用为false
                  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                  console.log('检测', res)
                }
              });
              //分享给朋友
              wx.updateAppMessageShareData({
                title: 'Sortie电子刊', // 分享标题
                desc: '欢迎阅读最新的Sortie电子刊', // 分享描述
                link: 'http://www.studiosortie.com/pay', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function () {
                  // 设置成功
                }
              })
            //  分享到朋友圈
              wx.updateTimelineShareData({
                title: 'Sortie电子刊', // 分享标题
                link: 'http://www.studiosortie.com/pay', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function () {
                  // 设置成功
                }
              })

            });

          }).catch(function (error) {
          console.log('error', error);
        });

      },
      buy() {
        if(this.payDisable){return;}//防止重复下单
        this.payDisable = true;
        const self = this;
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
            if(data.data.error_code !== 0){
              this.$message.error('付款失败，请重新进入该链接');
              return;
            }
            let paydatas = data.data.result,
              out_trade_no = data.data.out_trade_no;
            self.readCode = data.data.readCode;

              wx.chooseWXPay({
              timestamp: paydatas.timeStamp.toString(), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: paydatas.nonceStr, // 支付签名随机串，不长于 32 位
              package: "prepay_id=" + paydatas.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: paydatas.paySign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                // res.errMsg === 'chooseWXPay:ok'方式判断前端返回,微信团队郑重提示：
                // res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠， 切记。
                // if (res.errMsg === 'chooseWXPay:ok') {
                 self.paySuccess = true; //成功购买后弹框
                // }
                console.log('支付成功后的回调函数', res);
                // alert('支付成功后的回调函数', res.toString());
                self.payDisable = false;
              },
              // 支付取消回调函数
              cencel: function (res) {
                console.log('用户取消支付~',res)
                alert('用户取消支付', res);

                self.payDisable = false;
              },
              fail:function (res) {
                console.log('支付失败~',res)
                alert('支付失败', res);

                self.payDisable = false;
              },
              complete:function () {
              //完成时候回调
                console.log('//完成时候回调');
                self.payDisable = false;
                self.dialogTableVisible = false;
              }
            });

          }).catch(function (error) {
          console.log('error', error);
          self.payDisable = false;
        });
      },

      getUserBuy(){
        userBuy({token:this.foowwLocalStorage.get("token")}).then(res=>{
          console.log('userBuy:',res);
          this.userBuyList = res.data;
        })
      }
    },
    mounted() {
      //如果带有code，则是登录获取token
      var auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9df6ee154c684395&redirect_uri='
        + encodeURIComponent(location.href.split('?')[0]) + '&response_type=code&scope=snsapi_userinfo&state=fuwu#wechat_redirect';

      if (this.$route.query.code && !this.foowwLocalStorage.get("token") ){
       loginByCode({code:this.$route.query.code,state:'web'}).then(res=>{
          console.log('loginBycode:',res);
          if(res.status === 1){
            getUserInfoByWechat({openid:res.openid,access_token:res.access_token}).then(res=>{
              console.log('getUserInfoByWechat',res);
            })
          //  获取token成功
            var date = new Date().getTime();
            this.foowwLocalStorage.set('token',res.token,date+(1000*60*60*4) )//4小时过期
            //登录完成后初始化 config
            axios.defaults.headers.common['Authorization'] = res.token;
            this.config();
          }else{
            !isDev && window.location.replace(auth_url); //本地测试中需要关闭

          }
        })
      }
      else if( !this.foowwLocalStorage.get("token") ){
        //本地测试中需要关闭
        !isDev && window.location.replace(auth_url); //本地测试中需要关闭
     }
      else {
        axios.defaults.headers.common['Authorization'] = this.foowwLocalStorage.get("token");
        this.config();
      }

     this.getUserBuy();//获取购买记录
      // userRecord({token:this.foowwLocalStorage.get("token")}).then(res=>{
      //     console.log('userRecord:',res);
      //     this.RecordArr = res.data;
      // })
      getMagazine().then((res) => {
        console.log('getMagazine',res.data);
        this.magazine = res.data;
        this.diyPrice = res.data[0].price;
        this.setMeal[0].price = this.setMeal[0].number * this.diyPrice;
        this.setMeal[1].price = this.setMeal[1].number * this.diyPrice;
        this.setMeal[2].price = this.setMeal[2].number * this.diyPrice;
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

  .body{padding-top: 20px;}
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
    font-size: 19px;margin-top: 10px;
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
  .btn-pad{padding: 5px 15px;}
  .btn-pad:last-child{margin-right: 0;}

  /* 加载动画 */
  .loading-cover{display: flex;justify-content: center;transition:all .6;flex-direction: column;align-items: center;width: 100%;height: 100vh;position: fixed;z-index: 98;background: white;}
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
    font-size: 17px;font-weight: lighter;margin-top: 20px;
    background: #000;display: inline-block;color: white;
    padding: 5px 20px 5px 35px;letter-spacing: 15px;
  }
  .box{margin-bottom: 5vh;}
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
  /deep/ .el-tab-pane{
    border-top: 2px #eee solid;
  }
  .item-list{
    padding: 15px;border-radius: 4px;background: #eee;margin:15px 20px;
  }
  .flex-row{
    display: flex;justify-content: flex-start;align-items: stretch;

  }
  .flex-col{
    display: flex;justify-content: space-between;flex-direction: column;
  }
  .item-list .flex-col{
    align-items: flex-start;
  }

  .btn-black{
    background: #000;color: white;
  }
  .btn-orange{
    background: #cf9236;color: white;
  }
  .poster-md{
    width: 130px;margin-right: 20px;
    max-height: 171px;
  }

  /deep/ .payDialog .el-dialog__header{
  display: none;
  }
  /deep/ .payDialog{
    border-radius: 10px;width: 80%;
  }
  /deep/ .payDialog .el-dialog__body{
  }
  .pay-logo{width: 40%;margin: auto;margin-bottom: 30px;display: block;}
  .qrcode{width: 50%;margin: 20px;}
  .martop-20{margin-top: 10px;}

  /deep/ .el-tabs__nav-wrap::after{top:0;bottom: auto;}
  /deep/ .el-tabs__active-bar{background: #000;height: 3px;}
  /deep/ .el-tabs__nav-scroll{
    display: flex;justify-content: center;align-items: center;
  }
  /deep/ .el-tabs__item{
    color: #ccc;width: 10em;margin: 10px 0;
  }
  /deep/ .el-tabs__item.is-active{
    color: #000;font-weight: bold;
  }
  .text-sm{font-size: 12px;}
  .date{margin-right: 16px;font-family:serif,-webkit-pictograph;}

</style>
