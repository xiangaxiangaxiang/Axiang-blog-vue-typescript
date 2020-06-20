import service from '../index'

export function getArticleListApi() {
    return service({
        url: '/back/statistics/get_total',
        method: 'get'
    })
}