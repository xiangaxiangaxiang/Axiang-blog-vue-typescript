<template>
    <div class="comment-management">
        <div class="filter-bar clearfix">
            <el-button
                type="primary"
                size="small"
                class="bar-item"
                @click="getCommentList"
            >
                刷新
            </el-button>
            <el-input
                placeholder="搜索评论"
                v-model="searchText"
                size="small"
                class="bar-item input"
                clearable
                @clear="searchSubmit"
                @keyup.native.enter="searchSubmit"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="searchSubmit"
                />
            </el-input>
        </div>
        <comment-list
            :comment-list="commentList"
            :loading="loading"
            class="comment-list"
            @reload-data="getCommentList"
        />
        <el-pagination
            background
            layout="prev, pager, next, jumper, total"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="getCommentList"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { getCommentListApi } from '@/api/back/commentManage'
    import CommentList from './components/CommentList.vue'
    @Component({
        name: 'CommentManagement',
        components: {
            CommentList
        }
    })
    export default class CommentManagement extends Vue {
        private searchText:string = ''
        private commentList: object[] = []
        private loading:boolean = false
        // 分页参数
        private currentPage:number = 1
        private pageSize:number = 20
        private total:number = 0

        beforeMount() {
            this.getCommentList()
        }

        async getCommentList() {
            this.loading = true
            const params = {
                offset: (this.currentPage - 1) * this.pageSize,
                limit: this.pageSize
            }
            const res = await getCommentListApi(params)
            this.loading = false
            if (res && res.status === 0) {
                this.commentList = res.data.commentList
                this.total = res.data.total
            }
        }

        searchSubmit() {
            this.currentPage = 1
            this.getCommentList()
        }
    }
</script>

<style lang="stylus" scoped>
    .comment-management
        padding 1.5rem
        .filter-bar
            margin-bottom 1.5rem
            .bar-item
                margin-right 1rem
            .input
                width 25rem
        .comment-list
            margin-bottom 1.5rem
</style>