<template>
    <div class="post-container">
        暂时还没做，想好了再说，或者用vue3+ts重构的时候再做
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { getAboutApi } from '@/api/front/article'
    @Component({
        name: 'About'
    })
    export default class About extends Vue {
        private articleHtml:string = ''

        mounted() {
            this.getAbout()
        }

        async getAbout() {
            const res = await getAboutApi()
            if (res && res.status === 0) {
                this.articleHtml = res.data
            }
        }
    }
</script>

<style scoped lang="stylus">
    .post-container
        width 100%
        height $contentHeight
        padding 1.5rem 0
        line-height 30rem
        text-align center
        font-size $fs-l
        color $second-text
</style>
