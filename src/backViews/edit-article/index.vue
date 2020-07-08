<template>
    <div>
        <div class="top-bar">
            <div class="title text-bold">
                编辑文章
            </div>
            <div class="func-btn">
                <el-button
                    type="primary"
                    size="small"
                    @click="quitEditing"
                >
                    退出
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    @click="toggleUpload = !toggleUpload"
                >
                    保存
                </el-button>
                <el-button
                    type="success"
                    size="small"
                    @click="togglePublish = !togglePublish"
                >
                    发布
                </el-button>
            </div>
        </div>
        <markdown-editor
            :toggle-publish="togglePublish"
            :toggle-upload="toggleUpload"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import MarkdownEditor from './components/MarkdownEditor.vue'
    @Component({
        name: 'EditArticle',
        components: {
            MarkdownEditor
        }
    })
    export default class EditArticle extends Vue {
        private toggleUpload:boolean = false
        private togglePublish:boolean = false

        beforeRouteEnter (to, from, next) {
            if (from.name === 'ArticleManagement' || from.path === '/') {
                // eslint-disable-next-line
                next()
            } else {
                // eslint-disable-next-line
                next(from.path)
            }
        }

        quitEditing() {
            this.$confirm('本页面数据将会清空，请确认是否已保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push('/admin/article/manage')
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .top-bar
        width 100%
        height 5rem
        padding 0 3rem
        box-shadow 0 1px 4px rgba(0,21,41,.08)
        .title
            width 10rem
            height 100%
            line-height 5rem
            float left
            font-size $fs-s
            color $blue
        .func-btn
            width 20rem
            height 100%
            line-height 5rem
            float right
</style>