require.config({
    baseUrl: '/',
    paths: {
        // 第三方的库
        jquery: 'node_modules/jquery/dist/jquery',
        cookie: 'node_modules/jquery.cookie/jquery.cookie',
        template: 'node_modules/art-template/lib/template-web',
        nprogress: 'node_modules/nprogress/nprogress',
        bootstrap: 'node_modules/bootstrap/dist/js/bootstrap',
        echarts: 'node_modules/echarts/dist/echarts',

        // 自有 js 文件
        common: 'assets/js/common',
        login: 'assets/js/index/login',
        index: 'assets/js/index/index'
    }
});

require(['common']);
