<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>Forgot ID</h1>
        </header>
        <article class="txt-message-form">
            <div class="txt-message">
                <strong>Forgot ID</strong>
                <p>
                    Find password if you forgot your password.
                </p>
                <div class="table-id-full">
                    <ul class="table-id-full-form">


                        <li>
                            <div class="info">



                                <i class="ico-google">Google</i>

                                xxx@gmail.com
                            </div>

                            <div class="date">Join Date: 2021-05-11</div>


                        </li>

                    </ul>
                    <div class="table-legend">
                        <!-- <i class="ico-facebook"></i> Facebook -->
                        <i class="ico-google"></i> Google
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <button class="btn-ok mobile-btn" id="goLogin">登录</button>

            </div>
        </article>
    </section>
</div>
<?php $this->beginBlock('script') ?>
<script type="text/javascript" src="/static_resources/js/lib/jquery.validation/1.11.1/jquery.validate.min.js"></script>
<script type="text/javascript" src="/static_resources/js/lib/jquery.form/3.51/jquery.form.min.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.utils.js"></script>
<script type="text/javascript" src="/resources-202412261502/js/member.find.js"></script>
<script type="text/javascript">


    $(function () {
        $("#goLogin").click(function () {
            window.location.href = "/user/login/form";
        })
    })
</script>
<?php $this->endBlock() ?>