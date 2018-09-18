// import { config } from '/config.js'里的{config}可以写成新名的方式 {config as config1}
// import { config as config1} from '/config.js'
// 当有多个外部引用时，可以写成 import {config, fun1, fun2} form '...'的形式
import { config } from '/config.js'
class HTTP {
    // 在现代编程中，很多时候是不区分【函数】和【方法】的叫法，但在类Class下叫 【方法】
    // request(){}是定义出的方法体
    request(params) {
        // params是假设的已包含了我们访问一个api时所需要的全部参数，如wx.request所含有的 url, data, method 等
        // 这里我们封装的是一个通用方法，是要写method的
        // 如果没有给method，我们默认给一个get
        if (!params.method) {
            params.method = "GET"
        }
        wx.request({
            // params.url是api文档中的 GET      /classic/latest
            url: config.api_base_url + 'params.url',
            method: params.method,
            //params.data是什么？？？需要先设置出params.data吗？
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                // 通过statusCode来获取状态码，如2XX，4XX，5XX等
                let code = res.statusCode
                if (code.startsWith('2')) {

                } else {

                }
            },
            fail: (err) => {

            }
        })
    }
}

export { HTTP }