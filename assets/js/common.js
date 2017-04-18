
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

