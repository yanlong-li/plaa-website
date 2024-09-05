<?php
date_default_timezone_set('UTC');
// 开启session
session_start();

include_once 'db.php';


function get_token($username, $password)
{
    $md5 = md5_file("compact.sqlite3");
    $str = <<<JSON
{
    "u": "$username",
    "p": "$password",
    "s": "47.122.21.80",
    "P": 1237,
    "v": 2,
    "mv": 2,
    "dh": "$md5"
}
JSON;


    $str  = json_encode(json_decode($str, true));
    $iv   = random_bytes(8);
    $data = rc4($iv, $str);

    return base64_encode($iv . $data);
}


function rc4($key, $data)
{
    // 初始化密钥表
    $s         = range(0, 255);
    $j         = 0;
    $keyLength = strlen($key);

    // 使用密钥进行置换
    for ($i = 0; $i < 256; $i++) {
        $j     = ($j + $s[$i] + ord($key[$i % $keyLength])) % 256;
        $temp  = $s[$i];
        $s[$i] = $s[$j];
        $s[$j] = $temp;
    }

    // 加密/解密数据
    $i          = 0;
    $j          = 0;
    $result     = '';
    $dataLength = strlen($data);

    for ($k = 0; $k < $dataLength; $k++) {
        $i = ($i + 1) % 256;
        $j = ($j + $s[$i]) % 256;

        $temp  = $s[$i];
        $s[$i] = $s[$j];
        $s[$j] = $temp;

        $result .= $data[$k] ^ chr($s[($s[$i] + $s[$j]) % 256]);
    }

    return $result;
}


function sendMail($data,&$response)
{

    $url = 'http://qingcloud:1280/mail/send'; // 替换为你的目标 URL
// 初始化 cURL 会话
    $ch = curl_init($url);

// 设置 cURL 选项
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data, JSON_UNESCAPED_UNICODE));

// 执行 cURL 请求
    $response = curl_exec($ch);

// 获取 HTTP 响应状态码
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 关闭 cURL 会话
    curl_close($ch);

    return $http_code;
}