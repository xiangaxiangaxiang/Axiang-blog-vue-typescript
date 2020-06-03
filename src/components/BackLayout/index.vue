<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-28 21:56:52
 * @LastEditTime: 2020-05-28 22:31:37
 * @LastEditors: Please set LastEditors
 * @FilePath: \axiang-blog-vue-typescript\src\components\BackLayout\index.vue
-->
<template>
    <div class="layout-container">
        <side-bar class="side-bar" />
        <div class="main-container">
            <top-bar />
            <app-main />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { AppMain, TopBar, SideBar } from './index'
    @Component({
        components: {
            AppMain,
            TopBar,
            SideBar
        }
    })
    export default class Layout extends Vue {

    }
</script>
<style lang="stylus" scoped>
    .layout-container
        width 100%
        height 100%
        .side-bar
            width $sidebarWidth
            position fixed
            left 0
            top 0
            bottom 0
            overflow hidden
            background $sidebarColor
</style>
