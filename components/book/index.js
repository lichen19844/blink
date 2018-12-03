// components/book/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    // properties的属性book可以拿到id号
    book: Object,

    array: Array
  },

  /**
   * Component initial data
   */
  data: {
    toast:[
      'a', 'b', 'c'
    ],
    testing: false
  },

  /**
   * Component methods
   */
  methods: {
    onLongpress: function(event){
      // 使用 data-bId="{{book.id}} 结合 event.currentTarget.dataset.bid形式也可以拿到book.id
      // const bid = event.currentTarget.dataset.bid;
      // ❤️book组件properties的属性book可以拿到id号
      // 而组件相当于page页面，并拥有自己的id数据，有properties属性
      // template是page页面的补充，只有页面能力，不具备单独的js能力，只能使用event.currentTarget.dataset.xxx来获取
      const bid = this.properties.book.id;
      console.log('book.id is ', bid)
      // 要从组件中把id号传递出来，可以通过triggerEvent
      // 把wx.navigate写在组件内部，这样就不用在页面中通过监听组件triggerEvent把id号传递到页面，再通过页面传参了
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
    },

    // onTap(event) {
    //   const bid = this.properties.book.id;
    //   wx.showToast({
    //     title: 'ID:' + bid + '，长按进入',
    //     icon: 'none',
    //     image: '../../images/icon/testShowToast.png',
    //     duration: 1000
    // })
    // },

    onTap(event) {
      console.log('onTap is ')
      const array = this.properties.array;
      this.setData({
        testing: true
      })
    }

  }
})
