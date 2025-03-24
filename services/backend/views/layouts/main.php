<?php

/** @var yii\web\View $this */

/** @var string $content */

use app\assets\AppAsset;
use yii\bootstrap5\Html;

AppAsset::register($this);

$this->registerCsrfMetaTags();
$this->registerMetaTag(['charset' => Yii::$app->charset], 'charset');
$this->registerMetaTag(['name' => 'viewport', 'content' => 'width=device-width, initial-scale=1, shrink-to-fit=no']);
$this->registerMetaTag(['name' => 'description', 'content' => $this->params['meta_description'] ?? '']);
$this->registerMetaTag(['name' => 'keywords', 'content' => $this->params['meta_keywords'] ?? '']);
$this->registerLinkTag(['rel' => 'icon', 'type' => 'image/x-icon', 'href' => Yii::getAlias('@web/favicon.ico')]);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <link rel="shortcut icon" type="image/x-icon" href="/resources-202501091402/images/common/favicon.ico"/>
    <link rel="icon" type="image/x-icon" href="/resources-202501091402/images/common/favicon.ico"/>
    <link rel="apple-touch-icon" href="/resources-202501091402/images/common/home.png"/>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/resources-202501091402/images/common/home.png">
    <meta name="theme-color" content="#ffffff">
    <meta name="keyword"
          content="ArcheWorld, ArcheAge, Arche, PC Game, Online Game, MMORPG, Free Game, NFT Game, Blockchain Game, P2E Game, Crypto Game"/>
    <meta property="og:title" content="ArcheWorld"/>
    <meta property="og:site_name" content="ArcheWorld"/>
    <meta property="og:url" content="https://www.archeworld.com/"/>
    <meta property="og:image" content="/resources-202501091402/images/sns.jpg"/>
    <meta property="og:description"
          content="A free play NFT MMORPG on PC that recognizes the users’ ownership of in-game assets, ArcheWorld."
          name="fbDescription"/>
    <meta name="description"
          content="A free play NFT MMORPG on PC that recognizes the users’ ownership of in-game assets, ArcheWorld."/>
    <meta name="naver-site-verification" content="fd5dd3230b7a27fa430eeb9aa28e8be49dccc85c"/>
    <!--[if lt IE 9]>
    <script type="text/javascript" src="/resources-202501091402/js/share/lib/html5shiv/html5shiv.min.js"></script>
    <![endif]-->
    <meta name="_csrf_header" content="X-CSRF-TOKEN"/>
    <meta name="_csrf_parameter" content="_csrf"/>
    <meta name="_csrf" content="a5684b3b-9be1-450e-86b4-469df84c76ab"/>
    <meta name="viewport" content="width=device-width,user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <link href="/resources-202501091402/css/swiper-bundle.min.css" rel="stylesheet"/>


    <?php if (isset($this->blocks['common'])): ?>
        <?= $this->blocks['common'] ?>
    <?php else: ?>
        <link href="/resources-202501091402/css/common.css" media="screen and (min-width:1200px)" rel="stylesheet"/>
        <link href="/resources-202501091402/css/common_t.css"
              media="screen and (min-width:768px) and (max-width:1199px)"
              rel="stylesheet"/>
        <link href="/resources-202501091402/css/common_m.css" media="screen and (max-width:767px)" rel="stylesheet"/>
    <?php endif; ?>
    <title><?= Html::encode($this->title) ?></title>
    <meta name="fbTitle" property="og:title" content="<?= Html::encode($this->title) ?>"/>
    <?php $this->head() ?>
    <?php if (isset($this->blocks['head'])): ?>
        <?= $this->blocks['head'] ?>
    <?php endif; ?>
