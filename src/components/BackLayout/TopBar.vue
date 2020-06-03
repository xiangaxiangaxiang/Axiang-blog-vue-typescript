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
    </header>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    @Component
    export default class TopBar extends Vue {
        private title:string = ''
        private icon:string = ''

        created() {
            this.title = this.$route.meta.title
            this.icon = this.$route.meta.icon
        }

        @Watch('$route')
        private changeTitle() {
            this.title = this.$route.meta.title
            this.icon = this.$route.meta.icon
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
            font-size $fs-ss
</style>
