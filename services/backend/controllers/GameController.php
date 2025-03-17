<?php

namespace app\controllers;

class GameController extends Controller
{
    protected $accessControlExceptActions = ['*'];
    public function actionDownload()
    {
        return $this->render();
    }
}