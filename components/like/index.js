// components/like/index.js
// 在对应的json文件中，"component"和"usingComponents"这样的字符是系统固定生成的

Component({
    /**
     * 组件的属性列表
     */
    // 开放在外面的组件数据写在properties中，以方便对数据设置属性，此例有type属性，可以被外部访问到，如classic.wxml
    properties: {
        // 具体参考文档https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
        // type: String, 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        like: {
            // 如果不写value, Boolean的初始值就是false
            type: Boolean,
            // value: true,
            // observer: function(){

            // }
        },
        count: {
            // Number的初始值是0
            type: Number,
            // value: 12
        }

    },

    /**
     * 组件的初始数据
     */
    // 这里的data是index.wxml私有的数据，不能直接被外部访问到，比如classic.wxml
    // 在component组件里，data里的数据只可以被相关的wxml使用，而properties里的数据被内外部wxml都可以使用
    data: {
        // 数据绑定
        // 三元表达式
        // 组件分：封装在内部，开放出来的
        // 组件的粒度：1、封装简单的功能，2、封装复杂的功能
        // like和count是可以开放在外部的组件数据
        // like: true,
        // count: 99,
        // yesSrc和noSrc是封闭在内部的，可写在data中
        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike: function(event) {
            let like = this.properties.like;
            let count = this.properties.count;
            // 点击了鼠标之后，要对like取反，才能表达为【要么喜欢，要么不喜欢】； 然后count根据like的状态要么+1，要么-1
            // like为true表示当前的状态是已喜欢，点击一下结果会变成不喜欢，此时喜欢的数量count要减去1，这里的like和like的初始值无关，只看此时的状态
            // 注意，想要在点击之后得到like取反的状态，取决于this.setData里的设置，在设置之前，无论怎么点击，这里的like是在点击之前上一次的状态
            // 由count = like ? count - 1 : count + 1 和 this.setData 来整体解释，点击之后，like由喜欢变成了不喜欢，count要-1
            count = like ? count - 1 : count + 1;
            this.setData({

                // 点击后like的状态取决于我们的需要，可以反可以不变
                like: !like,
                count: count
            })

            // event的数据是系统给的js复杂对象，而非api
            console.log('like event数据是系统给的js复杂对象，而非api ', event)
        }
    }
})