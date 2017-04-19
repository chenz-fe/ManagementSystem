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