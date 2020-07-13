<template>
    <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            <el-avatar
                :size="30"
                :src="avatar"
            />
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="updateAccount">
                修改账号信息
            </el-dropdown-item>
            <el-dropdown-item command="logout">
                登出
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'AccountDropdown'
    })
    export default class TopNav extends Vue {
        private avatar:string = 'https://upload.jianshu.io/users/upload_avatars/15469903/fa209adb-0bda-44e5-b61f-cc2b7c0ee202.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120'

        handleCommand(command) {
            if (command === 'logout') {
                sessionStorage.clear()
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>