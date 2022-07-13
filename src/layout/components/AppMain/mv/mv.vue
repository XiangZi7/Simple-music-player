<template>

    <div class="content-section menuBar-mv">
        <div class="apps-card ">
            <el-skeleton :rows="5" animated :loading="loading" />

            <div class="apps-item mv-text" v-for="(item,index) in songMV.value" :key="index"
                @click="playMV(item.id,item.name,item.artistName)">
                <div class="app-card m-mv">
                    <img :src="item.cover+'?param=370y220'" alt="">
                </div>
                <a href="javascript:;">{{item.name}}</a>
            </div>

        </div>
    </div>
</template>
<script setup lang='ts'>
    import { getnewMV } from '@/request/api.js'
    import { useRouter } from 'vue-router'

    import { onBeforeMount, reactive, ref } from 'vue'
    const loading = ref(true)

    const songMV = reactive([])
    const router = useRouter();

    onBeforeMount(() => {
        getNewMVs()
    })

    const getNewMVs = () => {
        getnewMV({}).then(res => {
            songMV.value = res.data.data;
            loading.value = false

        })
    }
    const playMV = (id, msname, arname) => {
        router.push({ name: "playMV", query: { mvid: id, msname: msname, arname: arname } })
    }


</script>
<style lang='scss'>


</style>