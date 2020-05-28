<template>
  <div class="header container">
    <div class="nav-bar">
      <div class="search">
        <el-input v-model="searchInput" placeholder="搜索"></el-input>
      </div>
      <div class="icon">
        <a href="javascript:void(0);">
          <img src="../assets/images/logo.jpg" alt="Sortie">
        </a>
      </div>
      <div class="options">
        <el-select v-model="langValue" placeholder="请选择" size="mini">
          <el-option
            v-for="item in langOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <a class="line" href="">登录</a>
        <a class="line" href="">我的订单</a>

      </div>
    </div>
    <div class="nav-tab-bar">
      <div class="tab">
        关于我们
      </div>
      <div class="tab">
        电子刊
      </div>
      <div class="tab">
        咨询活动
      </div>
      <div class="tab">
        商店
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "nav",
      data(){
          return{
            searchInput: '',
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
          }
      },
      mounted(){

      },
      methods:{

      }
    }


</script>

<style scoped>
  .header{
    margin-top: 10px;margin-bottom: 10px;
  }
  .icon{
    width: 150px;
  }
  .search{text-align: left;}
  .options{
    font: 400 12px Arial;
    line-height: 50px;
  }
  .search,.options{width: 200px;}
.nav-bar{
  display: flex;justify-content: space-between;
}
  .nav-tab-bar{
    margin-top: 25px;margin-bottom: 25px;
    display: flex;justify-content: center;
  }
  .nav-tab-bar .tab{
    font-weight: bold;margin: 0 20px;font-size: 16px;
  }
  .line{margin-right: 10px;}
 /deep/ .el-input{
    width: 70px;
  }
  /deep/ .el-input__inner{
    padding-right: 0;border: none;
  }
</style>
