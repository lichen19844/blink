// components/classic/music/index.js

import {
  classicBeh
} from '../classic-beh.js';

// 定义一个变量，作为音乐管理对象的方法
const mMgr = wx.getBackgroundAudioManager();
const _animation = wx.createAnimation({
  duration: 1000,
  timingFunction: 'linear',
  delay: 0,
  transformOrigin: '50% 50% 0'  
});

Component({
  /**
   * Component properties
   * 动画API CSS3 canvas
   */

  behaviors: [classicBeh],

  properties: {
    src: String,
    title: String
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
    playing: false,
    animationStyle: '',
    // 唱片指针
    stylusW: 50,
    // 唱片黑边
    panW: 5
  },

  // 频繁使用wx:if会执行完整的生命周期并初始化，如data里的值会恢复初值；而hidden不会触发生命周期函数，所以detached只对wx:if生效，对hidden无效
  // detached: function(event){
  //   mMgr.stop()
  //   console.log('detached')
  // },

  // ❤️最好不要在有初始化功能的生命周期里写具体业务逻辑，具体业务逻辑用更加明确的私有函数封装起来，被生命周期调用
  attached: function(event){
  // 编程规范：function方法的简写，但好像对业务逻辑有影响，比如navi切换回来，播放图标失灵
  // attatched(event){
    // 不惜要写成this.method._recoverStatus
    this._recoverStatus()
    this._monitorSwitch()
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
        mMgr.title = this.properties.title         
      } 
      // 因为上次点击后playing的值变为true，此时再点击的话，!this.data.playing的结果就会为假，执行else
      else{
        this.setData({
          playing: false
        })
        // mMgr.pause()是个方法是个动作，和属性mMgr.paused有区别
        mMgr.pause()
      }
    },

    _recoverStatus: function(){
      // 判断音乐如果暂停了 mMgr.paused是属性，更像一种拥有的状态
      // ❤️页面的操作如onPlay函数和监听后台事件如mMgr.onPlay()等方法都会影响mMgr.paused
      // ❤️网上摘抄实验有bug，如果单纯的用:if(mMgr.paused)则会判断无音乐和音乐播放时都为假，这样两种不同的情况执行相同的操作，则会发生意外，所以需要添加这样的判断，if (typeof (mMgr.paused) !== "undefined") 用以区分播放和无音乐事件。
      // if(typeof(mMgr.paused)!== "undefined"){
      if(mMgr.paused){
          // 播放小图标的动画
          _animation.rotate(0).scale(1).translate(0, 0).step();
          this.setData({
          playing: false,
          animationStyle: _animation.export()
        })
        console.log('testPlayingPause')
        return
      }
      else{
        console.log('testWhatHappened 1')
      }
      // 判断当前播放的音乐地址就是properties中的音乐地址，mMgr.src是属性，更像一种拥有的状态
      if(mMgr.src == this.properties.src){
        // 播放小图标的动画
        _animation.rotate(180).scale(1.2).translate(0, 0).step();
        this.setData({
          playing: true,
          animationStyle: _animation.export()
        })
        console.log('testPlayingPlay')        
      }
      else{
        console.log('testWhatHappened 2')
      }
    },

    _monitorSwitch: function(){
      // ❤️监听到【后台】有小程序给定的触发事件，执行该函数里面的参数——相应你设置的回调函数
      mMgr.onPlay(()=> {
        this._recoverStatus()
        console.log('testOnPlay')
        if(mMgr.src == this.properties.src){
          console.log('consolePlayingPlay')        
        }
      }),
      mMgr.onPause(()=> {
        this._recoverStatus()
        console.log('testOnPause')
      }),
      mMgr.onStop(()=> {
        this._recoverStatus()
      }),
      mMgr.onEnded(()=> {
        this._recoverStatus()
      })
    }
  }
})
