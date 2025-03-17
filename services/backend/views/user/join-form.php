<div class="wrap-content">
    <section class="content">
        <header class="content-title">
            <h1>Enter information</h1>
            <p>
                Your personal information will be kept strictly confidential.
            </p>
        </header>
        <article class="join-info-form">
            <form id="accountForm" name="userForm" action="/user/join/create" method="post" novalidate="novalidate">
                <fieldset class="join-form">
                    <legend>Enter information</legend>
                    <div class="row">
                        <label for="id" class="form-label">Email ID</label>
                        <div class="wrap-input">

                            <input id="id" name="id" class="input-txt-email-id" placeholder="Email address" type="text" value="" maxlength="75">
                            <div class="caution" id="id_error_msg">
                                <label class="error"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <label for="password" class="form-label">Password</label>
                        <div class="wrap-input">

                            <input id="password" name="password" class="input-txt-password" placeholder="Password must be 8-16 characters containing both numbers and letters/special characters." type="password" value="">
                            <div id="password_tooltip" class="tooltip-comm" style="display:none;">
                                <div class="box">
                                    <ul>
                                        <li>Password <em>must be 8-16 characters containing both numbers and letters/special characters.</em></li>
                                        <li>Your password can not be same as <em>your ID</em>.</li>
                                    </ul>
                                </div>
                                <i class="tail left">
                                    <i class="tail-outer"></i>
                                    <i class="tail-inner"></i>
                                </i>
                            </div>
                            <div id="password_capslock_tooltip" class="tooltip-comm" style="display:none;">
                                <div class="box">
                                    <ul>
                                        <li class="caps">Caps Lock is on.</li>
                                        <li>Password <em>must be 8-16 characters containing both numbers and letters/special characters.</em></li>
                                        <li>Your password can not be same as <em>your ID</em>.</li>
                                    </ul>
                                </div>
                                <i class="tail left">
                                    <i class="tail-outer"></i>
                                    <i class="tail-inner"></i>
                                </i>
                            </div>
                            <div class="caution" id="password_error_msg">
                                <label class="error"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <label for="password_con" class="form-label">Confirm Password</label>
                        <div class="wrap-input">
                            <input type="password" id="password_con" name="password_con" class="input-txt-password" placeholder="Password must be 8-16 characters containing both numbers and letters/special characters.">
                            <div class="caution" id="password_con_error_msg">
                                <label class="error"></label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="btn-wrap">
                    <button class="btn-ok" id="confirmBtn">OK</button>
                </div>
                <div>
                    <input type="hidden" name="_csrf" value="1e96f7fa-bf27-4a22-b489-809229c70114">
                </div></form>
        </article>
    </section>
</div>