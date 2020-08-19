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
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
    import { Picker } from 'emoji-mart-vue'
    import { submitCommontApi, getCommontsApi } from '@/api/front/commonts'
    @Component({
        name: 'Comments',
        components: {
            Picker
        }
    })
    export default class Comments extends Vue {
        @Prop({default: ''}) targetId!:string
        private avatar:string = sessionStorage.getItem('avatar') as string
        private comment:string = ''
        private replyComment:string = ''
        private showEmojiSelect:boolean = false

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
            this.getCommonts()
        }

        async getCommonts() {
            const params = {
                targetId: this.targetId
            }
            const res = await getCommontsApi(params)
            if (res && res.status === 0) {
                console.log(res)
            }
        }

        async submitCommont(type:number, targetId:string=this.targetId, replyUserId:string='', commentId:string='') {
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
            const res = await submitCommontApi(data)
            if (res && res.status === 0) {
                console.log(res)
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
        .comment-input
            width 100%
            padding 1rem
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
