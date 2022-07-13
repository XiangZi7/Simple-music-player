<template>
    <div class="content-section menuBar-mv">
        <video controls loop autoplay :src="mvUrl" style="width: 100%; border-radius: 10px;"></video>
        <div class="content-section-title">
            <h2>{{ router.query.msname }} <span style="margin:0px 10px;">-</span><span> {{ router.query.arname }}
                </span>
            </h2>
        </div>
        <!-- 评论 -->
        <div class="content-section " style="margin-top: 0;">
            <div class="apps-card">
                <div class="app-card usercom" v-for="(item, index) in mvComments.value" :key="index" >
                    <span >
                      <img  class="useravatar" :src="item.user.avatarUrl+ '?param=32y32'" alt="">
                       {{ item.user.nickname }}
                    </span>
                    <div class="app-card__subtext">{{item.content}}</div>
                     <div class="com-time">
                        <span>{{ item.timeStr }}</span>
                        <span class="usercountlike">{{ item.likedCount }}赞</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="comment">
            <div class="content-section-title comstitle">
                <h2>评论<span>共{{ Comsum }}条 </span></h2>
            </div>
            <div class="cmmts" v-for="(item, index) in mvComments.value" :key="index">
                <div class="user-avatar">
                    <img :src="item.user.avatarUrl" alt="">
                </div>
                <div class="usercom item">
                    <a href="javascript:;">{{ item.user.nickname }}</a>
                    <p>{{ item.content }}</p>
                    <div class="com-time">
                        <span>{{ item.timeStr }}</span>
                        <a href="javascript:;" style="float:right;">{{ item.likedCount }}个赞</a>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="pagination">
            <el-pagination layout="prev, pager, next, jumper" :small="small" :background="background"
                v-model:currentPage="currentpage" :total="Comsum" :disabled="disabled"
                @current-change="handleCurrentChange" />
        </div>
    </div>

</template>
<script setup lang='ts'>
import { getMVApi, getcommentMV } from '@/request/api.js'
import { useRoute } from 'vue-router'
import { ref, onBeforeMount, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore();
const router = useRoute();
const mvUrl = ref("")
const mvComments = reactive([])
const Comsum = ref()
// 分页 
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentpage = ref(1)
const handleCurrentChange = (val) => {
    getcomm(val)
}



onBeforeMount(() => {
    playMV()
    getcomm()
})

const playMV = () => {
    getMVApi({
        id: router.query.mvid
    }).then(res => {
        mvUrl.value = res.data.data.url;
        store.commit("setplaymvstop", false)
    })
}
const getcomm = (page = 1) => {
    getcommentMV({
        id: router.query.mvid,
        limit: 15,
        offset: (page - 1) * 15,
    }).then(res => {
        mvComments.value = res.data.comments;
        Comsum.value = res.data.total;
    })
}

</script>
<style lang='scss'>
</style>