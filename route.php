<?php
ini_set('memory_limit', -1);
ini_set('max_execution_time', 0);
// 设置文件存储的本地目录
define('FILE_DIR', __DIR__ . '/downloads');


// 获取请求路径中的文件名部分（假设文件名作为 URL 参数传递）
$file_path    = rtrim(FILE_DIR . ($_SERVER['PATH_INFO'] ?? '/'), '/');
$download_url = 'https://www.archeworld.com/';
//$download_url = 'https://scope.asia.xbluesalt.io';
$download_url = 'https://bslt.asia.xbluesalt.io';

if (empty($_SERVER['PATH_INFO'])) {
    $file_path            = FILE_DIR . '/index.html';
    $_SERVER['PATH_INFO'] = '/index.html';
}

$basename = basename($file_path);
if (strpos($basename, '.') === false) {
    if (file_exists($file_path) && !is_dir($file_path)) {
        rename($file_path, $file_path . '.html');
        $file_path = $file_path . '.html';
    }

    if (file_exists($file_path . '.html')) {
        $file_path = $file_path . '.html';
    }
}

//if (strpos($_SERVER['PATH_INFO'], 'resources-202412261502') !== false || strpos($_SERVER['PATH_INFO'], 'static_resources') !== false) {
//    $download_url = 'https://member.archeworld.com';
//}
//if (strpos($_SERVER['PATH_INFO'], 'resources-202502181246') !== false || strpos($_SERVER['PATH_INFO'], 'resources-202502181257') !== false) {
//    $download_url = 'https://www.xbluesalt.io';
//}
//
//if (strpos($_SERVER['PATH_INFO'], 'archeworld.com') !== false) {
//    $download_url = 'https:/';
//}
//if (strpos($_SERVER['PATH_INFO'], 'xbluesalt.io') !== false) {
//    $download_url = 'https:/';
//}
//var_dump($download_url,$file_path);
//die;

// 目标文件的网址，假设下载的网址是固定的
// 检查文件是否已经存在
if (file_exists($file_path) && !is_dir($file_path)) {

    //    return false;
    $extension = strtolower(pathinfo($file_path, PATHINFO_EXTENSION));
    $mimeTypes = require __DIR__ . '/config/mime.types.php';

    // 设置默认 MIME 类型
    $mimeType = $mimeTypes[$extension] ?? 'text/html;charset=UTF-8';
    // 输出文件内容
    header('Content-Type: ' . $mimeType);
    readfile($file_path);
} else {
    // 文件不存在，从目标网址下载
    $file_url = $download_url . $_SERVER['PATH_INFO'];


//    var_dump($file_url);
//    die;
    // 使用 cURL 下载文件
    $ch = curl_init($file_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_PROXY, "http://127.0.0.1:7892");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $file_content = curl_exec($ch);

    // 检查是否成功下载
    if (empty($file_content)) {
        echo '文件下载失败！';
        echo curl_error($ch);
        echo curl_errno($ch);
        exit;
    }

    $pathInfo = pathinfo($file_path);


    // 确保本地存储目录存在
    if (!is_dir($pathInfo['dirname'])) {
        mkdir($pathInfo['dirname'], 0777, true);
    }

    $basename = basename($file_path);
    if (strpos($basename, '.') === false) {
        $file_path = $file_path . '.html';
    }



    // 将下载的内容保存到本地
    file_put_contents($file_path, $file_content);
    $extension = strtolower(pathinfo($file_path, PATHINFO_EXTENSION));
    $mimeTypes = require __DIR__ . '/config/mime.types.php';
    // 设置默认 MIME 类型
    $mimeType = $mimeTypes[$extension] ?? 'text/html;charset=UTF-8';
    // 输出文件内容
    header('Content-Type: ' . $mimeType);
    readfile($file_path);
}
