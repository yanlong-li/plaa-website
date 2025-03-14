<?php

namespace app\controllers;

use app\models\ApiCode;
use app\models\login\User;
use yii\base\DynamicModel;

class UserController extends Controller
{
    protected $accessControlExceptActions = [
        'login',
        'register',
        'logout',
        '*',
    ];

    public $layout = 'member';

    public function actionInfo()
    {
        return $this->render();
    }

    public function actionLogin()
    {
        $validator = new DynamicModel($this->request->post());
        $validator->addRule(['username', 'password'], 'required');
        $validator->addRule(['username', 'password'], 'string');

        if (!$validator->validate()) {
            return $this->error(ApiCode::PARAMS_FAIL);
        }
        $password = $validator->password;
        $password = base64_encode(hash('sha256', $password, true));

        /** @var ?User $user */
        $user = User::find()->where(['username' => $validator->username, 'password' => $password])->one();

        if (!$user) {
            return $this->error(ApiCode::USERNAME_OR_PASSWORD_NOMATCH);
        }

        \Yii::$app->user->login($user, 30 * 24 * 60 * 60);

        return $this->success($user);
    }

    public function actionRegister()
    {
        return $this->render();
    }

    public function actionLogout()
    {
        return $this->render();
    }


    public function actionLoginForm()
    {
        return $this->render();
    }

    public function actionFindIdForm()
    {
        return $this->render();
    }

    public function actionFindPasswordForm()
    {
        return $this->render();
    }

    public function actionJoinAgreement()
    {
        return $this->render();
    }
}