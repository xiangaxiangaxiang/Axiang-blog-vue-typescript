/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-17 17:14:42
 * @LastEditTime: 2020-05-19 22:05:50
 * @Description: 后端用户Api
 * @FilePath: \axiang-blog-vue-typescript\src\api\back\userManage.ts
 */
import service from '../index'

service.defaults.baseURL = '/back/user'

export function adminRegisterApi(data) {
    return service({
        url: '/admin_register',
        method: 'post',
        data
    })
}

export function adminLogin(data) {
    return service({
        url: '/admin_login',
        method: 'post',
        data
    })
}