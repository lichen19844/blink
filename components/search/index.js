// components/search/index.js

import {
  KeywordModel
} from '../../models/keyword.js'

const keywordModel = new KeywordModel();

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
    // 调用Models中的相关方法，获取到历史搜索的所有关键字数据，然后做setData数据绑定
    historyWords: [],
    hotWords: [],
    text: '',
    maxLength: 5
  },

  attached() {
    // getHot返回的是个Promise，getHistory返回的是数组
    // const historyWords = keywordModel.getHistory();
    // const hotWords = keywordModel.getHot();

    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(
      (res) => {
        const hot = res.hot;
        const has = hot.includes();
        if(!has){
          const length = hot.length;
          console.log('hotWords res is ', hot)
          console.log('hot length is ', length)
          if(length >= this.data.maxLength) {
              hot
          }
          console.log('hot is ', hot.length)
          this.setData({
            hotWords: hot
          })
        }
      }
    )
    
  },

  /**
   * Component methods
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      // 使用input组件的confirm属性读取写入的值，再传给addToHistory方法
      const word = event.detail.value;
      keywordModel.addToHistory(word);
      // 实时刷新记录历史搜索，不能用this.attatched()会报错
      const historyWords = keywordModel.getHistory();
      this.setData({
        historyWords: historyWords,
        text: ''
      })
    },

    onClear(event){
      this.setData({
        text: ''
      })
    }

  }
})
