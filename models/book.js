import{
    HTTP
} from '../util/http-promise.js'

class BookModel extends HTTP {
    getHotList(){
        // 因为request()返回的是promise，在这里我们需要再把promise一层层地返回给getHotList()
        return this.request({
            url: 'book/hot_list',
            // data: {
            //     name: '1',
            //     age: 18
            // },
            // method: 'POST'
        })
            
        //     'book/hot_list', {
        //     name: '1',
        //     age: 18
        // }, 'POST')
    }
}

export {BookModel}