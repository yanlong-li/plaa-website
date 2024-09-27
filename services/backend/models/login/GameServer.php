<?php

namespace app\models\login;

class GameServer extends Login
{
    public static function tableName()
    {
        return 'game_servers';
    }
}