<template>
    <div class="bar-chart" />
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    require('echarts/lib/chart/bar')
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    const animationDuration = 1000
    @Component({
        name: 'BarChart'
    })
    export default class BarChart extends Vue {

        @Prop({default: () => []}) private activeChart!:{'date':string, nums: number}[]
        @Prop({default: 'webHits'}) private type!:string

        private chart:any = null
        private list: {date:string,value:number}[] = []

        get chartType() {
            switch (this.type) {
                case 'webHits':
                    return '网站访问量'
                case 'likes':
                    return '点赞数'
                case 'comments':
                    return '评论数'
                case 'articleHits':
                    return '文章点击数'
                default:
                    return ''
            }
        }

        @Watch('activeChart', {deep: true})
        reloadChart() {
            this.initChart()
            // if (newValue.length > 0) {}
        }

        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        }
        initChart():void {
            this.chart = echarts.init(this.$el, 'macarons')
            this.chart.setOption({
                title: {
                    text: this.chartType
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 50,
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: this.activeChart.map(item => item.date),
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    name: this.chartType,
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: this.activeChart.map(item => item.nums),
                    animationDuration
                }]
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .bar-chart
        width 100%
        height 100%
        box-sizing border-box
</style>