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
            this.triggerEvent('left', {}, {})
        },

        onRight: function(event){
            this.triggerEvent('right', {}, {})
        }

    }
})