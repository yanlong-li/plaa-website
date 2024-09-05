<?php
include_once 'common.php';
$errMsg = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_SESSION['user'] = null;
    $username         = $_POST['username'] ?? '';
    $password         = $_POST['password'] ?? '';

    if (empty($username)) {
        $errMsg = '账号不能为空';
    }

    if (empty($errMsg) && !ctype_alnum($username)) {
        $errMsg = '账号只能是数字、字母';
    }

    if (empty($errMsg) && strlen($username) > 16 || strlen($username) < 4) {
        $errMsg = '账号长度限制 4-16';
    }

    if (empty($errMsg) && empty($password)) {
        $errMsg = ("密码不能为空");
    }

    if (empty($errMsg) && (strlen($password) < 6 || strlen($password) > 32)) {
        $errMsg = ("密码长度限制 6-32 位");
    }

    $password = base64_encode(hash('sha256', $password, true));


    if (empty($errMsg)) {
        /** @var PDO $pdo */
        $prepare = $pdo->prepare("select exists(select * from `users` where username = :username limit 1)");
        $prepare->bindParam(':username', $username);
        if (!$prepare->execute()) {
            $errMsg = '查询失败，请稍后再试';
        }

        if (empty($errMsg) && $prepare->fetchColumn()) {
            $errMsg = '用户名已存在';
        }

        if (empty($errMsg)) {
            $smst = $pdo->prepare("insert into `users`(username,password,last_login,last_ip,created_at,updated_at,email) values(:username,:password,:last_login,:last_ip,:created_at,:updated_at,'')");

            $smst->bindValue(':username', $username);
            $smst->bindValue(':password', $password);
            $smst->bindValue(':last_login', time());
            $smst->bindValue(':last_ip', $_SERVER['REMOTE_ADDR']);
            $smst->bindValue(':created_at', time());
            $smst->bindValue(':updated_at', time());

            if ($smst->execute()) {
                $errMsg = ("注册成功,您的ID为" . $pdo->lastInsertId());

                $result           = [
                    'id'         => $pdo->lastInsertId(),
                    'username'   => $username,
                    'password'   => $password,
                    'email'      => '',
                    'last_login' => time(),
                    'last_ip'    => $_SERVER['REMOTE_ADDR'],
                    'created_at' => time(),
                    'updated_at' => time(),
                ];
                $_SESSION['user'] = $result;
                Header('Location: index.php');
            } else {
                $errMsg = ("注册失败，请稍后再试~");
            }
        }

    }
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>账号中蹙额</title>
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
<!--    <img src="static/img/aaemu-logo.png" alt="ArcheAge 游戏">-->
    <a style="font-size: 60px; color: #666666;font-weight: bold;text-decoration: none;" href="/">随时删档跑路的上古</a>
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
            <form action="" method="post">
                <div class="item" style="margin-bottom: 15px;">
                    <label for="username" style="font-size: 18px;color: #bbbbbb;">账号：</label>
                    <input style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                           id="username" type="text" name="username" placeholder="请输入您要注册的账号 支持数字字母">
                </div>
                <div class="item" style="margin-bottom: 15px;">
                    <label for="password" style="font-size: 18px;color: #bbbbbb;">密码：</label>
                    <input style="font-size: 16px;height: 24px;background: #333333;border: none;border-radius: 5px;color: #aaaaaa"
                           id="password" type="password" name="password" placeholder="6-32位数字、字母、下划线">
                </div>
                <div class="item">
                    <input type="submit" value="注册"
                           style="width: 100px;height: 36px;line-height: 36px;background: #1c7ecf;border: none;border-radius: 3px;color: white;">
                    <a href="login.php" style="color: #666666;">已有账号？前往登录。</a>
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
                    launcherWindow.document.write(`<H1>启动失败，<a class="btn download" href="https://aaemu.yanlongli.com/Patcher.exe">点击下载启动器</a></H1> <p>游戏客户端本体因较大，请提前下载。</p><a href="https://github.com/AAEmu/AAEmu/wiki/Client">下载游戏客户端本体</a>`);
                }
            }, 2000);
        }

        //
    }
</script>
</body>
</html>
