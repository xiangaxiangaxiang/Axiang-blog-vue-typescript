/*
 * @Author: your name
 * @Date: 2020-07-14 21:06:42
 * @LastEditTime: 2020-08-17 21:34:32
 * @LastEditors: Please set LastEditors
 * @Description: 用户接口
 * @FilePath: \axiang-blog-vue-typescript\src\api\front\user.ts
 */
import service from '../index'

export function updateAccountApi(data) {
    return service({
        url: '/front/user/update',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export function updatePasswordApi(data) {
    return service({
        url: '/front/user/password',
        method: 'post',
        data
    })
}

export function userLoginApi(data) {
    return service({
        url: '/front/user/login',
        method: 'post',
        data
    })
}

export function userRegisterApi(data) {
    return service({
        url: '/front/user/register',
        method: 'post',
        data
    })
}

export function touristApi() {
    return service({
        url: '/front/user/tourist',
        method: 'get'
    })
}

export function logoutApi() {
    return service({
        url: '/front/user/logout',
        method: 'post'
    })
}