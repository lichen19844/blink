import { config } from '../config.js'

const tips = {
    1: '抱歉，出现了一个错误了',
    3000: '期刊不存在',
    0:	'OK, 成功',
    1000:'输入参数错误',
    1001:'输入的json格式不正确',
    1002:'找不到资源',
    1003:'未知错误',
    1004:'禁止访问',
    1005:'appkey无效，请前往www.7yue.pro申请',
    1006:'服务器内部错误',
}

// 封装HTTP类
class HTTP {
    // 如果写成这样request(params){} 这个params在实际调用时用的是js对象，参考Moldes classic.js中request()
    // 这个params对象的好处是用一个参数名来表示所接收的多个参数，但是可读性很差
    // ❤️❤️对象的解构：(url, data={}, method='GET')改成({url, data={}, method='GET'})
    request({url, data={}, method='GET'}){
        // 省略了const promise，直接返回promise给request方法
        return new Promise((resolve, reject)=>{
            // 这里要写异步代码，已经封装在了_request方法中，直接调用过来
            this._request(url, resolve, reject, data, method)
        })
    }
    // 必填参数必须在默认参数之前
    // ❤️_request方法不能直接拿到resolve，必须将resolve作为参数传进来，然后在success中来改变Promise状态
    _request(url, resolve, reject, data={}, method='GET') {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                const code = res.statusCode.toString()
                console.log('res is ', res)
                console.log('res.statusCode is ', res.statusCode)
                console.log('string "code" is ', code)
                if (code.startsWith('2')) {
                    // ❤️这里用到了resolve，resolve可以全盘接收success拿到的res数据
                    // 因为resolve是必传参数，所以不需要做resolve存在的判断，写resolve && resolve(res.data)
                    resolve(res.data);
                    console.log('resolve is ', resolve);
                    console.log('resolve res data is ', res.data)
                }
                else {
                    // 放入reject是为了告诉promise，如果错误的话要改变状态，reject不需要放入参数
                    reject()
                    const error_code = res.data.error_code;
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                reject()
                this._show_error(1)
            }
        })
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip?tip:tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export { HTTP }