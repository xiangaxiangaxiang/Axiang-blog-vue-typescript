<template>
    <el-scrollbar class="scrollbar">
        666
    </el-scrollbar>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component({
        name: 'ArticleDetailSidebar'
    })
    export default class ArticleDetailSidebar extends Vue {}
</script>

<style scoped lang="stylus">
    .scrollbar
        width 100%
        height 100%
        padding 0 2rem
</style>
