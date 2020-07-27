<template>
    <el-popover
        placement="bottom-start"
        width="350"
        trigger="click"
    >
        <div class="notice-content">
            <div class="header">
                <div
                    class="header-item"
                    :class="activeType === 'like' ? 'active' : ''"
                >
                    <font-awesome-icon
                        class="icon"
                        icon="heart"
                        @click="changeNoticeType('like')"
                    />
                </div>
                <div
                    class="header-item"
                    :class="activeType === 'comment' ? 'active' : ''"
                >
                    <font-awesome-icon
                        class="icon"
                        icon="comment"
                        @click="changeNoticeType('comment')"
                    />
                </div>
            </div>
            <el-scrollbar style="height:100%;background:white;">
                <template v-if="activeType === 'like'">
                    <div
                        class="notice-item"
                        v-for="(item, index) in likes"
                        :key="index"
                    >
                        <span>
                            {{ item.operationUser }}
                        </span>
                        &nbsp;
                        点赞了你的 {{ getNoticeType(item.type) }}
                        <span>
                            {{ item.targetName }}
                        </span>
                    </div>
                </template>
                <template v-else>
                    <div
                        class="notice-item"
                        v-for="(item, index) in comments"
                        :key="index"
                    >
                        <span>
                            {{ item.operationUser }}
                        </span>
                        &nbsp;
                        评论了你
                        &nbsp;
                        <span>
                            {{ item.targetName }}
                        </span>
                    </div>
                </template>
            </el-scrollbar>
        </div>
        <span
            slot="reference"
        >
            <font-awesome-icon icon="bell" />
        </span>
    </el-popover>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { getNoticeApi } from '@/api/notice'

    enum likeType {
        ARTICLE = 100,
        COMMENT = 300,
        POST = 200
    }

    enum noticeType {
        COMMENT = 100,
        LIKE = 200
    }

    @Component({
        name: 'Notice'
    })
    export default class Notice extends Vue {
        private activeType:string = 'like'
        private comments:object[] = []
        private likes:object[] = []
        private timer

        @Watch('activeType')
        changeActiveType() {
            this.getNotice()
        }

        async getNotice() {
            const params = {
                offset: 0,
                limit: 10,
                type: this.activeType === 'like' ? noticeType.LIKE : noticeType.COMMENT
            }
            const res = await getNoticeApi(params)
            if (res && res.status === 0) {
                if (this.activeType === 'like') {
                    this.likes = res.data
                } else {
                    this.comments = res.data
                }
            }
        }

        changeNoticeType(type:string) {
            this.activeType = type
        }

        getNoticeType(type):string {
            if (type === likeType.ARTICLE) {
                return '文章'
            } else if (type === likeType.COMMENT) {
                return '评论'
            } else if (type === likeType.POST) {
                return '动态'
            }
            return ''
        }
    }
</script>

<style lang="stylus" scoped>
    .notice-content
        width 100%
        height 40rem
        overflow hidden
        background-color $greyBg
        .header
            width 100%
            height 3.9rem
            padding-bottom 0.9rem
            background-color white
            margin-bottom 0.1rem
            .header-item
                width 50%
                height 3rem
                line-height 3rem
                display inline-block
                text-align center
                font-size $fs-s
                &+.header-item
                    border-left 1px solid $greyBg
                .icon
                    cursor pointer
                &.active
                    color $blue
        .content
            height 36rem
            background-color white
</style>