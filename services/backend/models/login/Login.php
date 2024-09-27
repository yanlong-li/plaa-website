<?php

namespace app\models\login;

use yii\db\ActiveRecord;

abstract class Login extends ActiveRecord
{
    public static function getDb()
    {
        return \Yii::$app->get('loginDb');
    }
}