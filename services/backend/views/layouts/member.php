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
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="_csrf_parameter" content="_csrf"/>
    <meta name="_csrf_header" content="X-CSRF-TOKEN"/>
    <meta name="_csrf" content="ef55e0a6-3875-4ea9-b03e-6d4e34b5a984"/>
    <link rel="shortcut icon" type="image/x-icon" href="/resources-202412261502/images/favicon_xlgames.ico">
    <meta name="fbTitle" content="XLGAMES Global member"/>
    <meta property="og:title" content="XLGAMES Global member"/>
    <meta name="description" content="Be the XLGAMES' Global member and start a new advneture.">
    <meta property="og:description" content="Be the XLGAMES' Global member and start a new advneture."/>
    <link rel="stylesheet" href="/resources-202412261502/css/style.css"/>
    <!--[if lt IE 9]>
    <script type="text/javascript" src="/static_resources/js/lib/html5/1.6.2/html5.js"></script>
    <![endif]-->

    <title><?= Html::encode($this->title) ?></title>
    <meta name="fbTitle" property="og:title" content="<?= Html::encode($this->title) ?>"/>
    <?php $this->head() ?>
</head>
<body>
<div class="gnbWrapper">
    <header role="banner" id="portal-gnb" class="portal-gnb">
        <div class="company-gnb">
            <h1 class="global-gnb-logo">XLGAMES</h1>
            <ul class="company-site">
                <li><a href="/">ArcheWorld</a></li>
                <li><a href="https://www.xbluesalt.io">xBlueSalt</a></li>
            </ul>
        </div>
        <div class="account-util">
            <ul>

                <li><a href="/user/join/agreement" class="link-util"><i
                                class="ico-join"></i> <span>Sign Up</span></a></li>
                <li><a href="/user/login/form" class="btn-portal-login"><i class="ico-login"></i>
                        <span>Log In</span></a></li>


            </ul>

        </div>
    </header>


</div>

<div id="wrapperContent">

    <?php $this->beginBody() ?>
    <?= $content ?>
    <?php $this->endBody() ?>
    <!--footer-->

    <footer class="footer">
        <i class="logo-xlgames">XLGAMES</i>
        <ul class="menu-footer">
            <li><a href="https://company.xlgames.com/en" target="_blank">About us</a><i
                        class="global-gnb-footer-line">|</i></li>
            <li><a href="https://member.archeworld.com/legal/service/service">Terms of Service</a><i
                        class="global-gnb-footer-line">|</i></li>
            <li><a href="https://member.archeworld.com/legal/privacy/privacy"><strong>Privacy Policy</strong></a></li>
        </ul>
        <span>Copyright © <strong class="b">XL</strong><strong>GAMES</strong> Inc. All rights reserved.</span>
    </footer>

</div>

<script type="text/javascript" src="/static_resources/js/lib/jquery/1.10.2/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/static_resources/js/lib/jquery.cookie/20110127/jquery.cookie.min.js"></script>
<script type="text/javascript" src="/static_resources/js/lib/jquery.ui/1.9.2/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript"
        src="/static_resources/js/lib/jquery.outsideevents/1.1/jquery.ba-outside-events.min.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/xlgames.core.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/cookie/authUpdateCookie_service.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/localization/message.en.js"></script>

<script type="text/javascript">
    (function ($) {
        "use strict";
        if (typeof window.XLGames === "undefined") {
            window.XLGames = {};
        }
        if (typeof XLGames.LoginUser === "undefined") {
            XLGames.LoginUser = {};
        }

        XLGames.isMobileView = false;
        XLGames.isMobileBrowser = false;

        XLGames.LoginUser.isGuest = true;

        XLGames.LoginUser.isRestrictedAccount = false;


        XLGames.LoginUser.isCertified = true;

        XLGames.LoginUser.isReserveCancelingUser = (XLGames.LoginUser.isReserveUser || XLGames.LoginUser.isCancelingUser);
        XLGames.LoginUser.walletAuthType = '';
        XLGames.LoginUser.isGoogle = 'false' == 'true';
        XLGames.LoginUser.walletAddress = '';

        XLGames.currentFullUrl = "/user/login/form";
        XLGames.currentLanguage = 'en';
        XLGames.currentRegion = '';
        XLGames.imgPrefix = '/resources-202412261502/images';
        XLGames.walletNetworkId = "77001";
        XLGames.UPDATE_AUTH_COOKI_NAME = 'member-update-auth';
        XLGames.COOKIE_DOMAIN = "archeworld.com";
        XLGames.domains = {
            account: "https://member.archeworld.com",
            archeworld: "https://www.archeworld.com",
            xbluesalt: "https://www.xbluesalt.io",
            cookieDomain: 'archeworld.com'
        }
    })(jQuery);
</script>
<script type="text/javascript">
    $(document).on('ready', function () {
        $(".link-help").on('click', function () {
            $(this).toggleClass("on");
            $(".global-gnb-util-help").toggle();
        }).on('clickoutside', function () {
            $(".link-help").removeClass("on");
            $(".global-gnb-util-help").hide();
        });
    });
</script>
<script type="module">
    import {createApp} from "/resources-202412261502/js/lib/vue.js/3.2.47/vue.js";
    import {regionApp} from "/resources-202412261502/js/region/region_service.min.js";

    const app = createApp(regionApp);
    app.config.globalProperties.AL10N = AL10N;
    app.config.globalProperties.globalData = {
        currentLang: XLGames.currentLanguage,
        domains: XLGames.domains,
    }
    app.mount("#regionContainer");
</script>


<script type="module">
    import {createApp} from "/resources-202412261502/js/lib/vue.js/3.2.47/vue.js";
    import {cookieApp} from "/resources-202412261502/js/cookie/cookiemanage_service.min.js";

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

</body>
</html>
<?php $this->endPage() ?>
