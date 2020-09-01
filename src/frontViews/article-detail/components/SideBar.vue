<template>
    <el-scrollbar class="scrollbar">
        <div
            class="toc"
            v-html="toc"
        />
    </el-scrollbar>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { getRecommendationApi } from '@/api/front/article'
    @Component({
        name: 'ArticleDetailSidebar'
    })
    export default class ArticleDetailSidebar extends Vue {
        @Prop({default: ''}) html!:string
        @Prop({default: () => []}) labels!:string[]

        get toc() {
            const reg = /<[hH][1-3]>.*?<\/[hH][1-3]>/g
            const arr = this.html.match(reg) as string[] ? this.html.match(reg) as string[] : []
            const tocArr = arr.map(item => {
                return item.replace(/<a id="(.*)"><\/a>/g, (m, s1) => {
                    return `<a id="${s1}" href="#${s1}"></a>`
                })
            })
            return tocArr.join('')
        }

        @Watch('labels')
        async getRecommendation(newValue) {
            const params = {
                labels: JSON.stringify(newValue)
            }
            const res = await getRecommendationApi(params)
            if (res && res.status === 0) {
                console.log(res)
            }
        }
    }
</script>

<style lang="stylus">
    .toc
        padding-top 3rem
        margin-bottom 2rem
        color $orange
        h1
            font-size $fs-m
        h2
            font-size $fs-s
            padding-left 2rem
        h3
            font-size $fs-ss
            padding-left 4rem
        h1, h2, h3
            height 2.7rem
            line-height 2.7rem
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            font-weight bold
            cursor pointer
            position relative
            a
                width 100%
                height 100%
                display block
                position absolute
                top 0
                left 0
</style>
