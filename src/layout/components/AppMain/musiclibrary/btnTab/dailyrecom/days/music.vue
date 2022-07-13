<template>

    <ul class="t-title">
        <li class="adobe-product">
            <div class="products Music-name">歌曲名</div>
            <span class="status">歌手</span>
            <span class="status alb"> 专辑</span>
            <span class="status">时间</span>
            <div class="button-wrapper">
            </div>
        </li>

    </ul>
    <el-skeleton :rows="7" animated :loading="loading" />
    <ul class="s-list">
        <li class="adobe-product" v-for="(item, index) in musicArr.value" :key="index" @dblclick="runAPI(item.id)">
            <div class="products Music-name">
                <img :src="item.al.picUrl + '?param=28y28'" alt="" />
                {{ item.name }}
            </div>
            <span class="status" @click="flyawayar(item.ar[0].id)" style="cursor: pointer;">
                <span class="status-circle green"></span>
                {{ item.ar[0].name }}</span>
            <span class="status alb"> {{ item.al.name }}</span>
            <span class="status">{{ musicdt(item.dt) }}</span>

            <div class="button-wrapper">
                <!-- 播放 -->
                <svg @click="runAPI(item.id)" t="1648883741930" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2199" width="28" height="28">
                    <path
                        d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                        p-id="2200" fill="#525B72"></path>
                    <path
                        d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                        p-id="2201" fill="#525B72"></path>
                </svg>
                <!-- NV -->
                <svg v-if="item.mv != 0" @click="playMV(item.mv, item.al.name, item.ar[0].name)" t="1648883775602"
                    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3156"
                    width="40" height="40">
                    <path
                        d="M590.3 532.7l-118 88.5c-9.8 7.3-23.6 5.3-31-4.4-2.9-3.8-4.4-8.5-4.4-13.3v-177c0-12.2 9.9-22.1 22.1-22.1 4.8 0 9.4 1.6 13.3 4.4l118 88.5c9.8 7.3 11.8 21.2 4.4 31-1.2 1.6-2.7 3.1-4.4 4.4zM247.5 205.3h530.9c48.9 0 88.5 39.6 88.5 88.5v442.4c0 48.9-39.6 88.5-88.5 88.5H247.5c-48.9 0-88.5-39.6-88.5-88.5V293.8c0-48.9 39.7-88.5 88.5-88.5z m442.4 44.3H336v530.9h353.9V249.6zM203.3 382.3h88.5V249.6h-44.2c-24.4 0-44.2 19.8-44.2 44.2v88.5z m619.3 0v-88.5c0-24.4-19.8-44.2-44.2-44.2h-44.2v132.7h88.4zM203.3 647.7v88.5c0 24.4 19.8 44.2 44.2 44.2h44.2V647.7h-88.4z m0-44.2h88.5v-177h-88.5v177z m619.3 44.2h-88.5v132.7h44.2c24.4 0 44.2-19.8 44.2-44.2v-88.5z m0-44.2v-177h-88.5v177h88.5z"
                        p-id="3157" fill="#525B72"></path>
                </svg>
                <!-- 下载 -->
                <svg t="1648883905939" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4298" width="28" height="28">
                    <path
                        d="M802 664v146c0 7.7-6.3 14-14 14H236c-7.7 0-14-6.3-14-14V664c0-5.5-4.5-10-10-10h-50c-5.5 0-10 4.5-10 10v170c0 33.1 26.9 60 60 60h600c33.1 0 60-26.9 60-60V664c0-5.5-4.5-10-10-10h-50c-5.5 0-10 4.5-10 10z"
                        p-id="4299" fill="#525B72"></path>
                    <path
                        d="M547 163v449.5l173.6-173.6c13.7-13.7 35.8-13.7 49.5 0 13.7 13.7 13.7 35.8 0 49.5L536.8 721.7c-0.4 0.4-0.8 0.8-1.3 1.2-0.2 0.2-0.4 0.4-0.6 0.5-0.2 0.2-0.4 0.4-0.7 0.6-0.3 0.2-0.5 0.4-0.8 0.6-0.2 0.1-0.4 0.3-0.5 0.4l-0.9 0.6c-0.2 0.1-0.3 0.2-0.5 0.3-0.3 0.2-0.6 0.4-1 0.6-0.2 0.1-0.3 0.2-0.5 0.3-0.3 0.2-0.6 0.4-1 0.5-0.2 0.1-0.4 0.2-0.5 0.3-0.3 0.2-0.6 0.3-0.9 0.5l-0.6 0.3c-0.3 0.1-0.6 0.3-0.8 0.4-0.2 0.1-0.5 0.2-0.7 0.3-0.3 0.1-0.5 0.2-0.8 0.3l-0.9 0.3c-0.2 0.1-0.4 0.2-0.7 0.2-0.3 0.1-0.6 0.2-1 0.3-0.2 0.1-0.4 0.1-0.6 0.2-0.4 0.1-0.7 0.2-1.1 0.3-0.2 0-0.4 0.1-0.6 0.1-0.4 0.1-0.7 0.2-1.1 0.2-0.2 0-0.4 0.1-0.6 0.1-0.4 0.1-0.7 0.1-1.1 0.2-0.2 0-0.4 0.1-0.7 0.1-0.3 0-0.7 0.1-1 0.1-0.3 0-0.6 0-0.9 0.1-0.3 0-0.5 0-0.8 0.1-1.2 0.1-2.3 0.1-3.5 0-0.3 0-0.5 0-0.8-0.1-0.3 0-0.6 0-0.9-0.1-0.3 0-0.7-0.1-1-0.1-0.2 0-0.4-0.1-0.7-0.1-0.4-0.1-0.7-0.1-1.1-0.2-0.2 0-0.4-0.1-0.6-0.1-0.4-0.1-0.7-0.2-1.1-0.2-0.2 0-0.4-0.1-0.6-0.1-0.4-0.1-0.7-0.2-1.1-0.3-0.2-0.1-0.4-0.1-0.6-0.2-0.3-0.1-0.6-0.2-1-0.3-0.2-0.1-0.5-0.1-0.7-0.2l-0.9-0.3c-0.3-0.1-0.5-0.2-0.8-0.3-0.2-0.1-0.5-0.2-0.7-0.3-0.3-0.1-0.6-0.3-0.8-0.4l-0.6-0.3c-0.3-0.2-0.6-0.3-0.9-0.5-0.2-0.1-0.4-0.2-0.5-0.3-0.3-0.2-0.6-0.4-1-0.6-0.2-0.1-0.3-0.2-0.5-0.3-0.3-0.2-0.6-0.4-1-0.6-0.2-0.1-0.3-0.2-0.5-0.3-0.3-0.2-0.6-0.4-0.9-0.7-0.2-0.1-0.3-0.3-0.5-0.4-0.3-0.2-0.5-0.4-0.8-0.6-0.2-0.2-0.4-0.4-0.7-0.6-0.2-0.2-0.4-0.4-0.6-0.5l-1.2-1.2-233.1-233.1c-13.7-13.7-13.7-35.8 0-49.5 13.7-13.7 35.8-13.7 49.5 0L477 612.5V163c0-19.3 15.7-35 35-35s35 15.7 35 35z"
                        p-id="4300" fill="#525B72"></path>
                </svg>
            </div>
        </li>
    </ul>

