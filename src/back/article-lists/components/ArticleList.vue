<!--
 * @Author: your name
 * @Date: 2020-06-21 18:43:33
 * @LastEditTime: 2020-06-21 21:35:08
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
            type="index"
            width="50"
        />
        <el-table-column
            prop="title"
            label="文章标题"
        />
        <el-table-column
            label="文章类型"
            sortable="custom"
            prop="articleType"
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
                    {{ row.labels instanceof Array ? row.labels.join(', ') : '' }}
                </span>
            </template>
        </el-table-column>
        <el-table-column
            prop="likeNums"
            label="点赞数"
        />
        <el-table-column
            label="发布状态"
            sortable="custom"
            prop="publish"
        >
            <template slot-scope="{row}">
                <span :class="row.publish === 1 ? 'color-green' : 'color-red'">
                    {{ row.publish === 1 ? '已发布' : '未发布' }}
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
                >
                    {{ row.publish === 1 ? '下架' : '发布' }}
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                >
                    编辑
                </el-button>
                <el-button
                    type="danger"
                    size="mini"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component({
        name: 'ArticleList'
    })
    export default class ArticleList extends Vue {
        @Prop({default: () => [{
            title: '德玛西亚万岁',
            articleType: 300,
            labels: ['盖伦', '德邦总管'],
            publish: 1,
            likeNums: 1000
        }]}) articles!:object[]

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
    }
</script>
<style lang="stylus" scoped>
</style>