<?php
$this->title = 'Sign Up | XLGAMES Global member';
?>
<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>服务条款和隐私政策协议</h1>
            <p>
                请确认您同意我们的服务条款和隐私政策。
            </p>
        </header>

        <article class="agreement-check row-check">
            <form id="agreement" action="/user/join/form" method="post">
                <input type="hidden" name="_csrf" value="4ea6dbc0-267a-4c75-bc1d-f22d528d482b"/>
                <fieldset>
                    <legend>Terms of Service and Privacy Policy Agreement</legend>
                    <div class="agreement-check-form">
                        <div class="row">
                            <input id="userAgree" name="userAgree" type="checkbox" value="U"/>
                            <label for="userAgree" class="check-form-label">
                                我已年满 13 岁，并且已阅读并同意 XLGAMES <a
                                        href="/legal/service/service" target="_blank">全球服务协议</a>
                                和 <a href="/legal/privacy/privacy" target="_blank">隐私政策</a>.
                            </label>
                            <div class="caution"></div>
                        </div>
                    </div>
                </fieldset>
                <div class="captcha-wrap">
                    <div class="g-recaptcha" data-sitekey="6LeW4bwfAAAAAI1BVWUUEVLe728ua0k17uWZe5z9"
                         style="margin:0 auto; display:table; transform:scale(0.89); transform-origin:0 0;"></div>
                    <div class="caution" id="captcha-error">
                        <label class="error"></label>
                    </div>

                </div>
                <div class="btn-wrap-noline">
                    <button class="btn-ok" id="confirmBtn">我同意</button>
                </div>
            </form>
        </article>
    </section>
</div>
<?php $this->beginBlock('script') ?>

<script type="text/javascript"
        src="/static_resources/js/lib/jquery.validation/1.11.1/jquery.validate.min.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.utils.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.join.js"></script>
<!--<script src="//www.google.com/recaptcha/api.js?hl=en"></script>-->
<script type="text/javascript">
    $(document).ready(function () {
        var agreement = new XLGames.Member.Join.Agreement($('#agreement'));
        XLGames.Member.Utils.keypressEnterKey(agreement.$form, agreement.$confirmBtn);
        XLGames.Member.Utils.validate(agreement.rules(), agreement.$form, agreement.$confirmBtn);

    });
</script>
<?php $this->endBlock(); ?>
