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
            return $this->redirect('/user/login/form?login_error=true');
            return $this->error(ApiCode::PARAMS_FAIL);
        }
        $password = hex2bin($validator->password);
        $username = hex2bin($validator->username);


        $prk = '-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCwdeb5uf6WUDxpS72iTrUbZIOgwUiDgB6snpDlKLrXOhwAsoF9
8v18aaiMb2dpvhQHCIDus2MSe8rMKiOs/ohaz0johuuoPOPp0uO/JjWELLCXCsfD
q0dhRGBCKfwmS6S7ugmdCYbxD2LQjSx0Qao3DrXxBh6VVC17j7V5seee1wIDAQAB
AoGBAKX4byQJTayBkSCUjauAjhVSp/9mbFbLBY7koXH4qivPSxFY1DTrfIItOsvD
6KdrkZi/5c0dypxS9P6sz9thmEsIU+aEyaC6+DYhZzhMihABAU1nyvrpMgHvQadp
sBmT5XyiXTBr4Xc46Epj0NcKSXJzN9dlMCHyn6hGJux33fzhAkEA5ZR6AbhnJQLi
USX2cEowBlFdNifNGTwxsoUdvF6A/ZMBEnXOmeRaRzxIfndZet3zZESYIqndNzZP
bhsY1pCtpwJBAMTEgTkRym7i47V3bH0DItTv5qCbHiT64VqMCSp7uOYyQPuA6Bfw
a+MkthCYnGTGX0fwVVmWjcPkU32kjQJRi1ECQEPxG+ZUb1n5r4Z6aKM0oV/NRnuX
bdAxCzgcwv8TLLNehOu0p47NkJYSVhXvNjDxbG1ZC3j+sjP7w6f/Juug53MCQGFq
YAefFTe8wLuQundR3CbL9sRAx7XLN1KazdbolevxqVZaxY1EjEVSYYjp5VPHGlkF
VVwbO2hmXCdyFhW1xWECQAfoNdjEJ+IbaKki/fP/Ir86Sl3J1KYGL15CHP2QSmWC
XJqbKFBXMDgJZCAR2mS+U2qjpmDXjvt7/p5DWNYjhZ8=
-----END RSA PRIVATE KEY-----
';

        openssl_private_decrypt($password, $password, $prk);
        openssl_private_decrypt($username, $username, $prk);

        $password = base64_encode(hash('sha256', $password, true));

        /** @var ?User $user */
        $user = User::find()->where(['username' => $username, 'password' => $password])->one();

        if (!$user) {
            return $this->redirect('/user/login/form?login_error=true&userId=' . $username);
            return $this->error(ApiCode::USERNAME_OR_PASSWORD_NOMATCH);
        }

        \Yii::$app->user->login($user, 30 * 24 * 60 * 60);

        return $this->redirect('/user/mypage');

        return $this->success($user);
    }

    public function actionMypage()
    {
        return $this->redirect('/user/mypage/update');
        return $this->render();
    }

    public function actionMypageUpdate()
    {
//        return $this->render('mypage');
        return $this->render();
    }

    public function actionRegister()
    {
        return $this->render();
    }

    public function actionLogout()
    {
        \Yii::$app->user->logout();
        return $this->redirect('/user/login/form');
    }


    public function actionLoginForm()
    {
        return $this->render(null, [
            'login_error' => $this->request->get('login_error') === 'true',
            'userId'      => $this->request->get('userId'),
        ]);
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

    public function actionJoinAgreementEmail()
    {
        return $this->render();
    }

    public function actionJoinForm()
    {
        return $this->render();
    }

    public function actionFindIdProcess()
    {
        return $this->render();
    }

    public function actionEncryptionKey()
    {

        $publicKey = openssl_pkey_get_public('-----BEGIN RSA PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwdeb5uf6WUDxpS72iTrUbZIOg
wUiDgB6snpDlKLrXOhwAsoF98v18aaiMb2dpvhQHCIDus2MSe8rMKiOs/ohaz0jo
huuoPOPp0uO/JjWELLCXCsfDq0dhRGBCKfwmS6S7ugmdCYbxD2LQjSx0Qao3DrXx
Bh6VVC17j7V5seee1wIDAQAB
-----END RSA PUBLIC KEY-----
');

        $keyDetails = openssl_pkey_get_details($publicKey);
        return $this->asJson([
//            'modulus'  => '8ab2d0161a402a27da086ff2ee3a867c0a586304af059b17c9cf423d5c65c39f1020d80b952c63418e6b902e974121e73ec56063c60e7a41defb90957f4bd3d175ae27a1fe2aa05d13c503fc978341b635bed9240fc8cf03a92a22f7c9f5682b184fca81dd1359d6b9a8896b2946a94db4d5a030d73d9d441975c147ab84b615',
'modulus'  => bin2hex($keyDetails['rsa']['n']),
//            'exponent' => '10001',
'exponent' => bin2hex($keyDetails['rsa']['e']),
        ]);
    }
}