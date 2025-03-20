<?php
$this->title = 'Edit account info | XLGAMES Global member';
$this->params['hide_welcome'] = true;
?>
<body class="mypage">
<div id="wrapperContent">

    <div class="wrap-content">


        <aside class="menu-aside">
            <header class="menu-aside-title">
                <h1>Manage account</h1>
            </header>
            <nav class="menu-aside-navi" >
                <ul class="menu-aside-main" id="mypageNavi">
                    <li id="menu_update" class="active"><a href="/user/mypage/update" class="on">Edit account info<i class="arrow-menu"></i></a></li>

                    <li id="menu_cancel" class=""><a href="/user/withdraw" class="">Membership withdrawal<i class="arrow-menu"></i></a></li>
                </ul>
            </nav>
        </aside>


        <section class="content">
            <header class="content-title">
                <h1>Edit account info</h1>
                <p>
                    Your personal information will be kept strictly confidential.
                </p>
            </header>
            <article class="join-info-form">
                <form id="accountForm" action="/user/mypage/update" method="post">
                    <input type="hidden" name="popup" value="false" />
                    <fieldset class="join-form">
                        <legend>Enter information</legend>
                        <div class="row">
                            <label for="emailId" class="form-label">Email ID</label>
                            <div class="wrap-input">
					<span class="wrap-input-txt">



						<i class="ico-google">Google</i>


					*******@gmail.com
                            </div>
                        </div>
                        <div class="row">
                            <label class="form-label">My wallet</label>
                            <div class="wrap-input">
                                <div class="wrap-input-txt">


                                    0x******......********


                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label for="emailAgree" class="form-label">Newsletter</label>
                            <div class="wrap-input">

                                <div class="join-form-txt-info">
                                    <div class="email-check-box">
                                        <input id="emailCheck" name="email.isEmailReceiveAgreement" type="checkbox" value="AGREE" checked="checked"/><input type="hidden" name="_email.isEmailReceiveAgreement" value="on"/>
                                        <label for="emailCheck" class="check-form-label">Subscribe to our newsletter</label>
                                    </div>
                                    I agree to receive marketing/promotional emails containing special offers and event news about all the games from XLGAMES.
                                    <strong>Official announcement or notifications to all members will be sent regardless of the subscription.</strong>
                                </div>
                            </div>
                        </div>

                    </fieldset>
                    <div class="btn-wrap">
                        <button class="btn-ok" id="confirmBtn">OK</button>
                    </div>
                    <div>
                        <input type="hidden" name="_csrf" value="0c880a60-ce56-4aa1-8705-3bc93bacf8cf" />
                    </div></form>
            </article>
        </section>
    </div>

    <form id="socalConnectForm" action="/user/mypage/social" method="post">
        <input type="hidden" name="_csrf" value="0c880a60-ce56-4aa1-8705-3bc93bacf8cf" />
    </form>

</div>

<?php $this->beginBlock('script') ?>
<script type="text/javascript" src="/static_resources/js/lib/jquery.validation/1.11.1/jquery.validate.min.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.utils.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.update.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('a.socal-disconnect').click(function(e){
            e.preventDefault();
            if($(this).attr('disabled') === 'disabled') {
                return;
            }
            $(this).attr('disabled', 'disabled');
            $(this).css('cursor', 'wait');
            var provider = $(this).attr('data-provider');

            var $f = $("#socalConnectForm");
            var action = $f.attr('action');
            $f.attr('action', action + '/' + provider);
            $f.append($('<input />', {name:'_method', type:'hidden', value:'DELETE'}));
            $f.submit();
        });
        $('a.socal-connect').click(function(e){
            e.preventDefault();
            if($(this).attr('disabled') === 'disabled') {
                return;
            }
            $(this).attr('disabled', 'disabled');
            $(this).css('cursor', 'wait');
            var provider = $(this).attr('data-provider');
            gtag( 'event', 'clickEvent',  {
                'event_category' : 'social',
                'event_action' : 'connect',
                'event_label' : provider
            });
            var $f = $("#socalConnectForm");
            var action = $f.attr('action');
            $f.attr('action', action + '/' + provider);
            $f.find("input[name='_method']").remove();
            $f.submit();
        });
        $('a.join-auth').click(function(e){
            e.preventDefault();
            location.href='/user/mypage/walletauth/agreement'
        });

        var form = new XLGames.Member.Update.Form($('#accountForm'));
        XLGames.Member.Utils.keypressEnterKey(form.$form, form.$confirmBtn);
        XLGames.Member.Utils.validate(form.getValidateOptions(), form.$form, form.$confirmBtn);
    });
</script>
<?php
$this->endBlock();
?>