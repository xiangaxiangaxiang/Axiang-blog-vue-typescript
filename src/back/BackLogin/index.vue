<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-15 22:26:12
 * @LastEditTime: 2020-05-17 17:59:32
 * @Description: 后台登陆页
 * @FilePath: \axiang-blog-vue-typescript\src\back\BackLogin\index.vue
-->
<template>
    <div class="container">
        <sakura class="sakura" />
        <div class="form-container">
            <transition-group
                name="fade-transform"
                mode="out-in"
            >
                <div
                    class="login-form"
                    v-if="showLogin"
                    key="loginForm"
                >
                    <div class="title-container">
                        <h3 class="title">
                            Login
                        </h3>
                    </div>
                    <div
                        class="input-content"
                        placeholder="Account"
                        :class="accountFocus ? 'focus': ''"
                    >
                        <input
                            type="text"
                            v-model="loginForm.username"
                            @focus="accountFocus = true"
                            @blur="loginMouseBlur('account')"
                        >
                    </div>
                    <div
                        class="input-content"
                        placeholder="Password"
                        :class="passwordFocus ? 'focus': ''"
                    >
                        <input
                            type="password"
                            v-model="loginForm.password"
                            @focus="passwordFocus = true"
                            @blur="loginMouseBlur('password')"
                        >
                    </div>
                    <button class="login-btn">
                        Login
                    </button>
                    <div class="footer">
                        <span @click="showLogin = false">
                            Register
                        </span>
                    </div>
                </div>
                <div
                    class="register-form"
                    v-if="!showLogin"
                    key="registerForm"
                >
                    <div class="title-container">
                        <h3 class="title">
                            Register
                        </h3>
                    </div>
                    <div
                        class="input-content"
                        placeholder="Nickname"
                        :class="rgNicknameFocus ? 'focus': ''"
                    >
                        <input
                            type="text"
                            v-model="registerForm.nickname"
                            @focus="rgNicknameFocus = true"
                            @blur="registerMouseBlur('nickname')"
                        >
                    </div>
                    <div
                        class="input-content"
                        placeholder="Account"
                        :class="rgAccountFocus ? 'focus': ''"
                    >
                        <input
                            type="text"
                            v-model="registerForm.account"
                            @focus="rgAccountFocus = true"
                            @blur="registerMouseBlur('account')"
                        >
                    </div>
                    <div
                        class="input-content"
                        placeholder="Password"
                        :class="rgPasswordFocus ? 'focus': ''"
                    >
                        <input
                            type="password"
                            v-model="registerForm.password"
                            @focus="rgPasswordFocus = true"
                            @blur="registerMouseBlur('password')"
                            @keyup.enter.native="handleRegister"
                        >
                    </div>
                    <div
                        class="input-content"
                        placeholder="Secret"
                        :class="rgSecretFocus ? 'focus': ''"
                    >
                        <input
                            type="password"
                            v-model="registerForm.secret"
                            @focus="rgSecretFocus = true"
                            @blur="registerMouseBlur('secret')"
                            @keyup.enter.native="handleRegister"
                        >
                    </div>
                    <button
                        class="login-btn"
                        @click="handleRegister"
                    >
                        Register
                    </button>
                    <div class="footer">
                        <span @click="showLogin = true">
                            Login
                        </span>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Sakura from 'components/Sakura/index.vue'
    import { adminRegisterApi } from '@/api/back/userManage'

    type form = {
        account: string,
        password: string,
        secret ?: string,
        nickname ?: string
    }

    @Component({
        components: {
            Sakura
        }
    })
    export default class BackLogin extends Vue {
        private showLogin: boolean = true
        // 登陆
        private accountFocus: boolean = false
        private passwordFocus:boolean = false
        private loginForm = {
            account: '',
            password: ''
        }

        // 注册
        private rgAccountFocus: boolean = false
        private rgPasswordFocus:boolean = false
        private rgNicknameFocus: boolean = false
        private rgSecretFocus:boolean = false
        private registerForm = {
            account: '',
            password: '',
            nickname: '',
            secret: ''
        }

        loginMouseBlur(type:string): void {
            if (type === 'account' && this.loginForm.account === '') {
                this.accountFocus = false
            }
            if (type === 'password' && this.loginForm.password === '') {
                this.passwordFocus = false
            }
        }

        registerMouseBlur(type:string): void {
            if (type === 'account' && this.registerForm.account === '') {
                this.rgAccountFocus = false
            }
            if (type === 'password' && this.registerForm.password === '') {
                this.rgPasswordFocus = false
            }
            if (type === 'nickname' && this.registerForm.nickname === '') {
                this.rgNicknameFocus = false
            }
            if (type === 'secret' && this.registerForm.secret === '') {
                this.rgSecretFocus = false
            }
        }

        // register
        async handleRegister() {
            const result = this.validator(this.registerForm)
            if (!result.pass) {
                this.$message.error(result.msg)
                return
            }
            const res = await adminRegisterApi(this.registerForm)
            try {
                if (res.errorCode === 0) {
                    this.$message.success('注册成功')
                } else {
                    this.$message.error(res.msg)
                }
            } catch (error) {
                this.$message.error(error.msg)
            }
        }

        validator(form:form):{pass: boolean, msg : string} {
            if (form.account === '') {
                return {
                    pass: false,
                    msg: '账号不能为空'
                }
            }
            if (form.password === '') {
                return {
                    pass: false,
                    msg: '密码不能为空'
                }
            }
            if (typeof form.nickname !== 'undefined' && form.nickname === '') {
                return {
                    pass: false,
                    msg: '密码不能为空'
                }
            }
            if (typeof form.secret !== 'undefined' && form.secret === '') {
                return {
                    pass: false,
                    msg: '密令不能为空'
                }
            }
            return {pass: true, msg: 'pass'}
        }
    }
