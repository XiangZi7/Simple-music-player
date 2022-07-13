
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        // redirect: '/index',
        name: 'index',
        component: () => import('coms/AppMain/home/index.vue')
    },
    {
        path: '/musiclibrary',
        name: 'musiclibrary',
        component: () => import('appin/musiclibrary/musiclibrary.vue'),

    },
    {
        path: '/musiclibrary/newmv',
        name: 'newmv',
        component: () => import('appin/musiclibrary/btnTab/newmv/newmv.vue'),
    },
    {
        path: '/musiclibrary/singer',
        name: 'singer',
        component: () => import('appin/musiclibrary/btnTab/singer/singer.vue'),
    },
    {
        path: '/musiclibrary/Leaderboard',
        name: 'Leaderboard',
        component: () => import('appin/musiclibrary/btnTab/Leaderboard/Leaderboard.vue'),
    },
    {
        path: '/musiclibrary/dailyrecom',
        name: 'dailyrecom',
        component: () => import('appin/musiclibrary/btnTab/dailyrecom/dailyrecom.vue'),
    },
    {
        path: '/mv',
        name: 'mv',
        component: () => import('appin/mv/mv.vue'),
    },
    {
        path: '/radio',
        name: 'radio',
        component: () => import('appin/radio/radio.vue'),
    },
    {
        path: '/songList',
        name: 'songList',
        component: () => import('appin/songList/songList.vue'),
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('coms/headerBar/search/search.vue'),
    },
    {
        path: '/theme',
        name: 'theme',
        component: () => import('appin/theme/theme.vue'),
    },
    {
        path: '/artist',
        name: 'artist',
        component: () => import('appin/artist/artist.vue'),
    },
    {
        path: '/playMV',
        name: 'playMV',
        component: () => import('appin/playMV/playMV.vue'),
    },
    {
        path: '/playlist',
        name: 'playlist',
        component: () => import('appin/playlist/playlist.vue'),
    },
    {
        path: '/Listofcurrentsongs',
        name: 'Listofcurrentsongs',
        component: () => import('appin/Listofcurrentsongs/Listofcurrentsongs.vue'),
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router