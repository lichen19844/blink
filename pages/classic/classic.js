// pages/classic/classic.js

// 在小程序开发工具中，在Sources中可以观察到'/util/http.js'可能是被系统当成了相对路径来执行，说明 import 只接受相对路径的写法，组件可以使用绝对路径
// import { HTTP } from '/util/http.js'
import { HTTP } from '../../util/http.js'
let http = new HTTP()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        test: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad比onReady和onShow要更早调用
    onLoad: function(options) {
        // this指向了Page里面的Object
        console.log(this.data.test);
        // 调用http.request函数，将实参传给http.js中的request函数体
        http.request({
            url: 'classic/latest',
            success: (res) => {
                console.log('classic/latest is ', res)
            }
        });
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
        //     url: 'http://bl.7yue.pro/v1/classic/latest',
        //     // 如果不写header，appkey就要写在url中latest后面，以问号?打头
        //     // url: 'http://bl.7yue.pro/v1/classic/latest?appkey=MA0OKyXMxkLNEAIz'
        //     // 加上appkey后，再次查看Network中的latest，成功获取到了服务器的数据
        //     // 之后要对访问请求做封装
        //     header: {
        //         appkey: "MA0OKyXMxkLNEAIz"
        //     },
        //     // res会拿到访问url后，它带有格式的数据
        //     // success: function(res) {
        //     success: (res) => {
        //         // console.log(res)
        //         console.log(this.data.test)

        //     }
        // })
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