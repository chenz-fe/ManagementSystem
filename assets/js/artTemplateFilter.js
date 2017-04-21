// 过滤器

define(['template'], function (template) {

    // 根据生日获取年龄
    template.defaults.imports.age = function (birth) {
        var curYear = new Date().getFullYear();
        birth = /(\d+)-/.exec(birth)[1];
        return curYear - birth;
    };

    // 获取性别
    template.defaults.imports.gender = function (gender) {
        return gender == 0 ? "男" : "女";
    }

    // 默认手机号
    template.defaults.imports.cellphone = function (cellphone) {
        return cellphone ? cellphone : 18612340987;
    }

    // 默认头像头像
    template.defaults.imports.avatar = function (avatar) {
        return avatar ? avatar : '/assets/images/default.png';
    }

    // hometown 格式
    template.defaults.imports.hometown = function (hometown) {
        return hometown.split('|').join(' ');
    }



});