// components/classic/music/index.js

import {classicBeh} from '../classic-beh.js';

Component({
  /**
   * Component properties
   */

  behaviors: [classicBeh],

  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    // 把图片的路径变成js变量
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png'
  },

  /**
   * Component methods
   */
  methods: {

  }
})
