// pages/book/book.js
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
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})