</script>
<style lang="stylus" scoped>
    .container
        min-height 65rem
        width 100vw
        height 100vh
        position relative
        .sakura
            width 100%
            height 100%
            position absolute
            left 0
            top 0
            z-index -1
        .form-container
            width 100%
            height 100%
            position absolute
            left 0
            top 0
            z-index 1
            .login-form
                height 30rem
            .register-form
                height 45rem
            .login-form,
            .register-form
                // margin 15rem auto 0
                position absolute
                top 15rem
                left 50%
                transform translateX(-50%)
                padding 1.5rem 3rem
                box-sizing border-box
                width 40rem
                background rgba(255, 255, 255, .4)
                border-radius 1rem
                .title-container
                    width 100%
                    height 6.5rem
                    text-align center
                    .title
                        width 100%
                        height 4rem
                        line-height 4rem
                        font-size $fs-lx
                        color $light-purple
                        font-weight bold
                .input-content
                    width 100%
                    height 6rem
                    position relative
                    &.focus
                        &::before
                            font-size $fs-m
                            top -20%
                    &::before
                        content attr(placeholder)
                        position absolute
                        left 0
                        top 10%
                        font-size $fs-l
                        color $purple
                        transition .3s
                        pointer-events none
                    input
                        width 100%
                        height 3rem
                        background transparent
                        border-bottom 1px solid $purple
                        outline none
                        font-size $fs-m
                        caret-color: $light-blue
                        color #6c5ce7
                .login-btn
                    border 0
                    outline 0
                    margin 0 auto
                    width 100%
                    height 3.5rem
                    border-radius 3rem
                    color white
                    background linear-gradient(90deg, rgb(181,154,254), rgb(245,189,253))
                    box-shadow 0 0 8px rgb(181,154,254)
                    cursor pointer
                .footer
                    width 100%
                    height 3rem
                    margin-top 2.5rem
                    color $purple
                    text-align right
                    span
                        display inline-block
                        width 6rem
                        font-size $fs-ss
                        cursor pointer
</style>
