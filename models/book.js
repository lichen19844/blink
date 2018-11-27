import{
    HTTP
} from '../util/http-promise.js'

class BookModel extends HTTP {
    // getHotList不需要设置回调函数的形参
    getHotList(){
        // 因为request()返回的是promise，在这里我们需要再把promise一层层地返回给getHotList()
        return this.request({
            url: 'book/hot_list',
            // data: {
            //     name: '1',
            //     age: 18
            // },
            // method: 'POST'
        })
            
        //     'book/hot_list', {
        //     name: '1',
        //     age: 18
        // }, 'POST')
    }

    getMyBookCount(){
        return this.request({
            url: 'book/favor/count'
        })
    }

    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }

    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }

    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }
    
    postComment(bid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }

    // 实验Promise延时
    testTimeout(){
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                resolve(
                    wx.showToast({
                        title: '煮茶读书，甚好~',
                        icon: 'none'
                    }));
            }, 1500)
        })
    }
}

export {BookModel}