// components/iamge-button/index.js
Component({

  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  /**
   * Component properties
   */
  properties: {
    openType: {
      type: String
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    onGetUserInfo(event) {
      // open-type因为被传递了值getUserInfo，具备了获取信息的能力
      // 当用户点击按钮时，小程序会弹窗询问用户授权，只有授权了button才能通过属性bindgetuserinfo获取到了用户信息detail
      // 使用triggerEvent将用户信息抛到组件外部
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})
