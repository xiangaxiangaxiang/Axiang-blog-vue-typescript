import service from '../index'

export function getArticlesApi(params) {
    return service({
        url: '/front/article/list',
        method: 'get',
        params
    })
}