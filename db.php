<?php

$pdo = new PDO('mysql:host=vm2;dbname=aaemu_login', 'root', '123456');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
global $pdo;

global $serverPdo;
$serverPdo = [];
function getServerDbById($id)
{
    global $serverPdo;
    if (isset($serverPdo[$id])) {
        return $serverPdo[$id];
    }

    $dns = [
               1 => 'mysql:host=vm2;dbname=aaemu_game',
           ][$id];

    $pdo = new PDO($dns, 'root', '123456');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $serverPdo[$id] = $pdo;
    return $pdo;
}

global $local;
function getLocalDb()
{
    global $local;
    if ($local) {
        return $local;
    }

    $local = new PDO('mysql:host=vm2;dbname=aaemu_plaa', 'root', '123456');
    $local->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $local;
}


function get_server_list()
{
    global $pdo;

    $smtm = $pdo->prepare('select id,name,locale,description from `game_servers` where hidden = 0');

    if (!$smtm->execute()) {
        return [];
    }

    return $smtm->fetchAll(PDO::FETCH_ASSOC);
}

function getCharactersByAccountId($serverId, $accountId)
{
    $serverDb = getServerDbById($serverId);

    if (!$serverDb) {
        return [];
    }

    $smtm = $serverDb->prepare('select id,name from `characters` where account_id = :accountId and deleted = 0');
    $smtm->bindParam(":accountId", $accountId);

    if (!$smtm->execute()) {
        return [];
    }

    return $smtm->fetchAll(PDO::FETCH_ASSOC);
}

function getActivities()
{
    $pdo = getLocalDb();

    $smtm = $pdo->prepare('select id,name,description from `activities` order by id desc');

    if (!$smtm->execute()) {
        return [];
    }

    return $smtm->fetchAll(PDO::FETCH_ASSOC);
}

function getActivityOptions($id)
{
    $pdo = getLocalDb();

    $smtm = $pdo->prepare('select id,title,description from `activity_options` where activity_id = :activity_id');
    $smtm->bindParam(':activity_id', $id);

    if (!$smtm->execute()) {
        return [];
    }

    return $smtm->fetchAll(PDO::FETCH_ASSOC);
}