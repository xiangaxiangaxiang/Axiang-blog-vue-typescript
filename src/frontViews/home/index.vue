<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:28:47
 * @LastEditTime: 2020-09-19 17:00:14
 * @Description: 博客主页
 * @FilePath: \axiang-blog-vue-typescript\src\front\home\index.vue
 -->
<template>
    <div class="home-container">
        <sakura class="sakura" />
        <div class="content">
            <div class="nav-bar">
                <div class="img-wrapper">
                    <img
                        :src="imgSrc"
                        alt="图片加载失败"
                    >
                </div>
                <el-row>
                    <el-col
                        :span="14"
                        :offset="5"
                    >
                        <ul class="nav-list">
                            <li
                                class="nav-item"
                                v-for="item in navList"
                                :key="item.path"
                                @click="pageJump(item.path)"
                                :class="item.name === '首页' ? 'actice': ''"
                            >
                                {{ item.name }}
                            </li>
                        </ul>
                        <p class="my-dream">
                            <!-- 德玛西亚万岁！！！！！！！！！！！！！！！！！！！ -->
                            努力只为了三件事，自由，自由，还是提莫的自由！！！
                        </p>
                    </el-col>
                </el-row>
            </div>
            <div class="footer">
                <a
                    href="http://beian.miit.gov.cn"
                    target="_blank"
                >
                    IPC备案号: 粤ICP备2020088258号-1
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Sakura from 'components/Sakura/index.vue'
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        components: {
            Sakura
        }
    })
    export default class Home extends Vue {
        private imgSrc = require('@/assets/avatar.jpg')

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
    .home-container
        width 100vw
        height 100vh
        position relative
        overflow hidden
        .sakura
            width 100%
            height 100%
            position absolute
            top 0
            right 0
            z-index -1000
        .content
            width 100%
            height 100%
            .nav-bar
                width 100%
                height 60rem
                margin-top 20rem
                .img-wrapper
                    width 15rem
                    height 15rem
                    border-radius 50%
                    margin 0 auto
                    img
                        width 100%
                        height 100%
                        border-radius 50%
            .nav-list
                width 80%
                height 20rem
                line-height 20rem
                margin 0 auto
                .nav-item
                    display inline-block
                    width 14%
                    height 100%
                    font-size $fs-mx
                    text-align center
                    cursor pointer
                    font-size $fs-l
                    color white
                    &:hover
                        color $yellow
                    &.actice
                        color $orange
            .my-dream
                height 4rem
                line-height 4rem
                font-size $fs-mx
                color $blue
                text-align center
            .footer
                position fixed
                bottom 0
                left 0
                right 0
                height 50px
                line-height 50px
                text-align center
                font-size $fs-ss
</style>


