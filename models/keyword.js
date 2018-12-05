import {HTTP} from '../util/http-promise.js'

class KeywordModel extends HTTP {

    key = 'q'
    maxLength = 10
    // words = []

    // 获取历史数据，来源于缓存
    getHistory() {
        const words = wx.getStorageSync(this.key)
        if(!words) {
            // 如果缓存不存在，返回一个空数组[]给getHistory方法
            return []
        }
        // 如果缓存存在，读取缓存
        return words
    }

    // 获取热门数据，来源于服务器的API
    getHot() {
        return this.request({
            url: 'book/hot_keyword'
        })
    }

    // 将关键字写入缓存
    addToHistory(keyword) {
        // 假设缓存中已经存在了一个有效数组，为避免重复添加元素，先判断keyword是否已经存在，只有keyword没有出现过，才添加keyword
        // 1、拿到历史关键字的数组
        let words = this.getHistory();
        // 2、 判断输入的信息是否存在 可以用ES5的indexOf 或ES6的 includes方法
        const has = words.includes(keyword);
        // 实现了 队列
        if(!has) {
            // 如果超过了限定显示的数量，删除数组末尾，再添加keyword到第一位
            const length = words.length;
            if(length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            // 更新缓存数据，setStorageSync的value是一组数组words
            wx.setStorageSync(this.key, words)            
        }

    }
}

export { KeywordModel }