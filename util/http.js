// import { config } from '/config.js'里的{config}可以写成新名的方式 {config as config1}
// import { config as config1} from '/config.js'
// 当有多个外部引用时，可以写成 import {config, fun1, fun2} form '...'的形式
import { config } from '/config.js'
class HTTP {
    // 在现代编程中，很多时候是不区分【函数】和【方法】的叫法，但在类Class下叫 【方法】
    request(params) {
        // params包含我们访问一个api时所需要的全部参数，如 url, data, method 等
        // 这里我们封装的是一个通用方法，是要写method的
        // 如果没有给method，我们默认给一个get
        if (!params.method) {
            params.method = "GET"
        }
        wx.request({
            url: config.api_base_url + 'params.url',
            method: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {

            },
            fail: (err) => {

            }
        })
    }
}