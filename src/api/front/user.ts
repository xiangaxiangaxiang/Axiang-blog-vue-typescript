/*
 * @Author: your name
 * @Date: 2020-07-14 21:06:42
 * @LastEditTime: 2020-07-14 22:36:53
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