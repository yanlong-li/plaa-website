<?php
$this->title = 'TRANSACTIONS | Scope | BlueSalt';
$this->beginBlock('head');
?>
<link href="/www.xbluesalt.io/css/scope-common.css" media="screen and (min-width:1200px)" rel="stylesheet"/>
<link href="/www.xbluesalt.io/css/scope-common_t.css" media="screen and (min-width:768px) and (max-width:1199px)"
      rel="stylesheet"/>
<link href="/www.xbluesalt.io/css/scope-common_m.css" media="screen and (max-width:767px)" rel="stylesheet"/>
<!-- Global site tag (gtag.js) - Google Analytics -->
<?php
$this->endBlock();
?>


<div class="contents">
    <h1><a href="https://scope.asia.xbluesalt.io">Scope</a></h1>
    <div class="search-set">
        <div class="search">
            <input type="text" placeholder="Search for Address / Tx Hash" class="keyword" id="inputHash">
            <button class="btn-search" id="searchHash">Search</button>
        </div>
    </div>
    <h2>TRANSACTIONS</h2>
    <article class="contents-set">
        <div class="table-list" id="table-list">
            <div class="table-scope">
                <table class="scope-list">
                    <colgroup>
                        <col class="table-cell-hash">
                        <col class="table-cell-time">
                        <col class="table-cell-ft">
                        <col class="table-cell-tx">
                        <col class="table-cell-bslt">
                    </colgroup>
                    <thead>
                    <tr>
                        <th class="table-cell-hash">TX HASH</th>
                        <th class="table-cell-time">TIME</th>
                        <th class="table-cell-ft">
                            <div class="table-cell-ft-set">
                                <span class="table-cell-ft-from">FROM</span>
                                <i class="ico-ft-arrow"></i>
                                <span class="table-cell-ft-to">TO</span>
                            </div>
                        </th>
                        <th class="table-cell-tx txt-center">TX TYPE</th>
                        <th class="table-cell-bslt">AMOUNT(BSLT)</th>
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
<script src="/www.xbluesalt.io/lib/jquery/dist/jquery.min.js"></script>
<script src="/www.xbluesalt.io/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="/www.xbluesalt.io/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
<script src="/www.xbluesalt.io/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="/www.xbluesalt.io/lib/handlebars/handlebars.min-v4.7.7.js"></script>
<script src="/www.xbluesalt.io/lib/axios/axios.min.js"></script>

<!--<script type="text/javascript"-->
<!--        src="/www.xbluesalt.io/js/navigation.js?v=bp2A43NAh19KFQunkeLQPs12FMHFJtQ_YknxdojFJ4Q"></script>-->
<script type="text/javascript"
        src="/www.xbluesalt.io/js/utility.js?v=IOYKR-coUHtRvS9SuXVUU6vMpJhYLowIgaUMSLubm5o"></script>
<!--<script type="text/javascript" src="/www.xbluesalt.io/js/xlgames.js?v=uQnP28BQ_KReZBoFIfQDrtTBaxGkqubEeXPmhlbJr8E"></script>-->
<!--<script type="text/javascript" src="/www.xbluesalt.io/js/xlgames_modal.js?v=VXSlHB-e90fOenl1SG107zDDfKOI1y3FXhwLcBrtArg"></script>-->
<!--<script type="text/javascript" src="/www.xbluesalt.io/js/gnb_service.js?v=duHxjhP21z6tQSjwTASz97QesszBiT1BeYna3O5qoZA"></script>-->

<script type="text/javascript">
    XLGames.currentMenuGroup = "scope";
    XLGames.domains = {
        account: 'https://member.archeworld.com',
        xbluesalt: 'https://www.xbluesalt.io',
        cookieDomain: "xbluesalt.io"
    };
    XLGames.currentFullUrl = location.href;

    document.getElementById("searchHash").addEventListener("click", () => {
        let hash = document.getElementById("inputHash").value;
        location.href = `/Search/${hash}`;
    });

    let searchElement = document.getElementById("inputHash");

    if (searchElement) {
        searchElement.addEventListener("keyup", () => {
            if (window.event.keyCode == 13) {
                let hash = document.getElementById("inputHash").value;
                location.href = `/Search/${hash}`;
            }
            ;
        });
    }
</script>

<script id="entry-template" type="text/x-handlebars-template">
    {{#items}}
    <tr>
        <td class="table-cell-hash"><a href="/tx/{{txHash}}">{{shortHash txHash}}</a></td>
        <td class="table-cell-time">{{time}}</td>
        <td class="table-cell-ft">
            <div class="table-cell-ft-set">
                <span class="table-cell-ft-from"><a href="/account/{{from}}">{{shortHash from}}</a></span>
                <i class="ico-ft-arrow"></i>
                <span class="table-cell-ft-to"><a href="/account/{{to}}">{{shortHash to}}</a></span>
            </div>
        </td>
        <td class="table-cell-tx txt-center">{{txType}}</td>
        <td class="table-cell-bslt txt-right">{{amount}}</td>
    </tr>
    {{/items}}
</script>
<script>
    window.onload = function () {
        Handlebars.registerHelper('shortHash', customHelpers.shortHash);

        Rendering(1);
    };

    const pageSize = 20;
    const pageRange = 1;

    const Rendering = async (pageNo) => {
        const tableSection = document.getElementById("table-section");
        const pagingSection = document.getElementById("paging-section");

        tableSection.innerHTML = "";
        pagingSection.innerHTML = "";

        pageNo = (!isNaN(pageNo) && pageNo > 0) ? pageNo : 1;

        const response = await axios.get(`/www.xbluesalt.io/ScopeList.json?pageNo=${pageNo}`);

        if (response.data?.IsError) {
            location.href = "/error";
            return;
        }

        let data = response.data.scopes;

        if (data.length === 0) {
            tableSection.innerHTML = '<td colspan="5" class="empty"><span>No Record. <br/> Waiting for the first transaction. </span></td></tr>';
            return;
        }

        MakePaging(pageNo, data.length, pageSize, pageRange, GoPage).forEach((element, index) => {
            pagingSection.append(element);
        });

        var tableData = data.slice(0, pageSize);

        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var html = template({
            items: tableData
        });

        $(tableSection).append(html);
    };
</script>
<?php
$this->endBlock();
?>
