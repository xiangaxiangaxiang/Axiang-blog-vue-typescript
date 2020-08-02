<!--
 * @Author: your name
 * @Date: 2020-08-02 21:43:05
 * @LastEditTime: 2020-08-02 21:49:10
 * @Description: 文章列表
 * @FilePath: \axiang-blog-vue-typescript\src\frontViews\article\components\ArticleList.vue
-->
<template>
    <el-scrollbar class="scrollbar">
        <div
            v-for="item in 100"
            :key="item"
        >
            hello
        </div>
    </el-scrollbar>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
        name: 'ArticleList'
    })
    export default class ArticleList extends Vue {
    }
</script>
<style lang="stylus" scoped>
    .scrollbar
        width 100%
        height 100%
</style>