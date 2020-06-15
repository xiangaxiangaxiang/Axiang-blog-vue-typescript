/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-06-13 15:08:02
 * @LastEditTime: 2020-06-15 20:43:43
 * @Description: 数据统计api
 * @FilePath: \axiang-blog-vue-typescript\src\api\back\statistics.ts
 */
import service from '../index'

export function getTotalApi() {
    return service({
        url: '/back/statistics/get_total',
        method: 'get'
    })
}

export function getMonthlyStatisticsApi() {
    return service({
        url: '/back/statistics/get_monthly_statistics',
        method: 'get'
    })
}