<?php

namespace app\controllers;

use app\models\game\Character;
use yii\base\DynamicModel;
use yii\db\Connection;

class CharacterController extends Controller
{
    public function actionList()
    {

        $validator = new DynamicModel($this->request->get());
        $validator->addRule('serviceId', 'required')
            ->addRule('serviceId', 'integer', ['min' => 2, 'max' => 2]);

        if (!$validator->validate()) {
            return $this->error("参数无效");
        }

        $serviceId = $this->request->get('serviceId', 0);

        /** @var ?Connection $gameDb */
        $gameDb = \Yii::$app->get('gameDb' . $serviceId);

        if (!$gameDb) {
            return $this->error();
        }

        $list = Character::find()->select(['id', 'name'])
            ->where(['account_id' => \Yii::$app->user->id, 'deleted' => 0])->asArray()->all($gameDb);


        return $this->success([
            'list' => $list,
        ]);
    }
}