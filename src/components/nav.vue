<template>
  <div class="header container">
    <div class="nav-bar">
      <div class="search">

      </div>
      <div class="icon">
        <a href="javascript:void(0);">
          <img src="../assets/images/logo.jpg" alt="Sortie">
        </a>
      </div>
      <div class="options">
        

      </div>
    </div>
    <div class="nav-tab-bar">

    </div>
  </div>

</template>

<script>
    export default {
        name: "nav"
    }


</script>

<style scoped>
  .header{
    margin-top: 10px;margin-bottom: 10px;
  }
.nav-bar{
  display: flex;justify-content: space-between;
}
  .nav-tab-bar{
    display: flex;justify-content: center;
  }
</style>
