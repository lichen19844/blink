// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * Page initial data
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // ❤️ 大白话，组件通过properties传递和接收参数，如果向一个页面传参，可以通过options来接收外部传递进来的参数、数据，页面所有的参数都在onLoad生命周期函数的options参数中
    // 可以接收到从外部传向页面的参数
    const bid = options.bid
    console.log('options is ', options)   
    console.log('bid is ', bid)
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    detail.then(res =>{
      console.log('detail is ', res)
      this.setData({
        book: res
      })
    })

    comments.then(res => {
      console.log('comments is ', res)
      this.setData({
        comments: res.comments
      })
    })

    likeStatus.then(res => {
      console.log('like res is ', res)
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
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