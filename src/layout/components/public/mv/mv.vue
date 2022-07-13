<template>

    <div class="content-section">
        <div class="apps-card ">
            <div class="apps-item mv-text " v-for="(item,index) in musicMV"
                @click="playMV(item.id,item.name,item.artistName)">
                <div class="app-card m-mv">
                    <img :src="item.cover+ '?param=370y220'" alt="">
                </div>
                <a href="#">{{item.name}}</a>
            </div>
        </div>
    </div>

</template>
<script setup lang='ts'>
    defineProps(['musicMV'])
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const playMV = (mvid, msname, arname) => {
        router.push({ name: 'playMV', query: { mvid: mvid, msname: msname, arname: arname } })
    }


</script>
<style lang='scss'>


</style>