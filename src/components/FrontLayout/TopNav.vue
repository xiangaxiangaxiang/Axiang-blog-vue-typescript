<template>
    <el-row class="nav-container">
        <el-col :span="5">
            <div class="logo">
                Hi, 我是翔阿翔阿翔
            </div>
        </el-col>
        <el-col :span="14">
            <ul class="nav-list">
                <li
                    class="nav-item"
                    v-for="item in navList"
                    :key="item.path"
                    @click="pageJump(item.path)"
                    :class="item.name === '技术' ? 'actice': ''"
                >
                    {{ item.name }}
                </li>
            </ul>
        </el-col>
        <el-col
            :span="5"
            style="height: 100%;"
        >
            <account-dropdown
                class="account-menu"
                v-if="isLogin"
            />
            <div
                v-else
                class="login-register"
            >
                <span>
                    登陆
                </span>
                ·
                <span>
                    注册
                </span>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import AccountDropdown from '@/components/AccountDropdown/index.vue'
    import Cookies from 'js-cookie'
    @Component({
        name: 'TopNav',
        components: {
            AccountDropdown
        }
    })
    export default class TopNav extends Vue {
        private navList = [{
            name: '首页',
            path: '/home'
        }, {
            name: '技术',
            path: '/ariticle/technology'
        }, {
            name: '生活',
            path: '/ariticle/live'
        }, {
            name: '梦想',
            path: '/ariticle/dream'
        }, {
            name: '动态',
            path: '/post'
        }, {
            name: 'Github',
            path: 'https://github.com/xiangaxiangaxiang'
        }, {
            name: '其他',
            path: '/other'
        }]

        private isLogin:boolean = false

        created() {
            const auth = Cookies.get('auth')
            if (auth) {
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
    }
</script>

<style lang="stylus" scoped>
    .nav-container
        width 100%
        height 5rem
        background rgba(255, 255, 255, 0.8)
        box-shadow 0 1px 4px rgba(0,21,41,.08) inset
        color $blue
        .logo
            width 100%
            height 100%
            line-height 5rem
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
                line-height 5rem
                font-size $fs-s
                text-align center
                cursor pointer
                &:hover
                    color $light-purple
                &.actice
                    color $orange
        .account-menu
            width 13rem
            height 100%
            float right
            display flex
            align-items center
            justify-content center
        .login-register
            width 13rem
            height 100%
            float right
            line-height 5rem
            font-size $fs-ss
            span
                cursor pointer
</style>