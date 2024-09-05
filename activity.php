<?php
include_once 'common.php';

if (!isset($_SESSION['user'])) {
    Header('Location: login.php');
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $activityId  = $_POST['activity_id'];
    $optionId    = $_POST['option_id'];
    $characterId = $_POST['character_id'];

    /** @var PDO $localPdo */
    $localPdo = getLocalDb();
    /** @var PDOStatement $stmt */
    $stmt = $localPdo->prepare('select * from `activities` where id = :id');

    $stmt->bindValue(':id', $activityId);

    if (!$stmt->execute()) {
        $errMsg = '活动查询失败，请稍后再试~';
    }

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        $errMsg = '活动不存在';
    } else {

        $stmt = $localPdo->prepare('select * from `activity_options` where id = :id and activity_id = :activity_id');

        $stmt->bindValue(':id', $optionId);
        $stmt->bindValue(':activity_id', $activityId);

        if (!$stmt->execute()) {
            $errMsg = '礼包查询失败，请稍后再试~';
        } else {
            $optionResult = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$optionResult) {
                $errMsg = '礼包查询失败，请稍后再试~';
            } else {
                if ($result['target_group'] == 'account') {
                    $stmt = $localPdo->prepare('select count(*) as c from `activity_participation` where account_id = :account_id');
                    $stmt->bindValue(':account_id', $_SESSION['user']['id']);
                } else {
                    $stmt = $localPdo->prepare('select count(*) as c from `activity_participation` where character_id = :character_id and activity_id = :activity_id');
                    $stmt->bindValue(':character_id', $characterId);
                    $stmt->bindValue(':activity_id', $activityId);
                }
                if (!$stmt->execute()) {
                    $errMsg = '领取记录查询失败，请稍后再试~';
                } else {
                    $result2 = $stmt->fetch(PDO::FETCH_ASSOC);

                    if (isset($result2['c']) && $result2['c'] >= $result['claim_limit']) {
                        $errMsg = '您已领取过啦，不能重复领取哦~';
                    } else {

                        $data               = json_decode($optionResult['hidden_data'], true);
                        $data['Recipients'] = [intval($characterId)];


                        if (count($data['AttachmentItems']) > 10) {
                            $title              = $data['Title'];
                            $allAttachmentItems = array_chunk($data['AttachmentItems'], 10);
                            $totalMail          = count($allAttachmentItems);
                            $sendResult         = 500;
                            $response           = '未知错误';
                            for ($i = 0; $i < count($allAttachmentItems); $i++) {
                                $curr          = $i + 1;
                                $data['Title'] = "[$curr/$totalMail]" . $title;
                                if ($i !== 0) {
                                    $data['Money']   = 0;
                                    $data['Billing'] = 0;
                                }
                                $data['AttachmentItems'] = $allAttachmentItems[$i];

                                $sendResult              = sendMail($data, $response);
                            }
                        } else {
                            $sendResult = sendMail($data, $response);
                        }

                        if ($sendResult === 200) {

                            $smst = $localPdo->prepare("insert into `activity_participation`(account_id,character_id,activity_id,option_id,participation_time) values(:account_id,:character_id,:activity_id,:option_id,:participation_time)");

                            $smst->bindValue(':account_id', $_SESSION['user']['id']);
                            $smst->bindValue(':character_id', $characterId);
                            $smst->bindValue(':activity_id', $activityId);
                            $smst->bindValue(':option_id', $optionId);
                            $smst->bindValue(':participation_time', date('Y-m-d H:i:s'));
                            if ($smst->execute()) {
                                $errMsg = "礼包领取成功，请查看邮箱~";
                            }
                        } else {
                            $errMsg = "领取失败，请稍后再试！" . $response;
                        }
                    }
                }
            }

        }


    }

} else {
    $errMsg = '';
}

