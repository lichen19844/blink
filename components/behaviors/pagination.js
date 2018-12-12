const paginationBev = Behavior({
    behaviors: [],
    data: {
        // dataArray管理的是一个页面中要呈现的所有数据
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false
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
            if(total == 0) {
                this.setData({
                    noneResult: true
                })
            }
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
                dataArray: [],
                noneResult: false
            })
            // this.data.dataArray = [];
            this.data.total = null;
        },

        // 锁可以封装成Class类
        isLocked() {
            return this.data.loading? true: false
        },

        locked() {
            this.setData({
                loading: true
            })
            // this.data.loading = true;
        },

        unLocked() {
            this.setData({
                loading: false
            })
            // this.data.loading = false;
        }        
    }
})

export {paginationBev}