<template>
    <div class="article-container">
        <el-row style="height: 100%;">
            <el-col
                :span="16"
                style="height: 100%;"
            >
                <article-list
                    :type="type"
                    :is-loading="isLoading"
                    :articles="articles"
                    @changeLoading="isLoading=true"
                    @getArticle="handleScroll"
                />
            </el-col>
            <el-col
                :span="8"
                style="height: 100%;"
            >
                <side-bar
                    :type="type"
                    @searchSubmit="searchSubmit"
                    @filterByLabel="filterByLabel"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import ArticleList from './components/ArticleList.vue'
    import SideBar from './components/SideBar.vue'
    import { getArticlesApi } from '@/api/front/article'

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
        name: 'FrontLayout',
        components: {
            ArticleList,
            SideBar
        }
    })
    export default class FrontLayout extends Vue {
        @Prop({default: ''}) type!:string

        private articles:articleType[] = []
        private offset:number = 0
        private limit:number = 8
        private total:number = 0
        private isLoading:boolean = false
        private label:string = ''
        private searchText:string = ''

        @Watch('type')
        changeArticleType() {
            this.offset = 0
            this.articles = []
            this.getArticles()
        }

        mounted() {
            this.getArticles()
        }

        filterByLabel(label) {
            this.label = label
            this.articles = []
            this.offset = 0
            this.getArticles()
        }

        searchSubmit(searchText) {
            this.searchText = searchText
            this.articles = []
            this.getArticles()
        }

        handleScroll() {
            this.offset = this.articles.length
            if (this.offset < this.total) {
                this.getArticles()
            } else {
                this.isLoading = false
            }
        }

        async getArticles() {
            this.isLoading = true
            const params = {
                offset: this.offset,
                limit: this.limit,
                articleType: ArticleType[this.type.toUpperCase()],
                searchText: this.searchText !== '' ? this.searchText : null,
                label: this.label !== '' ? this.label : null
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
    .article-container
        width 100%
        height $contentHeight
        padding-top 1.5rem
</style>