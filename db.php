<?php

$pdo = new PDO('mysql:host=100.126.86.31;dbname=aaemu_login', 'archeage', 'archeage');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
global $pdo;


function get_server_list()
{
    global $pdo;

    $smtm = $pdo->prepare('select id,name,locale,description from `game_servers` where hidden = 0');

    if (!$smtm->execute()) {
        return [];
    }

    return $smtm->fetchAll(PDO::FETCH_ASSOC);
}