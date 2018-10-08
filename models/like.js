// Model like 的意义是处理 点赞和取消点赞后 的数据

import { HTTP } from '../util/http.js'
class LikeModel extends HTTP {
    // 用字符category代替api参数type
    like(behavior, artID, category) {
        // url由组件的状态behavior决定
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            // data是向服务器提交的数据，是请求的参数，这里的数据是url对应的parameters:art_id和type
            data: {
                art_id: artID,
                type: category
            }
            // 不需要在classic.js的onLike方法接收回调函数的结果，所以在Model like中不需要传递success函数
        })
    }
}

export { LikeModel }