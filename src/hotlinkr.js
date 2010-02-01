/* 
	hotlinkr 
	Version: 0.1
	Copyright 2009 Josh Bush (digitalbush.com)	
	Licensed under the MIT license (http://github.com/digitalBush/hotlinkr/raw/master/LICENSE)
	
	If you are reading this because you were hotlinking to a script hoted on another site, then shame on you.  
	Please go get the script you need and host it from your own server using you own bandwidth.
	
	If you're not sure why what you're doing is wrong, please visit http://altlab.com/hotlinking.html
*/

(function(type,url) {
	var body=null;

	function doTags(tag,fn){
		var elms=document.getElementsByTagName(tag);
		for (var i = -1, len = elms.length; ++i < len; )
			fn.call(elms[i]);		
	}
	
	function moveBody(x,y){
		body.style.marginLeft=(parseInt(body.style.marginLeft||0)+x)+"px";
		body.style.marginTop=(parseInt(body.style.marginTop||0)+y)+"px";
	}
	
	function randomDirection(){
		return new Date().getUTCMilliseconds()%2 == 0 ? -1 : 1;
	}
	
	var isIE=(/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent));
		
	var types={
		random:function(){
			var seed=[];
			for(var key in types){
				if(key!='random' && types.hasOwnProperty(key))
					seed.push(key);				
			}

			var index=Math.floor(Math.random() * seed.length);
			if(typeof(console) !== 'undefined' && typeof(console.log) !== 'undefined')
				console.log("hotlinkr >> type = " + seed[index]);

			types[seed[index]]();
		},
		alert:function(){alert("Hotlinking is bad.  Please stop hotlinking to "+url);},
		redirect: function(){window.location.href="http://"+url;},
		link:function(){doTags("a",function(){this.href="http://"+url;});},
		hide:function(){body.style.display="none";},
		banner:function(){
			var banner=document.createElement("div");
			banner.setAttribute("style","position:absolute;top:0;left:0;width:100%;height:100px;border:1px solid #f00;line-height:100px;text-align:center;color:#f00;background:#fff");
			banner.innerText="Script Hosting provided courtesy of "+url+"<br/>To remove this message, please host scripts from "+url+" on your own server.";		
			body.appendChild(banner);
			body.style.paddingTop="100px";
		},
		cornify:function(){
			var s=document.createElement('script');
			s.src='http://cornify.com/js/cornify.js';
			body.appendChild(s);
			
			setInterval(function(){cornify_add();},5000);
		},
		translate:function(){
			window.location.href="http://translate.google.com/translate?tl=sw&u="+window.location.href;
		},
		pad:function(){doTags("div",function(){this.style.padding="300px";});},
		title:function(){document.title=url+" is my daddy!"},
		hasselhoff:function(){doTags("img",function(){this.src="http://farm1.static.flickr.com/54/127503978_0c1a5a0f4b_t.jpg"})},
		overlay:function(){
			var overlay=document.createElement("div");
			overlay.setAttribute("style",'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000;background-image:url(foo.jpg);');			
			body.appendChild(overlay);
		},
		flip:function(){
			if( !isIE ) {
				body.setAttribute('style',body.getAttribute('style') + ";-moz-transform: scaleY(-1);-webkit-transform: scaleY(-1);transform: scaleY(-1);");
			} else {
				doTags("img",function() {this.setAttribute('style', this.getAttribute('style') + ";filter: FlipV;");});
			}
		},
		fail:function() {
			window.location.href = "http://farm4.static.flickr.com/3102/2780516431_28b7d23cfc.jpg";
		},
		move:function(){
			var v = randomDirection();
			setInterval( function() { moveBody(v,v); }, 10);
		},
		spaz:function(){
			setInterval( function() { var v = randomDirection(); moveBody(v,v);}, 1);
		},
		vroomvroom: function() {
			var vroomFrame = document.createElement("iframe");
			vroomFrame.src = "http://www.youtube.com/watch?v=H-7XoDP5VVI";
			vroomFrame.height=1;
			vroomFrame.width=1;
			body.appendChild(vroomFrame);
		},
		rickroll: function() {
			var rrFrame = document.createElement("iframe");
			rrFrame.src = "http://www.youtube.com/v/oHg5SJYRHA0&hl=en_US&fs=1&autoplay=1";
			rrFrame.height=344;
			rrFrame.width=425;
			body.appendChild(rrFrame);
		}
	};
		
	(window.addEventListener || window.attachEvent)(isIE?"onload":"load",function(){
		body=document.body;
		types[type]();
	}, false);
})("random","digitalbush.com");