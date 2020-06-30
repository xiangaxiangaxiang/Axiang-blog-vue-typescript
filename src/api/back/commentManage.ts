import service from '../index'

export function getCommentListApi(params) {
    return service({
        url: '/back/comment/',
        method: 'get',
        params
    })
}

export function deleteCommentApi(data) {
    return service({
        url: '/back/comment/delete',
        method: 'post',
        data
    })
}
