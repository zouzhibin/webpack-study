// 如果想给加载的模块配loader,expose-loader向全局对象暴露变量，变量就叫$
let $ = require('expose-loader?$!jquery')