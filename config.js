// const用于固定不变的常量
const config = {
    api_base_url: 'http://bl.7yue.pro/v1/',
    appkey: "MA0OKyXMxkLNEAIz"
}

// config = 2 报错 const指向了config的内存地址
// config.appkey = 1 不报错