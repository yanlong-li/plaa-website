<?php
$this->beginBlock('head');
?>
<link href="/www.xbluesalt.io/css/common.css" media="screen and (min-width:1200px)" rel="stylesheet" />
    <link href="/www.xbluesalt.io/css/common_t.css" media="screen and (min-width:768px) and (max-width:1199px)" rel="stylesheet" />
    <link href="/www.xbluesalt.io/css/common_m.css" media="screen and (max-width:767px)" rel="stylesheet" />
<?php
$this->endBlock();
?>
<head>
    <title>Coupon | BlueSalt</title>
</head>


<div class="contents">
    <h1 class="active"><a href="/coupon">Use coupon</a></h1>
    <h1><a href="/coupon/UsedCouponList">Usage History</a></h1>

    <article class="contents-set">
        <div class="coupon">
            <div class="coupon-reg">
                <strong>Enter coupon number</strong>
                <input id="ipCoupon1" type="text" maxlength="4" data-index="1" class="coupon-input">
                <input id="ipCoupon2" type="text" maxlength="4" data-index="2" class="coupon-input">
                <input id="ipCoupon3" type="text" maxlength="4" data-index="3" class="coupon-input">
                <input id="ipCoupon4" type="text" maxlength="5" data-index="4" class="coupon-input">
                <button class="btn-coupon" id="btnRegCoupon">Register</button>
            </div>
            <ul class="coupon-reg-notice">
                <li>If you reach 10 times of invalid coupon usage attempts, You can&#x27;t use coupon for 24 hours.
                    (date expired, wrong number)
                </li>
                <li>You can&#x27;t change or cancel the coupon once it is sent and the received item remains in your
                    mailbox for 365 days.[it expires after that]
                </li>
                <li class="b">If you select the character, you can only select and send the coupon that can be sent.
                </li>
            </ul>
        </div>

        <h2>Select the Character</h2>
        <div class="use-characters">
            <strong>Character</strong>
            <div class="select-character">
                <a href="javascript:;" role="button" class="select-box">
                    <span class="txt">Please select the character.</span>
                </a>
                <div class="select-list" id="charList">
                    <ul>
                        <li><a href="#" class="serverBtn" data-server="1" data-character-id="0">Please select the
                                character.</a></li>
                        <li><a href="#" class="serverBtn" data-server="2" data-character-id="2"
                               data-char-name="美国队长" data-server-name="亚服">美国队长 @ ASIA 3</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <h2 class="left">Coupon History</h2>
        <button type="button" class="btn-select-reg" id="btnUseCouponChecked">Use</button>

        <div class="table-list">
            <div class="table-coupon" style="min-height: 20rem">
                <table class="coupon-list">
                    <colgroup>
                        <col class="table-cell-select">
                        <col class="table-cell-coupon">
                        <col class="table-cell-time">
                        <col class="table-cell-state">
                    </colgroup>
                    <thead>
                    <tr>
                        <th class="table-cell-check"><input type="checkbox" id="checkAll"><label for="checkAll"></label>
                        </th>
                        <th class="table-cell-coupon">Coupon Info.</th>
                        <th class="table-cell-time">Expiration date</th>
                        <th class="table-cell-state">Status</th>
                    </tr>
                    </thead>
                    <tbody id="table-section"></tbody>
                </table>
            </div>
            <div class="paging" id="paging-section"></div>
        </div>
    </article>
</div>

<?php
$this->beginBlock('script');
?>
<!--<script src="/www.xbluesalt.io/lib/jquery/dist/jquery.min.js?v=82hEkGrSMJh3quMSG4f7FbngmAPLTDM63H4eNayS4Us"></script>-->
<!--<script src="/www.xbluesalt.io/lib/jquery-validation/dist/jquery.validate.min.js?v=eItLFOyfQ4d_OGzEnGchi2ZMVF8EhGgzS0k7fSOPifQ"></script>-->
<!--<script src="/www.xbluesalt.io/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js?v=BtVmVJsyUIncIatblQsAlI06bS8pb2yZBcrDOa7snJw"></script>-->
<!--<script src="/www.xbluesalt.io/lib/bootstrap/dist/js/bootstrap.bundle.min.js?v=rAnWnVnzChxAAi8NS-Ilr1mE7Sj-do-X_DqyilNsznM"></script>-->
<script src="/www.xbluesalt.io/lib/handlebars/handlebars.min-v4.7.7.js?v=llJbL0jUMVvksfxnmoOodVb7A8tZuFG5yydSsPOcZV8"></script>
<script src="/www.xbluesalt.io/lib/axios/axios.min.js?v=p6uupxi6sVUBj8kLGBFEAxtZs_P02uIPSJ4E1mhy1TU"></script>
<!---->
<!--<script type="text/javascript"-->
<!--        src="/www.xbluesalt.io/js/navigation.js?v=bp2A43NAh19KFQunkeLQPs12FMHFJtQ_YknxdojFJ4Q"></script>-->
<!--<script type="text/javascript"-->
<!--        src="/www.xbluesalt.io/js/xlgames.js?v=LYFEYvOV7BbeCJFiRefqT3-DhcS3nVDMgZNOQtI1kB4"></script>-->
<!--<script type="text/javascript"-->
<!--        src="/www.xbluesalt.io/js/xlgames_modal.js?v=WhDrFv7hIVC2RTkHNBLr0MMzUuPvuZK0HjEKo8kOO88"></script>-->
<!--<script type="text/javascript"-->
<!--        src="/www.xbluesalt.io/js/gnb_service.js?v=duHxjhP21z6tQSjwTASz97QesszBiT1BeYna3O5qoZA"></script>-->
<script type="text/javascript"
        src="/www.xbluesalt.io/js/utility.js?v=DTxytbl6uuvDEvjrIJA-4WOWFQhNRZZAsh0WaWAkw9o"></script>



<script type="text/javascript"
        src="/www.xbluesalt.io/js/xlgames_common_ui.js?v=jY9BJ3wi5ggoL13-BpuW0aJ0fVJLKpCjw1oTWIAjF7Q"></script>
<script type="text/javascript"
        src="/www.xbluesalt.io/js/Coupon/CouponList.js?v=qZf5PE-itRhbAFpXiw23srZwqdlDdVOdLbyqqd_3i-U"></script>
<script type="text/javascript">
    const dictionary = {
        useCoupon: "Send the selected coupon to {0}.",
        selectCharacter: "Please select a character.",
        regCoupon: "Do you want to register coupon?" + "\n" + ' (NA & SA Region)',
        processing: "Processing...",
        emptyCoupon: "Please select coupon to use",
        sendFailed: "{0} out of {1} coupon have not been sent.",
        sendComplete: "Coupon has been successfully sent.",
        wrongCoupon: "Please enter the correct number."
    }
</script>
<script type="text/javascript">
    $(document).ready(function () {
        new XLGames.CommonUI.CharacterSelector();
    });
</script>
<script id="entry-template" type="text/x-handlebars-template">
    {{#if items.hasRows}}
    {{#each items.couponInfos}}
    <tr>
        <td class="table-cell-check">{{{couponCheckbox couponId isUsable}}}</td>
        <td class="table-cell-coupon">{{couponName}}</td>
        <td class="table-cell-time">{{expireDate}}</td>
        <td class="table-cell-state" data-coupon-id="{{couponId}}">{{{setStatus statusMessage isUsable couponId}}}</td>
    </tr>
    {{/each}}
    {{else}}
    <tr>
        <td colspan="4" class="empty"><span>No history found. </span></td>
    </tr>
    {{/if}}

</script>
<?php
$this->endBlock();
?>