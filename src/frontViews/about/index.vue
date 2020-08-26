<template>
    <el-scrollbar class="scrollbar">
        <div
            class="article-detail markdown-body"
            v-html="articleHtml"
        />
    </el-scrollbar>
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
    .scrollbar
        width 100%
        height $contentHeight
        padding 1.5rem 0
        .article-detail
            margin-top 3rem
            padding-bottom 5rem
            color $blue
            min-height 60rem
</style>
