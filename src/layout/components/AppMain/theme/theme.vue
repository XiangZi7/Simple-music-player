<template>

    <div class="content-section menuBar-mv">
        <div class="content-section-title">
            <h2>主题</h2>
        </div>
        <div class="theme-preset">
            <div class="content-section">
                <div class="apps-card ">
                    <div class="apps-item mv-text" v-for="(item, index) in preset" :key="index"
                        @click="showTheme(item.gbrUrl)">
                        <div class="app-card m-theme">
                            <img :src="getAssetImgs(item.colorUrl)" alt="">
                        </div>
                        <a href="javascript:;">{{ item.colorName }}</a>
                    </div>

                </div>
            </div>
        </div>
        <div class="content-section-title">
            <h2>自定义</h2>
        </div>
        <el-color-picker v-model="themecolor" show-alpha :predefine="predefineColors" @change="showTheme" />
        <!-- <el-switch v-model="themecolor" class="ml-2" active-color="#13ce66" inactive-color="#ff4949" /> -->
        <div class="footer">
            Copyright © 2013 by Perchouli Shanzhai to Nipponcolors<Br />
            参看: 色谱 中科院科技情报编委会名词室.科学出版社,1957. Adobe RGB / CMYK FOGRA39, Dot Gain 15% Screenshot沪ICP备17025116号-2
        </div>
    </div>

</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore();

const themecolor = ref()
const color = ref('rgba(31, 147, 255, 0.73)')
const getAssetImgs = (imgname:string) => {
   return new URL(`../../../../../src/static/img/thme/${imgname}`,import.meta.url).href
}

const preset = reactive([
    {
        colorName: '默认',
        colorUrl: '默认.png',
        gbrUrl: '#dde2eb'
    },
    {
        colorName: '牡丹粉红',
        colorUrl: '牡丹粉红.png',
        gbrUrl: '#eea2a4'
    },
    {
        colorName: '栗紫',
        colorUrl: '栗紫.png',
        gbrUrl: '#5a191b'
    },
    {
        colorName: '香叶红',
        colorUrl: '香叶红.png',
        gbrUrl: '#f07c82'
    },
    {
        colorName: '艳红',
        colorUrl: '艳红.png',
        gbrUrl: '#ed5a65'
    },
    {
        colorName: '茶花红',
        colorUrl: '茶花红.png',
        gbrUrl: '#ee3f4d'
    },

])

const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])



const showTheme = (preset) => {
    store.commit('setthmeColor', preset)
    themecolor.value = store.getters.showColor
    document.querySelector("body").setAttribute("style", `background-color:${themecolor.value};transition: 0.7s;`);
}


</script>
<style lang='scss'>
.footer {
    margin-top: 30px;
}
</style>