<template>
    <div
        class="article-detail"
    >
        <mavon-editor
            v-model="markdown"
            style="height: 100%;background: rgba(0,0,0,0.1);"
            font-size="2rem"
            :tab-size="4"
            ref="md"
            default-open="preview"
            :toolbars-flag="false"
            :navigation="true"
            :editable="false"
            :subfield="false"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { getArticleDetailApi } from '@/api/front/article'
    @Component({
        name: 'ArticleDetail'
    })
    export default class ArticleDetail extends Vue {
        @Prop({default: ''}) articleId!:string
        private articleHtml:string = ''
        private markdown:string = ''

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
            }
        }
    }
</script>
<style lang="stylus" scoped>
</style>