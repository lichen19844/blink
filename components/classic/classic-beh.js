let classicBeh = Behavior({
    properties: {
        img: String,
        content: String
    },

    data: {

    },
    //Behavior的生命周期函数attached的作用，相当于Component的attached，和页面Page({})中的onLoad   
    attached: function(){
        
    },

    methods: {

    }
})

// Behavior的输出一定要使用export，而Component不用
export {classicBeh}