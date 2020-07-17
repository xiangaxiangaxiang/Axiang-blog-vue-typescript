<!--
 * @Author: 翔阿翔阿翔
 * @Date: 2020-06-14 14:13:00
 * @LastEditTime: 2020-07-17 22:00:44
 * @Description: 用户列表
 * @FilePath: \axiang-blog-vue-typescript\src\back\user\components\UserList.vue
-->
<template>
    <div class="user-list">
        <el-table
            :data="userList"
            border
            style="width: 100%"
            v-loading="loading"
            height="calc(100vh - 17.5rem)"
        >
            <el-table-column
                width="50"
                label="#"
                align="center"
            >
                <template slot-scope="{$index}">
                    <span>
                        {{ $index + 1 }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="账号"
                prop="account"
                class-name="text-bold"
            />
            <el-table-column
                label="用户名"
            >
                <template slot-scope="{row}">
                    <el-avatar
                        shape="square"
                        :size="32"
                        :src="row.avatar"
                        class="avatar"
                    />
                    <span>
                        {{ row.nickname }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="用户类型"
            >
                <template slot-scope="{row}">
                    <span
                        class="text-bold"
                        :class="getUserTypeClass(row.userType)"
                    >
                        {{ getUserType(row.userType) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="80"
                align="center"
            >
                <template slot-scope="{row}">
                    <span :class="row.enable === 1 ? 'color-green' : 'color-red'">
                        {{ row.enable === 1 ? '启用' : '停用' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100"
                align="center"
            >
                <template slot-scope="{row}">
                    <el-button
                        size="mini"
                        :type="row.enable === 1 ? 'danger' : 'success'"
                        @click="changeEnable(row)"
                    >
                        {{ row.enable === 1 ? '停用' : '启用' }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { disableUserApi, enableUserApi } from '@/api/back/userManage'
    @Component({
        name: 'UserList'
    })
    export default class UserList extends Vue {
        @Prop({default: () => []}) userList !:object[]
        @Prop({default: false}) loading !:boolean

        getUserType(type) {
            if (type === 200) {
                return '管理员'
            } else if (type === 100) {
                return '普通用户'
            }
            return '游客'
        }

        getUserTypeClass(type) {
            if (type === 200) {
                return 'color-orange'
            } else if (type === 100) {
                return 'color-blue'
            }
            return ''
        }

        async changeEnable(row) {
            const data = {
                uid: row.uid
            }
            let res
            if (row.enable === 1) {
                res = await disableUserApi(data)
            } else {
                res = await enableUserApi(data)
            }
            if (res.status === 0) {
                this.$emit('reload-data')
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .avatar
        display inline-block
        &+span
            display inline-block
            vertical-align top
            height 3.2rem
            line-height 3.2rem
            margin-left 1rem
</style>