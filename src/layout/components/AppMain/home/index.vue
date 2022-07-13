<template>
    <!-- //////////////////// -->
    <!-- ////  home  ///// -->
    <!-- //////////////////// -->
    <cover />
    <div class="content-section">
        <indexcontent />
    </div>
    <indexcontent2 style="margin-top: 50px;" />

</template>
<script setup lang='ts'>
    import cover from './indexcover/indexcover.vue'
    import indexcontent from '../musiclibrary/newmusic/newmusic.vue'
    import indexcontent2 from '../songList/songList.vue'

</script>
<style lang='scss'>


</style>