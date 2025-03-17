<?php
$this->title = 'Log In | XLGAMES Global member';
?>


<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>请登录</h1>
        </header>
        <article class="login-form">
            <form id="authenticate" name="authenticate" action="/user/login" method="post">
                <input type="hidden" name="_csrf" value="ef55e0a6-3875-4ea9-b03e-6d4e34b5a984"/>
                <input type="hidden" name="spring-security-fail-redirect"
                       value="/user/login/form?login_error=true"/>

                <input type="hidden" name="spring-security-redirect" value="/"/>


                <fieldset class="login">
                    <legend>登录</legend>
                    <div class="row">
                        <label id="id_label" for="id_field" class="txt-hidden">邮箱账户</label>

                        <input id="id_field" type="text" name="j_username" class="input-txt-login" maxlength="75"
                               value="" placeholder="邮箱账户"/>

                        <div class="caution">
                            <label class="error"></label>
                        </div>
                    </div>
                    <div class="row">
                        <label id="pw_label" for="pw_field" class="txt-hidden">密码</label>

                        <input id="pw_field" type="password" name="j_password" maxlength="20" class="input-txt-login"
                               autocomplete="off" placeholder="密码"/>

                        <!-- input tooltip -->
                        <div class="caution">
                            <label class="error">


                            </label>
                        </div>
                    </div>

                    <button class="btn-login-form" type="submit" id="loginButton">登录</button>
                </fieldset>
            </form>
            <div class="login-form-link">
                <a href="/user/join/agreement" class="login-form-link-join">加入</a>
                <span class="txt-bar">|</span>
                <a href="/user/find/id/form">找回账号</a>
                <span class="txt-bar">|</span>
                <a href="/user/find/password/form">找回密码</a>
            </div>

            <div class="sns-wrap">
                <button class="btn-login-sns" type="button" data-provider="google"><i class="ico-sns-google"></i>Google 账户登录
                </button>
            </div>
        </article>
    </section>
</div>


<?php $this->beginBlock('script') ?>
<script type="text/javascript" src="/static_resources/js/lib/rsa_ecc/1.0/rsa_all.min.js"></script>
<script type="text/javascript" src="/static_resources/js/lib/jquery.validation/1.11.1/jquery.validate.min.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.utils.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.login.js"></script>
<script src="//www.google.com/recaptcha/api.js?onload=recaptchaCalllback&hl=en" async></script>
<script type="text/javascript">
    $(document).ready(function () {
        window.login = new XLGames.Member.Login($("#authenticate"));
        XLGames.Member.Utils.validateAos(login.createValidateOption(false), login.$loginForm, login.$loginButton);
        XLGames.Member.Utils.keypressEnterKey(login.$loginForm, login.$loginButton);

        window.recaptchaCalllback = function () {
            login.addCapchaRefresh(false);
        }

        $("button.btn-login-sns").click(function () {
            $(this).attr('disabled', 'disabled');
            $(this).css('cursor', 'wait');
            var provider = $(this).attr('data-provider');
            location.href = '/auth/' + provider;
            // gtag('event', 'clickEvent', {
            //     'event_category': 'social',
            //     'event_action': XLGames.isMobileView ? 'mobileLogin' : 'pcLogin',
            //     'event_label': provider,
            //     'event_callback': function () {
            //         var called = false;
            //
            //         function fn() {
            //             if (!called) {
            //                 called = true;
            //                 location.href = '/auth/' + provider;
            //             }
            //         }
            //
            //         setTimeout(fn, 300);
            //         return fn;
            //     }
            // });
        });
    });

</script>

<script type="text/javascript">
    $(function () {

    });
</script>
<?php $this->endBlock() ?>