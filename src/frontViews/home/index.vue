<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:28:47
 * @LastEditTime: 2020-07-09 21:33:33
 * @Description: 博客主页
 * @FilePath: \axiang-blog-vue-typescript\src\front\home\index.vue
 -->
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
    export default class Home extends Vue {
        private imgSrc = '/static/avatar.jpg'
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
        .nav-bar
            width 100%
            height 100%
            .img-wrapper
                width 10rem
                height 10rem
                border-radius 50%
                img
                    width 100%
                    height 100%
                    border-radius 50%
</style>


