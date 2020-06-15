/*
 * @Author: your name
 * @Date: 2020-06-14 13:39:51
 * @LastEditTime: 2020-06-14 13:43:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\api\back\user.ts
 */
import service from '../index'

service.defaults.baseURL = '/back/user'

export function getUserListApi(params) {
    return service({
        url: '/',
        method: 'get',
        params
    })
}
