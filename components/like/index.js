// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  // 开放在外面的组件写在properties中
  properties: {
    // 具体参考文档https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
    like: {
      // 如果不写value, Boolean的初始值就是false
      type: Boolean,
      // value: true,
      // observer: function(){

      // }
    },
    count: {
      // Number的初始值是0
      type: Number
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    // 三元表达式
    // 组件分：封装在内部，开放出来的
    // 组件的粒度：封装简单的功能，封装复杂的功能
    // like和count是可以开放在外部的
    // like: true,
    // count: 99,
    // yesSrc和noSrc是封闭在内部的，可写在data中
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event){
      let like = this.properties.like;
      let count = this.properties.count;
      // like为true表示当前的状态是喜欢，当点击一下我们想要的结果是变成不喜欢，此时count要减去1，这里的like和like的初始值无关，只看此时的状态
      count = like?count-1: count+1;
      this.setData({
        count: count,
        // 点击后like的状态取决于我们的需要，可以反可以不变
        like: !like
      })
      console.log(event)
    }
  }
})
