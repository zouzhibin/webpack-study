module.exports = {
    root:true, // 是否是根配置 配置文件可以继承
    parser:"babel-eslint", // 把源码转换成语法树的工具
    extend:'airbnb', // 继承自airbnb 规则,不再需要你自己去写规则了
    parserOptions:{
        sourceType:"module",
        ecmaVersion:es2015
    },
    env:{ // 指定运行环境
        browser:true , // window document
        node:true
    },
    // 配置规则
    rules:{
        'indent':["error",4]
    }
}