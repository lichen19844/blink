// components/navi/navi.js
Component({
    /**
     * Component properties
     */
    properties: {
        title: String,
        // 确定当前的期刊是否为第一期，该状态用于禁用右箭头
        first: Boolean,
        // 确定当前的期刊是否为最新一期，该状态用于禁用左箭头
        latest: Boolean
    },

    /**
     * Component initial data，设置完组件的属性后，就要设置组件的内被变量
     */
    data: {
        disLeftSrc: 'images/triangle.dis@left.png',
        leftSrc: 'images/triangle@left.png',
        disRightSrc: 'images/triangle.dis@right.png',
        rightSrc: 'images/triangle@right.png',
    },

    /**
     * Component methods
     */
    methods: {
        onLeft: function(event){
            // 如果不是最新一期，才触发事件
            if(!this.properties.latest){
                this.triggerEvent('left', {}, {})
            }
        },

        onRight: function(event){
            // 如果不是第一期，才能触发事件，properties.first会追溯到classic.wxml中的navi-cmp，再追溯到对应classic.js的当前最新的first值
            if(!this.properties.first){
                this.triggerEvent('right', {}, {})
            }
        }

    }
})