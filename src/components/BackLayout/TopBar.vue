<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-28 21:57:59
 * @LastEditTime: 2020-06-03 21:56:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\components\BackLayout\TopBar.vue
-->
<template>
    <header class="layout-header">
        <div class="bar-title color-blue">
            <font-awesome-icon :icon="icon" />&nbsp;
            {{ title }}
        </div>
        <div class="right-menu pull-right">
            <el-dropdown
                trigger="click"
                class="right-menu-item"
                placement="bottom-start"
            >
                <div class="avatar-wrapper">
                    <img
                        :src="avatar"
                        class="user-avatar"
                    >
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        divided
                        @click.native="logout"
                    >
                        <span style="display:block;">
                            登 出
                        </span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    @Component
    export default class TopBar extends Vue {
        private title:string = ''
        private icon:string = ''
        private avatar:string = 'https://avatars2.githubusercontent.com/u/42111444?s=60&v=4'

        created() {
            this.title = this.$route.meta.title
            this.icon = this.$route.meta.icon
        }

        @Watch('$route')
        private changeTitle() {
            this.title = this.$route.meta.title
            this.icon = this.$route.meta.icon
        }

        logout() {
            sessionStorage.clear()
            this.$router.push('/adminLogin')
        }
    }
</script>

<style lang="stylus" scoped>
    .layout-header
        height 5rem
        overflow hidden
        position relative
        background #fff
        box-shadow 0 1px 4px rgba(0,21,41,.08)
        .bar-title
            float left
            height 100%
            line-height 5rem
            min-width 10rem
            margin-left 3rem
            font-size $fs-s
        .right-menu
            height 100%
            width 100px
            .right-menu-item
                width 100%
                height 100%
                .avatar-wrapper
                    width 50px
                    height 100%
                    display flex
                    align-items center
                    cursor pointer
                    img
                        width 30px
                        height 30px
                        border-radius 50%
</style>
