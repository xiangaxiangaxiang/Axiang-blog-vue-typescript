import service from '../index'

export function getArticleListApi(params) {
    return service({
        url: '/back/article/',
        method: 'get',
        params
    })
}