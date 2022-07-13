<template>
    <div class="content-section menuBar-mv">
        <div class="content-section-title">
            <h2>电台</h2>
        </div>
        <div class="apps-card" v-infinite-scroll="load">
            <el-skeleton :rows="5" animated :loading="loading" />

            <div class="apps-item mv-text" v-for="(item,index) in radio.value" :key="index">
                <div class="app-card">
                    <img :src="item.picUrl+ '?param=220y220'" alt="">
                </div>
                <a href="javascript:;">{{item.name}}</a>
                <p class="copywriter">{{item.copywriter}}</p>
            </div>

        </div>

    </div>

</template>
<script setup lang='ts'>
    import { getradio } from '@/request/api.js'
    import { useRouter } from 'vue-router'
    import { onBeforeMount, reactive, ref } from 'vue'
    const router = useRouter();
    const radio = reactive([])
    const loading = ref(true)
    const pages = ref(1)
    const lms = ref(0)
    // 无限滚动
    const load = () => {
        pages.value += 1
        lms.value += 20
        showradio(pages.value, lms.value)
    }


    // onBeforeMount(() => {
    //     showradio()
    // })
    const showradio = (page = 1, lm = 0) => {
        getradio({
            limit: lm,
            offset: (page - 1) * 20
        }).then(res => {
            radio.value = res.data.djRadios
            loading.value = false

        })
    }
    // const playList = (id) => {
    //     router.push({ name: "playlist", query: { playlistid: id } })
    // }

</script>
<style lang='scss'>


</style>