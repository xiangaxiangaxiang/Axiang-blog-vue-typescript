<template>
    <el-row
        class="detail-container"
    >
        <el-col
            :span="2"
            class="left-side"
        >
            <div
                class="item"
                :class="likeStatus ? 'like': 'dislike'"
                @click="handleLike"
                :title="likeStatus ? '取消点赞': '点赞'"
            >
                <font-awesome-icon icon="heart" />
            </div>
            <div
                class="item comments"
                title="查看评论"
            >
                <font-awesome-icon icon="comments" />
            </div>
            <div
                class="item back-to-top"
                :class="{show: showBackToTop}"
                title="回到顶部"
                @click="backToTop"
            >
                <font-awesome-icon icon="caret-up" />
            </div>
        </el-col>
        <el-col
            :span="14"
            style="height: 100%;"
        >
            <el-scrollbar
                class="scrollbar"
                ref="articleScrollbar"
            >
                <h1 class="article-title">
                    {{ articleTitle }}
                </h1>
                <div
                    class="article-detail markdown-body"
                    v-html="articleHtml"
                />
                <comments />
            </el-scrollbar>
        </el-col>
        <el-col :span="6">
            lalala
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { getArticleDetailApi } from '@/api/front/article'
    import Comments from './components/Comments.vue'
    import { debounce } from 'lodash'
    @Component({
        name: 'ArticleDetail',
        components: {
            Comments
        }
    })
    export default class ArticleDetail extends Vue {
        @Prop({default: ''}) articleId!:string
        private articleHtml:string = ''
        private markdown:string = ''
        private articleTitle:string = ''
        private likeStatus:boolean = false
        private showBackToTop:boolean = false

        mounted() {
            this.getArticleDetail()
            const scrollbar = this.$refs.articleScrollbar
            // eslint-disable-next-line
            const wrap = ( scrollbar as HTMLFormElement ).$refs['wrap']
            wrap.addEventListener('scroll', debounce(this.handleScroll, 100))
        }

        handleScroll(e) {
            if (e.target.scrollTop > 0) {
                this.showBackToTop = true
            } else {
                this.showBackToTop = false
            }
        }

        backToTop() {
            const scrollbar = this.$refs.articleScrollbar
            // eslint-disable-next-line
            const wrap = ( scrollbar as HTMLFormElement ).$refs['wrap']
            console.log(wrap.animate({scrollTop: 0, duration: 1000}))
            wrap.animate({
                scrollTop: 0,
                duration: 1000
            })
        }

        async getArticleDetail() {
            const params = {
                articleId: this.articleId
            }
            const res = await getArticleDetailApi(params)
            if (res && res.status === 0) {
                this.articleHtml = res.data.html
                this.markdown = res.data.markdown
                this.articleTitle = res.data.title
            }
        }

        handleLike() {
            this.likeStatus = !this.likeStatus
        }
    }
</script>

<style scoped lang="stylus">
    .detail-container
        width 100%
        height $contentHeight
        padding-top 1.5rem
        .left-side
            height 100%
            display flex
            flex-direction column
            justify-content center
            align-items center
            .item
                width 4rem
                height 4rem
                line-height 4rem
                border-radius 50%
                background rgba(255, 255, 255, .8)
                margin-top 2rem
                text-align center
                font-size $fs-ss
                cursor pointer
                user-select none
                &.comments
                    color $blue
                &.like
                    color $red
                &.dislike
                    color $second-text
                &.back-to-top
                    color $blue
                    font-size $fs-l
                    opacity 0
                    transition .3s
                &.show
                    opacity 1
        .scrollbar
            width 100%
            height 100%
            padding 0 2rem
            .article-title
                width 100%
                height 8rem
                line-height 8rem
                font-weight bold
                font-size $article-title
                color $orange
            .article-detail
                margin-top 3rem
                padding-bottom 5rem
                color $blue
</style>