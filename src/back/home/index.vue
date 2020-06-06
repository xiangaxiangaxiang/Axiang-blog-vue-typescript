<!--
 * @Author: your name
 * @Date: 2020-05-28 22:02:42
 * @LastEditTime: 2020-06-02 21:45:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\back\home\index.vue
-->
<template>
    <div class="home-container">
        <statistical-data />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import StatisticalData from './components/StatisticalData.vue'
    @Component({
        name: 'Home',
        components: {
            StatisticalData
        }
    })
    export default class Home extends Vue {
    }
</script>
<style lang="stylus" scoped>
    .home-container
        padding 15px
        height 100%
        background-color: rgb(240, 242, 245)
        min-height calc(100vh - 50px)
</style>