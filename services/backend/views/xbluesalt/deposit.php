<?php
$this->title = 'Deposit | BlueSalt';
$this->beginBlock('head');
?>
    <link href="/www.xbluesalt.io/css/common.css" media="screen and (min-width:1200px)" rel="stylesheet"/>
    <link href="/www.xbluesalt.io/css/common_t.css" media="screen and (min-width:768px) and (max-width:1199px)"
          rel="stylesheet"/>
    <link href="/www.xbluesalt.io/css/common_m.css" media="screen and (max-width:767px)" rel="stylesheet"/>
<?php
$this->endBlock();
?>


    <section b-0tzexgq4wx class="container">

    <div class="contents">
        <h1 class="active"><a href="/xbluesalt/deposit">BSLT</a></h1>
        <h1><a href="/purchase">Purchase/ Cancellation</a></h1>
        <article class="contents-set">
            <div class="bslt-contents" id="main-content"></div>
        </article>
    </div>


    <?php
    $this->beginBlock('script');
    ?>
    <script src="/www.xbluesalt.io/lib/jquery/dist/jquery.min.js?v=82hEkGrSMJh3quMSG4f7FbngmAPLTDM63H4eNayS4Us"></script>
    <script src="/www.xbluesalt.io/lib/jquery-validation/dist/jquery.validate.min.js?v=eItLFOyfQ4d_OGzEnGchi2ZMVF8EhGgzS0k7fSOPifQ"></script>
    <script src="/www.xbluesalt.io/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js?v=BtVmVJsyUIncIatblQsAlI06bS8pb2yZBcrDOa7snJw"></script>
    <script src="/www.xbluesalt.io/lib/bootstrap/dist/js/bootstrap.bundle.min.js?v=rAnWnVnzChxAAi8NS-Ilr1mE7Sj-do-X_DqyilNsznM"></script>
    <script src="/www.xbluesalt.io/lib/handlebars/handlebars.min-v4.7.7.js?v=llJbL0jUMVvksfxnmoOodVb7A8tZuFG5yydSsPOcZV8"></script>
    <script src="/www.xbluesalt.io/lib/axios/axios.min.js?v=p6uupxi6sVUBj8kLGBFEAxtZs_P02uIPSJ4E1mhy1TU"></script>

