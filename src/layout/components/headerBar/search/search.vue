<template>

  <div class="content-section menuBar-mv">
    <div class="content-section-title">
      <h1>{{ router.query.keyworks }}</h1> <span>{{ songCount }}个结果</span>
    </div>
    <div class="content-section menuBar-mv">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="热门歌曲" name="first">
          <hotmusic :musicArr="musicArr.value" />
          <div class="pagination">
            <el-pagination layout="prev, pager, next, jumper" :small="small" :background="background"
              v-model:currentPage="currentpage" :total="songCount" :disabled="disabled"
              @current-change="handleCurrentChange" />
          </div>
          <el-skeleton :rows="10" animated :loading="loading" />
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <musicList :musicLists="musicLists.value" />
          <el-skeleton :rows="5" animated :loading="loading" />
        </el-tab-pane>
        <el-tab-pane label="MV" name="third">
          <mv :musicMV="musicMV.value" />
          <el-skeleton :rows="10" animated :loading="loading" />
        </el-tab-pane>
        <el-tab-pane label="专辑" name="fourth">
          <album :musicAlbum="musicAlbum.value" />
          <el-skeleton :rows="10" animated :loading="loading" />

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>
<script setup lang='ts'>
import hotmusic from 'coms/public/hotMusic/hotMusic.vue'
import musicList from 'coms/public/musicList/musicList.vue'
import mv from 'coms/public/mv/mv.vue'
import album from 'coms/public/album/album.vue'
import { ref, reactive, onBeforeMount, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMusicinfo } from '@/request/api.js'
const router = useRoute();
const activeName = ref('first')
const songCount = ref(0)
const loading = ref(true)

// 分页 
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentpage = ref(1)
const handleCurrentChange = (val) => {
  searchMusic(val)
}


const musicArr = reactive([])
const musicLists = reactive([])
const musicMV = reactive([])
const musicAlbum = reactive([])
const handleClick = (tab, event) => {
}
watch(() => router.query.keyworks, () => {
  // console.log(router.query.keyworks);
  searchMusic()
})

watch(() => activeName.value, () => {
  let type = 1;
  switch (activeName.value) {
    case 'first':
      type = 1;
      break;
    case 'second':
      type = 1000;
      break;
    case 'third':
      type = 1004;
      break;
    case 'fourth':
      type = 100;
      break;
    default:
      break;
  }
  getMusicinfo({
    keywords: router.query.keyworks,
    limit: 30,
    offset: (1 - 1) * 30,
    type,
  }).then(res => {
    if (type == 1) {
      songCount.value = res.data.result.songCount
      musicArr.value = res.data.result.songs
    } else if (type == 1000) {
      musicLists.value = res.data.result.playlists;
    } else if (type == 1004) {
      musicMV.value = res.data.result.mvs;
      // console.log( musicMV.value);
    } else if (type == 100) {
      musicAlbum.value = res.data.result.artists
      // console.log(musicAlbum.value);
    }
  })
})
onMounted(() => {
  searchMusic()
})
const searchMusic = (page = 1) => {
  getMusicinfo({
    keywords: router.query.keyworks,
    limit: 30,
    offset: (page - 1) * 30,
    type: 1,
  }).then(res => {
    songCount.value = res.data.result.songCount
    musicArr.value = res.data.result.songs
    loading.value = false
  })
}

</script>
<style lang='scss'>
.el-tabs__nav-wrap::after {
  background-color: transparent;
}
</style>