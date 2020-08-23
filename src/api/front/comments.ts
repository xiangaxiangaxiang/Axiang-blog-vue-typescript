import service from '../index'

export function submitCommentApi(data) {
    return service({
        url: '/front/comment/add',
        method: 'post',
        data
    })
}

export function getCommentsApi(params) {
    return service({
        url: '/front/comment/getComment',
        method: 'get',
        params
    })
}

export function deleteCommentApi(data) {
    return service({
        url: '/front/comment/delete',
        method: 'post',
        data
    })
}
