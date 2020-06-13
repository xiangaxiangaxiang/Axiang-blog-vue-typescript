<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-06-06 18:03:55
 * @LastEditTime: 2020-06-13 15:12:50
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
    import { getTotalApi } from '../../../api/back/statistics'
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

        mounted() {
            this.getTotal()
        }

        async getTotal() {
            const res = await getTotalApi()
            if (res.status === 0 && res.data) {
                this.webHits = res.data.webHitsTotal
                this.likes = res.data.likesTotal
                this.comments = res.data.commentsTotal
                this.articleHits = res.data.articleHitsTotal
            }
        }

        getWeekData(type): void {
            this.$emit('getWeekData', type)
        }
    }
</script>
<style lang="stylus" scoped>
    .panel-group
        margin-top 2rem
        .card-panel-col
            margin-bottom 3.2rem
        .card-panel
            height 11rem
            cursor pointer
            font-size 1.2rem
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
                margin 1.4rem 0 0 1.4rem
                padding 1.6rem
                transition all 0.38s ease-out
                border-radius 0.6rem
            .card-panel-icon
                float left
                font-size 4.8rem
            .card-panel-description
                float right
                font-weight bold
                margin 2.6rem
                margin-left 0px
                .card-panel-text
                    line-height 1.8rem
                    color rgba(0, 0, 0, 0.45)
                    font-size 16px
                    margin-bottom 1.2rem
                .card-panel-num
                    font-size 2rem

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
                margin 1.4rem auto !important
                float none !important
</style>