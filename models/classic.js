// Model classic 的意义是处理数据
// classic/latest 是最新一期的期刊数据

import { HTTP } from '../util/http.js'
// 导入HTTP后有两种方式，一种是http.request的方式，一种是继承HTTP类
class ClassicModel extends HTTP {
    getLatest(sCallback) {
        // 不用http, 用this，调用http.js中的request方法
        this.request({
            // 此处的url和success没有直接关系，只是并列的2个实参
            url: 'classic/latest',
            success: (res) => {
                console.log('models http 数据 ', res)
                    // 接收的数据是http.js中的params.success(res.data)
                sCallback(res)
                this._setLatestIndex(res.index)
            }
        })
    }

    getPrevious(index, sCallback){
        this.request({
            // 这个api规定的语句引起了页面数据的变化
            // url: 'classic/<int:index>/previous',
            url: 'classic/' + index + '/previous',
            success: function(res){
                sCallback(res)
            }
        })
    }

    isFirst(){
        return index == 1 ? true: false
    }

    isLatest(){
        return index == 8 ? true: false
    }

    _setLatestIndex(index){
        wx.setStorageSync('latest', index)
    }
}

export { ClassicModel }