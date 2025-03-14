<?php
$this->title = 'FAQ | Customer Support | ArcheWorld';
?>
<section class="container">

    <div class="sub-keyvisual">
        <div class="keyvisual sub-help">
            <div class="inner">
                <P>New beginning</P>
                <div class="title">ArcheWorld</div>
            </div>
        </div>
    </div>


    <div class="contents">
        <div class="help_wrap">

            <header class="cont_head" role="banner">
                <h2>
                    <a href="/help/faq.html">FAQ</a>
                </h2>
            </header>

            <div class="btn-search-wrap">
                <a href="#search-mode" id="searchToggleBtn">
                    <span class="ico-search-open">검색</span>
                    <span class="ico-search-close">닫기</span>
                </a>
            </div>
            <div class="search">
                <h4 class="txt_hidden">FAQ Search</h4>
                <form id="search" class="faq-search-box" action="/help/faq/search" method="GET">
                    <input type="hidden" name="keyword" value=""/>
                    <div class="search_box">
                        <input type="text" class="keyword" value=""/>
                        <a href="#" class="keywordReset" id="keywordReset" style="display:none;"></a>
                        <button type="submit" class="btn gray btn-faq-search searchSubmitBtn">Search</button>
                    </div>
                </form>
            </div>

            <div class="lst_faq_category" id="slider">
                <ul class="tab-menu-list" id="tabCategory">

                    <li class="on">
                        <a href="/help/faq/Service">Service</a>
                    </li>

                    <li class="">
                        <a href="/help/faq/Member">Member</a>
                    </li>

                    <li class="">
                        <a href="/help/faq/Game%20Contents">Game Contents</a>
                    </li>

                    <li class="">
                        <a href="/help/faq/In-Game%20Recovery">In-Game Recovery</a>
                    </li>

                    <li class="">
                        <a href="/help/faq/Player%20Report">Player Report</a>
                    </li>

                    <li class="">
                        <a href="/help/faq/Technical%20Issues">Technical Issues</a>
                    </li>

                    <li class="">
                        <a href="/help/faq/Website">Website</a>
                    </li>

                </ul>

            </div>


            <ul class="lst_faq">

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=154&page=1">

                        I signed up for the Google Authenticator service but I lost my phone. What should I do?
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=153&page=1">

                        How can I cancel the Google Authenticator service?
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=152&page=1">

                        How do I sign up for Google Authenticator service?
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=143&page=1">

                        &#39;different networkId&#39; error occurs when I try to verify my wallet after ArcheWorld
                        sign up process.
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=134&page=1">

                        How to connect Kaikas-Metamask
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=26&page=1">

                        What is the System Requirements for ArcheWorld?
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=18&page=1">

                        What languages will ArcheWorld client support?
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=17&page=1">

                        How is Land NFT used?
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=15&page=1">

                        What kind of NFTs are there in ArcheWorld?
                    </a>
                </li>

                <li class="subject ">
                    <em>Q</em>

                    <a href="/help/faq/Service/?id=12&page=1">

                        How is Blue Salt(BSLT) used?
                    </a>
                </li>

            </ul>


            <div class="paging">
                <div class="pg-inner">
                    <a href="/help/faq/Service/?page=1" class="active" onclick="return false;">1</a> <a
                            href="/help/faq/Service/?page=2">2</a> <span class="pg-more"> ... </span> <a
                            href="/help/faq/Service/?page=2" class="pg-navi" accesskey="x" title="2 page">NEXT <i
                                class=ico-page-next></i></a>
                </div>
            </div>


        </div>
    </div>

</section>