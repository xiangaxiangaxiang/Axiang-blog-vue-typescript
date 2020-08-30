<template>
    <div class="comment-input">
        <el-input
            v-model="comment"
            class="comment"
            @blur="checkEmpty"
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
                    :size="buttonSize"
                    @click="submitComment()"
                >
                    评论
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { Picker } from 'emoji-mart-vue'
    import {submitCommentApi} from '@/api/front/comments'
    @Component({
        name: 'CommentInput',
        components: {
            Picker
        }
    })
    export default class CommentInput extends Vue {
        @Prop({default: 'small'}) buttonSize!:string
        @Prop({default: ''}) targetId!:string
        @Prop({default: 100}) type!:number
        @Prop({default: ''}) commentId!:string
        @Prop({default: ''}) replyUserId!:string

        private comment:string = ''
        private showEmojiSelect:boolean = false

        @Watch('showEmojiSelect')
        changeShowEmojiSelect(newValue) {
            if (newValue) {
                document.body.addEventListener('click', this.showEmojiEventListener, false)
            } else {
                document.body.removeEventListener('click', this.showEmojiEventListener, false)
            }
        }

        checkEmpty() {
            if (this.comment.trim() === '') {
                this.$emit('closeReply')
            }
        }

        showEmojiEventListener() {
            this.showEmojiSelect = false
        }

        addEmoji(e) {
            this.comment += e.native
            this.showEmojiSelect = false
        }

        async submitComment() {
            if (this.comment.trim() === '') {
                this.$message.error('请输入评论')
                return
            }
            const data = {
                type: this.type,
                targetId: this.targetId,
                content: this.comment,
                commentId: this.commentId !== '' ? this.commentId : null,
                replyUserId: this.replyUserId !== '' ? this.replyUserId : null
            }
            const res = await submitCommentApi(data)
            if (res && res.status === 0) {
                this.$message.success('评论成功')
                this.comment = ''
                this.checkEmpty()
                if (res.data) {
                    this.$emit('addComment', res.data)
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .comment
        vertical-align top
        width 100%
        /deep/.el-input__inner
            background rgba(255, 255, 255, .5) !important
    .action-box
        width 100%
        height 3rem
        margin-top 1rem
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
</style>
