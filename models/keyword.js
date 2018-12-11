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
        // 2、 判断输入的信息是否存在 可以用ES5的indexOf 或ES6的 includes方法，includes返回true或false
        const has = words.includes(keyword);
        // 实现了 队列
        // if(!has)如果为假，即键入的数据和缓存有重复，则不做任何下列操作，避免了重复数据的出现
        // 为真，则说明键入数据不重复
        if(!has) {
            // ❤️如果超过了限定显示的数量，pop方法会删除提取出的缓存数组末尾，unshift方法再添加keyword到第一位
            // 每一次confirm都会将键入值传递到这，假如缓存数组中已经有了9个，因9<10，所以不会pop删除元素，会执行unshift将第10个元素存进来，words数组变成10个元素
            // 现在缓存已经有了10个元素，再次键入值，因为已有数组length为10>=10，所以执行pop，删除最后一个元素，words数组变成9个，再通过unshift添加键入值进来，使得words仍为10个元素
            const length = words.length;
            // this指向CLASS KeywordModel
            if(length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            // 更新缓存数据，setStorageSync的value是一组数组words
            wx.setStorageSync(this.key, words)            
        }   else {
            for(let i = 0; i< words.length; i++) {
                if (words[i] === keyword) {
                    words.splice(i, 1);
                    break;
                }
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }

    }
}

export { KeywordModel }