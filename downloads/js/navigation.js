// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Inspired by base2 and Prototype
(function() {
	"use strict";

	var initializing = false, fnTest = /xyz/.test(function() {
		xyz;
	}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	window.Class = function() {
	};

	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
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
			prototype[name] = typeof prop[name] === "function"
					&& typeof _super[name] === "function"
					&& fnTest.test(prop[name]) ? (function(name, fn) {
				return function() {
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
		Class.extend = window.Class.extend;

		return Class;
	};
}());

(function ($) {
	"use strict";

    if (typeof window.XLGames === "undefined") {
		window.XLGames = {};
	}
	/**
	 * Name Space
	 */
     XLGames.namespace = function(ns) {
		var parts = ns.split("."), parent = XLGames, i;

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

	XLGames.namespace("Navigation");
	XLGames.Navigation = Class.extend({
		init:function() {
			var me = this;
			
		    me.$masthead = $("#common-masthead");
		    if( me.$masthead.length < 1){
		    	return false;
		    }
		   
		    me.$masthead.css('-webkit-transform','translateZ(0)');		   
		    me.$mainMenus = me.$masthead.find('.navi > li');
		    me.$menuArea = $(".masthead-navi");
		    me.$mobileMenu = $(".nav-menu");
		    me.scrollTop = 0;

			me.activateGnbMenu();
            me.bindChangeLanguage();
		}
		,activateGnbMenu : function () {
			var me = this;
			me.$mainMenus.filter('.active').removeClass('active');
			var currentMenuGroup = "menu_"+XLGames.currentMenuGroup;
			var $activateMainMenu = me.$mainMenus.filter('[id='+currentMenuGroup+']');
			$activateMainMenu.addClass('active');
			$activateMainMenu.find('.sub-navi li[id=menu_sub_'+XLGames.currentMenu+']').addClass('active');
		}		
        ,bindChangeLanguage : function(){
			$(".text-lang").off('click');
			$(".text-lang").on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				$(".layer-lang").toggle();
			});
			$(".layer-lang").find("a").on('click', function(e){
				e.preventDefault();
				location.href='/?lang=' + $(this).data('lang');
			});
		}
	});
	
	
	
	XLGames.namespace('MobileNavi');
	XLGames.MobileNavi= Class.extend({
		init:function(){
			var me = this;
			me.$naviArea = $(".global-navi-side");
			me.$naviOuter = $(".global-navi-outer");
			me.bindGlobalNavi();
			
		},
		bindGlobalNavi : function(){
			var me= this;
			$('.nav-menu').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				me.showNavi();
				me.bindCloseBtn();
			});
		},
		showNavi : function(){
			var me = this;
			//$("#container").addClass('wrap-hidden');
			setTimeout( function(){
				$("body").addClass('global-navi-on');

				me.$naviArea.css("left", me.$naviArea.width()*-1);
				me.$naviArea.animate({left : '0'}, {
					duration : 300,
					complete : function(){
						$('.navi-in-bg').css('left','0');
					}
				});
				me.$naviOuter.fadeIn('fast');
			}, 10);
		},
		bindCloseBtn : function(){
			var me = this;
			$('.global-navi-outer, .btn-navi-close').off('click');
			$('.global-navi-outer, .btn-navi-close').one('click', function(e){
				e.stopPropagation();
				me.hideNavi();
			});
		},
		hideNavi : function(){
			var me = this;
			$('.navi-in-bg').css('left',me.$naviArea.width()*-1);
			me.$naviArea.animate({left : me.$naviArea.width()*-1}, {
				duration : 300,
				complete : function(){
					$('body').removeClass('global-navi-on');
					//$("#container").removeClass('wrap-hidden');
				}
			});
			me.$naviOuter.fadeOut('fast');
		}
	});
}(jQuery));


$(document).ready(function () {
	new XLGames.Navigation($("#common-masthead"));
	new XLGames.MobileNavi();
});


