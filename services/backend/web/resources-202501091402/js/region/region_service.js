/**
*
*	<script type="module">
*		import {createApp} from "${url:js('/js/lib/vue.js/3.2.47/vue.js')}";
*		import {regionApp} from "${url:js('/js/region/region_service.min.js')}";
*		const app = createApp(regionApp);
*		app.config.globalProperties.globalData = {
*			currentLang : XLGames.currentLanguage,
*			domains : XLGames.domains,
*		}
*		app.mount("#regionContainer");
*	</script>
*
*   <div id="regionContainer"></div>
*
* es6 module사용시 minify를 할 수 없다.
* 파일명을 min.js 가 되도록 수정
*/

(function() {
	var divTag = document.createElement('div');
	divTag.setAttribute('id','regionContainer');
	document.body.append( divTag );

	let topParent = document.querySelector(".account-util > ul");
	if( topParent != null){
		let liTag = document.createElement('li');
    	liTag.setAttribute('id','regionSelector1');
    	topParent.prepend(liTag);
	}

	let footerParent = document.querySelector(".footer-util");
	if( footerParent != null && location.hostname.indexOf('member') == -1){
		let footerLiTag = document.createElement('li');
		footerLiTag.setAttribute('id','regionSelector2');
		footerLiTag.setAttribute('class','vueWrapper');
		footerParent.prepend(footerLiTag);
	}
}());

const COOKIE_NAME = 'XL-REGION';

const getRegionCookie = function(){
	 let cookieRegexp = new RegExp(' ' + COOKIE_NAME + '=([^;]+)');
	 let result = cookieRegexp.exec(' '+document.cookie );
	 if ( result != null && result.length == 2) {
	    return  result[1];
	 }
	 return null;
}

	export { regionApp };
	const AMERICAS_CODE = ['NA', 'SA'];
	const regionTypes = [
        {'label': AL10N.Region.ASIA(), 'val': 'ASIA'},
        {'label' : AL10N.Region.NASA(), 'val' : 'NASA'},
    ];

	const RegionAreaLayer = {
		props:["region", 'isLayerOpen'],
		mounted : function(){
			var me = this;
			me.settingRecommendRegion();
			me.changeLink();
		},
        data : function(){
            return {
                isLayerOpen : this.isLayerOpen,
                selectedRegion : this.region,
                language : this.globalData.currentLang || 'en',
				geoipContinentUrl : this.globalData.domains.account + '/geoip/continent.json',
				cookieDomain : this.globalData.domains.cookieDomain,
				regionTypes : regionTypes
            }
        },
        methods : {
            selectRegion : async function(){
                let me = this;
                this.isLayerOpen = false;
                me.changeLink();
                me.createCookie();
                me.$emit('selectRegion', me.selectedRegion);

                if ( location.pathname.indexOf('/help/inquiry') > -1 ){
                    location.href = '/help/inquiry/list';
                }
            },
            changeLink : function(){
                let me = this;
                document.querySelectorAll(".region-link").forEach(it => {
                    let href= it.getAttribute('href');
                    href = href.replace(/([^.]+)(\.xbluesalt)/, me.selectedRegion.toLowerCase() + '$2');
                    it.setAttribute('href', href);
                });
            },
            createCookie : function(){
				console.log('create cookie');
                let me = this;
                let now = new Date();
                let expires = now.valueOf() + ( 1000 * 60 *60 *24 * 30);
				// document.cookie = COOKIE_NAME  + "=" + me.selectedRegion + ";path=/;Expires=" + new Date(expires) + ";domain=."+me.cookieDomain;
				document.cookie = COOKIE_NAME  + "=" + me.selectedRegion + ";path=/;Expires=" + new Date(expires);
            },
            settingRecommendRegion : async function(){
                var me = this;
                if( getRegionCookie() != null ){
                    return false;
                }
                let res = await fetch(me.geoipContinentUrl);
                let json = await res.json();
                me.selectedRegion = ( AMERICAS_CODE.includes(json.code) ? 'NASA' : 'ASIA');
            },
            msg: function(code, args){
                // let msg = regionMessage[this.language] || regionMessage['en'] ;
                // msg = msg[code](...(args !== undefined ? [args] : []));
                return AL10N.Region[code](args);
            }
        },
        template : `
        <Teleport to="body">
            <div id="regionLayerWrapper" v-show="isLayerOpen">
                <div class="modal_bg" style=""></div>
                <div class="layer-region">
	                <div class="title" v-html="msg('Layertitle')"></div>
	                <p v-html="msg('Layerdesc')"></p>
	                <div class="select-wrap" v-for="(each,idx) in regionTypes">
						<input type="radio" :value="each.val" v-model="selectedRegion" name="selectedRegion" :id="'r-' + idx"/>
                        <label :for="'r-' + idx"><strong>{{each.label}}</strong></label>
	                    <div class="select-border"></div>
	                </div>
					<div class="btn-wrap">
						<a href="javascript:;" class="btn-layer-ok" @click="selectRegion" v-html="msg('Buttonok')"></a>
					</div>
                </div>
            </div>
        </Teleport>
        `
    }

	const regionApp = {
	    mounted: function(){

	    },
	 	created: function() {
			let me = this;
			me.isLayerOpen = getRegionCookie() == null;
			me.enabledHeader = document.querySelector("#regionSelector1") != null;
			me.enabledFooter = document.querySelector("#regionSelector2") != null;
		},
		data: function() {
			return {
				isLayerOpen : false,
			    archeworldOrigin : this.globalData.domains.archeworld,
			    xbluesaltOrigin : this.globalData.domains.xbluesalt,
			    currentRegion : getRegionCookie() || 'ASIA',
			    disabledSelector1 : false,
			    disabledSelector2 : false
			}
		},
		methods: {
			showLayer : function(){
				let me = this;
				me.isLayerOpen = true;
			},
			printRegionCloseLayer : function(region){
				let me = this;
				me.currentRegion = region;
				XLGames.currentRegion = region;
				me.isLayerOpen = false;
			}
		},
		computed : {
			showRegionLabel : function(){
				let me = this;
				for(let i in regionTypes){
					let regionType = regionTypes[i];
					if( regionType.val == me.currentRegion){
						return regionType.label;
					}
				}
			}
		},
		components : {
			RegionAreaLayer
		},
		template : `
		    <div class="vueWrapper">
				<Teleport to="#regionSelector1" v-if="enabledHeader">
					<a href="javascript:;" @click="showLayer"><i class="ico-region"></i><span>{{showRegionLabel}}</span></a>
				</Teleport>
				<Teleport to="#regionSelector2" v-if="enabledFooter">
					<a href="javascript:;" @click="showLayer"><i class="ico-region"></i><span>{{showRegionLabel}}</span></a>
				</Teleport>
		        <RegionAreaLayer :isLayerOpen="isLayerOpen" :region="currentRegion" @selectRegion="printRegionCloseLayer"></RegionAreaLayer>
            </div>
		`,
	}