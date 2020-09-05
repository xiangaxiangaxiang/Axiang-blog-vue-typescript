<template>
    <el-row class="nav-container">
        <el-col :span="5">
            <div class="logo">
                <span
                    class="cursor-pointer"
                    @click="$router.push('/home')"
                >
                    Hi, 我是翔阿翔阿翔
                </span>
            </div>
        </el-col>
        <el-col :span="14">
            <ul class="nav-list">
                <li
                    class="nav-item"
                    v-for="item in navList"
                    :key="item.path"
                    @click="pageJump(item.path)"
                    :class="item.path === path ? 'actice': ''"
                >
                    {{ item.name }}
                </li>
            </ul>
        </el-col>
        <el-col
            :span="5"
            style="height: 100%;"
        >
            <div
                class="menu clearfix"
                v-if="isLogin"
            >
                <account-dropdown class="account-menu" />
                <div class="notice">
                    <notice title="消息通知" />
                </div>
            </div>
            <div
                v-else
                class="login-register"
            >
                <span @click="showLoginRegisterForm('login')">
                    登陆
                </span>
                ·
                <span @click="showLoginRegisterForm('register')">
                    注册
                </span>
            </div>
            <login-register-form
                :dialog-visiable="showDialog"
                :type="showType"
                :key="showDialogKey"
            />
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import AccountDropdown from '../AccountDropdown/index.vue'
    import LoginRegisterForm from './LoginRegisterForm.vue'
    import Notice from '../Notice/index.vue'
    import { UserModule } from '@/store/modules/user'
    @Component({
        name: 'TopNav',
        components: {
            AccountDropdown,
            LoginRegisterForm,
            Notice
        }
    })
    export default class TopNav extends Vue {
        private navList = [{
            name: '首页',
            path: '/home'
        }, {
            name: '技术',
            path: '/article/technology'
        }, {
            name: '生活',
            path: '/article/life'
        }, {
            name: '梦想',
            path: '/article/dream'
        }, {
            name: '动态',
            path: '/post'
        }, {
            name: 'Github',
            path: 'https://github.com/xiangaxiangaxiang'
        }, {
            name: '关于',
            path: '/about'
        }]
        private path:string = ''
        private isLogin:boolean = false
        private showDialogKey:number = Date.now()

        get showDialog() {
            const showLoginRegisterForm = UserModule.showLoginRegisterForm
            if (!showLoginRegisterForm) {
                this.showDialogKey = Date.now()
            }
            return showLoginRegisterForm
        }

        get showType() {
            return UserModule.showLoginRegisterType
        }

        @Watch('$route')
        changePath() {
            this.path = this.$route.path
        }

        mounted() {
            this.path = this.$route.path
            const isLogin = sessionStorage.getItem('isLogin')
            if (isLogin) {
                this.isLogin = true
            }
        }

        pageJump(path) {
            if (path.startsWith('http')) {
                window.open(path,'_blank')
            } else {
                this.$router.push(path)
            }
        }

        showLoginRegisterForm(type) {
            UserModule.toggleDialog(type)
        }
    }
</script>

<style lang="stylus" scoped>
    .nav-container
        width 100%
        height $navHeight
        box-shadow 0 1px 4px rgba(0,21,41,.2)
        color $blue
        .logo
            width 100%
            height 100%
            line-height $navHeight
            text-align center
            font-size $fs-mx
            font-weight 500
        .nav-list
            width 80%
            margin 0 auto
            .nav-item
                display inline-block
                width 14%
                height 100%
                line-height $navHeight
                font-size $fs-s
                text-align center
                cursor pointer
                &:hover
                    color $light-purple
                &.actice
                    color $orange
        .menu
            height 100%
            margin-right 3rem
            .notice
                width 3rem
                height 100%
                float right
                display flex
                align-items center
                justify-content center
                font-size $fs-m
                cursor pointer
            .account-menu
                width 10rem
                height 100%
                float right
                display flex
                align-items center
                justify-content center
        .login-register
            width 13rem
            height 100%
            float right
            line-height $navHeight
            font-size $fs-ss
            span
                cursor pointer
</style>
