<template>

    <div class="content-section">
        <div class="apps-card">
            <div class="apps-item" v-for="(item,index) in musicAlbum" :key="index" @click="playalbum(item.id)">
                <div class="app-card">
                    <img :src="item.picUrl+'?param=220y220'" alt="">
                </div>
                <a href="javascript:;">{{item.name}}</a>
            </div>

        </div>

    </div>

</template>
<script setup lang='ts'>
    defineProps(['musicAlbum'])
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const playalbum = (id) => {
        router.push({ name: 'artist', query: { sgingid: id } })
    }

</script>
<style lang='scss'>


</style>