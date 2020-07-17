<!--
 * @Author: your name
 * @Date: 2020-06-21 18:43:33
 * @LastEditTime: 2020-07-08 22:04:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\back\article-lists\components\ArticleList.vue
-->
<template>
    <el-table
        :data="articles"
        border
        stripe
        style="width: 100%"
        height="calc(100vh - 18.5rem)"
        @sort-change="sortChange"
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
            prop="title"
            label="文章标题"
        />
        <el-table-column
            label="文章类型"
            sortable="custom"
            prop="articleType"
            width="120"
            align="center"
        >
            <template slot-scope="{row}">
                <span :class="getArticleTypeClass(row.articleType)">
                    {{ getArticleType(row.articleType) }}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="标签">
            <template slot-scope="{row}">
                <span>
                    {{ getArticleLabels(row.labels) }}
                </span>
            </template>
        </el-table-column>
        <el-table-column
            prop="likeNums"
            label="点赞数"
            width="120"
            align="center"
        />
        <el-table-column
            label="发布状态"
            sortable="custom"
            prop="publish"
            width="120"
            align="center"
        >
            <template slot-scope="{row}">
                <span :class="row.publish === 1 ? 'color-green' : 'color-red'">
                    {{ row.publish === 1 ? '已发布' : '未发布' }}
                </span>
            </template>
        </el-table-column>
        <el-table-column
            label="创建时间时间"
            width="160"
            align="center"
        >
            <template slot-scope="{row}">
                <span>
                    {{ _formatTime(row.created_at) }}
                </span>
            </template>
        </el-table-column>
        <el-table-column
            label="更新时间"
            width="160"
            align="center"
        >
            <template slot-scope="{row}">
                <span>
                    {{ _formatTime(row.updated_at) }}
                </span>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="220"
        >
            <template slot-scope="{row}">
                <el-button
                    :type="row.publish === 1 ? 'danger' : 'success'"
                    size="mini"
                    @click="changePublishStatus(row)"
                >
                    {{ row.publish === 1 ? '下架' : '发布' }}
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    @click="editArticle(row)"
                >
                    编辑
                </el-button>
                <el-button
                    type="danger"
                    size="mini"
                    @click="deleteArticle(row)"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { changePublishStatusApi, deleteArticleApi } from '@/api/back/article'
    import { formatTime } from '@/common/js/util'
    @Component({
        name: 'ArticleList'
    })
    export default class ArticleList extends Vue {
        @Prop({default: () => []}) articles!:object[]

        getArticleType(type) {
            if (type === 100) {
                return '技术'
            } else if (type === 200) {
                return '生活'
            } else if (type === 300) {
                return '梦想'
            }
            return '未知'
        }
        getArticleTypeClass(type) {
            if (type === 100) {
                return 'color-blue'
            } else if (type === 200) {
                return 'color-green'
            } else if (type === 300) {
                return 'color-orange'
            }
            return '未知'
        }

        sortChange(column) {
            this.$emit('sort-change', column.prop, column.order)
        }

        _formatTime(time) {
            return formatTime(time)
        }

        // 改变文章发布状态
        async changePublishStatus(row) {
            const data = {
                articleId: row.articleId,
                publish: row.publish ? 0 : 1
            }
            const res = await changePublishStatusApi(data)
            if (res && res.status === 0) {
                if (data.publish) {
                    this.$message.success('文章已发布')
                } else {
                    this.$message.success('文章已下架')
                }
                this.$emit('reloadData')
            }
        }

        // 删除文章
        async deleteArticle(row) {
            this.$confirm('确定要删除该文章吗，删除后将无法恢复?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const data = {
                    articleId: row.articleId
                }
                const res = await deleteArticleApi(data)
                if (res.status === 0) {
                    this.$message.success('删除成功')
                    this.$emit('reloadData')
                }
            })
        }

        getArticleLabels(labels) {
            try {
                const arr = JSON.parse(labels)
                return arr.join('、 ')
            } catch (error) {
                console.log(error)
                return '解析出错'
            }
        }

        // 修改文章
        editArticle(row) {
            sessionStorage.setItem('article', JSON.stringify(row))
            this.$router.push('/edit-article')
        }
    }
</script>
<style lang="stylus" scoped>
</style>