import service from './index';

export function register(data):Promise<object> {
    return service.post('/front/user/register', data, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
}

export function test(params):Promise<object> {
    return service.get('/front/user/verify', {params})
}
