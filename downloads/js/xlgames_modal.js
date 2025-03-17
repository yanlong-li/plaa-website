(function ($) {
	"use strict";
	/*
	 * 다이얼로그 지정 $('.dialog').aaModalDialog({'zIndex':1000, 'bgClickObj': $('.layer-close'),  'name' : 'login'});
	 *
	 * 열기 $('.dialog').aaModalDialog('open');
	 *
	 * 닫기 $('.dialog').aaModalDialog('close');
	 *
	 * 다이얼로그 기능 삭제 $('.dialog').aaModalDialog('destroy');
	 *
	 * 다이얼로그로 감싸질 대상은 hidden 클래스로 미리 준비한다.
	 *
	 * 기본 옵션 :
	 *   - zIndex : z-index
	 *   - windowWidth: 창 넓이, null 이면 브라우저 창 높이
	 *   - windowHeight : 창 높이, null 이면 브라우저 창 높이
	 *   - top : 위에서부터 위치 고정시 값 지정. 지정안하면 브라우저 창 높이와 다이얼로그 크기를 계산하여 중앙 배치
	 *   - bgClickObj : 모달창 배경 클릭시 trigger 오브젝트
	 *   - opacity : 배경의 opacity를 지정
	 *
	 *  기본 옵션 변경시 :
	 *  $.fn.aaModalDialog.defaults = $.extend( $.fn.aaModalDialog.defaults, { docBody: $(top.document).find('body'), docWindow: $(top)});
	 *
	 */
	$.fn.aaModalDialog = function (userOptions) {
		var $me = this;
		$me.MODAL_CLASS_NAME = 'aa_modal';
		$me.MODAL_SELECTOR = '.'+ $me.MODAL_CLASS_NAME;
		$me.HIDDEN_MODAL_SELECTOR = $me.MODAL_SELECTOR + '.hidden';
		$me.wrapperContent = $("#wrapperContent");
		$me.fixableBody = $me.wrapperContent.length == 1;
		let options = $.fn.aaModalDialog.defaults;
		if (typeof userOptions === 'object') {
			init(userOptions);
		} else {
			doCommand(userOptions);
		}
		
		return $me;
		
		function init(userOptions) {
			options = $.extend($.fn.aaModalDialog.defaults, userOptions);
			
			if(options.docBody == undefined) {
				options.docBody = $('body');
			}
			if(options.docWindow == undefined) {
				options.docWindow = $(window);
			}
			
			let modalName = userOptions.name || "default";
			let $modalContainer = $('<div class="'+$me.MODAL_CLASS_NAME+'" id="'+modalName+'" />');
			let $hiddenModal = $($me.HIDDEN_MODAL_SELECTOR).filter('#'+modalName); 
			if( $hiddenModal.length > 0 ){
				$modalContainer = $hiddenModal;
			}
			$me
			.css({
				'position': 'absolute', // 포지션을 옵션으로 받는것은 무의미함. 래퍼가 이미 fixed라 무조건 windowHeight이 한계 높이.
				'z-index': 2
			})
			.data('options', options)
			.data('modalContainer', $modalContainer);
			
			var $modalBg = $("<div>", {'class': 'aa_modal_bg', 'style': !options.opacity ? '' : ('opacity:'+options.opacity ) });
			$modalContainer
			.addClass('hidden')
			.css('z-index', options.zIndex)
			.append($me);
			if( $modalContainer.find(".aa_modal_bg").length == 0){
				$modalContainer.prepend($modalBg);
			}
			options.docBody.append($modalContainer);

			// 위치잡기
			$(window).off('resize.modal').on('resize.modal', setDialogPosition)
		}
		function setDialogPosition() {
			/* html,body{height:auto}일 경우 $(window).innerHeight() 호출시 
				window의 height가 아닌 contents의 height를 읽어오는 경우가 있음 
			*/
			var windowWidth = document.documentElement.clientWidth || options.docWindow.get(0).innerWidth;
			var windowHeight = options.docWindow.get(0).innerHeight;
			var hasOptionWidthHeight = options.windowWidth !== null && options.windowHeight !== null;
	
			if (hasOptionWidthHeight) {
				windowWidth = options.windowWidth;
				windowHeight = options.windowHeight;
			}
			var top = options.top;
			if (options.top == null) {
				top = (windowHeight - $me.outerHeight()) / 2;
				if (top < 0) {
					top = 0;
				}
			}
			var left = (windowWidth - $me.outerWidth()) / 2;
//			console.log('windowWidth : ', windowWidth , 'outerWidth : ', $me.outerWidth(), 'left : ', left);
			if (left < 0) {
				left = 0;
			}

			if (!hasOptionWidthHeight && XLGames.Utils.isArcheAgeBrowser()) {
				top = 10;
				left = 20;
			}
			$me.css({
				'top': top + 'px',
				'left': left + 'px'
			});
		}

		function doCommand(command) {
			var $modal = $me.parent(); // aa_modal

			switch (command) {
			case 'close':
				$modal.hide();
				$me.hide();
				$modal.addClass('hidden');
				break;
			case 'open':
				if($me.fixableBody) {
					if (options.docBody.prop('scrollHeight') > options.docBody.prop('clientHeight')) {
						options.docBody.css('overflow-y', 'scroll');
					}
					if (options.docBody.width() == options.docWindow.width()) {
						$me.wrapperContent.css('width', '100%');
					}
					options.docBody.find(':enabled').attr('disabled', 'disabled').addClass('__modal-disabled');
					options.docBody.find($me.MODAL_SELECTOR).removeAttr('disabled').removeClass('__modal-disabled');
					options.docBody.find($me.MODAL_SELECTOR).find('.__modal-disabled').removeAttr('disabled').removeClass('__modal-disabled');

					var st = $(window).scrollTop();
					var sl = $(window).scrollLeft();
					$me.wrapperContent.addClass('pos-fixed').css('top', -st+'px').css('left', -sl+'px');
				}
				$modal.show();
				$modal.removeClass('hidden');
				$(window).trigger('resize.modal');
	
				if( !options.bgClickObj ){
					return;
				}
				let triggerObj = options.bgClickObj.length >= 1 ? options.bgClickObj : $(options.bgClickObj.selector);
				if(triggerObj.length >= 1){
					$(".aa_modal_bg").off('click').one('click', function(e){
						triggerObj = triggerObj.filter(":visible");
						if( triggerObj.length > 0){
							triggerObj[0].click();
						}
					});
				} 
				break;
			case 'destroy':
				let isLastLayer = $("div.aa_modal").length == 1;

				if($me.fixableBody && isLastLayer) {
					options.docBody.find('.__modal-disabled').removeAttr('disabled').removeClass('__modal-disabled');
					options.docBody.css('overflow-y', '');
					var st = $me.wrapperContent.css('top');
					st = String(st).replace('px','');
					var sl = $me.wrapperContent.css('left');
					sl = String(sl).replace('px','');
					st = Math.abs(st);
					sl = Math.abs(sl);
				}

				$modal.remove();

				if($me.fixableBody && isLastLayer) {
					$me.wrapperContent.removeClass('pos-fixed').css('top', '').css('left', '').css('width', '');
					$(window).scrollTop(st).scrollLeft(sl);
				}
				$(window).off('resize.modal');
				break;
			}
		}
	
	};
	$.fn.aaModalDialog.defaults = {
		zIndex : 1,
		windowWidth : null,
		windowHeight : null,
		top: null,
		docBody: $('body'),
		docWindow: $(window)
	};

}(jQuery));