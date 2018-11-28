// components/search/index.js
Component({
  /**
   * Component properties
   */
  properties: {

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
    onCancel(event){
      this.triggerEvent('cancel', {}, {})
    }
  }
})
