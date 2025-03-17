/*jslint browser: true, vars: true, indent: 4, maxerr: 1000, nomen: true, regexp: true */
/*global XLGames, AL10N, ActiveXObject, jQuery, Class, confirm, alert */

/*
 * Ajax Request Default Settings
 */
(function ($) {
	"use strict";

	if (typeof window.XLGames === "undefined") {
		window.XLGames = {};
	}


	XLGames.namespace = function (ns) {
		var parts = ns.split("."),
				parent = XLGames,
				i;

		if (parts[0] === "XLGames") {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i += 1) {
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}

			parent = parent[parts[i]];
		}
		return parent;
	};

	XLGames.namespace("LoginUser");

	XLGames.DEFAULT_ERROR_MESSAGE = {
		message : "시스템 오류입니다. 관리자에게 문의해 주십시오!"
	};

	XLGames.DEFAULT_ERROR_MARK = {
		mark : "<i class=\"ico_error_alert\"></i> "
	};

	//http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
	XLGames.executeFunctionByName = function(functionName, context) {
		var args = Array.prototype.slice.call(arguments).splice(2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for(var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		return context[func].apply(this, args);
	};

	/**
	 * 전역 오류처리기. Cross Domain 요청의 경우 전역 오류처리기는 호출되지 않는다.
	 */
	XLGames.ajaxCommonErrorProcessor = function (event, jqXHR, ajaxSettings, error) {

		if (ajaxSettings.disableGlobalErrorProcessor) {
			return;
		}

		XLGames.CommonUI.LoadingImage.unloading();

		var errorMessage = XLGames.DEFAULT_ERROR_MESSAGE, contentType, isJsonResponse;
		try {
			contentType = jqXHR.getResponseHeader("Content-Type");
			isJsonResponse = contentType !== null && contentType.indexOf("application/json") >= 0;

			if (isJsonResponse) {
				errorMessage = $.parseJSON(jqXHR.responseText);
			}
			if (jqXHR.status === 403) {
				if(jqXHR.getResponseHeader("messageKeys") != undefined) {
					var messageKeys = jqXHR.getResponseHeader("messageKeys");
					errorMessage = {message:"", messageKeys:messageKeys};
					var msgs = messageKeys.split(",");
					for(var a in msgs) {
						errorMessage.message += XLGames.executeFunctionByName(msgs[a], window) + "\n";
					}
					if (messageKeys != 'AL10N.Global.loginRequired') {
						errorMessage.message += 'Please contact to customer support';;
					}
				} else {
					errorMessage = {message: 'Forbidden'};
				}
			}
		} catch (ex) {
			// ignored
		}

		if (!errorMessage.message) {
			errorMessage = XLGames.DEFAULT_ERROR_MESSAGE;
		}
		errorMessage.message = errorMessage.message.replace('<br />', '\n');
		errorMessage.message = errorMessage.message.replace('<br/>', '\n');
		errorMessage.message = errorMessage.message.replace('<br>', '\n');

		var isAccessParent = true;
		try{
			parent.document;
		}catch(E){
			isAccessParent = false;
		}
		var xlgamesObj = XLGames;
		if(isAccessParent){
			xlgamesObj = parent.XLGames;
		}
		if (errorMessage.messageKeys && errorMessage.messageKeys == 'AL10N.Global.loginRequired') {
			xlgamesObj.CommonUI.confirmLoginRequired();
		} else if (errorMessage.messageKeys && errorMessage.messageKeys == 'AL10N.Global.accessDeniedNotCertifiedUser') {
			xlgamesObj.CommonUI.confirmCertifyRequired();
		} else if (errorMessage.messageKeys && errorMessage.messageKeys == 'AL10N.Global.accessDeniedGuardianAgreeWaitUser') {
			xlgamesObj.CommonUI.confirmGuardianAgreeRequired();
		} else {
			xlgamesObj.alert(errorMessage.message);
		}
	};

	/*
	 * double submit 방지
	 * ex) $('#my_form').preventDoubleSubmit();
	 *
	 * jquery validation이 걸려있는 폼에는 사용하면 안됩니다!
	 * 현재 GNB 로그인에서만 사용하는 용도입니다.
	 *
	 * jquery validation 사용시 double submit 방지
	 * http://stackoverflow.com/questions/5996950/jquery-validate-plugin-prevent-double-submit-on-validation
	 *
	 */
	$.fn.preventDoubleSubmit = function() {
		$(this).submit(function() {
			if (this.beenSubmitted)
				return false;
			else
				this.beenSubmitted = true;
		});
	};

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
		var targetUrl = options.url;
		if( targetUrl.indexOf('/') == 0 && token != null && header != null) {
			xhr.setRequestHeader(header, token);
		}
	});

	/*
	 * jQuery.ajax 호출 기본 설정
	 */
	$.ajaxSetup({
		cache : false,
		dataType : "json",
		timeout : 60000, // 60 seconds
		type : "post"
	});

	$(document).ajaxError(XLGames.ajaxCommonErrorProcessor);

	/*
	 * 동적으로 스크립트 가지고 오기
	 * 인수 개수를 하나씩 제거하면서 스크립트를 다운 받고
	 * 마지막에는 스크립트를 다운 받은후 callback함수 실행
	 * */
	XLGames.cachedScript = function() {
		var currArg = arguments[0];
		var nextArg = arguments[1];
		var nextArguments = Array.prototype.slice.call(arguments, 1);

		if (typeof nextArg === 'string') {
			XLGames.getScript(currArg, function () {
				XLGames.cachedScript.apply(null, nextArguments);
			});
		} else {
			XLGames.getScript(currArg, nextArg);
		}
	};

	XLGames.getScript = function(url, callback) {
		var options = {
			"disableGlobalErrorProcessor" : true,
			"dataType" : "script",
			"cache" : true,
			"corssDomain" : true,
			"url" : url,
			"type": "get"
		};
		if (callback) {
			$.ajax(options).done(callback);
		} else {
			$.ajax(options);
		}
	};


	// 다이얼로그로 경고창 출력
	XLGames.alert = function (str, okFunction) {
		if(XLGames.isMobileView || $(".nav-menu").is(":visible")) {
			alert(str);
			return false;
		}
		var escaped = XLGames.Utils.escapeHtml(str);
		escaped = escaped.split("\n").join("<br/>");

		XLGames.alertHtml(escaped, okFunction);
	};

	XLGames.alertHtml = function (html, okFunction) {
		var $alertMessage = $("<div class='layer_comm'>"
						+ "<div class='txt'>"
						+ html
						+ "</div>"
						+ "<div class='wrap_btn'>"
						+ "<button type='button' class='btn-modal' id='okBtn'>"+ "OK" +"</button>"
						+ "</div>");
		$("body").append($alertMessage);

		$("#okBtn", $alertMessage).bind("click", function () {
			$alertMessage.aaModalDialog('destroy');

			if (okFunction) {
				okFunction();
			}
			return false;
		});

		$alertMessage.aaModalDialog({
			zIndex : 50000,
			bgClickObj : $('.layer_comm #okBtn')
		});

		$alertMessage.aaModalDialog("open");

		$("#okBtn", $alertMessage).focus();
		$(".layer_comm").bind("keydown", function (e) {
			if (e.keyCode == 27) {
				$("#okBtn", $alertMessage).click();
			}
		});
	}

	XLGames.confirm = function (str, okFunction, cancelFunction, okButtonLabel, cancelButtonLabel, eventElement) {
		XLGames.confirmJson({
			msg : str,
			okFn : okFunction,
			cancelFn : cancelFunction,
			okLabel : okButtonLabel,
			cancelLabel : cancelButtonLabel,
			eventElement : eventElement
		});
	}
	/*
	 * 다이얼로그 확인버튼
	 *
	 * str을 제외하고 모두 생략 가능하며 생략시 기본값을 사용한다.
	 */
	XLGames.confirmJson = function(opt){
		var str = opt.msg;
		var okFunction = opt.okFn;
		var cancelFunction = opt.cancelFn;
		var okButtonLabel = opt.okLabel;
		var cancelButtonLabel = opt.cancelLabel;
		var eventElement = opt.eventElement;
		var closeObj = opt.closeObj;

		if(XLGames.isMobileView){
			if(confirm(str)){
				if( !!okFunction && typeof okFunction === 'function' ){
					okFunction();
				}
			}
			return false;
		}
		var escaped = XLGames.Utils.escapeHtml(str);
		escaped = escaped.split("\n").join("<br/>");
		if (typeof okButtonLabel === "undefined" || okButtonLabel === null) {
			okButtonLabel = 'Ok';
		}

		if (typeof cancelButtonLabel === "undefined" || cancelButtonLabel === null) {
			cancelButtonLabel = 'Cancel';
		}
		var $confirmMessage = $("<div class='layer_comm'>"
							+ "<div class='txt'>" + escaped + "</div>"
							+ "<div class='wrap_btn'>"
							+	"<button type='button' class='btn-modal' id='okBtn' style='margin-right:5px;'>" + okButtonLabel+ "</button>"
							+ 	"<button type='button' class='btn-modal' id='cancelBtn'>" + cancelButtonLabel+"</button>"
							+ "</div>");

		$("#okBtn", $confirmMessage).bind("click", function () {
			$confirmMessage.aaModalDialog('destroy');

			if (typeof okFunction === 'function') {
				if (typeof eventElement === 'undefined' || eventElement === null) {
					okFunction();
				} else {
					okFunction(eventElement);
				}
			}
			return false;
		});

		$("#cancelBtn", $confirmMessage).bind("click", function () {
			$confirmMessage.aaModalDialog('destroy');
			try {
				if (typeof cancelFunction === "function") {
					cancelFunction();
				}
			} catch (e) {
			}
			return false;
		});

		$("body").append($confirmMessage);
		$confirmMessage.aaModalDialog({
			zIndex : 50000,
			bgClickObj : closeObj
		});

		$confirmMessage.aaModalDialog("open");

		$("#okBtn", $confirmMessage).focus();
		$(".layer_comm").bind("keydown", function (e) {
			if (e.keyCode == 27) {
				$("#cancelBtn", $confirmMessage).click();
			}
		});
	};

	// 버튼이 없는 창을 만든다.
	XLGames.ajaxLoadAlert = function (message, aaModalOptions) {

		if (typeof message === "undefined") {
			message = null;
		}

		var messageHtml = "";
		if (message !== null) {
			messageHtml = "<p class='aa_contents aa_dialog_message'>" + message + "</p>";
		}
		aaModalOptions = $.extend({
			zIndex : 5000
		}, aaModalOptions);

		var $alertMessage = $("<div class='aa_dialog hidden'>"
						+ messageHtml
						+ "    <p class='aa_contents aa_dialog_ajax_load_image'><img  style='margin-left: auto; margin-right: auto' src='"
						+ XLGames.Url.img('/images/common/ajax-loader.gif') + "'/></p>" + "</div>");

		function finishAjaxLoad() {
			$alertMessage.aaModalDialog('destroy');
		}

		$("body").append($alertMessage);

		$alertMessage.aaModalDialog(aaModalOptions);

		$alertMessage.aaModalDialog("open");
		return finishAjaxLoad;
	};

	/**
	 * 이미지에 MouseOver시 더큰 프리뷰가 나오도록 하는 함수. 이미지 구성은 <span class="imagePreview"
	 * data-preview="프리뷰이미지"><img src="작은이미지" /></span>
	 */
	XLGames.imagePreview = function () {
		var xOffset = 50;
		var yOffset = 30;

		var previews = $("span.imagePreview.needBinding");
		previews.hover(function (e) {
			this.t = this.title;
			this.title = "";
			var c = (this.t !== "") ? "<br/>" + this.t : "";
			var url = $(this).data("preview");
			$("body").append("<p id='imagePreview'><img src='" + url + "' alt='Image preview' />" + c + "</p>");
			$("#imagePreview").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px").fadeIn("fast");
		}, function () {
			this.title = this.t;
			$("#imagePreview").remove();
		});
		previews.mousemove(function (e) {
			$("#imagePreview").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px");
		});

		previews.removeClass("needBinding");
	};

	$.fn.justOwnText = function() {
			return $(this).clone()
							.children()
							.remove()
							.end()
							.text();

	};

	$.fn.tooltip = function (options) {
		var opts = $.extend({
				xOffset : 10,
				yOffset : 20,
				message : null
			}, $.fn.tooltip.defaults, options);

		var xOffset = opts.xOffset;
		var yOffset = opts.yOffset;
		var message = opts.message;

		var $target = $(this);

		$target.hover(
			function (e) {

				if (message === null) {
					this.t = this.title;
					this.title = "";
					message = this.t;
				}

				$("body").append("<p id='tooltip'>" + message + "</p>");
				$("#tooltip").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px")
								.fadeIn("fast");
			},

			function () {
				if ((typeof this.t) !== "undefined") {
					this.title = this.t;
				}
				$("#tooltip").remove();
			}
		);

		$target.mousemove(function (e) {
			$("#tooltip").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px");
		});
	};

	XLGames.namespace("Utils");

	XLGames.Utils.unbindClickBtn = function ($btn) {
		$btn.unbind('click');
	};

	XLGames.Utils.isRestrictedAccount = function () {
		if (XLGames.LoginUser.isRestrictedAccount) {
			XLGames.alert("This account is being restricted. If you have any inquiries, please contact us through 1:1 Inquiry.");
			return true;
		}
		return false;
	};

	/**
	 * 아키에이지 게임내 브라우저 인지 여부 리턴
	 */
	XLGames.Utils.isArcheAgeBrowser = function () {
		return navigator.userAgent.indexOf("ArcheAge") > 0;
	};

	XLGames.Utils.isIE7 = function() {
		return navigator.userAgent.indexOf('MSIE 7') > 0;
	};
	XLGames.Utils.isIE8 = function() {
		return navigator.userAgent.indexOf('MSIE 8') > 0;
	};
	XLGames.Utils.isIE9 = function() {
		return navigator.userAgent.indexOf('MSIE 9') > 0;
	};

	XLGames.Utils.isIE = function() {
		var userAgent = navigator.userAgent;
		return (userAgent.indexOf('MSIE') >= 0 || !!userAgent.match(/Trident.*rv\:/));
	};
	
	XLGames.Utils.isMobile = function(){
  		var check = false;
  		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  		return check;
	}

	XLGames.Utils.getIEversion = function() {
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
		} else if (navigator.appName == 'Netscape') {
			var ua = navigator.userAgent;
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
		}
		return rv;
	};

	/**
	 * 문자열에서 모든 태그를 제거한다.
	 */
	XLGames.Utils.stripTags = function (text) {
		if (!text) {
			return text;
		}

		return text.replace(/(<([^>]+)>)/ig, "");
	};

	/**
	 * jQuery 객체에서 text 값을 추출한다. IE 의 경우 $(object).text()의 처리가 불완전하다.
	 */
	XLGames.Utils.getText = function ($dom) {
		if (!$.browser.msie) {
			return $dom.text();
		}

		var text = $dom.html();
		text = text.replace(/<BR\s*\/?>/mgi, "\n"); // <BR/>을 새줄기호로.
		text = XLGames.Utils.stripTags(text);
		return text;
	};

	XLGames.Utils.removeCr = function (v) {
		return $.trim(v);
	};

	XLGames.Utils.getHttpUrl = function (url) {
		if (!url) {
			return url;
		}

		if (url.indexOf('//') !== 0) {
			return url;
		}
		return 'http:' + url;
	};

	/**
	 * 입력창의 입력 글 수가 maxlength를 넘어서면 warning class를 적용한다.
	 */
	XLGames.Utils.bindTextLengthWarning = function ($textarea, maxlength, getLengthCallback) {
		if (!getLengthCallback) {
			getLengthCallback = XLGames.Utils.bindTextLengthWarning.defaultGetLengthCallback;
		}

		$textarea.bind("keyup", function () {
			var value = $(this).val();
			var textLength = getLengthCallback($textarea);
			if (!textLength && textLength !== 0) {
				throw new Error("getLengthCallback returns nothing.");
			}
			if (textLength > maxlength) {
				$(this).addClass("warning");
			} else {
				$(this).removeClass("warning");
			}
		});
	};

	/**
	 * 기본 getLengthCallback : textarea로 간주.
	 */
	XLGames.Utils.bindTextLengthWarning.defaultGetLengthCallback = function ($target) {
		// $target is <textarea>
		return $target.val().length;
	};

	/**
	 * 컨텐츠 영역의 글자 수를 계속 체크하여 maxlength를 넘어가면 callback을 수행한다.
	 * callback은 Maxlength를 넘어가면 true를 인자로 받고 아니면 false를 받는다.
	 */
	XLGames.Utils.bindTextLengthError = function ($textarea, maxlength, callback, getLengthCallback) {
		if (!getLengthCallback) {
			getLengthCallback = XLGames.Utils.bindTextLengthWarning.defaultGetLengthCallback;
		}
		$textarea.bind("keyup", function (e) {
			var textLength = getLengthCallback($textarea);
			if (!textLength && textLength !== 0) {
				throw new Error("getLengthCallback returns nothing.");
			}
			if (textLength > maxlength) {
				callback(true);
			} else {
				callback(false);
			}
		});
	};

	/**
	 * 숫자로만 이루어진 문자열인지 검사.
	 */
	XLGames.Utils.isNumber = function (val) {
		return (/^-?((\d+\.?\d?)|(\.\d+))$/).test(val);
	};

	XLGames.Utils.escapeHtml = function (str) {
		if (str === null || str.length === 0) {
			return "";
		}

		var escaped = str.toString().replace(/&/g, "&amp;");
		escaped = escaped.replace(/</g, "&lt;");
		escaped = escaped.replace(/>/g, "&gt;");
		escaped = escaped.replace(/"/g, "&quot;");
		escaped = escaped.replace(/'/g, "&#39;"); // Do Not use &apos; -
		// IE does not allow it.''
		return escaped;
	};

	/**
	 * 이미지 파일인져 어부를 확인한다.
	 *
	 */
	XLGames.Utils.isImageFile = function (filename) {
		if (!filename || typeof filename ==='undefined' ) {
			return false;
		}

		if ( (typeof filename).toLowerCase() !== 'string') {
			filename = filename.name;
		}

		filename = filename.toLowerCase();
		return filename.match(/.*\.(jpe?g|png|gif)$/i);
	};

	XLGames.Utils.isTextFile = function (filename) {
		if (!filename || typeof filename ==='undefined' ) {
			return false;
		}

		if ( (typeof filename).toLowerCase() !== 'string') {
			filename = filename.name;
		}

		filename = filename.toLowerCase();
		return filename.match(/.*\.(txt)$/i);
	};


	/** jQuery.ajaxForm.beforeSubmit의 formData[{name:'폼이름', value:"폼값"}, ...]에서 값을 읽어들인다. */
	XLGames.Utils.getAjaxFormDataValue = function (formData, formFieldName) {
		var i;

		for (i = 0; i < formData.length; i += 1) {
			if (formFieldName === formData[i].name) {
				var value = formData[i].value;
				if (typeof value === 'string') {
					return value;
				}

				// String이 아닌 타입에 대해 특별 처리가 필요하다.
				if (value instanceof File) {
					return value.name;
				}

				throw 'Unknown field type : ' + formFieldName;
			}
		}

		return null;
	};

	/**
	 * OS를 판별한다.
	 */
	XLGames.Utils.getOS = function () {
		var ua = navigator.userAgent;

		if (ua.indexOf("NT 6.1") > -1 ) return "Windows 7";
		else if(ua.indexOf("NT 6.0") > -1) return "Windows Vista/Server 2008";
		else if(ua.indexOf("NT 5.2") > -1) return "Windows Server 2003";
		else if(ua.indexOf("NT 5.1") > -1) return "Windows XP";
		else if(ua.indexOf("NT 5.0") > -1) return "Windows 2000";
		else if(ua.indexOf("NT") > -1) return "Windows NT";
		else if(ua.indexOf("9x 4.90") > -1) return "Windows Me";
		else if(ua.indexOf("98") > -1) return "Windows 98";
		else if(ua.indexOf("95") > -1) return "Windows 95";
		else if(ua.indexOf("Win16") > -1) return "Windows 3.x";
		else if(ua.indexOf("Windows") > -1) return "Windows";
		else if(ua.indexOf("Linux") > -1) return "Linux";
		else if(ua.indexOf("Macintosh") > -1) return "Macintosh";
		else return "";
	};

	/**
	 * 0 부터 지정된 수 보다 바로 1작은 수까지 랜덤으로 리턴한다.
	 *
	 * @param excludedMax 나올 수 있는 숫자의 갯수. 예) 3을 지정하면 0,1,2 가 리턴될 수 있다.
	 * @returns 난수
	 */
	XLGames.Utils.random = function(excludedMax) {
		var size = ("" + excludedMax).length;
		var base = 1;
		for (var i = 0; i <= size; i++) {
			base *= 10;
		}

		return Math.floor(Math.random() * base) % excludedMax;
	};

	/**
	 * 새로고침시 조회수 조작을 막기 위해서 쿠키를 생성한다.
	 * ex ) notice='1234%2C111%2C4444'
	 */
	XLGames.Utils.makeHitCountCookie = function(cookieName, value){
		var COOKIE_DELIM = "|";
		var cookieValue = $.cookie(cookieName);
		if( cookieValue != null ){
			var cookieValues = cookieValue.split(COOKIE_DELIM);
			for( var i in cookieValues){
				if( value == cookieValues[i]){
					return;
				}
			}
			if( cookieValue.length > 3000){
				cookieValue = cookieValue.substring( cookieValue.indexOf(COOKIE_DELIM)+1);
			}
			cookieValue += COOKIE_DELIM + value;
		} else {
			cookieValue = value;
		}

		var expireDate = new Date();
		expireDate.setTime( expireDate.getTime() + ( 24*60*60*1000) );
		$.cookie(cookieName, cookieValue, {path: '/', expires : expireDate , raw : true});
	}

	/**
	 * Firebug 등이 없는 환경을 위해 가짜 console.log를 생성한다.
	 */
	if (typeof window.console === "undefined") {
		window.console = {};
		console.log = function () {
			// do nothing;
		};
	}

	/**
	 * JavaScript 메시지 지역화 /static_resources/js/localization 에서 참조함.
	 */
	XLGames.Localization = {
		message : function (text) {
			return function () {
				var args = [ text ];
				args = args.concat(Array.prototype.slice.apply(arguments));
				return XLGames.Localization.format.apply(null, args);
			};
		},

		format : function (text) {
			var tokenCount, token;

			if (arguments.length <= 1) {
				return text;
			}
			tokenCount = arguments.length - 2;
			for (token = 0; token <= tokenCount; token += 1) {
				text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
			}
			return text;
		}
	};

	/**
	 * 지역화 메시지는 AL10N 객체 아래에 넣는다.
	 */
	window.AL10N = {};

	XLGames.Url = {
		img : function (uri) {
			if( !uri ){
				console.log('uri is Empty!!');
				return '';
			}
			if( uri.indexOf("/") != 0 ){
				uri = "/"+ uri;
			}
			return XLGames.imgPrefix + uri;
		}
	};

	XLGames.goLink = function(pageType, pageUrl) {
		pageUrl = pageUrl == null ? '/' : pageUrl;
		if (pageType == 'faq') {
			location.href = XLGames.domains.cs + pageUrl;
		} else if (pageType == 'xlcash') {
			location.href = XLGames.domains.xlcache + pageUrl;
		} else if (pageType == 'security') {
			location.href = XLGames.domains.cs + pageUrl;
		} else if (pageType == 'member') {
			location.href = XLGames.domains.account + pageUrl;
		}
	};

	XLGames.getAwDomain = function() {
		return XLGames.awDomain;
	};

	XLGames.namespace("Web");

	XLGames.Web.isLogined = function () {
		return  typeof XLGames.LoginUser.isGuest == "boolean" && !XLGames.LoginUser.isGuest;
	};

	XLGames.Web.hasCharacters = function () {
		return !(XLGames.LoginUser.representativeUserCharacter === null || XLGames.LoginUser.representativeUserCharacter === undefined || XLGames.LoginUser.representativeUserCharacter.uuid === undefined);
	};

	/** 플래시 활성화 여부 검사 */
	XLGames.isFlashEnabled = (function () {
		try {
			var fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			if (fo) {
				return true;
			}
			return false;
		} catch (ex) {
			return !!((navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
							: false);
		}
	}());


	$.fn.bindClickGA = function(opt){
		var $me = this;
		$me.opt = opt || {};
		$me.off('click.ga').on('click.ga', function(e){
			var $this = $(this);
			var $parent = $this.parents('[data-action]').eq(0);
			var linkUrl = $this.attr("href");
			var action = $this.data('action') || $parent.data("action") || $me.opt.action;
			var category = $this.data('category') || $parent.data("category") || $me.opt.category;
			if(!linkUrl  || linkUrl === '' || linkUrl === '#none' || linkUrl === 'javascript:;'){
				linkUrl = '';
			}
			var label = $(this).data('label') || linkUrl || 'none';
			var isPopup = $this.attr('target') === '_blank';
			if( !isPopup ){
				e.preventDefault();
			}
			XLGames.sendEventGA( { category : category, action : action, label : label, linkUrl: linkUrl, isPopup : isPopup });
		});
	}
	XLGames.jsonHeader = function(){
		var csrfHeader = $("meta[name='_csrf_header']").attr("content");
		var csrfValue = $("meta[name='_csrf']").attr("content");
		var headerJson = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Requested-With' : 'XMLHttpRequest',
			[csrfHeader]: csrfValue
		}
		return headerJson;
	}
	/**
	    var opt = {
			category : 'categoryName' , action : 'actionName' ,
		    label : '/events' , linkUrl : '/events' , isPopup : true,
		    hitCallback : function(){
		    	location.reload();
		    }
		}
		XLGames.sendEventGA(opt);
	 */
	XLGames.sendEventGA = function(opt){
		if( !opt.category || !opt.action ){
			return;
		}
		var linkUrl = opt.linkUrl;
		if(!linkUrl  || linkUrl === '' || linkUrl === '#none' || linkUrl === 'javascript:;'){
			linkUrl = '';
		}
		if( !opt.hitCallback && ( opt.isPopup || !linkUrl) ){
			gtag('event', opt.action, {
				'event_category': opt.category, 
				'event_label':  ( opt.label || 'none' ) 
			});
			return;
		}
		var redirectFunction = function(){
			location.href = linkUrl;
		}
		gtag('event', opt.action, {
			'event_category': opt.category, 
			'event_label': (opt.label || linkUrl || 'none'),
			event_callback : createFunctionWithTimeout(  opt.hitCallback || redirectFunction )
		});
	}
	function createFunctionWithTimeout(callback, opt_timeout){
		  var called = false;
		  function fn() {
		    if (!called) {
		      called = true;
		      callback();
		    }
		  }
		  setTimeout(fn, opt_timeout || 300);
		  return fn;
	}
	/**
	 * 각종 유틸리티 추가.
	 */
	$.aa = {
		/**
		 * @func replaceAll(value,value,value) return value
		 * @brief 문자열 치환
		 */
		replaceAll : function(val, str, change) {
			return val.split(str).join(change);
		},
		/**
		 * @func isEmpty(value) return boolean
		 * @brief 빈값 여부 확인
		 */
		isEmpty : function(val) {
			var is_type = typeof val;

			if (val == null || val == 'undefined' || typeof val == 'undefined') {
				return true;
			} else if (is_type == 'string') {
				val = this.replaceAll(val, /\s+/g, '');
				if (val == '') {
					return true;
				}
			}

			return false;
		},
		/**
		 * input type
		 */
		isEmptyText : function(element, message) {
			if (this.isEmpty(element.val())) {
				alert(message);
				element.focus();
				return true;
			}

			return false;
		},
		/**
		 * @func isRegnum(value) return boolean
		 * @brief 대한민국 주민등록번호가 올바른지 판단한다.
		 */
		isRegnum : function(val) {
			val = val.replace(/[^0-9]+/g, '');

			var count = 1;
			var total = 0;

			for ( var i = 0; i < 12; i++) {
				if (count > 8) {
					count = 1;
					count++;
				} else {
					count++;
				}

				total += parseInt(val.charAt(i), 10) * count;
			}

			var mod = total % 11;
			var check = 11 - mod;

			if (check == 10) {
				check = 0;
			}
			if (check == 11) {
				check = 1;
			}

			if (check == parseInt(val.charAt(12), 10)) {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * @func isCount(min|max,number,value) return boolean
		 * @brief 문자열 최대 길이와 최소길이를 판단한다.
		 */
		isCount : function(mode, num, val) {
			val = new String(val);
			var len_val = val.length;

			if ((len_val < num && mode == 'min_length')
					|| (len_val > num && mode == 'max_length')) {
				return false;
			} else {
				return true;
			}
		},
		/**
		 * 앵커 값을 반환
		 */
		getAnchor : function(s) {
			var anchorRegExp = new RegExp(/#(.*)$/);
			var a = s.match(anchorRegExp);
			return (a && a[1]) ? a = a[1] : "";
		},
		noArticle: function(subject) {
			alert(subject +"이 없습니다.");
			return false;
		}
	};

	/**
	 * 링크를 새창을 열도록 변경한다.
	 */
	$.fn.makeOutLink = function () {
		$(this).each(function (index) {
			var $obj = $(this);
			var href = $obj.attr('href');
			if ( /^http(s?):\/\/.+/.test(href) ){
				$(this).attr("target", "_blank");
				return true;
			}
		    $obj.attr('href', '#none');
		    $obj.attr('data-old', href);
		});
	};

	/**
	 * 동영상 링크를 동영상을 직접 보여주도록 변경한다.
	 */
	$.fn.embedVideos = function (closed) {
		if (!XLGames.isFlashEnabled && XLGames.Utils.isIE8()) {
			return;
		}
		closed = !!closed;

		var width = 600;
		var height = 365;
		if(XLGames.isMobileBrowser && XLGames.isMobileView) {
			width = $(window).width() - 30;
		}
		var i;

		var videos = [
			{
				name : "youtube",
				urlfetcher : "a[href*='youtube.com/watch?']",
				codeRegex : /[\?|&]v=([a-zA-Z0-9\-_]+)\b/,
				generateTags : function (code) {
					code = XLGames.Utils.escapeHtml(code);

					return '<div style="margin: 10px 0"><iframe title="YouTube video player" width="' + width + '" height="' + height
									+ '" src="https://www.youtube.com/embed/' + code + '?showinfo=0&rel=0&wmode=transparent'
									+ '" frameborder="0" allowfullscreen></iframe></div>';
				}
			},
			{
				name : "youtu.be",
				urlfetcher : "a[href*='//youtu.be/']",
				codeRegex : /youtu\.be\/([a-zA-Z0-9\-_]+)\b/,
				generateTags : function (code) {
					code = XLGames.Utils.escapeHtml(code);

					return '<div style="margin: 10px 0"><iframe title="YouTube video player" width="' + width + '" height="'
									+ height + '" src="https://www.youtube.com/embed/' + code + '?showinfo=0&rel=0&wmode=transparent'
									+ '" frameborder="0" allowfullscreen></iframe></div>';
				}
			},
			{
				name : "Vimeo",
				urlfetcher : "a[href^='http://vimeo.com/']",
				codeRegex : /vimeo.com\/([0-9]+)\b/,
				generateTags : function (code) {
					code = XLGames.Utils.escapeHtml(code);

					return '<div style="margin: 10px 0"><iframe src="https://player.vimeo.com/video/' + code + '?portrait=0" width="'
									+ width + '" height="' + height + '" frameborder="0"></iframe></div>';
				}
			},
			{
				name : "Vimeo_https",
				urlfetcher : "a[href^='https://vimeo.com/']",
				codeRegex : /vimeo.com\/([0-9]+)\b/,
				generateTags : function (code) {
					code = XLGames.Utils.escapeHtml(code);

					return '<div style="margin: 10px 0"><iframe src="https://player.vimeo.com/video/' + code + '?portrait=0" width="'
									+ width + '" height="' + height + '" frameborder="0"></iframe></div>';
				}
			},
			{
				name : "Naver Blog IFrame",
				urlfetcher : "a[href*='naver.com/flash/convertIframeTag.nhn']",
				codeRegex : /(.*)/,
				generateTags : function (code) {
					code = XLGames.Utils.escapeHtml(code);
					code = code.replace('http:', 'https:');

					return '<div style="margin:10px 0"><iframe width="' + width + '" height="' + height + '" src="' + code
					+ '" frameborder="0" scrolling="no"></iframe></div>';
				}
			},
			{
				name : "KAKAO TV IFrame",
				urlfetcher : "a[href*='//tv.kakao.com/v/']",
				codeRegex : /\/v\/([a-zA-Z0-9\-_]+)\b/,
				generateTags : function (code) {
					code = XLGames.Utils.escapeHtml(code);
					code = code.replace('http:', 'https:');

					return '<div style="margin:10px 0"><iframe width="' + width + '" height="' + height
					+ '" src="https://tv.kakao.com/embed/player/cliplink/' + code + '?service=kakao_tv'
					+ '" frameborder="0" scrolling="no" allowfullscreen></iframe></div>';
				}
			},
			{
				name : "KAKAO TV IFrame",
				urlfetcher : "a[href*='//tv.kakao.com/channel']",
				codeRegex : /\/cliplink\/([a-zA-Z0-9\-_]+)\b/,
				generateTags : function (code) {
					code = XLGames.Utils.escapeHtml(code);
					code = code.replace('http:', 'https:');

					return '<div style="margin:10px 0"><iframe width="' + width + '" height="' + height
					+ '" src="https://tv.kakao.com/embed/player/cliplink/' + code + '?service=kakao_tv'
					+ '" frameborder="0" scrolling="no" allowfullscreen></iframe></div>';
				}
			}
		];

		function getCode(url, regex) {
			var matches = url.match(regex);
			if (matches === null) {
				return null;
			}
			return matches[1];
		}

		var $wrapper = $(this);
		for (i = 0; i < videos.length; i += 1) {
			var video = videos[i];
			if(!XLGames.isFlashEnabled && video.flash) {
				continue;
			}
			var $videoTags = $(video.urlfetcher, $wrapper);

			$videoTags.each(function () {
				var $videoTag = $(this);
				var url = $videoTag.attr("href");
				var code = getCode(url, video.codeRegex);
				var $br = $videoTag.next("br");
				var generatedTags = video.generateTags(code);
				var $embedTags = $(generatedTags);

				var $fold, $foldIcon;
				var openText="동영상 보기", openIconHtml="<i class='ico_open_view'></i>";
				var closeText="동영상 닫기", closeIconHtml="<i class='ico_close_view'></i>";

				if (closed) {
					$embedTags.hide();

					var buttonHtml;
					$fold = $(" <button class='video_toggle'>" + openText + openIconHtml + "</button>");
					$foldIcon = $('i', $fold);

					$fold.insertAfter($videoTag);

					$fold.on('click', function () {
						$embedTags.toggle();
						var $button = $(this);

						$button.html("");
						if ($embedTags.is(":visible")) {
							$button.text(closeText);
							$button.append(closeIconHtml);
						} else {
							$button.text(openText);
							$button.append(openIconHtml);
						}
						return false;
					});
				}

				if ($br.get().length === 1) {
					$embedTags.insertBefore($br);
				} else {
					$embedTags.appendTo($videoTag.parent());
				}

				if (video.afterInsertCallback) {
					video.afterInsertCallback(code, closed);
				}
			});
		}
	};
	$.fn.embedVideos.soundcloundId = 0;

	$.fn.inputSelector = function (options) {
		this.mouseup(function () {
			var jqInput = $(this);
			var userSelection = false;
			var domInput = $(this).get(0);
			var selectionLength;

			if (document.selection) { // For IE
				domInput.focus();
				if (document.selection.createRange().text.length > 0) {
					userSelection = true;
				}
			} else {
				if (domInput.selectionStart || domInput.selectionStart === '0') {
					selectionLength = domInput.selectionEnd - domInput.selectionStart;
					if (selectionLength > 0) {
						userSelection = true;
					}
				}
			}
			if (jqInput.hasClass('text-selected')) {
				jqInput.removeClass('text-selected');
			} else {
				jqInput.addClass('text-selected');
				if (!userSelection) {
					jqInput.select();
				}
			}
		});
	};

	/**
	 * 링크의 href 문서를 window.open 함수를 통해 새 창으로 연다. 링크의 href 값 : 열 문서의 URL 링크의
	 * data-features : window.open의 feature 인자값. width, height, status, toolbar,
	 * location, menubar, scrollbars, resizable 등
	 *
	 * 일반적으로 다음과 같이 지정하면 적당하다.
	 *
	 * width=넓이,height=높이,menubar=no,toolbar=no,status=no,scrollbars=no,resizable=yes
	 */
	$.fn.openWindow = function () {
		this.click(function () {
			var $link = $(this);

			var url = $link.attr("href");
			var windowTitle = $link.attr("window-title");
			var features = $link.data("features");

			window.open(url, windowTitle, features);
			return false;
		});
	};

	$.fn.imgPreload = function () {
		this.each(function () {
			$('<img/>')[0].src = XLGames.Url.img(this);
		});
	};
	
	XLGames.Utils.resetIboxIframeHeight = function () {
		var $iframe = $(window.parent.document.getElementById("ifContent"));

		if ($iframe.length == 0) {
			return;
		}
		$iframe.css('height', 500);
		var $subBody = $iframe.contents().find("body");
		var bodyHeight = Math.max($subBody[0].scrollHeight, 900);
		bodyHeight = bodyHeight + 20;
		if( $iframe.height() != bodyHeight ){
			$iframe.css('height', bodyHeight+'px' );
			$iframe.css('width', '1090px' );
		}
		return false;
	}
}(jQuery));

/*
 * Simple JavaScript Inheritance By John Resig http://ejohn.org/
 * http://ejohn.org/blog/simple-javascript-inheritance/ MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
	"use strict";

	var initializing = false, fnTest = /xyz/.test(function () {
		xyz;
	}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	window.Class = function () {
	};

	// Create a new Class that inherits from this class
	Class.extend = function (prop) {
		var _super = this.prototype;
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		var name;

		// Copy the properties over onto the new prototype
		for (name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] === "function" && typeof _super[name] === "function" && fnTest.test(prop[name]) ? (function (name, fn) {
					return function () {
						var tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				}(name, prop[name])) : prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable

//		Class.extend = arguments.callee; // use strict 때문에 이 줄 삭제됨.
		Class.extend = window.Class.extend;

		return Class;
	};
}());