<!--
 * @Author: your name
 * @Date: 2020-08-02 21:43:05
 * @LastEditTime: 2020-08-08 21:55:45
 * @Description: 文章列表
 * @FilePath: \axiang-blog-vue-typescript\src\frontViews\article\components\ArticleList.vue
-->
<template>
    <el-scrollbar
        class="scrollbar"
        ref="scrollbar"
    >
        <div
            v-for="(item, index) in articles"
            :key="index"
            class="list-item"
        >
            <div class="article-content">
                <h3 class="title">
                    {{ item.title }}
                </h3>
                <p class="content">
                    {{ item.content }}
                </p>
                <div class="statistics">
                    <span class="statistics-item">
                        <font-awesome-icon icon="eye" />
                        {{ item.clickNums }}
                    </span>
                    <span class="statistics-item">
                        <font-awesome-icon icon="comments" />
                        {{ item.commentsNums }}
                    </span>
                    <span class="statistics-item">
                        <font-awesome-icon icon="heart" />
                        {{ item.likeNums }}
                    </span>
                </div>
            </div>
            <div
                class="img-wrapper"
                v-if="item.firstImage"
            >
                <img
                    :src="item.firstImage"
                    alt="图片加载失败"
                >
            </div>
        </div>
        <p
            class="more"
            v-show="isLoading"
        >
            正在加载更多文章
            <i class="el-icon-loading" />
        </p>
    </el-scrollbar>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { getArticlesApi } from '@/api/front/article'
    import { debounce } from 'lodash'

    interface articleType {
        title: string
        content: string
        likeNums: number
        commentsNums: number
        clickNums: number
        firstImage: string
    }
    enum ArticleType {
        TECHNOLOGY = 100,
        LIFE = 200,
        DREAM = 300
    }

    @Component({
        name: 'ArticleList'
    })
    export default class ArticleList extends Vue {
        @Prop({default: ''}) type !:string

        private articles:articleType[] = []
        private offset:number = 0
        private limit:number = 8
        private total:number = 0

        private isLoading:boolean = false

        @Watch('type')
        changeArticleType() {
            this.getArticles()
        }

        mounted() {
            this.getArticles()
            this.$nextTick(() => {
                const scrollbar = this.$refs.scrollbar
                // eslint-disable-next-line
                const wrap = ( scrollbar as HTMLFormElement ).$refs['wrap']
                wrap.addEventListener('scroll', debounce(this.handleScroll, 300))
            })
        }

        handleScroll(e) {
            const isEnd = e.target.scrollHeight === e.target.clientHeight + e.target.scrollTop
            if (isEnd) {
                this.offset = this.articles.length
                this.isLoading = true
                this.getArticles()
            }
        }

        async getArticles() {
            const params = {
                offset: this.offset,
                limit: this.limit,
                articleType: ArticleType[this.type.toUpperCase()]
            }
            const res = await getArticlesApi(params)
            const data = [].concat(res.data.articles)
            data.forEach(item => {
                this.articles.push(item)
            })
            this.total = res.data.total
            this.isLoading = false
        }
    }
</script>
<style lang="stylus" scoped>
    .scrollbar
        width 100%
        height 100%
        overflow auto
        .more
            width 100%
            height 2rem
            line-height 2rem
            text-align center
            color $ligth-text
            font-size 1.2rem
        .list-item
            width 100%
            min-height 13rem
            max-height 17rem
            padding 1.5rem
            &+.list-item
                border-top 1px solid #bdc3c7
            .article-content
            .img-wrapper
                display inline-block
            .article-content
                width calc(100% - 12rem)
                height 100%
                .title
                    width 100%
                    max-height 4rem
                    line-height 2rem
                    margin-bottom 1rem
                    color $orange
                    font-size $fs-s
                    font-weight bold
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    &:hover
                        text-decoration underline
                        cursor pointer
                .content
                    width 100%
                    height 6rem
                    line-height 2rem
                    margin-bottom 1rem
                    color $blue
                    font-size $fs-ss
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 3
                    -webkit-box-orient vertical
                .statistics
                    width 100%
                    height 2rem
                    line-height 2rem
                    color $ligth-text
                    font-size $fs-sss
                    .statistics-item
                        margin-right 1.5rem
            .img-wrapper
                width 12rem
                height 12rem
                vertical-align top
                position relative
                img
                    width 10rem
                    height 10rem
                    position absolute
                    left 50%
                    top 50%
                    transform translate(-50%, -50%)
                    cursor pointer
</style>