</template>
<script setup lang='ts'>
import { musicdt } from 'utils/index.ts'
import { getsongday, playMusicApi, getdetailApi } from '@/request/api.js'
import { ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(true)
// defineProps(['musicArr'])
const store = useStore()

onBeforeMount(() => {
    playsong()
})
const musicArr = reactive([])

const playsong = () => {
    getsongday({}).then(res => {
        musicArr.value = res.data.data.dailySongs;
        loading.value = false
        // console.log(res.data.data.dailySongs);

    })
}
const flyawayar = (id) => {
    router.push({ name: 'artist', query: { sgingid: id } })
}
const playMusic = (id) => {
    return playMusicApi({
        id
    })
}
// 获取歌曲信息
const getdta = (id) => {
    return getdetailApi({
        id
    })
}
const musicmodemsg = (msg) => {
    ElMessage({
        showClose: true,
        message: `《${msg}》 暂无版权`,
        type: 'error',
    })
}
const runAPI = (id) => {
    axios.all([
        playMusic(id),
        getdta(id)
    ]).then(axios.spread((res1, res2) => {
        let dedup = Boolean
        for (let index = 0; index < store.getters.showMusicinfo.length; index++) {
            if (store.getters.showMusicinfo[index].id === res2.data.songs[0].id) {
                // console.log(store.getters.showMusicinfo[index].id);
                store.commit("setsongi", index)

                dedup = true
                break
            } else {
                dedup = false
            }
        }
        if (dedup == false) {
            let songurl = res1.data.data[0].url;
            let songname = res2.data.songs[0].name
            let songarname = res2.data.songs[0].ar[0].name
            let songpicurl = res2.data.songs[0].al.picUrl
            let songid = res2.data.songs[0].id
            let songal = res2.data.songs[0].al.name
            let songdt = res2.data.songs[0].dt
            if (songurl != null) {
                store.commit("addMusic", {
                    amount1: songname,
                    amount2: songarname,
                    amount3: songurl,
                    amount4: songpicurl,
                    amount5: songid,
                    amount6: songal,
                    amount7: songdt,
                })
                songurl = null
                store.commit("setsongi", store.getters.showMusicinfo.length - 1)
            } else {
                musicmodemsg(songname);
            }
        }
    }))
}
const playMV = (mvid, msname, arname) => {
    store.commit("setplaymvstop", true)

    router.push({ name: 'playMV', query: { mvid: mvid, msname: msname, arname: arname } })
}
</script>
<style lang='scss'>
</style>