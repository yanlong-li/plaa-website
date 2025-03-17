<?php

namespace app\controllers;

class SecurityController extends Controller
{
    protected $accessControlExceptActions = ['*'];

    public function actionOtp()
    {
        return $this->render();
    }
}