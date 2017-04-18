<?php
// include_once './views/index/index.html';

// $_SERVER 是一个包含了诸如头信息(header)、路径(path)、
// 以及脚本位置(script locations)等等信息的数组。
// 这个数组中的项目由 Web 服务器创建。

var_dump ($_SERVER);
echo $_SERVER[ 'PATH_INFO' ] ;

$isExist = array_key_exists('PATH_INFO', $_SERVER);




?>