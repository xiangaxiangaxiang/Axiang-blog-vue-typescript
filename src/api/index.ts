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
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
        const res = response.data
        if (res.errorCode !== 0) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        }
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
