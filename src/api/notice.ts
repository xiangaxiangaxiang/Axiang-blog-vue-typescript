import service from './index'

export function getNoticeApi(params) {
    return service({
        url: '/front/notification/',
        method: 'get',
        params
    })
}