// components/episode/index.js
Component({
    /**
     * Component properties
     */
    // 小程序会对properties做特殊处理，会给属性一个默认值，对data则没有
    properties: {
        index: Number
    },

    /**
     * Component initial data
     */

    data: {
        // 在data中不写默认值，而写成Number或String，在console.log中打印结果会是 js内置函数，如month: f String()
        // year: Number,
        // month: String,
        // 如果对data内的参数做初始化，可以直接设初值
        year: 0,
        month: ''
    },

    attached: function() {
        console.log('attached typeof(Number) is ', typeof(Number));
        console.log('attached Number is ', Number);
        // 在小程序的组件中，properties和data两个对象内的数据最终会合并，这样在访问properties或data时，都会指向同一个js对象合集
        // properties和data里的变量都能做绑定数据，properties和data中尽量避免设置同名变量（虽然逻辑上互不相干），不然properties的会覆盖data的
        console.log('attached properties is ', this.properties);
        console.log('attached data is ', this.data)
    },

    /**
     * Component methods
     */
    methods: {

    }
})