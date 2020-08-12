<template>
    <el-row class="detail-container">
        <el-col
            :span="2"
            class="left-side"
        >
            <div
                class="item"
                :class="likeStatus ? 'like': 'dislike'"
                @click="handleLike"
            >
                <font-awesome-icon icon="heart" />
            </div>
            <div class="item comments">
                <font-awesome-icon icon="comments" />
            </div>
        </el-col>
        <el-col
            :span="14"
            style="height: 100%;"
        >
            <el-scrollbar class="scrollbar">
                <h1 class="article-title">
                    {{ articleTitle }}
                </h1>
                <div
                    class="article-detail markdown-body"
                    v-html="articleHtml"
                />
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
    import 'mavon-editor/dist/css/index.css'
    @Component({
        name: 'ArticleDetail'
    })
    export default class ArticleDetail extends Vue {
        @Prop({default: ''}) articleId!:string
        private articleHtml:string = ''
        private markdown:string = ''
        private articleTitle:string = ''
        private likeStatus:boolean = false

        mounted() {
            this.getArticleDetail()
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