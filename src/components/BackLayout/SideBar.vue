<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :default-active="activeRoute"
            class="menu"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            :router="true"
        >
            <template v-for="item in routerList">
                <el-menu-item
                    :index="item.path"
                    v-if="!item.children"
                    :key="item.title"
                >
                    <font-awesome-icon :icon="item.icon" />
                    <span slot="title">
                        {{ item.title }}
                    </span>
                </el-menu-item>
                <el-submenu
                    v-else
                    :index="item.path"
                    :key="item.title"
                >
                    <template slot="title">
                        <font-awesome-icon :icon="item.icon" />&nbsp;
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item
                        v-for="child in item.children"
                        :index="child.path"
                        :key="child.title"
                    >
                        <font-awesome-icon :icon="child.icon" />&nbsp;&nbsp;
                        <span slot="title">
                            {{ child.title }}
                        </span>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts">
    import backRouter from '@/router/back'
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
        name: 'SideBar'
    })
    export default class SideBar extends Vue {
        private routerList:string[] = []

        get activeRoute():string {
            return this.$route.path
        }

        mounted() {
            backRouter.forEach(item => {
                let router
                if (item.children && item.children.length > 1) {
                    router = {
                        title: item.meta.title,
                        icon: item.meta.icon,
                        path: item.path,
                        children: item.children.map(child => {
                            return {
                                path: child.path,
                                title: child.meta.title,
                                icon: child.meta.icon
                            }
                        })
                    }
                } else if (item.children && item.children.length === 1) {
                    router = {
                        path: item.path,
                        title: item.meta.title,
                        icon: item.meta.icon
                    }
                }
                if (router) {
                    this.routerList.push(router)
                }
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .menu
        height 100vh
        width 100%
    .el-scrollbar
        height 100%
</style>

<style lang="stylus">
    .scrollbar-wrapper
        overflow-x hidden !important
    .el-scrollbar__bar.is-vertical
        right: 0
    .el-scrollbar
        height: 100%
    .el-scrollbar__bar
        &.is-vertical
            right: 0
        &.is-horizontal
            display: none
</style>