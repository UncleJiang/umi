module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    proxy: { // 设置代理
      '/apis': {
        target: 'http://localhost:8080/api/v1',
        changeOrigin: true
      }
    }
  }
}
