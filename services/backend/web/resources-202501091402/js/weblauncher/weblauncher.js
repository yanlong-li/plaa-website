'use strict';
(function ($$$$) {
    XLGames.namespace("WebLauncher");
    XLGames.WebLauncher = Class.extend({
        init: function ($$obj$$) {
            this.$obj = $$obj$$;
            if (0 == this.$obj.length) return !1;
            XLGames.WebLauncher.$obj = $$obj$$
        }, start: function () {
            var $me$$ = this;
            $me$$.$obj.on("click", function ($e$$) {
                $e$$.preventDefault();
                if ($$$$(this).hasClass("needLogin")) parent.XLGames.CommonUI.confirmLoginRequired(); else if (XLGames.LoginUser.isCertified) {
                    if (!XLGames.WebLauncher.isStartEnable()) return XLGames.WebLauncher.log("게임 시작 중"), !1;
                    XLGames.WebLauncher.StartEnable(!1);
                    XLGames.WebLauncher.GaEvent("gameStartClick");
                    $$$$.ajax({
                        url: "/weblauncher/start",
                        data: {_disableLoginForm: !0},
                        dataType: "json"
                    }).success(function ($msg_res$$) {
                        if (0 == $msg_res$$.result) XLGames.WebLauncher.log("gameRestrict"), $msg_res$$ = XLGames.executeFunctionByName($msg_res$$.reason, window), parent.XLGames.alert($msg_res$$), XLGames.WebLauncher.StartEnable(!0), XLGames.WebLauncher.GaEvent("gameRestrict"); else {
                            XLGames.WebLauncher.GaEvent("launcherStart");
                            var $uri$$ = "plaa://" +
                                $msg_res$$.token;
                            $uri$$ += "\x26channel\x3d" + $msg_res$$.channel;
                            $uri$$ += "\x26locale\x3d" + $msg_res$$.locale;
                            $uri$$ += "\x26region\x3d" + $msg_res$$.region;
                            $me$$.launchUri($uri$$, $me$$.successCallback, $me$$.noHandlerCallback, $me$$.noHandlerCallback)
                        }
                    }).error(function ($jqXHR$$, $textStatus$$, $errorThrown$$) {
                        XLGames.WebLauncher.log("status\x3d" + $jqXHR$$.status + ",textStatus\x3d" + $textStatus$$ + ",errorThrown\x3d" + $errorThrown$$);
                        XLGames.WebLauncher.StartEnable(!0);
                        XLGames.WebLauncher.GaEvent("launcherFail")
                    })
                } else parent.XLGames.CommonUI.confirmCertifyRequired()
            })
        },
        successCallback: function () {
            XLGames.WebLauncher.log("successCallback");
            XLGames.WebLauncher.StartEnable(!0, {delay: 1E4});
            XLGames.WebLauncher.GaEvent("launcherStarted");
            XLGames.WebLauncher.providerTracking()
        }, noHandlerCallback: function ($options$$) {
            $options$$ = $options$$ || {};
            XLGames.WebLauncher.log("noHandlerCallback");
            if ($options$$.isChrome && XLGames.WebLauncher.isPreventNoti()) XLGames.WebLauncher.log("chrome preventNoti"), XLGames.WebLauncher.StartEnable(!0, {delay: 1E4}), XLGames.WebLauncher.GaEvent("launcherStarted"),
                XLGames.WebLauncher.providerTracking(); else {
                XLGames.WebLauncher.StartEnable(!0, $options$$);
                XLGames.WebLauncher.GaEvent("launcherNoHandler");
                var $installer$$ = XLGames.webLauncherUrl,
                    $layerHtml_osVersion_ua$$ = navigator.userAgent.toLowerCase(),
                    $supportOs$$ = /windows nt/.test($layerHtml_osVersion_ua$$);
                $layerHtml_osVersion_ua$$ = /windows nt ([0-9]{1,}.[0-9]{1,})/.exec($layerHtml_osVersion_ua$$);
                $installer$$ = null != $layerHtml_osVersion_ua$$ && 2 == $layerHtml_osVersion_ua$$.length && Number($layerHtml_osVersion_ua$$[1]) >=
                Number("6.2") ? $installer$$ + "/setup.exe" : $installer$$ + "/setupfull.exe";
                $layerHtml_osVersion_ua$$ = "\x3cdiv class\x3d'layer_comm v4launcher'\x3e\x3cdiv class\x3d'head'\x3e\x3ch2\x3e" + AL10N.Weblauncher.install() + "\x3c/h2\x3e\x3ca href\x3d'javascript:;' class\x3d'ico_close closeBtn' id\x3d'okBtn'\x3e" + AL10N.Button.close() + "\x3c/a\x3e\x3c/div\x3e\x3cul class\x3d'txt-launcher'\x3e\x3cli\x3e\x3cstrong\x3e" + AL10N.Weblauncher.install() + "\x3c/strong\x3e- " + AL10N.Weblauncher.reqInstall() + "\x3cbr /\x3e- " + AL10N.Weblauncher.downloadAndInstall() +
                    "\x3ca href\x3d'javascript:;' class\x3d'btn-launcher-download weblauncher-download'\x3e" + AL10N.Weblauncher.btnDownload() + "\x3c/a\x3e\x3c/li\x3e\x3cli\x3e\x3cstrong\x3e" + AL10N.Weblauncher.requestCs() + "\x3c/strong\x3e\x3ca href\x3d'javascript:;' class\x3d'go-faq'\x3e" + AL10N.Weblauncher.btnCs() + "\x3c/a\x3e\x3c/li\x3e";
                $options$$.isChrome && ($layerHtml_osVersion_ua$$ += "\x3cli\x3e\x3cstrong\x3e" + AL10N.Weblauncher.alreadyInstallMsg() + "\x3c/strong\x3e\x3ca href\x3d'javascript:;' class\x3d'prevent-chrome'\x3e" +
                    AL10N.Weblauncher.closeMsg() + "\x3c/a\x3e\x3c/li\x3e");
                $layerHtml_osVersion_ua$$ += "\x3c/ul\x3e\x3cdiv class\x3d'wrap_btn'\x3e\x3cbutton type\x3d'button' class\x3d'btn big closeBtn' id\x3d'okBtn'\x3e" + AL10N.Button.close() + "\x3c/button\x3e\x3c/div\x3e";
                $supportOs$$ || ($layerHtml_osVersion_ua$$ = "\x3cdiv class\x3d'layer_comm v1'\x3e\x3cdiv class\x3d'head'\x3e\x3ch2\x3e" + AL10N.Weblauncher.notSupportOs() + "\x3c/h2\x3e\x3c/div\x3e\x3cdiv class\x3d'txt'\x3e" + AL10N.Weblauncher.reqInstall() + "\x3c/div\x3e\x3cdiv class\x3d'wrap_btn'\x3e\x3cbutton type\x3d'button' class\x3d'btn big closeBtn' id\x3d'okBtn'\x3e" +
                    AL10N.Button.close() + "\x3c/button\x3e\x3c/div\x3e");
                var $$alertMessage$$ = $$$$($layerHtml_osVersion_ua$$);
                $$$$("body").append($$alertMessage$$);
                $$$$(".closeBtn", $$alertMessage$$).off("click").on("click", function () {
                    $$alertMessage$$.aaModalDialog("destroy");
                    return !1
                });
                $$$$(".weblauncher-download", $$alertMessage$$).bind("click", function () {
                    location.href = $installer$$;
                    return !1
                });
                $$$$(".go-faq", $$alertMessage$$).bind("click", function () {
                    XLGames.goLink("faq", "/help/faq");
                    return !1
                });
                $$$$(".prevent-chrome", $$alertMessage$$).bind("click",
                    function () {
                        XLGames.WebLauncher.preventNoti();
                        $$alertMessage$$.aaModalDialog("destroy");
                        return !1
                    });
                $$alertMessage$$.aaModalDialog({zIndex: 5E4});
                $$alertMessage$$.aaModalDialog("open");
                $$$$("#okBtn", $$alertMessage$$).focus();
                $$$$(".layer_comm").on("keydown", function ($e$$) {
                    27 == $e$$.keyCode && $$$$("#okBtn", $$alertMessage$$).click()
                })
            }
        }, unknownCallback: function ($options$$) {
            XLGames.WebLauncher.log("unknownCallback");
            XLGames.WebLauncher.StartEnable(!0);
            XLGames.WebLauncher.GaEvent("launcherUnknown")
        }, openPopup: function ($name$$) {
            return window.open("",
                $name$$, "width\x3d100,height\x3d100,scrollbars\x3dno,left\x3d" + ((window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width) / 2 - 50 + (void 0 != window.screenLeft ? window.screenLeft : screen.left)) + ",top\x3d" + ((window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height) / 2 - 50 + (void 0 != window.screenTop ? window.screenTop : screen.top)))
        }, launchUri: function ($uri$$, $successCallback$$,
                                $noHandlerCallback$$, $unknownCallback$$) {
            var $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$,
                $JSCompiler_object_inline_isFirefox_1_popupUri$$;

            function $callback$$($cb$$, $opts$$) {
                "function" === typeof $cb$$ && $cb$$($opts$$)
            }

            function $createHiddenIframe$$($parent$$) {
                var $hif$$;
                $parent$$ || ($parent$$ = document.body);
                ($hif$$ = document.getElementById(XLGames.WebLauncher._iframeId)) && $removeHiddenIframe$$();
                $hif$$ = document.createElement("iframe");
                $hif$$.id = XLGames.WebLauncher._iframeId;
                $hif$$.src =
                    "about:blank";
                $hif$$.style.display = "none";
                $parent$$.appendChild($hif$$);
                return $hif$$
            }

            function $removeHiddenIframe$$($parent$$) {
                $iframe$$ && ($parent$$ || ($parent$$ = document.body), $parent$$.removeChild($iframe$$), $iframe$$ = null)
            }

            var $popup$$;
            var $JSCompiler_object_inline_isIE_2$$ = $JSCompiler_object_inline_isFirefox_1_popupUri$$ = $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$ = !1;
            var $JSCompiler_object_inline_ieVersion_3$$ = -1;
            var $JSCompiler_object_inline_isEdge_4$$ = !1;
            $JSCompiler_object_inline_ieVersion_3$$ =
                function () {
                    var $rv$$ = -1;
                    if ("Microsoft Internet Explorer" == navigator.appName) {
                        var $ua$$ = navigator.userAgent, $re$$ = /MSIE ([0-9]{1,}[.0-9]{0,})/;
                        null != $re$$.exec($ua$$) && ($rv$$ = parseFloat(RegExp.$1))
                    } else "Netscape" == navigator.appName && ($ua$$ = navigator.userAgent, $re$$ = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/, null != $re$$.exec($ua$$) && ($rv$$ = parseFloat(RegExp.$1)));
                    return $rv$$
                }();
            !window.chrome || navigator.userAgent.match(/Opera|OPR\//) || navigator.userAgent.match(/Edge\//) ? window.chrome && navigator.userAgent.match(/Edge\//) ?
                $JSCompiler_object_inline_isEdge_4$$ = !0 : "undefined" !== typeof InstallTrigger ? $JSCompiler_object_inline_isFirefox_1_popupUri$$ = !0 : 0 < $JSCompiler_object_inline_ieVersion_3$$ && ($JSCompiler_object_inline_isIE_2$$ = !0) : $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$ = !0;
            if (navigator.msLaunchUri && !$JSCompiler_object_inline_isEdge_4$$) XLGames.WebLauncher.log("start IE msLaunchUri"), navigator.msLaunchUri($uri$$, $successCallback$$, $noHandlerCallback$$); else if ($JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$) {
                var $blurHandler$$ =
                    function () {
                        window.clearTimeout($timeout$$);
                        window.removeEventListener("blur", $blurHandler$$);
                        $callback$$($successCallback$$)
                    };
                $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$ = function () {
                    window.removeEventListener("blur", $blurHandler$$);
                    $callback$$($noHandlerCallback$$, {isChrome: !0})
                };
                window.addEventListener("blur", $blurHandler$$);
                var $timeout$$ = window.setTimeout($JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$, 500);
                window.location.href = $uri$$
            } else if ($JSCompiler_object_inline_isEdge_4$$) XLGames.WebLauncher.log("start Edge"),
                $blurHandler$$ = function () {
                    window.clearTimeout($timeout$$);
                    window.removeEventListener("blur", $blurHandler$$);
                    $callback$$($successCallback$$)
                }, $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$ = function () {
                window.clearTimeout($timeout$$);
                window.removeEventListener("blur", $blurHandler$$);
                $callback$$($noHandlerCallback$$)
            }, window.addEventListener("blur", $blurHandler$$), $timeout$$ = window.setTimeout($JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$, 500), navigator.msLaunchUri($uri$$,
                $successCallback$$, $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$); else if ($JSCompiler_object_inline_isFirefox_1_popupUri$$) {
                var $iframe$$ = $createHiddenIframe$$();
                try {
                    $iframe$$.contentWindow.location.href = $uri$$, $timeout$$ = window.setTimeout(function () {
                        window.clearTimeout($timeout$$);
                        $iframe$$.contentDocument ? $callback$$($successCallback$$) : $callback$$($noHandlerCallback$$, {delay: 5E3});
                        $removeHiddenIframe$$()
                    }, 2E3)
                } catch ($e$$) {
                    "NS_ERROR_UNKNOWN_PROTOCOL" === $e$$.name ? $callback$$($noHandlerCallback$$) :
                        $callback$$($unknownCallback$$), $removeHiddenIframe$$()
                }
            } else $JSCompiler_object_inline_isIE_2$$ ? (XLGames.WebLauncher.log("start IE version:" + $JSCompiler_object_inline_ieVersion_3$$), $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$ = "" != XLGames.documentDomain, ($popup$$ = this.openPopup("launcher")) ? ($JSCompiler_object_inline_isFirefox_1_popupUri$$ = $uri$$, $JSCompiler_object_inline_isChrome_0_isChannel_timeoutHandler$$ && ($JSCompiler_object_inline_isFirefox_1_popupUri$$ = "/weblauncher/channel?url\x3d" +
                    encodeURIComponent($uri$$) + "\x26documentDomain\x3d" + encodeURIComponent(XLGames.documentDomain)), $popup$$.location.href = $JSCompiler_object_inline_isFirefox_1_popupUri$$, setTimeout(function () {
                    try {
                        $popup$$.location.href, $callback$$($successCallback$$), $popup$$.setTimeout("window.close()", 100)
                    } catch ($e$$) {
                        XLGames.WebLauncher.log("ex\x3d" + $e$$), $popup$$ = window.open("about:blank", "launcher"), $popup$$.close(), $callback$$($noHandlerCallback$$)
                    }
                }, 500)) : (XLGames.WebLauncher.StartEnable(!0), XLGames.alert("Pop-ups are blocked.\nPlease allow pop-ups."))) :
                ($iframe$$ = $createHiddenIframe$$(), $iframe$$.contentWindow.location.href = $uri$$, window.setTimeout(function () {
                    $removeHiddenIframe$$(void 0);
                    $callback$$($unknownCallback$$)
                }, 500))
        }
    });
    XLGames.WebLauncher.isStartEnable = function () {
        return !XLGames.WebLauncher._status
    };
    XLGames.WebLauncher.StartEnable = function ($flag$$, $options$jscomp$36_opts$$) {
        $options$jscomp$36_opts$$ = $options$jscomp$36_opts$$ || {};
        $flag$$ ? $options$jscomp$36_opts$$.delay ? window.setTimeout(function () {
            XLGames.WebLauncher.$obj.css("cursor",
                "pointer");
            XLGames.WebLauncher._status = !1
        }, $options$jscomp$36_opts$$.delay) : (XLGames.WebLauncher.$obj.css("cursor", "pointer"), XLGames.WebLauncher._status = !1) : (XLGames.WebLauncher.$obj.css("cursor", "wait"), XLGames.WebLauncher._status = !0)
    };
    XLGames.WebLauncher.$obj = null;
    XLGames.WebLauncher._status = !1;
    XLGames.WebLauncher._cookieName = "weblauncher_prevent_noti";
    XLGames.WebLauncher._iframeId = "weblauncher_iframe";
    XLGames.WebLauncher.preventNoti = function () {
        XLGames.WebLauncher._setCookie(XLGames.WebLauncher._cookieName,
            "true", 7300)
    };
    XLGames.WebLauncher.isPreventNoti = function () {
        return null != XLGames.WebLauncher._getCookie(XLGames.WebLauncher._cookieName) ? !0 : !1
    };
    XLGames.WebLauncher._getCookie = function ($cookieName_name$$) {
        $cookieName_name$$ += "\x3d";
        for (var $cookies$$ = document.cookie.split(";"), $i$$ = 0; $i$$ < $cookies$$.length; $i$$++) {
            for (var $cookie$$ = $cookies$$[$i$$]; " " == $cookie$$.charAt(0);) $cookie$$ = $cookie$$.substring(1);
            if (0 == $cookie$$.indexOf($cookieName_name$$)) return $cookie$$.substring($cookieName_name$$.length,
                $cookie$$.length)
        }
        return null
    };
    XLGames.WebLauncher._setCookie = function ($cookieName$$, $cookieValue$$, $expireDays_expires$$) {
        var $date$$ = new Date;
        $date$$.setTime($date$$.getTime() + 864E5 * $expireDays_expires$$);
        $expireDays_expires$$ = "expires\x3d" + $date$$.toUTCString();
        document.cookie = $cookieName$$ + "\x3d" + $cookieValue$$ + "; " + $expireDays_expires$$
    };
    XLGames.WebLauncher.GaEvent = function ($action$$) {
        // gtag("event", $action$$, {
        //     event_category: "webLauncher",
        //     event_label: "" == XLGames.channel ? "xl" : XLGames.channel
        // })
    };
    XLGames.WebLauncher.providerTracking = function () {
    };
    XLGames.WebLauncher.log = function ($msg$$) {
        if (!XLGames.WebLauncher.debug) return !1;
        console.log($msg$$)
    };
    (new XLGames.WebLauncher($$$$(".game-start \x3e a"))).start()
})(jQuery);