// 在ES6中，一个js文件就是一个模块，如根目录下的config.js
// config.js对于http.js这个模块是不可见的，除非主动输出config.js，可以使用export

// const用于固定不变的常量
// export可以将文件内部的定义方法或数据导出，被外部引用
// 外部引用时的写法 import { config } from '/config.js'
//api文档规定了所有的API发布版本均以 bl.7yue.pro/v1 开头
export const config = {
    api_base_url: 'http://bl.7yue.pro/v1/',
    appkey: "qNoN5PUzRYvPA9n44"
}

// config = 2 报错 const指向了config的内存地址
// config.appkey = 1 不报错

// 当有多个外部引用时，可以写成 import {config, fun1, fun2} form '...'的形式
// export let fun1 = function() {

// }

// 也可以写成
// const config = {
//     api_base_url: 'http://bl.7yue.pro/v1/',
//     appkey: "MA0OKyXMxkLNEAIz"
// }
// fun1 = function() {
// }
// export { config, fun1 }
// 或
// export { config as config1, fun1 }
//此时注意import写成 import {config1, fun1}