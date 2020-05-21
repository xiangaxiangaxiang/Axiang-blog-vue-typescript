<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-15 22:26:12
 * @LastEditTime: 2020-05-21 22:25:21
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
                            登 录
                        </h3>
                    </div>
                    <div
                        class="input-content"
                        placeholder="账号"
                        :class="accountFocus ? 'focus': ''"
                    >
                        <input
                            type="text"
                            v-model="loginForm.account"
                            @focus="accountFocus = true"
                            @blur="loginMouseBlur('account')"
                        >
                    </div>
                    <div
                        class="input-content"
                        placeholder="密码"
                        :class="passwordFocus ? 'focus': ''"
                    >
                        <input
                            type="password"
                            v-model="loginForm.password"
                            @focus="passwordFocus = true"
                            @blur="loginMouseBlur('password')"
                            @keyup.enter="handleLogin"
                        >
                    </div>
                    <button
                        class="login-btn"
                        @click="handleLogin"
                    >
                        登 录
                    </button>
                    <div class="footer">
                        <span @click="showLogin = false">
                            注册
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
                            注 册
                        </h3>
                    </div>
                    <div
                        class="input-content"
                        placeholder="昵称"
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
                        placeholder="账号"
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
                        placeholder="密码"
                        :class="rgPasswordFocus ? 'focus': ''"
                    >
                        <input
                            type="password"
                            v-model="registerForm.password1"
                            @focus="rgPasswordFocus = true"
                            @blur="registerMouseBlur('password1')"
                            @keyup.enter="handleRegister"
                        >
                    </div>
                    <div
                        class="input-content"
                        placeholder="重复密码"
                        :class="rgRepeatFocus ? 'focus': ''"
                    >
                        <input
                            type="password"
                            v-model="registerForm.password2"
                            @focus="rgRepeatFocus = true"
                            @blur="registerMouseBlur('password2')"
                            @keyup.enter="handleRegister"
                        >
                    </div>
                    <div
                        class="input-content"
                        placeholder="密令"
                        :class="rgSecretFocus ? 'focus': ''"
                    >
                        <input
                            type="password"
                            v-model="registerForm.secret"
                            @focus="rgSecretFocus = true"
                            @blur="registerMouseBlur('secret')"
                            @keyup.enter="handleRegister"
                        >
                    </div>
                    <button
                        class="login-btn"
                        @click="handleRegister"
                    >
                        注 册
                    </button>
                    <div class="footer">
                        <span @click="showLogin = true">
                            登录
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
    import { adminRegisterApi, adminLogin } from '@/api/back/userManage'

    type form = {
        account: string,
        password?: string,
        password1?: string,
        password2?: string,
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
        private rgRepeatFocus: boolean = false
        private rgSecretFocus:boolean = false
        private registerForm = {
            account: '',
            password1: '',
            password2: '',
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
            if (type === 'password1' && this.registerForm.password1 === '') {
                this.rgPasswordFocus = false
            }
            if (type === 'password2' && this.registerForm.password2 === '') {
                this.rgRepeatFocus = false
            }
            if (type === 'nickname' && this.registerForm.nickname === '') {
                this.rgNicknameFocus = false
            }
            if (type === 'secret' && this.registerForm.secret === '') {
                this.rgSecretFocus = false
            }
        }

        async handleLogin() {
            const result = this.validator(this.loginForm)
            if (!result.pass) {
                this.$message.error(result.msg)
                return
            }
            const res = await adminLogin(this.loginForm)
            console.log(res)
            // try {
            //     if (res.errorCode === 0) {
            //         this.$message.success('登陆成功')
            //     } else {
            //         this.$message.error(res.msg)
            //     }
            // } catch (error) {
            //     console.log(error)
            // }
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

        /**
         * @description: 插个眼，以后回来补充重写验证器，这样硬来太笨比了
         * @param {type}
         * @return:
         */
        validator(form:form):{pass: boolean, msg : string} {
            if (typeof form.nickname !== 'undefined' && form.nickname === '') {
                return {
                    pass: false,
                    msg: '昵称不能为空'
                }
            }
            if (form.account === '') {
                return {
                    pass: false,
                    msg: '账号不能为空'
                }
            }
            if (typeof form.password !== 'undefined' && form.password === '') {
                return {
                    pass: false,
                    msg: '密码不能为空'
                }
            }
            if (typeof form.password1 !== 'undefined' && form.password1 === '') {
                return {
                    pass: false,
                    msg: '密码不能为空'
                }
            }
            if (typeof form.password2 !== 'undefined' && form.password2 === '') {
                return {
                    pass: false,
                    msg: '密码不能为空'
                }
            }
            if (form.password2 !== form.password1) {
                return {
                    pass: false,
                    msg: '两次输入的密码不一致'
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
                height 48rem
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
