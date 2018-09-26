import { HTTP } from '../util/http.js'
// 导入HTTP后有两种方式，一种是http.request的方式，一种是继承HTTP类
class ClassicModel extends HTTP {
    getLatest() {
        // 不用http, 用this
        this.request({
            url: 'classic/latest',
            success: (res) => {
                console.log('http data is ', res)
            }
        })
    }
}