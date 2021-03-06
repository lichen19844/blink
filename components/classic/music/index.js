// components/classic/music/index.js

import {
  classicBeh
} from '../classic-beh.js';

// 定义一个变量，作为音乐管理对象的方法
const mMgr = wx.getBackgroundAudioManager();
const _PlayerAnimation = wx.createAnimation({
  duration: 1000,
  timingFunction: 'ease-out',
  delay: 0,
  transformOrigin: '50% 50% 0'  
});
const _CoverAnimation = wx.createAnimation({
  // timingFunction: 'ease-out'
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
    vinylSrc: 'images/play.png',
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    judgeSrc: '',
    // {{!playing ? playSrc: pauseSrc}}等同于{{playing ? pauseSrc: playSrc}}更直观一点，其中playing是我们人为定义的“正在播放”，然而我们给playing的初值是false，初值false、true和播不播放的状态无关，只和图标有关，当!playing为true显示play图标，人为定义不播放；点击一下，!playing变成false，显示pause图标，人为定义正在播放
    // 视图层的!playing，其中playing的值false和true只是!的开关，出现在视图层的!只关联图片的切换，然后再映射到视图层
    playing: false,
    stopFlat: false,
    playerAnimationStyle: '',
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
      // 播放
      // 图片要能切换
      // 因为初始playing为false，点击后，给当前playing一个!，当!和false结合，使得if的结果为真，执行playing:true，图片变为为暂停图标
      if(!this.data.playing){
        mMgr.title = this.properties.title
        this.setData({
          playing: true
        })
        // 默认为空字符串，不启动音乐，当设置了新的 src 时，会自动开始播放
        // 根据惯例，暂停图标所关联的音乐要开始播放
        // mMgr.src = this.properties.src
        if(
          !mMgr.src
          ){
          console.log('!mMgr.src')
          // 从头播放
          mMgr.src = this.properties.src
        }  
        else {
          if(mMgr.src !== this.properties.src){
            console.log('mMgr.src !== this.properties.src')
            // 从头播放
            mMgr.src = this.properties.src
            console.log('❤️regain mMgr.src is', mMgr.src)        
          }
          // if(mMgr.src == this.properties.src) {
          //   console.log('❤️paused continue mMgr.src is', mMgr.src)
          //   mMgr.play()
          // }
          else {
            console.log('❤️paused continue mMgr.src is', mMgr.src)
            const stopFlat = this.data.stopFlat;
            // 是否已经停止
            if(!stopFlat && mMgr.src) {
              // 继续播放❤️❤️但是这一块在安卓真机上有bug 会报fail: src is null，实际有src
              mMgr.play()
            } else {
              // 从头播放
              mMgr.src = this.properties.src                
            }
      
          }
        }              
      } 
      // 暂停
      // 因为上次点击后playing的值变为true，此时再点击的话，!this.data.playing的结果就会为假，执行else
      else{

        this.setData({
          playing: false
        })
        // mMgr.pause()是个方法是个动作，和属性mMgr.paused有区别
        mMgr.pause()
      //   setTimeout(function(){
      //     mMgr.pause()
      // }, 1500)
      }
    },

    _recoverStatus: function(){
      // 判断音乐如果暂停了 mMgr.paused是属性，更像一种拥有的状态
      // ❤️页面的操作如onPlay函数和监听后台事件如mMgr.onPlay()等方法都会影响mMgr.paused
      // ❤️网上摘抄实验有bug，如果单纯的用:if(mMgr.paused)则会判断无音乐和音乐播放时都为假，这样两种不同的情况执行相同的操作，则会发生意外，所以需要添加这样的判断，if (typeof (mMgr.paused) !== "undefined") 用以区分播放和无音乐事件。
      // if(typeof(mMgr.paused)!== "undefined"){
      // 属性paused指当前是否暂停或停止
      if(mMgr.paused){
          // 播放小图标的动画
          _PlayerAnimation.rotate(0).scale(1).translate(0, 0).step();
          this.setData({
          playing: false,
          playerAnimationStyle: _PlayerAnimation.export(),
        })
        console.log('testPlayingPause')
        // 有了这个return，这两个if只能执行其中一个
        return
      }
      
      // 判断当前播放的音乐地址就是properties中的音乐地址，mMgr.src是属性，更像一种拥有的状态
      if(mMgr.src == this.properties.src){
        // 播放小图标的动画
        _PlayerAnimation.rotate(180).scale(1.14).translate(0, 0).step();
        this.setData({
          playing: true,
          playerAnimationStyle: _PlayerAnimation.export()
        })
        console.log('testPlayingPlay')        
      }
    },

    _monitorSwitch: function(){
      // ❤️监听到【后台】有小程序给定的触发事件，执行该函数里面的参数——相应你设置的回调函数
      mMgr.onPlay(()=> {
        this._recoverStatus()
        this.setData({
          stopFlat: false
        })        
        console.log('testOnPlay')
        if(mMgr.src == this.properties.src){
          console.log('mMgr.src consolePlayingPlay')        
        }
      }),

      mMgr.onPause(()=> {
        this._recoverStatus()
        this.setData({
          stopFlat: false
        })
        console.log('testOnPause')
        if(mMgr.src == this.properties.src){
          console.log('mMgr.src consolePlayingPause')        
        }
      }),

      mMgr.onStop(()=> {
        this._recoverStatus()
        this.setData({
          stopFlat: true
        })
        console.log('stopFlat is ', this.data.stopFlat)
      }),

      mMgr.onEnded(()=> {
        this._recoverStatus()
        console.log('mMgr.onEnded')
        this.setData({
          stopFlat: true
        })
      })
    }
  }
})
