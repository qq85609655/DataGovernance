// 作为配置文件，直接导出配置对象即可
module.exports = {
    devServer: {
        port: 8088, // 端口号
        // host: 'localhost',
        host:'0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/DGP': {
                target: 'http://139.224.114.138:8080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/DGP': 'DGP'
                }
            }
        }
    }
}