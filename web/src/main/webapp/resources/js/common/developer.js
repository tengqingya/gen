/* jquery.nicescroll
 -- version 3.4.0
 -- copyright 2011-12-13 InuYaksa*2013
 -- licensed under the MIT
 --
 -- http://areaaperta.com/nicescroll
 -- https://github.com/inuyaksa/jquery.nicescroll
 --
 */
!function(b){function j(){var a=document.getElementsByTagName("script"),b=a[a.length-1].src.split("?")[0];return b.split("/").length>0?b.split("/").slice(0,-1).join("/")+"/":""}function x(a,b,c){for(var d=0;d<b.length;d++)c(a,b[d])}var l,m,n,o,p,q,r,s,t,u,v,w,c=!1,d=!1,f=5e3,g=2e3,h=0,i=b,k=j();Array.prototype.forEach||(Array.prototype.forEach=function(a,b){for(var c=0,d=this.length;d>c;++c)a.call(b,this[c],c,this)}),l=["ms","moz","webkit","o"],m=window.requestAnimationFrame||!1,n=window.cancelAnimationFrame||!1,l.forEach(function(a){m||(m=window[a+"RequestAnimationFrame"]),n||(n=window[a+"CancelAnimationFrame"]||window[a+"CancelRequestAnimationFrame"])}),o=window.MutationObserver||window.WebKitMutationObserver||!1,p={zindex:"auto",cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"5px",cursorborder:"1px solid #fff",cursorborderradius:"5px",scrollspeed:60,mousescrollstep:24,touchbehavior:!1,hwacceleration:!0,usetransition:!0,boxzoom:!1,dblclickzoom:!0,gesturezoom:!0,grabcursorenabled:!0,autohidemode:!0,background:"",iframeautoresize:!0,cursorminheight:32,preservenativescrolling:!0,railoffset:!1,bouncescroll:!0,spacebarenabled:!0,railpadding:{top:0,right:0,left:0,bottom:0},disableoutline:!0,horizrailenabled:!0,railalign:"right",railvalign:"bottom",enabletranslate3d:!0,enablemousewheel:!0,enablekeyboard:!0,smoothscroll:!0,sensitiverail:!0,enablemouselockapi:!0,cursorfixedheight:!1,directionlockdeadzone:6,hidecursordelay:400,nativeparentscrolling:!0,enablescrollonselection:!0,overflowx:!0,overflowy:!0,cursordragspeed:.3,rtlmode:!1,cursordragontouch:!1},q=!1,r=function(){function g(){var d,e,c=["-moz-grab","-webkit-grab","grab"];for((b.ischrome&&!b.ischrome22||b.isie)&&(c=[]),d=0;d<c.length;d++)if(e=c[d],a.style.cursor=e,a.style.cursor==e)return e;return"url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"}var a,b,c,d,e,f;if(q)return q;a=document.createElement("DIV"),b={},b.haspointerlock="pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document,b.isopera="opera"in window,b.isopera12=b.isopera&&"getUserMedia"in navigator,b.isie="all"in document&&"attachEvent"in a&&!b.isopera,b.isieold=b.isie&&!("msInterpolationMode"in a.style),b.isie7=!(!b.isie||b.isieold||"documentMode"in document&&7!=document.documentMode),b.isie8=b.isie&&"documentMode"in document&&8==document.documentMode,b.isie9=b.isie&&"performance"in window&&document.documentMode>=9,b.isie10=b.isie&&"performance"in window&&document.documentMode>=10,b.isie9mobile=/iemobile.9/i.test(navigator.userAgent),b.isie9mobile&&(b.isie9=!1),b.isie7mobile=!b.isie9mobile&&b.isie7&&/iemobile/i.test(navigator.userAgent),b.ismozilla="MozAppearance"in a.style,b.iswebkit="WebkitAppearance"in a.style,b.ischrome="chrome"in window,b.ischrome22=b.ischrome&&b.haspointerlock,b.ischrome26=b.ischrome&&"transition"in a.style,b.cantouch="ontouchstart"in document.documentElement||"ontouchstart"in window,b.hasmstouch=window.navigator.msPointerEnabled||!1,b.ismac=/^mac$/i.test(navigator.platform),b.isios=b.cantouch&&/iphone|ipad|ipod/i.test(navigator.platform),b.isios4=b.isios&&!("seal"in Object),b.isandroid=/android/i.test(navigator.userAgent),b.trstyle=!1,b.hastransform=!1,b.hastranslate3d=!1,b.transitionstyle=!1,b.hastransition=!1,b.transitionend=!1,c=["transform","msTransform","webkitTransform","MozTransform","OTransform"];for(d=0;d<c.length;d++)if("undefined"!=typeof a.style[c[d]]){b.trstyle=c[d];break}for(b.hastransform=0!=b.trstyle,b.hastransform&&(a.style[b.trstyle]="translate3d(1px,2px,3px)",b.hastranslate3d=/translate3d/.test(a.style[b.trstyle])),b.transitionstyle=!1,b.prefixstyle="",b.transitionend=!1,c=["transition","webkitTransition","MozTransition","OTransition","OTransition","msTransition","KhtmlTransition"],e=["","-webkit-","-moz-","-o-","-o","-ms-","-khtml-"],f=["transitionend","webkitTransitionEnd","transitionend","otransitionend","oTransitionEnd","msTransitionEnd","KhtmlTransitionEnd"],d=0;d<c.length;d++)if(c[d]in a.style){b.transitionstyle=c[d],b.prefixstyle=e[d],b.transitionend=f[d];break}return b.ischrome26&&(b.prefixstyle=e[1]),b.hastransition=b.transitionstyle,b.cursorgrabvalue=g(),b.hasmousecapture="setCapture"in a,b.hasMutationObserver=o!==!1,a=null,q=b,b},s=function(a,b){function q(){var a=e.doc.css(l.trstyle);return a&&"matrix"==a.substr(0,6)?a.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):!1}function s(){var b,a=e.win;if("zIndex"in a)return a.zIndex();for(;a.length>0;){if(9==a[0].nodeType)return!1;if(b=a.css("zIndex"),!isNaN(b)&&0!=b)return parseInt(b);a=a.parent()}return!1}function v(a,b,c){var g,d=a.css(b),f=parseFloat(d);return isNaN(f)?(f=u[d]||0,g=3==f?c?e.win.outerHeight()-e.win.innerHeight():e.win.outerWidth()-e.win.innerWidth():1,e.isie8&&f&&(f+=1),g?f:0):f}function w(a,b,c,d){e._bind(a,b,function(d){var e;return d=d?d:window.event,e={original:d,target:d.target||d.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==d.type?0:1,deltaX:0,deltaZ:0,preventDefault:function(){return d.preventDefault?d.preventDefault():d.returnValue=!1,!1},stopImmediatePropagation:function(){d.stopImmediatePropagation?d.stopImmediatePropagation():d.cancelBubble=!0}},"mousewheel"==b?(e.deltaY=-1/40*d.wheelDelta,d.wheelDeltaX&&(e.deltaX=-1/40*d.wheelDeltaX)):e.deltaY=d.detail,c.call(a,e)},d)}function x(a,b,c){var d,f;if(0==a.deltaMode?(d=-Math.floor(a.deltaX*(e.opt.mousescrollstep/54)),f=-Math.floor(a.deltaY*(e.opt.mousescrollstep/54))):1==a.deltaMode&&(d=-Math.floor(a.deltaX*e.opt.mousescrollstep),f=-Math.floor(a.deltaY*e.opt.mousescrollstep)),b&&0==d&&f&&(d=f,f=0),d&&(e.scrollmom&&e.scrollmom.stop(),e.lastdeltax+=d,e.debounced("mousewheelx",function(){var a=e.lastdeltax;e.lastdeltax=0,e.rail.drag||e.doScrollLeftBy(a)},120)),f){if(e.opt.nativeparentscrolling&&c&&!e.ispage&&!e.zoomactive)if(0>f){if(e.getScrollTop()>=e.page.maxh)return!0}else if(e.getScrollTop()<=0)return!0;e.scrollmom&&e.scrollmom.stop(),e.lastdeltay+=f,e.debounced("mousewheely",function(){var a=e.lastdeltay;e.lastdeltay=0,e.rail.drag||e.doScrollBy(a)},120)}return a.stopImmediatePropagation(),a.preventDefault()}var j,l,u,e=this;if(this.version="3.4.0",this.name="nicescroll",this.me=b,this.opt={doc:i("body"),win:!1},i.extend(this.opt,p),this.opt.snapbackspeed=80,a)for(j in e.opt)"undefined"!=typeof a[j]&&(e.opt[j]=a[j]);this.doc=e.opt.doc,this.iddoc=this.doc&&this.doc[0]?this.doc[0].id||"":"",this.ispage=/BODY|HTML/.test(e.opt.win?e.opt.win[0].nodeName:this.doc[0].nodeName),this.haswrapper=e.opt.win!==!1,this.win=e.opt.win||(this.ispage?i(window):this.doc),this.docscroll=this.ispage&&!this.haswrapper?i(window):this.win,this.body=i("body"),this.viewport=!1,this.isfixed=!1,this.iframe=!1,this.isiframe="IFRAME"==this.doc[0].nodeName&&"IFRAME"==this.win[0].nodeName,this.istextarea="TEXTAREA"==this.win[0].nodeName,this.forcescreen=!1,this.canshowonmouseevent="scroll"!=e.opt.autohidemode,this.onmousedown=!1,this.onmouseup=!1,this.onmousemove=!1,this.onmousewheel=!1,this.onkeypress=!1,this.ongesturezoom=!1,this.onclick=!1,this.onscrollstart=!1,this.onscrollend=!1,this.onscrollcancel=!1,this.onzoomin=!1,this.onzoomout=!1,this.view=!1,this.page=!1,this.scroll={x:0,y:0},this.scrollratio={x:0,y:0},this.cursorheight=20,this.scrollvaluemax=0,this.checkrtlmode=!1,this.scrollrunning=!1,this.scrollmom=!1,this.observer=!1,this.observerremover=!1;do this.id="ascrail"+g++;while(document.getElementById(this.id));this.rail=!1,this.cursor=!1,this.cursorfreezed=!1,this.selectiondrag=!1,this.zoom=!1,this.zoomactive=!1,this.hasfocus=!1,this.hasmousefocus=!1,this.visibility=!0,this.locked=!1,this.hidden=!1,this.cursoractive=!0,this.overflowx=e.opt.overflowx,this.overflowy=e.opt.overflowy,this.nativescrollingarea=!1,this.checkarea=0,this.events=[],this.saved={},this.delaylist={},this.synclist={},this.lastdeltax=0,this.lastdeltay=0,this.detected=r(),l=i.extend({},this.detected),this.canhwscroll=l.hastransform&&e.opt.hwacceleration,this.ishwscroll=this.canhwscroll&&e.haswrapper,this.istouchcapable=!1,l.cantouch&&l.ischrome&&!l.isios&&!l.isandroid&&(this.istouchcapable=!0,l.cantouch=!1),l.cantouch&&l.ismozilla&&!l.isios&&(this.istouchcapable=!0,l.cantouch=!1),e.opt.enablemouselockapi||(l.hasmousecapture=!1,l.haspointerlock=!1),this.delayed=function(a,b,c,d){var f=e.delaylist[a],g=(new Date).getTime();return!d&&f&&f.tt?!1:(f&&f.tt&&clearTimeout(f.tt),f&&f.last+c>g&&!f.tt?e.delaylist[a]={last:g+c,tt:setTimeout(function(){e.delaylist[a].tt=0,b.call()},c)}:f&&f.tt||(e.delaylist[a]={last:g,tt:0},setTimeout(function(){b.call()},0)),void 0)},this.debounced=function(a,b,c){var d=e.delaylist[a];(new Date).getTime(),e.delaylist[a]=b,d||setTimeout(function(){var b=e.delaylist[a];e.delaylist[a]=!1,b.call()},c)},this.synched=function(a,b){function c(){e.onsync||(m(function(){e.onsync=!1;for(a in e.synclist){var b=e.synclist[a];b&&b.call(e),e.synclist[a]=!1}}),e.onsync=!0)}return e.synclist[a]=b,c(),a},this.unsynched=function(a){e.synclist[a]&&(e.synclist[a]=!1)},this.css=function(a,b){for(var c in b)e.saved.css.push([a,c,a.css(c)]),a.css(c,b[c])},this.scrollTop=function(a){return"undefined"==typeof a?e.getScrollTop():e.setScrollTop(a)},this.scrollLeft=function(a){return"undefined"==typeof a?e.getScrollLeft():e.setScrollLeft(a)},BezierClass=function(a,b,c,d,e,f,g){this.st=a,this.ed=b,this.spd=c,this.p1=d||0,this.p2=e||1,this.p3=f||0,this.p4=g||1,this.ts=(new Date).getTime(),this.df=this.ed-this.st},BezierClass.prototype={B2:function(a){return 3*a*a*(1-a)},B3:function(a){return 3*a*(1-a)*(1-a)},B4:function(a){return(1-a)*(1-a)*(1-a)},getNow:function(){var a=(new Date).getTime(),b=1-(a-this.ts)/this.spd,c=this.B2(b)+this.B3(b)+this.B4(b);return 0>b?this.ed:this.st+Math.round(this.df*c)},update:function(a,b){return this.st=this.getNow(),this.ed=a,this.spd=b,this.ts=(new Date).getTime(),this.df=this.ed-this.st,this}},this.ishwscroll?(this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"},l.hastranslate3d&&l.isios&&this.doc.css("-webkit-backface-visibility","hidden"),this.getScrollTop=function(a){if(!a){var b=q();if(b)return 16==b.length?-b[13]:-b[5];if(e.timerscroll&&e.timerscroll.bz)return e.timerscroll.bz.getNow()}return e.doc.translate.y},this.getScrollLeft=function(a){if(!a){var b=q();if(b)return 16==b.length?-b[12]:-b[4];if(e.timerscroll&&e.timerscroll.bh)return e.timerscroll.bh.getNow()}return e.doc.translate.x},this.notifyScrollEvent=document.createEvent?function(a){var b=document.createEvent("UIEvents");b.initUIEvent("scroll",!1,!0,window,1),a.dispatchEvent(b)}:document.fireEvent?function(a){var b=document.createEventObject();a.fireEvent("onscroll"),b.cancelBubble=!0}:function(){},l.hastranslate3d&&e.opt.enabletranslate3d?(this.setScrollTop=function(a,b){e.doc.translate.y=a,e.doc.translate.ty=-1*a+"px",e.doc.css(l.trstyle,"translate3d("+e.doc.translate.tx+","+e.doc.translate.ty+",0px)"),b||e.notifyScrollEvent(e.win[0])},this.setScrollLeft=function(a,b){e.doc.translate.x=a,e.doc.translate.tx=-1*a+"px",e.doc.css(l.trstyle,"translate3d("+e.doc.translate.tx+","+e.doc.translate.ty+",0px)"),b||e.notifyScrollEvent(e.win[0])}):(this.setScrollTop=function(a,b){e.doc.translate.y=a,e.doc.translate.ty=-1*a+"px",e.doc.css(l.trstyle,"translate("+e.doc.translate.tx+","+e.doc.translate.ty+")"),b||e.notifyScrollEvent(e.win[0])},this.setScrollLeft=function(a,b){e.doc.translate.x=a,e.doc.translate.tx=-1*a+"px",e.doc.css(l.trstyle,"translate("+e.doc.translate.tx+","+e.doc.translate.ty+")"),b||e.notifyScrollEvent(e.win[0])})):(this.getScrollTop=function(){return e.docscroll.scrollTop()},this.setScrollTop=function(a){return e.docscroll.scrollTop(a)},this.getScrollLeft=function(){return e.docscroll.scrollLeft()},this.setScrollLeft=function(a){return e.docscroll.scrollLeft(a)}),this.getTarget=function(a){return a?a.target?a.target:a.srcElement?a.srcElement:!1:!1},this.hasParent=function(a,b){if(!a)return!1;for(var c=a.target||a.srcElement||a||!1;c&&c.id!=b;)c=c.parentNode||!1;return c!==!1},u={thin:1,medium:3,thick:5},this.getOffset=function(){var a,b;return e.isfixed?{top:parseFloat(e.win.css("top")),left:parseFloat(e.win.css("left"))}:e.viewport?(a=e.win.offset(),b=e.viewport.offset(),{top:a.top-b.top+e.viewport.scrollTop(),left:a.left-b.left+e.viewport.scrollLeft()}):e.win.offset()},this.updateScrollBar=function(a){var b,c,f,g,h;e.ishwscroll?(e.rail.css({height:e.win.innerHeight()}),e.railh&&e.railh.css({width:e.win.innerWidth()})):(b=e.getOffset(),c={top:b.top,left:b.left},c.top+=v(e.win,"border-top-width",!0),(e.win.outerWidth()-e.win.innerWidth())/2,c.left+=e.rail.align?e.win.outerWidth()-v(e.win,"border-right-width")-e.rail.width:v(e.win,"border-left-width"),f=e.opt.railoffset,f&&(f.top&&(c.top+=f.top),e.rail.align&&f.left&&(c.left+=f.left)),e.locked||e.rail.css({top:c.top,left:c.left,height:a?a.h:e.win.innerHeight()}),e.zoom&&e.zoom.css({top:c.top+1,left:1==e.rail.align?c.left-20:c.left+e.rail.width+4}),e.railh&&!e.locked&&(c={top:b.top,left:b.left},g=e.railh.align?c.top+v(e.win,"border-top-width",!0)+e.win.innerHeight()-e.railh.height:c.top+v(e.win,"border-top-width",!0),h=c.left+v(e.win,"border-left-width"),e.railh.css({top:g,left:h,width:e.railh.width})))},this.doRailClick=function(a,b,c){var d,f,g,h;e.locked||(e.cancelEvent(a),b?(d=c?e.doScrollLeft:e.doScrollTop,g=c?(a.pageX-e.railh.offset().left-e.cursorwidth/2)*e.scrollratio.x:(a.pageY-e.rail.offset().top-e.cursorheight/2)*e.scrollratio.y,d(g)):(d=c?e.doScrollLeftBy:e.doScrollBy,g=c?e.scroll.x:e.scroll.y,h=c?a.pageX-e.railh.offset().left:a.pageY-e.rail.offset().top,f=c?e.view.w:e.view.h,g>=h?d(f):d(-f)))},e.hasanimationframe=m,e.hascancelanimationframe=n,e.hasanimationframe?e.hascancelanimationframe||(n=function(){e.cancelAnimationFrame=!0}):(m=function(a){return setTimeout(a,15-Math.floor(+new Date/1e3)%16)},n=clearInterval),this.init=function(){function z(a){var b,c,d;e.selectiondrag&&(a&&(b=e.win.outerHeight(),c=a.pageY-e.selectiondrag.top,c>0&&b>c&&(c=0),c>=b&&(c-=b),e.selectiondrag.df=c),0!=e.selectiondrag.df&&(d=2*-Math.floor(e.selectiondrag.df/6),e.doScrollBy(d),e.debounced("doselectionscroll",function(){z()},50)))}function C(){var b,d;e.iframexd=!1;try{b="contentDocument"in this?this.contentDocument:this.contentWindow.document,b.domain}catch(a){e.iframexd=!0,b=!1}return e.iframexd?("console"in window&&console.log("NiceScroll error: policy restriced iframe"),!0):(e.forcescreen=!0,e.isiframe&&(e.iframe={doc:i(b),html:e.doc.contents().find("html")[0],body:e.doc.contents().find("body")[0]},e.getContentSize=function(){return{w:Math.max(e.iframe.html.scrollWidth,e.iframe.body.scrollWidth),h:Math.max(e.iframe.html.scrollHeight,e.iframe.body.scrollHeight)}},e.docscroll=i(e.iframe.body)),l.isios||!e.opt.iframeautoresize||e.isiframe||(e.win.scrollTop(0),e.doc.height(""),d=Math.max(b.getElementsByTagName("html")[0].scrollHeight,b.body.scrollHeight),e.doc.height(d)),e.lazyResize(30),l.isie7&&e.css(i(e.iframe.html),{"overflow-y":"hidden"}),e.css(i(e.iframe.body),{"overflow-y":"hidden"}),"contentWindow"in this?e.bind(this.contentWindow,"scroll",e.onscroll):e.bind(b,"scroll",e.onscroll),e.opt.enablemousewheel&&e.bind(b,"mousewheel",e.onmousewheel),e.opt.enablekeyboard&&e.bind(b,l.isopera?"keypress":"keydown",e.onkeypress),(l.cantouch||e.opt.touchbehavior)&&(e.bind(b,"mousedown",e.onmousedown),e.bind(b,"mousemove",function(a){e.onmousemove(a,!0)}),e.opt.grabcursorenabled&&l.cursorgrabvalue&&e.css(i(b.body),{cursor:l.cursorgrabvalue})),e.bind(b,"mouseup",e.onmouseup),e.zoom&&(e.opt.dblclickzoom&&e.bind(b,"dblclick",e.doZoom),e.ongesturezoom&&e.bind(b,"gestureend",e.ongesturezoom)),void 0)}var a,b,g,j,m,n,p,q,r,u,v,w,x,y,A,B;if(e.saved.css=[],l.isie7mobile)return!0;if(l.hasmstouch&&e.css(e.ispage?i("html"):e.win,{"-ms-touch-action":"none"}),e.zindex="auto",e.zindex=e.ispage||"auto"!=e.opt.zindex?e.opt.zindex:s()||"auto",e.ispage||"auto"==e.zindex||e.zindex>h&&(h=e.zindex),e.isie&&0==e.zindex&&"auto"==e.opt.zindex&&(e.zindex="auto"),!e.ispage||!l.cantouch&&!l.isieold&&!l.isie9mobile){a=e.docscroll,e.ispage&&(a=e.haswrapper?e.win:e.doc),l.isie9mobile||e.css(a,{"overflow-y":"hidden"}),e.ispage&&l.isie7&&("BODY"==e.doc[0].nodeName?e.css(i("html"),{"overflow-y":"hidden"}):"HTML"==e.doc[0].nodeName&&e.css(i("body"),{"overflow-y":"hidden"})),!l.isios||e.ispage||e.haswrapper||e.css(i("body"),{"-webkit-overflow-scrolling":"touch"}),b=i(document.createElement("div")),b.css({position:"relative",top:0,"float":"right",width:e.opt.cursorwidth,height:"0px","background-color":e.opt.cursorcolor,border:e.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":e.opt.cursorborderradius,"-moz-border-radius":e.opt.cursorborderradius,"border-radius":e.opt.cursorborderradius}),b.hborder=parseFloat(b.outerHeight()-b.innerHeight()),e.cursor=b,g=i(document.createElement("div")),g.attr("id",e.id),g.addClass("nicescroll-rails"),n=["left","right"];for(p in n)m=n[p],j=e.opt.railpadding[m],j?g.css("padding-"+m,j+"px"):e.opt.railpadding[m]=0;g.append(b),g.width=Math.max(parseFloat(e.opt.cursorwidth),b.outerWidth())+e.opt.railpadding.left+e.opt.railpadding.right,g.css({width:g.width+"px",zIndex:e.zindex,background:e.opt.background,cursor:"default"}),g.visibility=!0,g.scrollable=!0,g.align="left"==e.opt.railalign?0:1,e.rail=g,e.rail.drag=!1,q=!1,!e.opt.boxzoom||e.ispage||l.isieold||(q=document.createElement("div"),e.bind(q,"click",e.doZoom),e.zoom=i(q),e.zoom.css({cursor:"pointer","z-index":e.zindex,backgroundImage:"url("+k+"zoomico.png)",height:18,width:18,backgroundPosition:"0px 0px"}),e.opt.dblclickzoom&&e.bind(e.win,"dblclick",e.doZoom),l.cantouch&&e.opt.gesturezoom&&(e.ongesturezoom=function(a){return a.scale>1.5&&e.doZoomIn(a),a.scale<.8&&e.doZoomOut(a),e.cancelEvent(a)},e.bind(e.win,"gestureend",e.ongesturezoom))),e.railh=!1,e.opt.horizrailenabled&&(e.css(a,{"overflow-x":"hidden"}),b=i(document.createElement("div")),b.css({position:"relative",top:0,height:e.opt.cursorwidth,width:"0px","background-color":e.opt.cursorcolor,border:e.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":e.opt.cursorborderradius,"-moz-border-radius":e.opt.cursorborderradius,"border-radius":e.opt.cursorborderradius}),b.wborder=parseFloat(b.outerWidth()-b.innerWidth()),e.cursorh=b,r=i(document.createElement("div")),r.attr("id",e.id+"-hr"),r.addClass("nicescroll-rails"),r.height=Math.max(parseFloat(e.opt.cursorwidth),b.outerHeight()),r.css({height:r.height+"px",zIndex:e.zindex,background:e.opt.background}),r.append(b),r.visibility=!0,r.scrollable=!0,r.align="top"==e.opt.railvalign?0:1,e.railh=r,e.railh.drag=!1),e.ispage?(g.css({position:"fixed",top:"0px",height:"100%"}),g.align?g.css({right:"0px"}):g.css({left:"0px"}),e.body.append(g),e.railh&&(r.css({position:"fixed",left:"0px",width:"100%"}),r.align?r.css({bottom:"0px"}):r.css({top:"0px"}),e.body.append(r))):(e.ishwscroll?("static"==e.win.css("position")&&e.css(e.win,{position:"relative"}),u="HTML"==e.win[0].nodeName?e.body:e.win,e.zoom&&(e.zoom.css({position:"absolute",top:1,right:0,"margin-right":g.width+4}),u.append(e.zoom)),g.css({position:"absolute",top:0}),g.align?g.css({right:0}):g.css({left:0}),u.append(g),r&&(r.css({position:"absolute",left:0,bottom:0}),r.align?r.css({bottom:0}):r.css({top:0}),u.append(r))):(e.isfixed="fixed"==e.win.css("position"),v=e.isfixed?"fixed":"absolute",e.isfixed||(e.viewport=e.getViewport(e.win[0])),e.viewport&&(e.body=e.viewport,0==/relative|absolute/.test(e.viewport.css("position"))&&e.css(e.viewport,{position:"relative"})),g.css({position:v}),e.zoom&&e.zoom.css({position:v}),e.updateScrollBar(),e.body.append(g),e.zoom&&e.body.append(e.zoom),e.railh&&(r.css({position:v}),e.body.append(r))),l.isios&&e.css(e.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),l.isie&&e.opt.disableoutline&&e.win.attr("hideFocus","true"),l.iswebkit&&e.opt.disableoutline&&e.win.css({outline:"none"})),e.opt.autohidemode===!1?(e.autohidedom=!1,e.rail.css({opacity:e.opt.cursoropacitymax}),e.railh&&e.railh.css({opacity:e.opt.cursoropacitymax})):e.opt.autohidemode===!0?(e.autohidedom=i().add(e.rail),l.isie8&&(e.autohidedom=e.autohidedom.add(e.cursor)),e.railh&&(e.autohidedom=e.autohidedom.add(e.railh)),e.railh&&l.isie8&&(e.autohidedom=e.autohidedom.add(e.cursorh))):"scroll"==e.opt.autohidemode?(e.autohidedom=i().add(e.rail),e.railh&&(e.autohidedom=e.autohidedom.add(e.railh))):"cursor"==e.opt.autohidemode?(e.autohidedom=i().add(e.cursor),e.railh&&(e.autohidedom=e.autohidedom.add(e.cursorh))):"hidden"==e.opt.autohidemode&&(e.autohidedom=!1,e.hide(),e.locked=!1),l.isie9mobile?(e.scrollmom=new t(e),e.onmangotouch=function(){var d,f,g,h,i,j,l,b=e.getScrollTop(),c=e.getScrollLeft();return b==e.scrollmom.lastscrolly&&c==e.scrollmom.lastscrollx?!0:(d=b-e.mangotouch.sy,f=c-e.mangotouch.sx,g=Math.round(Math.sqrt(Math.pow(f,2)+Math.pow(d,2))),0!=g&&(h=0>d?-1:1,i=0>f?-1:1,j=+new Date,e.mangotouch.lazy&&clearTimeout(e.mangotouch.lazy),j-e.mangotouch.tm>80||e.mangotouch.dry!=h||e.mangotouch.drx!=i?(e.scrollmom.stop(),e.scrollmom.reset(c,b),e.mangotouch.sy=b,e.mangotouch.ly=b,e.mangotouch.sx=c,e.mangotouch.lx=c,e.mangotouch.dry=h,e.mangotouch.drx=i,e.mangotouch.tm=j):(e.scrollmom.stop(),e.scrollmom.update(e.mangotouch.sx-f,e.mangotouch.sy-d),j-e.mangotouch.tm,e.mangotouch.tm=j,l=Math.max(Math.abs(e.mangotouch.ly-b),Math.abs(e.mangotouch.lx-c)),e.mangotouch.ly=b,e.mangotouch.lx=c,l>2&&(e.mangotouch.lazy=setTimeout(function(){e.mangotouch.lazy=!1,e.mangotouch.dry=0,e.mangotouch.drx=0,e.mangotouch.tm=0,e.scrollmom.doMomentum(30)},100)))),void 0)},w=e.getScrollTop(),x=e.getScrollLeft(),e.mangotouch={sy:w,ly:w,dry:0,sx:x,lx:x,drx:0,lazy:!1,tm:0},e.bind(e.docscroll,"scroll",e.onmangotouch)):((l.cantouch||e.istouchcapable||e.opt.touchbehavior||l.hasmstouch)&&(e.scrollmom=new t(e),e.ontouchstart=function(a){var b,c,d,f,g,h,j,k,m,n;if(a.pointerType&&2!=a.pointerType)return!1;if(!e.locked){if(l.hasmstouch)for(b=a.target?a.target:!1;b&&(c=i(b).getNiceScroll(),!(c.length>0&&c[0].me==e.me));){if(c.length>0)return!1;if("DIV"==b.nodeName&&b.id==e.id)break;b=b.parentNode?b.parentNode:!1}if(e.cancelScroll(),b=e.getTarget(a),b&&(d=/INPUT/i.test(b.nodeName)&&/range/i.test(b.type)))return e.stopPropagation(a);if(!("clientX"in a)&&"changedTouches"in a&&(a.clientX=a.changedTouches[0].clientX,a.clientY=a.changedTouches[0].clientY),e.forcescreen&&(f=a,a={original:a.original?a.original:a},a.clientX=f.screenX,a.clientY=f.screenY),e.rail.drag={x:a.clientX,y:a.clientY,sx:e.scroll.x,sy:e.scroll.y,st:e.getScrollTop(),sl:e.getScrollLeft(),pt:2,dl:!1},e.ispage||!e.opt.directionlockdeadzone?e.rail.drag.dl="f":(g={w:i(window).width(),h:i(window).height()},h={w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},j=Math.max(0,h.h-g.h),k=Math.max(0,h.w-g.w),e.rail.drag.ck=!e.rail.scrollable&&e.railh.scrollable?j>0?"v":!1:e.rail.scrollable&&!e.railh.scrollable?k>0?"h":!1:!1,e.rail.drag.ck||(e.rail.drag.dl="f")),e.opt.touchbehavior&&e.isiframe&&l.isie&&(m=e.win.position(),e.rail.drag.x+=m.left,e.rail.drag.y+=m.top),e.hasmoving=!1,e.lastmouseup=!1,e.scrollmom.reset(a.clientX,a.clientY),!l.cantouch&&!this.istouchcapable&&!l.hasmstouch){if(n=b?/INPUT|SELECT|TEXTAREA/i.test(b.nodeName):!1,!n)return!e.ispage&&l.hasmousecapture&&b.setCapture(),e.cancelEvent(a);/SUBMIT|CANCEL|BUTTON/i.test(i(b).attr("type"))&&(pc={tg:b,click:!1},e.preventclick=pc)}}},e.ontouchend=function(a){return a.pointerType&&2!=a.pointerType?!1:e.rail.drag&&2==e.rail.drag.pt&&(e.scrollmom.doMomentum(),e.rail.drag=!1,e.hasmoving&&(e.hasmoving=!1,e.lastmouseup=!0,e.hideCursor(),l.hasmousecapture&&document.releaseCapture(),!l.cantouch))?e.cancelEvent(a):void 0},y=e.opt.touchbehavior&&e.isiframe&&!l.hasmousecapture,e.ontouchmove=function(a,b){var c,d,f,g,h,j,k,m,n,o,p,q,r,s;if(a.pointerType&&2!=a.pointerType)return!1;if(e.rail.drag&&2==e.rail.drag.pt){if(l.cantouch&&"undefined"==typeof a.original)return!0;if(e.hasmoving=!0,e.preventclick&&!e.preventclick.click&&(e.preventclick.click=e.preventclick.tg.onclick||!1,e.preventclick.tg.onclick=e.onpreventclick),c=i.extend({original:a},a),a=c,"changedTouches"in a&&(a.clientX=a.changedTouches[0].clientX,a.clientY=a.changedTouches[0].clientY),e.forcescreen&&(d=a,a={original:a.original?a.original:a},a.clientX=d.screenX,a.clientY=d.screenY),f=ofy=0,y&&!b&&(g=e.win.position(),f=-g.left,ofy=-g.top),h=a.clientY+ofy,j=h-e.rail.drag.y,k=a.clientX+f,m=k-e.rail.drag.x,n=e.rail.drag.st-j,e.ishwscroll&&e.opt.bouncescroll?0>n?n=Math.round(n/2):n>e.page.maxh&&(n=e.page.maxh+Math.round((n-e.page.maxh)/2)):(0>n&&(n=0,h=0),n>e.page.maxh&&(n=e.page.maxh,h=0)),e.railh&&e.railh.scrollable&&(o=e.rail.drag.sl-m,e.ishwscroll&&e.opt.bouncescroll?0>o?o=Math.round(o/2):o>e.page.maxw&&(o=e.page.maxw+Math.round((o-e.page.maxw)/2)):(0>o&&(o=0,k=0),o>e.page.maxw&&(o=e.page.maxw,k=0))),p=!1,e.rail.drag.dl)p=!0,"v"==e.rail.drag.dl?o=e.rail.drag.sl:"h"==e.rail.drag.dl&&(n=e.rail.drag.st);else if(q=Math.abs(j),r=Math.abs(m),s=e.opt.directionlockdeadzone,"v"==e.rail.drag.ck){if(q>s&&.3*q>=r)return e.rail.drag=!1,!0;r>s&&(e.rail.drag.dl="f",i("body").scrollTop(i("body").scrollTop()))}else if("h"==e.rail.drag.ck){if(r>s&&.3*az>=q)return e.rail.drag=!1,!0;q>s&&(e.rail.drag.dl="f",i("body").scrollLeft(i("body").scrollLeft()))}if(e.synched("touchmove",function(){e.rail.drag&&2==e.rail.drag.pt&&(e.prepareTransition&&e.prepareTransition(0),e.rail.scrollable&&e.setScrollTop(n),e.scrollmom.update(k,h),e.railh&&e.railh.scrollable?(e.setScrollLeft(o),e.showCursor(n,o)):e.showCursor(n),l.isie10&&document.selection.clear())}),l.ischrome&&e.istouchcapable&&(p=!1),p)return e.cancelEvent(a)}}),e.onmousedown=function(a,b){if(!e.rail.drag||1==e.rail.drag.pt){if(e.locked)return e.cancelEvent(a);e.cancelScroll(),e.rail.drag={x:a.clientX,y:a.clientY,sx:e.scroll.x,sy:e.scroll.y,pt:1,hr:!!b};var c=e.getTarget(a);return!e.ispage&&l.hasmousecapture&&c.setCapture(),e.isiframe&&!l.hasmousecapture&&(e.saved.csspointerevents=e.doc.css("pointer-events"),e.css(e.doc,{"pointer-events":"none"})),e.cancelEvent(a)}},e.onmouseup=function(a){if(e.rail.drag){if(l.hasmousecapture&&document.releaseCapture(),e.isiframe&&!l.hasmousecapture&&e.doc.css("pointer-events",e.saved.csspointerevents),1!=e.rail.drag.pt)return;return e.rail.drag=!1,e.cancelEvent(a)}},e.onmousemove=function(a){var b,c;if(e.rail.drag){if(1!=e.rail.drag.pt)return;return l.ischrome&&0==a.which?e.onmouseup(a):(e.cursorfreezed=!0,e.rail.drag.hr?(e.scroll.x=e.rail.drag.sx+(a.clientX-e.rail.drag.x),e.scroll.x<0&&(e.scroll.x=0),b=e.scrollvaluemaxw,e.scroll.x>b&&(e.scroll.x=b)):(e.scroll.y=e.rail.drag.sy+(a.clientY-e.rail.drag.y),e.scroll.y<0&&(e.scroll.y=0),c=e.scrollvaluemax,e.scroll.y>c&&(e.scroll.y=c)),e.synched("mousemove",function(){e.rail.drag&&1==e.rail.drag.pt&&(e.showCursor(),e.rail.drag.hr?e.doScrollLeft(Math.round(e.scroll.x*e.scrollratio.x),e.opt.cursordragspeed):e.doScrollTop(Math.round(e.scroll.y*e.scrollratio.y),e.opt.cursordragspeed))}),e.cancelEvent(a))}},l.cantouch||e.opt.touchbehavior?(e.onpreventclick=function(a){return e.preventclick?(e.preventclick.tg.onclick=e.preventclick.click,e.preventclick=!1,e.cancelEvent(a)):void 0},e.bind(e.win,"mousedown",e.ontouchstart),e.onclick=l.isios?!1:function(a){return e.lastmouseup?(e.lastmouseup=!1,e.cancelEvent(a)):!0},e.opt.grabcursorenabled&&l.cursorgrabvalue&&(e.css(e.ispage?e.doc:e.win,{cursor:l.cursorgrabvalue}),e.css(e.rail,{cursor:l.cursorgrabvalue}))):(e.hasTextSelected="getSelection"in document?function(){return document.getSelection().rangeCount>0}:"selection"in document?function(){return"None"!=document.selection.type}:function(){return!1},e.onselectionstart=function(){e.ispage||(e.selectiondrag=e.win.offset())},e.onselectionend=function(){e.selectiondrag=!1},e.onselectiondrag=function(a){e.selectiondrag&&e.hasTextSelected()&&e.debounced("selectionscroll",function(){z(a)},250)}),l.hasmstouch&&(e.css(e.rail,{"-ms-touch-action":"none"}),e.css(e.cursor,{"-ms-touch-action":"none"}),e.bind(e.win,"MSPointerDown",e.ontouchstart),e.bind(document,"MSPointerUp",e.ontouchend),e.bind(document,"MSPointerMove",e.ontouchmove),e.bind(e.cursor,"MSGestureHold",function(a){a.preventDefault()}),e.bind(e.cursor,"contextmenu",function(a){a.preventDefault()})),this.istouchcapable&&(e.bind(e.win,"touchstart",e.ontouchstart),e.bind(document,"touchend",e.ontouchend),e.bind(document,"touchcancel",e.ontouchend),e.bind(document,"touchmove",e.ontouchmove)),e.bind(e.cursor,"mousedown",e.onmousedown),e.bind(e.cursor,"mouseup",e.onmouseup),e.railh&&(e.bind(e.cursorh,"mousedown",function(a){e.onmousedown(a,!0)}),e.bind(e.cursorh,"mouseup",function(a){return e.rail.drag&&2==e.rail.drag.pt?void 0:(e.rail.drag=!1,e.hasmoving=!1,e.hideCursor(),l.hasmousecapture&&document.releaseCapture(),e.cancelEvent(a))})),(e.opt.cursordragontouch||!l.cantouch&&!e.opt.touchbehavior)&&(e.rail.css({cursor:"default"}),e.railh&&e.railh.css({cursor:"default"}),e.jqbind(e.rail,"mouseenter",function(){e.canshowonmouseevent&&e.showCursor(),e.rail.active=!0}),e.jqbind(e.rail,"mouseleave",function(){e.rail.active=!1,e.rail.drag||e.hideCursor()}),e.opt.sensitiverail&&(e.bind(e.rail,"click",function(a){e.doRailClick(a,!1,!1)}),e.bind(e.rail,"dblclick",function(a){e.doRailClick(a,!0,!1)}),e.bind(e.cursor,"click",function(a){e.cancelEvent(a)}),e.bind(e.cursor,"dblclick",function(a){e.cancelEvent(a)})),e.railh&&(e.jqbind(e.railh,"mouseenter",function(){e.canshowonmouseevent&&e.showCursor(),e.rail.active=!0}),e.jqbind(e.railh,"mouseleave",function(){e.rail.active=!1,e.rail.drag||e.hideCursor()}),e.opt.sensitiverail&&(e.bind(e.railh,"click",function(a){e.doRailClick(a,!1,!0)}),e.bind(e.railh,"dblclick",function(a){e.doRailClick(a,!0,!0)}),e.bind(e.cursorh,"click",function(a){e.cancelEvent(a)}),e.bind(e.cursorh,"dblclick",function(a){e.cancelEvent(a)})))),l.cantouch||e.opt.touchbehavior?(e.bind(l.hasmousecapture?e.win:document,"mouseup",e.ontouchend),e.bind(document,"mousemove",e.ontouchmove),e.onclick&&e.bind(document,"click",e.onclick),e.opt.cursordragontouch&&(e.bind(e.cursor,"mousedown",e.onmousedown),e.bind(e.cursor,"mousemove",e.onmousemove),e.cursorh&&e.bind(e.cursorh,"mousedown",e.onmousedown),e.cursorh&&e.bind(e.cursorh,"mousemove",e.onmousemove))):(e.bind(l.hasmousecapture?e.win:document,"mouseup",e.onmouseup),e.bind(document,"mousemove",e.onmousemove),e.onclick&&e.bind(document,"click",e.onclick),!e.ispage&&e.opt.enablescrollonselection&&(e.bind(e.win[0],"mousedown",e.onselectionstart),e.bind(document,"mouseup",e.onselectionend),e.bind(e.cursor,"mouseup",e.onselectionend),e.cursorh&&e.bind(e.cursorh,"mouseup",e.onselectionend),e.bind(document,"mousemove",e.onselectiondrag)),e.zoom&&(e.jqbind(e.zoom,"mouseenter",function(){e.canshowonmouseevent&&e.showCursor(),e.rail.active=!0}),e.jqbind(e.zoom,"mouseleave",function(){e.rail.active=!1,e.rail.drag||e.hideCursor()}))),e.opt.enablemousewheel&&(e.isiframe||e.bind(l.isie&&e.ispage?document:e.docscroll,"mousewheel",e.onmousewheel),e.bind(e.rail,"mousewheel",e.onmousewheel),e.railh&&e.bind(e.railh,"mousewheel",e.onmousewheelhr)),e.ispage||l.cantouch||/HTML|BODY/.test(e.win[0].nodeName)||(e.win.attr("tabindex")||e.win.attr({tabindex:f++}),e.jqbind(e.win,"focus",function(a){c=e.getTarget(a).id||!0,e.hasfocus=!0,e.canshowonmouseevent&&e.noticeCursor()}),e.jqbind(e.win,"blur",function(){c=!1,e.hasfocus=!1}),e.jqbind(e.win,"mouseenter",function(a){d=e.getTarget(a).id||!0,e.hasmousefocus=!0,e.canshowonmouseevent&&e.noticeCursor()}),e.jqbind(e.win,"mouseleave",function(){d=!1,e.hasmousefocus=!1}))),e.onkeypress=function(a){var b,f,g,h,i,j;if(e.locked&&0==e.page.maxh)return!0;if(a=a?a:window.e,b=e.getTarget(a),b&&/INPUT|TEXTAREA|SELECT|OPTION/.test(b.nodeName)&&(f=b.getAttribute("type")||b.type||!1,!f||!/submit|button|cancel/i.tp))return!0;if(e.hasfocus||e.hasmousefocus&&!c||e.ispage&&!c&&!d){if(g=a.keyCode,e.locked&&27!=g)return e.cancelEvent(a);switch(h=a.ctrlKey||!1,i=a.shiftKey||!1,j=!1,g){case 38:case 63233:e.doScrollBy(72),j=!0;
	break;case 40:case 63235:e.doScrollBy(-72),j=!0;break;case 37:case 63232:e.railh&&(h?e.doScrollLeft(0):e.doScrollLeftBy(72),j=!0);break;case 39:case 63234:e.railh&&(h?e.doScrollLeft(e.page.maxw):e.doScrollLeftBy(-72),j=!0);break;case 33:case 63276:e.doScrollBy(e.view.h),j=!0;break;case 34:case 63277:e.doScrollBy(-e.view.h),j=!0;break;case 36:case 63273:e.railh&&h?e.doScrollPos(0,0):e.doScrollTo(0),j=!0;break;case 35:case 63275:e.railh&&h?e.doScrollPos(e.page.maxw,e.page.maxh):e.doScrollTo(e.page.maxh),j=!0;break;case 32:e.opt.spacebarenabled&&(i?e.doScrollBy(e.view.h):e.doScrollBy(-e.view.h),j=!0);break;case 27:e.zoomactive&&(e.doZoom(),j=!0)}if(j)return e.cancelEvent(a)}},e.opt.enablekeyboard&&e.bind(document,l.isopera&&!l.isopera12?"keypress":"keydown",e.onkeypress),e.bind(window,"resize",e.lazyResize),e.bind(window,"orientationchange",e.lazyResize),e.bind(window,"load",e.lazyResize),!l.ischrome||e.ispage||e.haswrapper||(A=e.win.attr("style"),B=parseFloat(e.win.css("width"))+1,e.win.css("width",B),e.synched("chromefix",function(){e.win.attr("style",A)})),e.onAttributeChange=function(){e.lazyResize(250)},e.ispage||e.haswrapper||(o!==!1?(e.observer=new o(function(a){a.forEach(e.onAttributeChange)}),e.observer.observe(e.win[0],{childList:!0,characterData:!1,attributes:!0,subtree:!1}),e.observerremover=new o(function(a){a.forEach(function(a){if(a.removedNodes.length>0)for(var b in a.removedNodes)if(a.removedNodes[b]==e.win[0])return e.remove()})}),e.observerremover.observe(e.win[0].parentNode,{childList:!0,characterData:!1,attributes:!1,subtree:!1})):(e.bind(e.win,l.isie&&!l.isie9?"propertychange":"DOMAttrModified",e.onAttributeChange),l.isie9&&e.win[0].attachEvent("onpropertychange",e.onAttributeChange),e.bind(e.win,"DOMNodeRemoved",function(a){a.target==e.win[0]&&e.remove()}))),!e.ispage&&e.opt.boxzoom&&e.bind(window,"resize",e.resizeZoom),e.istextarea&&e.bind(e.win,"mouseup",e.lazyResize),e.checkrtlmode=!0,e.lazyResize(30)}"IFRAME"==this.doc[0].nodeName&&(this.doc[0].readyState&&"complete"==this.doc[0].readyState&&setTimeout(function(){C.call(e.doc[0],!1)},500),e.bind(this.doc,"load",C))},this.showCursor=function(a,b){e.cursortimeout&&(clearTimeout(e.cursortimeout),e.cursortimeout=0),e.rail&&(e.autohidedom&&(e.autohidedom.stop().css({opacity:e.opt.cursoropacitymax}),e.cursoractive=!0),e.rail.drag&&1==e.rail.drag.pt||("undefined"!=typeof a&&a!==!1&&(e.scroll.y=Math.round(1*a/e.scrollratio.y)),"undefined"!=typeof b&&(e.scroll.x=Math.round(1*b/e.scrollratio.x))),e.cursor.css({height:e.cursorheight,top:e.scroll.y}),e.cursorh&&(!e.rail.align&&e.rail.visibility?e.cursorh.css({width:e.cursorwidth,left:e.scroll.x+e.rail.width}):e.cursorh.css({width:e.cursorwidth,left:e.scroll.x}),e.cursoractive=!0),e.zoom&&e.zoom.stop().css({opacity:e.opt.cursoropacitymax}))},this.hideCursor=function(a){e.cursortimeout||e.rail&&e.autohidedom&&(e.cursortimeout=setTimeout(function(){e.rail.active&&e.showonmouseevent||(e.autohidedom.stop().animate({opacity:e.opt.cursoropacitymin}),e.zoom&&e.zoom.stop().animate({opacity:e.opt.cursoropacitymin}),e.cursoractive=!1),e.cursortimeout=0},a||e.opt.hidecursordelay))},this.noticeCursor=function(a,b,c){e.showCursor(b,c),e.rail.active||e.hideCursor(a)},this.getContentSize=e.ispage?function(){return{w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}:e.haswrapper?function(){return{w:e.doc.outerWidth()+parseInt(e.win.css("paddingLeft"))+parseInt(e.win.css("paddingRight")),h:e.doc.outerHeight()+parseInt(e.win.css("paddingTop"))+parseInt(e.win.css("paddingBottom"))}}:function(){return{w:e.docscroll[0].scrollWidth,h:e.docscroll[0].scrollHeight}},this.onResize=function(a,b){var c,d,f,g,h,i;if(!e.win)return!1;if(!e.haswrapper&&!e.ispage){if("none"==e.win.css("display"))return e.visibility&&e.hideRail().hideRailHr(),!1;e.hidden||e.visibility||e.showRail().showRailHr()}if(c=e.page.maxh,d=e.page.maxw,f={h:e.view.h,w:e.view.w},e.view={w:e.ispage?e.win.width():parseInt(e.win[0].clientWidth),h:e.ispage?e.win.height():parseInt(e.win[0].clientHeight)},e.page=b?b:e.getContentSize(),e.page.maxh=Math.max(0,e.page.h-e.view.h),e.page.maxw=Math.max(0,e.page.w-e.view.w),e.page.maxh==c&&e.page.maxw==d&&e.view.w==f.w){if(e.ispage)return e;if(g=e.win.offset(),e.lastposition&&(h=e.lastposition,h.top==g.top&&h.left==g.left))return e;e.lastposition=g}return 0==e.page.maxh?(e.hideRail(),e.scrollvaluemax=0,e.scroll.y=0,e.scrollratio.y=0,e.cursorheight=0,e.setScrollTop(0),e.rail.scrollable=!1):e.rail.scrollable=!0,0==e.page.maxw?(e.hideRailHr(),e.scrollvaluemaxw=0,e.scroll.x=0,e.scrollratio.x=0,e.cursorwidth=0,e.setScrollLeft(0),e.railh.scrollable=!1):e.railh.scrollable=!0,e.locked=0==e.page.maxh&&0==e.page.maxw,e.locked?(e.ispage||e.updateScrollBar(e.view),!1):(e.hidden||e.visibility?e.hidden||e.railh.visibility||e.showRailHr():e.showRail().showRailHr(),e.istextarea&&e.win.css("resize")&&"none"!=e.win.css("resize")&&(e.view.h-=20),e.cursorheight=Math.min(e.view.h,Math.round(e.view.h*(e.view.h/e.page.h))),e.cursorheight=e.opt.cursorfixedheight?e.opt.cursorfixedheight:Math.max(e.opt.cursorminheight,e.cursorheight),e.cursorwidth=Math.min(e.view.w,Math.round(e.view.w*(e.view.w/e.page.w))),e.cursorwidth=e.opt.cursorfixedheight?e.opt.cursorfixedheight:Math.max(e.opt.cursorminheight,e.cursorwidth),e.scrollvaluemax=e.view.h-e.cursorheight-e.cursor.hborder,e.railh&&(e.railh.width=e.page.maxh>0?e.view.w-e.rail.width:e.view.w,e.scrollvaluemaxw=e.railh.width-e.cursorwidth-e.cursorh.wborder),e.checkrtlmode&&e.railh&&(e.checkrtlmode=!1,e.opt.rtlmode&&0==e.scroll.x&&e.setScrollLeft(e.page.maxw)),e.ispage||e.updateScrollBar(e.view),e.scrollratio={x:e.page.maxw/e.scrollvaluemaxw,y:e.page.maxh/e.scrollvaluemax},i=e.getScrollTop(),i>e.page.maxh?e.doScrollTop(e.page.maxh):(e.scroll.y=Math.round(e.getScrollTop()*(1/e.scrollratio.y)),e.scroll.x=Math.round(e.getScrollLeft()*(1/e.scrollratio.x)),e.cursoractive&&e.noticeCursor()),e.scroll.y&&0==e.getScrollTop()&&e.doScrollTo(Math.floor(e.scroll.y*e.scrollratio.y)),e)},this.resize=e.onResize,this.lazyResize=function(a){return a=isNaN(a)?30:a,e.delayed("resize",e.resize,a),e},this._bind=function(a,b,c,d){e.events.push({e:a,n:b,f:c,b:d,q:!1}),a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c},this.jqbind=function(a,b,c){e.events.push({e:a,n:b,f:c,q:!0}),i(a).bind(b,c)},this.bind=function(a,b,c,d){var g,h,f="jquery"in a?a[0]:a;"mousewheel"==b?"onwheel"in e.win?e._bind(f,"wheel",c,d||!1):(g="undefined"!=typeof document.onmousewheel?"mousewheel":"DOMMouseScroll",w(f,g,c,d||!1),"DOMMouseScroll"==g&&w(f,"MozMousePixelScroll",c,d||!1)):f.addEventListener?(l.cantouch&&/mouseup|mousedown|mousemove/.test(b)&&(h="mousedown"==b?"touchstart":"mouseup"==b?"touchend":"touchmove",e._bind(f,h,function(a){var b;a.touches?a.touches.length<2&&(b=a.touches.length?a.touches[0]:a,b.original=a,c.call(this,b)):a.changedTouches&&(b=a.changedTouches[0],b.original=a,c.call(this,b))},d||!1)),e._bind(f,b,c,d||!1),l.cantouch&&"mouseup"==b&&e._bind(f,"touchcancel",c,d||!1)):e._bind(f,b,function(a){return a=a||window.event||!1,a&&a.srcElement&&(a.target=a.srcElement),"pageY"in a||(a.pageX=a.clientX+document.documentElement.scrollLeft,a.pageY=a.clientY+document.documentElement.scrollTop),c.call(f,a)===!1||d===!1?e.cancelEvent(a):!0})},this._unbind=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent?a.detachEvent("on"+b,c):a["on"+b]=!1},this.unbindAll=function(){var a,b;for(a=0;a<e.events.length;a++)b=e.events[a],b.q?b.e.unbind(b.n,b.f):e._unbind(b.e,b.n,b.f,b.b)},this.cancelEvent=function(a){var a=a.original?a.original:a?a:window.event||!1;return a?(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.preventManipulation&&a.preventManipulation(),a.cancelBubble=!0,a.cancel=!0,a.returnValue=!1,!1):!1},this.stopPropagation=function(a){var a=a.original?a.original:a?a:window.event||!1;return a?a.stopPropagation?a.stopPropagation():(a.cancelBubble&&(a.cancelBubble=!0),!1):!1},this.showRail=function(){return 0==e.page.maxh||!e.ispage&&"none"==e.win.css("display")||(e.visibility=!0,e.rail.visibility=!0,e.rail.css("display","block")),e},this.showRailHr=function(){return e.railh?(0==e.page.maxw||!e.ispage&&"none"==e.win.css("display")||(e.railh.visibility=!0,e.railh.css("display","block")),e):e},this.hideRail=function(){return e.visibility=!1,e.rail.visibility=!1,e.rail.css("display","none"),e},this.hideRailHr=function(){return e.railh?(e.railh.visibility=!1,e.railh.css("display","none"),e):e},this.show=function(){return e.hidden=!1,e.locked=!1,e.showRail().showRailHr()},this.hide=function(){return e.hidden=!0,e.locked=!0,e.hideRail().hideRailHr()},this.toggle=function(){return e.hidden?e.show():e.hide()},this.remove=function(){var a,b;for(e.stop(),e.cursortimeout&&clearTimeout(e.cursortimeout),e.doZoomOut(),e.unbindAll(),e.observer!==!1&&e.observer.disconnect(),e.observerremover!==!1&&e.observerremover.disconnect(),e.events=[],e.cursor&&(e.cursor.remove(),e.cursor=null),e.cursorh&&(e.cursorh.remove(),e.cursorh=null),e.rail&&(e.rail.remove(),e.rail=null),e.railh&&(e.railh.remove(),e.railh=null),e.zoom&&(e.zoom.remove(),e.zoom=null),a=0;a<e.saved.css.length;a++)b=e.saved.css[a],b[0].css(b[1],"undefined"==typeof b[2]?"":b[2]);return e.saved=!1,e.me.data("__nicescroll",""),e.me=null,e.doc=null,e.docscroll=null,e.win=null,e},this.scrollstart=function(a){return this.onscrollstart=a,e},this.scrollend=function(a){return this.onscrollend=a,e},this.scrollcancel=function(a){return this.onscrollcancel=a,e},this.zoomin=function(a){return this.onzoomin=a,e},this.zoomout=function(a){return this.onzoomout=a,e},this.isScrollable=function(a){var c,d,b=a.target?a.target:a;if("OPTION"==b.nodeName)return!0;for(;b&&1==b.nodeType&&!/BODY|HTML/.test(b.nodeName);){if(c=i(b),d=c.css("overflowY")||c.css("overflowX")||c.css("overflow")||"",/scroll|auto/.test(d))return b.clientHeight!=b.scrollHeight;b=b.parentNode?b.parentNode:!1}return!1},this.getViewport=function(a){for(var c,d,b=a&&a.parentNode?a.parentNode:!1;b&&1==b.nodeType&&!/BODY|HTML/.test(b.nodeName);){if(c=i(b),d=c.css("overflowY")||c.css("overflowX")||c.css("overflow")||"",/scroll|auto/.test(d)&&b.clientHeight!=b.scrollHeight)return c;if(c.getNiceScroll().length>0)return c;b=b.parentNode?b.parentNode:!1}return!1},this.onmousewheel=function(a){var b,c,d;return e.locked?!0:e.rail.drag?e.cancelEvent(a):e.rail.scrollable?(b=+new Date,c=!1,e.opt.preservenativescrolling&&e.checkarea+600<b&&(e.nativescrollingarea=e.isScrollable(a),c=!0),e.checkarea=b,e.nativescrollingarea?!0:(d=x(a,!1,c),d&&(e.checkarea=0),d)):e.railh&&e.railh.scrollable?e.onmousewheelhr(a):!0},this.onmousewheelhr=function(a){var b,c;return e.locked||!e.railh.scrollable?!0:e.rail.drag?e.cancelEvent(a):(b=+new Date,c=!1,e.opt.preservenativescrolling&&e.checkarea+600<b&&(e.nativescrollingarea=e.isScrollable(a),c=!0),e.checkarea=b,e.nativescrollingarea?!0:e.locked?e.cancelEvent(a):x(a,!0,c))},this.stop=function(){return e.cancelScroll(),e.scrollmon&&e.scrollmon.stop(),e.cursorfreezed=!1,e.scroll.y=Math.round(e.getScrollTop()*(1/e.scrollratio.y)),e.noticeCursor(),e},this.getTransitionSpeed=function(a){var b=Math.round(10*e.opt.scrollspeed),c=Math.min(b,Math.round(a/20*e.opt.scrollspeed));return c>20?c:0},e.opt.smoothscroll?e.ishwscroll&&l.hastransition&&e.opt.usetransition?(this.prepareTransition=function(a,b){var c=b?a>20?a:0:e.getTransitionSpeed(a),d=c?l.prefixstyle+"transform "+c+"ms ease-out":"";return e.lasttransitionstyle&&e.lasttransitionstyle==d||(e.lasttransitionstyle=d,e.doc.css(l.transitionstyle,d)),c},this.doScrollLeft=function(a,b){var c=e.scrollrunning?e.newscrolly:e.getScrollTop();e.doScrollPos(a,c,b)},this.doScrollTop=function(a,b){var c=e.scrollrunning?e.newscrollx:e.getScrollLeft();e.doScrollPos(c,a,b)},this.doScrollPos=function(a,b,c){var d=e.getScrollTop(),f=e.getScrollLeft();return((e.newscrolly-d)*(b-d)<0||(e.newscrollx-f)*(a-f)<0)&&e.cancelScroll(),0==e.opt.bouncescroll&&(0>b?b=0:b>e.page.maxh&&(b=e.page.maxh),0>a?a=0:a>e.page.maxw&&(a=e.page.maxw)),e.scrollrunning&&a==e.newscrollx&&b==e.newscrolly?!1:(e.newscrolly=b,e.newscrollx=a,e.newscrollspeed=c||!1,e.timer?!1:(e.timer=setTimeout(function(){var g,h,i,j,k,c=e.getScrollTop(),d=e.getScrollLeft(),f={};f.x=a-d,f.y=b-c,f.px=d,f.py=c,g=Math.round(Math.sqrt(Math.pow(f.x,2)+Math.pow(f.y,2))),h=e.newscrollspeed&&e.newscrollspeed>1?e.newscrollspeed:e.getTransitionSpeed(g),e.newscrollspeed&&e.newscrollspeed<=1&&(h*=e.newscrollspeed),e.prepareTransition(h,!0),e.timerscroll&&e.timerscroll.tm&&clearInterval(e.timerscroll.tm),h>0&&(!e.scrollrunning&&e.onscrollstart&&(i={type:"scrollstart",current:{x:d,y:c},request:{x:a,y:b},end:{x:e.newscrollx,y:e.newscrolly},speed:h},e.onscrollstart.call(e,i)),l.transitionend?e.scrollendtrapped||(e.scrollendtrapped=!0,e.bind(e.doc,l.transitionend,e.onScrollEnd,!1)):(e.scrollendtrapped&&clearTimeout(e.scrollendtrapped),e.scrollendtrapped=setTimeout(e.onScrollEnd,h)),j=c,k=d,e.timerscroll={bz:new BezierClass(j,e.newscrolly,h,0,0,.58,1),bh:new BezierClass(k,e.newscrollx,h,0,0,.58,1)},e.cursorfreezed||(e.timerscroll.tm=setInterval(function(){e.showCursor(e.getScrollTop(),e.getScrollLeft())},60))),e.synched("doScroll-set",function(){e.timer=0,e.scrollendtrapped&&(e.scrollrunning=!0),e.setScrollTop(e.newscrolly),e.setScrollLeft(e.newscrollx),e.scrollendtrapped||e.onScrollEnd()})},50),void 0))},this.cancelScroll=function(){var a,b;return e.scrollendtrapped?(a=e.getScrollTop(),b=e.getScrollLeft(),e.scrollrunning=!1,l.transitionend||clearTimeout(l.transitionend),e.scrollendtrapped=!1,e._unbind(e.doc,l.transitionend,e.onScrollEnd),e.prepareTransition(0),e.setScrollTop(a),e.railh&&e.setScrollLeft(b),e.timerscroll&&e.timerscroll.tm&&clearInterval(e.timerscroll.tm),e.timerscroll=!1,e.cursorfreezed=!1,e.showCursor(a,b),e):!0},this.onScrollEnd=function(){var a,b,c;return e.scrollendtrapped&&e._unbind(e.doc,l.transitionend,e.onScrollEnd),e.scrollendtrapped=!1,e.prepareTransition(0),e.timerscroll&&e.timerscroll.tm&&clearInterval(e.timerscroll.tm),e.timerscroll=!1,a=e.getScrollTop(),b=e.getScrollLeft(),e.setScrollTop(a),e.railh&&e.setScrollLeft(b),e.noticeCursor(!1,a,b),e.cursorfreezed=!1,0>a?a=0:a>e.page.maxh&&(a=e.page.maxh),0>b?b=0:b>e.page.maxw&&(b=e.page.maxw),a!=e.newscrolly||b!=e.newscrollx?e.doScrollPos(b,a,e.opt.snapbackspeed):(e.onscrollend&&e.scrollrunning&&(c={type:"scrollend",current:{x:b,y:a},end:{x:e.newscrollx,y:e.newscrolly}},e.onscrollend.call(e,c)),e.scrollrunning=!1,void 0)}):(this.doScrollLeft=function(a,b){var c=e.scrollrunning?e.newscrolly:e.getScrollTop();e.doScrollPos(a,c,b)},this.doScrollTop=function(a,b){var c=e.scrollrunning?e.newscrollx:e.getScrollLeft();e.doScrollPos(c,a,b)},this.doScrollPos=function(a,b,c){function l(){var a,b,c,d,f;return e.cancelAnimationFrame?!0:(e.scrollrunning=!0,(k=1-k)?e.timer=m(l)||1:(a=0,b=sy=e.getScrollTop(),e.dst.ay?(b=e.bzscroll?e.dst.py+e.bzscroll.getNow()*e.dst.ay:e.newscrolly,c=b-sy,(0>c&&b<e.newscrolly||c>0&&b>e.newscrolly)&&(b=e.newscrolly),e.setScrollTop(b),b==e.newscrolly&&(a=1)):a=1,d=sx=e.getScrollLeft(),e.dst.ax?(d=e.bzscroll?e.dst.px+e.bzscroll.getNow()*e.dst.ax:e.newscrollx,c=d-sx,(0>c&&d<e.newscrollx||c>0&&d>e.newscrollx)&&(d=e.newscrollx),e.setScrollLeft(d),d==e.newscrollx&&(a+=1)):a+=1,2==a?(e.timer=0,e.cursorfreezed=!1,e.bzscroll=!1,e.scrollrunning=!1,0>b?b=0:b>e.page.maxh&&(b=e.page.maxh),0>d?d=0:d>e.page.maxw&&(d=e.page.maxw),d!=e.newscrollx||b!=e.newscrolly?e.doScrollPos(d,b):e.onscrollend&&(f={type:"scrollend",current:{x:sx,y:sy},end:{x:e.newscrollx,y:e.newscrolly}},e.onscrollend.call(e,f))):e.timer=m(l)||1,void 0))}var d,f,g,h,i,j,k,o;return b="undefined"==typeof b||b===!1?e.getScrollTop(!0):b,e.timer&&e.newscrolly==b&&e.newscrollx==a?!0:(e.timer&&n(e.timer),e.timer=0,d=e.getScrollTop(),f=e.getScrollLeft(),((e.newscrolly-d)*(b-d)<0||(e.newscrollx-f)*(a-f)<0)&&e.cancelScroll(),e.newscrolly=b,e.newscrollx=a,e.bouncescroll&&e.rail.visibility||(e.newscrolly<0?e.newscrolly=0:e.newscrolly>e.page.maxh&&(e.newscrolly=e.page.maxh)),e.bouncescroll&&e.railh.visibility||(e.newscrollx<0?e.newscrollx=0:e.newscrollx>e.page.maxw&&(e.newscrollx=e.page.maxw)),e.dst={},e.dst.x=a-f,e.dst.y=b-d,e.dst.px=f,e.dst.py=d,g=Math.round(Math.sqrt(Math.pow(e.dst.x,2)+Math.pow(e.dst.y,2))),e.dst.ax=e.dst.x/g,e.dst.ay=e.dst.y/g,h=0,i=g,0==e.dst.x?(h=d,i=b,e.dst.ay=1,e.dst.py=0):0==e.dst.y&&(h=f,i=a,e.dst.ax=1,e.dst.px=0),j=e.getTransitionSpeed(g),c&&1>=c&&(j*=c),e.bzscroll=j>0?e.bzscroll?e.bzscroll.update(i,j):new BezierClass(h,i,j,0,1,0,1):!1,e.timer||((d==e.page.maxh&&b>=e.page.maxh||f==e.page.maxw&&a>=e.page.maxw)&&e.checkContentSize(),k=1,e.cancelAnimationFrame=!1,e.timer=1,e.onscrollstart&&!e.scrollrunning&&(o={type:"scrollstart",current:{x:f,y:d},request:{x:a,y:b},end:{x:e.newscrollx,y:e.newscrolly},speed:j},e.onscrollstart.call(e,o)),l(),(d==e.page.maxh&&b>=d||f==e.page.maxw&&a>=f)&&e.checkContentSize(),e.noticeCursor()),void 0)},this.cancelScroll=function(){return e.timer&&n(e.timer),e.timer=0,e.bzscroll=!1,e.scrollrunning=!1,e}):(this.doScrollLeft=function(a,b){var c=e.getScrollTop();e.doScrollPos(a,c,b)},this.doScrollTop=function(a,b){var c=e.getScrollLeft();e.doScrollPos(c,a,b)},this.doScrollPos=function(a,b){var f,d=a>e.page.maxw?e.page.maxw:a;0>d&&(d=0),f=b>e.page.maxh?e.page.maxh:b,0>f&&(f=0),e.synched("scroll",function(){e.setScrollTop(f),e.setScrollLeft(d)})},this.cancelScroll=function(){}),this.doScrollBy=function(a,b){var d,f,c=0;return b?c=Math.floor((e.scroll.y-a)*e.scrollratio.y):(d=e.timer?e.newscrolly:e.getScrollTop(!0),c=d-a),e.bouncescroll&&(f=Math.round(e.view.h/2),-f>c?c=-f:c>e.page.maxh+f&&(c=e.page.maxh+f)),e.cursorfreezed=!1,py=e.getScrollTop(!0),0>c&&0>=py?e.noticeCursor():c>e.page.maxh&&py>=e.page.maxh?(e.checkContentSize(),e.noticeCursor()):(e.doScrollTop(c),void 0)},this.doScrollLeftBy=function(a,b){var d,f,c=0;return b?c=Math.floor((e.scroll.x-a)*e.scrollratio.x):(d=e.timer?e.newscrollx:e.getScrollLeft(!0),c=d-a),e.bouncescroll&&(f=Math.round(e.view.w/2),-f>c?c=-f:c>e.page.maxw+f&&(c=e.page.maxw+f)),e.cursorfreezed=!1,px=e.getScrollLeft(!0),0>c&&0>=px?e.noticeCursor():c>e.page.maxw&&px>=e.page.maxw?e.noticeCursor():(e.doScrollLeft(c),void 0)},this.doScrollTo=function(a,b){var c=b?Math.round(a*e.scrollratio.y):a;0>c?c=0:c>e.page.maxh&&(c=e.page.maxh),e.cursorfreezed=!1,e.doScrollTop(a)},this.checkContentSize=function(){var a=e.getContentSize();(a.h!=e.page.h||a.w!=e.page.w)&&e.resize(!1,a)},e.onscroll=function(){e.rail.drag||e.cursorfreezed||e.synched("scroll",function(){e.scroll.y=Math.round(e.getScrollTop()*(1/e.scrollratio.y)),e.railh&&(e.scroll.x=Math.round(e.getScrollLeft()*(1/e.scrollratio.x))),e.noticeCursor()})},e.bind(e.docscroll,"scroll",e.onscroll),this.doZoomIn=function(a){var b,c,d,f,g;if(!e.zoomactive){e.zoomactive=!0,e.zoomrestore={style:{}},b=["position","top","left","zIndex","backgroundColor","marginTop","marginBottom","marginLeft","marginRight"],c=e.win[0].style;for(d in b)f=b[d],e.zoomrestore.style[f]="undefined"!=typeof c[f]?c[f]:"";return e.zoomrestore.style.width=e.win.css("width"),e.zoomrestore.style.height=e.win.css("height"),e.zoomrestore.padding={w:e.win.outerWidth()-e.win.width(),h:e.win.outerHeight()-e.win.height()},l.isios4&&(e.zoomrestore.scrollTop=i(window).scrollTop(),i(window).scrollTop(0)),e.win.css({position:l.isios4?"absolute":"fixed",top:0,left:0,"z-index":h+100,margin:"0px"}),g=e.win.css("backgroundColor"),(""==g||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(g))&&e.win.css("backgroundColor","#fff"),e.rail.css({"z-index":h+101}),e.zoom.css({"z-index":h+102}),e.zoom.css("backgroundPosition","0px -18px"),e.resizeZoom(),e.onzoomin&&e.onzoomin.call(e),e.cancelEvent(a)}},this.doZoomOut=function(a){return e.zoomactive?(e.zoomactive=!1,e.win.css("margin",""),e.win.css(e.zoomrestore.style),l.isios4&&i(window).scrollTop(e.zoomrestore.scrollTop),e.rail.css({"z-index":e.zindex}),e.zoom.css({"z-index":e.zindex}),e.zoomrestore=!1,e.zoom.css("backgroundPosition","0px 0px"),e.onResize(),e.onzoomout&&e.onzoomout.call(e),e.cancelEvent(a)):void 0},this.doZoom=function(a){return e.zoomactive?e.doZoomOut(a):e.doZoomIn(a)},this.resizeZoom=function(){if(e.zoomactive){var a=e.getScrollTop();e.win.css({width:i(window).width()-e.zoomrestore.padding.w+"px",height:i(window).height()-e.zoomrestore.padding.h+"px"}),e.onResize(),e.setScrollTop(Math.min(e.page.maxh,a))}},this.init(),i.nicescroll.push(this)},t=function(a){var b=this;this.nc=a,this.lastx=0,this.lasty=0,this.speedx=0,this.speedy=0,this.lasttime=0,this.steptime=0,this.snapx=!1,this.snapy=!1,this.demulx=0,this.demuly=0,this.lastscrollx=-1,this.lastscrolly=-1,this.chkx=0,this.chky=0,this.timer=0,this.time=function(){return+new Date},this.reset=function(a,c){b.stop();var d=b.time();b.steptime=0,b.lasttime=d,b.speedx=0,b.speedy=0,b.lastx=a,b.lasty=c,b.lastscrollx=-1,b.lastscrolly=-1},this.update=function(a,c){var e,f,g,h,i,j,d=b.time();b.steptime=d-b.lasttime,b.lasttime=d,e=c-b.lasty,f=a-b.lastx,g=b.nc.getScrollTop(),h=b.nc.getScrollLeft(),i=g+e,j=h+f,b.snapx=0>j||j>b.nc.page.maxw,b.snapy=0>i||i>b.nc.page.maxh,b.speedx=f,b.speedy=e,b.lastx=a,b.lasty=c},this.stop=function(){b.nc.unsynched("domomentum2d"),b.timer&&clearTimeout(b.timer),b.timer=0,b.lastscrollx=-1,b.lastscrolly=-1},this.doSnapy=function(a,c){var d=!1;0>c?(c=0,d=!0):c>b.nc.page.maxh&&(c=b.nc.page.maxh,d=!0),0>a?(a=0,d=!0):a>b.nc.page.maxw&&(a=b.nc.page.maxw,d=!0),d&&b.nc.doScrollPos(a,c,b.nc.opt.snapbackspeed)},this.doMomentum=function(a){var i,j,k,l,m,n,o,p,c=b.time(),d=a?c+a:b.lasttime,e=b.nc.getScrollLeft(),f=b.nc.getScrollTop(),g=b.nc.page.maxh,h=b.nc.page.maxw;b.speedx=h>0?Math.min(60,b.speedx):0,b.speedy=g>0?Math.min(60,b.speedy):0,i=d&&50>=c-d,(0>f||f>g||0>e||e>h)&&(i=!1),j=b.speedy&&i?b.speedy:!1,k=b.speedx&&i?b.speedx:!1,j||k?(l=Math.max(16,b.steptime),l>50&&(m=l/50,b.speedx*=m,b.speedy*=m,l=50),b.demulxy=0,b.lastscrollx=b.nc.getScrollLeft(),b.chkx=b.lastscrollx,b.lastscrolly=b.nc.getScrollTop(),b.chky=b.lastscrolly,n=b.lastscrollx,o=b.lastscrolly,p=function(){var a=b.time()-c>600?.04:.02;b.speedx&&(n=Math.floor(b.lastscrollx-b.speedx*(1-b.demulxy)),b.lastscrollx=n,(0>n||n>h)&&(a=.1)),b.speedy&&(o=Math.floor(b.lastscrolly-b.speedy*(1-b.demulxy)),b.lastscrolly=o,(0>o||o>g)&&(a=.1)),b.demulxy=Math.min(1,b.demulxy+a),b.nc.synched("domomentum2d",function(){var a,c;b.speedx&&(a=b.nc.getScrollLeft(),a!=b.chkx&&b.stop(),b.chkx=n,b.nc.setScrollLeft(n)),b.speedy&&(c=b.nc.getScrollTop(),c!=b.chky&&b.stop(),b.chky=o,b.nc.setScrollTop(o)),b.timer||(b.nc.hideCursor(),b.doSnapy(n,o))}),b.demulxy<1?b.timer=setTimeout(p,l):(b.stop(),b.nc.hideCursor(),b.doSnapy(n,o))},p()):b.doSnapy(b.nc.getScrollLeft(),b.nc.getScrollTop())}},u=b.fn.scrollTop,b.cssHooks.pageYOffset={get:function(a){var d=i.data(a,"__nicescroll")||!1;return d&&d.ishwscroll?d.getScrollTop():u.call(a)},set:function(a,b){var c=i.data(a,"__nicescroll")||!1;return c&&c.ishwscroll?c.setScrollTop(parseInt(b)):u.call(a,b),this}},b.fn.scrollTop=function(a){if("undefined"==typeof a){var b=this[0]?i.data(this[0],"__nicescroll")||!1:!1;return b&&b.ishwscroll?b.getScrollTop():u.call(this)}return this.each(function(){var b=i.data(this,"__nicescroll")||!1;b&&b.ishwscroll?b.setScrollTop(parseInt(a)):u.call(i(this),a)})},v=b.fn.scrollLeft,i.cssHooks.pageXOffset={get:function(a){var d=i.data(a,"__nicescroll")||!1;return d&&d.ishwscroll?d.getScrollLeft():v.call(a)},set:function(a,b){var c=i.data(a,"__nicescroll")||!1;return c&&c.ishwscroll?c.setScrollLeft(parseInt(b)):v.call(a,b),this}},b.fn.scrollLeft=function(a){if("undefined"==typeof a){var b=this[0]?i.data(this[0],"__nicescroll")||!1:!1;return b&&b.ishwscroll?b.getScrollLeft():v.call(this)}return this.each(function(){var b=i.data(this,"__nicescroll")||!1;b&&b.ishwscroll?b.setScrollLeft(parseInt(a)):v.call(i(this),a)})},w=function(b){var d,c=this;if(this.length=0,this.name="nicescrollarray",this.each=function(a){for(var b=0;b<c.length;b++)a.call(c[b]);return c},this.push=function(a){c[c.length]=a,c.length++},this.eq=function(a){return c[a]},b)for(a=0;a<b.length;a++)d=i.data(b[a],"__nicescroll")||!1,d&&(this[this.length]=d,this.length++);return this},x(w.prototype,["show","hide","toggle","onResize","resize","remove","stop","doScrollPos"],function(a,b){a[b]=function(){var a=arguments;return this.each(function(){this[b].apply(this,a)})}}),b.fn.getNiceScroll=function(a){if("undefined"==typeof a)return new w(this);var b=i.data(this[a],"__nicescroll")||!1;return b},b.extend(b.expr[":"],{nicescroll:function(a){return i.data(a,"__nicescroll")?!0:!1}}),i.fn.niceScroll=function(a,b){var c,d;return"undefined"==typeof b&&("object"!=typeof a||"jquery"in a||(b=a,a=!1)),c=new w,"undefined"==typeof b&&(b={}),a&&(b.doc=i(a),b.win=i(this)),d=!("doc"in b),d||"win"in b||(b.win=i(this)),this.each(function(){var a=i(this).data("__nicescroll")||!1;a||(b.doc=d?i(this):b.doc,a=new s(b,i(this)),i(this).data("__nicescroll",a)),c.push(a)}),1==c.length?c[0]:c},window.NiceScroll={getjQuery:function(){return b}},i.nicescroll||(i.nicescroll=new w,i.nicescroll.options=p)}(jQuery);
