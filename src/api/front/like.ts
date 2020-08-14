import service from '../index'

export function likeApi(data) {
    return service({
        url: '/front/like/',
        method: 'post',
        data
    })
}

export function dislikeApi(data) {
    return service({
        url: '/front/like/dislike',
        method: 'post',
        data
    })
}