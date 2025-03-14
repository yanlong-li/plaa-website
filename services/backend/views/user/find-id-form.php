<?php
$this->title = 'Forgot ID | XLGAMES Global member';
?>

<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>Forgot ID</h1>
            <p>
                You can find your ID by verifying your wallet.
            </p>
        </header>

        <article class="auth-form-user wallet">
            <form id="walletForm" data-action="/user/find/id/process">
                <input type="hidden" name="_csrf" value="2be214ca-396b-4cef-a549-231df94a08d4"/>

                <input type="hidden" id="networkId" value="77001"/>
                <input type="text" readonly="readonly" class="input-txt-wallet" id="addressVal" name="addressVal"/>
                <div class="caution">
                    <label for="addressVal" class="error">

                    </label>
                </div>
            </form>
            <div class="btn-wrap">
                <a href="javascript:;" class="btn-ok" id="okBtn">OK</a>
            </div>
        </article>


    </section>
</div>
<?php $this->beginBlock('script') ?>
<script type="text/javascript" src="/static_resources/js/lib/jquery.validation/1.11.1/jquery.validate.min.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.utils.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.find.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/wallet/wallet_service.js"></script>
<script type="text/javascript" src="/static_resources/js/lib/ethers/5.2/ethers-5.2.umd.min.js"></script>
<script type="module">
    import * as faceLib from "/static_resources/js/lib/facewallet/1.9.2/facewallet.js";

    let fwallet = new XLGames.Wallet.Facewallet({
        'faceLib' : faceLib,
        'isGoogle' : XLGames.LoginUser.isGoogle
    });

    $(document).ready(function() {
        let walletService = new XLGames.Wallet({
            $address: $("#addressVal"),
            $form: $("#walletForm"),
            'facewallet' : fwallet
        });

        $("#okBtn").on('click', function(){
            $("#walletForm").submit();
        });
    });

</script>
<script type="text/javascript">
    $(function () {

    });
</script>
<?php $this->endBlock() ?>