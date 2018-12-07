// components/search/index.js

import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

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
    maxLength: 4,
    dataArray: [],
    searching: false
  },

  attached() {
    // getHot返回的是个Promise，getHistory返回的是数组
    // const historyWords = keywordModel.getHistory();
    // const hotWords = keywordModel.getHot();

    this.setData({
      historyWords: keywordModel.getHistory()
    });

    keywordModel.getHot()
    .then(
      (res) => {
        const hot = res.hot;
        // 3种方法获取数组的前面一部分
        // 1、用slice获取
        // const hotdata = hot.slice(0, this.data.maxLength)
        // 2、用for循环获取
        // const hotdata_a =[];
        // for(let i=0; i<this.data.maxLength; i++){
        //   hotdata_a.push(hot[i])
        // }
        // 3、用filter和indexOf获取
        console.log('hot is ', hot)
        const hotdata_b = hot.filter((x, index,self) => {
          return self.indexOf(x) < this.data.maxLength
        })
          this.setData({
            // hotWords: hotdata
            // hotWords: hotdata_a
            hotWords: hotdata_b
          })
    });
  },

  /**
   * Component methods
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(event) {
      this.setData({
        searching: true
      })
      // 使用input组件的confirm属性读取写入的值，再传给addToHistory方法
      // const word = event.detail.value;
      // 放在这里不好，因为用户的搜索关键词中可能会包含很多无效的信息，缓存应该储存更有效的信息，所以应该在返回搜素结果之后再把关键字添加到缓存中
      // keywordModel.addToHistory(word);

      const q = event.detail.value;
      bookModel.search(0, q)
      .then(res => {
        this.setData({
          dataArray: res.books
        })
        console.log('dataArray is ', this.data.dataArray)
        keywordModel.addToHistory(q);
        // 实时刷新记录历史搜索，不能用this.attatched()会报错
        const historyWords = keywordModel.getHistory();
        this.setData({
          historyWords: historyWords,
          text: ''
        })        
      })
    },

    onClear(event){
      this.setData({
        text: ''
      })
    }
  }
})
