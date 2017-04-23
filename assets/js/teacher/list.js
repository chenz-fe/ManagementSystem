define(['jquery', 'template', 'bootstrap', 'filters'], function ($, template) {
    // task1: 进入讲师列表页面, 请求数据
    // task2: 点击查看按钮, 查看讲师信息

    // task1: 请求讲师列表数据, 渲染到模板中
    $.ajax({
        url: '/api/teacher',
        type: 'GET',

        success: function (info) {
            if (info.code == 200) {
                var html = template('teacherListTpl', { list: info.result });
                $('#teacher-list tbody').html(html);
            }
        }
    });

    // 这里为什么要用事件委托？
    // 点击事件的注册代码是在 运行之前执行（不使用模板，或许可以提前注册，但是模板，仅仅是处理字符串，不能提前注册）
    // 注册事件： 就是说给一个标签的某一个事件添加事件处理函数，也就是说onclick=func
    // $(...).click(function(){})
    // 注册代码，就是给click或者onclick事件
    // on()委托事件的优点：原来的事件绑定，要绑定好多事件，现在只需要绑定一个事件，大大提高了效率和页面性能，解决的动态添加元素导致不能触发的bug。

    // 教师信息查看
    $('#teacher-list').on('click', '.checkTeacherInfo', function () {
        // console.log(this);
        var teacherId = $(this).parent().attr('data-id');
        // console.log(teacherId);

        $.ajax({
            url: '/api/teacher/view',
            type: 'GET',
            data: 'tc_id=' + teacherId,
            success: function (info) {
                if (info.code == 200) {

                    info.result.tc_hometown = info.result.tc_hometown.split('|').join(' ');
                    info.result.tc_introduce = info.result.tc_introduce ? info.result.tc_introduce : '<p>前端工程师的职责是制作标准优化的代码，并增加交互动态功能，开发JavaScript以及Flash模块，同时结合后台开发技术模拟整体效果，进行丰富互联网的Web开发，致力于通过技术改善用户体验。</p>\n\n<p>前端工程师属于IT技术职业的一种，是近5年发展起来的职业，旧的体系将其定义为Web前端工程师，主要的技术包含：HTML、JavaScript、CSS。但IT技术属于变化比较快的领域，最近发生了很大的变革，新的体系下，前端工程师技术又增加了：nodejs、Hybrid App。</p>\n';

                    var html = template('teacherInfoTpl', info.result);
                    $('#teacherModal .panel-body').html(html);

                    $('#teacherModal').modal();
                }
            }
        })
    })

    // 教师启用或注销
    $('#teacher-list').on('click', '.teacherStatus', function () {
        var teacherId = $(this).parent().attr('data-id');
        var teacherStatus = $(this).attr('data-teacherStatus');
        console.log(teacherStatus);
        
        var that = $(this);

        $.ajax({
            url: '/api/teacher/handle',
            type: 'POST',
            data: {
                tc_id: teacherId,
                tc_status: teacherStatus
            },
            success: function (info) {
                if (info.code == 200) {
                    // 获取到的状态为数字类型，如果是1，按钮文字显示注销，如果是0，按钮文字为启用
                    that.text(info.result.tc_status == 0 ? '启用' : '注销');
                    
                    that.attr('data-teacherStatus',info.result.tc_status);

                }

            }
        })

    })



})