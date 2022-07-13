<template>
    <div class="content-wrapper-header" style="margin-top: -10px;">
        <video src="@/static/mp4/B站.mp4" autoplay loop muted style="border-radius: 14px;width: 100%;"></video>
    </div>
    <div class="m-lib">
        <el-button color="#409EFF" round class="m-lib-btn" @click="ckdl">每日推荐</el-button>
        <el-button color="#FF98A5" round class="m-lib-btn" @click="ckmv">最新MV</el-button>
        <el-button color="#626aef" round class="m-lib-btn" @click="ckle">排行榜</el-button>
        <el-button color="#EBA5F0" round class="m-lib-btn" @click="cksinger"> 歌手</el-button>
    </div>

    <div class="content-section">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="热门歌曲" name="first">
                <hotmusic />
            </el-tab-pane>
            <el-tab-pane label="歌单" name="second">
                <musicList />
            </el-tab-pane>
            <el-tab-pane label="MV" name="third">
                <mv />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang='ts'>
    import hotmusic from './newmusic/newmusic.vue'
    import musicList from 'coms/AppMain/songList/songList.vue'
    import mv from 'coms/AppMain/mv/mv.vue'
    import { ref } from 'vue'
    import type { TabsPaneContext } from 'element-plus'
    import { useRouter } from 'vue-router'
    const activeName = ref('first')
    const handleClick = (tab: TabsPaneContext, event: Event) => {
        // console.log(tab, event)
    }
    // onBeforeMount(() => {
    //     playsong()
    // })
    // const playsong = () => {
    //     getnewmusic({}).then(res => {
    //         musicArr.value = res.data.result;
    //     })
    // }
    const router = useRouter();
    const ckdl = () => {
        router.push({ name: 'dailyrecom' })
    }
    const cksinger = () => {
        router.push({ name: 'singer' })
    }
    const ckmv = () => {
        router.push({ name: 'newmv' })
    }
    const ckle = () => {
        router.push({ name: 'Leaderboard' })
    }


</script>
<style lang='scss'>
    .m-lib {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;

        span {
            color: #fff;
        }

        .m-lib-btn {
            height: 40px;
            width: 250px;
        }
    }

    .el-tabs__nav-wrap::after {
        background-color: transparent;
    }
</style>