(function ($) {
    var ua = navigator.userAgent.toLowerCase(),
        ie = /msie/.test(ua),
        ff = /firefox/.test(ua),//$.browser.mozilla,
        android = /android/.test(ua),
        ipad = /ipad/.test(ua),
        iphone = /iphone/.test(ua),
        mz = /meizu/.test(ua),
        m9 = mz && /m9/.test(ua),
        ismobile = android || ipad || iphone || mz;
    $.meizu = {'ie': ie, 'ff': ff, 'mz': mz, 'm9': m9, 'ismobile': ismobile, 'zindex': 10000};
    function makeLayOuter(jop) {
        var opt = $.extend({'start': false, 'end': false, 'host': null, 'position': 'cover', 'fJobj': false, 'timeout': 500}, jop);
        $('body').append("<div id='meizuSelectID_" + (makeLayOuter.uuid += 1) + "' class='mzContainer'></div>");
        var layOuter = $('#meizuSelectID_' + makeLayOuter.uuid)
            .html('&nbsp;').data('isIn', false).data('abled', true);
        if (opt.fJobj) {
            opt.fJobj.bind('click', {'opt': opt, 'lay': layOuter}, makeLayOuter._fns['_show']);
        }
        opt.host.bind('click', {'opt': opt, 'lay': layOuter, 'xlen': opt.xlen, 'ylen': opt.ylen}, makeLayOuter._fns['_show']);
        return layOuter;
    }

    makeLayOuter._fns = {
        '_outFn': function (e) {
            var lay = e.data.lay.data('isIn', false);
            setTimeout(function () {
                if (!lay.data('isIn')) {
                    lay.hide();
                    e.data && e.data.end && e.data.end(e.data.extraId);
                }
            }, e.data.delay);
        },
        '_inFn': function (e) {

            e.data.lay.data('isIn', true);

        },
        '_show': function (e) {
            var opt = e.data.opt,
                lay = e.data.lay;
            opt.start && opt.start(opt.extraId);
            if (!lay.data('abled')) return;
            var host = $(this),
                pos = host.offset(),
                sh = ( opt.position === 'cover' ? (pos.top) : (pos.top + host.height()) ),
                left = pos.left + (opt.xlen ? opt.xlen : 0),
                top = sh + (opt.ylen ? opt.ylen : 0);
            lay.css({"left": left, "top": top}).show();
            e.data.opt.curObj = host;
            var extra = opt.scroll && opt.extra && opt.extra(opt.extraId);
            makeLayOuter._hover(host.data("lj"), opt.host, opt.timeout, opt.end, extra, opt.extraId);
            makeLayOuter._hover(host.data("lj"), host.data("lj"), opt.timeout, opt.end, extra, opt.extraId);
        }
    };
    makeLayOuter._close = function (lay, end) {
        lay.data('isIn', false);
        lay.hide();
        end && end();
    };
    makeLayOuter._hover = function (lay, target, delay, end, extra, extraId) {
        var param = {'lay': lay, 'delay': delay, 'end': end, 'extraId': extraId};
        target.add("#" + extra).mouseover(param, makeLayOuter._fns['_inFn']).mouseout(param, makeLayOuter._fns['_outFn']);
    };
    makeLayOuter._unHover = function (j) {
        j.unbind('mouseover', makeLayOuter._fns['_inFn'])
            .unbind('mouseout', makeLayOuter._fns['_outFn'])
            .unbind('click', makeLayOuter._fns['_show']);
    };
    makeLayOuter._html = function (c) {
        var opt = $.extend({'jdom': null, 'html': null, 'maxH': 0, 'width': 0, 'hostw': 0}, c);
        if (!opt.jdom || !opt.html) return 0;
        opt.jdom.empty().append(opt.html);
        var w = opt.jdom.width(), sw = opt.hostw, h = opt.jdom.height();
        if (opt.hostw && w < sw) w = sw;
        if (opt.maxH && h >= opt.maxH) {
            opt.jdom.css({"height": (opt.maxH + "px"), "overflowY": "scroll"});
            w += 10;
        }
        if (opt.width)
            w = opt.width;
        return w;
    };
    makeLayOuter.uuid = 0;

    function Select(opt) {
        var defaults = {
            click: '',  //选择选项后的回调函数
            data: '',
            dataIsHtml: false,
            maxH: '',
            itemOver: 'mzItemOver',
            pos: 'down',
            chgHost: false,
            width: false,
            disClk: false,
            start: function (e) {
                $("#" + e).getNiceScroll().show();
            },
            end: function (e) {
                $("#" + e).getNiceScroll().hide();
            },
            focus: null,
            nowidth: true,
            itemChk: 'mzItemChecked',
            timeout: 500,
            isModify: false,
            scroll: false,
            extraId: "",
            extra: function (e) {
                var $notifyWrap = $("#" + e);
                var scrollId = $notifyWrap.niceScroll({cursorborder: "", cursorborderradius: "0", cursorwidth: 6, cursorcolor: "#c9c9c9", enablemouselockapi: false, horizrailenabled: false}).id;
                return scrollId;
            },
            xlen: 0,
            ylen: 0
        };
        this.options = $.extend(defaults, opt);
        var opt = this.options;
        if (!opt.isModify) {
            var id = opt.host.attr("id");
            (opt.dataIsHtml ? opt.data.find("li").length : opt.data.length) > 5 ? opt.scroll = true : opt.scroll = false;
            if (opt.scroll && id) {
                (opt.extraId == "") && (opt.extraId = id + "ScrollWrap");
            }
            opt.host.data('lj',
                makeLayOuter({
                    'host': opt.host,
                    'scroll': opt.scroll,
                    'extraId': opt.extraId,
                    'extra': opt.extra,
                    'start': opt.start,
                    'end': opt.end,
                    'position': opt.pos,
                    'fJobj': opt.focus,
                    'xlen': opt.xlen,
                    'ylen': opt.ylen}));
            this.options.curObj = this.options.host;
        }
        this.reload(opt.data, opt.dataIsHtml, true);
    }

    Select.prototype = {
        reload: function (j, isHtml, isInit) {
            var proto = this, opt = proto.options, host = opt.host, lj = host.data('lj').css({"height": "auto", "overflowY": "", "cursor": "pointer"}), ay = [], ulClass = "";
            if (!isHtml) {
                opt.scroll && (ulClass = "notify_wrap");
                ay.push('<ul class="' + ulClass + '" id=' + opt.extraId + '>');
                if (j && j.length) {
                    for (var m = 0, n = j.length; m < n; m++) {
                        var unit = j[m];
                        ay.push("<li class='mz_selectli' ivalue='" + unit.value + "'><div class='" + (unit['selected'] && isInit ? opt['itemChk'] : '') + (unit.title ? ' longdot' : '') + " 'title='" + (unit.title ? unit.title : '') + "'>" + unit.text + "</div></li>");
                    }
                }
                ay.push("</ul>");
                opt.jsondatas = j;
            }
            var w = makeLayOuter._html({'jdom': lj, html: ( isHtml ? j : ay.join('') ), 'maxH': opt.maxH, 'width': opt.width, 'hostw': ( opt.nowidth ? 0 : host.width() )});
            var val = j[0].value;
            if (isInit) {
                $(proto.options.curObj).siblings("span").find(":hidden").val(val);
                this._eventBind(opt, host, w);
            }
        },
        _eventBind: function (opt, host, w) {
            var proto = this;
            $('li', host.data('lj')).each(function () {
                $(this).width(w).parents(".mzContainer").width(opt.width ? opt.width + 7 : w);
            }).live('click mouseenter mouseleave', function (event) {
                if (event.type == 'click') {
                    if (!opt.disClk) {
                        host.data('lj').hide();
                    }
                    var jobj = $(this), val = jobj.attr('ivalue'), text = jobj.text();
                    opt.click && opt.click.call(proto.options.curObj, {"value": val, "text": text, 'jobj': host});
                    proto.setVal(val);
                    $(proto.options.curObj).siblings("span").find(":hidden").val(val);
                } else if (event.type == 'mouseenter') {
                    $($('div', this)[0]).addClass(opt.itemOver);
                } else if (event.type == 'mouseleave') {
                    $($('div', this)[0]).removeClass(opt.itemOver);
                }
            });
        },
        setVal: function (val) {
            if (this.options.jsondatas) {
                for (var i = 0, j = this.options.jsondatas.length; i < j; i++) {
                    if (!this.options.isModify) {
                        if (this.options.jsondatas[i].value == val) {
                            this.options.jsondatas[i].selected = true;
                        } else {
                            this.options.jsondatas[i].selected = false;
                        }
                    } else {
                        this.options.jsondatas[i].selected = false;
                    }
                }
                this.options.isModify && this.options.jsondatas[0] && (this.options.jsondatas[0].selected = true);
                this.reload(this.options.jsondatas);
            }
        }
    };


    function Pager(o) {
        var _self = this.reload(o);
        var pageClick = function (page) {
            var opt = _self.options;
            if (opt.callBack) {
                if (!_self.block) {
                    var _tmp = _self.options.host, w = _tmp.width(), h = _tmp.height(), oset = _tmp.offset(), l = oset.left, t = oset.top;
                    _tmp.addClass('overOpac5');
                    _self.block = $('<div></div>')
                        .appendTo($(document.body))
                        .css({'width': w, 'height': h, 'left': l, 'top': t, 'fontSize': '18px', 'position': 'absolute', 'paddingLeft': '100px'});
                } else {
                    var _tmp = _self.options.host, w = _tmp.width(), h = _tmp.height(), oset = _tmp.offset(), l = oset.left, t = oset.top;
                    _self.block.css({'width': w, 'height': h, 'left': l, 'top': t, 'fontSize': '18px', 'position': 'absolute', 'paddingLeft': '100px'}).show();
                }
                opt.pagenumber = page;
                opt.callBack(page);
            } else {
                var gpage = opt.toPage + (Number(page) * opt.pageSize - opt.pageSize);
                window.location = gpage;
            }
        };
        $('a', _self.options.host).die().live('click', function () {
            var J = $(this);
            var opt = _self.options;
            if (J.hasClass('liNoThisClass')) {
                var page = 0;
                page = $.trim(J.text() + '') - 0;
                if (!page) {
                    page = $.trim(J.attr('rno')) - 0;
                }
                if (page !== (opt.pagenumber)) {
                    pageClick.call(null, page);
                }
            } else if (J.hasClass('pre')) {
                if (opt.pagenumber !== 1) {
                    pageClick.call(null, opt.pagenumber - 1);
                }
            } else if (J.hasClass('next')) {
                if (opt.pagenumber !== opt.pagecount)
                    pageClick.call(null, opt.pagenumber + 1);
            }
        });
        return this;
    }

    Pager.prototype = {
        block: null,
        reload: function (o) {
            this.options = $.extend(this.options ? this.options : {'pagenumber': 1, 'pagecount': 1, 'maxPage': 5, 'pageSize': 10, 'totalCount': 1, 'callBack': null, toPage: null, noLF: false}, o);
            this.options.pagecount = Math.ceil(this.options.totalCount / this.options.pageSize);
            this._html((this.options.callBack ? true : false),
                this.options.host,
                parseInt(this.options.pagenumber),
                parseInt(this.options.pagecount),
                this.options.maxPage,
                this.options.noLF);
            if (this.block) {
                this.options.host.removeClass('overOpac5');
                this.block.hide();
            }
            return this;
        },
        getCurPage: function () {
            return this.options.pagenumber;
        },
        //     _pno : 当前第几页，_pc ：总页数 ， _mp ：最大显示页数            ,noLF：无最后一页和第一页
        _html: function (ajax, host, pno, pc, mp, noLF) {
            var $pager = $('<div class="pageDiv"></div>'),
                buffer = [],
                bText = ajax ? 'javascript:void(0)' : '#',
                half = parseInt((mp - 1) / 2),
                c = 0,
                start = pno - half,
                end = pno + half;
            if (start < 1) {
                end += (1 - start);
                start = 1;
            }
            if (end > pc) {
                c = end - pc;
                end = pc;
                if (start > 1) {
                    if (start > c) {
                        start -= c;
                    } else {
                        start = 1;
                    }
                }
            }
            if (!noLF && pno > 1) {
                buffer.push("<a class='pre bRadius2' href='" + bText + "'>" + (window['G_isCht'] ? '上一頁' : '上一页') + "</a>");
            }
            if (start > 1) {
                buffer.push("<a class='bRadius2 liNoThisClass' href='" + bText + "' rno='1'>" + (noLF ? "<" : 1) + "</a>");
            }
            if (!noLF && start > 2) {
                buffer.push("<a class='bRadius0 pomit' href='javascript:void(0)'>...</a>");
            }

            if (start !== end) {
                for (var i = start; i <= end; i++)
                    buffer.push("<a class='" + (i == pno ? "selected bRadius0" : "liNoThisClass bRadius2") + "' href='" + bText + "'>" + i + "</a>");
            }
            if (!noLF && end < pc - 1) {
                buffer.push("<a class='bRadius0 pomit' href='javascript:void(0)'>...</a>");
            }
            if (end < pc) {
                buffer.push("<a class='bRadius2 liNoThisClass' href='" + bText + "' rno='" + pc + "'>" + (noLF ? ">" : pc) + "</a>");
            }
            if (!noLF && pno < pc) {
                buffer.push("<a class='next bRadius2' href='" + bText + "'>" + (window['G_isCht'] ? '下一頁' : '下一页') + "</a>");
            }
            $pager.append(buffer.join(''));
            host.empty().append($pager);
        }
    };
    function Panel(c) {
        this.options = $.extend({
            content: '',
            pos: 'down',
            width: false,
            openAction: null,
            model: false,
            xlen: 0,
            ylen: 0
        }, c);
        var opt = this.options;
        var layerJobj = makeLayOuter({'host': opt.host, 'position': opt.pos, 'timeout': 800, 'openAct': opt.openAction, 'xlen': opt.xlen, 'ylen': opt.ylen});
        layerJobj.empty().append(opt.content);
        opt.width && layerJobj.width(opt.width);
        opt.host.data('lj', layerJobj);
    }

    Panel.prototype.close = function () {
        this.options.host.data('lj').hide();
    };

    function Dialog(c) {
        this.opt = $.extend({
            'host': 0,
            'width': 0,
            'height': 0,
            'autoClose': false,
            'closeBtn': false
        }, c);
    }

    Dialog.uuid = 0;
    Dialog.prototype = {
        open: function () {
            var _self = this,
                opt = _self.opt,
                winDiv;
            $.block.open();
            if (!opt.winid) {
                $(document.body).append('<div class="mzdialog bRadius2" id="mzdialog' + (Dialog.uuid += 1) + '"></div>');
                winDiv = $('#' + (opt.winid = 'mzdialog' + Dialog.uuid));
                winDiv.append(opt.host);
                _self._createBtns(winDiv);
                $(window).resize({'winDiv': winDiv}, function (e) {
                    var w = e.data.winDiv.width(),
                        h = e.data.winDiv.height();
                    e.data.winDiv.css($.block.getCenterTL(w, h));
                });
            } else {
                winDiv = $('#' + opt.winid);
            }
            var style1 = {'width': opt.width, 'height': opt.height, 'zIndex': ($.block.zindex += 1), 'position': 'absolute'};
            var style2 = $.block.getCenterTL(opt.width, opt.height);
            winDiv.css(style1).css(style2).show();
        },
        _createBtns: function (winDiv) {
            var _self = this;
            if (_self.opt.closeBtn) {
                winDiv.append($('<div class="m_plugs m_Close"></div>').click(function () {
                    _self.close();
                    $.isFunction(_self.opt.closeBtn) && _self.opt.closeBtn(_self.opt.winid);
                }));
            }
        },
        _resize: function () {
            var $host = $('#' + this.opt.winid);
            var newSize = $host.find(".dialog_cnt").height() + 18;
            $host.height(newSize);
        },
        close: function () {
            $.block.close(this.opt.winid);
            $('#' + this.opt.winid).hide();
        }
    };

    $.fn.extend({
        'mzSelect': function (c) {
            c = $.extend({}, c, {host: $(this)});
            return new Select(c);
        },
        'mzPanel': function (c) {
            c = $.extend({}, c, {host: $(this)});
            return new Panel(c);
        },
        'mzDialog': function (c) {
            c = $.extend({}, c, {host: $(this)});
            return new Dialog(c);
        },
        'pager': function (c) {
            c = $.extend({}, c, {host: $(this)});
            return new Pager(c);
        }
    });

    $.block = {
        blkid: 0,
        zindex: 100,
        getVisableWH: function () {
            var w, h;
            if (/*$.browser.msie*/$.meizu.ie) {
                h = document.documentElement.clientHeight;
                w = document.documentElement.clientWidth;
            } else if (window.innerHeight) {
                h = window.innerHeight;
                w = window.innerWidth;
            } else if (document.documentElement && document.documentElement.clientHeight) {
                h = document.documentElement.clientHeight;
                w = document.documentElement.clientWidth;
            }
            return {'width': w, 'height': h};
        },
        getAllWH: function () {
            var obj = {
                'width': Math.max(document.body.clientWidth, document.documentElement.clientWidth),
                'height': Math.max(document.body.clientHeight, document.documentElement.clientHeight)
            };
            return obj;
        },
        getCenterTL: function (_w, _h) {
            var wh = this.getVisableWH(),
                sTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            return {
                'left': ( (wh.width - _w > 0 ? wh.width - _w : 1 ) / 2 + 'px' ),
                'top': ( (wh.height - _h > 0 ? wh.height - _h : 1 ) / 2 + sTop + 'px' )
            };
        },
        open: function () {
            if (!this.blkid) {
                this.blkid = 'mzBlockLayer100';
                $(document.body).append('<div id="' + this.blkid + '" class="mzBlockLayer" style="z-index:' + ($.block.zindex += 1) + ';"> </div>');
                $(window).resize(function () {
                    var wh = $.block.getAllWH();
                    $('#' + $.block.blkid).css({'height': wh.height, 'width': wh.width});
                });
            }
            var wh = this.getAllWH();
            $('#' + this.blkid).css({'height': wh.height, 'width': wh.width, 'display': 'block'})
                .mousedown(function () {
                    $.block.extraClick && $.block.extraClick.call();
                });
        },
        close: function () {
            $('#' + this.blkid).hide();
        },
        extraClick: 0
    };
    $.blockUI = function (msg) {
        $.block.open();
        var message = window.resBlockUI && window.resBlockUI.processing ? window.resBlockUI.processing : (window['G_isCht'] ? '正在處理，請稍候...' : '正在处理，请稍候..');
        message = msg ? msg : message;
        var lefttop = $.block.getCenterTL(200, 50);
        $('body').append('<div style="top:' + lefttop.top + ';left:' + lefttop.left + ';z-index:' + ($.block.zindex += 1) + ';" id="blockUICenter">' + message + '</div>');
    };
    $.unblockUI = function () {
        $.block.close();
        $('#blockUICenter').remove();
    };

    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    window['JAlertGetContent'] = function (type) {
        if (!window['JQAlert']) {
            var okT = window['G_isCht'] ? '確定' : '确定';
            $(document.body).append('<div id="mzAlertContainer" style="display:none;"/>');
            var cache = [];
            cache.push('<div id="mzAlert_alert" class="alert"><div class="part1"><div class="alert_title"/><div class="alert_message"/></div><div class="part2"><input type="button" value="' + okT + '" class="m_pureBlue_a mzBtnwh2 m_btn1"/></div></div>');
            cache.push('<div id="mzAlert_confirm" class="confirm"><div class="part1"><div class="alert_title"/><div class="alert_message"/></div><div class="part2"><input type="button" value="' + okT + '" class="m_pureBlue_a mzBtnwh2 m_btn1" name="c" style="margin-right:30px;vertical-align:middle;"/><input  name="c" type="button" value="取消" class="m_linear_a mzBtnwh2 m_btn2"/></div></div>');
            cache.push('<div id="mzAlert_prompt" class="prompt"><div class="part1"><div class="alert_title" style="padding-bottom: 40px;"/><input type="text" style="width:470px;height:36px;" name="a"/></div><div class="part2"><input type="button" value="' + okT + '" class="m_pureBlue_a mzBtnwh2 m_btn1" name="c" style="margin-right:30px;vertical-align:middle;"/><input type="button" value="取消" class="m_linear_a mzBtnwh2 m_btn2" name="c"/></div></div>');
            cache.push('<div id="mzAlert_loading" class="loading"><div class="loading_message"></div><img src="/resources/cc-manage/images/common/loading.gif" class="loading_pic" /></div>');
            $('#mzAlertContainer').append(cache.join(''));
            window['JQAlert'] = {'alert': null, 'confirm': null, 'prompt': null, 'loading': null};
            var cat = [].concat($('#mzAlert_alert').find('input[type=button]'))
                .concat($('#mzAlert_confirm').find('input[type=button]'))
                .concat($('#mzAlert_prompt').find('input[type=button]'));
            plugins.button(cat);
            /**引用plugins button初始化方法**/
            plugins.input($('#mzAlert_prompt').find('input[type=text]'));
            /**引用plugins input初始化方法**/
        }
        return $('#mzAlert_' + type);
    };
    window['jAlert'] = function (msg, title, callback) {
        var jQobj = window['JAlertGetContent']('alert');
        if (!window.JQAlert.alert) {
            window.JQAlert.alert = jQobj.mzDialog({'nohide': true, 'width': 560, 'height': 240});
            $('.m_btn1', jQobj).click(function () {
                window.JQAlert.alert.close();
                var fn = window.JQAlert.alertFn;
                fn && $.isFunction(fn) && fn();
            })
        }
        $('.alert_title', jQobj).html(title);
        $('.alert_message', jQobj).html(msg);
        window.JQAlert.alertFn = callback;
        window.JQAlert.alert.open();
    };
    window['jConfirm'] = function (msg, title, callback) {
        var jQobj = window['JAlertGetContent']('confirm');
        if (!window.JQAlert.confirm) {
            window.JQAlert.confirm = jQobj.mzDialog({'nohide': true, 'width': 560, 'height': 240});
            $('.m_btn1,.m_btn2', jQobj).click(function () {
                window.JQAlert.confirm.close();
                var fn = window.JQAlert.confirmFn;
                fn && $.isFunction(fn) && fn.call(window, $(this).hasClass('m_btn1'));
            });
        }
        $('.alert_title', jQobj).html(title);
        $('.alert_message', jQobj).html(msg);
        window.JQAlert.confirmFn = callback;
        window.JQAlert.confirm.open();
    };
    window['jPrompt'] = function (msg, value, title, callback) {
        var jQobj = window['JAlertGetContent']('prompt');
        if (!window.JQAlert.prompt) {
            window.JQAlert.prompt = jQobj.mzDialog({'nohide': true, 'width': 560, 'height': 255});
            $('.m_btn1,.m_btn2', jQobj).click(function () {
                window.JQAlert.prompt.close();
                var fn = window.JQAlert.promptFn;
                var val = $('input', jQobj).val();
                fn && $.isFunction(fn) && fn.call(window, ($(this).hasClass('m_btn1') ? val : null));
            })
        }
        $('.alert_title', jQobj).html(title);
        $('input[name=a]', jQobj).val(value);
        window.JQAlert.promptFn = callback;
        window.JQAlert.prompt.open();
    };
    window['jLoading'] = function (msg) {
        var jQobj = window['JAlertGetContent']('loading');
        if (!window.JQAlert.loading) {
            window.JQAlert.loading = jQobj.mzDialog({'nohide': true, 'width': 350, 'height': 79});
        }
        $('.loading_message', jQobj).html(msg);
        window.JQAlert.loading.open();
    };
})(jQuery);

