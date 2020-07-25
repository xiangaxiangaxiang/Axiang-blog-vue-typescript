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
            <div class="content">
                hi
            </div>
        </div>
        <span
            slot="reference"
        >
            <font-awesome-icon icon="bell" />
        </span>
    </el-popover>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'Notice'
    })
    export default class Notice extends Vue {
        private activeType:string = 'like'

        changeNoticeType(type:string) {
            this.activeType = type
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