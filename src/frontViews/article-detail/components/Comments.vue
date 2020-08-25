<template>
    <div class="comment-container">
        <div class="comment-input">
            <div class="avatar">
                <img
                    v-if="avatar"
                    :src="avatar"
                    alt="加载错误"
                >
            </div>
            <el-input
                v-model="comment"
                class="comment"
            />
            <div
                class="action-box clearfix"
                @click.stop
            >
                <div
                    class="emoji-btn"
                    @click="showEmojiSelect=!showEmojiSelect"
                >
                    <span>
                        表情
                    </span>
                    <font-awesome-icon icon="smile" />
                    <picker
                        :include="['people']"
                        :show-search="false"
                        :show-preview="false"
                        :show-categories="false"
                        @select="addEmoji"
                        v-show="showEmojiSelect"
                        @click.stop.native
                    />
                </div>
                <div class="submit-button">
                    <el-button
                        type="primary"
                        size="small"
                        @click="submitCommont(100)"
                    >
                        评论
                    </el-button>
                </div>
            </div>
        </div>
        <div class="comment-list">
            <div
                class="comment-item clearfix"
                v-for="item in commentList"
                :key="item.uniqueId"
            >
                <div class="avatar">
                    <img
                        src="item.userAvatar"
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
                            <div class="comment">
                                <font-awesome-icon icon="comment" />&nbsp;评论
                            </div>
                        </div>
                    </div>
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
                                    src="replyItem.userAvatar"
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
                                            :title="item.likeStatus ? '取消点赞': '点赞'"
                                            :class="item.likeStatus ? 'like': ''"
                                        >
                                            <font-awesome-icon icon="heart" />
                                        </div>
                                        <div class="comment">
                                            <font-awesome-icon icon="comment" />&nbsp;评论
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
    import { Picker } from 'emoji-mart-vue'
    import { submitCommentApi, getCommentsApi, deleteCommentApi } from '@/api/front/comments'
    import { likeApi, dislikeApi } from '@/api/front/like'
    @Component({
        name: 'Comments',
        components: {
            Picker
        }
    })
    export default class Comments extends Vue {
        @Prop({default: ''}) targetId!:string
        private currentUid:string = sessionStorage.getItem('uid') as string
        private avatar:string = sessionStorage.getItem('avatar') as string
        private comment:string = ''
        private replyComment:string = ''
        private showEmojiSelect:boolean = false
        private commentList:[] = []

        @Watch('showEmojiSelect')
        changeShowEmojiSelect(newValue) {
            if (newValue) {
                document.body.addEventListener('click', this.showEmojiEventListener, false)
            } else {
                document.body.removeEventListener('click', this.showEmojiEventListener, false)
            }
        }

        showEmojiEventListener() {
            this.showEmojiSelect = false
        }

        mounted() {
            this.getComments()
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

        async submitComment(type:number, targetId:string=this.targetId, replyUserId:string='', commentId:string='') {
            if (this.comment.trim() === '' && this.replyComment.trim() === '') {
                this.$message.error('请输入评论')
                return
            }
            const data = {
                type,
                targetId: targetId,
                content: replyUserId === '' ? this.comment : this.replyComment,
                commentId: commentId !== '' ? commentId : null,
                replyUserId: replyUserId !== '' ? replyUserId : null
            }
            const res = await submitCommentApi(data)
            if (res && res.status === 0) {
                this.$message.success('评论成功')
                this.getComments()
            }
        }

        addEmoji(e) {
            this.comment += e.native
            this.showEmojiSelect = false
        }
    }
</script>

<style lang="stylus" scoped>
    .comment-container
        background $line-grey
        padding 1.5rem
        .comment-input
            width 100%
            margin-bottom 1rem
            .avatar
                width 4rem
                height 4rem
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
