<script setup lang="ts">
  import { useStore } from 'vuex'
  import { onBeforeMount } from 'vue'

  import index from './layout/index.vue'
  const store = useStore();

  onBeforeMount(() => {
    themecolor()
  })

  const themecolor = () => {
    document.querySelector("body").setAttribute("style", `background-color:${store.getters.showColor};transition: 0.7s;`);
  }
</script>

<template>
  <index />
</template>

<style>

</style>