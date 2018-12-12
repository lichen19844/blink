const paginationBev = Behavior({
    behaviors: [],
    data: {
        // dataArray管理的是一个页面中要呈现的所有数据
        dataArray: [],
        total: null
    },
    methods:{
        // 用于分页的数据，setMoreData要传进的dataArray是新添加的数据
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },

        // 起始记录数
        getCurrentStart() {
            return this.data.dataArray.length
        },

        setTotal(total) {
            this.data.total = total;
        },

        // 是否还有更多的数据还要加载
        hasMore() {
            // total和dataArray的length做比较
            if(this.data.dataArray.length >= this.data.total) {
                return false
            } else {
                return true
            }
            // 空数组判断可能会碰到错误导致的空数组
            // return 
        },

        initialize() {
            this.setData({
                dataArray: []
            })
            // this.data.dataArray = [];
            this.data.total = null;
        }
    }
})

export {paginationBev}