<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-06-14 14:13:00
 * @LastEditTime: 2020-06-14 16:53:16
 * @Description: 用户列表
 * @FilePath: \axiang-blog-vue-typescript\src\back\user\components\UserList.vue
-->
<template>
    <div>
        <el-table
            :data="commentList"
            border
            style="width: 100%"
            v-loading="loading"
            height="calc(100vh - 17.5rem)"
        >
            <el-table-column
                width="50"
                label="#"
                align="center"
            >
                <template slot-scope="{$index}">
                    <span>
                        {{ $index + 1 }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="评论内容"
                prop="content"
                class-name="text-bold"
            />
            <el-table-column
                label="来自文章"
                prop="target"
            />
            <el-table-column
                label="评论用户"
            >
                <template slot-scope="{row}">
                    <span
                        class="text-bold"
                        :class="getUserTypeClass(row.userType)"
                    >
                        {{ getUserType(row.userType) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="点赞数量"
                width="100"
                align="center"
                prop="likeNums"
            />
            <el-table-column
                label="操作"
                width="100"
                align="center"
            >
                <template slot-scope="{row}">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteComment(row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { deleteCommentApi } from '@/api/back/commentManage'
    @Component({
        name: 'UserList'
    })
    export default class UserList extends Vue {
        @Prop({default: () => []}) commentList !:object[]
        @Prop({default: false}) loading !:boolean


        async deleteComment(row) {
            const data = {
                id: row.id
            }
            let res = await deleteCommentApi(data)
            if (res.status === 0) {
                this.$emit('reload-data')
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .avatar
        display inline-block
        &+span
            display inline-block
            vertical-align top
            height 3.2rem
            line-height 3.2rem
            margin-left 1rem
</style>