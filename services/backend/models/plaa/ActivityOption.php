<?php

namespace app\models\plaa;

use yii\db\ActiveRecord;

class ActivityOption extends ActiveRecord
{
    public static function tableName()
    {
        return 'activity_options';
    }
}