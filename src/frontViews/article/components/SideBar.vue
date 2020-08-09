<template>
    <div class="side-bar">
        <div class="search">
            <el-input
                size="small"
                v-model="searchText"
                placeholder="搜索文章"
                clearable
                @clear="searchSubmit"
                @keyup.native.enter="searchSubmit"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="searchSubmit"
                />
            </el-input>
        </div>
        <div class="label-filter">
            <p class="title">
                文章标签
            </p>
            <el-tag
                class="label"
                v-for="(item, index) in labels"
                :key="index"
                :type="labelType[index%5]"
                :closable="activeLabel === item"
                @click="filterByLabel(item)"
                @close="closeLabelFilter"
            >
                {{ item }}
            </el-tag>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { getLabelsApi } from '@/api/front/article'

    enum ArticleType {
        TECHNOLOGY = 100,
        LIFE = 200,
        DREAM = 300
    }

    @Component({
        name: 'SideBar'
    })
    export default class SideBar extends Vue {
        @Prop({default: ''}) type!:string

        private searchText:string = ''
        private labelType:string[] = ['', 'success', 'info', 'warning', 'danger']
        private labels:string[] = []
        private activeLabel:string = ''

        @Watch('type')
        changeArticleType() {
            this.getLabels()
        }

        mounted() {
            this.getLabels()
        }

        async getLabels() {
            const params = { type: ArticleType[this.type.toUpperCase()] }
            const res = await getLabelsApi(params)
            if (res && res.status === 0) {
                this.labels = res.data
            }
        }

        searchSubmit() {
            this.$emit('searchSubmit', this.searchText)
        }

        filterByLabel(label) {
            this.activeLabel = label
            this.$emit('filterByLabel', label)
        }

        closeLabelFilter() {
            this.activeLabel = ''
            this.$emit('filterByLabel', '')
        }
    }
</script>
<style lang="stylus" scoped>
    .side-bar
        width 100%
        height 100%
        padding 2rem
        .search
            width 100%
            height 4rem
        .label-filter
            width 100%
            margin-top 3rem
            .title
                width 100%
                height 4rem
                line-height 4rem
                text-align center
                color $ligth-text
                font-size $fs-ss
            .label
                margin-right 1.5rem
                margin-bottom 1.5rem
                cursor pointer
                user-select none
</style>