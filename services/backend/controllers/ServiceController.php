<?php

namespace app\controllers;

use app\models\login\GameServer;

class ServiceController extends Controller
{

    protected $accessControlExceptActions = [
        'list',
    ];

    public function actionList()
    {
        $list = GameServer::find()->select(['id', 'name'])->where(['hidden' => 0])->all();

        return $this->success([
            'list' => $list,
        ]);
    }
}