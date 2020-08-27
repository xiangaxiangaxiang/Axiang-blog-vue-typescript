<template>
    <div class="comment-container">
        <div class="comment-input-wrapper">
            <div class="avatar">
                <img
                    v-if="avatar"
                    :src="avatar"
                    alt="加载错误"
                >
            </div>
            <comment-input
                style="flex: 1"
                button-size="small"
                :target-id="targetId"
                @get-comments="getComments"
            />
        </div>
        <div class="comment-list">
            <div
                class="comment-item clearfix"
                v-for="item in commentList"
                :key="item.uniqueId"
            >
                <div class="avatar">
                    <img
                        :src="item.userAvatar"
                        alt="加载出错"
                    >
                </div>
                <div class="content-box">
                    <div class="user-info">
                        <span>
                            {{ item.userInfo.nickname }}
                        </span>
                    </div>
                    <div class="comment-content">
                        {{ item.content }}
                    </div>
                    <div class="reply-stat">
                        <time class="time">
                            {{ item.createdTime | formatTime }}
                        </time>
                        <div
                            class="delete cursor-pointer"
                            @click="deleteCommont(item.uniqueId)"
                            v-if="currentUid === item.userInfo.uid"
                        >
                            &nbsp;·&nbsp; 删除
                        </div>
                        <div class="action">
                            <div
                                @click="handleLike(item)"
                                :title="item.likeStatus ? '取消点赞': '点赞'"
                                :class="item.likeStatus ? 'like': ''"
                            >
                                <font-awesome-icon icon="heart" />
                            </div>
                            <div
                                class="comment"
                                @click="setActiveReply(item)"
                            >
                                <font-awesome-icon icon="comment" />&nbsp;评论
                            </div>
                        </div>
                    </div>
                    <comment-input
                        :type="300"
                        button-size="mini"
                        :target-id="targetId"
                        :reply-user-id="activeReplyUserId"
                        :comment-id="activeCommentId"
                        v-if="item.uniqueId === activeReply"
                        @getComments="getComments"
                        @closeReply="activeReply=''"
                    />
                    <div
                        class="reply-comments-wrapper"
                        v-show="item.replyComments.length"
                    >
                        <div
                            class="reply-comments"
                            v-for="replyItem in item.replyComments"
                            :key="replyItem.uniqueId"
                        >
                            <div class="avatar">
                                <img
                                    :src="replyItem.userAvatar"
                                    alt="加载出错"
                                >
                            </div>
                            <div class="reply-box">
                                <div class="user-info">
                                    <span>
                                        {{ replyItem.userInfo.nickname }}
                                    </span>
                                    &nbsp;回复:
                                    <span>
                                        {{ replyItem.replyUserInfo.nickname }}
                                    </span>
                                </div>
                                <div class="comment-content">
                                    {{ replyItem.content }}
                                </div>
                                <div class="reply-stat">
                                    <time class="time">
                                        {{ replyItem.createdTime | formatTime }}
                                    </time>
                                    <div
                                        class="delete cursor-pointer"
                                        v-if="currentUid === replyItem.userInfo.uid"
                                        @click="deleteCommont(replyItem.uniqueId)"
                                    >
                                        &nbsp;·&nbsp;删除
                                    </div>
                                    <div class="action">
                                        <div
                                            @click="handleLike(replyItem)"
                                            :title="replyItem.likeStatus ? '取消点赞': '点赞'"
                                            :class="replyItem.likeStatus ? 'like': ''"
                                        >
                                            <font-awesome-icon icon="heart" />
                                        </div>
                                        <div
                                            class="comment"
                                            @click="setActiveReply(replyItem)"
                                        >
                                            <font-awesome-icon icon="comment" />&nbsp;评论
                                        </div>
                                    </div>
                                </div>
                                <comment-input
                                    :type="300"
                                    button-size="mini"
                                    :target-id="targetId"
                                    :reply-user-id="activeReplyUserId"
                                    :comment-id="activeCommentId"
                                    v-if="replyItem.uniqueId === activeReply"
                                    @getComments="getComments"
                                    @closeReply="activeReply = ''"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import CommentInput from './CommentInput.vue'
    import { getCommentsApi, deleteCommentApi } from '@/api/front/comments'
    import { likeApi, dislikeApi } from '@/api/front/like'
    @Component({
        name: 'Comments',
        components: {
            CommentInput
        }
    })
    export default class Comments extends Vue {
        @Prop({default: ''}) targetId!:string

        private currentUid:string = sessionStorage.getItem('uid') as string
        private avatar:string = sessionStorage.getItem('avatar') as string
        private activeReply:string = ''
        private activeReplyUserId:string = ''
        private activeCommentId:string = ''
        private commentList:[] = []

        mounted() {
            this.getComments()
        }

        setActiveReply(item) {
            this.activeReply = item.uniqueId
            this.activeReplyUserId = item.userInfo.uid
            this.activeCommentId = item.commentId
            console.log(this.activeCommentId, this.activeReplyUserId, this.activeReply)
        }

        async handleLike(item) {
            const data:{targetId:string, type: number, replyUserId?:string} = {
                targetId: item.uniqueId,
                type: 300
            }
            let res
            if (item.likeStatus) {
                res = await dislikeApi(data)
            } else {
                data.replyUserId = item.userInfo.uid
                res = await likeApi(data)
            }
            if (res && res.status === 0) {
                this.getComments()
                this.$message.success(item.likeStatus ? '看见我四十米长的大刀没？赶紧点亮小心心': '谢谢你的点赞摸摸哒')
            }
        }

        async deleteCommont(uniqueId) {
            const data = {
                uniqueId
            }
            const res = await deleteCommentApi(data)
            if (res && res.status === 0) {
                this.getComments()
            }
        }

        async getComments() {
            const params = {
                targetId: this.targetId
            }
            const res = await getCommentsApi(params)
            if (res && res.status === 0) {
                this.commentList = res.data
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .comment-container
        background $line-grey
        padding 1.5rem
        .comment-input-wrapper
            width 100%
            margin-bottom 1rem
            display flex
            .avatar
                width 4rem
                height 4rem
                margin-right 1rem
                border-radius 50%
                border 1px solid $blue
                display inline-block
                .img
                    width 100%
                    height 100%
            .comment
                vertical-align top
                width calc(100% - 5rem)
                margin-left 1rem
                /deep/.el-input__inner
                    background rgba(255, 255, 255, .5) !important
            .action-box
                width 100%
                height 3rem
                margin-top 1rem
                padding-left 5rem
                /deep/.emoji-mart-category-label
                    display none
                .emoji-btn
                    width 5rem
                    height 100%
                    line-height 3rem
                    color $blue
                    font-size $fs-ss
                    float left
                    cursor pointer
                .submit-button
                    float right
        .comment-list
            width 100%
            margin-top 1.5rem
            padding-left 5rem
            .comment-item
                width 100%
                display flex
                &+.comment-item
                    margin-top 1.5rem
                .avatar
                    width 3.2rem
                    height 3.2rem
                    border 1px solid $blue
                    border-radius 50%
                    img
                        width 100%
                        height 100%
                &:last-child
                    .content-box
                        border-bottom none
                .content-box
                    flex 1
                    margin-left 1rem
                    padding-bottom 1rem
                    border-bottom 1px solid rgba(0,21,41,0.2)
                    .user-info
                        width 100%
                        font-size $fs-s
                        color $orange
                    .comment-content
                        width 100%
                        line-height 1.2
                        margin-top 1rem
                        font-size $fs-ss
                        color $second-text
                    .reply-stat
                        width 100%
                        margin-top 1rem
                        display flex
                        height 3rem
                        line-height 3rem
                        font-size $fs-sss
                        color $ligth-text
                        .action
                            margin-left auto
                            div
                                display inline-block
                                height 100%
                                cursor pointer
                                &:first-child
                                    margin-right 1.5rem
                .reply-comments-wrapper
                    width 100%
                    .reply-comments
                        display flex
                        width 100%
                        margin-top 1rem
                        .reply-box
                            flex 1
                            margin-left 1rem
</style>
