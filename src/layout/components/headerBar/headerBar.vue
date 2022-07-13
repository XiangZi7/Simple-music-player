<template>
    <div class="header">
        <div class="menu-circle"></div>
        <div class="header-menu">
            <a class="menu-link is-active" href="javascript:;" @click="back">
                <svg t="1648618382129" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2830" width="32" height="32">
                    <path
                        d="M576 672c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8l128-128c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L492.8 512l102.4 102.4c12.8 12.8 12.8 32 0 44.8C595.2 672 582.4 672 576 672z"
                        p-id="2831" fill="#525B72"></path>
                </svg>
            </a>
            <a class="menu-link is-active" href="javascript:;" @click="forward">
                <svg t="1648618362955" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2626" width="32" height="32">
                    <path
                        d="M448 672c-6.4 0-19.2 0-25.6-6.4-12.8-12.8-12.8-32 0-44.8L531.2 512 422.4 409.6c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0l128 128c12.8 12.8 12.8 32 0 44.8l-128 128C467.2 672 454.4 672 448 672z"
                        p-id="2627" fill="#525B72"></path>
                </svg>
            </a>

        </div>

        <div class="search-bar">
            <input type="text" placeholder="Search" @keyup.enter='toResult' v-model='kw'>
        </div>
        <div class="header-profile" v-if="lgstate != 1">
            <el-dropdown>
                <img class="profile-img" :src="avatarUrl + '?param=32y32'" alt="">
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="clicklog">注销 </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="username">{{ nickname }}</div>
            <div class="notification">
                <span class="notification-number">3</span>
                <svg t="1648737299278" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="8950" width="25" height="25">
                    <path
                        d="M192.032 631.402667V404.725333C192.032 228.330667 335.285333 85.333333 512 85.333333s319.968 142.997333 319.968 319.392v226.677334l60.608 121.013333c10.645333 21.237333-4.832 46.218667-28.618667 46.218667H160.042667c-23.786667 0-39.253333-24.981333-28.618667-46.218667l60.608-121.013333z m620.16 103.36l-40.842667-81.536a31.893333 31.893333 0 0 1-3.381333-14.282667V404.725333c0-141.12-114.602667-255.509333-255.968-255.509333S256.032 263.605333 256.032 404.725333V638.933333c0 4.96-1.162667 9.845333-3.381333 14.293334l-40.842667 81.525333h600.384z m-443.306667 152.32a31.893333 31.893333 0 0 1-4.149333-44.981334 32.032 32.032 0 0 1 45.056-4.138666A159.36 159.36 0 0 0 512 874.773333a159.36 159.36 0 0 0 102.186667-36.8 32.032 32.032 0 0 1 45.056 4.138667 31.893333 31.893333 0 0 1-4.16 44.981333A223.402667 223.402667 0 0 1 512 938.666667c-52.981333 0-103.2-18.453333-143.114667-51.594667z"
                        p-id="8951" fill="#525B72"></path>
                </svg>
            </div>
        </div>
        <div class="header-profile" v-if="lgstate != 0">
            <div class="username"> <a href="javascript:;" @click="p_login">登录</a> </div>
            <!-- login -->
            <div class="card" v-show="loserwd">
                <div class="tools">
                    <div class="circle">
                        <span @click="closewindow" class="red box"></span>
                    </div>
                    <div class="circle">
                        <span class="yellow box"></span>
                    </div>
                    <div class="circle">
                        <span class="green box"></span>
                    </div>
                </div>
                <div class="card__content">
                    <el-tabs v-model="activeName" class="login-tabs" @tab-click="handleClick">
                        <!-- email -->
                        <el-tab-pane label="手机密码" name="first">
                            <div class="demo-login">
                                <input type="text" v-model="phone" class="demo-text" placeholder="请输入手机号">
                                <input type="password" v-model="pwd" class="demo-text" placeholder="请输入密码">
                                <div class="input-text">
                                    <button @click="lg_submit"> Click me </button>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="手机短信" name="second">
                            <!-- 短信 -->
                            <div class="demo-login">
                                <input type="text" v-model="phone" class="demo-text" placeholder="请输入手机号">
                                <div class="lg-mgt">
                                    <input type="text" v-model="shotmsg" class="demo-text" placeholder="请输入验证码"
                                        style="width: 130px;">
                                    <button @click="sendcode"> {{ codemsg }} </button>
                                </div>
                                <div class="input-text">
                                    <button @click="lg_submit"> Click me </button>
                                </div>
                            </div>
                        </el-tab-pane>
                        <!-- Cookie -->
                        <el-tab-pane label="Cookie" name="third">
                            <div class="demo-login">
                                <input type="text" v-model="cok" class="demo-text" placeholder="请输入Cookie">
                                <div class="input-text">
                                    <!-- 不知道怎么设计，暂时不弄 -->
                                    
                                    <button @click="lg_submit"> Click me </button>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <!-- login -->
        </div>

    </div>

