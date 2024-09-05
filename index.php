<?php
include_once 'common.php';
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>随时删档跑路的上古</title>
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
            <a class="btn" href="./activity.php">活动专题</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn" href="https://pan.quark.cn/s/9b7a76858d95" target="_blank">下载游戏</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn" href="https://qm.qq.com/q/h7TMOhVhXG" target="_blank">加入QQ群</a>
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
    <section id="announce">
        <h2>服务公告</h2>
        <p>游戏服务器均由社区玩家自建，服务由腐主提供支持，本站不提供任何收费及增值服务。</p>
        <p>禁止RMB交易，无充值、无点券。初始等级50，赠送房屋x1、南瓜田x1、保管箱x1、跑车x1、鱼叉快艇x1。</p>
        <p>房屋建造免材料、免税票，上线自动延期90天。</p>
        <p>在线每小时赠送一次礼包，1小时5金币1星星，2小时10金币2星星，3小时15金币3星星，以此类推无上限。</p>
    </section>
    <section id="news">
        <h2>新闻动态</h2>
        <article>
            <h3>开启删档测试 - 2024年9月1日</h3>
            <p>1、去除回归的继承者武器包、改为熟练的冒险家武器包</p>
            <p>2、增加鱼叉快艇</p>
            <p>3、增加幻想塔雷、幻想雪狮</p>
            <p>4、增加为定居者准备的布、皮、板防具包</p>
            <p>5、增加武器、防具、饰品强化卷轴*200</p>
        </article>
        <article>
            <h3>准备阶段 - 2024年8月28日</h3>
            <p>尚未开放下载，请耐心等待</p>
        </article>
    </section>
</main>
<footer>
    <p>&copy; 2024 AAEmu 项目组. 保留所有权利.</p>
</footer>
<script>
    function startGame() {


        <?php if(empty($_SESSION['user'])):?>
        window.location = 'login.php';
        return;
        <?php endif ?>
        let launcherWindow = window.open('plaa://<?=get_token($_SESSION['user']['username'] ?? '', bin2hex(base64_decode($_SESSION['user']['password'] ?? '')))?>');
        if (!launcherWindow) {
            alert("游戏启动失败，请先下载启动器！");
        } else {
            launcherWindow.document.write(`<H1>正在启动游戏......</H1>`);
            // Set a timeout to check if the schema was handled
            let timeout = setTimeout(function () {
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
