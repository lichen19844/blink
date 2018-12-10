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
    more: {
      type: String,
      // observer: function(newVal, oldVal, changePath) {
      // },
      // ❤️observer的另外一种表达方式，先在methods中定义一个方法，再以String的名字赋值给它
      observer: '_load_more'
    }
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
    searching: false,
    loading: false
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

    _load_more() {
      console.log('123123')
      if(!this.data.text) {
        return
      }
      // 同时发送了2个请求，要求一次只发送一个请求
      // 锁
      if(this.data.loading) {
        return
      }
      const length = this.data.dataArray.length;
      // 锁住
      this.data.loading = true;
      bookModel.search(length, this.data.text)
      .then(res => {
        // 老数据 this.data.dataArray
        // 新数据 res.books
        const tempArray = this.data.dataArray.concat(res.books)
        this.setData({
          dataArray: tempArray,
          // loading: false
        })
        // 解锁
        this.data.loading = false;
      })
    },

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
      const q = event.detail.value || event.detail.text;
      console.log('event.detail text is ', event.detail.text)
      // 在调用搜索方法之前，提前setData绑定，这样用户体验好
      this.setData({
        text: q     
      })
      // 搜索方法
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
          // text: '',
        })        
      })
    },

    onClear(event){
      this.setData({
        text: '',
        searching: false
      })
    }

    // 上滑触底加载更多 scroll-view  | Page  onReachBottom
  }
})
