<?php

$isExist = array_key_exists( 'PATH_INFO', $_SERVER );

// 判断是否有路径,如果有就不用管了,
// 直接处理路径;但是如果没有,给它加上'/'就变成有了
if ( $isExist ) {
    $path_info = $_SERVER[ 'PATH_INFO' ];
} else {
    $path_info = '/';
} 

// 先截取掉一开始的斜线
$path_info = substr( $path_info, 1 );

// phpinfo();

$path_infos = explode( '/', $path_info );

// 1, ['']
// 2, ['名字']
// 3, [ '名字', '名字' ]
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