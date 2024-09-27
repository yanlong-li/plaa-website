<?php

namespace app\controllers;

use app\models\plaa\Activity;
use app\models\plaa\ActivityOption;

class ActivitiesController extends Controller
{

    protected $accessControlExceptActions = [
        'list',
        'option-list',
    ];

    public function actionList()
    {
        $list = Activity::find()->all();

        return $this->success([
            'list' => $list
        ]);
    }

    public function actionOptionList()
    {
        $activityId = $this->request->get('activityId');

        $list = ActivityOption::find()->where(['activity_id' => $activityId])->all();

        return $this->success([
            'list' => $list
        ]);
    }

    public function actionReceive()
    {
        $activityId  = $this->request->post('activityId');
        $optionId    = $this->request->post('optionId');
        $characterId = $this->request->post('characterId');
    }
}