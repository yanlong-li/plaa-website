<?php

namespace app\models\plaa;

use yii\db\ActiveRecord;

class Activity extends ActiveRecord
{
    public static function tableName()
    {
        return 'activities';
    }
}