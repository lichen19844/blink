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
        // wx.showToast({
        //     title: '煮茶读书，甚好~',
        //     icon: 'none'
        // })

        // ❤️attatched和methods其实有互通关系        
        // setTimeout(()=>{
        //     wx.showToast({
        //         title: '煮茶读书，甚好~',
        //         icon: 'none'
        //     }) 
        // },1000)
        this.settimer_B()
    },

    /**
     * Component methods
     */
    methods: {
        onTap(){
            this.settimer_B()

        },

        settimer_A() {
            setTimeout(
                ()=> {
                // console.log("----Countdown----");
                // 每1秒自触发一次
                wx.stopPullDownRefresh()
            }, 1000);
        },

        settimer_B() {
            wx.startPullDownRefresh()
            
            setTimeout(function() {
                this.showtoast()
            }.bind(this),1000);
            // 另一种写法，使用bind将创建一个新函数，并将第一个参数作为新函数运行时的this
            // setTimeout(
            //     this.showtoast
            // .bind(this),1000);
        },

        showtoast() {
            wx.showToast({
              title: '文艺气息扑面而来',
              icon: 'none'
            })
            console.log('this指向', this)
            this.settimer_A()
        }
    }
})