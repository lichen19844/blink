// Model classic 的意义是处理数据
// classic/latest 是最新一期的期刊数据

import { HTTP } from '../util/http.js'
// 导入HTTP后有两种方式，一种是http.request的方式，一种是继承HTTP类
class ClassicModel extends HTTP {
    getLatest(sCallback) {
        // 继承了HTTP后,用this指代http，来调用http.js中的request方法
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

    getClassic(index, nextOrPrevious, sCallback){
        // 继承了HTTP后,用this指代http，来调用http.js中的request方法
        this.request({
            // 这个api规定的语句引起了页面数据的变化
            // url: 'classic/<int:index>/previous',
            url: 'classic/' + index + '/' + nextOrPrevious,
            success: function(res){
                sCallback(res)
            }
        })
    }

    getPrevious(index, sCallback){
        // 继承了HTTP后,用this指代http，来调用http.js中的request方法
        this.request({
            // 这个api规定的语句引起了页面数据的变化
            // url: 'classic/<int:index>/previous',
            url: 'classic/' + index + '/previous',
            success: function(res){
                sCallback(res)
            }
        })
    }

    getNext(index, sCallback){
        this.request({
            // 这个api规定的语句引起了页面数据的变化
            // url: 'classic/<int:index>/previous',
            url: 'classic/' + index + '/next',
            success: function(res){
                sCallback(res)
            }
        })        
    }

    isFirst(index){
        return index == 1 ? true: false
    }

    isLatest(index){
        let latestIndex = this._getLatestIndex()
        // 判断当前index值是否等同于抓取的'latest'缓存值
        return latestIndex == index ? true: false
    }

    // 私有方法，专门接收latest的index
    _setLatestIndex(index){
        // 'latest'即为key，即缓存的名字，index即为value，即缓存的值
        wx.setStorageSync('latest', index)
    }

    // 由于wx.getStorageSync('latest')可以直接获取值，所有这里不需要设置形参 _getLatestIndex()
    _getLatestIndex(){
        let index = wx.getStorageSync('latest')
        return index
    }
}

export { ClassicModel }