<template>
    <div class="side-bar">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
        >
            <el-submenu
                v-for="(router, index) in routerList"
                :key="index"
                index="2"
            >
                <template slot="title">
                    <font-awesome-icon :icon="router.icon" />
                    <span>
                        {{ router.name }}
                    </span>
                </template>
                <el-menu-item-group v-if="router.children">
                    <el-menu-item
                        v-for="(child, childIndex) in router.children"
                        :key="child.name + childIndex"
                        :index="index + '-' + childIndex"
                    >
                        <font-awesome-icon :icon="child.icon" />
                        {{ child.name }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script lang="ts">
    import backRouter from '@/router/back'
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
        name: 'SideBar'
    })
    export default class SideBar extends Vue {
        private routerList:string[] = []

        mounted() {
            backRouter.forEach(item => {
                let router
                if (item.children && item.children.length > 1) {
                    router = {
                        name: item.meta.title,
                        icon: item.meta.icon,
                        children: item.children.map(child => {
                            return {
                                name: child.meta.title,
                                icon: child.meta.icon
                            }
                        })
                    }
                } else if (item.children && item.children.length === 1) {
                    router = {
                        name: item.meta.title,
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
</style>