(function ($) {
    var plugins = { fn: {} };
    plugins.button = function (ary) {
        /**button**/
        var btnAry = ary || $('input.m_pureBlue_a'),
            len = btnAry.length,
            rbtn = /m_pureBlue_a/,
            rdrap = /m_dropdown/;
        if (btnAry && len > 0) {
            for (var ele; ele = btnAry[--len];) {
                var j = $(ele),
                    name = j.attr("name") || "";
                j.hover(function () {
                    var ret = rbtn.exec(this.className);
                    if (null !== ret) {
                        $(this).addClass(ret[0] + '_over');
                    }
                },function () {
                    var ret = rbtn.exec(this.className);
                    if (null !== ret) {
                        $(this).removeClass(ret[0] + '_over');
                    }
                }).addClass('radius1');
                /**下拉三角**/
                if (rdrap.test(ele.className)) {
                    var jpa = j.wrap('<span style="position:relative;display:inline-block;"></span>').parent(),
                        h = j.height(),
                        span = $('<span class="m_plugs m_angle_down"><input type="hidden" name=' + name + ' /></span>');
                    jpa.append(span);
                }
            }
        }
        return this;
    };
    plugins.radio = function (ary) {
        var radioAry = ary || $(':radio'),
            len = radioAry.length;
        if (radioAry && len > 0) {
            for (var ele; ele = radioAry[--len];) {
                $(ele).hide().parent().prepend($('<span class="m_plugs ' + (ele.checked ? 'm_radio m_radio_check' : 'm_radio') + '">&nbsp;</span>').css('cursor', 'pointer').click(plugins.fn.radio.chose));
            }
        }
        return this;
    };
    plugins.fn.radio = {
        suit: function (dom, method) {
            var tag = dom.tagName.toLowerCase(),
                type = dom.type.toLowerCase();
            if (tag === 'input' && type === 'radio') {
                return 1;
            }
            return 0;
        },
        chose: function (dom) {
            var radio = dom.style ? dom : $(this).siblings(':radio')[0];
            var $radio = $(radio),
                span = $($radio.parent().find('span')[0]),
                name = $radio.attr("name"),
                oRadio = $(":radio[name=" + name + "]");
            oRadio.attr('checked', false).parent().find('span').removeClass('m_radio_check');
            $radio.attr('checked', true);
            span.addClass('m_radio_check');
            //可以通过绑定change事件检测单选框发生改变
            $(radio).trigger("change");
        }
    };
    plugins.checkbox = function (ary) {
        var boxAry = ary || $('input[type=checkbox]'),
            len = boxAry.length;
        if (boxAry && len > 0) {
            for (var ele; ele = boxAry[--len];) {
                $(ele).hide().parent().prepend($('<span class="m_plugs ' + (ele.checked ? 'm_checkbox m_checkbox_check' : 'm_checkbox') + '">&nbsp;</span>').css('cursor', 'pointer').click(plugins.fn.checkbox.click));
            }
        }
        return this;
    };
    plugins.fn.checkbox = {
        suit: function (dom, method) {
            var tag = dom.tagName.toLowerCase(),
                type = dom.type.toLowerCase();
            if (tag === 'input' && type === 'checkbox') {
                return 1;
            }
            return 0;
        },
        click: function () {
            var box = $(this).siblings(':checkbox')[0];
            plugins.fn.checkbox[box.checked ? 'unChose' : 'chose'](box);
            //可以通过绑定change事件检测复选框发生改变
            $(box).trigger("change");
        },
        chose: function (dom) {
            if (dom) {
                var box = $(dom),
                    span = $(box.parent().find('span')[0]);
                box.attr('checked', true);
                span.addClass('m_checkbox_check');
            }
        },
        unChose: function (dom) {
            if (dom) {
                var box = $(dom),
                    span = $(box.parent().find('span')[0]);
                box.attr('checked', false);
                span.removeClass('m_checkbox_check');
            }
        }
    };
    $.extend($.fn, {/**checkbox暴露给jQuery外部引用**/
    chose: function () {
        var ele = this.get(0);
        if (plugins.fn.checkbox.suit(ele)) {
            return plugins.fn.checkbox.chose(ele);
        } else if (plugins.fn.radio.suit(ele)) {
            return plugins.fn.radio.chose(ele);
        }
    },
        unChose: function () {
            var ele = this.get(0);
            if (plugins.fn.checkbox.suit(ele)) {
                return plugins.fn.checkbox.unChose(ele);
            }
        }
    });
    plugins.input = function (ary) {
        var inputAry = ary || $('input[type=text],input[type=password]'),
            len = inputAry.length;
        if (inputAry && len > 0) {
            for (var ele; ele = inputAry[--len];) {
                var j = $(ele),
                    cover = j.attr('cover'),
                    switchover = j.hasClass("J_switchover"),
                    w = j.width() + 7,
                    h = j.height();
                j.focus(plugins.fn.input.focus)
                    .blur(plugins.fn.input.blur)
                    .css('padding', '0 5px')
                    .wrap('<span class="radius1 m_input_a MZPluginInput" style="height:' + h + 'px; width:' + w + 'px;"></span>');
                if (/*$.browser.msie*/$.meizu.ie)
                    j.css('lineHeight', h + 'px');
                if (cover) {
                    var dirc = j.attr('cover-direction'),
                        cwidth = j.attr('cover-width') ? (j.attr('cover-width') - 0) : 120,
                        isLeft = dirc && dirc === 'left',
                        coverAry = cover.split(",");
                    j.width(w - cwidth - 10)
                        .parent()[isLeft ? 'prepend' : 'append']
                        ('<span style="cursor:default; background:#fff; border-width:0; border-' + (isLeft ? 'right' : 'left') + ':#dbdbdb solid 1px; height:' + h + 'px;width:' + (switchover ? cwidth + 25 : cwidth - 1) + 'px; display:inline-block;"></span>');
                    if (switchover) {
                        j.width(w - cwidth - 37);
                        var switchoverFn = $('<span style="display:inline-block; border-left:1px solid #dbdbdb; margin-top:-3px; vertical-align:middle; width:26px; height:' + h + '; overflow:hidden"></span>');
                        switchoverFn.append($('<a href="javascript:;" style="display:block; width:26px; height:14px; border-bottom:1px solid #b2bdc7; background:url(/resources/developer/images/register/arrow.png) no-repeat 0 0"></a>').click(plugins.fn.input.up));
                        switchoverFn.append($('<a href="javascript:;" style="display:block; width:26px; height:14px; background:url(/resources/developer/images/register/arrow.png) no-repeat 0 -15px"></a>').click(plugins.fn.input.down));
                        j.parent().children("span").append(switchoverFn);
                    }
                    j.parent().children("span").prepend('<span class="J_cover" style="display:inline-block; text-align:center; line-height:' + h + 'px; height:' + h + 'px; width:' + (cwidth - 2) + 'px;" title=' + coverAry[0] + '>' + coverAry[0] + '</span>');
                }
                if (j.attr('tail')) {
                    var twidth = j.attr('tail-width') ? j.attr('tail-width') - 0 : 50;
                    j.parent().append('<span class="m_tailspan" style="text-align:center;width:' + twidth + 'px;padding:0 10px;position:absolute;top:0px;right:0px;line-height:' + h + 'px;height:' + h + 'px;">' + j.attr('tail') + '</span>')
                } else if (j.attr('prefix')) {
                    var pwidth = j.attr('prefix-width') ? j.attr('prefix-width') - 0 : 50;
                    j.parent().append('<span class="m_prefixspan" style="text-align:center;width:' + pwidth + 'px;padding:0 0px;position:absolute;top:0px;left:0px;line-height:' + h + 'px;height:' + h + 'px;">' + j.attr('prefix') + '</span>')
                }
                if (j.attr('taillogo')) {
                    j.parent().append('<span class="J_taillogo ' + j.attr('taillogo') + '" style="text-align:center;padding:0 10px;position:absolute;top:' + (j.attr('taillogo-top') ? j.attr('taillogo-top') : "0") + 'px;right:' + (j.attr('taillogo-right') ? j.attr('taillogo-right') : "0") + 'px;"></span>')
                }
                j.parent().find('span.m_tailspan,span.m_prefixspan,span.m_calendar').click(plugins.fn.input._spanClick);
            }
        }
        return this;
    };
    plugins.fn.input = {
        _spanClick: function () {
            $(this).parent().find('input').focus().trigger('click');
        },
        focus: function () {
            var j = $(this), parent = j.parent().addClass('m_input_a_focus');
            if (j.attr('tail')) {
                parent.find('span.m_tailspan').hide();
            } else if (j.attr('prefix')) {
                parent.find('span.m_prefixspan').hide();
            }
            plugins.fn.input.hError($(this));
        },
        blur: function () {
            var j = $(this), parent = j.parent().removeClass('m_input_a_focus');
            if (j.attr('tail')) {
                if (!parent.find('input')[0].value) {
                    $(parent.find('span')[1]).show();
                }
            }
            if (!parent.find('input')[0].value) {
                if (j.attr('tail')) {
                    parent.find('span.m_tailspan').show();
                } else if (j.attr('prefix')) {
                    parent.find('span.m_prefixspan').show();
                }
            }
        },
        sError: function ($dom) {
            $dom.parents(".MZPluginInput").removeClass('m_textarea_focus').addClass('m_input_a_error');
        },
        hError: function ($dom) {
            $dom.parents(".MZPluginInput").removeClass('m_input_a_error');
        },
        notEditable: function ($dom) {
            $dom.attr("disabled", true).css({"background": "transparent", "padding": "0"}).parent().css({"border": "0", "padding": "1px"});
        },
        editable: function ($dom) {
            $dom.attr("disabled") == "disabled" && $dom.attr("disabled", false).css("padding", "0 5px").parent().css({"border": "#dbdbdb solid 1px", "padding": "0"});
        },
        up: function () {
            var $input = $(this).parents(".MZPluginInput").find("input"),
                $cover = $(this).parents(".MZPluginInput").find(".J_cover"),
                ary = $input.attr("cover").split(","),
                len = ary.length,
                coverIndex = parseInt($input.attr("cover-index")),
                currentIndex = 0;
            len == 1 ? false : true;
            coverIndex - 1 < 0 ? currentIndex = len - 1 : currentIndex = coverIndex - 1;
            $cover.attr("title", ary[currentIndex]).html(ary[currentIndex]);
            $input.attr("cover-index", currentIndex);
        },
        down: function () {
            var $input = $(this).parents(".MZPluginInput").find("input"),
                $cover = $(this).parents(".MZPluginInput").find(".J_cover"),
                ary = $input.attr("cover").split(","),
                len = ary.length,
                coverIndex = parseInt($input.attr("cover-index")),
                currentIndex = 0;
            len == 1 ? false : true;
            coverIndex + 1 == len ? currentIndex = 0 : currentIndex = coverIndex + 1;
            $cover.attr("title", ary[currentIndex]).html(ary[currentIndex]);
            $input.attr("cover-index", currentIndex);
        }
    };
    plugins.textarea = function (ary) {
        var textareaAry = ary || $('textarea'),
            len = textareaAry.length;
        if (textareaAry && len > 0) {
            for (var ele; ele = textareaAry[--len];) {
                var j = $(ele);
                j.focus(plugins.fn.textarea.focus);
                j.blur(plugins.fn.textarea.blur);
            }
        }
    };
    plugins.fn.textarea = {
        focus: function () {
            $(this).removeClass('m_textarea_error').addClass('m_textarea_focus');
        },
        blur: function () {
            $(this).removeClass('m_textarea_focus');
        },
        notEditable: function ($dom) {
            $dom.attr("disabled", true).css({"background": "transparent", "overflow": "hidden", "border": "0", "padding": "8px"});
        },
        editable: function ($dom) {
            $dom.attr("disabled") == "disabled" && $dom.attr("disabled", false).css({"border": "#dbdbdb solid 1px", "overflow": "auto", "padding": "7px"});
        },
        hError: function ($dom) {
            $dom.removeClass('m_textarea_error');
        },
        sError: function ($dom) {
            $dom.removeClass('m_textarea_focus').addClass('m_textarea_error');
        }
    };
    window.plugins = plugins;
})(jQuery);
/**
 * Created with JetBrains WebStorm.
 * User: zhouyi
 * Date: 13-9-2
 * Time: 下午4:10
 * To change this template use File | Settings | File Templates.
 */
