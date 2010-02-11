var APE={Config:{identifier:"ape",init:true,frequency:0,scripts:[]},Client:function(a){if(a){this.core=a}}};APE.Client.prototype.eventProxy=[];APE.Client.prototype.fireEvent=function(c,b,a){this.core.fireEvent(c,b,a)};APE.Client.prototype.addEvent=function(d,c,a){var e=c.bind(this),b=this;if(this.core==undefined){this.eventProxy.push([d,c,a])}else{var b=this.core.addEvent(d,e,a);this.core.$originalEvents[d]=this.core.$originalEvents[d]||[];this.core.$originalEvents[d][c]=e}return b};APE.Client.prototype.removeEvent=function(b,a){return this.core.removeEvent(b,a)};APE.Client.prototype.onRaw=function(c,b,a){this.addEvent("raw_"+c.toLowerCase(),b,a)};APE.Client.prototype.onCmd=function(c,b,a){this.addEvent("cmd_"+c.toLowerCase(),b,a)};APE.Client.prototype.onError=function(c,b,a){this.addEvent("error_"+c,b,a)};APE.Client.prototype.cookie={};APE.Client.prototype.cookie.write=function(a,b){document.cookie=a+"="+encodeURIComponent(b)+"; domain="+document.domain};APE.Client.prototype.cookie.read=function(b){var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return decodeURIComponent(f.substring(e.length,f.length))}}return null};APE.Client.prototype.load=function(config){config=config||{};config.transport=config.transport||APE.Config.transport||0;config.frequency=config.frequency||0;config.domain=config.domain||APE.Config.domain||document.domain;config.scripts=config.scripts||APE.Config.scripts;config.server=config.server||APE.Config.server;config.secure=config.sercure||APE.Config.secure;config.init=function(core){this.core=core;for(var i=0;i<this.eventProxy.length;i++){this.addEvent.apply(this,this.eventProxy[i])}}.bind(this);if(config.transport!=2){if(config.domain!="auto"){document.domain=config.domain}if(config.domain=="auto"){document.domain=document.domain}}var cookie=this.cookie.read("APE_Cookie");var tmp=eval("("+cookie+")");if(tmp){config.frequency=tmp.frequency+1}else{cookie='{"frequency":0}'}var reg=new RegExp('"frequency":([ 0-9]+)',"g");cookie=cookie.replace(reg,'"frequency":'+config.frequency);this.cookie.write("APE_Cookie",cookie);var iframe=document.createElement("iframe");iframe.setAttribute("id","ape_"+config.identifier);iframe.style.display="none";iframe.style.position="absolute";iframe.style.left="-300px";iframe.style.top="-300px";document.body.appendChild(iframe);if(config.transport==2){var doc=iframe.contentDocument;if(!doc){doc=iframe.contentWindow.document}doc.open();var theHtml="<html><head></head>";for(var i=0;i<config.scripts.length;i++){theHtml+='<script src="'+config.scripts[i]+'"><\/script>'}theHtml+="<body></body></html>";doc.write(theHtml);doc.close()}else{iframe.setAttribute("src",(config.secure?"https":"http")+"://"+config.frequency+"."+config.server+'/?[{"cmd":"script","params":{"domain":"'+document.domain+'","scripts":["'+config.scripts.join('","')+'"]}}]');if(navigator.product=="Gecko"){iframe.contentWindow.location.href=iframe.getAttribute("src")}}iframe.onload=function(){if(!iframe.contentWindow.APE){setTimeout(iframe.onload,100)}else{iframe.contentWindow.APE.init(config)}}};if(Function.prototype.bind==null){Function.prototype.bind=function(b,a){return this.create({bind:b,"arguments":a})}}if(Function.prototype.create==null){Function.prototype.create=function(b){var a=this;b=b||{};return function(){var c=b.arguments||arguments;if(c&&!c.length){c=[c]}var d=function(){return a.apply(b.bind||null,c)};return d()}}};
/***
 * APE JSF Setup
 */

APE.Config.baseUrl = 'http://local.ape-project.org/ape-jsf'; //APE JSF 
APE.Config.domain = 'auto'; 
APE.Config.server = 'ape.local.ape-project.org:6969'; //APE server URL

(function(){
	for (var i = 0; i < arguments.length; i++)
		APE.Config.scripts.push(APE.Config.baseUrl + '/Source/' + arguments[i] + '.js');
})('mootools-core', 'Core/APE', 'Core/Events', 'Core/Core', 'Pipe/Pipe', 'Pipe/PipeProxy', 'Pipe/PipeMulti', 'Pipe/PipeSingle', 'Request/Request','Request/Request.Stack', 'Request/Request.CycledStack', 'Transport/Transport.longPolling','Transport/Transport.SSE', 'Transport/Transport.XHRStreaming', 'Transport/Transport.JSONP', 'Transport/Transport.WebSocket', 'Core/Utility', 'Core/JSON');
APE.Config.scripts.push(APE.Config.baseUrl + '/Plugins/Debug/Client/Plugins/Debug.js');
