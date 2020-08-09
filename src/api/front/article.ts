import service from '../index'

export function getArticlesApi(params) {
    return service({
        url: '/front/article/list',
        method: 'get',
        params
    })
}

export function getLabelsApi(params) {
    return service({
        url: '/front/article/label',
        method: 'get',
        params
    })
}