const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,// 关闭校验工具
  
  // 配置多个代理
  devServer: {
    proxy: {
      '/api': {       // 请求前缀 ，加上就走代理，不加就本地
        // target: 'http://localhost:8003',
         target: 'http://39.98.123.211',
        // pathRewrite:{"^/api":''},  // 重写地址名，将api开头的地址api换成空
        ws: true,            // 支持websocket
        changeOrigin: true   // 跨域欺骗用于控制请求头的host
      },
    }
  }
  
  
  
  // '/foo': { // 多个代理简写
  //   target: '<other_url>'
  // }
  // 配置单个代理
    //  devServer: {
    //   proxy: 'http://localhost:8000'
    // }
})
