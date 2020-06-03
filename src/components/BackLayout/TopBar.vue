<!--
 * @Author: your name
 * @Date: 2020-05-28 21:57:59
 * @LastEditTime: 2020-05-28 22:03:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\components\BackLayout\TopBar.vue
--> 
<template>
    <header class="layout-header">
        <div class="bar-title color_blue">
            <font-awesome-icon :icon="icon" />&nbsp;
            {{ title }}
        </div>
    </header>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
    @Component
    export default class TopBar extends Vue {
    }
</script>
<style lang="stylus" scoped>
    .layout-header
        height 50px
        overflow hidden
        position relative
        background #fff
        box-shadow 0 1px 4px rgba(0,21,41,.08)
        .bar-title
            float left
            height 100%
            line-height 50px
            min-width 100px
            margin-left 30px
</style>
