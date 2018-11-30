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
    historyWords: []
  },

  // ready: function(){
  //   this.onConfirm()
  // },

  attached() {
    const historyWords = keywordModel.getHistory();
    this.setData({
      historyWords: historyWords
    })
  },

  /**
   * Component methods
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      const word = event.detail.value;
      keywordModel.addToHistory(word);
      // 实时记录历史搜索，不能用this.attatched()会报错
      const historyWords = keywordModel.getHistory();
      this.setData({
        historyWords: historyWords
      })
    }


  }
})
