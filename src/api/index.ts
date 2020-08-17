// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import { Base64 } from 'js-base64'
import { UserModule } from '@/store/modules/user'

export interface ResponseData {
    code: number;
    data?: any;
    message: string;
}

const service: AxiosInstance = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

function _encode(token) {
    const result = Base64.encode(token + ':')
    // 格式：Authorization: Basic $(base64_encode({username}:{password}))
    return 'Basic ' + result
}

// Request interceptors
service.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        // Add X-Access-Token header to every request, you can add other custom headers here
        // if (UserModule.token) {
        //     config.headers['X-Access-Token'] = UserModule.token
        // }
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = _encode(token)
        }
        if (config.headers['Content-Type'] !== 'multipart/form-data') {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response:AxiosResponse) => {
        return response.data
    },
    (error) => {
        if (error.response && error.response.data) {
            const res = error.response.data
            let msg:string = ''
            if (res.msg instanceof Array && res.msg.length > 0) {
                for (let i = 0; i < res.msg.length; i ++) {
                    msg += ` (${i+1}) ${res.msg[i]}`
                }
                Message({
                    message: msg,
                    type: 'error'
                })
            } else if (typeof res.msg === 'string') {
                msg = res.msg
                Message({
                    message: msg,
                    type: 'error'
                })
            }
            const status = error.response.status
            if (status === 403) {
                UserModule.showDialog()
            }
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
    }
)

service.defaults.withCredentials = true

export default service
