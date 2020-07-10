<template>
    <div class="layout-container">
        <sakura class="sakura" />
        <div class="wrapper">
            <top-nav />
        </div>
    </div>
</template>

<script lang="ts">
    import Sakura from 'components/Sakura/index.vue'
    import TopNav from './TopNav.vue'
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        components: {
            Sakura,
            TopNav
        }
    })
    export default class FrontLayout extends Vue {
        private imgSrc = ''
    }
</script>

<style lang="stylus" scoped>
    .layout-container
        width 100vw
        height 100vh
        position relative
        .sakura,
        .wrapper
            width 100%
            height 100%
            position absolute
            top 0
            right 0
        .sakura
            z-index -1000
        .wrapper
            z-index 1
            background rgba(238,238,238,0.4)
</style>