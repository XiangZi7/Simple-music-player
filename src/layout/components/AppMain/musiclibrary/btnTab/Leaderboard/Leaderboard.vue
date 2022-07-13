<template>
    <div class="content-section menuBar-mv">
        <div class="content-section-title">
            <h2>排行榜</h2>
        </div>
        <div class="apps-card" v-infinite-scroll="load">
            <el-skeleton :rows="5" animated :loading="loading" />

            <div class="apps-item mv-text" v-for="(item, index) in lead.value" :key="index"
                @click="openplaylist(item.id)">
                <div class="app-card">
                    <img :src="item.coverImgUrl+ '?param=220y220'" alt="">
                </div>
                <a href="javascript:;">{{ item.name }}</a>
            </div>
        </div>
    </div>

</template>
<script setup lang='ts'>
import { getlead } from '@/request/api.js'
import { useRouter } from 'vue-router'
import { onBeforeMount, reactive, ref } from 'vue'
const router = useRouter();
const lead = reactive([])
const loading = ref(true)
const pages = ref(1)
const lms = ref(0)
// 无限滚动
const load = () => {
    pages.value += 1
    lms.value += 20
    showleader(pages.value, lms.value)
}

const showleader = (page = 1, lm = 0) => {
    getlead({
    }).then(res => {
        lead.value = res.data.list
        loading.value = false
    })
}
const openplaylist = (id) => {
    router.push({ name: "playlist", query: { playlistid: id } })
}

</script>
<style lang='scss'>
</style>