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
            :model="loginForm"
            v-if="showType === 'login'"
            :rules="loginRules"
            ref="loginFormComponent"
            :key="loginFormKey"
        >
            <el-form-item prop="account">
                <el-input
                    v-model="loginForm.account"
                    placeholder="请输入账号"
                    @keyup.enter.native="loginSubmit"
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    type="password"
                    @keyup.enter.native="loginSubmit"
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
            :model="registerForm"
            v-else
            :rules="registerRules"
            ref="registerFormComponent"
            :key="registerFormKey"
        >
            <el-form-item prop="nickname">
                <el-input
                    v-model="registerForm.nickname"
                    placeholder="请输入用户昵称"
                    @keyup.enter.native="registerSubmit"
                />
            </el-form-item>
            <el-form-item prop="account">
                <el-input
                    v-model="registerForm.account"
                    placeholder="请输入用户名"
                    @keyup.enter.native="registerSubmit"
                />
            </el-form-item>
            <el-form-item prop="password1">
                <el-input
                    v-model="registerForm.password1"
                    type="password"
                    placeholder="请输入密码"
                    @keyup.enter.native="registerSubmit"
                />
            </el-form-item>
            <el-form-item prop="password2">
                <el-input
                    v-model="registerForm.password2"
                    type="password"
                    placeholder="请再次输入密码"
                    @keyup.enter.native="registerSubmit"
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
    import { userLoginApi, userRegisterApi } from '@/api/front/user'
    import { resetRouter } from '@/router/index'
    import md5 from 'md5'

    interface loginRulesType {
        account: object[]
        password: object[]
    }
    interface loginFormType {
        account: string
        password:string
    }
    interface registerFormType {
        account: string
        password1: string
        password2: string
        nickname: string
    }
    interface registerRulesType {
        account: object[]
        password1: object[]
        password2: object[]
        nickname: object[]
    }

    @Component({
        name: 'LoginRegisterForm'
    })
    export default class LoginRegisterForm extends Vue {
        $refs!: {md: HTMLFormElement}

        @Prop({default: false}) dialogVisable!:boolean
        @Prop({default: ''}) type!:string

        private showType: string = 'login'
        private loginForm:loginFormType = {
            account: '',
            password: ''
        }
        private registerForm:registerFormType = {
            account: '',
            password1: '',
            password2: '',
            nickname: ''
        }
        public validatePass2 = (rule, value, callback) => {
            if (value === '') {
                // eslint-disable-next-line
                callback(new Error('请再次输入密码'))
                // eslint-disable-next-line
            } else if (value !== this.registerForm.password1) {
                // eslint-disable-next-line
                callback(new Error('两次输入密码不一致!'))
            } else {
                // eslint-disable-next-line
                callback()
            }
        }
        private loginRules:loginRulesType = {
            account: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 6, max: 16, message: '长度在6~16个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ]
        }
        private registerRules:registerRulesType = {
            account: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 6, max: 16, message: '长度在6~16个字符', trigger: 'blur' }
            ],
            password1: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ],
            password2: [
                // eslint-disable-next-line
                { validator: this.validatePass2, trigger: 'blur' },
                { min: 6, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ],
            nickname: [
                { required: true, message: '请输入用户昵称', trigger: 'blur' },
                { min: 2, max: 32, message: '长度在6~32个字符', trigger: 'blur' }
            ]
        }
        private loginFormKey:number = Date.now()
        private registerFormKey:number = Date.now()

        @Watch('type')
        changeType() {
            this.showType = this.type
        }

        closeDialog() {
            UserModule.toggleDialog(this.showType)
        }

        loginSubmit() {
            this.$refs['loginFormComponent'].validate(async (valid) => {
                if (valid) {
                    const data = {
                        account: this.loginForm.account,
                        password: md5(this.loginForm.password)
                    }
                    let res = await userLoginApi(data)
                    if (res && res.status === 0) {
                        this.$message.success('登录成功')
                        sessionStorage.setItem('uid', res.data.uid)
                        sessionStorage.setItem('nickname', res.data.nickname)
                        sessionStorage.setItem('avatar', res.data.avatar)
                        sessionStorage.setItem('token', res.data.token)
                        sessionStorage.setItem('isLogin', 'true')
                        this.$router.go(0)
                    }
                } else {
                    return false
                }
            })
        }

        registerSubmit() {
            this.$refs['registerFormComponent'].validate(async (valid) => {
                if (valid) {
                    const data = {
                        account: this.registerForm.account,
                        password1: md5(this.registerForm.password1),
                        password2: md5(this.registerForm.password2),
                        nickname: this.registerForm.nickname
                    }
                    let res = await userRegisterApi(data)
                    if (res && res.status === 0) {
                        this.$message.success('注册成功')
                        this.changeForm()
                    }
                } else {
                    return false
                }
            })
        }

        changeForm() {
            // 在这里报错
            // this.registerForm = this.$option.data().registerForm
            // this.loginForm = this.$option.data().loginForm
            this.loginForm = {
                account: '',
                password: ''
            }
            this.registerForm = {
                account: '',
                password1: '',
                password2: '',
                nickname: ''
            }
            this.showType = this.showType === 'login' ? 'register' : 'login'
            this.loginFormKey = Date.now()
            this.registerFormKey = Date.now()
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
            user-select none
    /deep/.el-dialog__body
        padding 2rem 2rem
</style>