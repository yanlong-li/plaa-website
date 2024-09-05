<?php
include_once 'common.php';
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AAEmu 项目</title>
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
    <img src="static/img/aaemu-logo.png" alt="ArcheAge 游戏" onclick="window.location = ''">
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
            <a class="btn" href="./activity.php">活动专题</a>
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
    <section id="intro">
        <h2>项目介绍</h2>
        <p>AAEmu 是一个针对 ArcheAge 游戏的服务端模拟项目，旨在让玩家能够在自定义服务器上体验 ArcheAge
            的乐趣。项目致力于提供高性能、稳定的服务端，实现游戏的各项功能和特性。</p>
    </section>
    <section id="announce">
        <h2>服务公告</h2>
        <p>所有游戏服务器均由社区玩家自建，服务由腐主提供支持，本站不提供任何收费及增值服务。</p>
        <p>禁止RMB交易，无充值、无点券。初始等级50，赠送房屋x1、南瓜田x1、保管箱x1、跑车x1、鱼叉快艇x1。</p>
        <p>房屋建造免材料、免税票，上线自动延期90天。</p>
        <p>在线每小时赠送一次礼包，1小时5金币1星星，2小时10金币2星星，3小时15金币3星星，以此类推无上限。</p>
    </section>

    <section id="server">
        <h2>社区服务器列表</h2>
        <?php
        $list = get_server_list();
        foreach ($list as $item) { ?>
            <p data-id="<?= $item['id'] ?>">[<?= $item['locale'] ?>]&nbsp;<?= $item['name']; ?>&nbsp;-&nbsp;[离线]
                &nbsp;&nbsp;&nbsp;&nbsp;<?= $item['description'] ?>
            </p>
        <?php } ?>
    </section>
    <section id="news">
        <h2>新闻动态</h2>
        <article>
            <h3>2024年7月29日 - 服务器</h3>
            <p>修复在幻想岛、副本等位置通过传送掉入水中问题。</p>
        </article>
        <article>
            <h3>2024年7月28日 - 服务器</h3>
            <p>修复塔防玩法，征兆之痕不刷新、不移动问题。</p>
        </article>
        <article>
            <h3>2024年7月23日 - 服务器</h3>
            <p>修复重复点击客户端窗口重复倒计时、倒计时无法取消问题。</p>
        </article>
        <article>
            <h3>2024年7月22日 - 服务器</h3>
            <p>修复传送书目录未汉化问题。</p>
        </article>
        <article>
            <h3>2024年7月16日 - 启动器</h3>
            <p>
                优化启动器，支持通过URL启动时设定界面显示语言、游戏客户端语言，优化启动器打开需要等待版本检测无法立即操作问题。</p>
        </article>
        <article>
            <h3>2024年6月19日 - 服务器</h3>
            <p>修复存在多个服务器时，服务器列表加载缓慢问题。</p>
        </article>
        <article>
            <h3>2019年1月7日 - 重构</h3>
            <p>因为原始代码很糟糕，且无法跨平台。新的爱好者重新创建了一个新的项目并开始重构。越来越多的爱好者参与到其中</p>
        </article>
        <article>
            <h3>2017年11月7日或更早</h3>
            <p>我发现了这个被放弃的项目并基于此开始进行开发工作。 <a
                        href="https://github.com/NL0bP/Archeage-Server-emulator/tree/e716daa4956e441c38a6817a8c8c8046621deee0#diff-3f9be4db706126434ad19009ba9ae131cbbe1a2b70ea710a49895788e203f3dd">点击查看最初的介绍</a>
            </p>
        </article>
        <article>
            <h3>2013年或更早 - 一切的开端</h3>
            <p>一个最初版本的模拟器在外网RageZone被发布</p>
        </article>
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

        //let launcherWindow = window.open('plaa://aaemu.yanlongli.com/A/nQUFFbXUtWWFubG9uZ2xp/adHJpbm9fMV8y/waHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29t/LemhfY24%3D/lemhfY24%3D/faHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29tL25ld3NmZWVkLw%3D%3D/xaHR0cHM6Ly9hYWVtdS1wYXRjaC55YW5sb25nbGkuY29tLw==/u<?=base64_encode($_SESSION['user']['username'] ?? '')?>/p<?=base64_encode(bin2hex(base64_decode($_SESSION['user']['password'] ?? '')))?>/g' + gid);
        //let launcherWindow = window.open('aelcf://aaemu.yanlongli.com/A/nQUFFbXUtWWFubG9uZ2xp/adHJpbm9fMV8y/waHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29t/LemhfY24%3D/lemhfY24%3D/faHR0cHM6Ly9hYWVtdS55YW5sb25nbGkuY29tL25ld3NmZWVkLw%3D%3D/xaHR0cDovLzEyNy4wLjAuMTo4OC8%3D/u<?=base64_encode($_SESSION['user']['username'] ?? '')?>/p<?=base64_encode(bin2hex(base64_decode($_SESSION['user']['password'] ?? '')))?>/g' + gid + '/sdHJ1ZQ==');

        let launcherWindow = window.open('plaa://<?=get_token($_SESSION['user']['username'] ?? '',bin2hex(base64_decode($_SESSION['user']['password'] ?? '')))?>');

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
