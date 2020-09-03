<template>
    <div>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <el-avatar
                    :size="30"
                    :src="avatar"
                />
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>
                    {{ nickname }}
                </el-dropdown-item>
                <el-dropdown-item
                    divided
                    command="updateAccount"
                >
                    修改账号信息
                </el-dropdown-item>
                <el-dropdown-item
                    command="updatePassword"
                >
                    修改密码
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                    登出
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
            :visible.sync="updatePasswordDialog"
            title="修改密码信息"
            width="50rem"
            :modal-append-to-body="false"
        >
            <el-form
                :model="updatePasswordForm"
                size="small"
                :rules="rules"
                ref="updatePasswordForm"
                label-position="left"
                label-width="80px"
            >
                <el-form-item
                    label="旧密码"
                    prop="oldPassword"
                >
                    <el-input
                        type="password"
                        v-model="updatePasswordForm.oldPassword"
                    />
                </el-form-item>
                <el-form-item
                    label="新密码"
                    prop="password1"
                >
                    <el-input
                        type="password"
                        v-model="updatePasswordForm.password1"
                    />
                </el-form-item>
                <el-form-item
                    label="重复密码"
                    prop="password2"
                >
                    <el-input
                        type="password"
                        v-model="updatePasswordForm.password2"
                    />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button
                    size="mini"
                    @click="updatePasswordDialog=false"
                >
                    关闭
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="updatePassword"
                >
                    确认
                </el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="updateAccountDialog"
            title="修改用户信息"
            width="50rem"
            :modal-append-to-body="false"
        >
            <input
                type="file"
                ref="avatarInput"
                style="visibility: hidden;height: 0;"
                @change="imageUpload"
            >
            <div class="avatar">
                <div
                    class="avatar-wrapper"
                    @click="getAvatarFile"
                >
                    <el-avatar
                        :size="110"
                        :src="avatar"
                        class="el-avatar"
                    />
                    <p>点击头像上传</p>
                </div>
            </div>
            <el-form
                :model="updateForm"
                size="small"
                @keyup.prevent
            >
                <el-form-item
                    label="昵称"
                    prop="nickname"
                >
                    <el-input v-model="updateForm.nickname" />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button
                    size="mini"
                    @click="updateAccountDialog=false"
                >
                    关闭
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="updateNickname"
                >
                    保存
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { updateAccountApi, updatePasswordApi, logoutApi } from '@/api/front/user'
    import md5 from 'md5'

    interface updatePasswordFormType {
        oldPassword:string
        password1:string
        password2:string
    }

    interface rulesType {
        oldPassword: object[]
        password1: object[]
        password2: object[]
    }

    @Component({
        name: 'AccountDropdown'
    })
    export default class TopNav extends Vue {
        $refs!: {avatarInput: HTMLFormElement}
        // 基本信息
        private uid:string = sessionStorage.getItem('uid') || ''
        private nickname:string = sessionStorage.getItem('nickname') || ''
        private avatar:string = sessionStorage.getItem('avatar') || ''
        // 更新信息
        private updateAccountDialog:boolean = false
        private updateForm:{nickname:string} = {
            nickname: sessionStorage.getItem('nickname') || ''
        }
        private imageUrl:string = ''
        // 更新密码
        private updatePasswordDialog:boolean = false
        private updatePasswordForm: updatePasswordFormType = {
            oldPassword: '',
            password1: '',
            password2: ''
        }

        private rules:rulesType = {
            oldPassword: [
                { required: true, message: '请输入旧密码', trigger: 'blur' }
            ],
            password1: [
                { required: true, message: '请输入新密码', trigger: 'change' }
            ],
            password2: [
                { required: true, message: '请输入重复密码', trigger: 'change' }
            ]
        }

        async handleCommand(command) {
            if (command === 'logout') {
                await logoutApi()
                sessionStorage.clear()
                this.$router.go(0)
            } else if (command === 'updateAccount') {
                this.updateAccountDialog = true
            } else if (command === 'updatePassword') {
                this.updatePasswordDialog = true
            }
        }

        getAvatarFile() {
            this.$refs.avatarInput.dispatchEvent(new MouseEvent('click'))
        }

        updatePassword() {
            this.$refs['updatePasswordForm'].validate(async (valid) => {
                if (valid) {
                    if (this.updatePasswordForm.password1 !== this.updatePasswordForm.password2) {
                        this.$message.error('两次输入的密码不正确')
                    }
                    const data = {
                        uid: this.uid,
                        oldPassword: md5(this.updatePasswordForm.oldPassword),
                        password1: md5(this.updatePasswordForm.password1),
                        password2: md5(this.updatePasswordForm.password2)
                    }
                    const res = await updatePasswordApi(data)
                    if (res && res.status === 0) {
                        this.$message.success('修改成功')
                        this.updatePasswordDialog = false
                    }
                }
            })
        }

        async updateNickname() {
            if (this.updateForm.nickname.trim() === '') {
                this.$message.error('昵称不能为空')
            }
            const formdata = new FormData()
            formdata.append('nickname', this.updateForm.nickname)
            formdata.append('uid', this.uid as string)
            const res = await updateAccountApi(formdata)
            if (res && res.status === 0) {
                this.$message.success('修改成功')
                sessionStorage.setItem('nickname', res.data.nickname)
            }
        }

        async imageUpload() {
            const avatar = this.$refs.avatarInput.files[0]
            if (!avatar.type.startsWith('image')) {
                this.$message.error('只接受图片文件')
                return
            }
            const formdata = new FormData()
            formdata.append('file', avatar)
            formdata.append('uid', this.uid as string)
            const res = await updateAccountApi(formdata)
            this.$refs.avatarInput.value = null
            if (res && res.status === 0) {
                this.$message.success('修改成功')
                sessionStorage.setItem('avatar', res.data.avatar)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    /deep/.el-dropdown-menu__item.is-disabled
        color $blue
    .avatar
        width 100%
        height 12rem
        display flex
        justify-content center
        align-items center
        .avatar-wrapper
            width 11rem
            height 11rem
            position relative
            cursor pointer
            p
                position absolute
                bottom 0
                left 0
                width 100%
                height 2.5rem
                line-height 2.1rem
                font-size 1rem
                background rgba(255, 255, 255, .7)
                text-align center
                color black
</style>
