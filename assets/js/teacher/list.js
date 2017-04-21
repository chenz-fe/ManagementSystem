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


    $('#teacher-list').on('click', '.checkTeacherInfo', function () {
        // console.log(this);
        var teacherId = $(this).attr('data-id');
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












})