?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>账号登录</title>
    <style>
        body {
            background-color: #121212;
            color: #ffffff;
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
        }

        header {
            text-align: center;
            padding: 20px;
            background-color: #1f1f1f;
        }

        header h1 {
            margin: 0;
            font-size: 2.5em;
        }

        header p {
            margin: 0;
            font-size: 1.2em;
            color: #bbbbbb;
        }

        main {
            padding: 20px;
        }

        section {
            margin-bottom: 40px;
        }

        h2 {
            border-bottom: 2px solid #444444;
            padding-bottom: 10px;
        }

        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
        }

        article {
            margin-bottom: 20px;
        }

        button {
            background-color: #1e90ff;
            color: #ffffff;
            border: none;
            padding: 10px 20px;
            font-size: 1.2em;
            cursor: pointer;
            border-radius: 5px;
            text-decoration: none;
        }

        button:hover {
            background-color: #1c7ecf;
        }

        footer {
            text-align: center;
            padding: 10px;
            background-color: #1f1f1f;
            color: #bbbbbb;
        }

        .btn {
            text-decoration: none;
            color: #666666;
            text-wrap: none;
        }

        .btn:hover {
            color: #1c7ecf;
        }

        #start {
            overflow: hidden;
        }

        .center-cont {
            float: left;
        }

        .btn-cont {
            float: right;
        }

        .center {
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
<header>
    <img src="static/img/aaemu-logo.png" alt="ArcheAge 游戏">
    <!--    <a style="font-size: 60px; color: #666666;font-weight: bold;text-decoration: none;" href="/">随时跑路的上古</a>-->
</header>
<main>
    <section id="start">
        <!--<h2>开始游戏</h2>
        <p>点击下方按钮，下载并安装客户端，开始你的 Archeage 冒险之旅。</p>-->
        <div class="center-cont">
            <button onclick="startGame('MA==')">开始游戏</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn" href="./Patcher.exe">下载启动器</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn" href="https://github.com/AAEmu/AAEmu/wiki/Client" target="_blank">下载游戏本体</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn" href="https://github.com/AAEmu/AAEmu/" target="_blank">查看开源项目</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn" href="https://discord.gg/Q3MYVbfeaS" target="_blank">加入Discord</a>
        </div>
        <div class="btn-cont">
            <?php if (empty($_SESSION['user'])): ?>
                <a href="login.php" class="btn">登录</a>
                <a href="register.php" class="btn">注册</a>
            <?php else: ?>
                <i style="color: #bbbbbb">Welcome</i> <i><?= $_SESSION['user']['username'] ?></i>, <a href="logout.php"
                                                                                                      class="btn">退出登录</a>
            <?php endif; ?>
        </div>
    </section>
    <section>
        <div class="center" style="width: 300px">
            <form action="activity.php" method="post">
                <div class="item" style="margin-bottom: 15px;">
                    <label style="font-size: 18px;color: #bbbbbb;">活动：</label>
                    <select style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                            name="activity_id" id="activity-select" onchange="changeActivity(this)">
                        <?php
                        $activityList = getActivities();
                        foreach ($activityList as $item) {
                            ?>
                            <option value="<?= $item['id'] ?>" data-tip="<?= $item['description'] ?>">
                                <?= $item['name'] ?>
                            </option>
                        <?php } ?>
                    </select>
                </div>
                <div class="item" style="margin-bottom: 15px;">
                    <label style="font-size: 18px;color: #bbbbbb;">选项：</label>
                    <select style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                            name="option_id" id="activity-option-select" onchange="changeActivityOption(this)">
                        <?php
                        $options = getActivityOptions(1);
                        foreach ($options as $item) {
                            ?>
                            <option value="<?= $item['id'] ?>" data-tip="<?= $item['description'] ?>">
                                <?= $item['title'] ?>
                            </option>
                        <?php } ?>
                    </select>
                </div>
                <div class="item" style="margin-bottom: 15px;">
                    <label style="font-size: 18px;color: #bbbbbb;">区服：</label>
                    <select style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                            name="server_id">
                        <?php
                        $serverList = get_server_list();
                        foreach ($serverList as $item) {
                            ?>
                            <option value="<?= $item['id'] ?>">
                                <?= $item['name'] ?>
                            </option>
                        <?php } ?>
                    </select>
                </div>
                <div class="item" style="margin-bottom: 15px;">
                    <label style="font-size: 18px;color: #bbbbbb;">角色：</label>
                    <select style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                            name="character_id">
                        <?php
                        $characterList = getCharactersByAccountId(2, $_SESSION['user']['id']);
                        foreach ($characterList as $item) {
                            ?>
                            <option value="<?= $item['id'] ?>">
                                <?= $item['name'] ?>
                            </option>
                        <?php } ?>
                    </select>
                </div>
                <div class="item">
                    <input type="submit" value="领取"
                           style="width: 100px;height: 36px;line-height: 36px;background: #1c7ecf;border: none;border-radius: 3px;color: white;">
                </div>

                <?= $errMsg ?>
            </form>

            <div class="tips-group">
                <div class="tip-item">
                    <h4>活动说明：</h4>
                    <div id="activity-tip"></div>
                </div>
                <div class="tip-item">
                    <h4>礼包说明：</h4>
                    <div id="option-tip"></div>
                </div>
            </div>
        </div>
    </section>
</main>
<footer>
    <p>&copy; 2024 AAEmu 项目组. 保留所有权利.</p>
</footer>
<script>
    function changeActivityOption(e) {
        let selectedIndex = e.selectedIndex;
        let option = e.options[selectedIndex];
        let tip = option.attributes['data-tip'];
        document.getElementById("option-tip").innerText = tip.value;
    }

    function changeActivity(e) {
        let selectedIndex = e.selectedIndex;
        let option = e.options[selectedIndex];
        let tip = option.attributes['data-tip'];
        document.getElementById("activity-tip").innerText = tip.value;
    }

    document.getElementById('activity-select').onchange();
    document.getElementById('activity-option-select').onchange();
</script>
<script>
    function startGame(gid) {


        <?php if(empty($_SESSION['user'])):?>
        window.location = 'login.php';
        return;
        <?php endif ?>

        let launcherWindow = window.open('aelcf://aaemu.yanlongli.com/A/nQUFFbXUtWWFubG9uZ2xp/adHJpbm9fMV8y/waHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29t/LemhfY24%3D/lemhfY24%3D/faHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29tL25ld3NmZWVkLw%3D%3D/xaHR0cHM6Ly9hYWVtdS1wYXRjaC55YW5sb25nbGkuY29tLw==/u<?=base64_encode($_SESSION['user']['username'] ?? '')?>/p<?=base64_encode(bin2hex(base64_decode($_SESSION['user']['password'] ?? '')))?>/g' + gid);
        //let launcherWindow = window.open('aelcf://127.0.0.1/A/nQUFFbXUtWWFubG9uZ2xp/adHJpbm9fMV8y/waHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29t/LemhfY24%3D/lemhfY24%3D/faHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29tL25ld3NmZWVkLw%3D%3D/xaHR0cHM6Ly9hYWVtdS1wYXRjaC55YW5sb25nbGkuY29tLw==/u<?php //=base64_encode($_SESSION['user']['username'] ?? '')?>///p<?php //=base64_encode(bin2hex(base64_decode($_SESSION['user']['password'] ?? '')))?>///g' + gid + '/sdHJ1ZQ==');

        if (!launcherWindow) {
            alert("游戏启动失败，请先下载启动器！");
        } else {
            launcherWindow.document.write(`<H1>正在启动游戏......</H1>`);
            // Set a timeout to check if the schema was handled
            timeout = setTimeout(function () {
                // If the new window is still open after the timeout, it means the schema was not handled
                if (!launcherWindow.closed) {
                    launcherWindow.document.write(`<H1>启动失败，<a class="btn download" href="https://aaemu.yanlongli.com/Patcher.exe">点击下载启动器</a></H1> <p>游戏客户端本体因较大，请提前下载。</p><a href="https://github.com/AAEmu/AAEmu/wiki/Client">下载游戏客户端本体</a>`);
                }
            }, 2000);
        }

        //
    }
</script>
</body>
</html>
