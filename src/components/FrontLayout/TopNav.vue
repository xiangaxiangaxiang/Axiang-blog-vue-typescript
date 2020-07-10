<template>
    <el-row class="nav-container">
        <el-col :span="5">
            <div class="logo">
                翔阿翔阿翔
            </div>
        </el-col>
        <el-col :span="14">
            <ul class="nav-list">
                <li
                    class="nav-item"
                    v-for="item in navList"
                    :key="item.path"
                >
                    {{ item.name }}
                </li>
            </ul>
        </el-col>
        <el-col :span="5">
            <span>
                登出
            </span>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'TopNav'
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
            path: '/home'
        }, {
            name: '其他',
            path: '/home'
        }]
    }
</script>

<style lang="stylus" scoped>
    .nav-container
        width 100%
        height 5rem
        background rgba(255, 255, 255, 0.7)
        .nav-list
            width 80%
            margin 0 auto
            .nav-item
                display inline-block
                width 14%
                height 100%
                line-height 5rem
                font-size $fs-s
                color $blue
                text-align center
</style>