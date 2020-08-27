<!--
 * @Author: your name
 * @Date: 2020-06-02 21:39:56
 * @LastEditTime: 2020-06-21 21:35:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\back\Article\ArticleManage.vue
-->
<template>
    <div class="container">
        <div class="top-bar clearfix">
            <el-button
                type="success"
                size="small"
                icon="el-icon-edit"
                @click="$router.push('/admin/edit-article')"
            >
                新建文章
            </el-button>
            <el-button
                type="primary"
                size="small"
                icon="el-icon-refresh"
                @click="getArticles"
            >
                刷新
            </el-button>
            <el-input
                placeholder="请输入文章标题"
                v-model="searchText"
                class="input-with-select"
                size="small"
                @keyup.native.enter="searchSubmit"
                clearable
                @clear="searchSubmit"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="searchSubmit"
                />
            </el-input>
            <el-select
                v-model="labelFilter"
                placeholder="请选择标签"
                size="small"
                class="label-filter"
            >
                <el-option
                    v-for="item in labels"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </div>
        <article-list
            :articles="articles"
            @sort-change="sortChange"
            @reloadData="getArticles"
        />
        <el-pagination
            style="margin-top: 1.5rem"
            background
            layout="prev, pager, next, total"
            :total="total"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @current-change="getArticles"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import ArticleList from './components/ArticleList.vue'
    import { getArticleListApi } from '@/api/back/article'
    @Component({
        name: 'ArticleLists',
        components: {
            ArticleList
        }
    })
    export default class ArticleManage extends Vue {
        private searchText:string = ''
        private labels:string[] = []
        private labelFilter: string = ''
        private articles:object[] = []
        // 分页参数
        private currentPage:number = 1
        private total:number = 0
        private pageSize:number = 20

        beforeMount() {
            this.getArticles()
        }

        searchSubmit() {
            this.currentPage = 1
            this.getArticles()
        }

        async getArticles() {
            let params = {
                offset: (this.currentPage - 1) * this.pageSize,
                limit: this.pageSize,
                searchText: this.searchText.trim() !== '' ? this.searchText : null,
                label: this.labelFilter !== '' ? this.searchText : null
            }
            let res = await getArticleListApi(params)
            if (res.status === 0) {
                this.total = res.data.total
                this.articles = res.data.articles
            }
        }

        sortChange(sort, order) {
            console.log(sort, order)
        }
    }
</script>
<style lang="stylus" scoped>
    .top-bar
        margin-bottom 1.5rem
        .input-with-select
            width 30rem
            margin-left 1rem
        .label-filter
            margin-left 1rem
</style>
