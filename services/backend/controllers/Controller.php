<?php

namespace app\controllers;

use app\models\ApiCode;
use yii\base\InlineAction;
use yii\filters\AccessControl;
use yii\filters\AccessRule;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;

abstract class Controller extends \yii\web\Controller
{

    protected $accessControlExceptActions = [];
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => Cors::class,
                'cors'  => [
                    'Origin'                           => [
                        'http://localhost:3030',
                    ],
                    'Access-Control-Request-Method'    => ["*"],
                    'Access-Control-Request-Headers'   => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                ],

            ],
            'access'     => [
                'class'        => AccessControl::class,
                'except'       => $this->accessControlExceptActions,
                'denyCallback' => function ($rule, $action) {
                    if (empty(\Yii::$app->response->data))
                        \Yii::$app->response->content = $this->error(ApiCode::NOT_LOGGED_IN);
                },
                'rules'        => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                        //                        'matchCallback' => function (AccessRule $rule, InlineAction $action) {
                        //                            return false;
                        //                        }
                    ],
                ]
            ],
        ]);
    }

    public function success($data = []): \yii\web\Response
    {
        return $this->asJson([
            'code' => 1,
            'msg'  => 'Success',
            'data' => $data,
        ]);
    }

    public function error($code = ApiCode::ERROR, $msg = null): \yii\web\Response
    {
        if (is_array($code)) {
            list($code, $msg) = ApiCode::destructing($code);
        }
        return $this->asJson([
            'code' => $code,
            'msg'  => $msg,
        ]);
    }

    public function render($view = null, $params = [])
    {
        $content = $this->getView()->render($view ?? $this->action->id, $params, $this);
        return $this->renderContent($content);
    }
}