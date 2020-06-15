<!--
 * @Author: your name
 * @Date: 2020-05-28 22:02:42
 * @LastEditTime: 2020-06-14 13:08:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\back\home\index.vue
-->
<template>
    <div class="home-container">
        <statistical-data @changeStatistical="changeStatistical" />
        <div class="chart-wrapper">
            <bar-chart
                :active-chart="activeChart"
                :type="statisticsType"
            />
        </div>
        <el-row :gutter="40">
            <el-col
                :xs="{span: 24}"
                :sm="{span: 24}"
                :md="{span: 24}"
                :lg="{span: 12}"
                :xl="{span: 12}"
            >
                <hot-spot />
            </el-col>
            <el-col
                :xs="{span: 24}"
                :sm="{span: 24}"
                :md="{span: 24}"
                :lg="{span: 12}"
                :xl="{span: 12}"
            >
                <active-user />
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import StatisticalData from './components/StatisticalData.vue'
    import BarChart from './components/BarChart.vue'
    import HotSpot from './components/HotSpot.vue'
    import ActiveUser from './components/ActiveUser.vue'

    import { getMonthlyStatisticsApi } from '@/api/back/statistics'
    @Component({
        name: 'Home',
        components: {
            StatisticalData,
            BarChart,
            HotSpot,
            ActiveUser
        }
    })
    export default class Home extends Vue {
        private monthlyStatistics:object = {}
        private activeChart:{'date':string, nums: number}[] = []
        private statisticsType: string = 'webHits'

        mounted() {
            this.getMonthlyStatistics()
        }

        async getMonthlyStatistics() {
            const res = await getMonthlyStatisticsApi()
            if (res.status === 0 && res.data) {
                this.monthlyStatistics = res.data
                this.activeChart = res.data.webHits
            }
        }

        changeStatistical(type) {
            this.activeChart = this.monthlyStatistics[type]
            this.statisticsType = type
        }
    }
</script>
<style lang="stylus" scoped>
    .home-container
        padding 1.5rem
        height 100%
        background-color: rgb(240, 242, 245)
        min-height calc(100vh - 5rem)
        .chart-wrapper
            width 100%
            height 35rem
            background #fff
            padding 1.5rem
            margin-bottom 3.2rem
</style>