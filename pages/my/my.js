// pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    authorized: false,
    userInfo: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    this.userAuthorized()
    // 只有用户授权了，才能使用
    // wx.getUserInfo({
    //   success: data => {
    //     console.log('getUserInfo is ', data)
    //   }
    // })
  },

  userAuthorized() {
    // wx.authorize({
    //   scope: "scope.werun"
    // })
    // 当button具备了open-type能力，用户通过授权了，wx.getSetting和wx.getUserInfo就可以拿到用户信息数据
    // wx.getSetting能获取用户是否已经授权，通过authSetting体现
    // https://developers.weixin.qq.com/miniprogram/dev/api/wx.authorize.html
    wx.getSetting({
      success: data => {
        console.log('getSetting is ', data)
        if(data.authSetting['scope.userInfo']) {
          // 如果通过了授权，wx.getUserInfo能获取到用户信息
          wx.getUserInfo({
            success: data => {
              console.log('getUserInfo is ', data)
              this.setData({
                // 两个函数里需要成对设置authorized和userInfo
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
        // else {
        //   console.log('没有得到用户授权，报一个err看看')
        // }
      }
    })
  },

  onGetUserInfo(event) {
    // onGetUserInfo(event)拿到了组件传来的信息
    // console.log('onGetUserInfo is ', event)
    const userInfo = event.detail.userInfo
    console.log('onGetUserInfo is ', userInfo)
    // 用户拒绝时userInfo是空值导致的undefined，要加判断
    if(userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
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
    wx.stopPullDownRefresh()
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