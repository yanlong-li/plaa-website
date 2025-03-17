<?php

namespace app\controllers;

class PolicyController extends Controller
{
    protected $accessControlExceptActions = ['*'];
    public function actionOperational()
    {
        return $this->render();
    }
}