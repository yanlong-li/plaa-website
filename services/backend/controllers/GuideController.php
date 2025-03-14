<?php

namespace app\controllers;

class GuideController extends Controller
{

    protected $accessControlExceptActions = ['*'];

    public function actionIndex()
    {
        return $this->render();
    }

    public function actionInfo()
    {
        return $this->render();
    }
}