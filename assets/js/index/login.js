define(['jquery', 'cookie'], function ($) {

    // 监听表单提交事件
    $('#loginForm').on('submit', function () {
        // 序列化表单值, 把数据转换为 key=value&&key=value 形式的字符串
        var FormData = $(this).serialize();

        // 提交后, 发送 ajax 请求
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: FormData,
            success: function (info) {
                //console.log(info);

                if (info.code == 200) {
                    alert('登录成功!');

                    // 存储数据
                    $.cookie('profile', JSON.stringify(info.result), { path: '/', expires:7});
                }
                // 跳转到首页
                location.href = '/';
            }
        })
        // 取消页面的默认跳转行为
        return false;
    })

})