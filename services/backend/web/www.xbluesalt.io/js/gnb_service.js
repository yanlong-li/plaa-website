/**
* library jquery, xlgames.core.js
* 
* variable
* XLGames.domains.account = '';
* XLGames.currentFullUrl = '';
*/

(function($){
	'use strict'; 
	
	XLGames.namespace('Gnb');
	XLGames.Gnb = Class.extend({
		init : function() {
			var me = this;
			me.$wrapper = $(".account-util");
			me.getGnbHtml();
		}, 
		getGnbHtml : async function(){
			var me = this;
			var beforeHtml =  me.$wrapper.html();
			try{
				me.$wrapper.empty();
				var response = await fetch(XLGames.domains.account + '/header/gnb', {method:'GET', credentials: 'include', signal: AbortSignal.timeout(2000) });
				var gnbHtml = await response.text();
				var $html= $(gnbHtml).filter('div');
				var isGuest = $html.data('guest');
				me.$wrapper.show();
				me.$wrapper.html($html);
				$(".nav-"+ (isGuest ? 'login' : 'logout')).show();
			} catch (E){
				//console.log('E : ', E);
				me.$wrapper.show();
				me.$wrapper.html( beforeHtml);
			}
			me.changeLink();
		}, 
		changeLink : function(){
			var loginLink = $(".portalLoginBtn").attr('href') + '?forwardUrl=' + XLGames.currentFullUrl;
			var logoutLink = $(".portalLogoutBtn").attr("href") + '?spring-security-redirect=' +XLGames.currentFullUrl;
			$(".portalLoginBtn").attr('href', loginLink);
			$(".portalLogoutBtn").attr('href', logoutLink);
		}
	});
	
	//$(document).ready(function(){
	//	new XLGames.Gnb();
	//});
})(jQuery);