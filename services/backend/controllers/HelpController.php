<?php

namespace app\controllers;

class HelpController extends Controller
{

    protected $accessControlExceptActions = ['*'];

    public function actionFaq()
    {
        return $this->render();
    }

    public function actionInfo()
    {
        return $this->render('service.php');
    }
}