<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-06-14 13:24:48
 * @LastEditTime: 2020-06-14 16:59:12
 * @LastEditors: Please set LastEditors
 * @FilePath: \axiang-blog-vue-typescript\src\back\user\index.vue
-->
<template>
    <div class="user-management">
        <div class="filter-bar clearfix">
            <el-button
                type="primary"
                size="small"
                class="bar-item"
                @click="getUserList"
            >
                刷新
            </el-button>
            <el-input
                placeholder="搜索用户名"
                v-model="searchText"
                size="small"
                class="bar-item input"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                />
            </el-input>
        </div>
        <user-list
            :user-list="userList"
            :loading="loading"
            class="user-list"
            @reload-data="getUserList"
        />
        <el-pagination
            background
            layout="prev, pager, next, jumper, total"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="getUserList"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { getUserListApi } from '@/api/back/userManage'
    import UserList from './components/UserList.vue'
    @Component({
        name: 'UserManagement',
        components: {
            UserList
        }
    })
    export default class UserManagement extends Vue {
        private searchText:string = ''
        private userList: object[] = []
        private loading:boolean = false
        // 分页参数
        private currentPage:number = 1
        private pageSize:number = 5
        private total:number = 0

        beforeMount() {
            this.getUserList()
        }

        async getUserList() {
            this.loading = true
            const params = {
                offset: (this.currentPage - 1) * this.pageSize,
                limit: this.pageSize
            }
            const res = await getUserListApi(params)
            this.loading = false
            if (res.status === 0) {
                this.userList = res.data.userList
                this.total = res.data.total
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .user-management
        padding 1.5rem
        .filter-bar
            margin-bottom 1.5rem
            .bar-item
                margin-right 1rem
            .input
                width 20rem
        .user-list
            margin-bottom 1.5rem
</style>
