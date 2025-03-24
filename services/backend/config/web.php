<?php

use yii\web\GroupUrlRule;

$params = require __DIR__ . '/params.php';

$config = [
    'id'         => 'basic',
    'basePath'   => dirname(__DIR__),
    'bootstrap'  => ['log'],
    'timezone'   => 'Asia/Shanghai',
    'aliases'    => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request'      => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey'  => 'TF0DKBkAb_5vQ-o6dmQmNcgacqJrO0Xe',
            'parsers'              => [
                'application/json' => 'yii\web\JsonParser',
            ],
            'enableCsrfCookie'     => false,
            'enableCsrfValidation' => false,
        ],
        'response'     => [
//            'format' => 'json'
        ],
        'cache'        => [
            'class' => 'yii\caching\FileCache',
        ],
        'user'         => [
            'identityClass'   => \app\models\login\User::class,
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        //        'mailer'       => [
        //            'class'            => \yii\symfonymailer\Mailer::class,
        //            'viewPath'         => '@app/mail',
        //            // send all mails to a file by default.
        //            'useFileTransport' => true,
        //        ],
        'log'          => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets'    => [
                [
                    'class'  => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db'           => [
            'class'    => 'yii\db\Connection',
            'dsn'      => 'mysql:host=vm2.tsc.yanlongli.com;dbname=aaemu_plaa',
            'username' => 'root',
            'password' => '123456',
            'charset'  => 'utf8mb4',

            // Schema cache options (for production environment)
            //'enableSchemaCache' => true,
            //'schemaCacheDuration' => 60,
            //'schemaCache' => 'cache',
        ],
        'loginDb'      => [
            'class'    => 'yii\db\Connection',
            'dsn'      => 'mysql:host=vm2.tsc.yanlongli.com;dbname=aaemu_login',
            'username' => 'root',
            'password' => '123456',
            'charset'  => 'utf8mb4',
        ],
        'gameDb2'      => [
            'class'    => 'yii\db\Connection',
            'dsn'      => 'mysql:host=vm2.tsc.yanlongli.com;dbname=aaemu_game',
            'username' => 'root',
            'password' => '123456',
            'charset'  => 'utf8mb4',
        ],
        'urlManager'   => [
            'enablePrettyUrl' => true,
            'showScriptName'  => false,
            'rules'           => [
                '/news/<id:\d+>'     => 'news/info',
                '/guide/<id:\d+>'    => 'guide/info',
                '/help/faq/<id:\d+>' => 'help/info',

                new GroupUrlRule([
                    'prefix' => 'user',
                    'rules'  => [
                        'login/form'           => 'login-form',
                        'find/id/form'         => 'find-id-form',
                        'find/password/form'   => 'find-password-form',
                        'join/agreement'       => 'join-agreement',
                        'join/agreement/email' => 'join-agreement-email',
                        'join/form'            => 'join-form',
                        'find/id/process'      => 'find-id-process',
                        'login/encryptionKey'  => 'encryption-key',
                        'mypage/update'        => 'mypage-update',
                    ],
                ]),
            ],
        ],
    ],
    'params'     => $params,
];

//if (YII_ENV_DEV) {
//    // configuration adjustments for 'dev' environment
//    $config['bootstrap'][]      = 'debug';
//    $config['modules']['debug'] = [
//        'class' => 'yii\debug\Module',
//        // uncomment the following to add your IP if you are not connecting from localhost.
//        //'allowedIPs' => ['127.0.0.1', '::1'],
//    ];
//
//    $config['bootstrap'][]    = 'gii';
//    $config['modules']['gii'] = [
//        'class' => 'yii\gii\Module',
//        // uncomment the following to add your IP if you are not connecting from localhost.
//        //'allowedIPs' => ['127.0.0.1', '::1'],
//    ];
//}

return $config;
