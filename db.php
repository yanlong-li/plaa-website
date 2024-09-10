<?php

$pdo = new PDO('mysql:host=100.126.86.31;dbname=aaemu_login', 'archeage', 'archeage');
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
               1 => 'mysql:host=100.72.249.21;dbname=aaemu_game',
               2 => 'mysql:host=100.126.86.31;dbname=aaemu_game',
               3 => 'mysql:host=100.115.127.38;dbname=aaemu_game',
               4 => 'mysql:host=100.126.86.31;dbname=aaemu_game_plaa',
           ][$id];

    $pdo = new PDO($dns, 'archeage', 'archeage');
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

    $local = new PDO('mysql:host=100.126.86.31;dbname=aaemu_plaa', 'archeage', 'archeage');
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