<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-15 22:26:12
 * @LastEditTime: 2020-05-15 23:00:51
 * @Description: 后台登陆页
 * @FilePath: \axiang-blog-vue-typescript\src\back\BackLogin\index.vue
-->
<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">
                    登录
                </h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                    <font-awesome-icon icon="user" />
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <font-awesome-icon icon="lock" />
                </span>
                <el-input
                    ref="password"
                    v-model="loginForm.password"
                    placeholder="Password"
                    name="password"
                    type="password"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class BackLogin extends Vue {
    }
</script>
<style lang="stylus" scoped>
    @import '../../common/stylus/variables.styl';
    .login-container
        width 100vw
        height 100vh
        display flex
        justify-content center
        align-items center
        background $loginBg
        .login-card
            width 40rem
            height 30rem
            background #fff
            border-radius 1rem
</style>