<template>
    <el-scrollbar class="scrollbar">
        <div
            class="toc"
            v-html="toc"
        />
        <div class="recommendation">
            <h2 class="header">
                推荐阅读
            </h2>
            <ul class="article-list">
                <li
                    v-for="article in aritcles"
                    :key="article.articleId"
                    class="article-item"
                    @click="redirectTo(article.articleId)"
                >
                    {{ article.title }}
                </li>
            </ul>
        </div>
    </el-scrollbar>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { getRecommendationApi } from '@/api/front/article'
    @Component({
        name: 'ArticleDetailSidebar'
    })
    export default class ArticleDetailSidebar extends Vue {
        @Prop({default: ''}) html!:string
        @Prop({default: ''}) articleId!:string
        @Prop({default: () => []}) labels!:string[]

        private aritcles:{title:string, articleId:string}[] = []

        get toc() {
            const reg = /<[hH][1-3]>.*?<\/[hH][1-3]>/g
            const arr = this.html.match(reg) as string[] ? this.html.match(reg) as string[] : []
            const tocArr = arr.map(item => {
                return item.replace(/<a id="(.*)"><\/a>/g, (m, s1) => {
                    return `<a id="${s1}" href="#${s1}"></a>`
                })
            })
            return tocArr.join('')
        }

        @Watch('labels')
        async getRecommendation(newValue) {
            const params = {
                labels: JSON.stringify(newValue),
                articleId: this.articleId
            }
            const res = await getRecommendationApi(params)
            if (res && res.status === 0) {
                this.aritcles = res.data
            }
        }

        redirectTo(articleId) {
            const path = `/article-detail/${articleId}`
            console.log(path, this.$route.path)
            if (this.$route.path !== path) {
                this.$router.push(path)
                console.log(666)
            }
        }
    }
</script>

<style lang="stylus">
    .toc
        padding-top 3rem
        color $orange
        h1
            font-size $fs-m
        h2
            font-size $fs-s
            padding-left 2rem
        h3
            font-size $fs-ss
            padding-left 4rem
        h1, h2, h3
            height 2.7rem
            line-height 2.7rem
            font-weight bold
            cursor pointer
            position relative
            text-overflow()
            a
                width 100%
                height 100%
                display block
                position absolute
                top 0
                left 0
    .recommendation
        width 100%
        color $red
        margin-top 3rem
        .header
            width 100%
            height 4rem
            font-size $fs-l
            font-weight bold
        .article-list
            width 100%
            .article-item
                width 100%
                height 2.5rem
                line-height 2.5rem
                font-size $fs-s
                text-overflow()
                cursor pointer
</style>
