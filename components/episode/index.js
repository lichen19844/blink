// components/episode/index.js
Component({
    /**
     * Component properties
     */
    // 小程序会对properties做特殊处理，会给属性一个默认值，对data则没有
    properties: {
        index: {
            // type: String,
            type: Number,
            // value: '7',
            // observer是当自身属性index被修改时会触发，当type为String会变成无限递归调用，每一次执行setData都会触发observer,然后再次setData，无限循环；当type为Number，08会被视为8,即不会触发第二次observer
            // 千万不要在observer中修改自身属性值，否则会发生递归调用
            observer: function(newVal, oldVar, changePath) {
                console.log('newVal is ', newVal);
                console.log('oldVar is ', oldVar);
                console.log('changePath is ', changePath);
                
                let val = newVal < 10 ? '0' + newVal : newVal;
                // let val = parseInt(newVal) < 10 ? '0' + parseInt(newVal) : parseInt(newVal);
                // let val = parseFloat(newVal) < 10 ? '0' + parseFloat(newVal) : parseFloat(newVal);
                console.log('val is ', val)
                    // newVal.length < 2 && this.setData({
                    //         index: '0' + newVal
                    //     })
                this.setData({
                    // 不要改变属性的值，而是改变data下变量的值，从而不再次惊动observer
                    // index: val
                    _index: val
                })
            }
        }
    },

    // wxs

    /**
     * Component initial data
     */

    data: {
        // 在data中不写默认值，而写成Number或String，在console.log中打印结果会是 js内置函数，如month: f String()
        // year: Number,
        // month: String,
        // 如果对data内的参数做初始化，可以直接设初值
        year: 0,
        months: [
            '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',
        ],
        _index: ''
    },

    // Component的生命周期函数attached的作用，相当于页面Page({})中的onLoad
    attached: function() {
        console.log('attached typeof(Number) is ', typeof(Number));
        console.log('attached Number is ', Number);
        // 在小程序的组件中，properties和data两个对象内的数据最终会合并，这样在访问properties或data时，都会指向同一个js对象合集
        // properties和data里的变量都能做绑定数据，properties和data中尽量避免设置同名变量（虽然逻辑上互不相干），不然properties的会覆盖data的
        console.log('attached properties is ', this.properties);
        console.log('attached data is ', this.data);
        // 相关JS Date对象的参考 http://www.w3school.com.cn/jsref/jsref_obj_date.asp
        // Date、getFullYear、getMonth等都是 Date 对象方法
        let date = new Date();
        console.log('date is ', date)
        let year = date.getFullYear()
        console.log('year is ', year)
        let month = date.getMonth()
        console.log('month is ', month)
        this.setData({
            // year: year, // 编程规范：属性值同名可以简写
            year,
            month: this.data.months[month]
        })

    },

    /**
     * Component methods
     */
    methods: {

    }
})