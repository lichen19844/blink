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
                console.log('models http 数据 ', res);
                // 接收的数据是http.js中的params.success(res.data)
                sCallback(res);
                this._setLatestIndex(res.index);
                let key = this._getKey(res.index);
                wx.setStorageSync(key, res)
            }
        })
    }

    getClassic(index, nextOrPrevious, sCallback){
        // 1、先在缓存中寻找  or  API拉取服务器数据  2、如果是API，要写入缓存中
        // 所有的期刊数据在缓存中必须有个key，确定key，key不是固定不变的，要设计一个key，表示一个期刊，还有表示是哪一期的期刊
        // let key = this._getKey(index)是直觉上写法，实际是错误的，因为getClassic方法的设计初衷就是要拿到本期index的上一期或下一期
        // index±1取决于nextOrPrevious
        let key = nextOrPrevious == 'next'? this._getKey(index + 1): this._getKey(index - 1);
        // 1、假设已经有了缓存，我们就预加载缓存，当得知是'next'时，我们就根据index+1对应的名字提前加载缓存数据
        let classic = wx.getStorageSync(key);
        // 2、但是需要加上判断，如果没有缓存，我们就向服务器发送请求
        if(!classic) {
            // 继承了HTTP后,用this指代http，来调用http.js中的request方法
            this.request({
                // 这个api规定的语句引起了页面数据的变化
                // url: 'classic/<int:index>/previous',在设置的时候<int:index>的写法要转化为index
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: (res) => {
                    // 把当前请求到的数据写到缓存中，为以后直接读取缓存做准备
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback(res)
                }
            })
        } else {
            // 如果找到了缓存数据，我们直接调用它，而不再请求服务器数据
            sCallback(classic)
        }

    }

    // getPrevious(index, sCallback){
    //     // 继承了HTTP后,用this指代http，来调用http.js中的request方法
    //     this.request({
    //         // 这个api规定的语句引起了页面数据的变化
    //         // url: 'classic/<int:index>/previous',
    //         url: 'classic/' + index + '/previous',
    //         success: function(res){
    //             sCallback(res)
    //         }
    //     })
    // }

    // getNext(index, sCallback){
    //     this.request({
    //         // 这个api规定的语句引起了页面数据的变化
    //         // url: 'classic/<int:index>/previous',
    //         url: 'classic/' + index + '/next',
    //         success: function(res){
    //             sCallback(res)
    //         }
    //     })        
    // }

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

    _getKey(index){
        let key = 'classic-' + index;
        return key
    }
}

export { ClassicModel }