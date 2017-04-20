define(['jquery', 'template', 'cookie'], function ($, template) {
	// NProgress.start();

	// NProgress.done();

	// 课程管理子菜单显示隐藏
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 登录验证:
	// 判断用户是否登录过, 如果登录过, 就什么也不做
	// 如果没有登录过,
	// 用户访无论访问哪个页面(除登录页),先跳转到登录页面
	if (!$.cookie('PHPSESSID') && location.pathname != '/index.php/login') {
		location.pathname = '/index.php/login';
		// 复习location.pathname
		// 如果网址是:https://zhidao.baidu.com/question/1111059162269174459.html
		// location.pathname : "/question/1111059162269174459.html"
		// location.pathname为域名后面的字符串
		// location.href指的是整个网址
	}

	// 页面加载时,从 cookie 中获取用户信息
	// 从登录页获取用户输入的用户名和密码
	// 如果存在过, 则跳转到首页
	// $.cookie('profile')
	// "{"tc_name":"前端学院","tc_avatar":"http://static.botue.com/images/avatar/58ecbf8189223.jpg"}"

	// 拿到的 cookie 数据为字符串, 需要先转换成对象
	var profile = JSON.parse($.cookie('profile'));
	// console.log(profile);
	// profile.tc_name
	// profile.tc_avatar

	if (location.pathname != '/index.php/login') {
		var html = template('profileId', profile);
		$('.aside .profile').html(html);
	}


})














