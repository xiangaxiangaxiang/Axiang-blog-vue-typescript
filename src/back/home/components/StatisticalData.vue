<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-06-06 18:03:55
 * @LastEditTime: 2020-06-06 18:03:55
 * @LastEditors: Please set LastEditors
 * @Description: 统计数据
 * @FilePath: \axiang-blog-vue-typescript\src\back\home\components\StatisticalData.vue
-->
<template>
    <el-row
        :gutter="40"
        class="panel-group"
    >
        <el-col
            :xs="12"
            :sm="12"
            :lg="6"
            class="card-panel-col"
        >
            <div
                class="card-panel"
                @click="getWeekData('webHits')"
            >
                <div class="card-panel-icon-wrapper icon-people">
                    <font-awesome-icon
                        class="card-panel-icon"
                        icon="hand-point-up"
                    />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        网站访问量
                    </div>
                    <count-to
                        :start-val="0"
                        :end-val="webHits"
                        :duration="700"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
        <el-col
            :xs="12"
            :sm="12"
            :lg="6"
            class="card-panel-col"
        >
            <div
                class="card-panel"
                @click="getWeekData('likes')"
            >
                <div class="card-panel-icon-wrapper icon-message">
                    <font-awesome-icon
                        class="card-panel-icon"
                        icon="thumbs-up"
                    />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        点赞数量
                    </div>
                    <count-to
                        :start-val="0"
                        :end-val="likes"
                        :duration="700"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
        <el-col
            :xs="12"
            :sm="12"
            :lg="6"
            class="card-panel-col"
        >
            <div
                class="card-panel"
                @click="getWeekData('comments')"
            >
                <div class="card-panel-icon-wrapper icon-money">
                    <font-awesome-icon
                        class="card-panel-icon"
                        icon="comment-dots"
                    />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        评论数量
                    </div>
                    <count-to
                        :start-val="0"
                        :end-val="comments"
                        :duration="700"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
        <el-col
            :xs="12"
            :sm="12"
            :lg="6"
            class="card-panel-col"
        >
            <div
                class="card-panel"
                @click="getWeekData('articleHits')"
            >
                <div class="card-panel-icon-wrapper icon-shopping">
                    <font-awesome-icon
                        class="card-panel-icon"
                        icon="book-open"
                    />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        文章点击数
                    </div>
                    <count-to
                        :start-val="0"
                        :end-val="articleHits"
                        :duration="700"
                        class="card-panel-num"
                    />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import CountTo from 'vue-count-to'
    @Component({
        name: 'StatisticalData',
        components: {
            CountTo
        }
    })
    export default class Home extends Vue {
        private webHits:number = 0
        private likes:number = 0
        private comments:number = 0
        private articleHits:number = 0

        getWeekData(type): void {
            this.$emit('getWeekData', type)
        }
    }
</script>
<style lang="stylus" scoped>
    .panel-group
        margin-top 40px
        .card-panel-col
            margin-bottom 32px
        .card-panel
            height 108px
            cursor pointer
            font-size 12px
            position relative
            overflow hidden
            color #666
            background #fff
            box-shadow 4px 4px 40px rgba(0, 0, 0, .05)
            border-color rgba(0, 0, 0, .05)
            &:hover
                .card-panel-icon-wrapper
                    color #fff
                .icon-people
                    background #40c9c6
                .icon-message
                    background #36a3f7
                .icon-money
                    background #f4516c
                .icon-shopping
                    background #34bfa3
            .icon-people
                color #40c9c6
            .icon-message
                color #36a3f7
            .icon-money
                color #f4516c
            .icon-shopping
                color #34bfa3
            .card-panel-icon-wrapper
                float left
                margin 14px 0 0 14px
                padding 16px
                transition all 0.38s ease-out
                border-radius 6px
            .card-panel-icon
                float left
                font-size 48px
            .card-panel-description
                float right
                font-weight bold
                margin 26px
                margin-left 0px
                .card-panel-text
                    line-height 18px
                    color rgba(0, 0, 0, 0.45)
                    font-size 16px
                    margin-bottom 12px
                .card-panel-num
                    font-size 20px

    @media (max-width550px)
        .card-panel-description
            display none
        .card-panel-icon-wrapper
            float none !important
            width 100%
            height 100%
            margin 0 !important
            .svg-icon
                display block
                margin 14px auto !important
                float none !important
</style>