</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref, onBeforeMount, watch, onMounted } from 'vue'
import { getstatus, userlogout, userlogin, getuserverion } from '@/request/api.js'
import { useStore } from "vuex";
const store = useStore()
const router = useRouter()
// login
const activeName = ref('first')
let phone = ref()
let pwd = ref()
let shotmsg = ref()
let cok = ref()
let type = ref(1);
let codemsg: any = ref("发送验证码")
let loserwd = ref()
const handleClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab, event)
}
watch(() => activeName.value, () => {
    switch (activeName.value) {
        case 'first':
            type.value = 1;
            break;
        case 'second':
            type.value = 2;
            break;
        case 'third':
            type.value = 3;
            break;
        default:
            break;

    }
    // console.log(type.value);

})
const lg_submit = () => {
    if (type.value == 1) {
        userlogin({
            phone: phone.value,
            password: pwd.value
        }).then(res => {
            // console.log(res);
            store.commit("setuserid", res.data.profile.userId)
            router.push({ path: "/" })
        })
    } else if (type.value == 2) {
        userlogin({
            phone: phone.value,
            captcha: shotmsg.value
        }).then(res => {
            store.commit("setuserid", res.data.profile.userIds)
            router.push({ path: "/" })
        })
    } else if (type.value == 3) {
        store.commit("setTOKEN_KEY", cok.value)
        router.push({ path: "/" })
    }
}

const sendcode = () => {
    getuserverion({
        phone: phone.value,
    }).then(res => {
        console.log(res);
        //定义n=5秒
        let n = 60
        //定义定时器time
        let time = setInterval(() => {
            //禁用
            //改变倒计时文字提示
            codemsg.value = n
            n--
            //如果n<0，清除定时器，禁用状态取消，文字提示为空（不显示）
            if (n < 0) {
                codemsg.value = "发送验证码"
                clearInterval(time)
            }
        }, 1000)
    })

}

const closewindow = () => {
    loserwd.value = false
}
const p_login = () => {
    loserwd.value = true

}
// login

let kw = ref()
const avatarUrl = ref("")
const nickname = ref("")
// 状态
const lgstate = ref()
const toResult = () => {
    router.push({ name: 'search', query: { keyworks: kw.value } })
}
const back = () => {
    router.back();
}
const forward = () => {
    router.go(1);
}
onBeforeMount(() => {
    statuss()
    lgstate.value = store.getters.showLoginstate
})

const statuss = () => {
    getstatus({}).then(res => {
        avatarUrl.value = res.data.data.profile.avatarUrl
        nickname.value = res.data.data.profile.nickname
        store.commit("setuserid", res.data.data.account.id)
        if (res.data.data.account.status == 0) {
            store.commit("loginstate", 0)
        } else {
            store.commit("loginstate", 1)
        }

    })
}

const clicklog = () => {
    userlogout({}).then(res => {
        console.log("注销成功");
        store.commit("loginstate", 1)
        router.replace({ name: '/index' })
    })
}

</script>
<style lang='scss'>
.demo-login {
    padding: 50px 0px;
    display: flex;
    flex-direction: column;

    .demo-text {
        height: 35px;
        margin: 10px 0px;
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding-left: 10px;

        & :active {
            box-shadow: 0 5px 16px rgb(0 0 0 / 10%);

        }

        &::placeholder {
            font-family: var(--body-font);
            color: var(--inactive-color);
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.login-tabs {
    margin-top: 20px;

}

.input-text button {
    font-size: 16px;
    padding: 1em 3.3em;
    transform: perspective(200px) rotateX(15deg);
    color: white;
    font-weight: 900;
    border: none;
    border-radius: 5px;
    background: linear-gradient(0deg, rgba(63, 94, 251, 1) 0%, rgba(70, 135, 252, 1) 100%);
    box-shadow: rgba(63, 94, 251, 0.2) 0px 30px 10px 0px;
    margin-left: 30px;
    margin-top: 20px;
    will-change: transform;
    transition: all 0.3s;
    border-bottom: 2px solid rgba(70, 135, 252, 1);
}

.input-text button:hover {
    transform: perspective(180px) rotateX(30deg) translateY(2px);
}

.input-text button:active {
    transform: perspective(170px) rotateX(36deg) translateY(5px);
}


.card {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 550px;
    height: 500px;
    transform: translateX(-50%) translatey(-50%);
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 16px rgb(0 0 0 / 10%);
    z-index: 3;
    background-image: url(@/static/img/login.png);
    background-size: 150px;
    background-repeat: no-repeat;
    background-position: bottom left;
}

.tools {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid var(--border-color);
}

.circle {
    padding: 0 4px;
}

.box {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 50%;
}

.red {
    background-color: #ff605c;
    width: 15px;
    height: 15px;
}

.yellow {
    background-color: #ffbd44;
    width: 15px;
    height: 15px;
}

.green {
    background-color: #00ca4e;
    width: 15px;
    height: 15px;
}

.card__content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>