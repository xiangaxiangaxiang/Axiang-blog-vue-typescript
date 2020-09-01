import service from '../index'

export function getArticlesApi(params) {
    return service({
        url: '/front/article/list',
        method: 'get',
        params
    })
}

export function getRecommendationApi(params) {
    return service({
        url: '/front/article/recommendation',
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

export function getAboutApi() {
    return service({
        url: '/front/article/about',
        method: 'get'
    })
}

export function getArticleDetailApi(params) {
    return service({
        url: '/front/article/detail',
        method: 'get',
        params
    })
}
