(function ($) {
	"use strict";
	
	XLGames.namespace('CommonUI');
	XLGames.CommonUI.CharacterSelector = Class.extend({
		init: function () {
			var me = this;
			me.$selector = $('.select-character');
			me.$selectedInfo = $('.select-box');
			me.$selectList = $('.select-list').find("a");
			me.bindToggleSelector();
			me.bindCharacters();
		},
		bindToggleSelector: function () {
			var me = this;

			me.$selector.bind('clickoutside', function(){
				me.hideList();
			});
			me.$selectedInfo.bind('click', function (e) {
				e.stopPropagation();
				me.toggleList();
				return false;
			});
		},
		hideList: function () {
			var me = this;
			if(typeof me.$selector  != 'undefined') {
				me.$selector.removeClass('open');
			}
		},
		toggleList: function () {
			var me = this;
			if(me.$selector.hasClass('open')) {
				me.hideList();
			} else {
				if(me.$selector.hasClass('open')) {
					$('me.$selector').removeClass('open');
				}
				me.$selector.addClass('open');
				me.$selector.parents().each(function() {
					var pos = $(this).css('position');
				});
			}
		},
        bindCharacters: function () {
			var me = this;
			me.$selectList.bind('click', function () {
				me.select($(this));
				return false;
			});
		},
		select: function ($character) {
			var me = this;

			var name = $character.text();
			me.$selectedInfo.find(".txt").text(name);
			
			me.toggleList();
		}
    })

}(jQuery));