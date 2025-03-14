<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>Forgot password</h1>
        </header>

        <article class="emailid-form-pw tab-content" id="tab2">
            <form id="emailIdForm" action="/user/find/password/emailId" method="post">
                <fieldset class="find-emailid-form">
                    <legend>Forgot password</legend>
                    <div class="row">
                        <label for="emailId" class="form-label">Email ID</label>
                        <div class="wrap-input">
                            <input type="hidden" name="_csrf" value="66688b8d-2bbf-4df3-aade-936d709fa75d"/>
                            <input type="text" class="input-txt-auth" id="emailId" name="emailId" maxlength="75"/>
                            <div class="caution"></div>
                        </div>
                    </div>
                </fieldset>
                <div class="btn-wrap">
                    <button class="btn-auth" id="confirmBtn">Email verification</button>
                </div>
            </form>
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
        $(document).ready(function () {
            var findbyEmail = new XLGames.Member.Find.PasswordByEmail($('#emailIdForm'));
            findbyEmail.$form.validate(findbyEmail.rules());
        });
    });
</script>
<?php $this->endBlock() ?>
