define(['jquery'], function($){
    $('#logout').click(function(){
        $.ajax({
            url: '/api/logout',
            type: 'POST',
            success: function(){
                location.href = '/index.php/login'
            }
        })
        // 此时存储的cookie登录信息会删除




    })



})