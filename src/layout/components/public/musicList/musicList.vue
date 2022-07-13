<template>

    <div class="content-section">
        <div class="apps-card">
            <div class="apps-item" v-for="(item,index) in musicLists" :key="index" @click="playlist(item.id)">
                <div class="app-card">
                    <img :src="item.coverImgUrl+ '?param=220y220'" alt="">
                </div>
                <a href="javascript:;">{{item.name}}</a>
            </div>

        </div>

    </div>

</template>
<script setup lang='ts'>
    defineProps(['musicLists'])
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const playlist = (id) => {
        router.push({ name: "playlist", query: { playlistid: id } })
    }

</script>
<style lang='scss'>


</style>