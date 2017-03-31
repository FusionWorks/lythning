var requirejs,require,define;!function(global,setTimeout){function commentReplace(e,t){return t||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var r;for(r=0;r<e.length&&(!e[r]||!t(e[r],r,e));r+=1);}}function eachReverse(e,t){if(e){var r;for(r=e.length-1;r>-1&&(!e[r]||!t(e[r],r,e));r-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var r;for(r in e)if(hasProp(e,r)&&t(e[r],r))break}function mixin(e,t,r,i){return t&&eachProp(t,function(t,n){!r&&hasProp(e,n)||(!i||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,r,i)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,r,i){var n=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=i,r&&(n.originalError=r),n}function newContext(e){function t(e){var t,r;for(t=0;t<e.length;t++)if("."===(r=e[t]))e.splice(t,1),t-=1;else if(".."===r){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}function r(e,r,i){var n,a,o,s,u,c,p,f,d,l,h,m,g=r&&r.split("/"),v=E.map,b=v&&v["*"];if(e&&(e=e.split("/"),p=e.length-1,E.nodeIdCompat&&jsSuffixRegExp.test(e[p])&&(e[p]=e[p].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&g&&(m=g.slice(0,g.length-1),e=m.concat(e)),t(e),e=e.join("/")),i&&v&&(g||b)){o=e.split("/");e:for(s=o.length;s>0;s-=1){if(c=o.slice(0,s).join("/"),g)for(u=g.length;u>0;u-=1)if((a=getOwn(v,g.slice(0,u).join("/")))&&(a=getOwn(a,c))){f=a,d=s;break e}!l&&b&&getOwn(b,c)&&(l=getOwn(b,c),h=s)}!f&&l&&(f=l,d=h),f&&(o.splice(0,d,f),e=o.join("/"))}return n=getOwn(E.pkgs,e),n?n:e}function i(e){isBrowser&&each(scripts(),function(t){if(t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===y.contextName)return t.parentNode.removeChild(t),!0})}function n(e){var t=getOwn(E.paths,e);if(t&&isArray(t)&&t.length>1)return t.shift(),y.require.undef(e),y.makeRequire(null,{skipMap:!0})([e]),!0}function a(e){var t,r=e?e.indexOf("!"):-1;return r>-1&&(t=e.substring(0,r),e=e.substring(r+1,e.length)),[t,e]}function o(e,t,i,n){var o,s,u,c,p=null,f=t?t.name:null,d=e,l=!0,h="";return e||(l=!1,e="_@r"+(T+=1)),c=a(e),p=c[0],e=c[1],p&&(p=r(p,f,n),s=getOwn(j,p)),e&&(p?h=i?e:s&&s.normalize?s.normalize(e,function(e){return r(e,f,n)}):e.indexOf("!")===-1?r(e,f,n):e:(h=r(e,f,n),c=a(h),p=c[0],h=c[1],i=!0,o=y.nameToUrl(h))),u=!p||s||i?"":"_unnormalized"+(R+=1),{prefix:p,name:h,parentMap:t,unnormalized:!!u,url:o,originalName:d,isDefine:l,id:(p?p+"!"+h:h)+u}}function s(e){var t=e.id,r=getOwn(S,t);return r||(r=S[t]=new y.Module(e)),r}function u(e,t,r){var i=e.id,n=getOwn(S,i);!hasProp(j,i)||n&&!n.defineEmitComplete?(n=s(e),n.error&&"error"===t?r(n.error):n.on(t,r)):"defined"===t&&r(j[i])}function c(e,t){var r=e.requireModules,i=!1;t?t(e):(each(r,function(t){var r=getOwn(S,t);r&&(r.error=e,r.events.error&&(i=!0,r.emit("error",e)))}),i||req.onError(e))}function p(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(y.defQueueMap[t]=!0),O.push(e)}),globalDefQueue=[])}function f(e){delete S[e],delete k[e]}function d(e,t,r){var i=e.map.id;e.error?e.emit("error",e.error):(t[i]=!0,each(e.depMaps,function(i,n){var a=i.id,o=getOwn(S,a);!o||e.depMatched[n]||r[a]||(getOwn(t,a)?(e.defineDep(n,j[a]),e.check()):d(o,t,r))}),r[i]=!0)}function l(){var e,t,r=1e3*E.waitSeconds,a=r&&y.startTime+r<(new Date).getTime(),o=[],s=[],u=!1,p=!0;if(!b){if(b=!0,eachProp(k,function(e){var r=e.map,c=r.id;if(e.enabled&&(r.isDefine||s.push(e),!e.error))if(!e.inited&&a)n(c)?(t=!0,u=!0):(o.push(c),i(c));else if(!e.inited&&e.fetched&&r.isDefine&&(u=!0,!r.prefix))return p=!1}),a&&o.length)return e=makeError("timeout","Load timeout for modules: "+o,null,o),e.contextName=y.contextName,c(e);p&&each(s,function(e){d(e,{},{})}),a&&!t||!u||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,l()},50)),b=!1}}function h(e){hasProp(j,e[0])||s(o(e[0],null,!0)).init(e[1],e[2])}function m(e,t,r,i){e.detachEvent&&!isOpera?i&&e.detachEvent(i,t):e.removeEventListener(r,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,y.onScriptLoad,"load","onreadystatechange"),m(t,y.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e;for(p();O.length;){if(e=O.shift(),null===e[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));h(e)}y.defQueueMap={}}var b,x,y,q,w,E={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},S={},k={},M={},O=[],j={},A={},P={},T=1,R=1;return q={require:function(e){return e.require?e.require:e.require=y.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?j[e.map.id]=e.exports:e.exports=j[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(E.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},x=function(e){this.events=getOwn(M,e.id)||{},this.map=e,this.shim=getOwn(E.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},x.prototype={init:function(e,t,r,i){i=i||{},this.inited||(this.factory=t,r?this.on("error",r):this.events.error&&(r=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=r,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,y.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();y.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;A[e]||(A[e]=!0,y.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,r=this.map.id,i=this.depExports,n=this.exports,a=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(a)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{n=y.execCb(r,a,i,n)}catch(t){e=t}else n=y.execCb(r,a,i,n);if(this.map.isDefine&&void 0===n&&(t=this.module,t?n=t.exports:this.usingExports&&(n=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e)}else n=a;if(this.exports=n,this.map.isDefine&&!this.ignore&&(j[r]=n,req.onResourceLoad)){var o=[];each(this.depMaps,function(e){o.push(e.normalizedMap||e)}),req.onResourceLoad(y,this.map,o)}f(r),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(y.defQueueMap,r)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,i=o(e.prefix);this.depMaps.push(i),u(i,"defined",bind(this,function(i){var n,a,p,d=getOwn(P,this.map.id),l=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,m=y.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(i.normalize&&(l=i.normalize(l,function(e){return r(e,h,!0)})||""),a=o(e.prefix+"!"+l,this.map.parentMap,!0),u(a,"defined",bind(this,function(e){this.map.normalizedMap=a,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),void((p=getOwn(S,a.id))&&(this.depMaps.push(a),this.events.error&&p.on("error",bind(this,function(e){this.emit("error",e)})),p.enable()))):d?(this.map.url=y.nameToUrl(d),void this.load()):(n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),n.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(S,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&f(e.map.id)}),c(e)}),n.fromText=bind(this,function(r,i){var a=e.name,u=o(a),p=useInteractive;i&&(r=i),p&&(useInteractive=!1),s(u),hasProp(E.config,t)&&(E.config[a]=E.config[t]);try{req.exec(r)}catch(e){return c(makeError("fromtexteval","fromText eval for "+t+" failed: "+e,e,[t]))}p&&(useInteractive=!0),this.depMaps.push(u),y.completeLoad(a),m([a],n)}),void i.load(e.name,m,n,E))})),y.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){k[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var r,i,n;if("string"==typeof e){if(e=o(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(q,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,u(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?u(e,"error",bind(this,this.errback)):this.events.error&&u(e,"error",bind(this,function(e){this.emit("error",e)}))}r=e.id,i=S[r],hasProp(q,r)||!i||i.enabled||y.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(S,e.id);t&&!t.enabled&&y.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var r=this.events[e];r||(r=this.events[e]=[]),r.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},y={config:E,contextName:e,registry:S,defined:j,urlFetched:A,defQueue:O,defQueueMap:{},Module:x,makeModuleMap:o,nextTick:req.nextTick,onError:c,configure:function(e){if(e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs){var t=e.urlArgs;e.urlArgs=function(e,r){return(r.indexOf("?")===-1?"?":"&")+t}}var r=E.shim,i={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){i[t]?(E[t]||(E[t]={}),mixin(E[t],e,!0,!0)):E[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(P[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=y.makeShimExports(e)),r[t]=e}),E.shim=r),e.packages&&each(e.packages,function(e){var t,r;e="string"==typeof e?{name:e}:e,r=e.name,t=e.location,t&&(E.paths[r]=e.location),E.pkgs[r]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(S,function(e,t){e.inited||e.map.unnormalized||(e.map=o(t,null,!0))}),(e.deps||e.callback)&&y.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,n){function a(r,i,u){var p,f,d;return n.enableBuildCallback&&i&&isFunction(i)&&(i.__requireJsBuild=!0),"string"==typeof r?isFunction(i)?c(makeError("requireargs","Invalid require call"),u):t&&hasProp(q,r)?q[r](S[t.id]):req.get?req.get(y,r,t,a):(f=o(r,t,!1,!0),p=f.id,hasProp(j,p)?j[p]:c(makeError("notloaded",'Module name "'+p+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),y.nextTick(function(){v(),d=s(o(null,t)),d.skipMap=n.skipMap,d.init(r,i,u,{enabled:!0}),l()}),a)}return n=n||{},mixin(a,{isBrowser:isBrowser,toUrl:function(e){var i,n=e.lastIndexOf("."),a=e.split("/")[0],o="."===a||".."===a;return n!==-1&&(!o||n>1)&&(i=e.substring(n,e.length),e=e.substring(0,n)),y.nameToUrl(r(e,t&&t.id,!0),i,!0)},defined:function(e){return hasProp(j,o(e,t,!1,!0).id)},specified:function(e){return e=o(e,t,!1,!0).id,hasProp(j,e)||hasProp(S,e)}}),t||(a.undef=function(e){p();var r=o(e,t,!0),n=getOwn(S,e);n.undefed=!0,i(e),delete j[e],delete A[r.url],delete M[e],eachReverse(O,function(t,r){t[0]===e&&O.splice(r,1)}),delete y.defQueueMap[e],n&&(n.events.defined&&(M[e]=n.events),f(e))}),a},enable:function(e){getOwn(S,e.id)&&s(e).enable()},completeLoad:function(e){var t,r,i,a=getOwn(E.shim,e)||{},o=a.exports;for(p();O.length;){if(r=O.shift(),null===r[0]){if(r[0]=e,t)break;t=!0}else r[0]===e&&(t=!0);h(r)}if(y.defQueueMap={},i=getOwn(S,e),!t&&!hasProp(j,e)&&i&&!i.inited){if(!(!E.enforceDefine||o&&getGlobal(o)))return n(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]));h([e,a.deps||[],a.exportsFn])}l()},nameToUrl:function(e,t,r){var i,n,a,o,s,u,c,p=getOwn(E.pkgs,e);if(p&&(e=p),c=getOwn(P,e))return y.nameToUrl(c,t,r);if(req.jsExtRegExp.test(e))s=e+(t||"");else{for(i=E.paths,n=e.split("/"),a=n.length;a>0;a-=1)if(o=n.slice(0,a).join("/"),u=getOwn(i,o)){isArray(u)&&(u=u[0]),n.splice(0,a,u);break}s=n.join("/"),s+=t||(/^data\:|^blob\:|\?/.test(s)||r?"":".js"),s=("/"===s.charAt(0)||s.match(/^[\w\+\.\-]+:/)?"":E.baseUrl)+s}return E.urlArgs&&!/^blob\:/.test(s)?s+E.urlArgs(e,s):s},load:function(e,t){req.load(y,e,t)},execCb:function(e,t,r,i){return t.apply(i,r)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);y.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);if(!n(t.id)){var r=[];return eachProp(S,function(e,i){0!==i.indexOf("_@r")&&each(e.depMaps,function(e){if(e.id===t.id)return r.push(i),!0})}),c(makeError("scripterror",'Script error for "'+t.id+(r.length?'", needed by: '+r.join(", "):'"'),e,[t.id]))}}},y.require=y.makeRequire(),y}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.3",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(void 0!==requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,r,i){var n,a,o="_";return isArray(e)||"string"==typeof e||(a=e,isArray(t)?(e=t,t=r,r=i):e=[]),a&&a.context&&(o=a.context),n=getOwn(contexts,o),n||(n=contexts[o]=req.s.newContext(o)),a&&n.configure(a),n.require(e,t,r)},req.config=function(e){return req(e)},req.nextTick=void 0!==setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version="2.3.3",req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts._;return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],(baseElement=document.getElementsByTagName("base")[0])&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,r){var i=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return i.type=e.scriptType||"text/javascript",i.charset="utf-8",i.async=!0,i},req.load=function(e,t,r){var i,n=e&&e.config||{};if(isBrowser)return i=req.createNode(n,t,r),i.setAttribute("data-requirecontext",e.contextName),i.setAttribute("data-requiremodule",t),!i.attachEvent||i.attachEvent.toString&&i.attachEvent.toString().indexOf("[native code")<0||isOpera?(i.addEventListener("load",e.onScriptLoad,!1),i.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,i.attachEvent("onreadystatechange",e.onScriptLoad)),i.src=r,n.onNodeCreated&&n.onNodeCreated(i,n,t,r),currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i;if(isWebWorker)try{setTimeout(function(){},0),importScripts(r),e.completeLoad(t)}catch(i){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+r,i,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){if(head||(head=e.parentNode),dataMain=e.getAttribute("data-main"))return mainScript=dataMain,cfg.baseUrl||mainScript.indexOf("!")!==-1||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(e,t,r){var i,n;"string"!=typeof e&&(r=t,t=e,e=null),isArray(t)||(r=t,t=null),!t&&isFunction(r)&&(t=[],r.length&&(r.toString().replace(/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,commentReplace).replace(/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,function(e,r){t.push(r)}),t=(1===r.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(i=currentlyAddingScript||getInteractiveScript())&&(e||(e=i.getAttribute("data-requiremodule")),n=contexts[i.getAttribute("data-requirecontext")]),n?(n.defQueue.push([e,t,r]),n.defQueueMap[e]=!0):globalDefQueue.push([e,t,r])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this,"undefined"==typeof setTimeout?void 0:setTimeout);var pug={has_own_property:Object.prototype.hasOwnProperty,match_html:/["&<>]/,merge:function(e,t){if(1===arguments.length){for(var r=e[0],i=1;i<e.length;i++)r=pug.merge(r,e[i]);return r}for(var n in t)if("class"===n){var a=e[n]||[];e[n]=(Array.isArray(a)?a:[a]).concat(t[n]||[])}else if("style"===n){var a=pug.style(e[n]),o=pug.style(t[n]);e[n]=a+o}else e[n]=t[n];return e},classes_array:function(e,t){for(var r,i="",n="",a=Array.isArray(t),o=0;o<e.length;o++)(r=pug.classes(e[o]))&&(a&&t[o]&&(r=pug.escape(r)),i=i+n+r,n=" ");return i},classes_object:function(e){var t="",r="";for(var i in e)i&&e[i]&&pug.has_own_property.call(e,i)&&(t=t+r+i,r=" ");return t},classes:function(e,t){return Array.isArray(e)?pug.classes_array(e,t):e&&"object"==typeof e?pug.classes_object(e):e||""},style:function(e){if(!e)return"";if("object"==typeof e){var t="";for(var r in e)pug.has_own_property.call(e,r)&&(t=t+r+":"+e[r]+";");return t}return e+="",";"!==e[e.length-1]?e+";":e},attr:function(e,t,r,i){return t!==!1&&null!=t&&(t||"class"!==e&&"style"!==e)?t===!0?" "+(i?e:e+'="'+e+'"'):("function"==typeof t.toJSON&&(t=t.toJSON()),"string"==typeof t||(t=JSON.stringify(t),r||t.indexOf('"')===-1)?(r&&(t=pug.escape(t))," "+e+'="'+t+'"'):" "+e+"='"+t.replace(/'/g,"&#39;")+"'"):""},attrs:function(e,t){var r="";for(var i in e)if(pug.has_own_property.call(e,i)){var n=e[i];if("class"===i){n=pug.classes(n),r=pug.attr(i,n,!1,t)+r;continue}"style"===i&&(n=pug.style(n)),r+=pug.attr(i,n,!1,t)}return r},escape:function(e){var t=""+e,r=pug.match_html.exec(t);if(!r)return e;var i,n,a,o="";for(i=r.index,n=0;i<t.length;i++){switch(t.charCodeAt(i)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}n!==i&&(o+=t.substring(n,i)),n=i+1,o+=a}return n!==i?o+t.substring(n,i):o},rethrow:function(e,t,r,i){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||i))throw e.message+=" on line "+r,e;try{i=i||require("fs").readFileSync(t,"utf8")}catch(t){pug.rethrow(e,null,r)}var n=3,a=i.split("\n"),o=Math.max(r-n,0),s=Math.min(a.length,r+n),n=a.slice(o,s).map(function(e,t){var i=t+o+1;return(i==r?"  > ":"    ")+i+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+r+"\n"+n+"\n\n"+e.message,e}};