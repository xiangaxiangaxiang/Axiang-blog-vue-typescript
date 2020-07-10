<template>
    <div class="home-container">
        <sakura class="sakura" />
        <div class="nav-bar">
            <div class="img-wrapper">
                <img
                    :src="imgSrc"
                    alt="图片加载失败"
                >
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
    export default class FrontLayout extends Vue {
        private imgSrc = ''
    }
</script>

<style lang="stylus" scoped>
    .home-container
        width 100vw
        height 100vh
        position relative
        .sakura
            width 100%
            height 100%
            position absolute
            top 0
            right 0
            z-index -1000
</style>