<?php
$this->title = 'Edit account info | XLGAMES Global member';
?>
<div class="mypage">
    <div class="wrap-content">


        <aside class="menu-aside">
            <header class="menu-aside-title">
                <h1>Manage account</h1>
            </header>
            <nav class="menu-aside-navi">
                <ul class="menu-aside-main" id="mypageNavi">
                    <li id="menu_update" class="active"><a href="/user/mypage/update" class="on">Edit account info<i
                                    class="arrow-menu"></i></a></li>

                    <li id="menu_cancel" class=""><a href="/user/withdraw" class="">Membership withdrawal<i
                                    class="arrow-menu"></i></a></li>
                </ul>
            </nav>
        </aside>


        <section class="content">
            <header class="content-title">
                <h1 id="menu_title">

                    &nbsp;</h1>
                <p>

                    Clicking [Confirm password] will lead you to the external account page. <br/>
                    Please check if the external account matches with your ID. <br/>
                    You may proceed after confirming your password.

                </p>
            </header>
            <article class="join-info-form">


                <form id="passwordForm" name='passwordForm' action='/user/mypage/update/confirmpassword/GOOGLE'
                      method='post'>
                    <input type="hidden" name="_csrf" value="e67a95d5-d89e-498c-a838-bdb2c9561ca4"/>
                    <input type="hidden" name="popup" value="false"/>
                    <fieldset class="join-form">
                        <legend>Enter information</legend>
                        <div class="row">
                            <label for="userId" class="form-label">Email ID</label>
                            <div class="wrap-input">
                                <span class="wrap-input-txt">*******@gmail.com</span>
                            </div>
                        </div>

                    </fieldset>

                    <div class="btn-wrap">
                        <button class="btn-ok" id="confirmBtn">OK</button>
                    </div>

                </form>
            </article>
        </section>
    </div>
</div>



<?php $this->beginBlock('script') ?>
<script type="text/javascript" src="/static_resources/js/lib/rsa_ecc/1.0/rsa_all.min.js"></script>
<script type="text/javascript" src="/static_resources/js/lib/jquery.validation/1.11.1/jquery.validate.min.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.utils.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.confirm.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("#password").keypress(function (event) {
            new XLGames.Member.Utils.CapsLock().fireCapsLockWarning(event, $(this).next(".tooltip-comm"));
        });
        if ($(".active").length) {
            $("#menu_title").text($(".menu-aside .active").text());
        }
        document.title = $("#menu_title").text() + " | XLGAMES Global member";

        var form = new XLGames.Member.Confirm.Password($('#passwordForm'));
        XLGames.Member.Utils.keypressEnterKey(form.$form, form.$confirmBtn);
        XLGames.Member.Utils.validate(form.rules(), form.$form, form.$confirmBtn);
    });
</script>
<?php $this->endBlock() ?>