// components/classic/music/index.js

import {classicBeh} from '../classic-beh.js';

// 定义一个变量，作为音乐管理对象的方法
const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * Component properties
   */

  behaviors: [classicBeh],

  properties: {
    src: String
  },

  /**
   * Component initial data
   */
  data: {
    // 把图片的路径变成js变量
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    // {{!playing ? playSrc: pauseSrc}}等同于{{playing ? pauseSrc: playSrc}}更直观一点，其中playing是我们定义的“正在播放”，然而我们给playing的初值是false，false、true和播不播放的状态无关，!playing为true显示play图标，人为定义不播放；点击一下，!playing变成false，显示pause图标，人为定义正在播放
    playing: false
  },

  /**
   * Component methods
   */
  methods: {
    onPlay: function(event){
      // 图片要能切换
      this.setData({
        playing: true
      })
      // 默认为空字符串，当设置了新的 src 时，会自动开始播放
      mMgr.src = this.properties.src
    }
  }
})
