<?php
include_once 'common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    unset($_SESSION['user']);
    $username = $_POST['username'];
    $password = $_POST['password'];

    $password = base64_encode(hash('sha256', $password, true));

    $stmt = $pdo->prepare('select * from `users` where username = :username and password = :password');

    $stmt->bindValue(':username', $username);
    $stmt->bindValue(':password', $password);

    if (!$stmt->execute()) {
        $errMsg = '查询失败，请稍后再试~';
    }

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        $errMsg = '账号或密码不存在';
    } else {
        $_SESSION['user'] = $result;
        $errMsg = '登录成功';

        Header('Location: index.php');
    }

} else {
    $username = '';
    $password = '';
    $errMsg   = '';
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

        .center{
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
            <a class="btn" href="./Launcher.7z">下载启动器</a>
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
            <form action="login.php" method="post">
                <div class="item" style="margin-bottom: 15px;">
                    <label style="font-size: 18px;color: #bbbbbb;">账号：</label>
                    <input style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa" type="text" name="username" placeholder="请输入您的账号" value="<?= $username ?>">
                </div>
                <div class="item" style="margin-bottom: 15px;">
                    <label style="font-size: 18px;color: #bbbbbb;">密码：</label>
                    <input style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa" type="password" name="password" placeholder="请输入您的密码">
                </div>
                <div class="item">
                    <input type="submit" value="登录" style="width: 100px;height: 36px;line-height: 36px;background: #1c7ecf;border: none;border-radius: 3px;color: white;">
                    <a href="register.php" style="color: #666666;">没有账号？请先注册</a>
                </div>

                <?= $errMsg ?>
            </form>
        </div>
    </section>
</main>
<footer>
    <p>&copy; 2024 AAEmu 项目组. 保留所有权利.</p>
</footer>
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
                    launcherWindow.document.write(`<H1>启动失败，<a class="btn download" href="https://aaemu.yanlongli.com/Launcher.7z">点击下载启动器</a></H1> <p>游戏客户端本体因较大，请提前下载。</p><a href="https://github.com/AAEmu/AAEmu/wiki/Client">下载游戏客户端本体</a>`);
                }
            }, 2000);
        }

        //
    }
</script>
</body>
</html>
