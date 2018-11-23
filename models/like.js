// Model like 的意义是处理 点赞和取消点赞后 的数据

import { HTTP } from '../util/http.js'
class LikeModel extends HTTP {
    
    // 用字符category代替api参数type
    like(behavior, artID, category) {
        // url由组件的状态behavior决定 这里==和===都可以
        // 如果like的index.js的'cancel'改写成'like/cancel'， 这里则只要写let url = behavior;即可
        let url = behavior == 'like' ? 'like' : 'like/cancel';
        this.request({
            url: url,
            method: 'POST',
            // data是向服务器提交的数据，将期刊的指定数据按所调api要求的格式存储，服务器保存后，该期刊页面的like状态和数量将会被服务器保存，除非再次点击改变数据
            data: {
                art_id: artID,
                type: category
            }
            // ❤️不需要在classic.js的onLike方法接收success回调函数的结果，因为post提交了data数据，使得服务器记住了当页期刊的like状态和数据，所以在Model like中也就不需要传递success函数
            // ❤️如果不把动态的点赞状态传到服务器，我们只要销毁当前页面（刷新，重启，翻页等再回来到当前页）都会恢复默认的onLoad状态
        })
    }

    getClassicLikeStatus(artID, category, sCallback){
        this.request({
            url: `classic/${category}/${artID}/favor`,
            // ❤️success:sCallback，这样的【属性：赋值】形式并不是函数体success: function(res) {}的样子，也没有res这个形参，故不能写成success: sCallback(res)，所以params.success(res.data)会一直追溯到class.js的likeModel.getClassicLikeStatus(artID, category, (res)=>{}
            success: sCallback
        })
    }
}

export { LikeModel }