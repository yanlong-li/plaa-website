<?php

namespace app\controllers;

class XbluesaltController extends Controller
{
    protected $accessControlExceptActions = ['*'];
//    public $layout = 'xbluesalt';

    public function actionIndex()
    {
        return $this->render();
    }

    public function actionScope()
    {
        return $this->render();
    }

    public function actionDeposit()
    {
        return $this->render();
    }

    public function actionWithdraw()
    {
        return $this->render();
    }

    public function actionStaking()
    {
        return $this->render();
    }

    public function actionCoupon()
    {
        return $this->render();
    }
}