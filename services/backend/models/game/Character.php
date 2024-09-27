<?php

namespace app\models\game;

class Character extends Game
{
    public static function tableName()
    {
        return 'characters';
    }
}