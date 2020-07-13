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
                    翔阿翔阿翔
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
            :visible="updateAccountDialog"
            title="修改用户信息"
            width="50rem"
            :modal-append-to-body="false"
        >
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
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { resetRouter } from '@/router/index'
    @Component({
        name: 'AccountDropdown'
    })
    export default class TopNav extends Vue {
        private avatar:string = 'https://upload.jianshu.io/users/upload_avatars/15469903/fa209adb-0bda-44e5-b61f-cc2b7c0ee202.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120'
        private updateAccountDialog:boolean = false
        private updateForm:object = {
            nickname: ''
        }

        handleCommand(command) {
            if (command === 'logout') {
                sessionStorage.clear()
                resetRouter()
            } else if (command === 'updateAccount') {
                this.updateAccountDialog = true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    /deep/.el-dropdown-menu__item.is-disabled
        color $blue
</style>