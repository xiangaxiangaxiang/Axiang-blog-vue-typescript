import service from '../index'

export function submitCommontApi(data) {
    return service({
        url: '/front/commont/add',
        method: 'post',
        data
    })
}

export function getCommontsApi(params) {
    return service({
        url: '/front/commont/getComment',
        method: 'get',
        params
    })
}

export function deleteCommontApi(data) {
    return service({
        url: '/front/commont/delete',
        method: 'post',
        data
    })
}
