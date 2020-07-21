<template>
    <el-dialog
        width="350px"
        :visible="dialogVisable"
        :modal-append-to-body="false"
        :before-close="closeDialog"
    >
        <h1
            slot="title"
            class="title"
        >
            {{ showType === 'login' ? '登陆' : '注册' }}
        </h1>
        <el-form
            size="small"
            v-model="loginForm"
            v-if="showType === 'login'"
            :rules="loginRules"
            ref="loginForm"
        >
            <el-form-item prop="account">
                <el-input
                    v-model="loginForm.account"
                    placeholder="请输入账号"
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="loginSubmit"
                    style="width: 100%;"
                >
                    登陆
                </el-button>
            </el-form-item>
        </el-form>
        <el-form
            size="small"
            v-model="registerForm"
            v-else
            :rules="registerRules"
            ref="registerForm"
        >
            <el-form-item prop="nickname">
                <el-input
                    v-model="registerForm.nickname"
                    placeholder="请输入用户昵称"
                />
            </el-form-item>
            <el-form-item prop="account">
                <el-input
                    v-model="registerForm.account"
                    placeholder="请输入用户名"
                />
            </el-form-item>
            <el-form-item prop="password1">
                <el-input
                    v-model="registerForm.password1"
                    placeholder="请输入密码"
                />
            </el-form-item>
            <el-form-item prop="password2">
                <el-input
                    v-model="registerForm.password2"
                    placeholder="请再次输入密码"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="registerSubmit"
                    style="width: 100%;"
                >
                    注册
                </el-button>
            </el-form-item>
        </el-form>
        <div class="change">
            <span
                class="cursor_pointer"
                @click="changeForm"
            >
                {{ showType === 'login' ? '注册' : '登陆' }}
            </span>
        </div>
    </el-dialog>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import { UserModule } from '@/store/modules/user'
    @Component({
        name: 'LoginRegisterForm'
    })
    export default class LoginRegisterForm extends Vue {
        @Prop({default: false}) dialogVisable!:boolean
        @Prop({default: ''}) type!:string

        private showType: string = 'login'

        private loginForm: {account: string, password:string} = {
            account: '',
            password: ''
        }
        private registerForm: {account: string, password1: string, password2: string, nickname: string} = {
            account: '',
            password1: '',
            password2: '',
            nickname: ''
        }
        private loginRules:{account: object[], password: object[]} = {
            account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 6, max: 16, message: '长度在6~16个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'change' },
                { min: 6, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ]
        }
        private registerRules:{account: object[], password1: object[], password2: object[], nickname: object[]} = {
            account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 6, max: 16, message: '长度在6~16个字符', trigger: 'blur' }
            ],
            password1: [
                { required: true, message: '请输入密码', trigger: 'change' },
                { min: 6, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ],
            password2: [
                { required: true, message: '请输入密码', trigger: 'change' },
                { min: 6, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ],
            nickname: [
                { required: true, message: '请输入密码', trigger: 'change' },
                { min: 6, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ]
        }

        @Watch('type')
        changeType() {
            this.showType = this.type
        }

        closeDialog() {
            UserModule.toggleDialog(this.showType)
        }

        loginSubmit() {}

        registerSubmit() {}

        changeForm() {
            this.showType = this.showType === 'login' ? 'register' : 'login'
        }
    }
</script>

<style lang="stylus" scoped>
    .title
        width 100%
        height 3rem
        line-height 3rem
        font-size $fs-m
        text-align center
        color $deep-text
        font-weight bold
    .change
        padding-right 1rem
        width 100%
        height 2.5rem
        line-height 2.5rem
        text-align right
        span
            cursor pointer
            color $blue
    /deep/.el-dialog__body
        padding 2rem 2rem
</style>