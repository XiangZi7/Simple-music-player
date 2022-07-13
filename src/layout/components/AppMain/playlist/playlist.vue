<template>
    <div class="content-section menuBar-mv">
        <div class="m-artist">
            <el-skeleton :rows="5" animated :loading="loading" />
            <div class="artist-avatar">
                <img :src="playlists.value.coverImgUrl" alt="" class="pllist" >
            </div>
            <div class="artist-name">
                <h2>{{ playlists.value.name }}</h2>
                <div class="listcover">
                    <img :src="playlists.value.creator.avatarUrl + '?param=60y60'" alt="" >
                    <a href="javascript:;">{{ playlists.value.creator.nickname }}</a>
                </div>
                <div class="tags">
                    <ul>
                        <span>标签：</span>
                        <li v-for="(item1, index) in songtags.value" :key="index">{{ item1 }}</li>
                    </ul>
                </div>
                <p :title="playlists.value.description"> {{ playlists.value.description }}</p>
            </div>
        </div>
        <hotmusic :musicArr="musicArr.value" />
        <!-- 评论 -->
        <div class="content-section " style="margin-top: 0;">
            <div class="apps-card">
                <div class="app-card usercom" v-for="(item, index) in listcom.value" :key="index">
                    <span>
                        <img class="useravatar" :src="item.user.avatarUrl + '?param=32y32'" alt="">
                        {{ item.user.nickname }}
                    </span>
                    <div class="app-card__subtext">{{ item.content }}</div>
                    <div class="com-time">
                        <span>{{ item.timeStr }}</span>
                        <span class="usercountlike">{{ item.likedCount }}赞</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <el-pagination layout="prev, pager, next, jumper" :small="small" :background="background"
                v-model:currentPage="currentpage" :total="listcount" :disabled="disabled"
                @current-change="handleCurrentChange" />
        </div>
    </div>


</template>
<script setup lang='ts'>
import hotmusic from 'coms/public/hotMusic/hotMusic.vue'
import { getplaylist, getcomment } from '@/request/api.js'
import { reactive, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()
const playlists = reactive([])
const songtags = reactive([])
const musicArr = reactive([])
const listcom = reactive([])
const listcount = ref()
const loading = ref(true)
// 分页 
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentpage = ref(1)
const handleCurrentChange = (val) => {
    showcomment(val)
}

watch(() => router.query.playlistid, () => {
    playList()
})

onBeforeMount(() => {
    playList()
    showcomment()
})
const playList = () => {
    getplaylist({
        id: router.query.playlistid
    }).then(res => {
        playlists.value = res.data.playlist
        songtags.value = res.data.playlist.tags
        musicArr.value = res.data.playlist.tracks
        loading.value = false
    })

}
const showcomment = (page = 1) => {
    getcomment({
        id: router.query.playlistid,
        limit: 15,
        offset: (page - 1) * 15,
    }).then(res => {
        listcom.value = res.data.comments
        listcount.value = res.data.total;

    })
}

</script>
<style lang='scss'>
</style>