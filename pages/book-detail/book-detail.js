// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()

let likeModel = new LikeModel()

Page({

  /**
   * Page initial data
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false,
    content: null
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

  onLike: function(event) {
    // event的数据是系统给的js复杂对象，而非api数据
    console.log('class event的数据是系统给的js复杂对象，而非api数据，注意此时event的detail中接收到了triggerEvent绑定的信息behavior ', event);
    let like_or_cancel = event.detail.behavior;
    // 不能写this.data.book.type 因为book的数据中没有type
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost: function(event) {
    this.setData({
      posting: true
    })
  },

  onCancel: function(event) {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    console.log('onPost event', event)
    const content = event.detail.text;
    if(content.length > 12) {
      WebGLTexture.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      // 如果超出了if条件，return可以终结掉onPost方法的执行流程，从而不向服务器提交数据
      return
    }

    bookModel.postComment(this.data.book.id, content)
    .then(res => {
      // 监听客户端的提示处理
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      // unshift可以将新的元素添加到数组的首位，数组comments
      this.data.comments.unshift({
        content: content,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
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