Array.prototype.unique = function () {
    //给数组原型添加一个删除相同元素的方法
    var newArr = this;
    for (var i = newArr.length - 1; i >= 0; i--) {
        var targetNode = newArr[i];
        for (var j = 0; j < i; j++) {
            if (targetNode == newArr[j]) {
                newArr.splice(i, 1);
                break;
            }
        }
    }
    return newArr;
};
/**
 * 时间对象的格式化
 */
Date.prototype.format = function (format) {
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
var util = {
    amount: function (tableId, index) {
        //合计函数，index为需要合计的表格项目索引位置，传递参数的数据类型为数组
        if (index && typeof index == "object" && index.length > 0) {
            var amountAttr = [];
            $.each(index, function (i) {
                var unit = 0;
                $("#" + tableId + " tbody tr").each(function () {
                    unit += parseFloat($(this).find("td:eq(" + index[i] + ")").html());
                });
                amountAttr.push(unit);
            });
            $.each(index, function (i) {
                $("#" + tableId + " tfoot td:eq(" + index[i] + ")").html(amountAttr[i]);
            });
        }
    },
    magnitude: function (number) {
        //超过5位数显示万，超过9位数显示亿
        var amount = number;
        if ($.type(amount) != "string" && $.type(amount) != "number") {
            return 0;
        }
        amount = amount.toString();
        var amountArray = amount.split(".");
        if (amountArray[0].length >= 9) {
            amount = (parseInt(amount) / 100000000).toFixed(1) + "<span style='font-size:0.3em'>亿</span>";
        } else if (amountArray[0].length >= 5) {
            amount = (parseInt(amount) / 10000).toFixed(1) + "<span style='font-size:0.3em'>万</span>";
        }
        return amount;
    },
    dateInterval: function () {
        //计算日期间隔函数，返回值为当前日期和前一个月的日期
        var dateInterval = {},
            dateArray = [],
            beforeDateArray = [],
            nowDateArray = [],
            nowDate = new Date(),
            commonTear = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"],
            leapYear = ["31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
        dateArray.push(nowDate.getFullYear());
        dateArray.push(nowDate.getMonth());
        dateArray.push(nowDate.getDate());
        for (var i = 0; i < dateArray.length; i++) {
            dateArray[i] = dateArray[i].toString();
            nowDateArray.push(dateArray[i]);
            beforeDateArray.push(dateArray[i]);
        }
        if (beforeDateArray[1] == "0") {
            beforeDateArray[0] = (parseInt(beforeDateArray[0]) - 1).toString();
            beforeDateArray[1] = "12";
        }
        if (dateArray[2] == 29 || dateArray[2] == 30 || dateArray[2] == 31) {
            var actualDay = (parseInt(beforeDateArray[0]) % 4 == 0) ? leapYear : commonTear;
            (dateArray[2] > parseInt(actualDay[(dateArray[1] - 1)])) && (beforeDateArray[2] = actualDay[(dateArray[1] - 1)])
        }
        (beforeDateArray[2].length < 2) && (beforeDateArray[2] = "0" + beforeDateArray[2]);
        (beforeDateArray[1].length < 2) && (beforeDateArray[1] = "0" + beforeDateArray[1]);
        (nowDateArray[2].length < 2) && (nowDateArray[2] = "0" + nowDateArray[2]);
        (nowDateArray[1].length < 2) && (nowDateArray[1] = "0" + (nowDateArray[1] = (nowDateArray[1] = parseInt(nowDateArray[1]) + 1)));
        dateInterval.beforeDate = beforeDateArray.join('-');
        dateInterval.todayDate = nowDateArray.join('-');
        return dateInterval;
    }
};

/**
 * Created by zhouyi on 14-3-6.
 */
/** *logined fly&&me dropdown menu* */
function w_app_loaded() {
    var $flyme = $('#w_flyme'), fw = $flyme.width(), xlen = fw > 138 ? fw - 138
        : fw - 18;
    $flyme.mouseover(function () {
        $(this).trigger('click');
    }).mzSelect({
        "click": function (e) {
            window.location.href = e.value;
        },
        "data": [
            {
                'value': '/console/account/info',
                'text': '账户管理'
            },
            {
                'value': ('/logout?useruri=' + encodeURIComponent(window.location.href)),
                'text': '退出'
            }
        ],
        "pos": 'down',
        "itemChk": null,
        'xlen': xlen,
        'ylen': 10
    });
    var $notify = $('#w_notify'), notifyHtml, notifyData = [], notify = {}, uid = $('#mz_flyme').val(), cid = $('#mz_developer').val();
    if (uid && cid) {
        $.get("/console/message/ls", function (data) {
            if (data.code == 200) {
                var result = data.value.data;
                notify.data = notifyData = result;
                var dataLen = result.length, $tooltips = $("#tooltips");
                for (var i = 0; i < dataLen; i++) {
                    var content = result[i].content.trim();
                    var index = result[i].content.indexOf("+");
                    notifyData[i].value = result[i].id;
                    notifyData[i].name = content.substring(0, index);
                    notifyData[i].content = content.substring(index + 1);
                }
                $tooltips && $tooltips.html(dataLen);
                notifyHtml = $("#notifyTemplate").tmpl(notify);
                if (dataLen > 0) {
                    $notify.mzSelect({
                        /* 调用下拉框组件 */
                        "click": function (e) {
                            window.location.href = e.value;
                        },
                        "data": notifyHtml,
                        "dataIsHtml": true,
                        "itemChk": null,
                        "pos": 'down',
                        "width": 216,
                        'xlen': xlen,
                        'ylen': 10,
                        'extraId': "notifyScrollWrap"
                    });
                }
            }
        });
        $("#noPrompt").live("click", function () {
            $.get("/console/message/hide", function (data) {
                var result = data.value && data.value.data;
                if (result && data.code == 200) {
                    notify.data = notifyData = result;
                    var dataLen = result.length, $tooltips = $("#tooltips");
                    for (var i = 0; i < dataLen; i++) {
                        var content = result[i].content.trim();
                        var index = result[i].content.indexOf("+");
                        notifyData[i].value = result[i].id;
                        notifyData[i].name = content.substring(0, index);
                        notifyData[i].content = content.substring(index + 1);
                    }
                    $tooltips && $tooltips.html(dataLen);
                    notifyHtml = $("#notifyTemplate").tmpl(notify);
                    if (dataLen > 0) {
                        $notify.mzSelect({
                            // 调用下拉框组件
                            "click": function (e) {
                                window.location.href = e.value;
                            },
                            "data": notifyHtml,
                            isModify: true,
                            "dataIsHtml": true,
                            "itemChk": null,
                            "pos": 'down',
                            "width": 216,
                            'xlen': xlen,
                            'ylen': 10,
                            'extraId': "notifyScrollWrap"
                        });
                    }
                    else {
                        $notify.unbind("click").data("lj").remove();
                    }
                }
            });
        });
    }
}
$(function () {
    plugins.button().radio().checkbox().input().textarea();
    var $flymeInput = $('#mz_flyme')[0];
    $flymeInput && w_app_loaded();
    $('.menu_row').click(function () {
        var j = $(this), angle = $(j.find('.menu_angle')[0]), content = $('#'
            + this.id + '_content');
        if (angle.hasClass('menu_angle_down')) {
            content.hide();
            angle.removeClass('menu_angle_down');
            j.removeClass('menu_selected');
        } else {
            content.show();
            angle.addClass('menu_angle_down');
            j.addClass('menu_selected');
        }
        if($('#menu_li_4').hasClass('menu_selected')){
            if($('#menu_li_4').hasClass('menu_selected')){
                $('#menu_li_2').addClass('menu_selected');
                $('#menu_li_2_content').show();
                $('#menu_li_2 .menu_angle').addClass('menu_angle_down');
            }
            else{
                $('#menu_li_2').removeClass('menu_selected');
                $('#menu_li_2_content').hide();
                $('#menu_li_2 .menu_angle').addClass('menu_angle_down');
            }
        }

    });

    var selected = $('.menu_level2 a.selected')[0];
    if (selected) {
        var id = $(selected).parent().parent().parent()[0].id.replace(/_content/, '');
        $('#' + id).trigger('click');
    }

    var fault = {
        'cause': '所提供的身份证号码与上传证件号码不吻合。'
    };
    var $faultTemplate = $("#faultTemplate");
    var $content = $faultTemplate[0] && $faultTemplate.tmpl(fault);
    window.tips = $content && $content.mzDialog({
        'width': 400,
        'height': 250,
        'closeBtn': $.noop
    });

    // window.tips.open();
    plugins.button($(":button,:submit"));
    $(".J_modify,.J_cancel", $content).click(function () {
        window.tips.close();
        if ($(this).attr("id") == "m_btn2") {
            alert("点击了修改按钮");
            // 按修改按钮的结果
        }
    });


    //three_menu
    $('#three_menu').click(function(){
        if($('#menu_li_4').hasClass('menu_selected')){
            $('#menu_li_2').addClass('menu_selected');
            $('#menu_li_2_content').css('display','block');
            $('#menu_li_2 . menu_angle').addClass('menu_angle_down');
        }
        else{
            $('#menu_li_2').removeClass('menu_selected');
            $('#menu_li_2_content').css('display','none');
            $('#menu_li_2 . menu_angle').removeClass('menu_angle_down');
        }
    });

});

