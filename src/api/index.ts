// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

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

// Request interceptors
service.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        // Add X-Access-Token header to every request, you can add other custom headers here
        // if (UserModule.token) {
        //     config.headers['X-Access-Token'] = UserModule.token
        // }
        config.data = qs.stringify(config.data)
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
            const baseMsg = `errorcode ${res.status}!`
            let msg:string = ''
            if (res.msg instanceof Array && res.msg.length > 0) {
                msg += baseMsg
                for (let i = 0; i < res.msg.length; i ++) {
                    msg += ` (${i+1}) ${res.msg[i]}`
                }
                Message({
                    message: msg,
                    type: 'error'
                })
            } else if (typeof res.msg === 'string') {
                msg = `${baseMsg} ${res.msg}`
                Message({
                    message: msg,
                    type: 'error'
                })
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

export default service
