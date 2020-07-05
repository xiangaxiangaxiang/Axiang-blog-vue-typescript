import service from '../index'

export function getArticleListApi(params) {
    return service({
        url: '/back/article/',
        method: 'get',
        params
    })
}

export function changePublishStatusApi(data) {
    return service({
        url: '/back/article/publish',
        method: 'post',
        data
    })
}

export function deleteArticleApi(data) {
    return service({
        url: '/back/article/delete',
        method: 'post',
        data
    })
}

export function uploadImgApi(formdata) {
    return service({
        url: '/back/article/image_upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export function addArticleApi(data) {
    return service({
        url: '/back/article/add',
        method: 'post',
        data
    })
}