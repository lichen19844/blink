// pages/classic/classic.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad比onReady和onShow要更早调用
    onLoad: function(options) {
        // 小程序里的wx.request是强制异步函数，不可以写成 let data = wx.request({...})的同步形式
        wx.request({
            // console提示 'http://bl.7yue.pro 不在以下 request 合法域名列表中...'， 需要打勾“不校验合法域名...”
            // console提示 'GET http://bl.7yue.pro/v1/classic/latest 401 (Unauthorized)'，代表了未授权，可以查看Network
            // Network下点击latest，在Preview中查看到缺少appkey的错误信息，msg:"The appkey is useless，please go to the website www.7yue.pro to apply for the appkey"
            url: 'http://bl.7yue.pro/v1/classic/latest',
            // 如果不写header，appkey就要写在url中latest后面，以问号?打头
            // url: 'http://bl.7yue.pro/v1/classic/latest?appkey=MA0OKyXMxkLNEAIz'
            // 加上appkey后，再次查看Network中的latest，成功获取到了服务器的数据
            // 之后要对访问请求做封装
            header: {
                appkey: "MA0OKyXMxkLNEAIz"
            },
            success: function(res) {
                console.log(res)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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