/*
 * @Author: your name
 * @Date: 2020-07-08 21:52:07
 * @LastEditTime: 2020-07-08 22:01:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \axiang-blog-vue-typescript\src\common\js\util.ts
 */

 export function formatTime(time) {
    const timeObj = new Date(time)
    if (isNaN(timeObj.getTime())) {
        return '时间参数不合规范'
    }
    const year = timeObj.getFullYear()
    const month = (timeObj.getMonth() + 1).toString().padStart(2, '0')
    const date = timeObj.getDate().toString().padStart(2, '0')
    const hour = timeObj.getHours().toString().padStart(2, '0')
    const minute = timeObj.getMinutes().toString().padStart(2, '0')
    const second = timeObj.getMinutes().toString().padStart(2, '0')

    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
 }