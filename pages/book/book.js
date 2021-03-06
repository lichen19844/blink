// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * Page initial data
   */
  data: {
    // 纯粹callback 回调地狱  剥夺return
    // promise 代码风格 ❤️多个异步等待合并 本质上没有剥夺函数的return能力 不需要每一层传递回调函数callback
    // async await ES2017 小程序暂不支持
    // Promise 是具体意义上的对象，不是函数
    // 对象可以保存状态，而函数（包括回调函数）不能，因为它必须立即返回结果，除了闭包函数
    // 一次调用 多次调用服务器API  链式调用 3个API API1 API2 API3S
    books: [],
    searching: false,
    // more: false,
    // more: 0,
    more: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 示例代码
    // ❤️第一步，new一个Promise；第二步，把要处理的异步函数如wx.getSystemInfo写在Promise的函数（箭头函数）中，在异步代码中根据需要穿插resolve和reject，resolve或reject会拿到异步函数的结果，并保存；第三步，返回通过then方法拿到已成功或已失败的结果
    // const promise = new Promise((resolve, reject)=>{
      // Promise对象有3种状态，但是只能呈现一种：进行中pendding  已成功fulfilled  已失败rejected
      // 变更对象状态只有两个方法：1、设置resolve的专职作用是把“进行中”修改为“已成功”；2、设置reject是把“进行中”修改为“已失败”。状态一旦设定，promise会凝固这种状态
      // 获取系统信息getSystemInfo
    //   wx.getSystemInfo({
    //     success: res=>resolve(res),
    //     fail: (error)=>{
    //       reject(error)
    //     }
    //   })
    // });
    // promise的精髓：随时通过promise变量来拿到异步函数调用的结果，用对象的方式保存结果；promise作为对象可以赋值给一个变量，然后作为变量到处传递，不需要附带任何的回调函数
    // 什么时候要用回调函数呢，一直到你想去promise中取得异步调用的结果，才需要在then中附加一个回调函数
    // then接收2个回调函数，顺序不能颠倒，回调函数不是必填项
    // promise.then((res)=>{
      // 在then里做你想要做的事
      // console.log('通过promise调用成功的系统信息', res)
    // },(error)=>{
    //   console.log('error信息是', error)
    // });
    // console.log('Promise is ', promise)


    // getHotList()已拿到Promise状态
    // ❤️典型的错误使用Promise的用法
    // const hotList = bookModel.getHotList();
    // hotList.then(
    //   res => {
    //     console.log('模拟第一次调用API', res);
    //     // 准备第二次调用API
    //     bookModel.getMyBookCount()
    //      .then(res => {
    //        console.log('模拟第二次调用API', res);
    //        bookModel.getMyBookCount()
    //          .then(res => {
    //          console.log('模拟第三次调用API', res)
    //        })
    //      })
    //   }
    //   )

    bookModel.getHotList()
      .then(res => {
        console.log('模拟第一次调用API', res);
        // return bookModel.getMyBookCount()
        this.setData({
          books: res
        })
      })
      // .then(res => {
      //   console.log('模拟第二次调用API', res);
      //   return bookModel.getMyBookCount()
      // })
      // .then(res => {
      //   console.log('模拟第三次调用API', res)
      // })

  },

  onSearching() {
    this.setData({
      searching: true
    })
  },

  onCancel() {
    this.setData({
      searching: false
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

    wx.stopPullDownRefresh({
      success: ()=>{
        this.settimer()
      }
    });
  },

  /**
   * Called when page reach bottom
   */
  // 每一次触底more的值都会变化，导致组件的属性more也会变
  onReachBottom: function () {
    console.log('加载更多');
    this.setData({
      // more: true,
      // more: !this.data.more,
      more: random(16)
    })
    console.log('more value is ', this.data.more);
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  settimer(event) {
    setTimeout(
      this.showtoast
      ,1000);
  },

  showtoast(event){
    var selectAll = this.selectAllComponents('.toast')
    console.info('this.selectComponent(".toast").data', this.selectComponent('.toast'))
    console.info('this.selectAllComponents(".toast").data', this.selectAllComponents('.toast'))
    // for( var i = 0; i< selectAll.length-17; i++){
    for( var i in selectAll){
        selectAll[i].onTap()
    }
    wx.showToast({
      title: '翻翻书本，有书卷气',
      icon: 'none'
  })    
  }
})