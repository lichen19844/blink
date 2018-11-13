// 以下等效let classicBeh = Behavior({})，但是要去掉 export {classicBeh}
// export default Behavior({
// module.exports = Behavior({

// 使用const代替let
const classicBeh = Behavior({
    // 这里可以完全不写，也可以用空数组
    behaviors: [],

    properties: {
        img: String,
        content: String,
        hidden: Boolean
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