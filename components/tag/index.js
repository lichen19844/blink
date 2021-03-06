// components/tag/index.js
Component({
  
  // 启用slot需要加上
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  // 启用外部css样式
  externalClasses: ['tag-class'],

  /**
   * Component properties
   */
  properties: {
      text: String,
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
    onTap: function(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})
