define(['jquery'
	, 'template'
	, 'nprogress'
	, 'cookie'
], function ($, template, nprogress) {

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

	// 如果当前在登录页, 不执行后面的事件
	if (location.pathname == '/index.php/login') return;

	// 配置全局加载进度
	// 在页面加载时, 增加转动齿轮的 gif 遮罩层, 加载完成后, 遮罩层消失
	// 这是每个页面都需要用到的, 所有应该增加 ajax 全局事件, 并且放在页面 ajax 请求之前
	// 页面开始加载: $.ajaxStart();
	// 一个页面上可能不止发送一个 ajax 请求, 
	// 这里需要调用一个所有 ajax 请求完成后执行的事件: $.ajaxStop();(加给 document 对象)
	// $.ajaxStop()发生在所有 ajax 请求 complete 以后, 一个页面只会执行一次$.ajaxStop().
	$(document).ajaxStart(function () {
		// 页面顶部进度条开始加载
		nprogress.start();

		// 首先检测, 页面是否已经有进度条, 避免重复添加
		if ($('#cover_wheel').length > 0) {
			$('#cover_wheel').show();
			return;
		}

		$('<div id="cover_wheel"><img src="/assets/images/loading.gif"></div>')
			.appendTo('body');

	}).ajaxStop(function () {
		// 页面顶部进度条结束加载
		nprogress.done();

		// 加载结束隐藏进度条
		$('#cover_wheel').fadeOut();
	})


	// 进度加载完成后, 把用户名和头像渲染到页面上
	var html = template('profileId', profile);
	$('.aside .profile').html(html);

	// 首页没有 ajax 请求, 这里需要发送一个假的 ajax 请求,才有加载效果
	// $.ajax({
	// 	url:'/api/teacher'
	// })


	// 实现侧边栏按钮点击高亮
	// 通过类名和 pathname 的关系来实现.
	var pathname = location.pathname;
	// console.log(pathname);
	// 可能出现的情况:
	// 如果pathname为 '/' , '/index.php', 或者结尾为'index', 高亮的按钮类名为 calss="index"
	// 其他的页面, 如'讲师管理''用户管理', pathname为'/index.php/teacher/list', 可以以'/'分组,
	// 高亮的为pathname字符串的最后两组

	// 方法1: 字符串及数组方法
	/*if (pathname == '/' ||
		pathname == '/index.php' ||
		pathname.slice(1).split('/')[pathname.slice(1).split('/').length - 1] == 'index') {

		$('.index').addClass('active');

	} else {
		pathname = pathname.slice(1);
		var index = pathname.indexOf('/');
		pathname = pathname.slice(index + 1).replace('/', '-');

		$('.' + pathname).addClass('active');
	}*/

	// 方法2: 正则表达式(优化)
	var r1 = /(^\/$)|(\php$)|(\index$)/,
		r2 = /\/([^\/]+\/[^\/]+$)/;

	if (r1.test(pathname)) {
		$('.index').addClass('active');
	} else {
		$('.' + r2.exec(pathname)[1].replace('/', '-')).addClass('active');
	}







})