</head>
<body>
<div class="wrap">
    <div class="wrap-head">
        <div class="gnbWrapper">
            <header role="banner" id="portal-gnb" class="portal-gnb">
                <div class="company-gnb">
                    <h1 class="global-gnb-logo">XLGAMES</h1>
                    <ul class="company-site">
                        <li><a href="/">上古世界</a></li>
                        <li><a href="/xbluesalt">蓝盐商会</a></li>
                    </ul>
                </div>
                <div class="account-util">
                    <ul>
                        <?php if (Yii::$app->user->isGuest): ?>
                            <li><a href="/user/join/agreement" class="link-util"><i
                                            class="ico-join"></i> <span>加入</span></a></li>
                            <li><a href="/user/login/form" class="btn-portal-login"><i class="ico-login"></i>
                                    <span>登录</span></a></li>
                        <?php else: ?>
                            <li><a href="/user/mypage" class="link-util"><i class="ico-mypage"></i>
                                    <span>我的信息</span></a>
                            </li>
                            <li><a href="/user/logout" class="btn-portal-login"><i class="ico-logout"></i>
                                    <span>退出登录</span></a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>
            </header>
        </div>

        <header id="common-masthead">
            <div class="masthead">
                <h1>
                    <a href="/" class="bi">ArcheWorld</a>
                </h1>
                <a href="#global-navi" class="nav-menu">菜单</a>
                <div class="global-navi-side" id="global-navi">
                    <div class="masthead-navi-bi">
                        <a href="/" class="navi-bi"></a>
                        <div class="navi-bar"></div>
                    </div>
                    <nav role="navigation" id="common-navi" class="masthead-navi">
                        <div class="gnb-on"></div>
                        <h2>菜单</h2>
                        <ul class="navi">
                            <li class="m1" id="menu_news"><a href="/news">新闻</a></li>
                            <li class="m2" id="menu_guide"><a href="/guide">引导</a></li>
                            <li class="m4" id="menu_Community"><a
                                        href="https://discord.com/invite/archeworld-935064183244988446" target="_blank">频道</a>
                                <div class="sub-navi">
                                    <ul>
                                        <li><a href="https://discord.com/invite/archeworld-935064183244988446"
                                               target="_blank">Discord <i class="ico-blank-sub"></i></a></li>
                                        <li><a href="https://x.com/ArcheWorld_NFT" target="_blank">X <i
                                                        class="ico-blank-sub"></i></a></li>
                                        <li><a href="https://t.me/ArcheWorld_nft" target="_blank">Telegram <i
                                                        class="ico-blank-sub"></i></a></li>
                                        <li><a href="https://www.youtube.com/channel/UCr6VSErE34grhDrxqutPr0A"
                                               target="_blank">YouTube <i class="ico-blank-sub"></i></a></li>
                                    </ul>
                                </div>
                            </li>
                            <li class="m5" id="menu_xbluesalt"><a href="/xbluesalt" class="navi-link">蓝盐商会</a>
                                <div class="sub-navi">
                                    <ul>
                                        <li id="menu_sub_bslt"><a href="/xbluesalt/deposit"
                                                                  class="region-link">BSLT</a></li>
                                        <li id="menu_sub_staking"><a href="/xbluesalt/staking">Staking</a>
                                        </li>
                                        <li id="menu_sub_coupon"><a href="/xbluesalt/coupon"
                                                                    class="region-link">Coupon</a></li>
                                        <li id="menu_sub_scope"><a href="/xbluesalt/scope"
                                                                   class="region-link">Scope</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li class="m6" id="menu_help"><a href="/help/faq" class="navi-link">客户支持</a>
                                <div class="sub-navi">
                                    <ul>
                                        <li id="menu_sub_faq"><a href="/help/faq">常见问题</a></li>
                                        <li id="menu_sub_form"><a href="/help/inquiry/form">票据</a></li>
                                        <li id="menu_sub_list"><a href="/help/inquiry/list">票据历史</a></li>
                                        <li id="menu_sub_otp"><a href="/security/otp">二次验证</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div class="game-start">
                        <a href="javascript:;" class="loginRequired">开始游戏</a>
                    </div>

                </div>
                <?php if (Yii::$app->user->isGuest): ?>
                    <a href="/user/login/form?forwardUrl=https://www.archeworld.com/" class="nav-login">登录</a>
                <?php else: ?>
                    <a href="/user/logout?spring-security-redirect=https://www.archeworld.com/" class="nav-logout">Log
                        Out</a>
                <?php endif; ?>
            </div>
            <div class="global-navi-outer">
                <a href="javascript:;" class="btn-navi-close">关闭</a>
            </div>
            <div class="navi-in-bg"></div>
        </header>
    </div>
    <?php $this->beginBody() ?>
    <section class="container">
        <?= $content ?>
    </section>
    <?php $this->endBody() ?>
    <!--footer-->

    <footer class="footer">
        <div class="footer-inner">
            <ul class="sns-area">
                <li><a href="https://discord.com/invite/archeworld-935064183244988446" target="_blank"><i
                                class="ico-discord-black"></i></a></li>
                <li><a href="https://x.com/ArcheWorld_NFT" target="_blank"><i class="ico-x-black"></i></a></li>
                <li><a href="https://t.me/ArcheWorld_nft" target="_blank"><i class="ico-telegram-black"></i></a></li>
                <li><a href="https://www.youtube.com/channel/UCr6VSErE34grhDrxqutPr0A" target="_blank"><i
                                class="ico-youtube-black"></i></a></li>
            </ul>
            <div class="footer-bi"><a href="https://company.xlgames.com/en">XLGAMES</a></div>
            <ul class="footer-util">
                <li><a href="/" target="_blank">关于我们</a></li>
                <li><a href="/legal/service">服务条款</a></li>
                <li><a href="/legal/privacy">隐私协议</a></li>
                <li><a href="/policy/operational">业务政策</a></li>
            </ul>
            <div class="copyright">Copyright &copy; XLGAMES Inc. All rights reserved.</div>
        </div>
    </footer>
    <script type="text/javascript" src="/resources-202501091402/js/share/lib/jquery/1.12.4/jquery-min.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/share/lib/jquery.ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript"
            src="/resources-202501091402/js/share/lib/jquery.cookie/1.4.1/jquery.cookie.js"></script>
    <script type="text/javascript"
            src="/resources-202501091402/js/share/lib/swiper/8.0.6/swiper-bundle.min.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/share/lib/iscroll/iscroll-lite.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/share/xlgames.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/share/xlgames_modal.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/share/xlgames_common_ui.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/header/navigation.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/cookie/authUpdateCookie_service.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/weblauncher/weblauncher.js"></script>
    <script type="text/javascript">
        (function ($) {
            "use strict";
            if (typeof window.XLGames === "undefined") {
                window.XLGames = {};
            }
            if (typeof XLGames.LoginUser === "undefined") {
                XLGames.LoginUser = {};
            }

            XLGames.currentMenu = '';
            XLGames.currentMenuGroup = '';
            XLGames.isMobileView = false;
            XLGames.LoginUser.isGuest = true;

            <?php if (!Yii::$app->user->isGuest): ?>
            // region 登录用户信息
            XLGames.LoginUser.isGuest = false;
            XLGames.LoginUser.nickname = '';
            XLGames.LoginUser.isRestrictedAccount = false;
            XLGames.LoginUser.isCertified = true;
            XLGames.LoginUser.walletAuthType = 'CHANNELING';
            XLGames.LoginUser.isGoogle = 'true' === 'true';
            XLGames.LoginUser.walletAddress = '0xffffffffffffffffffffffffffffffffffffffff'
            // endregion
            <?php endif; ?>


            XLGames.currentLanguage = 'zh-CN';
            XLGames.envTimeZone = 'Asia/Seoul';
            XLGames.imgPrefix = '/resources-202501091402/images';
            XLGames.currentFullUrl = 'https://www.archeworld.com/news/621';
            XLGames.needAgree = false;

            XLGames.webLauncherUrl = "/aw-download1.archeworld.com/launcher/updates";
            XLGames.UPDATE_AUTH_COOKI_NAME = 'member-update-auth';
            XLGames.COOKIE_DOMAIN = "plaa.top";
            XLGames.currentRegion = 'ASIA';
            XLGames.walletNetworkId = '77001';
            XLGames.domains = {
                archeworld: "https://www.plaa.top",
                account: "",
                cs: "",
                xlcach: "https://bslt.asia.xbluesalt.io",
                bslt: "https://bslt.asia.xbluesalt.io",
                scope: "https://scope.asia.xbluesalt.io",
                xbluesalt: "https://www.xbluesalt.io",
                cookieDomain: "plaa.com"
            }
        })(jQuery);
    </script>
    <!--    <script type="text/javascript" src="/resources-202501091402/js/share/i18n/message_en.js"></script>-->
    <script type="text/javascript" src="/resources-202501091402/js/share/i18n/message_zh-CN.js"></script>

    <script type="text/javascript" src="/resources-202501091402/js/mboard/mboard.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/share/calendar.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/mboard/wikiEditor.js"></script>
    <script type="text/javascript" src="/resources-202501091402/js/search/search_service.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            new XLGames.Board.Show('HTML');
        });
    </script>


    <script type="text/javascript">
        $(document).ready(function () {
            new XLGames.IScroll('slider', 'tabCategory');
            XLGames.CommonUI.loginRequired();
            XLGames.CommonUI.certfyRequired();
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', vh + 'px');
            window.addEventListener('resize', function () {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
            });
        });
    </script>

    <script type="module">
        import {createApp} from "/resources-202501091402/js/share/lib/vue.js/3.2.47/vue.js";
        import {regionApp} from "/resources-202501091402/js/region/region_service.min.js";

        const app = createApp(regionApp);
        app.config.globalProperties.AL10N = AL10N;
        app.config.globalProperties.globalData = {
            currentLang: XLGames.currentLanguage,
            domains: XLGames.domains,
        }
        app.mount("#regionContainer");
    </script>


    <script type="module">
        import {createApp} from "/resources-202501091402/js/share/lib/vue.js/3.2.47/vue.js";
        import {cookieApp} from "/resources-202501091402/js/cookie/cookiemanage_service.min.js";

        const app = createApp(cookieApp);
        app.config.globalProperties.globalData = {
            currentLang: XLGames.currentLanguage,
            domains: XLGames.domains
        }
        app.mount("#cookieRegionContainer");
    </script>
    <?php if (isset($this->blocks['script'])): ?>
        <?= $this->blocks['script'] ?>
    <?php endif; ?>
    <!--end footer-->
</body>
</html>
<?php $this->endPage() ?>
