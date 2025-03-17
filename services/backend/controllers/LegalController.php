<?php

namespace app\controllers;

class LegalController extends Controller
{
    protected $accessControlExceptActions = ['*'];
    public $layout = 'legal';

    public function actionPrivacy()
    {
        return $this->render('privacy');
    }

    public function actionService()
    {
        return $this->render('service');
    }
    public function actionBslt()
    {
        return $this->render();
    }
    public function actionSecurity()
    {
        return $this->render();
    }
}