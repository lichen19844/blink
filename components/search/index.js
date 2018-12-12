// components/search/index.js

import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

const bookModel = new BookModel()

const keywordModel = new KeywordModel();

Component({

  behaviors: [paginationBev],

  /**
   * Component properties
   */
  properties: {
    more: {
      type: String,
      // observer: function(newVal, oldVal, changePath) {
      // },
      // ❤️observer的另外一种表达方式，先在methods中定义一个方法，再以String的名字赋值给它
      observer: 'loadMore'
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
    // dataArray: [],
    searching: false,
    loading: false,
    loadingMore: false,
    loadingCenter: false
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

    // 只在页面上拉触底时触发此方法
    loadMore() {
      console.log('123123')
      // ❤️判断输入字符是否为空，但此代码效果存疑，为什么不在onConfirm也设置
      if(!this.data.text) {
        return
      }
      // 同时发送了2个请求，要求一次只发送一个请求
      // 锁 如果不在加载数据将解锁继续往下执行，否则锁住并return
      if(this._isLocked()) {
        this._hideLoadingMore()
        return
      }
      this._showLoadingMore()

      // const length = this.data.dataArray.length;
      if(this.hasMore()){
        // 锁住 表示正在加载数据
        this._locked();
        console.log('loadMore loading is ',this.data.loading)
        // bookModel.search(length, this.data.text)
        bookModel.search(this.getCurrentStart(), this.data.text)
        .then(res => {
          // 老数据 this.data.dataArray
          // 新数据 res.books
          // const tempArray = this.data.dataArray.concat(res.books)
          this.setMoreData(res.books)
          // this.setData({
            // dataArray: tempArray,
            // loading: false
          // })
          // 解锁 表示数据加载完成，此时不在加载数据
          this._unLocked();
          console.log('loadMore loading is ',this.data.loading)
        }, () => {
          // 用在网络发生错误的时候避免死锁
          this._unLocked()
        })
      } else {
          this._hideLoadingMore()
      }

    },

    // 锁可以封装成Class类
    _isLocked() {
      return this.data.loading? true: false
    },

    _locked() {
      this.setData({
        loading: true
      })
      // this.data.loading = true;
    },

    _unLocked() {
      this.setData({
        loading: false
      })
      // this.data.loading = false;
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      // this._hideLoadingMore()
    },

    onConfirm(event) {
      this._showResult();
      this._hideLoadingMore();
      // 每次回车先回到页面顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })      
      // 使用input组件的confirm属性读取写入的值，再传给addToHistory方法
      // const word = event.detail.value;
      // 放在这里不好，因为用户的搜索关键词中可能会包含很多无效的信息，缓存应该储存更有效的信息，所以应该在返回搜素结果之后再把关键字添加到缓存中
      // keywordModel.addToHistory(word);
      const q = event.detail.value || event.detail.text;
      console.log('event.detail value or text is ', event.detail.value || event.detail.text)
      // 在调用搜索方法之前，提前setData绑定，这样用户体验好
      this.setData({
        text: q     
      })
      if(this._isLocked()) {
        return
      }
      this._showLoadingCenter();
      this._locked();
      console.log('onConfirm loading is ',this.data.loading)
      // 回车搜索后马上清空上一次搜索页面的数据
      this.initialize()      
      // 搜索方法，拿到api默认的前20条数据和总total数
      bookModel.search(0, q)
      .then(res => {
        console.log('then res is ', res)
        this.setMoreData(res.books);
        // this.setData({
        //   dataArray: res.books
        // })
        this.setTotal(res.total);
        console.log('dataArray is ', this.data.dataArray)
        this._unLocked();
        console.log('onConfirm loading is ',this.data.loading)
        keywordModel.addToHistory(q);
        this._hideLoadingCenter();
        // 实时刷新记录历史搜索，不能用this.attatched()会报错
        const historyWords = keywordModel.getHistory();
        this.setData({
          historyWords: historyWords,
          // text: '',
        })       
      }, () => {
        // 用在网络发生错误的时候避免死锁
        this._unLocked()
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        text: '',
        searching: false
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showLoadingMore() {
      this.setData({
        loadingMore: true
      })
    },

    _hideLoadingMore() {
      this.setData({
        loadingMore: false
      })
    },

    onClear(event){
      // 当正在加载的时候点击x，使点击无效
      if(this._isLocked()) {
        return
      }
      this._closeResult()
      this._hideLoadingMore()
    }

    // 上滑触底加载更多 scroll-view  | Page  onReachBottom
  }
})
