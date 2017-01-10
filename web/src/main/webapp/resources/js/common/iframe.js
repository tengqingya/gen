var dataIframe = {
		"openIframe" : function(url){
			var iframe = '<iframe class="open-frame"  src="'
				+ url
				+ '" frameborder="0" framespacing="0" scrolling="no" onload="dataIframe.resizeIframe(this)" ></iframe>';
			var iframes = $('iframe', window.top.frames['contentFrame'].document);
			if (iframes.length > 0) {
				iframes.last().hide().after(iframe);
			} else {
				$('body', window.top.frames['contentFrame'].document).hide().after( iframe);
			}
		},
		
		"closeIframe" : function(){
			var iframes = $('iframe', window.top.frames['contentFrame'].document);
			if( iframes.length <= 1 ){
				// 只有一个iframe
				$('body', window.top.frames['contentFrame'].document).show();
			}
			else{
				// 多个iframe，显示前一个iframe
				$( iframes[iframes.length-2] ).show();
			}
			iframes.last().remove();
		},
		
		"resizeIframe" : function(iframe){
			iframe.style.height = "100%";
		},
		
		"resizeIframeParent" : function(iframe){
//			console.log(  iframe.contentWindow.document.body.scrollHeight );
//			console.log(  iframe.contentWindow.document.body.scrollHeight + 100 );
//			window.top.frames['contentFrame'].window.innerHeight = iframe.contentWindow.document.body.scrollHeight + "px" ;
//			console.log( "contentFrame height==>" + $( window.top.frames['contentFrame'].document ).height() );
		}
}