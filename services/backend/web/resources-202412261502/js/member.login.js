'use strict';
(function () {
    XLGames.namespace("XLGames.Member.Login");
    XLGames.Member.Login = Class.extend({
        init: function ($$loginForm$$) {
            this.$loginForm = $$loginForm$$;
            this.$login = $(".login", $$loginForm$$);
            this.$username = $("input[name\x3d'j_username']", $$loginForm$$);
            this.$password = $("input[name\x3d'j_password']", $$loginForm$$);
            this.$redirectUrl = $("input[name\x3d'spring-security-redirect']", $$loginForm$$);
            this.$loginButton = $("#loginButton", $$loginForm$$);
            this.controllPlaceHolder();
            this.$username.focus()
        },
        controllPlaceHolder: function () {
            var $me$$ = this;
            "" == $me$$.$username.val() && $me$$.$username.addClass("id-placeholder");
            $me$$.$username.bind("keypress", function () {
                $me$$.$username.hasClass("id-placeholder") && $me$$.$username.removeClass("id-placeholder")
            });
            $me$$.$username.bind("blur", function () {
                "" == $me$$.$username.val() && $me$$.$username.addClass("id-placeholder")
            });
            "" == $me$$.$password.val() && $me$$.$password.addClass("pw-placeholder");
            $me$$.$password.bind("keypress", function () {
                $me$$.$password.hasClass("pw-placeholder") &&
                $me$$.$password.removeClass("pw-placeholder")
            });
            $me$$.$password.bind("blur", function () {
                "" == $me$$.$password.val() && $me$$.$password.addClass("pw-placeholder")
            })
        }, createValidateOption: function ($$isCaptchaNecessary$$) {
            var $me$$ = this, $options$$ = {
                ignore: "",
                onkeyup: !1,
                rules: {j_username: {required: !0}, j_password: {required: !0}},
                messages: {
                    j_username: {required: XLGames.DEFAULT_ERROR_MARK.mark + AL10N.Member.requiredUsername()},
                    j_password: {required: XLGames.DEFAULT_ERROR_MARK.mark + AL10N.Member.requiredPassword()}
                },
                errorPlacement: function ($error$$, $element$$) {
                    "g-recaptcha-response" == $element$$.attr("name") ? $("#captcha-error").html($error$$) : XLGames.DEFAULT_ERROR_PLACE.errorPlacement($error$$, $element$$)
                },
                submitHandler: function ($form$$) {
                    $me$$.submitLoginForm()
                }
            };
            $$isCaptchaNecessary$$ && ($options$$.rules["g-recaptcha-response"] = {required: !0}, $options$$.messages["g-recaptcha-response"] = {required: XLGames.DEFAULT_ERROR_MARK.mark + AL10N.Member.requiredCaptcha()});
            return $options$$
        }, submitLoginForm: function () {
            var $me$$ =
                this;
            $.ajax("/user/login/encryptionKey", {
                data: {currentTime: (new Date).getTime()},
                dataType: "json"
            }).done(function ($encryptedUsername_publicKey$$) {
                var $username$$ = $me$$.$username.val(), $encryptedPassword_password$$ = $me$$.$password.val(),
                    $redirectUrl$$ = $me$$.$redirectUrl.val(), $$encryptedLoginForm_rsa$$ = new RSAKey;
                $$encryptedLoginForm_rsa$$.setPublic($encryptedUsername_publicKey$$.modulus, $encryptedUsername_publicKey$$.exponent);
                $encryptedUsername_publicKey$$ = $$encryptedLoginForm_rsa$$.encrypt($username$$);
                $encryptedPassword_password$$ = $$encryptedLoginForm_rsa$$.encrypt($encryptedPassword_password$$);
                $$encryptedLoginForm_rsa$$ = $('\x3cform action\x3d"" method\x3d"post"\x3e\n\x3cinput type\x3d"hidden" name\x3d"username" value\x3d""/\x3e\n\x3cinput type\x3d"hidden" name\x3d"password" value\x3d""/\x3e\n\x3cinput type\x3d"hidden" name\x3d"spring-security-redirect" value\x3d"" /\x3e\n\x3c/form\x3e');
                $$encryptedLoginForm_rsa$$.attr("action", $me$$.$loginForm.attr("action"));
                $$encryptedLoginForm_rsa$$.attr("method",
                    "post");
                $$encryptedLoginForm_rsa$$.find('input[name\x3d"username"]').val($encryptedUsername_publicKey$$);
                $$encryptedLoginForm_rsa$$.find('input[name\x3d"password"]').val($encryptedPassword_password$$);
                $$encryptedLoginForm_rsa$$.find('input[name\x3d"spring-security-redirect"]').val($redirectUrl$$);
                $$encryptedLoginForm_rsa$$.append($me$$.$loginForm.find('input[name\x3d"_csrf"]'));
                $me$$.addMobileSupport($$encryptedLoginForm_rsa$$);
                $me$$.addCaptchaAnswer($$encryptedLoginForm_rsa$$);
                $("body").append($$encryptedLoginForm_rsa$$);
                $$encryptedLoginForm_rsa$$.submit()
            }).fail(function ($jqXHR$$, $msg_textStatus$$, $errorThrown$$) {
                $msg_textStatus$$ = AL10N.Global.loginFailTrayAgain();
                400 == $jqXHR$$.status && ($msg_textStatus$$ = AL10N.Global.reqCs());
                XLGames.alert($msg_textStatus$$, function () {
                    // location.reload()
                })
            })
        }, addMobileSupport: function ($$encryptedLoginForm$$) {
            var $$checkSaveUsername$$ = $('input[name\x3d"chk_save_username"]', this.$loginForm),
                $$checkSavePassword$$ = $('input[name\x3d"chk_save_password"]', this.$loginForm);
            0 !== $$checkSaveUsername$$.length &&
            ($$checkSaveUsername$$.is(":checked") && $$encryptedLoginForm$$.append('\x3cinput type\x3d"hidden" name\x3d"chk_save_username" value\x3d"true" /\x3e'), $$checkSavePassword$$.is(":checked") && $$encryptedLoginForm$$.append('\x3cinput type\x3d"hidden" name\x3d"chk_save_password" value\x3d"true" /\x3e'))
        }, addCaptchaAnswer: function ($$encryptedLoginForm$$) {
            this.simpleCaptcha($$encryptedLoginForm$$);
            this.reCaptchaV2($$encryptedLoginForm$$);
            this.reCaptcha($$encryptedLoginForm$$)
        }, simpleCaptcha: function ($$encryptedLoginForm$$) {
            var $$captchaAnswerOrig$$ =
                $('input[name\x3d"captchaAnswer"]', this.$loginForm);
            if (1 === $$captchaAnswerOrig$$.length) {
                var $$captchaAnswerInput$$ = $('\x3cinput type\x3d"hidden" name\x3d"captchaAnswer" value\x3d"" /\x3e');
                $$captchaAnswerInput$$.val($$captchaAnswerOrig$$.val());
                $$encryptedLoginForm$$.append($$captchaAnswerInput$$)
            }
        }, reCaptcha: function ($$encryptedLoginForm$$) {
            var $$captchaAnswerOrig$$ = $("#recaptcha_response_field");
            if (1 === $$captchaAnswerOrig$$.length) {
                var $$captchaAnswerInput$$ = $('\x3cinput type\x3d"hidden" name\x3d"recaptcha_response_field" value\x3d"" /\x3e');
                $$captchaAnswerInput$$.val($$captchaAnswerOrig$$.val());
                $$encryptedLoginForm$$.append($$captchaAnswerInput$$)
            }
            $$captchaAnswerOrig$$ = $("#recaptcha_challenge_field");
            1 === $$captchaAnswerOrig$$.length && ($$captchaAnswerInput$$ = $('\x3cinput type\x3d"hidden" name\x3d"recaptcha_challenge_field" value\x3d"" /\x3e'), $$captchaAnswerInput$$.val($$captchaAnswerOrig$$.val()), $$encryptedLoginForm$$.append($$captchaAnswerInput$$))
        }, reCaptchaV2: function ($$encryptedLoginForm$$) {
            var $$captchaAnswerOrig$$ = $("#g-recaptcha-response");
            if (1 === $$captchaAnswerOrig$$.length) {
                var $$captchaAnswerInput$$ = $('\x3cinput type\x3d"hidden" name\x3d"g-recaptcha-response" value\x3d"" /\x3e');
                $$captchaAnswerInput$$.val($$captchaAnswerOrig$$.val());
                $$encryptedLoginForm$$.append($$captchaAnswerInput$$)
            }
        }, addCapchaRefresh: function ($$useFlag$$) {
            if ($$useFlag$$) $("#refreshButton").on("click", function ($event$$) {
                $("#captchaImage").attr("src", "/captcha?" + (new Date).getMilliseconds())
            })
        }
    })
})(jQuery);