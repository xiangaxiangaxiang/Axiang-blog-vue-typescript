<!--
 * @Author: your name
 * @Date: 2020-05-28 21:57:37
 * @LastEditTime: 2020-05-28 22:02:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\components\BackLayout\AppMain.vue
-->
<template>
    <section class="app-main">
        <transition
            name="fade-transform"
            mode="out-in"
        >
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class AppMain extends Vue {
        get key() {
            return this.$route.path
        }
    }
</script>
<style lang="stylus" scoped>
    .app-main
        min-height calc(100vh - 5rem);
        width 100%
        box-sizing border-box
        overflow hidden
</style>