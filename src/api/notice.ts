import service from './index'

export function getNoticeApi(params) {
    return service({
        url: '/front/notification/',
        method: 'get',
        params
    })
}

export function getUnreadNumsApi() {
    return service({
        url: '/front/notification/unread_nums',
        method: 'get'
    })
}