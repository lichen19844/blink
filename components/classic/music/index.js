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
    // {{!playing ? playSrc: pauseSrc}}等同于{{playing ? pauseSrc: playSrc}}更直观一点，其中playing是我们人为定义的“正在播放”，然而我们给playing的初值是false，初值false、true和播不播放的状态无关，只和图标有关，当!playing为true显示play图标，人为定义不播放；点击一下，!playing变成false，显示pause图标，人为定义正在播放
    // 视图层的!playing，其中playing的值false和true只是!的开关，出现在视图层的!只关联图片的切换，然后再映射到视图层
    playing: false
  },

  // 频繁使用wx:if会执行完整的生命周期并初始化，如data里的值会恢复初值；而hidden不会触发生命周期函数，所以detached只对wx:if生效，对hidden无效
  // detached: function(event){
  //   mMgr.stop()
  //   console.log('detached')
  // },

  attached: function(event){
    // 不惜要写成this.method._recoverStatus
    this._recoverStatus()
  },

  /**
   * Component methods
   */
  methods: {
    onPlay: function(event){
      // 图片要能切换
      // 因为初始playing为false，点击后，给当前playing一个!，当!和false结合，使得if的结果为真，执行playing:true，图片变为为暂停图标
      if(!this.data.playing){
        this.setData({
          playing: true
        })
      // 默认为空字符串，不启动音乐，当设置了新的 src 时，会自动开始播放
      // 根据惯例，暂停图标所关联的音乐要开始播放
      mMgr.src = this.properties.src        
      } 
      // 因为上次点击后playing的值变为true，此时再点击的话，!this.data.playing的结果就会为假，执行else
      else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus: function(){
      // 判断音乐如果暂停了
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      // 判断当前播放的音乐地址就是properties中的音乐地址
      if(mMgr.src == this.properties.src){
        this.setData({
          playing: true
        })
      }
    }
  }
})
