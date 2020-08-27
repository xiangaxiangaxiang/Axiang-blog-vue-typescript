/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-17 17:14:42
 * @LastEditTime: 2020-05-19 22:05:50
 * @Description: 后端用户Api
 * @FilePath: \axiang-blog-vue-typescript\src\api\back\userManage.ts
 */
import service from '../index'

export function adminRegisterApi(data) {
    return service({
        url: '/back/user/admin_register',
        method: 'post',
        data
    })
}

export function adminLogin(data) {
    return service({
        url: '/back/user/admin_login',
        method: 'post',
        data
    })
}

export function getUserListApi(params) {
    return service({
        url: '/back/user/',
        method: 'get',
        params
    })
}

export function disableUserApi(data) {
    return service({
        url: '/back/user/disable',
        method: 'post',
        data
    })
}

export function enableUserApi(data) {
    return service({
        url: '/back/user/enable',
        method: 'post',
        data
    })
}

export function userLogoutApi() {
    return service({
        url: '/back/user/logout',
        method: 'post'
    })
}
