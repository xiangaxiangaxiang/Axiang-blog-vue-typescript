<template>
    <div class="bar-chart" />
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
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
        private chart:any = null
        private list: {date:string,value:number}[] = []

        created() {
            for (let i = 0; i < 30; i++) {
                let item = {
                    date: `2020-06-${i.toString().padStart(2, '0')}`,
                    value: Math.floor(50 * Math.random())
                }
                this.list.push(item)
            }
        }
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
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
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 10,
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: this.list.map(item => item.date),
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
                    name: 'pageA',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: this.list.map(item => item.value),
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