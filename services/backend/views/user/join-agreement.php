<?php
$this->title = 'Sign Up | XLGAMES Global member';
?>

<div class="txt-join-welcome">
    <i class="ico-xlgames"></i>Welcome <strong>XLGAMES new global members.</strong>
</div>
<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>Sign up options</h1>
            <p>Please choose preferred sign up option.</p>
        </header>
        <article class="login-form">
            <ul class="link-join">
                <li>
                    <button class="link-join-select" type="button" data-href="/user/join/agreement/email">
                        <i class="ico-email2"></i> Sign up with email address
                    </button>
                </li>
                <li>
                    <button class="link-join-select" type="button" data-href="/auth/google">
                        <i class="ico-google2"></i> Sign up with Google
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
