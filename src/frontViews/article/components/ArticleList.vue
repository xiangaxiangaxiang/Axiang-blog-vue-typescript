<!--
 * @Author: your name
 * @Date: 2020-08-02 21:43:05
 * @LastEditTime: 2020-08-04 23:16:06
 * @Description: 文章列表
 * @FilePath: \axiang-blog-vue-typescript\src\frontViews\article\components\ArticleList.vue
-->
<template>
    <el-scrollbar class="scrollbar">
        <div
            v-for="(item, index) in articles"
            :key="index"
            class="list-item"
        >
            <div class="article-content">
                <h3 class="title">
                    {{ item.title }}
                </h3>
                <p class="content">
                    {{ item.content }}
                </p>
                <div class="statistics">
                    <span class="statistics-item">
                        <font-awesome-icon icon="eye" />
                        {{ item.clickNums }}
                    </span>
                    <span class="statistics-item">
                        <font-awesome-icon icon="comments" />
                        {{ item.commentsNums }}
                    </span>
                    <span class="statistics-item">
                        <font-awesome-icon icon="heart" />
                        {{ item.likeNums }}
                    </span>
                </div>
            </div>
            <div class="img-wrapper">
                <img
                    :src="item.firstImage"
                    alt="图片加载失败"
                >
            </div>
        </div>
    </el-scrollbar>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    interface articleType {
        title: string
        content: string
        likeNums: number
        commentsNums: number
        clickNums: number
        firstImage: string
    }

    @Component({
        name: 'ArticleList'
    })
    export default class ArticleList extends Vue {
        private articles:articleType[] = []
        private item:articleType = {
                title: '这是一个标题',
                content: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦阿拉拉拉啊啦啦啦啊啦啦啦啦啦啦啦德玛西亚万岁少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所',
                likeNums: 666,
                firstImage: require('../../../assets/avatar.jpg'),
                clickNums: 777,
                commentsNums: 888
            }

        mounted() {
            for (let i =0; i < 10; i++) {
                this.articles.push(this.item)
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .scrollbar
        width 100%
        height 100%
        overflow auto
        .list-item
            width 100%
            min-height 13rem
            max-height 17rem
            padding 1.5rem
            &+.list-item
                border-top 1px solid #bdc3c7
            .article-content
            .img-wrapper
                display inline-block
            .article-content
                width calc(100% - 12rem)
                height 100%
                .title
                    width 100%
                    max-height 4rem
                    line-height 2rem
                    margin-bottom 1rem
                    color $orange
                    font-size $fs-s
                    font-weight bold
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    &:hover
                        text-decoration underline
                        cursor pointer
                .content
                    width 100%
                    height 6rem
                    line-height 2rem
                    margin-bottom 1rem
                    color $blue
                    font-size $fs-ss
                    overflow hidden
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 3
                    -webkit-box-orient vertical
                .statistics
                    width 100%
                    height 2rem
                    line-height 2rem
                    color $ligth-text
                    font-size $fs-sss
                    .statistics-item
                        margin-right 1.5rem
            .img-wrapper
                width 12rem
                height 12rem
                vertical-align top
                position relative
                img
                    width 10rem
                    height 10rem
                    position absolute
                    left 50%
                    top 50%
                    transform translate(-50%, -50%)
                    cursor pointer
</style>