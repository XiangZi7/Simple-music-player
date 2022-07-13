<template>
    <div class="content-section  menuBar-mv">
        <div class="content-section-title">
            <h2>歌手</h2>
        </div>
        <div class="m-singer">
            <el-button @click="singerlist(1)">华语</el-button>
            <el-button @click="singerlist(2)">欧美</el-button>
            <el-button @click="singerlist(3)">韩国</el-button>
            <el-button @click="singerlist(4)">日本</el-button>
        </div>
        <div class="apps-card infinite-list">
            <div class="apps-item infinite-list-item mv-text" v-for="(item, index) in singerlistinfo.value "
                @click="showar(item.id)" :key="index">
                <div class="app-card m-avatar">
                    <img :src="item.img1v1Url+ '?param=220y220'" alt="">
                </div>
                <a href="javascript:;">{{ item.name }}</a>
            </div>
        </div>
        <!-- <ul >
            <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
        </ul> -->
    </div>


</template>
<script setup lang='ts'>
import { getsingerlis } from '@/request/api.js'
import { useRouter } from 'vue-router'

const router = useRouter()
import { ref, reactive, onBeforeMount } from 'vue'
let singerlistinfo = reactive([])

onBeforeMount(() => {
    singerlist()
})
const singerlist = (type = 1) => {
    getsingerlis({
        type
    }).then(res => {
        singerlistinfo.value = res.data.list.artists
    })
}
const showar = (id) => {
    router.push({ name: "artist", query: { sgingid: id } })
}
</script>
<style lang='scss'>
</style>