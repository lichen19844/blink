// import { config } from '/config.js'里的{config}可以写成新名的方式 {config as config1}
// import { config as config1} from '/config.js'
// 当有多个外部引用时，可以写成 import {config, fun1, fun2} form '...'的形式
// import只接受相对路径，组件可以使用绝对路径
// import { config } from '/config.js'

import { config } from '../config.js'

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效，请前往www.7yue.pro申请',
    3000: '期刊不存在'
}

class HTTP {
    // 在现代编程中，很多时候是不区分【函数】和【方法】的叫法，但在类Class下叫 【方法】
    // request(){}是定义出的方法体
    request(params) {
        // 形参params指代了一个对象，包含了我们访问一个api时所需要的全部参数，这里是接收 Model 即 classic.js中request的实参url, success, method 等
        // 这里我们封装的是一个通用方法，是要写method的
        // 如果在classic.js中没有给method，我们在这默认给一个get
        if (!params.method) {
            params.method = "GET"
        }
        console.log('params is ', params)
        wx.request({
            // params.url是api文档中的 GET   /classic/latest
            url: config.api_base_url + params.url,
            method: params.method,
            //data是向服务器提交的数据，是请求的参数，给它一个params.data可以试试是否有数据，如果不存在需请求的参数，会返回一个undefined
            data: params.data,
            // header中写入appkey的原因可以参考postman里2种url的写法：
            // 第一种，url中直接填入 GET  http://bl.7yue.pro/v1/classic/latest?appkey=MA0OKyXMxkLNEAIz
            // 第二种，url中填入 GET  http://bl.7yue.pro/v1/classic/latest   然后在header中填入对应的key和value，即appkey和MA0OKyXMxkLNEAIz
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                // 通过statusCode来获取状态码，如2XX，4XX，5XX等
                let code = res.statusCode.toString()
                    // statusCode一般是数字类型，而startsWith只能处理字符串，如果不加toString()会报错：code.startsWith is not a function
                console.log('res is ', res)
                console.log('res.statusCode is ', res.statusCode)
                console.log('string "code" is ', code)
                if (code.startsWith('2')) {
                    // 将res.data作为实参回传
                    // 按照顺序先判断params.success是否为空，如果为空就不执行后面的回调函数params.success(res.data)，防止报没有回调函数的错，执行下一行
                    // 如果一行代码只写params.success本身，系统只会对它的状态进行判断真假，而不会做任何输出
                    // 利用状态执行命令要写成类似这样的，let behavior = this.properties.like ? 'like' : 'cancel'
                    // if(params.success)不如下面的判断方式快捷
                    params.success && params.success(res.data);
                    console.log('params.success is ', params.success)
                    console.log('params success res data is ', res.data)
                }
                // else里出现的问题叫“服务器异常”，fail里出现的问题叫“API调用失败”
                else {
                    let error_code = res.data.error_code;
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                this._show_error(1)
            }
        })
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

export { HTTP }