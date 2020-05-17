/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-17 17:14:42
 * @LastEditTime: 2020-05-17 17:58:34
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
