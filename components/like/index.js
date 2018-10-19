// components/like/index.js
// 在对应的json文件中，"component"和"usingComponents"这样的字符是系统固定生成的

Component({
    /**
     * 组件的属性列表
     */
    // 开放在外面的组件数据写在properties中，以方便对数据设置属性，此例有type属性，可以被外部访问到，如classic.wxml
    // 如果在index.wxml中设置了和properties属性同名的数据，如like 和 count，那wxml中数据的值是会被外部文件传递到组件属性的值所覆盖，如classic.wxml中的like="{{classic.like_status}}" count="{{classic.fav_nums}}"
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
        // 相当于
        // like: Boolean,
        count: {
            // Number的初始值是0
            type: Number,
            // value: 12
        }
        // 相当于
        // count: Number
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
        noSrc: 'images/like@dis.png',
        like: null,
        count: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // onLike方法内部的数据在点击前是不会去影响wxml页面的数据的，这也是试验classic.wxml和index.js中组件属性为like和count，
        // 而index.wxml数据和此处methods的setData数据仍为like和count，但是页面数据出错的原因，如果是非点击事件，而是直接渲染事件，则可以成功刷新
        onLike: function(event) {
            // event的数据是系统给的js复杂对象，而非api数据
            console.log('like event数据是系统给的js复杂对象，而非api，注意detail中此时没有需传递信息 ', event);

            // 自定义事件，1、该事件要通知页面我们点击了某个组件  2、给页面附加一个状态
            // 在onLike方法中激活（发起）自定义事件，并且这个事件需要携带behavior这个状态
            // this.properties.like和this.properties.count，可以写成this.data.like和this.data.count
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

            // 激活自定义事件
            // behavior用来表示点赞或取消点赞的状态
            // 如果'cancel'改写成'like/cancel'， Model like里只要写let url = behavior;即可
            // 在小程序的组件中，properties和data两个对象内的数据最终会合并，这样在访问properties或data时，都会指向同一个js对象合集
            // this.properties.like可以写成this.data.like
            let behavior = this.properties.like ? 'like' : 'cancel'

            // triggerEvent通过this来调用，它接收3个参数，
            // 第一个参数是字符串，是自定义事件的名称，比如'like',  后两个是js对象
            // 第二个参数通常用来接收我们自己定义的属性，比如behavior
            // 第三个参数一般不需要使用，只能使用指定参数
            this.triggerEvent('like', {
                behavior: behavior
            }, {});

            console.log('Component like 用 this 指代，但是证明了triggerEvent不在this之下，是个系统自带的函数，将like里需绑定的event，通过传递系统自带detail，传到class的系统event的detail中 ', this)


        }
    }
})