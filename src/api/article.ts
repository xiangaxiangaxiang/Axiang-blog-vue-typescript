import service from './index';

export function uploadArticleImage(data) {
    return service({
        url: '/back/article/image_upload',
        data,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}