<!--    <script type="text/javascript"-->
<!--            src="/www.xbluesalt.io/js/navigation.js?v=bp2A43NAh19KFQunkeLQPs12FMHFJtQ_YknxdojFJ4Q"></script>-->
<!--    <script type="text/javascript"-->
<!--            src="/www.xbluesalt.io/js/xlgames.js?v=LYFEYvOV7BbeCJFiRefqT3-DhcS3nVDMgZNOQtI1kB4"></script>-->
<!--    <script type="text/javascript"-->
<!--            src="/www.xbluesalt.io/js/xlgames_modal.js?v=WhDrFv7hIVC2RTkHNBLr0MMzUuPvuZK0HjEKo8kOO88"></script>-->
<!--    <script type="text/javascript"-->
<!--            src="/www.xbluesalt.io/js/gnb_service.js?v=duHxjhP21z6tQSjwTASz97QesszBiT1BeYna3O5qoZA"></script>-->
    <script type="text/javascript"
            src="/www.xbluesalt.io/js/utility.js?v=DTxytbl6uuvDEvjrIJA-4WOWFQhNRZZAsh0WaWAkw9o"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-03D3BKLWN7"></script>
    <script>

        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'G-03D3BKLWN7');
    </script>
    <script type="text/javascript">
        XLGames.currentMenuGroup = "bslt";
        XLGames.domains = {
            account: 'https://member.archeworld.com',
            xbluesalt: 'https://www.xbluesalt.io',
            cookieDomain: "xbluesalt.io"
        };
        XLGames.currentFullUrl = location.href;

        // 다국어 처리
        String.prototype.format = function () {
            var formatted = this;
            for (var arg in arguments) {
                formatted = formatted.replace("{" + arg + "}", arguments[arg]);
            }
            return formatted;
        };
    </script>
    <script type="module">
        import {createApp} from "/www.xbluesalt.io/lib/vue.js/3.2.47/vue.js";
        import {cookieApp} from "/www.xbluesalt.io/js/cookie/cookiemanage_service.min.js";
        import {regionApp} from "/www.xbluesalt.io/js/region/region_service.min.js";

        let app = createApp(cookieApp);
        app.config.globalProperties.globalData = {
            currentLang: "en",
            domains: XLGames.domains
        }
        app.mount("#cookieRegionContainer");

        const CURRENT_REGION = location.host.split('.')[1].toUpperCase();
        const REGION_COOKIE_NAME = "XL-REGION";

        let vueRegionApp = createApp(regionApp);
        vueRegionApp.config.globalProperties.AL10N = AL10N;
        vueRegionApp.config.globalProperties.globalData = {
            currentLang: "en",
            domains: XLGames.domains,
            currentRegion: CURRENT_REGION
        }
        vueRegionApp.mount("#regionContainer");

        if (getCookie(REGION_COOKIE_NAME) != CURRENT_REGION) {
            // document.cookie = REGION_COOKIE_NAME + "=" + CURRENT_REGION + ";path=/;domain=." + XLGames.domains.cookieDomain;
            document.cookie = REGION_COOKIE_NAME + "=" + CURRENT_REGION + ";path=/";
        }
    </script>

    <script type="module" src="/www.xbluesalt.io/js/bslt/exchange.js"></script>
    <script id="entry-template" type="text/x-handlebars-template">
        <div class="bslt-account-wallet">
            <div class="account">
                <i class="ico-join"></i>
                <span>{{accountPart AccountId}}</span>
            </div>
            <div class="wallet">
                <i class="ico-wallet"></i>
                <span>{{shortHash Wallet}}</span>
                <button type="button" class="btn-copy" id="btn-copy">Copy <i class="ico-copy"></i></button>
            </div>
        </div>
        <ul class="tab-menu">
            <li class="tab1"><a href="/xbluesalt/deposit" class="active">Deposit </a></li>
            <li class="tab2"><a href="/xbluesalt/withdraw">Withdraw </a></li>
        </ul>
        <div class="bslt-inner active">
            <div class="bslt-deposit">
                <div class="inner">
                    <div class="row">
                        <span class="label">Balance</span>
                        <span class="desc"><span>{{{localeDouble Balance}}}</span></span>
                        <em>BSLT</em>
                    </div>
                    <div class="row">
                        <span class="label">Deposit Request</span>
                        <span class="desc"><input type="text" id="ip-amount" data-mode="deposit" class="input-txt"
                                                  value="0"/></span>
                        <em>BSLT</em>
                    </div>
                    <div class="caution"><label class="error" id="lbl-error"></label></div>
                    <div class="row amount">
                        <span class="label">Deposit Amount</span>
                        <span class="desc"><span id="show-amount">0<small>.0000</small></span></span>
                        <em>BSLT</em>
                    </div>
                    <div class="row-noti" id="row-noti">
                        I am at least 19 years old and agree to the <a
                                href='https://member.archeworld.com/legal/bslt/bslt' target='_blank'>BSLT Deposit
                            and Withdrawal Policy</a> and to proceed.
                    </div>
                    <div class="btn-wrap">
                        <button type="button" id="btn-bslt" disabled="disabled" class="btn-bslt"
                                data-mode="deposit">Deposit
                        </button>
                    </div>
                </div>
            </div>
            <ul class="notice-list" id="notice-list">
                <li>BSLT can be obtained by exchanging from <a
                            href='https://www.boraportal.com/earn/swap?output=BSLT' target='_blank'>BORA PORTAL</a>.
                </li>
            </ul>
        </div>
    </script>
    <script>
        const serverData = {
            "AccountId": "FFFFFFFFFF@gmail.com",
            "Wallet": "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
            "Balance": 80000.0,
            "Max": 10000000.0,
            "IsFaceWallet": false,
            "IsGoogle": true
        };
        const dictionary = {
            confirmSubmit: '{0} BSLT Do you want to deposit?' + "\n" + '(Asia Region)',
            Insufficientbalance: 'Insufficient balance',
            withdrawAvailable: 'Withdrawal available from {0} BSLT',
            refreshMessage: "Please refresh after completing the deposit in BORA PORTAL."
        }
    </script>
<?php
$this->endBlock();
?>