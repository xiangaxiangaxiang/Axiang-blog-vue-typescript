<template>
    <div class="hot-spot">
        <h1 class="title text-bold">
            热门文章
        </h1>
        <el-table
            :data="articles"
            style="width: 100%;padding-top: 1.5rem;"
            height="calc(100% - 3.5rem)"
        >
            <el-table-column
                label="文章标题"
            >
                <template slot-scope="{row}">
                    {{ row.title }}
                </template>
            </el-table-column>
            <el-table-column
                label="点赞数"
                width="100"
                align="center"
            >
                <template slot-scope="{row}">
                    {{ row.likes }}
                </template>
            </el-table-column>
            <el-table-column
                label="评论数"
                width="100"
                align="center"
            >
                <template slot-scope="{row}">
                    {{ row.comments }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'StatisticalData'
    })
    export default class HotSpot extends Vue {
        private articles:{title: string, likes: number, comments: number}[] = []
    }
</script>

<style lang="stylus" scoped>
    .hot-spot
        width 100%
        background $white
        height 50rem
        padding 1rem 1.5rem
        .title
            width 100%
            height 2rem
            line-height 2rem
            text-align center
            font-size $fs-m
            color $blue
</style>