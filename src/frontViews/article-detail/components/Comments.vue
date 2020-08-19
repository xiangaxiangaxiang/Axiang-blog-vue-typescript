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
        private showEmojiSelect:boolean = false

        @Watch('showEmojiSelect')
        changeShowEmojiSelect(newValue) {
            if (newValue) {
                document.body.addEventListener('click', this.showEmojiEventListener, false)
            } else {
                document.body.removeEventListener('click', this.showEmojiEventListener, false)
            }
        }

        showEmojiEventListener(e) {
            this.showEmojiSelect = false
        }

        async submitCommont(type, targetId=this.targetId) {
            const data = {
                type,
                targetId: targetId
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
        padding 2rem
        .comment-input
            width 100%
            padding 1rem
            margin-bottom 1rem
            background $line-grey
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
