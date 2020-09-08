<template>
  <div class="header container pc-only">
    <div class="nav-bar">
      <div class="search">
        <router-link to="/search" class="search-warp">
          <el-input v-model="searchInput"
                    v-if="$route.path != '/search'"
                    :placeholder="langValue ==='Chinese' ? '搜索':'Search'"></el-input>
        </router-link>
<!--        @focus="searchOnfocus" @blur="searchBlur"-->
<!--        :class="'searchInput '+ searchActive"-->
      </div>
      <div class="icon">
        <router-link to="/">
          <img class="logo-icon" src="../assets/images/logo.png" alt="Sortie">
        </router-link>
      </div>
      <div class="options">
        <el-select v-model="langValue" placeholder="请选择" @change="changeLang()" size="mini">
          <el-option
            v-for="item in langOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
<!--        <a class="line" href="">-->
<!--          <span>-->
<!--            {{langValue ==='Chinese' ?'登录':'Login'}}-->
<!--          </span>-->
<!--        </a>-->
<!--        <a class="line" href="">-->
<!--          {{langValue ==='Chinese' ?'我的订单':'Record'}}-->
<!--        </a>-->

      </div>
    </div>
<!--    导航栏列表 -->
    <div class="nav-tab-bar">
      <div class="tab" v-if="thisPath != '/'">
        <router-link to="/">
          首页
        </router-link>
      </div>
      <div class="tab" v-for="item in tabArr"
           :class="[langValue==='Chinese'?'bold':'',$route.path == item.path ? 'active':'' ]"
           :v-key="item">
        <router-link :to="item.path">
          {{item.name}}
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "NavClient",
      data(){
          return{
            searchInput: '',
            thisPath:'/',
            langOptions: [
              {
              value: 'Chinese',
              label: '中文'
              }, {
                value: 'English',
                label: 'English'
              },
            ],
            langValue: 'Chinese',

            tabArrCn:[{name:'关于我们',path:'/about'},{name:'电子刊',path:'/magazine'},{name:'资讯活动',path:'/news'},{name:'商店',path:'/store'}],
            tabArrEn:[{name:'ABOUT',path:'/about'},{name:'MAGAZINE',path:'/magazine'},{name:'NEWS',path:'/news'},{name:'STORE',path:'/store'}],
            tabArr:[],
            searchActive:"",
          }
      },
      mounted(){
        this.tabArr = this.tabArrCn //默认是中文导航
      },
      watch:{
        $route:{
          handler(val,oldval){
            this.thisPath = val.path
          },
          deep: true          // 深度观察监听
        }
      },
      methods:{
        searchOnfocus(){
          this.searchActive = 'searchActive';
          this.$router.push({
            path:'/search'
          })
        },
        searchBlur(){
          this.searchActive = "";

          this.$router.back();
        },
        changeLang(){
          console.log('changLang')
          var lang = this.langValue;
          this.tabArr = (lang === 'Chinese') ? this.tabArrCn : this.tabArrEn;
        }
      }
    }


</script>

<style scoped>
  a{text-decoration: none;color: #000000;}
  .header{
    margin-top: 10px;margin-bottom: 10px;position: relative;
  }
  .icon{
    width: 130px;
  }
  .search{text-align: left;}
  .options{
    font: 400 12px Arial;
    line-height: 40px;
  }
  .search,.options{width: 200px;}
  /*.search-warp{position: relative;}*/
  .searchInput{transition: all .3s;position: absolute;
    width: 200px;
    left: 15px;
    top: 0;
  }
  .searchActive{
    position: absolute;
    z-index: 99;
    width: 250px;
    left: 50%;
    top: 120px;
    transform: translateX(-125px);
  }
.nav-bar{
  display: flex;justify-content: space-between;
}
  .nav-tab-bar{
    margin-top: 25px;margin-bottom: 25px;
    display: flex;justify-content: center;
  }
  .nav-tab-bar .tab{
   margin: 0 40px;font-size: 16px;font-weight: bold;
  }
  .nav-tab-bar .tab.active a{
    color: #646363;
  }
  .bold{
    font-weight: bold;
  }
  .logo-icon{
    width: 70px;
    margin-top: 8px;
  }
  .line{margin-right: 10px;}
 /deep/ .options .el-input{
    width: 70px;
  }
  /deep/ .el-input__inner{
    padding-right: 0;border: none;
  }
  /deep/ .search .el-input__inner:focus{
    border: 1px #eee solid;
  }
</style>
