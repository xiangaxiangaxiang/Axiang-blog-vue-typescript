<template>
    <div class="article-container">
        <el-row style="height: 100%;">
            <el-col
                :span="16"
                style="height: 100%;"
            >
                <article-list />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import ArticleList from './components/ArticleList.vue'
    @Component({
        name: 'FrontLayout',
        components: {
            ArticleList
        }
    })
    export default class FrontLayout extends Vue {
        private imgSrc = ''
    }
</script>

<style lang="stylus" scoped>
    .article-container
        width 100%
        height $contentHeight
        padding-top 1.5rem
</style>