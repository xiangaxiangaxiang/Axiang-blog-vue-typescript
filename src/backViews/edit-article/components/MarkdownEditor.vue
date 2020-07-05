<template>
    <div class="edit-container">
        <el-form
            label-position="left"
            label-width="80px"
            size="small"
            :rules="rules"
            ref="articleForm"
            :model="articleForm"
        >
            <el-row>
                <el-row :gutter="40">
                    <el-col :span="6">
                        <el-form-item
                            label="标题"
                            prop="title"
                        >
                            <el-input v-model="articleForm.title" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="文章类型"
                            prop="articleType"
                        >
                            <el-select
                                v-model="articleForm.articleType"
                                placeholder="请选择文章类型"
                            >
                                <el-option
                                    label="技术"
                                    :value="100"
                                />
                                <el-option
                                    label="生活"
                                    :value="200"
                                />
                                <el-option
                                    label="梦想"
                                    :value="300"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="标签"
                            prop="selectLabels"
                        >
                            <el-select
                                v-model="articleForm.selectLabels"
                                multiple
                                filterable
                                :multiple-limit="3"
                                allow-create
                                default-first-option
                                placeholder="请选择文章标签"
                                style="width: 30rem;"
                            >
                                <el-option
                                    v-for="item in oldLabels"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
        </el-form>
        <div class="markdown-wrapper">
            <mavon-editor
                v-model="markdown"
                style="height: 100%;"
                font-size="2rem"
                :tab-size="4"
                ref="md"
                @imgAdd="$imgAdd"
                @imgDel="$imgDel"
                @change="markdownChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { uploadImgApi, addArticleApi } from '@/api/back/article'
    @Component({
        name: 'MarkdownEditor'
    })
    export default class MarkdownEditor extends Vue {
        $refs!: {md: HTMLFormElement}

        @Prop({default: false}) toggleUpload !:boolean
        @Prop({default: ''}) uploadType !:boolean

        private articleForm:{title: string, articleType: number | null, selectLabels: string[]} = {
            title: '',
            articleType: null,
            selectLabels: []
        }
        private oldLabels:object[] = []
        private rules:{title: object[], articleType: object[], selectLabels: object[]} = {
            title: [
                { required: true, message: '请输入文章标题', trigger: 'blur' },
                { min: 1, max: 50, message: '长度在50个字符以内', trigger: 'blur' }
            ],
            articleType: [
                { required: true, message: '请选择文章类型', trigger: 'change' }
            ],
            selectLabels: [
                { required: true, message: '请选择文章标签', trigger: 'change' }
            ]
        }

        private html: string = ''
        private markdown: string = ''
        private imgFile:object = {}

        @Watch('toggleUpload')
        toggleUploadArticle() {
            this.uploadImage()
        }

        $imgAdd(pos, $file){
            // 缓存图片信息
            this.imgFile[pos] = $file
        }

        $imgDel(pos){
            delete this.imgFile[pos]
        }

        markdownChange(value, render) {
            console.log()
            this.html = render
        }

        async uploadImage() {
            if (Object.keys(this.imgFile).length) {
                let formdata = new FormData();
                for (var _img in this.imgFile) {
                    formdata.append(_img, this.imgFile[_img]);
                }
                const res = await uploadImgApi(formdata)
                if (res.status === 0) {
                    const data = res.data
                    data.forEach(item => {
                        this.$refs.md.$img2Url(item[0], item[1])
                    })
                }
            }
            this.uploadArticle()
        }

        uploadArticle() {
            this.$refs['articleForm'].validate(async (valid) => {
                if (valid) {
                    if (this.markdown.trim() === '') {
                        this.$message.success('文章内容不能为空')
                        return
                    }
                    const data = {
                        title: this.articleForm.title,
                        articleType: this.articleForm.articleType,
                        labels: JSON.stringify(this.articleForm.selectLabels),
                        html: this.html,
                        markdown: this.markdown,
                        content: this.getContent(),
                        publish: 0
                    }
                    const res = await addArticleApi(data)
                    if (res.status === 0) {
                        this.$message.success('保存成功')
                    }
                } else {
                    return false;
                }
            })
        }

        getContent() {
            const content = this.markdown.replace(/#*.*#/g, '').replace(/[^a-z0-9\u4e00-\u9fa5]/, '').substring(0, 200)
            return `${content}...`
        }
    }
</script>

<style lang="stylus" scoped>
    /deep/.el-form-item
        margin-bottom 1.5rem !important
    .edit-container
        padding 2rem 3rem
        .markdown-wrapper
            width 100%
            height calc(100vh - 14rem)
</style>