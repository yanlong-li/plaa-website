<?php

namespace app\controllers\api;

use app\controllers\Controller;

class FacewalletController extends Controller
{
    protected $accessControlExceptActions = ['*'];
    public function actionApiKey()
    {
        return $this->asJson(
            json_decode('{"result":"success","msg":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtfqofUXcqtZULsH2j8sSChAGAIIAHpKwSubjvcOZJe6BGBzlIHKRaHYjZrIltguJoUlOSEoFG70zZkfwUoepCydBysw4vf5Xtudyw7KolkY3PHgXPFs7iZgqw06hWEfWLeroMv25FaU-ovaFm-dNO-o-DyDSGsQAoL-r4Cb9AywIDAQAB"}', true)
        );
    }
}