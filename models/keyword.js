class KeyWordModel {

    key = 'q'
    maxLength = 10
    // words = []

    // 获取历史
    getHistory() {
        // 利用缓存
        const words = wx.getStorageSync(this.key)
        if(!words) {
            return []
        }
        return words
    }

    // 获取热门
    getHot() {
        // 利用服务器
    }

    // 将关键字写入缓存
    addToHistory(keyword) {
        // 假设缓存中已经存在了一个有效数组，为避免重复添加元素，先判断keyword是否已经存在，只有keyword没有出现过，才添加keyword
        // 1、拿到历史关键字的数组
        let words = this.getHistory();
        // 2、 判断是否存在 可以用ES5的indexOf 或ES6的 includes方法
        const has = words.includes(keyword);
        // 实现了 队列
        if(!has) {
            // 如果超过了限定显示的数量，删除数组末尾，再添加keyword到第一位
            const length = words.length;
            if(length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            // value是一组数组
            wx.setStorageSync(this.key, words)            
        }

    }
}