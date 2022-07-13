<template>


    <div class="content-section menuBar-mv">
        <div class="apps-card">
            <el-skeleton :rows="5" animated :loading="loading" />
            <div class="apps-item" v-for="(item,index) in songlistarr.value" :key="index" @click="playList(item.id)">
                <div class="app-card">
                    <img :src="item.coverImgUrl+'?param=220y220'" alt="">
                </div>
                <a href="javascript:;">{{item.name}}</a>
            </div>
        </div>
        <div class="pagination">
            <el-pagination layout="prev, pager, next, jumper" :small="small" :background="background"
                v-model:currentPage="currentpage" :total="listtotal" :disabled="disabled"
                @current-change="handleCurrentChange" />
        </div>
    </div>

</template>
<script setup lang='ts'>
    import { getsongList } from '@/request/api.js'
    import { useRouter } from 'vue-router'
    import { onBeforeMount, reactive, ref } from 'vue'
    const router = useRouter();
    const loading = ref(true)
    // 分页 
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)
    const currentpage = ref(1)
    const handleCurrentChange = (val) => {
        getsonglists(val)
    }
    // 获取歌单
    const listtotal = ref()
    const songlistarr = reactive([])
    onBeforeMount(() => {
        getsonglists()
    })
    const getsonglists = (page = 1) => {
        getsongList({
            limit: 15,
            offset: (page - 1) * 15
        }).then(res => {
            songlistarr.value = res.data.playlists
            listtotal.value = res.data.total
            loading.value = false
        })
    }
    const playList = (id) => {
        router.push({ name: "playlist", query: { playlistid: id } })
    }
</script>
<style lang='scss'>


</style>