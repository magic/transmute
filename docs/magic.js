"use strict";function b(a){return s(a)||c(a)||n(a)||m()}function c(a){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a))return Array.from(a)}function d(a,b){if(null==a)return{};var c,d,f=e(a,b);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(a);for(d=0;d<g.length;d++)c=g[d],0<=b.indexOf(c)||Object.prototype.propertyIsEnumerable.call(a,c)&&(f[c]=a[c])}return f}function e(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}function f(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function j(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?f(Object(b),!0).forEach(function(c){k(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):f(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function k(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function l(a,b){return s(a)||r(a,b)||n(a,b)||m()}function m(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(a,b){if(a){if("string"==typeof a)return q(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?q(a,b):void 0}}function q(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function r(a,b){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a)){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}}function s(a){if(Array.isArray(a))return a}function t(a){"@babel/helpers - typeof";return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},t(a)}var u=function(){var a=2,b=3,c={},d=[],e=d.map,f=Array.isArray,g="undefined"==typeof requestAnimationFrame?setTimeout:requestAnimationFrame,h=function(a){var b="";if("string"==typeof a)return a;if(f(a)&&0<a.length)for(var c,d=0;d<a.length;d++)""!==(c=h(a[d]))&&(b+=(b&&" ")+c);else for(var d in a)a[d]&&(b+=(b&&" ")+d);return b},j=function(c,a){var b={};for(var d in c)b[d]=c[d];for(var d in a)b[d]=a[d];return b},k=function(a){return a.reduce(function(a,b){return a.concat(b&&!0!==b?"function"==typeof b[0]?[b]:k(b):0)},d)},l=function(c,a){return f(c)&&f(a)&&c[0]===a[0]&&"function"==typeof c[0]},m=function(c,a){if(c!==a)for(var b in j(c,a)){if(c[b]!==a[b]&&!l(c[b],a[b]))return!0;a[b]=c[b]}},n=function(a,b,c){for(var d,e,f=0,g=[];f<a.length||f<b.length;f++)d=a[f],e=b[f],g.push(e?!d||e[0]!==d[0]||m(e[1],d[1])?[e[0],e[1],e[0](c,e[1]),d&&d[2]()]:d:d&&d[2]());return g},o=function(a,b,c,d,e,f){if("key"===b);else if("style"===b)for(var g in j(c,d))c=null==d||null==d[g]?"":d[g],"-"===g[0]?a[b].setProperty(g,c):a[b][g]=c;else"o"===b[0]&&"n"===b[1]?((a.actions||(a.actions={}))[b=b.slice(2)]=d)?!c&&a.addEventListener(b,e):a.removeEventListener(b,e):!f&&"list"!==b&&b in a?a[b]=null==d?"":d:null!=d&&!1!==d&&("class"!==b||(d=h(d)))?a.setAttribute(b,d):a.removeAttribute(b)},p=function(a,c,d){var e=a.props,f=a.type===b?document.createTextNode(a.name):(d=d||"svg"===a.name)?document.createElementNS("http://www.w3.org/2000/svg",a.name,{is:e.is}):document.createElement(a.name,{is:e.is});for(var g in e)o(f,g,null,e[g],c,d);for(var h=0,j=a.children.length;h<j;h++)f.appendChild(p(a.children[h]=v(a.children[h]),c,d));return a.node=f},q=function(a){return null==a?null:a.key},r=function(a,c,d,e,f,g){if(d===e);else if(null!=d&&d.type===b&&e.type===b)d.name!==e.name&&(c.nodeValue=e.name);else if(null==d||d.name!==e.name)c=a.insertBefore(p(e=v(e),f,g),c),null!=d&&a.removeChild(d.node);else{var h,k,l,m,n=d.props,s=e.props,t=d.children,u=e.children,w=0,x=0,y=t.length-1,z=u.length-1;for(var A in g=g||"svg"===e.name,j(n,s))("value"===A||"selected"===A||"checked"===A?c[A]:n[A])!==s[A]&&o(c,A,n[A],s[A],f,g);for(;x<=z&&w<=y&&null!=(l=q(t[w]))&&l===q(u[x]);)r(c,t[w].node,t[w],u[x]=v(u[x++],t[w++]),f,g);for(;x<=z&&w<=y&&null!=(l=q(t[y]))&&l===q(u[z]);)r(c,t[y].node,t[y],u[z]=v(u[z--],t[y--]),f,g);if(w>y)for(;x<=z;)c.insertBefore(p(u[x]=v(u[x++]),f,g),(k=t[w])&&k.node);else if(x>z)for(;w<=y;)c.removeChild(t[w++].node);else{for(var A=w,B={},C={};A<=y;A++)null!=(l=t[A].key)&&(B[l]=t[A]);for(;x<=z;){if(l=q(k=t[w]),m=q(u[x]=v(u[x],k)),C[l]||null!=m&&m===q(t[w+1])){null==l&&c.removeChild(k.node),w++;continue}null==m||1===d.type?(null==l&&(r(c,k&&k.node,k,u[x],f,g),x++),w++):(l===m?(r(c,k.node,k,u[x],f,g),C[m]=!0,w++):null==(h=B[m])?r(c,k&&k.node,null,u[x],f,g):(r(c,c.insertBefore(h.node,k&&k.node),h,u[x],f,g),C[m]=!0),x++)}for(;w<=y;)null==q(k=t[w++])&&c.removeChild(k.node);for(var A in B)null==C[A]&&c.removeChild(B[A].node)}}return e.node=c},s=function(c,a){for(var b in c)if(c[b]!==a[b])return!0;for(var b in a)if(c[b]!==a[b])return!0},u=function(a){return"object"===t(a)?a:x(a)},v=function(b,c){return b.type===a?((!c||!c.lazy||s(c.lazy,b.lazy))&&((c=u(b.lazy.view(b.lazy))).lazy=b.lazy),c):b},w=function(a,b,c,d,e,f){return{name:a,props:b,children:c,node:d,type:f,key:e}},x=function(a,e){return w(a,c,d,e,void 0,b)},y=function(a){return a.nodeType===b?x(a.nodeValue,a):w(a.nodeName.toLowerCase(),c,e.call(a.childNodes,y),a,void 0,1)};return{h:function h(a,b){for(var d,e=[],g=[],h=arguments.length;2<h--;)e.push(arguments[h]);for(;0<e.length;)if(f(d=e.pop()))for(var h=d.length;0<h--;)e.push(d[h]);else if(!1===d||!0===d||null==d);else g.push(u(d));return b=b||c,"function"==typeof a?a(b,g):w(a,b,g,void 0,b.key)},app:function app(a){var b={},c=!1,d=a.view,e=a.node,h=e&&y(e),i=a.subscriptions,j=[],l=function(a){o(this.actions[a.type],a)},m=function(a){return b!==a&&(b=a,i&&(j=n(j,k([i(b)]),o)),d&&!c&&g(p,c=!0)),b},o=(a.middleware||function(a){return a})(function(a,c){return"function"==typeof a?o(a(b,c)):f(a)?"function"==typeof a[0]||f(a[0])?o(a[0],"function"==typeof a[1]?a[1](c):a[1]):(k(a.slice(1)).map(function(a){a&&a[0](o,a[1])},m(a[0])),b):m(a)}),p=function(){c=!1,e=r(e.parentNode,e,h,h=u(d(b)),l)};o(a.init)}}}(),v=u.h,h=u.app,i=function(a){return function(){var b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},d=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1],e=function(a){for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return c.some(function(b){return b===t(a)})};if(!d)if(e(b,"string","number","function")||Array.isArray(b))d=b,b={};else if(e(b.View,"function"))d=b.View,b={};else if(b.props||b.c)return v(a,{},b);return v(a,b,d)}},o=i("a"),a=i("button"),w=i("circle"),x=i("code"),y=i("div"),z=i("footer"),A=i("g"),g=i("h1"),B=i("h2"),C=i("h3"),D=i("h4"),E=i("h5"),F=i("header"),G=i("img"),H=i("input"),I=i("li"),J=i("link"),K=i("main"),L=i("meta"),M=i("nav"),N=i("p"),p=i("path"),O=i("pre"),P=i("script"),Q=i("span"),R=i("strong"),S=i("svg"),T=i("title"),U=i("ul"),V=i("view"),W={description:"transform markdown and html to @magic-modules",logo:"/transmute/logo.png",logotext:"@magic",menu:[{items:[{text:"install cli",to:"/transmute/#install-cli"},{text:"install api",to:"/transmute/#install-api"}],text:"installation",to:"/transmute/#install"},{items:[{text:"cli commands",to:"/transmute/#use-cli-commands"},{text:"cli flags",to:"/transmute/#use-cli-flags"},{text:"transmute html",to:"/transmute/#use-cli-transpile-html-string"},{text:"transmute markdown",to:"/transmute/#use-cli-transpile-markdown-string"},{text:"html file",to:"/transmute/#use-cli-html-file"},{text:"markdown file",to:"/transmute/#use-cli-markdown-file"},{text:"force markdown",to:"/transmute/#use-cli-force-markdown"}],text:"use cli",to:"/transmute/#use-cli"},{items:[{text:"examples",to:"/transmute/#use-api-examples"}],text:"use api",to:"/transmute/#use-api"},{text:"markdown",to:"/transmute/markdown/"},{text:"html",to:"/transmute/html/"}],nospy:{show:!1},pageClass:{},pages:{"/transmute/":{},"/transmute/404/":{description:"404 - not found.",title:"404 - not found"},"/transmute/html/":{description:"this module gets imported from a html file.",title:"html file example"},"/transmute/markdown/":{description:"markdown file description",title:"markdown file example"}},root:"/transmute/",seo:{author:{"@type":"person",image:"https:/jaeh.at/img/jascha.ehrenreich.jpg",jobTitle:"Technomancer",name:"Jascha Ehrenreich"},image:"/transmute/logo.png",name:"@magic/transmute documentation",url:"https://magic.github.io/transmute"},theme:"dark",title:"@magic/transmute",url:"/transmute/"},X={listenPopState:function listenPopState(a,b){var c=function(c){return a(b,c)};return addEventListener("popstate",c),function(){return removeEventListener("popstate",c)}}},Y=function(a){var b,c=a.blog,d=a.link,e=a.month,f=a.url,g=a.year,h=Object.entries(c[g][e]),i=[e];return d?b="".concat(d).concat(e,"/"):i.push(" - ",g),[C(b?fa({to:b},i):i),h.map(function(c){var d=l(c,2),e=d[0],f=d[1];return f.map(function(c){return Z(j(j(j({},a),c.state),{},{name:c.name,link:b,day:e}))})})]},Z=function(a){return y([D([a.day,"-",a.month,"-",a.year," - ",fa({to:a.name},a.title)]),N(a.description)])},$=function(a){var b,c=a.link,d=a.year,e=a.blog,f=a.url;return c?b="".concat(c).concat(d,"/"):f.endsWith("".concat(d,"/"))&&(b=f),y([B(c?fa({to:b},d):d),Object.entries(e[d]).map(function(c){var d=l(c,2),e=d[0],f=d[1];return Y(j(j({},a),{},{month:e,days:f,link:b}))})])},_=function(){return y({class:"Credits"},["made with a few bits of ",fa({to:"https://magic.github.io/",target:"_blank",rel:"noopener"},"magic")])},aa=function(){var a=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[];return z({class:"Footer"},[y({class:"Container"},[_(),a])])},ba=function(a){if("string"==typeof a)a={project:a};else if(!a.project)return;var b=a,c=b.branch,d=void 0===c?"master":c,e=b.host,f=void 0===e?"github":e,g=a,h=g.project,i=void 0!==h&&h,j="",k=i;i.startsWith("@")?(j="@",i=i.substr(1)):k=i.split("/")[1];var m=[["npm",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:i;return a&&{to:"https://www.npmjs.com/package/".concat(k),src:"https://img.shields.io/npm/v/".concat(j).concat(a,"?color=blue")}}],["node",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:i;return a&&{src:"https://img.shields.io/node/v/".concat(j).concat(a,"?color=blue")}}],["license",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:i;return a&&{src:"https://img.shields.io/npm/l/".concat(j).concat(a,"?color=blue")}}],["travis",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:i;return a&&{to:"https://travis-ci.com/".concat(a),src:"https://img.shields.io/travis/com/".concat(a,"/").concat(d)}}],["appveyor",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:i;if(a){var b=a.split("/"),c=l(b,2),e=c[0],f=c[1];return e=e.replace(/-/g,""),{to:"https://ci.appveyor.com/project/".concat(e,"/").concat(f,"/branch/").concat(d),src:"https://img.shields.io/appveyor/ci/".concat(e,"/").concat(f,"/").concat(d,".svg")}}}],["coveralls",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:i;return{to:"https://coveralls.io/".concat(f,"/").concat(a),src:"https://img.shields.io/coveralls/".concat(f,"/").concat(a,"/").concat(d,".svg")}}],["snyk",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:i;return a&&{to:"https://snyk.io/test/".concat(f,"/").concat(a),src:"https://img.shields.io/snyk/vulnerabilities/github/".concat(a,".svg")}}]].map(function(b){var c=l(b,2),d=c[0],e=c[1];return e(a[d])});return m.length?U({class:"GitBadges"},m.map(function(a){var b=a.to,c=a.src;if(c){var d=da({src:c,height:"23"});return b?I(fa({to:b},d)):I(d)}})):void 0},ca=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[],c=a.logo,d=a.menu,e=a.logotext,f=a.root,g=a.theme,h=a.hash,i=a.url;return c||d||e?F({class:"Header"},[ga({root:f}),e&&N(e),d&&ia({url:i,hash:h,root:f,menu:d}),b]):void 0},da=function(a){if("string"==typeof a&&(a={src:a}),!!a.src)return a.alt||(a.title?a.alt=a.title:(a.role="presentation",a.alt="",a.loading=a.loading||"lazy")),G(a)},ea=function(){0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return S({class:"LightSwitch icon",onclick:oa.changeTheme,height:25,width:25,viewBox:"0 0 352 460"},[p({d:"M149 48C96 48 48 95 47 143c-1 13 19 17 20 0-1-35 48-75 83-75 15 0 12-22-1-20z"}),p({d:"M176 0C74 0 0 83 0 176c9 91 84 118 100 204h20c-16-92-97-138-100-204C22 70 105 21 176 20zM95 400c2 68 20 48 40 60h82c20-12 38 8 40-60z"}),p({d:"M175 0c102 0 177 83 177 176-9 91-86 118-102 204h-20c16-92 99-138 102-204-2-106-86-155-157-156z"})])},fa=function(a,b){var c=a.to,e=a.action,f=void 0===e?oa.go:e,g=a.text,h=d(a,["to","action","text"]),i=h.href,j=h.nofollow,k=h.noreferrer,l=d(h,["href","nofollow","noreferrer"]);c=c||i||"",l.href=c,g&&b?g=[g,b]:!g&&(b?g=b:g=c);var m="/"===c[0]||"#"===c[0];return m?l.onclick=[f,na.preventDefault]:(l.target="_blank",l.rel="noopener",j&&(l.rel+=" nofollow"),k&&(l.rel+=" noreferrer")),o(l,g)},ga=function(a){var b=a.root;return fa({to:b,class:"Logo"},[S({viewBox:"0 0 512 444"},[p({d:"M512 444L256 0 0 444z",fill:"#663695"}),w({cx:"256",cy:"294",r:"130",fill:"#fff"}),w({cx:"256",cy:"281",r:"40",fill:"#663695"}),p({d:"M256 350v44m24-44l1 13c1 27 29 27 29-7m-160-72s46-47 106-47c59 0 106 47 106 47s-47 43-106 43c-60 0-106-43-106-43zm65-75a134 134 0 0189 2",class:"stroke"}),p({d:"M256 81v53m184 270l-43-29M72 404l43-29",class:"stroke white"})])])},ha=function(a){var b=a.array,c=void 0===b?[]:b,d=a.object,e=a.url;return y([B("markdown @magic-module"),N("This is a @magic-module embedded in markdown."),C("usage"),N("You can use any @magic-module in markdown like the following:"),ma("\n<MarkdownEmbed></MarkdownEmbed>\n"),N("No self closing tags for now."),C("state"),N("The state is available in this module, if declared:"),ma("\n<MarkdownEmbed state></MarkdownEmbed>\n"),N(["state.url: ",e]),B("Pass an array"),N("You can pass arrays to @magic-module in markdown:"),ma("\n<MarkdownEmbed state array=\"['arr1', 'arr2', 'arr3']\"></MarkdownEmbed>\n"),c.map(function(a){return N(a)}),B("Pass an object"),N("You can pass objects to @magic-module in markdown:"),ma("\n<MarkdownEmbed state object=\"{ key1: 'value1', key2: 'value2' }\"></MarkdownEmbed>\n"),Object.entries(d).map(function(a){var b=l(a,2),c=b[0],d=b[1];return N([R(c),": ",d])})])},ia=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},b=a.collapse,c=a.menu,d=a.hash,e=a["class"],f=void 0===e?"":e,g=a.url;return f.includes("Menu")||(f="Menu ".concat(f).trim()),d&&!g.endsWith(d)&&(g+="#".concat(d)),M({className:f},U(c.map(function(a){return ja(j(j({},a),{},{url:g,collapse:void 0===b||b}))})))},ja=function(a){var b=a.collapse,c=a.items,e=void 0===c?[]:c,f=a.text,g=a.url,h=d(a,["collapse","items","text","url"]),i={class:{}},k=h.to;k===g&&(i["class"].active=!0);var l=[],m=!b||g.includes(k);return m&&e.length&&(l=U(e.map(function(a){return ja(j({url:g,collapse:b},a))}))),I(i,[k?fa(h,f):Q(h,f),l])},ka=function(a){var b=a.nospy,c=void 0===b?{}:b,d=a.cookies,e=void 0===d?[]:d,f=c.show,g=c.title,h=void 0===g?"Privacy Notice":g,i=c.content,j=void 0===i?"This app neither saves, collects, nor shares any data about you.":i,k=c.buttonText,l=void 0===k?"Awesome!":k;return f?y({class:"NoSpy"},[y({class:"Container"},[h&&C(h),j&&N(j),H({onclick:oa.nospy.toggle,value:l,type:"button"})])]):y({class:"NoSpy"},S({class:"icon",onclick:oa.nospy.toggle,width:"25",height:"25",viewBox:"0 0 512 512"},[A([p({d:"\nM507,208c-1-7-7-12-14-13c-7-1-13,3-16,9\nc-5,11-16,19-29,19c-14,0-26-10-30-23c-2-8-11-13-19-11\nC393,191,389,192,384,192c-35-0-64-29-64-64c0-5,1-9,2-14\nc2-8-3-16-11-19C297,90,288,78,288,64c-0-13,8-24,19-29\nc6-3,10-9,9-16c-1-7-6-12-13-14C288,2,272,0,256,0\nC115,0,0,115,0,256c0,141,115,256,256,256c141-0,256-115,256-256\nC512,239,510,224,507,209z M414,414C374,455,318,480,256,480s-118-25-158-66\nC57,374,32,318,32,256S57,138,98,98C138,57,194,32,256,32c3,0,6,0,9,0\nC259,42,256,52,256,64c0,24,13,44,33,55C288,122,288,125,288,128\nc0,53,43,96,96,96c3,0,6-0,8-0C403,242,424,256,448,256\nc11-0,22-3,32-8c0,3,0,6,0,9C480,318,455,374,414,414z\n"}),w({cx:"192",cy:"128",r:"32"}),w({cx:"128",cy:"256",r:"32"}),w({cx:"288",cy:"384",r:"32"}),w({cx:"272",cy:"272",r:"16"}),w({cx:"400",cy:"336",r:"16"}),w({cx:"176",cy:"368",r:"16"})])]))},la=function(a,b){var c=a.page,d=a.state,e={id:"Magic",class:d.pageClass};return K(e,y({class:{Wrapper:!0}},[ca(d),y({class:"Page",id:"page"},c(d)),aa(d),b]))},ma=function(b,c){"string"==typeof b?b={content:b}:c?b=j({content:c},b):Array.isArray(b)&&(b={content:b.join("")});var d=b,f=d.content,g=d.lines,h=!(void 0!==g)||g;return y({class:{Pre:!0,lines:!h||"false"!==h}},[y({class:"menu"},[a({onclick:[oa.pre.clip,function(a){return{e:a,content:f}}]},"copy")]),O(f.trim().split("\n").map(ma.Line))])};ma.Comment=function(a){return Q({class:"comment"},a)},ma.Line=function(a){return x({class:"line"},ma.Words(a))},ma.Word=function(a){if(!a)return"";var b=a.includes("://"),c=a.startsWith("mailto:")||a.includes("@")&&a.includes(".");if(b||c)return fa({to:a,text:a});var d="";return"state"===a?d="state":"actions"===a?d="actions":na.pre.keywords.includes(a)?d="keyword":na.pre.builtins.includes(a)?d="builtin":na.pre.booleans.includes(a)&&(d="boolean"),d?Q({class:d},a):a},ma.Words=function(a){var c=a.split(na.pre.commentRegex),d=b(c),e=d[0],f=d.slice(1),g=!e.endsWith(":")&&f.length;if(g)return[ma.Words(e),ma.Comment(f.join("").split(na.pre.wordRegex).map(ma.Word))];var h=[],i=a;if(a.replace(na.pre.stringRegex,function(a){var b=i.split(a),c=l(b,2),d=c[0],e=c[1];h.push(d.split(na.pre.wordRegex).map(ma.Word)),h.push(Q({class:"string"},a)),i=e}),i!==a)return h.push(i.split(na.pre.wordRegex).map(ma.Word)),h;var j=a.split(na.pre.wordRegex);return j.map(ma.Word)};var na={pre:{booleans:["true","false"],builtins:["Array","Object","String","Number","RegExp","Null","Symbol","Set","WeakSet","Map","WeakMap","setInterval","setTimeout","Promise","JSON","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"],commentRegex:/(\/\/)/gim,keywords:["let","this","long","package","float","goto","private","class","if","short","while","protected","with","debugger","case","continue","volatile","interface","instanceof","super","synchronized","throw","extends","final","export","throws","try","import","double","enum","boolean","abstract","function","implements","typeof","transient","break","default","do","static","void","int","new","async","native","switch","else","delete","null","public","var","await","byte","finally","catch","in","return","for","get","const","char","module","exports","require","npm","install","=>"],stringRegex:/("|')(.*?)\1/gim,wordRegex:/( )/gim},preventDefault:function preventDefault(a){return a.preventDefault(),a}},oa={changeTheme:function changeTheme(a){return j(j({},a),{},{pageClass:j(j({},a.pageClass),{},{light:"dark"===a.theme}),theme:"dark"===a.theme?"light":"dark"})},go:function go(a,b){var c=b.currentTarget.href.replace(window.location.origin,""),d=c.split("#"),e=l(d,2),f=e[0],g=e[1],h=void 0===g?"":g;if(f===a.url&&h===a.hash)return h&&(window.location.hash=h),a;var i=a.pages&&a.pages[f]&&a.pages[f].title;i&&(document.title=a.title=i),f===a.url?window.location.hash=h:!h&&window.scrollTo({top:0});var k=window,m=k.scrollY;return window.history.pushState({url:f,hash:h,scrollY:m},a.title,c),j(j({},a),{},{url:f,hash:h,prev:a.url})},nospy:{toggle:function toggle(a){return a.nospy.show=!a.nospy.show,j({},a)}},pop:function pop(a,b){var c=window.location,d=c.pathname,e=c.hash;e=e.substring(1);var f=0;return b.state&&(d=b.state.url,e=b.state.hash,f=b.state.scrollY||0),e?window.location.hash=e:window.scroll({top:f}),j(j({},a),{},{url:d,hash:e})},pre:{clip:function clip(a,b){var c=b.content;if("undefined"!=typeof document&&"function"==typeof document.execCommand){var d=document.createElement("textarea");d.id="copy",d.innerHTML=c,document.body.appendChild(d);var e=document.getElementById("copy");e.select(),document.execCommand("copy"),document.body.removeChild(e)}return a}}},pa={"/transmute/":function transmute(){return[g({id:"magictransmute"},"@magic/transmute"),ba({project:"@magic/transmute"}),N("transform markdown and html to @magic-modules"),C({id:"install"},"install"),N("@magic/transmute provides both a command line interface as well as a javascript api."),D({id:"install-cli"},"cli"),ma("npm i -g @magic/transmute\n\n// executable as magic-transmute now\nmagic-transmute"),D({id:"install-api"},"api"),ma({lines:"false"},"npm i --save --save-exact @magic/transmute"),C({id:"use"},"use"),N("after installing either the cli or the api,\nboth can be used in your projects."),D({id:"use-cli"},"use cli"),ma({lines:"false"},"magic-transmute --help"),D({id:"use-cli-commands"},"commands"),ma("markdown - convert markdown to magic functions\nhtml     - convert html to magic functions\nfile     - file to magic functions"),D({id:"use-cli-flags"},"flags"),ma("--add-wrapper - add export default[] to the returned string. - alias: [\"--addWrapper\"]\n--no-pretty   - do not run prettier. - alias: [\"--noPretty\"]\n--markdown    - force markdown parser to run. - alias: [\"--mark\", \"-m\"]\n--output      - output file path - alias: [\"--out\", \"-o\"]\n--input       - input file path - alias: [\"--in\", \"-i\"]\n--help        - this help text - alias: [\"-help\", \"help\", \"--h\", \"-h\"]\n--str         - an input string of either html or markdown, depending on running command"),E({id:"use-cli-transpile-html-string"},"transpile html string"),ma({lines:"false"},"magic-transmute html --str \"<a href=\"https://magic.github.io magic!</a>\""),E({id:"use-cli-transpile-markdown-string"},"transpile markdown string"),ma({lines:"false"},"magic-transmute markdown --str \"[magic!](https://magic.github.io)\""),E({id:"use-cli-html-file"},"html file"),ma({lines:"false"},"magic-transmute file --input input.html --output output.mjs"),E({id:"use-cli-markdown-file"},"markdown file"),N("(.markdown and .md get recognized)"),ma({lines:"false"},"magic-transmute file --input input.md --output output.mjs"),E({id:"use-cli-force-markdown"},"force markdown"),N("(arbitrary file extensions)"),ma({lines:"false"},"magic-transmute file --input input.txt --output output.mjs --markdown"),D({id:"use-api"},"use api"),N("the javascript api expects node version to be bigger or equal to 13.5.0\nand all @magic code uses native ecmascript modules without transpile step."),E({id:"use-api-examples"},"examples"),ma(["import transmute from '@magic/transmute'\n\n// html to magic\ntransmute.html('",fa({to:"https://magic.github.io"},"magic!"),"')\n// returns: Link({ to: 'https://magic.github.io' }, 'magic!')\n\n// markdown to magic\ntransmute.markdown(\"[magic!](https://magic.github.io)\")\n// returns: Link({ to: 'https://magic.github.io' }, 'magic!')\n\nconst magic = transmute.markdown(\"[magic!](https://magic.github.io)\")\nconsole.log(magic)\n// logs: Link({ to: 'https://magic.github.io' }, 'magic!')\n\n// that's it."]),E({id:"escaping"},"escaping"),N("just some special character escaping tests"),ma({lines:"false"},"'' \"string\" \xC4 \xAB \xD6"),ma("' \"")]},"/transmute/404/":function transmute404(){return y("404 - not found.")},"/transmute/html/":function transmuteHtml(){return[B("html file example"),N("this module gets imported from a html file."),N(["see ",fa({to:"https://github.com/magic/core/blob/master/example/pages/modules/html.html"},"this html file")," for an example."]),N("all html valid in a html body can be used, excluding the script and style tags."),N("the state looks like the following, and any valid json is allowed"),ma("\n---\n@state\n{\n  \"title\": \"markdown file example\",\n  \"description\": \"markdown file description\"\n}\n---\n")]},"/transmute/markdown/":function transmuteMarkdown(a){return[B({id:"markdown-file-example"},"markdown file example"),N("markdown file description"),N(["see ",fa({to:"https://github.com/magic/core/blob/master/example/pages/modules/markdown.md",text:"this file in the example dir"})," for an example."]),N("any kind of markdown can be used here,\nbut if you use html natively,\nonly tags valid in a html5 body, excluding script and style tags, are accepted."),N("this markdown file also starts with a magic @state declaration.\nit is used internally to, for example, add the title and meta rel=\"description\" tags to the head of this html file."),U([I(fa({to:"https://magic.github.io",text:"@magic/core"})),I(fa({to:"https://magic-libraries.github.io",text:"@magic-libraries"})),I(fa({to:"https://magic-modules.github.io",text:"@magic-modules"})),I(fa({to:"https://magic-themes.github.io",text:"@magic-themes"}))]),fa({to:"https://jaeh.at"},"yay"),fa({to:"/transmute/",text:"Whatcha gonna do?"}),N("renders"),ha({state:a,array:["arr1","arr2","arr3"],object:{key1:"value1",key2:"value2"}})]}};h({init:j(j({},W),{},{url:window.location.pathname,hash:window.location.hash.substr(1)}),subscriptions:function subscriptions(){return[[X.listenPopState,oa.pop]]},view:function(a){var b=pa[a.url]?a.url:"/404/",c=pa[b],d=a.pages&&a.pages[b];return d&&Object.keys(d).forEach(function(b){a[b]=d[b]}),a.url=b,la({page:c,state:a},[ka(a),ea(a)])},node:document.getElementById("Magic")});