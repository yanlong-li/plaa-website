<?php

namespace app\models;

use Yii;

class ApiCode
{


    const LANGUAGE_SORT = [
        'zh-CN',
        //        'zh-TW',
        //        'en-US',
    ];
    const ERROR = [
        0,
        '失败',
    ];
    const SUCCESS = [
        1,
        '成功',
    ];
    const NOT_LOGGED_IN = [
        3,
        '未登录',
    ];
    const PARAMS_FAIL = [
        4,
        '参数错误',
    ];
    const USERNAME_OR_PASSWORD_NOMATCH = [
        5,
        '用户名或密码不匹配',
    ];


    protected static $language = 'zh-CN';
    protected static $fallbackLanguage = 'zh-CN';

    /**
     * 填充参数 支持按位置顺序、多语言位置顺序、多语言索引、多语言关联等
     *
     * @param array $info
     * @param mixed ...$argc
     *
     * @return array
     *
     * @example (array,1,2,3)/(array,[[1,2,3],[3,2,1]])/(array,[1,2,3],[3,2,1])/(array,['en'=>[1,2,3]])
     */
    public static function sprintf(array $info, ...$argc)
    {
        // 多语言
        if (is_array($argc[0])) {
            // list<list>
            if (isset($argc[1]) || (isset($argc[0][0]) && !is_array($argc[0][0]))) {
                foreach ($argc as $index => $item) {
                    $info[$index + 1] = sprintf($info[$index + 1], ...$item);
                }
                // list
            } elseif (isset($argc[0][0]) && is_array($argc[0][0])) {
                for ($i = 1; $i < count($info); $i++) {
                    if (isset($argc[0][$i - 1])) {
                        $info[$i] = sprintf($info[$i], ...$argc[0][$i - 1]);
                    }
                }
            } else {
                // map
                foreach ($argc[0] as $key => $item) {
                    $index = array_search($key, self::LANGUAGE_SORT, true);
                    if ($index !== false) {
                        $info[$index + 1] = sprintf($info[$index + 1], ...$item);
                    }
                }
            }
        } else {
            for ($i = 1; $i < count($info); $i++) {
                $info[$i] = sprintf($info[$i], ...$argc);
            }
        }
        return $info;
    }

    /**
     * 解构
     *
     * @param array $code
     *
     * @return array [int,string]
     */
    public static function destructing(array $code = self::SUCCESS): array
    {
        return [self::code($code), self::msg($code)];
    }

    /**
     * 获取code
     *
     * @param array $code
     *
     * @return int
     */
    public static function code(array $code = self::SUCCESS): int
    {
        return $code[0] ?? self::ERROR[0];
    }

    /**
     * 获取code
     *
     * @param array $code
     *
     * @return string
     */
    public static function msg(array $code = self::SUCCESS): string
    {
        $index = array_search(self::getLanguage(), self::LANGUAGE_SORT, true);

        if ($index === false) {
            $index = array_search(self::$fallbackLanguage, self::LANGUAGE_SORT, true);
        }

        $index = ((int)$index) + 1;
        return $code[$index] ?? $code[1] ?? self::ERROR[$index] ?? self::ERROR[1] ?? 'fail - msg';
    }

    public static function getLanguage()
    {
        return Yii::$app->language;
    }
}