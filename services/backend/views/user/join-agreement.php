<?php
$this->title = 'Sign Up | XLGAMES Global member';
?>


<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>注册选项</h1>
            <p>请选择一个注册方式</p>
        </header>
        <article class="login-form">
            <ul class="link-join">
                <li>
                    <button class="link-join-select" type="button" data-href="/user/join/agreement/email">
                        <i class="ico-email2"></i> 通过电子邮件注册
                    </button>
                </li>
                <li>
                    <button class="link-join-select" type="button" data-href="/auth/google">
                        <i class="ico-google2"></i> Google 账户注册
                    </button>
                </li>

            </ul>

        </article>
    </section>
</div>


<?php $this->beginBlock('script') ?>
<script type="text/javascript" src="/resources-202412261502/js/member.utils.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("button.link-join-select").click(function () {
            if (!XLGames.LoginUser.isGuest) {
                XLGames.alert(AL10N.Member.requiredLogout());
                return false;
            }
            $(this).attr('disabled', 'disabled');
            $(this).css('cursor', 'wait');
            var linkUrl = $(this).attr('data-href');
            location.href = linkUrl;
        });
    });
</script>
<?php $this->endBlock() ?>
