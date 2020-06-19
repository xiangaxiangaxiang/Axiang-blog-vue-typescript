<!--
 * @Author: your name
 * @Date: 2020-06-02 21:39:56
 * @LastEditTime: 2020-06-19 22:24:43
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
            >
                新建文章
            </el-button>
            <el-button
                type="primary"
                size="small"
                icon="el-icon-refresh"
            >
                刷新
            </el-button>
            <el-input
                placeholder="请输入文章标题"
                v-model="searchText"
                class="input-with-select"
                size="small"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                />
            </el-input>
            <el-select
                v-model="labelFilter"
                placeholder="请选择"
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
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
        name: 'ArticleLists'
    })
    export default class ArticleManage extends Vue {
        private searchText:string = ''
        private labels:string[] = []
        private labelFilter: string = ''
    }
</script>
<style lang="stylus" scoped>
    .top-bar
        .input-with-select
            width 30rem
            margin-left 1rem
        .label-filter
            margin-left 1rem
</style>
