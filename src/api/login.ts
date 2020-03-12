import service from './index'

function login(data) {
    return service.post('/front/user/test')
}