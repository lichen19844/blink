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

    attatched() {
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
    },

    /**
     * Component methods
     */
    methods: {
        onTap(event){
            wx.startPullDownRefresh({
                success: function(){
                    {
                        // ❤️注意wx.stopPullDownRefresh的用法
                        setTimeout(wx.stopPullDownRefresh
                        , 1000),
                        wx.showToast({
                            title: '生活就像电影',
                            icon: 'none'
                        })    
                    }
                }
            })
        }
    }
})