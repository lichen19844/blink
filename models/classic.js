import { HTTP } from '../util/http.js'
// 导入HTTP后有两种方式，一种是http.request的方式，一种是继承HTTP类
class ClassicModel extends HTTP {
    getLatest(sCallback) {
        // 不用http, 用this
        this.request({
            // 此处的url和success没有直接关系，只是并列的2个实参
            url: 'classic/latest',
            success: (res) => {
                console.log('models http 数据 ', res)
                sCallback(res)
            }
        })
    }
}

export { ClassicModel }