<template>
    <el-popover
        placement="bottom-start"
        width="350"
        trigger="click"
        @show="getNotice"
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
            <el-scrollbar class="scrollbar">
                <template v-if="activeType === 'like'">
                    <div
                        class="notice-item"
                        v-for="(item, index) in likes"
                        :key="index"
                    >
                        <span class="color-blue">
                            {{ `${item.operationUser}      ` }}
                        </span>
                        点赞了你的{{ getNoticeType(item.targetType) }}
                        <span class="color-blue">
                            {{ `      ${item.targetName}` }}
                        </span>
                    </div>
                </template>
                <template v-else>
                    <div
                        class="notice-item"
                        v-for="(item, index) in comments"
                        :key="index"
                    >
                        <span class="color-blue">
                            {{ `${item.operationUser}     ` }}
                        </span>
                        评论了你
                        <span class="color-blue cursor-pointer">
                            {{ `    ${item.targetName}` }}
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
    import { getNoticeApi, getUnreadNumsApi } from '@/api/notice'

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
        private unreadNums:number = 0
        private timer

        @Watch('activeType')
        changeActiveType() {
            this.getNotice()
        }

        mounted () {
            const isLogin = sessionStorage.getItem('isLogin')
            if (isLogin) {
                this.timer = setInterval(() => {
                    this.getUnreadNums()
                }, 7000)
                this.$once('hook:beforeDestroy', () => {
                    clearInterval(this.timer)
                })
            }
        }

        async getUnreadNums() {
            const res = await getUnreadNumsApi()
            if (res && res.status === 0) {
                this.unreadNums = res.data.nums
            } else {
                clearInterval(this.timer)
            }
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
        .scrollbar
            height 36rem
            background-color white
            /deep/.el-scrollbar__wrap
                overflow-x hidden
                overflow-y auto
            .notice-item
                margin-bottom 0.1rem
                padding 1rem 0.5rem
                width 100%
                border-bottom 1px solid $greyBg
                min-height 3rem
                line-height 1.5
</style>