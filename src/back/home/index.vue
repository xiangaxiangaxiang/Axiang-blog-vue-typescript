<!--
 * @Author: your name
 * @Date: 2020-05-28 22:02:42
 * @LastEditTime: 2020-06-07 14:35:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\back\home\index.vue
-->
<template>
    <div class="home-container">
        <statistical-data />
        <div class="chart-wrapper">
            <bar-chart />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import StatisticalData from './components/StatisticalData.vue'
    import BarChart from './components/BarChart.vue'
    @Component({
        name: 'Home',
        components: {
            StatisticalData,
            BarChart
        }
    })
    export default class Home extends Vue {
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
            height 40rem
            background #fff
            padding 1.5rem
</style>