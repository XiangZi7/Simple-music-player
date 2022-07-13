import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"
// 创建本地数据方法
import { setItem, getItem } from "./storage";
interface State {
    themecolor: string;
    audioxbox: any;
    url1: string,
    i: number,
    islogin: number,
    userid: number
    windowstate: boolean,
    playmvstop: boolean,
    TOKEN_KEY: string


}

const store = createStore<State>({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],

    state: {
        windowstate: false,
        playmvstop: false,
        userid: 0,
        islogin: 1, //0登录 1未登录
        url1: "",
        i: 0,
        audioxbox: [
            {
                id: "1",
                al: "境界的彼方",
                dt: "04:33",
                musicname: "daisy",
                singer: "STEREO DIVE FOUNDATION",
                url: "https://sound-ks1.cdn.missevan.com/aod/202010/31/6cf02602440a5fe2b00d3960f4258397141856.m4a",
                cover: "https://static.missevan.com/coversmini/201410/19/29dacd308434f4d8b1015043ae89c32d141933.jpg"
            },
            {
                id: "2",
                al: "乱",
                dt: "05:13",
                musicname: "最好的我",
                singer: "房祖名",
                url: "https://sound-ks1.cdn.missevan.com/aod/202112/13/76e0f45f3b756cb5fd82f4024a7e4b7e.m4a",
                cover: "https://static.missevan.com/coversmini/202202/25/cf7a067b1fa9fa1e637f142961d34634183055.jpg"
            },
            {
                id: "3",
                al: "",
                dt: "02:08",
                musicname: "Intro",
                singer: "#ラブリーミュージック",
                url: "https://sound-ks1.cdn.missevan.com/aod/202106/14/f14b848a15d6357bf2b5dc9c14fcb633.m4a",
                cover: "https://static.missevan.com/coversmini/202106/14/903d0dd3ad908b9c92e20879f55844c2164802.png"

            },
        ],
        themecolor: "",
        TOKEN_KEY: getItem("TOKEN_KEY")
    },
    mutations: {
        addMusic(state, adds) {
            state.audioxbox.push({
                id: adds.amount5,
                al: adds.amount6,
                dt: adds.amount7,
                musicname: adds.amount1,
                singer: adds.amount2,
                url: adds.amount3,
                cover: adds.amount4,
            })
        },
        setthmeColor(state, setcolor) {
            state.themecolor = setcolor
        },
        setsongi(state, seti) {
            state.i = seti
        },
        setuserid(state, adduuid) {
            state.userid = adduuid
        },
        loginstate(state, setstate) {
            state.islogin = setstate
        },
        setlgstate(state, windowstate) {
            state.windowstate = windowstate
        },
        setplaymvstop(state, statmv) {
            state.playmvstop = statmv
        },
        setTOKEN_KEY(state, token) {
            state.TOKEN_KEY = token
            setItem("TOKEN_KEY", state.TOKEN_KEY)
        }


    },
    getters: {
        showMusicinfo(state: State) {
            return state.audioxbox
        },
        showColor(state: State) {
            return state.themecolor
        },
        showmusic(state: State) {
            return state.url1
        },
        playi(state: State) {
            return state.i
        },
        showuserid(state: State) {
            return state.userid
        },
        showLoginstate(state: State) {
            return state.islogin
        },
        showlgstate(state: State) {
            return state.windowstate
        },
        showmvstop(state: State) {
            return state.playmvstop
        },
        token(state: State) {
            return state.TOKEN_KEY;
        }


    }
})

export default store
