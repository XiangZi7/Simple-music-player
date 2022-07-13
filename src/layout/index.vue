<template>


  <div class="app">
    <!-- //////////////////// -->
    <!-- ////  MenuBar  ///// -->
    <!-- //////////////////// -->
    <HeaderBar />
    <div class="wrapper">
      <!-- //////////////////// -->
      <!-- ////  MenuBar  ///// -->
      <!-- //////////////////// -->
      <MenuBar />
      <div class="main-container">
        <div class="content-wrapper">
          <!-- //////////////////// -->
          <!-- ////  AppMain  ///// -->
          <!-- //////////////////// -->
          <router-view  />
        </div>
        <player />

      </div>

    </div>

    <div class="overlay-app"></div>
  </div>

</template>
<script setup lang='ts'>
  import HeaderBar from './components/headerBar/headerBar.vue'
  import MenuBar from './components/menuBar/MenuBar.vue'
  import player from './components/Player/Player.vue'
  import '../static/css/main.scss'


</script>
<style lang='scss'>


</style>