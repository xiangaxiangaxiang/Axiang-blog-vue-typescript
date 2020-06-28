<template>
    <div class="edit-container">
        <el-form
            label-position="left"
            label-width="80px"
            size="small"
        >
            <el-row>
                <el-row :gutter="40">
                    <el-col :span="6">
                        <el-form-item
                            label="标题"
                        >
                            <el-input
                                v-model="title"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="文章类型"
                        >
                            <el-select
                                v-model="articleType"
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
                        >
                            <el-select
                                v-model="selectLabels"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择文章标签"
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
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'MarkdownEditor'
    })
    export default class MarkdownEditor extends Vue {
        private title:string = ''
        private articleType:number = null
        private selectLabels:string[] = []
        private oldLabels:object[] = []
    }
</script>

<style lang="stylus" scoped>
    /deep/.el-form-item
        margin-bottom 1.5rem !important
    .edit-container
        padding 2rem 3rem
</style>