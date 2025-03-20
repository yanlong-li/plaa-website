<?php

namespace app\controllers;

class WeblauncherController extends Controller
{
    public function actionStart()
    {
        return $this->asJson([
            "result"  => true,
            "channel" => "pl",
            "locale"  => "zh_cn",
            "region"  => "global",
            'token'   => $this->get_token(\Yii::$app->user->identity->username, \Yii::$app->user->identity->password),
        ]);
    }

    function get_token($username, $password)
    {
        $md5 = md5_file(\Yii::$app->basePath . "/web/compact.sqlite3");
        $str = <<<JSON
{
    "u": "$username",
    "p": "$password",
    "s": "47.122.21.80",
    "P": 1237,
    "v": 3,
    "mv": 3,
    "dh": "$md5"
}
JSON;


        $str  = json_encode(json_decode($str, true));
        $iv   = random_bytes(8);
        $data = $this->rc4($iv, $str);

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
}