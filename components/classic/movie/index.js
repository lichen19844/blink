// components/classic/movie/index.js

// 以下等效import {classicBeh} from '../classic-beh.js'
// import classicBeh from '../classic-beh';
// var classicBeh = require('../classic-beh').default;

import {classicBeh} from '../classic-beh.js';

Component({
    /**
     * Component properties
     */
    // 数组[classicBeh]如果还需要引用别的behavior组件共享文件，组件内可以加逗号，如[classicBeh, classicBeh_a, classicBeh_b]
    behaviors: [classicBeh],

    // properties里的数据被内外部wxml都可以使用
    properties: {
        // 在有了behaviors可以将如下共用的properties变量删掉
        // img: String,
        // content: String
    },

    /**
     * Component initial data
     */
    data: {

    },

    attached() {
        // ❤️实验，在attatched中直接 使用wx.xxx是无效的
        // wx.startPullDownRefresh({
        //     success: function(){
        //         setTimeout(wx.stopPullDownRefresh
        //         , 1000)
        //     }
        // })
        // wx.showToast({
        //     title: '煮茶读书，甚好~',
        //     icon: 'none'
        // })
        // this.settimer_b()
        // this.settimer_c()
        this.showtoast()
    },

    /**
     * Component methods
     */
    methods: {
        onTap(event){
            // this.settimer(event)
            wx.startPullDownRefresh({
                success: ()=>{
                    {
                        this.settimer_a(),
                        // ❤️注意wx.stopPullDownRefresh的用法
                        // setTimeout(wx.stopPullDownRefresh
                        // , 1000),
                        wx.showToast({
                            title: '生活就像电影',
                            icon: 'none'
                        })    
                    }
                }
            })
        },

        settimer_a(event) {
            setTimeout(
                // (event)=> {
                // console.log("----Countdown----");
                // 每1秒自触发一次
                // this.settimer_a();
                // }, 
                wx.stopPullDownRefresh,
                2000);
        },

        settimer_b(event) {
            // setTimeout(
            //     this.showtoast,
            //     1400);
        },

        settimer_c(event) {
            console.log('settimer_c this', this)

            console.log('aaaaaaa')
        },
        showtoast(event) {
            wx.startPullDownRefresh()
            wx.showToast({
              title: '文艺气息扑面而来',
              icon: 'none'
            })
            console.log('this', this)
            // ❤️this.settimer_a()这种写法会报错 is not a function，暂时不知道原因
            this.settimer_a()
            this.settimer_b()
            // this.settimer_c()
            // setTimeout(
            //     wx.stopPullDownRefresh,
            //     1000)
        }
    }
})