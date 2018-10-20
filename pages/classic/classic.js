// pages/classic/classic.js

// 在小程序开发工具中，在Sources中可以观察到'/util/http.js'可能是被系统当成了相对路径来执行，说明 import 只接受相对路径的写法，组件可以使用绝对路径
// import { HTTP } from '/util/http.js'
// import { HTTP } from '../../util/http.js'
// let http = new HTTP()
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    // wxml里呈现数据都是由data来决定，即data里的数据可以被wxml使用
    // 而setData是做数据更新
    // 建议在wxml中要使用的变量，最好在data里标识一下初值，如classic: null
    data: {
        classic: null,
        // test: 1
        // 由getLatest可以确定这里的latest初值一定为true
        latest: true,
        first: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad比onReady和onShow要更早调用
    onLoad: function(options) {
        // this指向了Page里面的Object
        // console.log('this.data.test is ', this.data.test);
        // 调用http.request函数，将实参传给http.js中的request函数体
        // http.request({
        //     // 此处的url和success没有直接关系，只是并列的2个实参
        //     url: 'classic/latest',
        //     success: (res) => {
        //         console.log('http data is ', res)
        //     }
        // });

        // 如果是写成let latest = classic.getLatest()的形式，是需要在getLatest函数体内return res  但是在函数体内的this.request也是个异步函数，没有办法直接处理数据给return
        classicModel.getLatest((res) => {
            console.log('(http方法的res数据传递了过来)classic 的 res is（实际是http.js中的res.data）', res)
            this.setData({
                classic: res
            })
            console.log('由classic指代res的数据', this.data.classic)
            console.log('setData之后的data数据 ', this.data)
            // 此小程序首页默认为latest页面，故这个页面的onLoad所拿到的classic数据我们将其看成是latestClassic
            // 而由onPrevious所拿到的classic数据我们将其看成是currentClassic
            // latestClassic latestIndex   currentClassic currentIndex
            // 运用比较思维，通过比对currentIndex是否等于latestIndex，来确认currentClassic数据是否是当前最新的期刊
        })

        console.log('options is ', options)

        // node.js
        // Promiste
        // 回调地狱，Promise可以解决
        // 在处理异步操作的时候，如果使用的是回调函数，会剥夺在函数里return的能力,Promise可以解决这个问题，在使用Promise的时候不要带着回调函数的思维
        //let that = this 和 wx.request({...})是平级关系，所以that可以被wx.request所以引用
        // let that = this;
        // 小程序里的wx.request是强制异步函数，不可以写成 let data = wx.request({...})的同步形式
        // wx.request({
        //     // console提示 'http://bl.7yue.pro 不在以下 request 合法域名列表中...'， 需要打勾“不校验合法域名...”
        //     // console提示 'GET http://bl.7yue.pro/v1/classic/latest 401 (Unauthorized)'，代表了未授权，可以查看Network
        //     // Network下点击latest，在Preview中查看到缺少appkey的错误信息，msg:"The appkey is useless，please go to the website www.7yue.pro to apply for the appkey"
        //     // 当不写method，默认方法为get
        // url: 'http://bl.7yue.pro/v1/classic/latest',
        //     // 如果不写header，appkey就要写在url中latest后面，以问号?打头
        // url: 'http://bl.7yue.pro/v1/classic/latest?appkey=MA0OKyXMxkLNEAIz',
        //     // 加上appkey后，再次查看Network中的latest，成功获取到了服务器的数据
        //     // 之后要对访问请求做封装
        // header: {
        //     appkey: "MA0OKyXMxkLNEAIz"
        // },
        //     // res会拿到访问url后，它带有格式的数据
        //     // success: function(res) {
        // success: (res) => {
        //     console.log(res)
        //         console.log(this.data.test)

        //     }
        // })
    },

    // 不需要在onLike接收回调函数的结果，所以在Model like中不需要传递success函数
    // 此处的onLike和like的index.js中的onLike不一样，也没有直接关联，不会获取到index.js中onLike的动作过程，只依赖其中的triggerEvent
    onLike: function(event) {
        // event的数据是系统给的js复杂对象，而非api数据
        console.log('class event的数据是系统给的js复杂对象，而非api数据，注意此时event的detail中接收到了triggerEvent绑定的信息behavior ', event);
        let behavior = event.detail.behavior;
        likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },

    onNext: function(event){

    },

    onPrevious: function(event){
        // first、latest的取值变量和classic数据中的index有紧密联系
        let index = this.data.classic.index;
        classicModel.getPrevious(index, (res) => {
            console.log('Previous data is ', res)
            this.setData({
                // 更新data里的数据
                classic: res
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        // let promise = new Promise((resolve, reject) => {
        //     wx.request({
        //         url: 'http://bl.7yue.pro/v1/classic/latest',
        //         header: {
        //             appkey: "MA0OKyXMxkLNEAIz"
        //         },
        //         success: (res) => {
        //             resolve(res)
        //         }
        //     })
        // })
        // promise.then((res) => {
        //     console.log('res is', res)
        // })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})