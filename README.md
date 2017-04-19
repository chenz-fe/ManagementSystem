# 后台管理系统 -- studyIT项目

### 00. 项目介绍

### 01. 准备工作

### 02. 项目结构布局

原版文件夹结构
  
    website/
            
            js/                             -- 用户编写的 js 文件
                app.js or common.js         -- 主要的 js 文件
                index.js
                teacher/
                category/
                course/
            
            less/                           -- 用户编写的 less 文件(css文件)
                base.less                   -- 全局设置
                main.less                   -- 主要设置
                index.less                  --
            
            lib or assets/                  -- 一般放置第三方的库(jQuery, bootstrap 等)            
            upload/                         -- 用于放置上传的资源            
            index.html                      -- 主页            
            teacher/                        -- 所有与讲师有关的页面            
            category/                       -- 所有与分类有关的页面
            course/                         -- 所有与课程有关的页面
    
改进版: 在引入 npm 工具后, 所有的第三方 js 库都由 npm 进行管理
    
    website/
    
        index.php                          -- 路由
        node_modules/                      -- 放置所有第三方的 js 库和工具
        
        assets/                            -- 放置自有资源,js库, 图片, 音频等
            images/
            js/
                -common.js
            less/
                -bass.less
                -index.less
                -mixin.less
                -variable.less
        
        uploads/                          -- 放置用户上传的资源
        
        views/                            -- 所有需要显示的页面
            index/                        -- 首页/登录/退出/设置
                -index.html
                -login.html
                -repass.html
                -settings.html
            common/                       -- 页面共同部分提取
            advert/
            category/
            course/
            teacher/
            user/
            
        .gitignore                       -- git上传忽略
        package.json


### 03. index.php 路由文件设置
index.php 的作用:
    
    接收路径描述, 根据路径的描述 include(导入) 不同的 html,
    把对应的网页显示到页面中, 起到 路由(route) 的作用.
    在这个项目中, 需要显示的文件为 views 文件夹中的所有 html 文件.

index.php 完整代码:

```PHP
<?php

// var_dump ($_SERVER ); // 获取包含页面信息的数组
// $_SERVER[ 'PATH_INFO' ]; // 可以获取到用户输入的路径
// PATH_INFO 包含的路径是不包括 www.project_bxg.com/index.php的部分
// 例如:当前路径为 http://www.project_bxg.com/index.php/teacher/list
// $_SERVER[ 'PATH_INFO' ]得到的是 "/teacher/list" 字符串

// 首先判断用户是否输入了路径
$isExist = array_key_exists( 'PATH_INFO', $_SERVER );

// 如果输入了路径, 就不用管了, 等待进行后面的操作--显示路径描述的页面;
// 如果用户没有输入,则应该显示主页, 加上'/'则代表主页
if ( $isExist ) {
    $path_info = $_SERVER[ 'PATH_INFO' ];
} else {
    $path_info = '/';
} 

// 先截取掉一开始的斜线
$path_info = substr( $path_info, 1 );

// 再用"/"把字符串$path_info分割成数组$path_infos
$path_infos = explode( '/', $path_info );

// 拿到路径结构. 如果分割后得到的是2个数据 就表明是长路径形式, 可以直接显示
// 如果分割后得到的是1个元素, 那么使用的 就是短路径形式, 需要加上 index, 再显示
// 可能出现的情况有以下三种:
// 1, ['']   // 进入首页
// 2, ['名字']  // ['login']
// 3, [ '名字', '名字' ]  //  ['teacher','list']

if ( count( $path_infos ) == 2 ) {
    $path = $path_infos[ 0 ];
    $filename = $path_infos[ 1 ];
} elseif ( strlen( $path_infos[ 0 ] ) > 0 ) {
    $path = 'index';
    $filename = $path_infos[ 0 ];
} else {
    $path = 'index';
    $filename = 'index';
}

include_once( './views/' . $path . '/' . $filename . '.html' );

?>

```

### 04. 提取通用文件,路径修改

### 05. 完成登录功能

##### 登录页面技术点: 跨域 & cookie
    
    1. 如何调用接口 (跨域)
    
        利用服务器, 采用反向代理跨域
        找到 httpd-vhosts.conf 文件
        <VirtualHost *:80>
        DocumentRoot "/Applications/MAMP/htdocs/project_bxg/"
        ServerName project_bxg.com
        ServerAlias www.project_bxg.com
        ProxyRequests Off
        ProxyPass /api http://api.botue.com/v1
        </VirtualHost>
    
    2. 如何保持登录状态(cookie)

##### 默认跳转到登录页
功能描述
    
    如果没有登录, 无论访问哪一个页面都应该跳转到登录界面
    如果用户访问的是登录页, 则不进行跳转
    
```js
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
```
    
##### 完成登录后: 请求数据, 跳转到首页
功能描述

    用户登录后, 需要拿到用户名及头像数据
    如果用户名及密码正确, 显示登录成功并跳转到首页

    1. 给 form 表单添加 id: loginForm
    2. 按照 api 要求的数据格式, 给用户名和密码的 input 标签加上 name 属性
    3. 监听表单提交事件, 发送 ajax 请求.
    4. 把请求到的数据存入到 cookie 中.
    注 : 
        给 cookie 命名为'profile',方便调用; 
        需要设定访问级别为整个网站{ path: '/' }.

```js
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
            $.cookie('profile', JSON.stringify(info.result), { path: '/' });
        }
        // 跳转到首页
        location.href = '/';
    }
})
// 取消页面的默认跳转行为
return false;
})
```

##### 登录跳转后: 更新(加载)用户信息
功能描述
    
    用户登录成功跳转到首页后, 其用户名和头像需要显示在侧边栏.

    -> views/common/aside.html
    -> 找到对应的用户名和头像显示容器

```js
<div class="profile">
    <!-- 头像 -->
    <!--<div class="avatar img-circle">
            <img src="/uploads/avatar.jpg">
        </div>
        <h4>布头儿</h4>-->
</div>
```
    
    添加模板
    
```js
<script type="text/template" id="profileId">
    <div class="avatar img-circle">
        <img src="{{tc_avatar}}">
    </div>
    <h4>{{tc_name}}</h4>
</script>
```

    -> assets/js/common.js
    -> 通过模板引擎将请求到的数据渲染到页面上
    
```js
// 页面加载时,从 cookie 中获取用户信息
// 从登录页获取用户输入的用户名和密码
// $.cookie('profile')
// "{"tc_name":"前端学院","tc_avatar":"http://static.botue.com/images/avatar/58ecbf8189223.jpg"}"

// 拿到的 cookie 数据为字符串, 需要先转换成对象
var profile = JSON.parse($.cookie('profile'));
// console.log(profile);
// profile.tc_name
// profile.tc_avatar
var html = template('profileId', profile);
$('.aside .profile').html(html);
```
