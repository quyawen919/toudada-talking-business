/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/qrcode@1.5.1/build/qrcode.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var QRCode=function(t){"use strict";var r,e=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then},n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706],o=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},a=function(t){return n[t]},i=function(t){for(var r=0;0!==t;)r++,t>>>=1;return r},u=function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');r=t},s=function(){return void 0!==r},f=function(t){return r(t)};function h(t,r){return t(r={exports:{}},r.exports),r.exports}var c=h((function(t,r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2},r.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(t){return e}}}));function g(){this.buffer=[],this.length=0}c.L,c.M,c.Q,c.H,c.isValid,g.prototype={get:function(t){var r=Math.floor(t/8);return 1==(this.buffer[r]>>>7-t%8&1)},put:function(t,r){for(var e=0;e<r;e++)this.putBit(1==(t>>>r-e-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}};var d=g;function l(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}l.prototype.set=function(t,r,e,n){var o=t*this.size+r;this.data[o]=e,n&&(this.reservedBit[o]=!0)},l.prototype.get=function(t,r){return this.data[t*this.size+r]},l.prototype.xor=function(t,r,e){this.data[t*this.size+r]^=e},l.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]};var v=l,p=h((function(t,r){var e=o;r.getRowColCoords=function(t){if(1===t)return[];for(var r=Math.floor(t/7)+2,n=e(t),o=145===n?26:2*Math.ceil((n-13)/(2*r-2)),a=[n-7],i=1;i<r-1;i++)a[i]=a[i-1]-o;return a.push(6),a.reverse()},r.getPositions=function(t){for(var e=[],n=r.getRowColCoords(t),o=n.length,a=0;a<o;a++)for(var i=0;i<o;i++)0===a&&0===i||0===a&&i===o-1||a===o-1&&0===i||e.push([n[a],n[i]]);return e}}));p.getRowColCoords,p.getPositions;var w=o,m=function(t){var r=w(t);return[[0,0],[r-7,0],[0,r-7]]},E=h((function(t,r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var e=3,n=3,o=40,a=10;function i(t,e,n){switch(t){case r.Patterns.PATTERN000:return(e+n)%2==0;case r.Patterns.PATTERN001:return e%2==0;case r.Patterns.PATTERN010:return n%3==0;case r.Patterns.PATTERN011:return(e+n)%3==0;case r.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case r.Patterns.PATTERN101:return e*n%2+e*n%3==0;case r.Patterns.PATTERN110:return(e*n%2+e*n%3)%2==0;case r.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}}r.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},r.from=function(t){return r.isValid(t)?parseInt(t,10):void 0},r.getPenaltyN1=function(t){for(var r=t.size,n=0,o=0,a=0,i=null,u=null,s=0;s<r;s++){o=a=0,i=u=null;for(var f=0;f<r;f++){var h=t.get(s,f);h===i?o++:(o>=5&&(n+=e+(o-5)),i=h,o=1),(h=t.get(f,s))===u?a++:(a>=5&&(n+=e+(a-5)),u=h,a=1)}o>=5&&(n+=e+(o-5)),a>=5&&(n+=e+(a-5))}return n},r.getPenaltyN2=function(t){for(var r=t.size,e=0,o=0;o<r-1;o++)for(var a=0;a<r-1;a++){var i=t.get(o,a)+t.get(o,a+1)+t.get(o+1,a)+t.get(o+1,a+1);4!==i&&0!==i||e++}return e*n},r.getPenaltyN3=function(t){for(var r=t.size,e=0,n=0,a=0,i=0;i<r;i++){n=a=0;for(var u=0;u<r;u++)n=n<<1&2047|t.get(i,u),u>=10&&(1488===n||93===n)&&e++,a=a<<1&2047|t.get(u,i),u>=10&&(1488===a||93===a)&&e++}return e*o},r.getPenaltyN4=function(t){for(var r=0,e=t.data.length,n=0;n<e;n++)r+=t.data[n];return Math.abs(Math.ceil(100*r/e/5)-10)*a},r.applyMask=function(t,r){for(var e=r.size,n=0;n<e;n++)for(var o=0;o<e;o++)r.isReserved(o,n)||r.xor(o,n,i(t,o,n))},r.getBestMask=function(t,e){for(var n=Object.keys(r.Patterns).length,o=0,a=1/0,i=0;i<n;i++){e(i),r.applyMask(i,t);var u=r.getPenaltyN1(t)+r.getPenaltyN2(t)+r.getPenaltyN3(t)+r.getPenaltyN4(t);r.applyMask(i,t),u<a&&(a=u,o=i)}return o}}));E.Patterns,E.isValid,E.getPenaltyN1,E.getPenaltyN2,E.getPenaltyN3,E.getPenaltyN4,E.applyMask,E.getBestMask;var y=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],A=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430],I=function(t,r){switch(r){case c.L:return y[4*(t-1)+0];case c.M:return y[4*(t-1)+1];case c.Q:return y[4*(t-1)+2];case c.H:return y[4*(t-1)+3];default:return}},M=function(t,r){switch(r){case c.L:return A[4*(t-1)+0];case c.M:return A[4*(t-1)+1];case c.Q:return A[4*(t-1)+2];case c.H:return A[4*(t-1)+3];default:return}},N=new Uint8Array(512),B=new Uint8Array(256);!function(){for(var t=1,r=0;r<255;r++)N[r]=t,B[t]=r,256&(t<<=1)&&(t^=285);for(var e=255;e<512;e++)N[e]=N[e-255]}();var C=function(t){return N[t]},P=function(t,r){return 0===t||0===r?0:N[B[t]+B[r]]},R=h((function(t,r){r.mul=function(t,r){for(var e=new Uint8Array(t.length+r.length-1),n=0;n<t.length;n++)for(var o=0;o<r.length;o++)e[n+o]^=P(t[n],r[o]);return e},r.mod=function(t,r){for(var e=new Uint8Array(t);e.length-r.length>=0;){for(var n=e[0],o=0;o<r.length;o++)e[o]^=P(r[o],n);for(var a=0;a<e.length&&0===e[a];)a++;e=e.slice(a)}return e},r.generateECPolynomial=function(t){for(var e=new Uint8Array([1]),n=0;n<t;n++)e=r.mul(e,new Uint8Array([1,C(n)]));return e}}));function T(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}R.mul,R.mod,R.generateECPolynomial,T.prototype.initialize=function(t){this.degree=t,this.genPoly=R.generateECPolynomial(this.degree)},T.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");var r=new Uint8Array(t.length+this.degree);r.set(t);var e=R.mod(r,this.genPoly),n=this.degree-e.length;if(n>0){var o=new Uint8Array(this.degree);return o.set(e,n),o}return e};var L=T,b=function(t){return!isNaN(t)&&t>=1&&t<=40},U="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",x="(?:(?![A-Z0-9 $%*+\\-./:]|"+(U=U.replace(/u/g,"\\u"))+")(?:.|[\r\n]))+",k=new RegExp(U,"g"),F=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),S=new RegExp(x,"g"),D=new RegExp("[0-9]+","g"),Y=new RegExp("[A-Z $%*+\\-./:]+","g"),_=new RegExp("^"+U+"$"),z=new RegExp("^[0-9]+$"),H=new RegExp("^[A-Z0-9 $%*+\\-./:]+$"),J={KANJI:k,BYTE_KANJI:F,BYTE:S,NUMERIC:D,ALPHANUMERIC:Y,testKanji:function(t){return _.test(t)},testNumeric:function(t){return z.test(t)},testAlphanumeric:function(t){return H.test(t)}},K=h((function(t,r){r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,r){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!b(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?t.ccBits[0]:r<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return J.testNumeric(t)?r.NUMERIC:J.testAlphanumeric(t)?r.ALPHANUMERIC:J.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},r.isValid=function(t){return t&&t.bit&&t.ccBits},r.from=function(t,e){if(r.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+t)}}(t)}catch(t){return e}}}));K.NUMERIC,K.ALPHANUMERIC,K.BYTE,K.KANJI,K.MIXED,K.getCharCountIndicator,K.getBestModeForData,K.isValid;var O=h((function(t,r){var e=i(7973);function n(t,r){return K.getCharCountIndicator(t,r)+4}function o(t,r){var e=0;return t.forEach((function(t){var o=n(t.mode,r);e+=o+t.getBitsLength()})),e}r.from=function(t,r){return b(t)?parseInt(t,10):r},r.getCapacity=function(t,r,e){if(!b(t))throw new Error("Invalid QR Code version");void 0===e&&(e=K.BYTE);var o=8*(a(t)-M(t,r));if(e===K.MIXED)return o;var i=o-n(e,t);switch(e){case K.NUMERIC:return Math.floor(i/10*3);case K.ALPHANUMERIC:return Math.floor(i/11*2);case K.KANJI:return Math.floor(i/13);case K.BYTE:default:return Math.floor(i/8)}},r.getBestVersionForData=function(t,e){var n,a=c.from(e,c.M);if(Array.isArray(t)){if(t.length>1)return function(t,e){for(var n=1;n<=40;n++){if(o(t,n)<=r.getCapacity(n,e,K.MIXED))return n}}(t,a);if(0===t.length)return 1;n=t[0]}else n=t;return function(t,e,n){for(var o=1;o<=40;o++)if(e<=r.getCapacity(o,n,t))return o}(n.mode,n.getLength(),a)},r.getEncodedBits=function(t){if(!b(t)||t<7)throw new Error("Invalid QR Code version");for(var r=t<<12;i(r)-e>=0;)r^=7973<<i(r)-e;return t<<12|r}}));O.getCapacity,O.getBestVersionForData,O.getEncodedBits;var Q=i(1335),V=function(t,r){for(var e=t.bit<<3|r,n=e<<10;i(n)-Q>=0;)n^=1335<<i(n)-Q;return 21522^(e<<10|n)};function q(t){this.mode=K.NUMERIC,this.data=t.toString()}q.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},q.prototype.getLength=function(){return this.data.length},q.prototype.getBitsLength=function(){return q.getBitsLength(this.data.length)},q.prototype.write=function(t){var r,e,n;for(r=0;r+3<=this.data.length;r+=3)e=this.data.substr(r,3),n=parseInt(e,10),t.put(n,10);var o=this.data.length-r;o>0&&(e=this.data.substr(r),n=parseInt(e,10),t.put(n,3*o+1))};var j=q,$=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function X(t){this.mode=K.ALPHANUMERIC,this.data=t}X.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},X.prototype.getLength=function(){return this.data.length},X.prototype.getBitsLength=function(){return X.getBitsLength(this.data.length)},X.prototype.write=function(t){var r;for(r=0;r+2<=this.data.length;r+=2){var e=45*$.indexOf(this.data[r]);e+=$.indexOf(this.data[r+1]),t.put(e,11)}this.data.length%2&&t.put($.indexOf(this.data[r]),6)};var Z=X;function W(t){this.mode=K.BYTE,"string"==typeof t&&(t=function(t){for(var r=[],e=t.length,n=0;n<e;n++){var o=t.charCodeAt(n);if(o>=55296&&o<=56319&&e>n+1){var a=t.charCodeAt(n+1);a>=56320&&a<=57343&&(o=1024*(o-55296)+a-56320+65536,n+=1)}o<128?r.push(o):o<2048?(r.push(o>>6|192),r.push(63&o|128)):o<55296||o>=57344&&o<65536?(r.push(o>>12|224),r.push(o>>6&63|128),r.push(63&o|128)):o>=65536&&o<=1114111?(r.push(o>>18|240),r.push(o>>12&63|128),r.push(o>>6&63|128),r.push(63&o|128)):r.push(239,191,189)}return new Uint8Array(r).buffer}(t)),this.data=new Uint8Array(t)}W.getBitsLength=function(t){return 8*t},W.prototype.getLength=function(){return this.data.length},W.prototype.getBitsLength=function(){return W.getBitsLength(this.data.length)},W.prototype.write=function(t){for(var r=0,e=this.data.length;r<e;r++)t.put(this.data[r],8)};var G=W;function tt(t){this.mode=K.KANJI,this.data=t}tt.getBitsLength=function(t){return 13*t},tt.prototype.getLength=function(){return this.data.length},tt.prototype.getBitsLength=function(){return tt.getBitsLength(this.data.length)},tt.prototype.write=function(t){var r;for(r=0;r<this.data.length;r++){var e=f(this.data[r]);if(e>=33088&&e<=40956)e-=33088;else{if(!(e>=57408&&e<=60351))throw new Error("Invalid SJIS character: "+this.data[r]+"\nMake sure your charset is UTF-8");e-=49472}e=192*(e>>>8&255)+(255&e),t.put(e,13)}};var rt=tt,et=h((function(t){var r={single_source_shortest_paths:function(t,e,n){var o={},a={};a[e]=0;var i,u,s,f,h,c,g,d=r.PriorityQueue.make();for(d.push(e,0);!d.empty();)for(s in u=(i=d.pop()).value,f=i.cost,h=t[u]||{})h.hasOwnProperty(s)&&(c=f+h[s],g=a[s],(void 0===a[s]||g>c)&&(a[s]=c,d.push(s,c),o[s]=u));if(void 0!==n&&void 0===a[n]){var l=["Could not find a path from ",e," to ",n,"."].join("");throw new Error(l)}return o},extract_shortest_path_from_predecessor_list:function(t,r){for(var e=[],n=r;n;)e.push(n),n=t[n];return e.reverse(),e},find_path:function(t,e,n){var o=r.single_source_shortest_paths(t,e,n);return r.extract_shortest_path_from_predecessor_list(o,n)},PriorityQueue:{make:function(t){var e,n=r.PriorityQueue,o={};for(e in t=t||{},n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o.queue=[],o.sorter=t.sorter||n.default_sorter,o},default_sorter:function(t,r){return t.cost-r.cost},push:function(t,r){var e={value:t,cost:r};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r})),nt=h((function(t,r){function e(t){return unescape(encodeURIComponent(t)).length}function n(t,r,e){for(var n,o=[];null!==(n=t.exec(e));)o.push({data:n[0],index:n.index,mode:r,length:n[0].length});return o}function o(t){var r,e,o=n(J.NUMERIC,K.NUMERIC,t),a=n(J.ALPHANUMERIC,K.ALPHANUMERIC,t);return s()?(r=n(J.BYTE,K.BYTE,t),e=n(J.KANJI,K.KANJI,t)):(r=n(J.BYTE_KANJI,K.BYTE,t),e=[]),o.concat(a,r,e).sort((function(t,r){return t.index-r.index})).map((function(t){return{data:t.data,mode:t.mode,length:t.length}}))}function a(t,r){switch(r){case K.NUMERIC:return j.getBitsLength(t);case K.ALPHANUMERIC:return Z.getBitsLength(t);case K.KANJI:return rt.getBitsLength(t);case K.BYTE:return G.getBitsLength(t)}}function i(t,r){var e,n=K.getBestModeForData(t);if((e=K.from(r,n))!==K.BYTE&&e.bit<n.bit)throw new Error('"'+t+'" cannot be encoded with mode '+K.toString(e)+".\n Suggested mode is: "+K.toString(n));switch(e!==K.KANJI||s()||(e=K.BYTE),e){case K.NUMERIC:return new j(t);case K.ALPHANUMERIC:return new Z(t);case K.KANJI:return new rt(t);case K.BYTE:return new G(t)}}r.fromArray=function(t){return t.reduce((function(t,r){return"string"==typeof r?t.push(i(r,null)):r.data&&t.push(i(r.data,r.mode)),t}),[])},r.fromString=function(t,n){for(var i=function(t,r){for(var e={},n={start:{}},o=["start"],i=0;i<t.length;i++){for(var u=t[i],s=[],f=0;f<u.length;f++){var h=u[f],c=""+i+f;s.push(c),e[c]={node:h,lastCount:0},n[c]={};for(var g=0;g<o.length;g++){var d=o[g];e[d]&&e[d].node.mode===h.mode?(n[d][c]=a(e[d].lastCount+h.length,h.mode)-a(e[d].lastCount,h.mode),e[d].lastCount+=h.length):(e[d]&&(e[d].lastCount=h.length),n[d][c]=a(h.length,h.mode)+4+K.getCharCountIndicator(h.mode,r))}}o=s}for(var l=0;l<o.length;l++)n[o[l]].end=0;return{map:n,table:e}}(function(t){for(var r=[],n=0;n<t.length;n++){var o=t[n];switch(o.mode){case K.NUMERIC:r.push([o,{data:o.data,mode:K.ALPHANUMERIC,length:o.length},{data:o.data,mode:K.BYTE,length:o.length}]);break;case K.ALPHANUMERIC:r.push([o,{data:o.data,mode:K.BYTE,length:o.length}]);break;case K.KANJI:r.push([o,{data:o.data,mode:K.BYTE,length:e(o.data)}]);break;case K.BYTE:r.push([{data:o.data,mode:K.BYTE,length:e(o.data)}])}}return r}(o(t)),n),u=et.find_path(i.map,"start","end"),s=[],f=1;f<u.length-1;f++)s.push(i.table[u[f]].node);return r.fromArray(function(t){return t.reduce((function(t,r){var e=t.length-1>=0?t[t.length-1]:null;return e&&e.mode===r.mode?(t[t.length-1].data+=r.data,t):(t.push(r),t)}),[])}(s))},r.rawSplit=function(t){return r.fromArray(o(t))}}));function ot(t,r,e){var n,o,a=t.size,i=V(r,e);for(n=0;n<15;n++)o=1==(i>>n&1),n<6?t.set(n,8,o,!0):n<8?t.set(n+1,8,o,!0):t.set(a-15+n,8,o,!0),n<8?t.set(8,a-n-1,o,!0):n<9?t.set(8,15-n-1+1,o,!0):t.set(8,15-n-1,o,!0);t.set(a-8,8,1,!0)}function at(t,r,e){var n=new d;e.forEach((function(r){n.put(r.mode.bit,4),n.put(r.getLength(),K.getCharCountIndicator(r.mode,t)),r.write(n)}));var o=8*(a(t)-M(t,r));for(n.getLengthInBits()+4<=o&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(0);for(var i=(o-n.getLengthInBits())/8,u=0;u<i;u++)n.put(u%2?17:236,8);return function(t,r,e){for(var n=a(r),o=M(r,e),i=n-o,u=I(r,e),s=u-n%u,f=Math.floor(n/u),h=Math.floor(i/u),c=h+1,g=f-h,d=new L(g),l=0,v=new Array(u),p=new Array(u),w=0,m=new Uint8Array(t.buffer),E=0;E<u;E++){var y=E<s?h:c;v[E]=m.slice(l,l+y),p[E]=d.encode(v[E]),l+=y,w=Math.max(w,y)}var A,N,B=new Uint8Array(n),C=0;for(A=0;A<w;A++)for(N=0;N<u;N++)A<v[N].length&&(B[C++]=v[N][A]);for(A=0;A<g;A++)for(N=0;N<u;N++)B[C++]=p[N][A];return B}(n,t,r)}function it(t,r,e,n){var a;if(Array.isArray(t))a=nt.fromArray(t);else{if("string"!=typeof t)throw new Error("Invalid data");var i=r;if(!i){var u=nt.rawSplit(t);i=O.getBestVersionForData(u,e)}a=nt.fromString(t,i||40)}var s=O.getBestVersionForData(a,e);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(r){if(r<s)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+s+".\n")}else r=s;var f=at(r,e,a),h=o(r),c=new v(h);return function(t,r){for(var e=t.size,n=m(r),o=0;o<n.length;o++)for(var a=n[o][0],i=n[o][1],u=-1;u<=7;u++)if(!(a+u<=-1||e<=a+u))for(var s=-1;s<=7;s++)i+s<=-1||e<=i+s||(u>=0&&u<=6&&(0===s||6===s)||s>=0&&s<=6&&(0===u||6===u)||u>=2&&u<=4&&s>=2&&s<=4?t.set(a+u,i+s,!0,!0):t.set(a+u,i+s,!1,!0))}(c,r),function(t){for(var r=t.size,e=8;e<r-8;e++){var n=e%2==0;t.set(e,6,n,!0),t.set(6,e,n,!0)}}(c),function(t,r){for(var e=p.getPositions(r),n=0;n<e.length;n++)for(var o=e[n][0],a=e[n][1],i=-2;i<=2;i++)for(var u=-2;u<=2;u++)-2===i||2===i||-2===u||2===u||0===i&&0===u?t.set(o+i,a+u,!0,!0):t.set(o+i,a+u,!1,!0)}(c,r),ot(c,e,0),r>=7&&function(t,r){for(var e,n,o,a=t.size,i=O.getEncodedBits(r),u=0;u<18;u++)e=Math.floor(u/3),n=u%3+a-8-3,o=1==(i>>u&1),t.set(e,n,o,!0),t.set(n,e,o,!0)}(c,r),function(t,r){for(var e=t.size,n=-1,o=e-1,a=7,i=0,u=e-1;u>0;u-=2)for(6===u&&u--;;){for(var s=0;s<2;s++)if(!t.isReserved(o,u-s)){var f=!1;i<r.length&&(f=1==(r[i]>>>a&1)),t.set(o,u-s,f),-1===--a&&(i++,a=7)}if((o+=n)<0||e<=o){o-=n,n=-n;break}}}(c,f),isNaN(n)&&(n=E.getBestMask(c,ot.bind(null,c,e))),E.applyMask(n,c),ot(c,e,n),{modules:c,version:r,errorCorrectionLevel:e,maskPattern:n,segments:a}}nt.fromArray,nt.fromString,nt.rawSplit;var ut=function(t,r){if(void 0===t||""===t)throw new Error("No input text");var e,n,o=c.M;return void 0!==r&&(o=c.from(r.errorCorrectionLevel,c.M),e=O.from(r.version),n=E.from(r.maskPattern),r.toSJISFunc&&u(r.toSJISFunc)),it(t,e,o,n)},st=h((function(t,r){function e(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw new Error("Color should be defined as hex string");var r=t.slice().replace("#","").split("");if(r.length<3||5===r.length||r.length>8)throw new Error("Invalid hex color: "+t);3!==r.length&&4!==r.length||(r=Array.prototype.concat.apply([],r.map((function(t){return[t,t]})))),6===r.length&&r.push("F","F");var e=parseInt(r.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:255&e,hex:"#"+r.slice(0,6).join("")}}r.getOptions=function(t){t||(t={}),t.color||(t.color={});var r=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,n=t.width&&t.width>=21?t.width:void 0,o=t.scale||4;return{width:n,scale:n?4:o,margin:r,color:{dark:e(t.color.dark||"#000000ff"),light:e(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},r.getScale=function(t,r){return r.width&&r.width>=t+2*r.margin?r.width/(t+2*r.margin):r.scale},r.getImageWidth=function(t,e){var n=r.getScale(t,e);return Math.floor((t+2*e.margin)*n)},r.qrToImageData=function(t,e,n){for(var o=e.modules.size,a=e.modules.data,i=r.getScale(o,n),u=Math.floor((o+2*n.margin)*i),s=n.margin*i,f=[n.color.light,n.color.dark],h=0;h<u;h++)for(var c=0;c<u;c++){var g=4*(h*u+c),d=n.color.light;if(h>=s&&c>=s&&h<u-s&&c<u-s)d=f[a[Math.floor((h-s)/i)*o+Math.floor((c-s)/i)]?1:0];t[g++]=d.r,t[g++]=d.g,t[g++]=d.b,t[g]=d.a}}}));st.getOptions,st.getScale,st.getImageWidth,st.qrToImageData;var ft=h((function(t,r){r.render=function(t,r,e){var n=e,o=r;void 0!==n||r&&r.getContext||(n=r,r=void 0),r||(o=function(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),n=st.getOptions(n);var a=st.getImageWidth(t.modules.size,n),i=o.getContext("2d"),u=i.createImageData(a,a);return st.qrToImageData(u.data,t,n),function(t,r,e){t.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=e,r.width=e,r.style.height=e+"px",r.style.width=e+"px"}(i,o,a),i.putImageData(u,0,0),o},r.renderToDataURL=function(t,e,n){var o=n;void 0!==o||e&&e.getContext||(o=e,e=void 0),o||(o={});var a=r.render(t,e,o),i=o.type||"image/png",u=o.rendererOpts||{};return a.toDataURL(i,u.quality)}}));function ht(t,r){var e=t.a/255,n=r+'="'+t.hex+'"';return e<1?n+" "+r+'-opacity="'+e.toFixed(2).slice(1)+'"':n}function ct(t,r,e){var n=t+r;return void 0!==e&&(n+=" "+e),n}ft.render,ft.renderToDataURL;var gt=function(t,r,e){var n=st.getOptions(r),o=t.modules.size,a=t.modules.data,i=o+2*n.margin,u=n.color.light.a?"<path "+ht(n.color.light,"fill")+' d="M0 0h'+i+"v"+i+'H0z"/>':"",s="<path "+ht(n.color.dark,"stroke")+' d="'+function(t,r,e){for(var n="",o=0,a=!1,i=0,u=0;u<t.length;u++){var s=Math.floor(u%r),f=Math.floor(u/r);s||a||(a=!0),t[u]?(i++,u>0&&s>0&&t[u-1]||(n+=a?ct("M",s+e,.5+f+e):ct("m",o,0),o=0,a=!1),s+1<r&&t[u+1]||(n+=ct("h",i),i=0)):o++}return n}(a,o,n.margin)+'"/>',f='viewBox="0 0 '+i+" "+i+'"',h='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+f+' shape-rendering="crispEdges">'+u+s+"</svg>\n";return"function"==typeof e&&e(null,h),h};function dt(t,r,n,o,a){var i=[].slice.call(arguments,1),u=i.length,s="function"==typeof i[u-1];if(!s&&!e())throw new Error("Callback required as last argument");if(!s){if(u<1)throw new Error("Too few arguments provided");return 1===u?(n=r,r=o=void 0):2!==u||r.getContext||(o=n,n=r,r=void 0),new Promise((function(e,a){try{var i=ut(n,o);e(t(i,r,o))}catch(t){a(t)}}))}if(u<2)throw new Error("Too few arguments provided");2===u?(a=n,n=r,r=o=void 0):3===u&&(r.getContext&&void 0===a?(a=o,o=void 0):(a=o,o=n,n=r,r=void 0));try{var f=ut(n,o);a(null,t(f,r,o))}catch(t){a(t)}}var lt=ut,vt=dt.bind(null,ft.render),pt=dt.bind(null,ft.renderToDataURL),wt=dt.bind(null,(function(t,r,e){return gt(t,e)})),mt={create:lt,toCanvas:vt,toDataURL:pt,toString:wt};return t.create=lt,t.default=mt,t.toCanvas=vt,t.toDataURL=pt,t.toString=wt,Object.defineProperty(t,"__esModule",{value:!0}),t}({});

function img(path) {
  const base = getImgBase()
  if (!path) return `${base}/portraits/portrait-main.jpg`
  if (path.startsWith('/images/')) return base + path.slice('/images'.length)
  return base + path
}

function getImgBase() {
  if (typeof window !== 'undefined' && window.__SITE_IMG_BASE) {
    return window.__SITE_IMG_BASE
  }
  if (typeof window !== 'undefined') {
    const p = window.location.pathname || ''
    return /\/web(\/|$)/.test(p) ? '../images' : 'images'
  }
  return '../images'
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatReplyDeadline(hours) {
  const d = new Date(Date.now() + hours * 3600000)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getMonth() + 1}月${d.getDate()}日 ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function getConsultUrl() {
  const base = window.location.href.split('#')[0].split('?')[0]
  return `${base}?p=consult`
}

function getHomeShareUrl() {
  const base = window.location.href.split('#')[0].split('?')[0]
  return `${base}?p=home`
}

function getGameShareUrl() {
  const base = window.location.href.split('#')[0].split('?')[0]
  return `${base}?p=measure&game=store`
}

function getSharePageUrl(type) {
  const base = window.location.href.split('#')[0].split('?')[0]
  const t = type || 'home'
  return `${base}?p=share&type=${t}`
}

/** 娱乐向分享口令（便于朋友圈/群聊复制） */
function buildShareCode(result) {
  const n = result && result.mid ? Math.round(result.mid) : 0
  return 'TD' + String((n * 7 + (Date.now() % 10000)) % 10000).padStart(4, '0')
}

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch (_) { /* fallback below */ }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.cssText = 'position:fixed;left:-9999px;top:0'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  return ok
}

function showToast(msg) {
  let el = document.getElementById('td-toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'td-toast'
    el.className = 'td-toast'
    document.body.appendChild(el)
  }
  el.textContent = msg
  el.classList.add('visible')
  clearTimeout(el._hideTimer)
  el._hideTimer = setTimeout(() => el.classList.remove('visible'), 2400)
}

function onId(id, event, fn) {
  const el = document.getElementById(id)
  if (el) el.addEventListener(event, fn)
}

function onSel(sel, event, fn, root) {
  const el = (root || document).querySelector(sel)
  if (el) el.addEventListener(event, fn)
}

window.TDUtils = { img, esc, formatReplyDeadline, getConsultUrl, getHomeShareUrl, getGameShareUrl, getSharePageUrl, buildShareCode, copyText, showToast, onId, onSel };

/* global bundle: TDContent */
const BRAND = {
  slogan: '一个让你提升经营思维的男人',
  name: '头大大管理咨询',
  tagline: '新店指导 × 老店诊断',
  scope: '餐饮 · 酒店 · 夜场 · 服务业',
  intro: '个人餐饮与服务业管理咨询 OPC。曾与管理大师余世维，餐饮前辈冯耀龙等深度交流，把一线经营逻辑转化为老板听得懂的诊断与方案。',
  /** 擅长方向（about · 行业资历） */
  expertiseSummary: '经营诊断 · 运营优化 · 管理改进 · 业绩提升 · 薪酬改革'
}

/** 首页 · 士气基地向社群展示 */
const HOME_COMMUNITY = {
  shortName: '头大大',
  subtitle: '经营思维圈子',
  communitySlogan: '提升经营思维，开创美好未来',
  bannerBadge: '限时 · 30秒问卷',
  ctaText: '立即开聊',
  memberCount: '+128 位老板',
  searchPlaceholder: '搜话题：定价 / 选址 / 点评…'
}

/** 头大大 · 独到判断（创始人投稿，置顶于热门经营话题） */
const FOUNDER_TOPICS = [
  {
    id: 'founder-model',
    label: '别只降价',
    title: '低价不再奏效，老板真正要算的是经营模型',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'operate',
    intro: '低价只能带来短期热闹，带不来长期利润；能在合理价格里让顾客觉得值，才是门店真正的本事。',
    paragraphs: [
      '很多餐饮老板一看到生意下滑，下意识就想降价、做活动、上套餐，以为价格低一点，顾客就会回来。但头大大看到的不是价格问题，而是模型问题。低价只能带来短期热闹，带不来长期利润。',
      '一个店如果产品结构没算清、毛利空间没算清、人工效率没算清、复购路径没算清，越降价，亏得越快。很多老板不是输给同行，而是输给自己没有算账。表面上是顾客嫌贵，背后可能是产品没有记忆点；表面上是客流不够，背后可能是门店没有复购理由；表面上是活动没效果，背后可能是老板把营销当成救命稻草。',
      '头大大认为，今天的餐饮已经不能只靠经验和勤快，真正能活下来的店，一定要从「我觉得能卖」变成「数据证明能赚」。低价不是经营能力，能在合理价格里让顾客觉得值，才是门店真正的本事。'
    ]
  },
  {
    id: 'founder-online',
    label: '线上可信度',
    title: '顾客进店前，已经在线上把你判断完了',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'service',
    intro: '顾客不是进店后才认识你，而是在手机上就已经决定要不要给你机会。',
    paragraphs: [
      '以前老板选铺子，特别看重人流量，觉得门口人多，生意就不会差。但头大大看到，现在顾客的到店决策早就变了。很多顾客还没走到你门口，已经在线上看过图片、评价、价格、团购、差评、距离、榜单，甚至已经把你和旁边几家店比较完了。',
      '很多老板把钱花在装修、设备、招牌上，却忽略了线上呈现这件事。门店实际不错，但照片看不出食欲；产品有特色，但菜单表达不清；服务有用心，但评价没有沉淀；价格不算贵，但顾客看不到价值。',
      '头大大认为，今天开店不能只建一个物理门店，还要建立一个线上可信度。人流量只是看得见的流量，顾客心里的确定感，才是真正影响进店的关键。'
    ]
  },
  {
    id: 'founder-trend',
    label: '别追风口',
    title: '风口品类爆火，最怕老板把热闹当成生意',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'mindset',
    intro: '风口从来不等于利润，热闹也不等于长久。',
    paragraphs: [
      '一个品类突然火了，很多人就开始心动：别人排队，我也想做；别人开店，我也想跟；别人加盟，我也想试。但头大大看到的不是风口，而是风险。任何一个爆火品类，到了大量人涌入以后，很快就会进入同质化、价格战、选址争夺和供应链比拼。',
      '很多新手老板只看到了别人门口排队，却没看到背后的产品打磨、供应链稳定、出品标准、团队管理和区域深耕。真正值得研究的不是这个品类火不火，而是它为什么能复购，为什么能跨区域，为什么能把口味稳定下来，为什么能在同行模仿后还活得下去。',
      '头大大认为，很多老板开店失败，就是把别人的结果当成自己的起点。看到别人跑出来，不代表自己进去就能接住。开店前不先拆底盘，只追风口，很容易把积蓄投进一场短暂的热闹里。'
    ]
  },
  {
    id: 'founder-scene',
    label: '热点做场景',
    title: '节日和热点不是拿来蹭的，是拿来设计消费场景的',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'open',
    intro: '热点能不能变成生意，关键看门店有没有把顾客当时的状态想清楚。',
    paragraphs: [
      '世界杯、端午、龙舟、城市赛事、地方民俗，这些热点确实能带来流量，但头大大看到的不是「做活动」，而是「做场景」。很多门店一遇到节日就打折、发券、换海报，以为这样就叫借势。',
      '其实顾客愿意消费的，不只是便宜，而是氛围、情绪、社交和体验。看球的人需要夜宵、啤酒、小食、投屏、多人套餐；端午的人需要家庭聚餐、地方特色、伴手礼和仪式感；龙舟赛事周边的人流，需要的是快取、便捷、特色和拍照传播。',
      '头大大认为，顾客是一个人来，还是一群人来？是边走边吃，还是坐下来聚？是为了填饱肚子，还是为了参与氛围？如果这些没想清楚，热点来了也只是路过。真正会经营的老板，不是追热点，而是把热点转化成产品组合、门店动线、服务节奏和复购记忆。'
    ]
  },
  {
    id: 'founder-data',
    label: '小店看数据',
    title: 'AI和数据不是大品牌专属，小店更要学会看损耗',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'operate',
    intro: '数字不是冰冷的东西，数字是老板看清门店真相的眼睛。',
    paragraphs: [
      '很多小店老板一听到 AI、数据、系统，就觉得那是大品牌的事情，跟自己没关系。但头大大看到，恰恰是小店更需要用数据把账算清楚。因为小店抗风险能力更弱，一点点损耗、一点点排班浪费、一点点库存积压，都会直接吃掉利润。',
      '很多店看起来有营业额，月底却不赚钱，问题往往不在生意表面，而在看不见的细节里。今天多备了多少菜？哪些菜卖得多但毛利低？哪个时段员工排多了？哪些原料损耗高？外卖单看起来多，扣完平台费用还剩多少？这些都不能只靠感觉。',
      '头大大认为，小店不一定马上上复杂系统，但至少要建立基本的经营记录。不会看数据的老板，很容易被热闹骗；会看数据的老板，才知道哪里该加、哪里该减、哪里该停。'
    ]
  },
  {
    id: 'founder-diff',
    label: '开店先差异化',
    title: '全国门店那么多，开店前要问清楚顾客为什么选你',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'mindset',
    intro: '开店前真正要想清楚的，不是「这个行业有没有机会」，而是「这个机会是不是属于我」。',
    paragraphs: [
      '餐饮市场很大，但门店也很多。很多人准备开店时，只看到行业规模大、消费频次高、别人也在做，却没有认真想过一个问题：顾客为什么要选你？头大大看到，很多新手开店失败，不是因为不努力，而是从起步就没有差异化判断。',
      '产品和别人差不多，装修和别人差不多，价格和别人差不多，服务也没有明显记忆点，最后只能靠位置和运气。可在竞争越来越密的环境里，靠运气开店越来越难。你的客群是谁？他们为什么会来？他们为什么会再来？你的产品有没有一句话能说清楚？你的价格有没有利润？你的老板本人能不能下场经营？',
      '头大大认为，如果这些问题没有答案，店开出来以后，就会被市场逼着交学费。餐饮不是不能做，而是不能糊里糊涂地做。'
    ]
  }
]

/** 热门经营话题 · 老板投稿 + 勾选共鸣（与五栏目 IP 互补，点击进引导而非直接弹 IP） */
const COMMUNITY_TOPICS = [
  {
    id: 'topic-site',
    label: '选址踩坑',
    voteCount: 86,
    submitter: '餐饮老板·长沙',
    intro: '同一条步行街，为什么有的店赚钱、有的店一直亏？先把人群和定位想清楚，再谈租金。',
    columnKey: 'site',
    checkOptions: [
      { id: 's1', text: '人流大但几乎不进店', painKey: '选址 / 定位不对' },
      { id: 's2', text: '租金占比过高心里没底', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 's3', text: '周边竞品太多，差异化说不清', painKey: '选址 / 定位不对' },
      { id: 's4', text: '签租前没做 3～5 个点位比选', painKey: '选址 / 定位不对' }
    ]
  },
  {
    id: 'topic-margin',
    label: '保本算不清',
    voteCount: 124,
    submitter: '小吃店主·成都',
    intro: '营业额看着还行，月底一算账才发现白忙。你会算保本销量和真实毛利吗？',
    columnKey: 'operate',
    checkOptions: [
      { id: 'm1', text: '不知道每天卖多少才保本', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 'm2', text: '菜品定价跟着同行走', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 'm3', text: '人工、房租占比心里没数', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 'm4', text: '促销一停业绩就掉', painKey: '营销 / 引流 / 转化' }
    ]
  },
  {
    id: 'topic-open',
    label: '开业冷场',
    voteCount: 63,
    submitter: '筹备中·重庆',
    intro: '开业前很热闹，开业后客人不回头。节奏和复购设计比当天火爆更重要。',
    columnKey: 'open',
    checkOptions: [
      { id: 'o1', text: '开业活动做完就没人了', painKey: '筹备 / 开业节奏' },
      { id: 'o2', text: '外卖团购还没理顺就开业', painKey: '筹备 / 开业节奏' },
      { id: 'o3', text: '制度、薪酬、表格还没到位', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'o4', text: '储值、复购机制没设计', painKey: '营销 / 引流 / 转化' }
    ]
  },
  {
    id: 'topic-review',
    label: '点评上不去',
    voteCount: 97,
    submitter: '酒店餐饮·杭州',
    intro: '分数卡在 3.8 左右，买流量又怕违规。先改服务动作，再谈曝光。',
    columnKey: 'service',
    checkOptions: [
      { id: 'r1', text: '差评多，不知道改哪几个动作', painKey: '大众点评 / 线上运营' },
      { id: 'r2', text: '想合规提分，不想碰刷单', painKey: '大众点评 / 线上运营' },
      { id: 'r3', text: '前厅后厨服务标准不一致', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'r4', text: '线上运营投入产出算不清', painKey: '营销 / 引流 / 转化' }
    ]
  },
  {
    id: 'topic-pay',
    label: '薪酬改不动',
    voteCount: 71,
    submitter: '多店老板·广州',
    intro: '店长拿固定工资，店里赚不赚钱和他关系不大。机制不改，人效很难上去。',
    columnKey: 'operate',
    checkOptions: [
      { id: 'p1', text: '店长薪酬和利润没挂钩', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'p2', text: '员工流动大，培训白做', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'p3', text: '表格化管理推不下去', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'p4', text: '想复制多店但标准落不了地', painKey: '多店复制 / 标准化' }
    ]
  }
]

const TOPIC_CATEGORY_OPTIONS = [
  { key: 'mindset', label: '思维' },
  { key: 'site', label: '选址' },
  { key: 'open', label: '开业' },
  { key: 'operate', label: '经营' },
  { key: 'service', label: '服务' }
]

const TOPIC_SUBMIT_HINTS = [
  '用一句话说清你的真实困境',
  '例如：商场店人流大但不转化',
  '例如：开业后第二周就开始下滑',
  '例如：点评分卡在 4.0 不知道怎么提'
]

/** @deprecated 使用 COMMUNITY_TOPICS */
const HOT_TOPICS = COMMUNITY_TOPICS.map(({ id, label }) => ({ id, label }))

const COMMUNITY_FEED = [
  {
    id: 'feed1',
    user: '餐饮老板·成都',
    tag: 'L1诊断',
    text: '终于搞懂保本销量怎么算了'
  },
  {
    id: 'feed2',
    user: '酒店合伙人·重庆',
    tag: '筹备中',
    text: 'A3 选品模块很有帮助'
  }
]

const IP_GRID_META = [
  { key: 'mindset', color: '#E85D4C' },
  { key: 'site', color: '#F5A623' },
  { key: 'open', color: '#3DAA8C' },
  { key: 'operate', color: '#1A3668' },
  { key: 'service', color: '#8B5CF6' }
]

const STATS = [
  { id: 'experience', value: '20年', label: '行业经验' },
  { id: 'industries', value: '18', label: '业态覆盖' },
  { id: 'products', value: 'L1–L9', label: '咨询梯度' }
]

const STAT_DETAILS = {
  experience: {
    title: '20年行业经验',
    subtitle: '从一线门店到管理咨询',
    intro:
      '头大大在餐饮、酒店、夜场及广义服务业深耕二十年，经历过筹备、开业、爬坡、多店复制与经营危机诊断的全周期。咨询不是纸上谈兵，而是把一线踩过的坑、算过的账，翻译成老板听得懂、店里用得上的方案。',
    highlights: [
      { title: '一线操盘', desc: '门店筹备、开业、日常经营与团队管理，懂店长和老板各自在愁什么。' },
      { title: '多业态沉淀', desc: '正餐、小吃、酒店餐饮、夜场、茶馆等场景都做过深度服务，不是只会一种模型。' },
      { title: '内容 + 咨询', desc: '「头大大谈经营」IP 持续输出避坑与算账逻辑，咨询交付与内容同频，不脱节。' },
      { title: '结果导向', desc: '按诊断、模块、全案、陪跑分层服务，按里程碑交付成果，非按小时闲聊。' }
    ],
    footer: '以上为个人从业与咨询实践概括，具体项目范围以诊断沟通与合同约定为准。'
  },
  industries: {
    title: '18个业态覆盖',
    subtitle: '餐饮 · 酒店 · 夜场 · 服务业',
    intro:
      '不同业态毛利结构、人效模型、引流方式完全不同。头大大覆盖以下 18 类场景，能按业态给诊断口径，而不是套一套万能模板。',
    footer: '若您的业态未在列表中，可在咨询问卷备注说明，先做一次 L1 经营诊断再定模块。'
  },
  products: {
    title: 'L1–L9 咨询梯度',
    subtitle: '从轻诊断到战略陪跑',
    intro:
      '梯度不是「越贵越好」，而是按您当前阶段选配：先 L1 看清问题，再按需升 L2–L6 模块或全案，长期经营可上 L7–L9 顾问与体系化服务。',
    footer: 'L1 为 9.9 元/次（价值 500 元）经营诊断；L2–L9 仅展示服务说明，正式报价在 L1 沟通后书面给出，不承诺保证盈利。'
  }
}

const IP_COLUMNS = [
  {
    key: 'mindset',
    name: '头大大谈思维',
    desc: '经营思维，先想再做',
    points: [
      '开店前先算账，会算账比会炒菜更重要',
      '账上有钱不等于赚钱，别用感觉经营',
      '员工不操心，多半是机制没让操心有结果',
      '不承诺包赚，只交付能落地、能验收的方案',
      '垂直深耕一种业态，比啥都接的万能顾问更值钱',
      '每个动作都要有数字，热闹不等于有效'
    ]
  },
  {
    key: 'site',
    name: '头大大谈选址',
    desc: '位置定位，先看人群',
    points: [
      '人多不等于会进店，先看人流愿不愿为你的产品停下来',
      '选址先看消费场景，再看客流量',
      '先定一句话定位，再选铺子，别倒过来',
      '同一商圈至少比选 3～5 个点位，别凭感觉签租',
      '商场店看出店率，街铺看时段人流，夜场看集中消费时段',
      '选址失误，往往是一整年房租的沉没成本'
    ]
  },
  {
    key: 'open',
    name: '头大大谈开业',
    desc: '筹备节奏，开业不慌',
    points: [
      '开业不是终点，是复购的开始',
      '开业活动不只求热闹，要设计第二次来的理由',
      '先打通外卖团购再开业，别等平台慢慢审',
      '开业前制度、薪酬、表格先到位，再开门迎客',
      '7/15/30 天分阶段做活动，别三天把力气用完',
      '储值和下次券要在第一次消费时就埋下',
      '开业后 4～8 周陪跑，比开业当天更重要'
    ]
  },
  {
    key: 'operate',
    name: '头大大谈经营',
    desc: '定价毛利，日常操盘',
    points: [
      '定价先看自己的成本，别看同行卖多少',
      '卖得越多不等于赚越多，先算保本销量',
      '毛利、人工、房租占比要每周看得见',
      '点评先改三个服务动作，别急着买流量',
      '店长薪酬要连利润，固定工资养不出经营意识',
      '表格化管理不是填表，是让问题当天暴露',
      '活动没效果，先查转化链路，再加大投放'
    ]
  },
  {
    key: 'service',
    name: '头大大谈服务',
    desc: '客户体验，留住回头客',
    points: [
      '服务标准写清楚，客人体验才稳定',
      '一条差评背后往往是三个服务动作没做到',
      '回访比刷单实在，合规提分靠流程不是人头',
      '前厅后厨 SOP 一致，客人感受才不会断层',
      '留住回头客，比拉新客便宜得多',
      '服务不是态度好就行，要可检查、可复盘',
      '客户体验从进门第一秒开始，不是上菜那一刻'
    ]
  }
]

const PORTRAITS = [
  {
    id: 'p1',
    image: '/images/portraits/portrait-p1.jpg',
    caption: '经营咨询 · 桌前诊断'
  },
  {
    id: 'p2',
    image: '/images/portraits/portrait-p2.jpg',
    caption: '专业形象 · 商务正装'
  },
  {
    id: 'p3',
    image: '/images/portraits/portrait-p3.jpg',
    caption: '演说分享 · 行业交流'
  },
  {
    id: 'p4',
    image: '/images/portraits/portrait-p4.jpg',
    caption: '管理经验 · 分享授课'
  },
  {
    id: 'p5',
    image: '/images/portraits/portrait-p5.jpg',
    caption: '专业形象 · 领结正装'
  }
]

const ENDORSEMENT_GROUPS = [
  {
    id: 'yu',
    guest: '余世维',
    tag: '管理大师',
    title: '管理大师 · 深度交流',
    desc: '粉丝见面会 · 五星酒廊 · 坐而论道',
    cover: '/images/endorsements/yu-fan-meeting.jpg',
    photos: [
      {
        image: '/images/endorsements/yu-fan-meeting.jpg',
        title: '管理大师 · 粉丝见面会交流',
        desc: '新形势下的企业发展机遇与经营策略 · 坐而论道',
        tag: '管理咨询'
      },
      {
        image: '/images/endorsements/yu-hotel-lounge.jpg',
        title: '五星级酒店 · 深度交流',
        desc: '酒店场景下的经营思维与管理逻辑探讨',
        tag: '五星酒店'
      }
    ]
  },
  {
    id: 'feng',
    guest: '冯耀龙',
    tag: '餐饮实战派',
    title: '餐饮行业交流晚宴',
    desc: '晚宴交流 · 赠书留念',
    cover: '/images/endorsements/feng-yaolong-1.jpg',
    photos: [
      {
        image: '/images/endorsements/feng-yaolong-1.jpg',
        title: '餐饮行业交流晚宴',
        desc: '与餐饮业前辈席间探讨门店经营',
        tag: '行业晚宴'
      },
      {
        image: '/images/endorsements/feng-yaolong-2.jpg',
        title: '共进晚宴 · 赠书留念',
        desc: '晚宴席间交流，冯老师亲笔签名赠书',
        tag: '赠书交流'
      }
    ]
  }
]

const HERO_MAIN = {
  id: 'h1',
  template: 'image',
  image: '/images/hero/hero-brand-main.jpg',
  fallback: '/images/hero/hero-option-c.jpg',
  brandMark: 'TOU DA DA',
  title: '头大大管理咨询',
  subtitle: '一个让你提升经营思维的男人',
  desc: '新店指导 × 老店诊断 · NEW BUSINESS LINK'
}

const HERO_BANNERS = [
  {
    id: 'h2',
    image: '/images/portraits/portrait-main.jpg',
    fallback: '/images/hero/hero-work.png',
    title: '头大大管理咨询',
    subtitle: '一个让你提升经营思维的男人',
    desc: '餐饮 · 酒店 · 夜场 · 服务业'
  },
  {
    id: 'h3',
    image: '/images/endorsements/yu-hotel-lounge-hero.jpg',
    fallback: '/images/hero/hero-work.png',
    title: '与管理大师坐而论道',
    subtitle: '五星级酒店 · 深度交流',
    desc: '把管理思维落到门店经营诊断'
  }
]

const SERVICE_CASES = [
  {
    id: 'case1',
    title: '锦听酒店 · 经济舒适型',
    industry: '经济舒适型酒店',
    service: 'L8 多店体系化',
    scale: '20 家直营 · 80 家代运营',
    city: '成都 · 熊猫基地昭觉寺南路店',
    problem: '财务管控、部门内耗、管理协同、运营标准、薪酬体系',
    progress: '已交付 · 项目已结案',
    image: '/images/cases/case-jinting-panda.jpg'
  },
  {
    id: 'case2',
    title: '城南小馆',
    industry: '传统餐饮',
    service: '模块方案 · 营销与点评',
    problem: '引流转化、线上运营偏弱',
    progress: '已联系 · 方案沟通中',
    image: '/images/cases/case-restaurant.jpg'
  },
  {
    id: 'case3',
    title: '筹备中 · 粉面店',
    industry: '粉面小吃',
    service: '筹备咨询 · 先聊后深诊',
    problem: '选址、开业节奏不清晰',
    progress: '线索 · 问卷已提交',
    image: '/images/cases/case-prep.jpg'
  }
]

const GUEST_PROFILES = {
  feng: {
    name: '冯耀龙',
    tag: '餐饮实战派',
    lines: [
      '冯耀龙是餐饮实战派代表：曾任西贝餐饮首任 CEO，三十年餐企一线操盘与品牌策划，业界称「餐企良医」，著《餐饮管理之魂》等实务书。',
      '我曾与他多次晚宴交流、见面沟通，并授赠签名书给我。前辈把经营逻辑传授给我，并转化为您店里能落地的诊断与方法。'
    ]
  },
  yu: {
    name: '余世维',
    tag: '管理大师',
    lines: [
      '余世维被誉为「华人管理教育第一人」，曾任日本航空副总裁等职，深耕战略、执行力与组织管理，代表著作包括《有效沟通》《赢在执行》。',
      '我的定位是「一个让你提升经营思维的男人」——余老师教的正是经营背后的管理框架：定方向、带团队、抓执行，而不只盯着换菜单、做活动。',
      '见面会、五星酒廊与他的对谈，对我不是贴标签，而是把管理学语言翻译成餐饮·酒店·夜场老板听得懂的 L1 诊断与 L7–L9 陪跑。'
    ]
  }
}

const CREDENTIALS = [
  {
    year: '深耕服务业',
    title: '娱乐服务业 · 三十省七十城',
    desc: '二十年一线，足迹遍及三十余省、七十余城；覆盖餐饮、酒店、夜场及广义服务业，懂店里真实经营。'
  },
  {
    year: '内容 IP',
    title: '头大大谈经营',
    desc: '抖音 / 视频号主阵地，下设思维、选址、开业、经营、服务五个栏目；用真实经营逻辑帮老板少踩坑。'
  },
  {
    year: '咨询 OPC',
    title: '1 个创始人 + N 个 AI 协作',
    desc: '创始人负责判断、现场与对客户负责；方案经 5 段式交付与创始人审定。'
  },
  {
    year: '擅长方向',
    title: '经营诊断 · 运营优化 · 管理改进 · 业绩提升 · 薪酬改革',
    desc: '按里程碑交付方案与陪跑，把诊断结论落到店里能执行的动作，非按小时闲聊。'
  }
]

const SERVICE_SCOPES = [
  { name: '传统正餐', desc: '地方菜、宴席、家常菜等堂食模型' },
  { name: '粉面小吃', desc: '粉面、快餐、档口、高周转小店' },
  { name: '火锅串串', desc: '自助、单锅、串串、旋转小火锅' },
  { name: '烧烤烤肉', desc: '街边烧烤、韩式烤肉、露营烧烤' },
  { name: '艺术 / 主题餐', desc: '场景化、高设计感的主题餐饮' },
  { name: '音乐餐吧', desc: 'Live、演艺、餐+酒复合业态' },
  { name: '咖啡茶饮', desc: '咖啡馆、新式茶饮、轻食' },
  { name: '烘焙甜品', desc: '面包蛋糕、甜品站、伴手礼' },
  { name: '酒店餐饮', desc: '星级/精品酒店中餐、西餐、宴会' },
  { name: '酒店住宿', desc: '客房+餐饮联动、酒管经营' },
  { name: 'KTV', desc: '量贩、商务 K、派对房经营' },
  { name: '酒吧 / 清吧', desc: '鸡尾酒、精酿、夜店周边' },
  { name: '茶馆 / 新中式', desc: '茶空间、新中式酒馆、慢消费' },
  { name: '夜宵档口', desc: '夜市、宵夜、外卖主攻' },
  { name: '景区餐饮', desc: '景区、街区、综合体配套' },
  { name: '团餐 / 食堂', desc: '企业团餐、学校、园区食堂' },
  { name: '连锁加盟', desc: '多店复制、加盟体系、标准化' },
  { name: '其他服务业', desc: '美容、娱乐、休闲等线下门店' }
]

/** L1 体验价 · 小程序与报价单共用口径 */
const L1_PROMOTION = {
  active: true,
  promoPrice: '9.9',
  originalPrice: '500',
  unit: '元/次',
  valueLabel: '价值 500 元',
  priceLabel: '9.9 元/次（价值 500 元）'
}

const PRODUCT_LEVELS = [
  {
    level: 'L1',
    name: '经营诊断',
    note: '按次 · 入门',
    priceRange: '9.9 元/次（价值 500 元）',
    priceFrom: '9.9 元/次',
    originalPrice: '500 元/次',
    billing: '按次',
    cycle: '3–7 个工作日',
    opcAlign: 'OPC · L1 经营诊断 / 神秘客',
    desc: '5 题问卷 + 基础沟通，输出问题清单与优先级建议，帮您决定下一步该做哪个模块。',
    deliverables: '现状摘要 · 问题清单 · 优先级建议 · 升单路径说明'
  },
  {
    level: 'L2',
    name: '筹备模块',
    note: '按项 · 单点',
    priceRange: '8,800 – 28,800 元/项',
    priceFrom: '8,800 元/项起',
    billing: '按项（A1–A12 任选）',
    cycle: '1–3 周/项',
    opcAlign: 'OPC · L2 筹备模块',
    desc: '选址、菜单、证照、动线、开业节奏等筹备期单模块方案与清单。',
    deliverables: '单模块方案 · 执行清单 · 验收标准'
  },
  {
    level: 'L3',
    name: '筹备全案',
    note: '项目制 · 从 0 到 1',
    priceRange: '88,000 – 268,000 元/店',
    priceFrom: '88,000 元/店起',
    billing: '项目制 · 里程碑',
    cycle: '8–16 周',
    opcAlign: 'OPC · L3 筹备全案',
    desc: '新店从选址到开业的一体化筹备方案，含里程碑节点与验收标准。',
    deliverables: 'A1–A12 整合方案 · M1–M7 里程碑 · 开业陪跑'
  },
  {
    level: 'L4',
    name: '经营模块',
    note: '按项 · 单点突破',
    priceRange: '6,800 – 22,800 元/项',
    priceFrom: '6,800 元/项起',
    billing: '按项',
    cycle: '1–3 周/项',
    opcAlign: 'OPC · B1 经营诊断模块 / 单点优化',
    desc: '定价毛利、人效薪酬、成本管控、排班 SOP 等经营期单模块优化。',
    deliverables: '单模块方案 · 表格工具包 · 落地清单'
  },
  {
    level: 'L5',
    name: '经营优化方案',
    note: '组合 · 短期',
    priceRange: '28,800 – 68,000 元/案',
    priceFrom: '28,800 元/案起',
    billing: '组合项目制',
    cycle: '8–12 周',
    opcAlign: 'OPC · 多模块组合（如 A4+A7+A8）',
    desc: '多模块组合（如定价+人效+成本），8–12 周落地节奏与复盘表。',
    deliverables: '组合方案 · 周节奏表 · 30/60/90 复盘模板'
  },
  {
    level: 'L6',
    name: '季度营销方案',
    note: '按季 · 节点',
    priceRange: '12,800 – 38,000 元/季',
    priceFrom: '12,800 元/季起',
    billing: '按季',
    cycle: '1 个自然季',
    opcAlign: 'OPC · L4/B2 季度营销',
    desc: '季度营销日历、大众点评/抖音合规运营、活动与转化链路设计。',
    deliverables: '营销日历 · 活动方案 · 合规运营 SOP'
  },
  {
    level: 'L7',
    name: '长期顾问 / 陪跑',
    note: '月费 / 周包',
    priceRange: '9,800 – 28,000 元/月',
    priceFrom: '9,800 元/月起',
    billing: '月费或 4–12 周包',
    cycle: '4–12 周起',
    opcAlign: 'OPC · L7 长期顾问 / 短期陪跑',
    desc: '按月或按周远程+现场陪跑，盯数据、纠偏、陪执行，适合已开业需持续纠偏。',
    deliverables: '周例会 · 数据看板 · 纠偏清单 · 现场陪跑（按约定）'
  },
  {
    level: 'L8',
    name: '多店体系化',
    note: '项目制 · 复制',
    priceRange: '128,000 – 580,000 元/体系',
    priceFrom: '128,000 元起',
    billing: '项目制 · 按里程碑',
    cycle: '3–6 个月',
    opcAlign: 'OPC · 多店复制 / 体系化（L8 扩展档）',
    desc: '标准化手册、店长培养、巡店机制、多店财务模型，支撑第二家店起复制。',
    deliverables: '标准手册 · 巡店机制 · 店长培养 · 多店财务模型'
  },
  {
    level: 'L9',
    name: '战略与品牌陪跑',
    note: '年度 · 顶层设计',
    priceRange: '188,000 – 880,000 元/年',
    priceFrom: '188,000 元/年起',
    billing: '年度顾问制',
    cycle: '12 个月',
    opcAlign: 'OPC · 战略层顾问（L9 扩展档）',
    desc: '品牌定位、扩张节奏、合伙/分润机制、组织与战略节奏，适合多店与品牌期老板。',
    deliverables: '战略节奏图 · 品牌定位 · 合伙机制 · 季度复盘'
  }
]

/** 报价政策 · 小程序与报价单共用口径 */
const PRICING_POLICY = {
  headline: '报价说明 · 以诊断沟通为准',
  l1PromoNote: 'L1 经营诊断：9.9 元/次（价值 500 元），以沟通确认为准。',
  disclaimer:
    'L2–L9 不在小程序展示参考价；夜场、酒店、艺术/音乐餐饮等复杂度另议，多店按规模另议。正式报价在 L1 诊断沟通后给出书面说明，不承诺保证盈利。',
  validDays: 15
}

/** 筹备期单模块 A1–A12 · 与 L2 对照 */
const PREP_MODULES = [
  { code: 'A1', name: '选址', range: '12,800 – 28,800 元' },
  { code: 'A2', name: '装修注意事项', range: '8,800 – 18,800 元' },
  { code: 'A3', name: '选品/供应链/餐具', range: '8,800 – 22,800 元' },
  { code: 'A4', name: '定价', range: '8,800 – 18,800 元' },
  { code: 'A5', name: '定位', range: '12,800 – 28,800 元' },
  { code: 'A6', name: '制度手册', range: '12,800 – 32,800 元' },
  { code: 'A7', name: '薪酬', range: '12,800 – 28,800 元' },
  { code: 'A8', name: '日常表格化', range: '6,800 – 15,800 元' },
  { code: 'A9', name: '管理人员筛选考核', range: '8,800 – 18,800 元' },
  { code: 'A10', name: '前期线上运营', range: '8,800 – 22,800 元' },
  { code: 'A11', name: '外卖团购开通', range: '6,800 – 15,800 元' },
  { code: 'A12', name: '开业活动', range: '12,800 – 32,800 元' }
]

const COMPLIANCE =
  '不承诺保证盈利；不提供刷单买评；正式方案仅发创始人审定版。与名人合影仅为交流学习记录，不代表官方代言或联合背书。'


window.TDContent = { BRAND, HOME_COMMUNITY, FOUNDER_TOPICS, COMMUNITY_TOPICS, COMMUNITY_FEED, IP_COLUMNS, IP_GRID_META, SERVICE_CASES, PRODUCT_LEVELS, PORTRAITS, ENDORSEMENT_GROUPS, GUEST_PROFILES, CREDENTIALS, SERVICE_SCOPES, COMPLIANCE, TOPIC_SUBMIT_HINTS, TOPIC_CATEGORY_OPTIONS };

/* global bundle: TDConstants */
const STAGES = {
  LEAD: '线索',
  CONTACTED: '已联系',
  DIAGNOSING: '诊断中',
  DELIVERING: '交付中',
  CLOSED: '已结案'
}

const STAGE_LIST = [
  { key: 'LEAD', label: STAGES.LEAD },
  { key: 'CONTACTED', label: STAGES.CONTACTED },
  { key: 'DIAGNOSING', label: STAGES.DIAGNOSING },
  { key: 'DELIVERING', label: STAGES.DELIVERING },
  { key: 'CLOSED', label: STAGES.CLOSED }
]

const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client'
}

const QUESTIONS = [
  {
    id: 'q1',
    title: '您目前处于哪个阶段？',
    subtitle: '请选择最符合您现状的一项',
    type: 'single',
    field: 'q1_stage',
    options: [
      '准备开店 / 筹备中',
      '已开业，经营正常想优化',
      '已开业，经营困难想诊断',
      '多店经营，想体系化 / 复制'
    ]
  },
  {
    id: 'q2',
    title: '您现在最头疼的是什么？',
    subtitle: '可多选，最多选 3 项',
    type: 'multiple',
    max: 3,
    field: 'q2_painPoints',
    options: [
      '选址 / 定位不对',
      '定价 / 毛利 / 成本控不住',
      '人员 / 薪酬 / 管理混乱',
      '大众点评 / 线上运营',
      '营销 / 引流 / 转化',
      '筹备 / 开业节奏',
      '多店复制 / 标准化',
      '其他（可在备注里补充一句）'
    ]
  },
  {
    id: 'q3',
    title: '您目前有几家门店？',
    subtitle: '请选择一项',
    type: 'single',
    field: 'q3_storeCount',
    options: [
      '还没开店（筹备中）',
      '1 家',
      '2–3 家',
      '4–9 家',
      '10 家及以上'
    ]
  },
  {
    id: 'q4',
    title: '您希望通过咨询优先获得什么？',
    subtitle: '请选择最优先的一项',
    type: 'single',
    field: 'q4_expectation',
    options: [
      '先做一次经营诊断（L1）',
      '某一模块方案（如选址/定价/点评等）',
      '筹备或经营全案',
      '短期陪跑 / 长期顾问',
      '还不确定，想先聊聊'
    ]
  },
  {
    id: 'q5',
    title: '您愿意配合提供哪些信息？',
    subtitle: '可多选',
    type: 'multiple',
    field: 'q5_dataWillingness',
    options: [
      '基础经营数据（营业额/毛利等）',
      '门店照片 / 菜单 / 点评截图',
      '人员与组织架构情况',
      '暂时只能先聊情况，稍后再提供数据',
      '希望先签保密 / 预览版后再深入'
    ]
  }
]

const INDUSTRY_TYPES = [
  '传统餐饮',
  '粉面小吃 / 快餐',
  '酒店餐饮',
  '夜场 / 酒吧 / KTV',
  '茶馆 / 新中式',
  '其他服务业'
]

const INVESTMENT_STATUS = [
  '筹备中（计划投资）',
  '已开业（已投入）'
]

const INVESTMENT_RANGES = [
  '10 万以内',
  '10–30 万',
  '30–80 万',
  '80 万以上',
  '不便透露'
]

const AGE_RANGES = [
  '25 岁以下',
  '25–35 岁',
  '36–45 岁',
  '46–55 岁',
  '55 岁以上',
  '不填写'
]

const GENDERS = [
  '男',
  '女',
  '不填写'
]

const PENDING_CONSULT_KEY = 'toudada_pending_consult'

const DELIVER_STATUS_OPTIONS = ['未交付', '预览版', '正式版', '已交付']

const PRIVACY_POLICY_VERSION = '2026-06-15'

function buildSummary(answers, basicInfo = {}) {
  const painPoints = (answers.q2_painPoints || []).join('、') || '未选'
  const willingness = (answers.q5_dataWillingness || []).join(' + ') || '未选'
  const lines = [
    '【新咨询线索】',
    `阶段：${answers.q1_stage || '未选'}`,
    `核心问题：${painPoints}`,
    `门店数：${answers.q3_storeCount || '未选'}`,
    `期望：${answers.q4_expectation || '未选'}`,
    `配合度：${willingness}`
  ]

  if (basicInfo.industryType) {
    lines.push(`业态：${basicInfo.industryType}`)
  }
  if (basicInfo.investmentStatus && basicInfo.investmentRange) {
    lines.push(`投资：${basicInfo.investmentStatus} · ${basicInfo.investmentRange}`)
  }
  if (basicInfo.city) {
    lines.push(`城市：${basicInfo.city}`)
  }
  if (basicInfo.phone) {
    lines.push(`电话：${basicInfo.phone}`)
  }
  const profile = [basicInfo.age, basicInfo.gender]
    .filter((item) => item && item !== '不填写')
    .join(' · ')
  if (profile) {
    lines.push(`画像：${profile}`)
  }

  return lines.join('\n')
}


window.TDConstants = { QUESTIONS, INDUSTRY_TYPES, INVESTMENT_STATUS, INVESTMENT_RANGES, AGE_RANGES, GENDERS, PENDING_CONSULT_KEY, buildSummary };

/* global bundle: TDGameCatalog */
/**
 * 头大大 · 测测大厅目录
 * status: live 可测 | soon 即将上线
 */
const GAME_CATALOG = [
  {
    id: 'store',
    title: '门店估值测评',
    subtitle: '九宫格快测 · 纯属娱乐',
    desc: '10 轮选题，估一估你的店值多少。测完可晒朋友圈，朋友也能回首页。',
    emoji: '🏪',
    color: '#3DAA8C',
    status: 'live',
    tags: ['引流爆款', '已上线']
  },
  {
    id: 'mgmt',
    title: '管理能力测评',
    subtitle: '带团队 · 做决策 · 控执行',
    desc: '从排优先级、用人、控成本等维度，娱乐测算你的管理段位。',
    emoji: '👔',
    color: '#1A3668',
    status: 'soon',
    path: '',
    tags: ['组织团队', '即将上线']
  },
  {
    id: 'biz',
    title: '经营能力测评',
    subtitle: '看模型 · 算账 · 抓机会',
    desc: '围绕盈利模型、成本结构、增长节奏，测你的经营者类型与短板。',
    emoji: '📈',
    color: '#E85D4C',
    status: 'soon',
    path: '',
    tags: ['模型诊断', '即将上线']
  },
  {
    id: 'potential',
    title: '个人潜能测评',
    subtitle: '学习力 · 抗压 · 沟通创新',
    desc: '娱乐画像你的潜能组合，头大大给一句成长向判断（非心理测评）。',
    emoji: '✨',
    color: '#8B5CF6',
    status: 'soon',
    path: '',
    tags: ['个人成长', '即将上线']
  }
]

const HUB_META = {
  badge: '纯属娱乐',
  title: '头大大 · 测测',
  slogan: '测一测，晒一晒，把店况与能力算清楚',
  footnote: '均为娱乐向快测，不构成正式评估或投资建议'
}

function getLiveGames() {
  return GAME_CATALOG.filter((g) => g.status === 'live')
}

function getGameById(id) {
  return GAME_CATALOG.find((g) => g.id === id) || null
}


window.TDGameCatalog = { GAME_CATALOG, HUB_META, getGameById, getLiveGames };

const ROUNDS = [
  { q: '你的店在哪个城市能级？', cells: ['一线核心', '一线外围', '新一线', '强二线', '普通二线', '三线市区', '三线县城', '四线', '更小城镇'], scores: [1.35, 1.25, 1.15, 1.05, 0.95, 0.85, 0.78, 0.7, 0.62] },
  { q: '主要业态是？', cells: ['正餐中餐', '火锅烧烤', '小吃快餐', '咖啡茶饮', '烘焙甜品', '酒吧夜场', '酒店民宿', '团餐食堂', '其他业态'], scores: [1.0, 1.08, 0.92, 1.05, 0.88, 1.12, 1.15, 0.85, 0.9] },
  { q: '实用面积大概？', cells: ['小于30㎡', '30–60㎡', '60–100㎡', '100–180㎡', '180–300㎡', '300–500㎡', '500–800㎡', '800–2000㎡', '2000㎡+'], scores: [0.48, 0.58, 0.72, 0.85, 0.95, 1.0, 1.1, 1.08, 1.05] },
  { q: '门口位置体感？', cells: ['死角难找', '里巷深处', '一般街面', '社区口', '商场内', '写字楼底', '地铁口', '景区旁', '角铺醒目'], scores: [0.65, 0.78, 0.88, 0.95, 1.0, 0.98, 1.15, 1.08, 1.12] },
  { q: '月营业额大概？', cells: ['小于3万', '3–8万', '8–15万', '15–30万', '30–50万', '50–80万', '80–120万', '120–300万', '300万+'], scores: [0.5, 0.62, 0.75, 0.88, 1.0, 1.12, 1.25, 1.4, 1.55] },
  { q: '租金压力如何？', cells: ['几乎忽略', '很轻松', '还能接受', '略紧', '偏紧', '比较吃紧', '很吃紧', '快扛不住', '压垮利润'], scores: [1.15, 1.1, 1.05, 1.0, 0.92, 0.82, 0.72, 0.62, 0.5] },
  { q: '经营多久了？', cells: ['还没开', '＜3月', '3–6月', '6–12月', '1–2年', '2–3年', '3–5年', '5–8年', '8年+'], scores: [0.75, 0.82, 0.88, 0.95, 1.0, 1.05, 1.08, 1.02, 0.95] },
  { q: '线上口碑怎样？', cells: ['没怎么做', '刚起步', '一般般', '还行', '偏好', '评分高', '好评如潮', '达人带过', '本地网红'], scores: [0.78, 0.85, 0.9, 0.95, 1.0, 1.08, 1.12, 1.15, 1.18] },
  { q: '团队人效体感？', cells: ['严重超员', '人偏多', '略多', '刚好', '略紧', '偏紧', '高效', '一人多岗', '老板全包'], scores: [0.72, 0.82, 0.9, 1.0, 1.05, 1.08, 1.12, 1.05, 0.88] },
  { q: '若转让最舍不得？', cells: ['老客情', '装修氛围', '好位置', '设备齐全', '团队默契', '品牌口碑', '供应商', '老板面子', '其实都想换'], scores: [1.08, 1.02, 1.15, 0.95, 1.0, 1.1, 0.92, 0.75, 0.65] }
]

const GUIDE_PATHS = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [8, 7, 6, 5, 4, 3, 2, 1, 0],
  [0, 2, 4, 6, 8],
  [0, 1, 2, 5, 8, 7, 6, 3],
  [8, 5, 4, 3, 2, 1, 0]
]

const ROUND_DECO = [
  ['🌆', '🏙️', '🏘️', '🗺️', '🏢', '🌃', '🚇', '🌉', '🏪'],
  ['🍜', '🍲', '🥡', '☕', '🧁', '🍻', '🏨', '🍱', '🍽️'],
  ['📐', '📏', '🏠', '🏪', '🏬', '🏢', '🏛️', '🏗️', '📊'],
  ['📍', '🛣️', '🏘️', '🛒', '🏬', '🏢', '🚇', '⛰️', '🔶'],
  ['💴', '💰', '📈', '💵', '🧾', '📊', '💳', '🪙', '💎'],
  ['🏠', '💸', '📉', '⏳', '⚖️', '📋', '🧮', '🔻', '🏚️'],
  ['📅', '⏱️', '🗓️', '⌛', '🕐', '📆', '🔄', '⏳', '🎯'],
  ['⭐', '💬', '👍', '📱', '🌟', '✨', '🗣️', '🏆', '💭'],
  ['👥', '🧑‍🍳', '🤝', '⚙️', '📋', '🏃', '💪', '🎯', '👔'],
  ['🤝', '🏠', '🔧', '👋', '💼', '📦', '🎖️', '🎭', '🔄']
]

const CELL_BGS = ['#eef4fb', '#eef9f4', '#fff8f0', '#fdf2f8', '#f5f3ff', '#ecfdf5', '#fffbeb', '#fff1f2', '#f8fafc']

const TAGS = [
  { min: 0, max: 25, tag: '壳价等待有缘人', quote: '店的价值不全在账面，先搞清模型，再谈店价。' },
  { min: 25, max: 60, tag: '轻资产小铺型', quote: '小铺看位置和周转，别被装修沉没成本绑住。' },
  { min: 60, max: 150, tag: '社区稳健型', quote: '能稳定出餐、稳定复购，就已经赢很多店。' },
  { min: 150, max: 350, tag: '现金流不错', quote: '营业额好看不够，扣完租和人效还赚钱才算数。' },
  { min: 350, max: 800, tag: '被低估的小金库', quote: '这种店别急着贱卖，先把数据整理给懂行的人看。' },
  { min: 800, max: 99999, tag: '老板该涨薪了', quote: '模型跑通了，接下来是标准化，不是盲目扩张。' }
]

const LOSS_TAGS = [
  { min: 0, max: 20, tag: '转型试验田', quote: '亏的不是店，是还没算清的账。先诊断，再决定转还是关。' },
  { min: 20, max: 50, tag: '壳价型 · 先救模型', quote: '位置未必差，模型可能错了——别急着挂牌转让。' },
  { min: 50, max: 120, tag: '有救的亏损店', quote: '减损、改产品结构、压租金，有时比转让更划算。' },
  { min: 120, max: 99999, tag: '亏但仍有筹码', quote: '老客、位置、设备都是筹码，关键看你怎么打。' }
]


window.TDStoreData = { ROUNDS, GUIDE_PATHS, ROUND_DECO, CELL_BGS, TAGS, LOSS_TAGS };
const REVENUE_ANNUAL = [24, 72, 150, 300, 540, 840, 1320, 2640, 4200]
const AREA_ASSET = [6, 12, 22, 38, 58, 95, 150, 260, 420]
const RENT_MARGIN = [0.03, 0.025, 0.015, 0, -0.01, -0.025, -0.04, -0.06, -0.09]
const TEAM_MARGIN = [-0.025, -0.015, -0.008, 0, 0.006, 0.012, 0.018, 0.01, -0.012]

function tier3(idx) {
  return idx < 3 ? 0 : idx < 6 ? 1 : 2
}

function cellIdxFrom(allAnswers, roundIdx) {
  const a = allAnswers.find((x) => x.round === roundIdx)
  return a ? a.cellIndex : 4
}

function buildRA(type) {
  const table = []
  for (let r = 0; r < 9; r++) {
    for (let ab = 0; ab < 3; ab++) {
      const R = REVENUE_ANNUAL[r]
      const A = AREA_ASSET[ab * 3 + 1]
      let v
      if (type === 'profit') {
        const margin = [0.07, 0.1, 0.13][ab]
        const mult = [2.2, 2.6, 3.0][Math.min(2, Math.floor(r / 3))]
        v = Math.max(R * margin * mult, R * [0.18, 0.24, 0.3][ab] + A * [0.32, 0.4, 0.48][ab])
      } else if (type === 'loss') {
        const salvage = A * [0.38, 0.52, 0.62][ab]
        const revTrap = R * [0.11, 0.08, 0.05][ab]
        const ops = Math.max(R * -0.02 * 1.4, -revTrap)
        v = Math.max(salvage + ops, R * 0.04 + A * 0.22)
      } else {
        v = A * [0.72, 0.88, 1.05][ab] + R * [0.04, 0.07, 0.1][ab] + [8, 14, 22][ab]
      }
      table.push(v)
    }
  }
  return table
}

function buildCtx(type) {
  const table = []
  for (let c = 0; c < 3; c++) {
    for (let l = 0; l < 3; l++) {
      for (let p = 0; p < 3; p++) {
        let v
        if (type === 'profit') {
          v = 0.62 + c * 0.11 + l * 0.13 + p * 0.1
          if (c === 2 && l === 2) v += 0.06
          if (p === 2 && l >= 1) v += 0.04
        } else if (type === 'loss') {
          v = 0.48 + l * 0.16 + c * 0.07 + p * 0.05
          if (l === 2) v += 0.05
        } else {
          v = 0.55 + c * 0.14 + l * 0.12 + p * 0.06
          if (c >= 1 && l >= 1) v += 0.05
        }
        table.push(v)
      }
    }
  }
  return table
}

const RA = { profit: buildRA('profit'), loss: buildRA('loss'), prep: buildRA('prep') }
const CTX = { profit: buildCtx('profit'), loss: buildCtx('loss'), prep: buildCtx('prep') }

function fineTune(type, allAnswers) {
  const biz = cellIdxFrom(allAnswers, 1)
  const rent = cellIdxFrom(allAnswers, 5)
  const age = cellIdxFrom(allAnswers, 6)
  const team = cellIdxFrom(allAnswers, 8)
  const xfer = cellIdxFrom(allAnswers, 9)
  const bizM = ROUNDS[1].scores[biz]
  const rentM = ROUNDS[5].scores[rent]
  const ageM = ROUNDS[6].scores[age]
  const teamM = ROUNDS[8].scores[team]
  const xferM = ROUNDS[9].scores[xfer]
  if (type === 'profit') {
    const margin = 0.1 + RENT_MARGIN[rent] + TEAM_MARGIN[team]
    return (bizM * 0.22 + rentM * 0.28 + ageM * 0.18 + teamM * 0.18 + xferM * 0.14) * (0.88 + Math.max(0, margin - 0.08) * 1.2)
  }
  if (type === 'loss') {
    return rentM * 0.35 + xferM * 0.25 + bizM * 0.15 + ageM * 0.15 + teamM * 0.1
  }
  return bizM * 0.28 + ageM * 0.26 + rentM * 0.2 + teamM * 0.14 + xferM * 0.12
}

function calcValuation(shopType, answers) {
  const rev = cellIdxFrom(answers, 4)
  const area = cellIdxFrom(answers, 2)
  const city = cellIdxFrom(answers, 0)
  const loc = cellIdxFrom(answers, 3)
  const rep = cellIdxFrom(answers, 7)
  const ri = rev * 3 + tier3(area)
  const ci = tier3(city) * 9 + tier3(loc) * 3 + tier3(rep)
  let mid = RA[shopType][ri] * CTX[shopType][ci] * fineTune(shopType, answers)
  if (shopType === 'loss') mid *= 0.68
  if (shopType === 'prep') mid *= 0.82
  if (!answers.some((a) => a.auto)) mid *= 1.03
  mid = Math.max(5, Math.min(6000, mid))
  const spread = mid < 40 ? 4 : mid < 120 ? 8 : mid < 400 ? 15 : mid < 1000 ? 30 : 50
  const low = Math.max(3, Math.round(mid - spread))
  const high = Math.round(mid + spread)
  const tagList = shopType === 'loss' ? LOSS_TAGS : TAGS
  const hit = tagList.find((t) => mid >= t.min && mid < t.max) || tagList[tagList.length - 1]
  const dims = [
    { name: '位置', v: avgScores(answers, [3, 9]) },
    { name: '模型', v: avgScores(answers, [4, 5, 8]) },
    { name: '成本', v: avgScores(answers, [5, 6]) },
    { name: '线上', v: avgScores(answers, [7]) },
    { name: '团队', v: avgScores(answers, [8]) }
  ]
  return {
    low,
    high,
    mid: Math.round(mid),
    tag: hit.tag,
    quote: hit.quote,
    dims
  }
}

function avgScores(answers, indices) {
  const vals = indices.map((i) => {
    const a = answers.find((x) => x.round === i)
    return a ? a.score : 1
  })
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  return Math.min(100, Math.round((avg / 1.2) * 100))
}

function isHighResult(shopType, result) {
  if (!result) return false
  if (shopType === 'profit') return result.mid >= 350
  if (shopType === 'prep') return result.mid >= 200
  return result.mid >= 120
}

function buildShareText(shopType, result) {
  const range = result.low + '–' + result.high
  if (result.mid >= 800) {
    return '我的店娱乐估值约 ' + range + ' 万！（纯属娱乐）老板，你的店值多少？也来测一测 → 头大大'
  }
  if (isHighResult(shopType, result)) {
    return '刚测完，我的店娱乐估值约 ' + range + ' 万（娱乐向）。你也来测测 → 头大大 · 门店估值测评'
  }
  return '我刚测完，我的店娱乐估值约 ' + range + ' 万（纯属娱乐）。老板，你的店值多少？也来测一测 → 头大大 · 门店估值测评'
}


window.TDStoreEngine = { calcValuation, isHighResult, buildShareText };

const GUIDE_MS = 520
const SHOP_TYPES = [
  { key: 'profit', title: '店在赚钱', desc: '按盈利模型估一估' },
  { key: 'loss', title: '店在亏钱', desc: '壳价 + 趣味折扣' },
  { key: 'prep', title: '还在筹备', desc: '预期值玩玩看' }
]

function createMeasureController(root, { onClose }) {
  let state = {
    view: 'list',
    phase: 'intro',
    shopType: '',
    roundIndex: 0,
    guideCell: 0,
    pickedCell: -1,
    locked: false,
    timeLeft: 10,
    playCount: 0,
    result: null,
    shareText: '',
    shareCode: '',
    highResult: false,
    audioMuted: false
  }
  let answers = []
  let guidePath = []
  let guideStep = 0
  let timer = null
  let guideTimer = null

  function clearTimers() {
    if (timer) clearInterval(timer)
    if (guideTimer) clearInterval(guideTimer)
    timer = null
    guideTimer = null
  }

  function render() {
    if (state.view === 'list') {
      root.innerHTML = renderList()
      bindList()
      return
    }
    root.innerHTML = renderGame()
    bindGame()
  }

  function renderList() {
    const live = window.TDGameCatalog.GAME_CATALOG.filter((g) => g.status === 'live').length
    const soon = window.TDGameCatalog.GAME_CATALOG.filter((g) => g.status === 'soon').length
    const cards = window.TDGameCatalog.GAME_CATALOG.map((item) => {
      const live = item.status === 'live'
      return `
        <article class="measure-card ${live ? '' : 'measure-card--soon'}" data-id="${item.id}" data-status="${item.status}">
          <div class="measure-card-accent" style="background:${item.color}"></div>
          <div class="measure-card-body">
            <div class="measure-card-top">
              <span class="measure-icon" style="background:${item.color}18;color:${item.color}">${item.emoji}</span>
              <span class="measure-status measure-status--${live ? 'live' : 'soon'}">${live ? '可测' : '即将上线'}</span>
            </div>
            <h3 class="measure-title">${window.TDUtils.esc(item.title)}</h3>
            <p class="measure-subtitle">${window.TDUtils.esc(item.subtitle)}</p>
            <p class="measure-desc">${window.TDUtils.esc(item.desc)}</p>
            <div class="measure-tags">${item.tags.map((t) => `<span class="measure-tag" style="color:${item.color};background:${item.color}14">${window.TDUtils.esc(t)}</span>`).join('')}</div>
            <p class="measure-cta ${live ? '' : 'measure-cta--muted'}">${live ? '立即开测 →' : '敬请期待'}</p>
          </div>
        </article>`
    }).join('')

    return `
      <div class="measure-panel">
        <div class="hub-hero">
          <span class="hub-badge">${window.TDUtils.esc(window.TDGameCatalog.HUB_META.badge)}</span>
          <h2 class="hub-title">${window.TDUtils.esc(window.TDGameCatalog.HUB_META.title)}</h2>
          <p class="hub-slogan">${window.TDUtils.esc(window.TDGameCatalog.HUB_META.slogan)}</p>
          <p class="hub-stats">${live} 款可测 · ${soon} 款筹备中</p>
        </div>
        <h3 class="hub-section-label">全部测评</h3>
        <div class="measure-list">${cards}</div>
        <p class="hub-footnote">${window.TDUtils.esc(window.TDGameCatalog.HUB_META.footnote)}</p>
      </div>`
  }

  function renderGame() {
    if (state.phase === 'intro') {
      const types = SHOP_TYPES.map(
        (t) => `
        <button type="button" class="type-btn type-btn--${t.key} ${state.shopType === t.key ? 'selected' : ''}" data-type="${t.key}">
          <strong>${window.TDUtils.esc(t.title)}</strong>
          <span>${window.TDUtils.esc(t.desc)}</span>
        </button>`
      ).join('')
      return `
        <div class="measure-panel sv-page">
          <button type="button" class="sv-back-hub" data-action="back-list">← 返回测测列表</button>
          <div class="sv-hero">
            <span class="sv-badge">纯属娱乐</span>
            <h2 class="sv-title">门店估值测评</h2>
            <p class="sv-sub">九宫格快测 · 10 轮选题 · 看准光框点停</p>
          </div>
          <div class="card sv-card">
            <p class="sv-label">先选你现在的店况：</p>
            <div class="type-list">${types}</div>
          </div>
          <button type="button" class="btn-primary sv-start" data-action="start" ${state.shopType ? '' : 'disabled'}>开始测算</button>
          <p class="sv-foot">本测试纯属娱乐，不构成转让、投资或定价建议。</p>
        </div>`
    }

    if (state.phase === 'play') {
      const round = window.TDStoreData.ROUNDS[state.roundIndex]
      const cells = round.cells
        .map(
          (label, index) => `
          <button type="button" class="sv-cell ${state.guideCell === index ? 'guide' : ''} ${state.pickedCell === index ? 'picked' : ''} ${state.locked ? 'locked' : ''}"
            style="background:${window.TDStoreData.CELL_BGS[index]}" data-index="${index}">
            <div class="sv-cell-head">
              <span class="sv-cell-num">${index + 1}</span>
              <span class="sv-cell-deco">${window.TDStoreData.ROUND_DECO[state.roundIndex][index]}</span>
            </div>
            <span class="sv-cell-label">${window.TDUtils.esc(label)}</span>
          </button>`
        )
        .join('')
      const dots = Array.from({ length: 10 })
        .map((_, i) => `<span class="sv-dot ${i < state.roundIndex ? 'done' : i === state.roundIndex ? 'current' : ''}"></span>`)
        .join('')
      return `
        <div class="measure-panel sv-page sv-play">
          <div class="sv-play-top">
            <span class="sv-hint">看准转圈的光框 · 点停在哪算哪</span>
            <span class="sv-timer ${state.timeLeft <= 3 ? 'urgent' : ''}">${state.timeLeft}</span>
          </div>
          <div class="card sv-card">
            <p class="sv-question">${window.TDUtils.esc(round.q)}</p>
            <div class="sv-grid">${cells}</div>
            <div class="sv-dots">${dots}</div>
          </div>
        </div>`
    }

    const r = state.result
    const bars = r.dims
      .map((d) => `<div class="bar-row"><span class="bar-name">${window.TDUtils.esc(d.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${d.v}%"></div></div></div>`)
      .join('')
    return `
      <div class="measure-panel sv-page sv-result">
        <div class="sv-hero">
          <span class="sv-badge">第 ${state.playCount} 次测算完成</span>
          <h2 class="sv-title">娱乐估值</h2>
        </div>
        <div class="card sv-card">
          <p class="result-label">你的店 · 娱乐估值约</p>
          <p class="result-range">${r.low} – ${r.high} <span class="result-unit">万</span></p>
          <p class="result-tag">${window.TDUtils.esc(r.tag)}</p>
          <p class="result-quote"><strong>头大大说：</strong>${window.TDUtils.esc(r.quote)}</p>
          <div class="bar-list">${bars}</div>
        </div>
        <div class="card sv-share-card">
          <p class="share-label">${state.highResult ? '这估值，值得发给老板朋友' : '发给老板朋友，看看他的店值多少？'}</p>
          <p class="share-text">${window.TDUtils.esc(state.shareText)}</p>
          <div class="share-actions">
            <button type="button" class="btn-primary" data-action="copy-share">复制文案 + 链接</button>
            <button type="button" class="btn-secondary" data-action="copy-link">只复制测测链接</button>
          </div>
          <a href="?p=share&type=game" class="share-invite-link">需要二维码？打开邀请页（可发朋友圈）</a>
          <p class="share-hint">朋友<strong>点开链接</strong>就能玩，不用扫页面上的码</p>
        </div>
        <div class="sv-result-actions">
          <button type="button" class="btn-primary" data-action="replay">换选择重新测算</button>
          <button type="button" class="btn-secondary" data-action="back-list">返回测测列表</button>
          <button type="button" class="btn-secondary" data-action="close">关闭</button>
        </div>
        <p class="sv-foot">纯属娱乐 · 非正式评估报告</p>
      </div>`
  }

  function bindList() {
    root.querySelectorAll('.measure-card').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.dataset.id
        const status = el.dataset.status
        if (status === 'live' && id === 'store') {
          state.view = 'game'
          state.phase = 'intro'
          render()
        } else {
          alert('该测评即将上线，敬请期待')
        }
      })
    })
  }

  function bindGame() {
    window.TDUtils.onSel('[data-action="back-list"]', 'click', () => {
      clearTimers()
      state.view = 'list'
      state.phase = 'intro'
      state.shopType = ''
      render()
    }, root)
    window.TDUtils.onSel('[data-action="close"]', 'click', () => onClose(), root)
    window.TDUtils.onSel('[data-action="copy-share"]', 'click', async () => {
      const link = window.TDUtils.getGameShareUrl()
      const msg = `${state.shareText}\n${link}`
      const ok = await window.TDUtils.copyText(msg)
      window.TDUtils.showToast(ok ? '已复制，去微信粘贴发送吧' : '复制失败，请长按文案手动复制')
    }, root)
    window.TDUtils.onSel('[data-action="copy-link"]', 'click', async () => {
      const ok = await window.TDUtils.copyText(window.TDUtils.getGameShareUrl())
      window.TDUtils.showToast(ok ? '链接已复制' : '复制失败，请手动复制链接')
    }, root)
    window.TDUtils.onSel('[data-action="replay"]', 'click', () => {
      clearTimers()
      answers = []
      state.phase = 'intro'
      state.shopType = ''
      state.roundIndex = 0
      state.result = null
      render()
    }, root)
    root.querySelectorAll('[data-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.shopType = btn.dataset.type
        render()
      })
    })
    window.TDUtils.onSel('[data-action="start"]', 'click', () => {
      if (!state.shopType) return
      answers = []
      state.roundIndex = 0
      enterRound()
    }, root)
    root.querySelectorAll('[data-index]').forEach((cell) => {
      cell.addEventListener('click', () => pickCell(Number(cell.dataset.index), false))
    })
  }

  function enterRound() {
    clearTimers()
    const roundIndex = state.roundIndex
    const round = window.TDStoreData.ROUNDS[roundIndex]
    guidePath = window.TDStoreData.GUIDE_PATHS[roundIndex % window.TDStoreData.GUIDE_PATHS.length].slice()
    guideStep = 0
    state.phase = 'play'
    state.guideCell = guidePath[0]
    state.pickedCell = -1
    state.locked = false
    state.timeLeft = 10
    render()
    guideTimer = setInterval(() => {
      if (state.locked) return
      guideStep = (guideStep + 1) % guidePath.length
      state.guideCell = guidePath[guideStep]
      const cell = root.querySelector('.sv-cell.guide')
      if (cell) {
        root.querySelectorAll('.sv-cell').forEach((c) => c.classList.remove('guide'))
        const next = root.querySelector(`[data-index="${state.guideCell}"]`)
        if (next) next.classList.add('guide')
      }
    }, GUIDE_MS)
    timer = setInterval(() => {
      if (state.locked) return
      state.timeLeft -= 1
      const t = root.querySelector('.sv-timer')
      if (t) {
        t.textContent = state.timeLeft
        t.classList.toggle('urgent', state.timeLeft <= 3)
      }
      if (state.timeLeft <= 0) pickCell(state.guideCell, true)
    }, 1000)
  }

  function pickCell(index, auto) {
    if (state.locked) return
    clearTimers()
    const roundIndex = state.roundIndex
    const round = window.TDStoreData.ROUNDS[roundIndex]
    answers.push({ round: roundIndex, cellIndex: index, label: round.cells[index], score: round.scores[index], auto })
    state.locked = true
    state.pickedCell = index
    state.guideCell = index
    render()
    setTimeout(() => {
      const next = roundIndex + 1
      if (next >= 10) finishGame()
      else {
        state.roundIndex = next
        enterRound()
      }
    }, auto ? 420 : 560)
  }

  function finishGame() {
    const result = window.TDStoreEngine.calcValuation(state.shopType, answers)
    state.playCount += 1
    state.result = result
    state.shareText = window.TDStoreEngine.buildShareText(state.shopType, result)
    state.shareCode = window.TDUtils.buildShareCode(result)
    state.highResult = window.TDStoreEngine.isHighResult(state.shopType, result)
    state.phase = 'result'
    render()
  }

  return {
    openList() {
      state.view = 'list'
      render()
    },
    openStoreGame() {
      state.view = 'game'
      state.phase = 'intro'
      render()
    },
    destroy() {
      clearTimers()
    }
  }
}

window.createMeasureController = createMeasureController;

const LEADS_KEY = 'toudada_web_leads'
const app = document.getElementById('app')
const modalRoot = document.getElementById('modal-root')
let measureController = null
let expandedProduct = null

const draft = {
  answers: loadDraft(),
  basic: {},
  qIndex: 0,
  basicStep: 1
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(window.TDConstants.PENDING_CONSULT_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

function saveDraft() {
  localStorage.setItem(window.TDConstants.PENDING_CONSULT_KEY, JSON.stringify(draft.answers))
}

function hotTopics() {
  const founder = window.TDContent.FOUNDER_TOPICS.map((t) => ({ ...t, displayBadge: '阅读', displayCount: 0 }))
  const community = window.TDContent.COMMUNITY_TOPICS.map((t) => ({ ...t, displayCount: t.voteCount }))
  return founder.concat(community)
}

function ipGridItems() {
  return window.TDContent.IP_GRID_META.map((meta) => {
    const col = window.TDContent.IP_COLUMNS.find((c) => c.key === meta.key)
    if (!col) return null
    const shortName = col.name.replace('头大大谈', '')
    return { ...col, shortName, color: meta.color }
  }).filter(Boolean)
}

function route() {
  const params = new URLSearchParams(location.search)
  const fromQuery = params.get('p')
  if (fromQuery) {
    const sub = params.get('sub') || params.get('game') || ''
    return { page: fromQuery, sub }
  }
  const hash = location.hash.replace(/^#/, '') || 'home'
  const parts = hash.split('/')
  return { page: parts[0] || 'home', sub: parts[1] || '' }
}

function setActiveNav(page) {
  const navPage = page === 'consult' || page === 'questionnaire' ? 'consult' : page
  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.classList.toggle('active', el.dataset.nav === navPage)
  })
}

function renderSharePage() {
  const params = new URLSearchParams(location.search)
  const type = params.get('type') || 'home'
  const targets = {
    home: { title: '邀请朋友来逛逛', desc: '朋友点开链接，进入头大大谈经营首页', url: window.TDUtils.getHomeShareUrl(), cta: '进入首页', go: '?p=home' },
    game: { title: '邀请朋友来测一测', desc: '朋友点开链接，直接玩门店估值小游戏', url: window.TDUtils.getGameShareUrl(), cta: '我也测一测', go: '?p=measure&game=store' },
    consult: { title: '邀请朋友来咨询', desc: '朋友点开链接，填写 30 秒咨询问卷', url: window.TDUtils.getConsultUrl(), cta: '我要咨询', go: '?p=consult&sub=start' }
  }
  const t = targets[type] || targets.home

  app.innerHTML = `
    <div class="share-page card">
      <p class="share-page-badge">转发 / 分享专用页</p>
      <h1 class="share-page-title">${window.TDUtils.esc(t.title)}</h1>
      <p class="share-page-desc">${window.TDUtils.esc(t.desc)}</p>
      <p class="share-page-tip">你可以把<strong>链接</strong>发给微信好友，或保存下方<strong>二维码</strong>发朋友圈 / 打印物料</p>
      <canvas id="share-qr-canvas" width="220" height="220"></canvas>
      <p class="share-page-url" id="share-page-url">${window.TDUtils.esc(t.url)}</p>
      <div class="share-actions">
        <button type="button" class="btn-primary" id="share-copy-link">复制链接发给朋友</button>
        <a href="${window.TDUtils.esc(t.go)}" class="btn-secondary share-page-go">${window.TDUtils.esc(t.cta)}</a>
      </div>
      <a href="?p=home" class="share-page-back">← 返回首页</a>
    </div>`

  const canvas = document.getElementById('share-qr-canvas')
  if (canvas && window.QRCode) {
    QRCode.toCanvas(canvas, t.url, { width: 220, margin: 2, color: { dark: '#1a3668' } }).catch(() => {})
  }

  window.TDUtils.onId('share-copy-link', 'click', async () => {
    const ok = await window.TDUtils.copyText(t.url)
    window.TDUtils.showToast(ok ? '链接已复制，去微信粘贴发送吧' : '复制失败，请长按链接手动复制')
  })
}

function bindSiteNav() {
  function goHash(target) {
    location.hash = target || 'home'
    render()
  }

  function handleNavClick(e) {
    const link = e.target.closest('a[href^="#"], a[href^="?"]')
    if (!link) return
    const href = link.getAttribute('href')
    if (!href || href === '#') return
    if (href.startsWith('?')) return
    e.preventDefault()
    goHash(href.slice(1))
  }

  document.addEventListener('click', handleNavClick, false)
  document.addEventListener('touchend', handleNavClick, false)

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-go]')
    if (!el) return
    e.preventDefault()
    goHash(el.getAttribute('data-go'))
  }, false)
}

function renderHome() {
  const topics = hotTopics()
  const topicChips = topics
    .map(
      (t, i) => `
      <button type="button" class="topic-chip ${t.isFounder ? 'topic-chip--founder' : ''}" data-topic-index="${i}">
        ${t.isFounder ? '<span class="topic-chip-founder">头大大</span>' : ''}
        #${window.TDUtils.esc(t.label)}
        <span class="topic-chip-count">${t.isFounder ? t.displayBadge : t.displayCount + ' 人关注'}</span>
      </button>`
    )
    .join('')

  const ipCards = ipGridItems()
    .map(
      (item, i) => `
      <button type="button" class="ip-card" data-ip-key="${item.key}">
        <div class="ip-order">${i + 1}</div>
        <span class="ip-name" style="background:${item.color}22;color:${item.color}">${window.TDUtils.esc(item.shortName)}</span>
        <p class="ip-desc">${window.TDUtils.esc(item.desc)}</p>
      </button>`
    )
    .join('')

  const feeds = window.TDContent.COMMUNITY_FEED.map(
    (f) => `
    <article class="feed-card">
      <div class="feed-head"><span class="feed-user">${window.TDUtils.esc(f.user)}</span><span class="feed-tag">${window.TDUtils.esc(f.tag)}</span></div>
      <p class="feed-text">${window.TDUtils.esc(f.text)}</p>
    </article>`
  ).join('')

  const featured = window.TDContent.SERVICE_CASES[0]

  app.innerHTML = `
    <div class="page-wrap">
      <div>
        <section class="hero-banner">
          <div class="hero-banner-deco"></div>
          <span class="hero-badge">${window.TDUtils.esc(window.TDContent.HOME_COMMUNITY.bannerBadge)}</span>
          <h1 class="hero-title">${window.TDUtils.esc(window.TDContent.HOME_COMMUNITY.communitySlogan)}</h1>
          <p class="hero-slogan">${window.TDUtils.esc(window.TDContent.BRAND.slogan)}</p>
          <p class="hero-tagline">${window.TDUtils.esc(window.TDContent.BRAND.tagline)} · ${window.TDUtils.esc(window.TDContent.BRAND.scope)}</p>
          <a href="?p=consult&sub=start" class="btn-primary hero-cta">${window.TDUtils.esc(window.TDContent.HOME_COMMUNITY.ctaText)} →</a>
          <div class="avatar-row">
            ${['#E85D4C', '#F5A623', '#3DAA8C', '#1A3668'].map((c) => `<span class="avatar-dot" style="background:${c}"></span>`).join('')}
            <span>${window.TDUtils.esc(window.TDContent.HOME_COMMUNITY.memberCount)}</span>
          </div>
        </section>

        <section class="home-quick-nav" aria-label="快捷入口">
          <a href="?p=consult" class="home-quick-card home-quick-card--consult">
            <span class="home-quick-icon">💬</span>
            <span class="home-quick-title">咨询</span>
            <span class="home-quick-desc">30秒问卷 · 24小时内联系</span>
          </a>
          <a href="?p=about" class="home-quick-card home-quick-card--about">
            <span class="home-quick-icon">👤</span>
            <span class="home-quick-title">本人</span>
            <span class="home-quick-desc">了解头大大 · 资历与案例</span>
          </a>
        </section>

        <section class="measure-teaser" id="open-measure" data-go="measure" role="button" tabindex="0">
          <span class="measure-teaser-badge">纯属娱乐</span>
          <h2 class="measure-teaser-title">头大大 · 测测</h2>
          <p class="measure-teaser-desc">4 款测评 · 门店估值已可测</p>
          <p class="measure-teaser-cta">点开即测 →</p>
        </section>

        <section class="block">
          <div class="block-head">
            <h2 class="block-title">热门经营话题</h2>
            <span class="block-link" data-action="topic-submit">我要投稿</span>
          </div>
          <p class="topic-hint">头大大独到判断 · 老板投稿共鸣 · 点进阅读或勾选</p>
          <div class="topic-grid">${topicChips}</div>
        </section>

        <section class="block">
          <h2 class="block-title">头大大 · 五栏目</h2>
          <div class="ip-grid">${ipCards}</div>
        </section>

        <section class="block">
          <h2 class="block-title">圈子动态</h2>
          <div class="feed-list">${feeds}</div>
        </section>

        <section class="case-spotlight" data-nav="about">
          <p class="case-spotlight-label">案例速递</p>
          <h3 class="case-spotlight-title">${window.TDUtils.esc(featured.title)}</h3>
          <p class="text-muted">${window.TDUtils.esc(featured.progress)}</p>
        </section>
      </div>
    </div>`

  window.TDUtils.onId('open-measure', 'click', openMeasureModal)
  app.querySelectorAll('[data-topic-index]').forEach((el) => {
    el.addEventListener('click', () => openTopicModal(Number(el.dataset.topicIndex)))
  })
  app.querySelectorAll('[data-ip-key]').forEach((el) => {
    el.addEventListener('click', () => openIpModal(el.dataset.ipKey))
  })
  window.TDUtils.onSel('[data-action="topic-submit"]', 'click', openTopicSubmitModal, app)
  window.TDUtils.onSel('[data-nav="about"]', 'click', () => { location.hash = 'about' }, app)
}

function renderConsult() {
  const { sub } = route()
  if (sub === 'start') return renderQuestionnaire()
  if (sub === 'basic') return renderBasicInfo()
  if (sub === 'success') return renderSuccess()
  if (sub === 'progress') return renderProgress()

  const hasDraft = Object.keys(draft.answers).length > 0
  const steps = [
    { num: 1, title: '5 道经营勾选题', desc: '深度了解门店现状与诉求' },
    { num: 2, title: '补充基础信息', desc: '城市、电话、业态与投资情况' },
    { num: 3, title: '24 小时内联系', desc: '头大大根据问卷初步沟通' }
  ]

  const products = window.TDContent.PRODUCT_LEVELS.map((p) => {
    const expanded = expandedProduct === p.level
    return `
      <div class="product-row" data-level="${p.level}">
        <div class="product-level">${p.level}</div>
        <div>
          <p class="product-name">${window.TDUtils.esc(p.name)}</p>
          <p class="product-note text-muted">${window.TDUtils.esc(p.note)}${p.level === 'L1' ? ' · ' + window.TDUtils.esc(p.priceRange) : ''}</p>
          ${expanded ? `<p class="product-desc">${window.TDUtils.esc(p.desc)}</p>` : ''}
        </div>
        <div class="product-arrow">${expanded ? '−' : '+'}</div>
      </div>`
  }).join('')

  app.innerHTML = `
    <div class="page-wrap">
      <div>
        ${hasDraft ? `<div class="card" style="margin-bottom:16px;cursor:pointer" id="continue-draft"><strong>继续上次咨询</strong><p class="text-muted" style="margin:8px 0 0">点击继续填写</p></div>` : ''}
        <section class="page-hero-band">
          <p class="page-hero-badge">咨询 · 1 分钟问卷</p>
          <h1 class="page-hero-title">${window.TDUtils.esc(window.TDContent.BRAND.slogan)}</h1>
          <p class="page-hero-desc">${window.TDUtils.esc(window.TDContent.BRAND.tagline)} · ${window.TDUtils.esc(window.TDContent.BRAND.scope)}</p>
        </section>
        <h2 class="block-title">咨询流程</h2>
        ${steps.map((s) => `<div class="card step-card"><div class="step-num">${s.num}</div><div><p class="step-title">${window.TDUtils.esc(s.title)}</p><p class="step-desc">${window.TDUtils.esc(s.desc)}</p></div></div>`).join('')}
        <div class="action-row">
          <a href="#consult/start" class="btn-primary">${hasDraft ? '重新开始' : '立即开聊'}</a>
          ${hasDraft ? '<a href="#consult/start" class="btn-accent" id="continue-draft-btn">继续填写</a>' : ''}
          <a href="#consult/progress" class="btn-secondary">查看我的进度</a>
        </div>
        <section class="card">
          <div class="block-head"><h2 class="block-title">L1–L9 咨询梯度</h2></div>
          ${products}
        </section>
      </div>
    </div>`

  window.TDUtils.onId('continue-draft', 'click', () => { location.hash = 'consult/start' })
  window.TDUtils.onId('continue-draft-btn', 'click', (e) => {
    e.preventDefault()
    location.hash = 'consult/start'
  })
  app.querySelectorAll('.product-row').forEach((row) => {
    row.addEventListener('click', () => {
      expandedProduct = expandedProduct === row.dataset.level ? null : row.dataset.level
      renderConsult()
    })
  })
}

function renderQuestionnaire() {
  const q = window.TDConstants.QUESTIONS[draft.qIndex]
  const progress = ((draft.qIndex + 1) / window.TDConstants.QUESTIONS.length) * 100
  const field = q.field
  const selected = draft.answers[field]
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : []

  const options = q.options
    .map((opt) => {
      const isSelected = q.type === 'multiple' ? selectedArr.includes(opt) : selected === opt
      return `<button type="button" class="option-item ${isSelected ? 'selected' : ''}" data-option="${window.TDUtils.esc(opt)}">${window.TDUtils.esc(opt)}</button>`
    })
    .join('')

  app.innerHTML = `
    <div class="card question-page" style="max-width:720px;margin:0 auto">
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
      <p class="text-muted">第 ${draft.qIndex + 1} / ${window.TDConstants.QUESTIONS.length} 题</p>
      <h1 class="question-title">${window.TDUtils.esc(q.title)}</h1>
      <p class="question-sub">${window.TDUtils.esc(q.subtitle)}</p>
      <div class="option-list">${options}</div>
      <div class="form-nav">
        <button type="button" class="btn-secondary" id="q-prev">${draft.qIndex === 0 ? '返回咨询' : '上一题'}</button>
        <button type="button" class="btn-primary" id="q-next" disabled>下一题</button>
      </div>
    </div>`

  const canNext = q.type === 'multiple' ? selectedArr.length > 0 : !!selected
  document.getElementById('q-next').disabled = !canNext

  app.querySelectorAll('.option-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const opt = btn.dataset.option
      if (q.type === 'multiple') {
        let arr = [...selectedArr]
        const idx = arr.indexOf(opt)
        if (idx >= 0) arr.splice(idx, 1)
        else {
          if (arr.length >= (q.max || 3)) {
            alert('最多选 ' + (q.max || 3) + ' 项')
            return
          }
          arr.push(opt)
        }
        draft.answers[field] = arr
      } else {
        draft.answers[field] = opt
      }
      saveDraft()
      renderQuestionnaire()
    })
  })

  document.getElementById('q-prev').addEventListener('click', () => {
    if (draft.qIndex === 0) location.hash = 'consult'
    else {
      draft.qIndex -= 1
      renderQuestionnaire()
    }
  })

  document.getElementById('q-next').addEventListener('click', () => {
    if (draft.qIndex >= window.TDConstants.QUESTIONS.length - 1) {
      location.hash = 'consult/basic'
      return
    }
    draft.qIndex += 1
    renderQuestionnaire()
  })
}

function renderBasicInfo() {
  if (!draft.answers.q1_stage) {
    location.hash = 'consult/start'
    return
  }

  const step = draft.basicStep
  const b = draft.basic
  let body = ''

  if (step === 1) {
    body = `
      <h1 class="question-title">业态与投资</h1>
      <p class="question-sub">先选业态与投资情况，便于匹配诊断口径</p>
      <p class="field-label">属于什么类型的服务业？ *</p>
      <div class="option-list">${window.TDConstants.INDUSTRY_TYPES.map((o) => `<button type="button" class="option-item ${b.industryType === o ? 'selected' : ''}" data-field="industryType" data-value="${window.TDUtils.esc(o)}">${window.TDUtils.esc(o)}</button>`).join('')}</div>
      <p class="field-label">投资情况 · 目前状态 *</p>
      <div class="option-list">${window.TDConstants.INVESTMENT_STATUS.map((o) => `<button type="button" class="option-item ${b.investmentStatus === o ? 'selected' : ''}" data-field="investmentStatus" data-value="${window.TDUtils.esc(o)}">${window.TDUtils.esc(o)}</button>`).join('')}</div>
      <p class="field-label">金额区间 *</p>
      <div class="option-list">${window.TDConstants.INVESTMENT_RANGES.map((o) => `<button type="button" class="option-item ${b.investmentRange === o ? 'selected' : ''}" data-field="investmentRange" data-value="${window.TDUtils.esc(o)}">${window.TDUtils.esc(o)}</button>`).join('')}</div>`
  } else {
    body = `
      <h1 class="question-title">联系方式</h1>
      <p class="question-sub">留下城市与电话，24 小时内与您联系</p>
      <label class="field-block"><span class="field-label">所在城市 *</span><input class="field-input" id="city" value="${window.TDUtils.esc(b.city || '')}" placeholder="如：成都、重庆" /></label>
      <label class="field-block"><span class="field-label">手机号码 *</span><input class="field-input" id="phone" value="${window.TDUtils.esc(b.phone || '')}" placeholder="11 位手机号" maxlength="11" /></label>
      <p class="field-label">年龄（选填）</p>
      <div class="option-list">${window.TDConstants.AGE_RANGES.map((o) => `<button type="button" class="option-item ${(b.age || '不填写') === o ? 'selected' : ''}" data-field="age" data-value="${window.TDUtils.esc(o)}">${window.TDUtils.esc(o)}</button>`).join('')}</div>
      <p class="field-label">性别（选填）</p>
      <div class="option-list">${window.TDConstants.GENDERS.map((o) => `<button type="button" class="option-item ${(b.gender || '不填写') === o ? 'selected' : ''}" data-field="gender" data-value="${window.TDUtils.esc(o)}">${window.TDUtils.esc(o)}</button>`).join('')}</div>
      <div class="privacy-row" id="privacy-toggle">
        <span class="privacy-check ${b.privacyAgreed ? 'checked' : ''}">${b.privacyAgreed ? '✓' : ''}</span>
        <span>我已阅读并同意 <span class="privacy-link" id="open-privacy">《隐私政策》</span>，授权用于咨询联系与进度通知</span>
      </div>`
  }

  app.innerHTML = `
    <div class="card question-page" style="max-width:720px;margin:0 auto">
      <p class="text-muted">第 ${step} / 2 步</p>
      ${body}
      <div class="form-nav">
        <button type="button" class="btn-secondary" id="basic-prev">${step === 1 ? '返回问卷' : '上一步'}</button>
        <button type="button" class="btn-primary" id="basic-next">${step === 2 ? '提交咨询' : '下一步'}</button>
      </div>
    </div>`

  app.querySelectorAll('[data-field]').forEach((btn) => {
    btn.addEventListener('click', () => {
      draft.basic[btn.dataset.field] = btn.dataset.value
      renderBasicInfo()
    })
  })

  window.TDUtils.onId('basic-prev', 'click', () => {
    if (step === 1) location.hash = 'consult/start'
    else {
      draft.basicStep = 1
      renderBasicInfo()
    }
  })

  window.TDUtils.onId('city', 'input', (e) => {
    draft.basic.city = e.target.value
  })
  window.TDUtils.onId('phone', 'input', (e) => {
    draft.basic.phone = e.target.value
  })
  window.TDUtils.onId('privacy-toggle', 'click', (e) => {
    if (e.target.id === 'open-privacy') return
    draft.basic.privacyAgreed = !draft.basic.privacyAgreed
    renderBasicInfo()
  })
  window.TDUtils.onId('open-privacy', 'click', (e) => {
    e.stopPropagation()
    openPrivacyModal()
  })

  window.TDUtils.onId('basic-next', 'click', () => {
    const b = draft.basic
    if (step === 1) {
      if (!b.industryType || !b.investmentStatus || !b.investmentRange) {
        alert('请完善业态与投资信息')
        return
      }
      draft.basicStep = 2
      renderBasicInfo()
      return
    }
    const phone = (b.phone || '').trim()
    if (!(b.city && b.city.trim()) || !/^1\d{10}$/.test(phone)) {
      alert('请填写城市与有效手机号')
      return
    }
    if (!b.privacyAgreed) {
      alert('请先阅读并同意隐私政策')
      return
    }
    submitConsult()
  })
}

function submitConsult() {
  const record = {
    id: 'web_' + Date.now(),
    answers: { ...draft.answers },
    basicInfo: { ...draft.basic },
    summary: window.TDConstants.buildSummary(draft.answers, draft.basic),
    stage: '线索',
    createdAt: new Date().toISOString()
  }
  const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  leads.unshift(record)
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  localStorage.setItem('toudada_last_lead_id', record.id)
  localStorage.removeItem(window.TDConstants.PENDING_CONSULT_KEY)
  draft.answers = {}
  draft.basic = {}
  draft.qIndex = 0
  draft.basicStep = 1
  location.hash = 'consult/success'
}

function renderSuccess() {
  const deadline = window.TDUtils.formatReplyDeadline(24)
  app.innerHTML = `
    <div style="max-width:640px;margin:0 auto">
      <section class="success-hero">
        <div class="success-icon">✓</div>
        <h1 style="margin:0 0 8px">已收到您的咨询需求</h1>
        <p style="margin:0;opacity:0.9">我们将在 24 小时内与您联系</p>
      </section>
      <div class="card">
        <p><strong>预计回复</strong><br><span class="text-muted">24 小时内（不晚于 ${window.TDUtils.esc(deadline)}）</span></p>
        <hr style="border:none;border-top:1px solid var(--color-border);margin:16px 0" />
        <p><strong>下一步</strong><br><span class="text-muted">头大大将根据问卷与您初步沟通</span></p>
      </div>
      <div class="action-row">
        <a href="#consult/progress" class="btn-primary">查看我的进度</a>
        <a href="#home" class="btn-secondary">返回首页</a>
      </div>
    </div>`
}

function renderProgress() {
  const id = localStorage.getItem('toudada_last_lead_id')
  const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  const lead = leads.find((l) => l.id === id) || leads[0]

  if (!lead) {
    app.innerHTML = `
      <div class="card" style="max-width:560px;margin:0 auto;text-align:center">
        <h2>暂无咨询记录</h2>
        <p class="text-muted">提交问卷后，可在此查看进度</p>
        <a href="#consult/start" class="btn-primary">立即开聊</a>
      </div>`
    return
  }

  app.innerHTML = `
    <div class="card" style="max-width:640px;margin:0 auto">
      <h1 class="question-title">我的咨询进度</h1>
      <p class="text-muted">提交时间：${new Date(lead.createdAt).toLocaleString('zh-CN')}</p>
      <p style="font-size:18px;font-weight:700;color:var(--color-mint);margin:20px 0">当前阶段：${window.TDUtils.esc(lead.stage)}</p>
      <pre style="white-space:pre-wrap;font-size:13px;background:rgba(26,54,104,0.04);padding:16px;border-radius:12px;line-height:1.6">${window.TDUtils.esc(lead.summary)}</pre>
      <div class="action-row">
        <a href="#consult" class="btn-secondary">返回咨询</a>
        <a href="#home" class="btn-primary">回首页</a>
      </div>
    </div>`
}

function renderAbout() {
  const scopes = window.TDContent.SERVICE_SCOPES.slice(0, 6)
    .map((s) => `<div class="scope-item"><span class="scope-name">${window.TDUtils.esc(s.name)}</span>${window.TDUtils.esc(s.desc)}</div>`)
    .join('')

  const portraits = window.TDContent.PORTRAITS.map(
    (p) => `
    <div class="portrait-thumb">
      <img src="${window.TDUtils.img(p.image)}" alt="${window.TDUtils.esc(p.caption)}" loading="lazy" />
      <p class="portrait-thumb-caption">${window.TDUtils.esc(p.caption)}</p>
    </div>`
  ).join('')

  const endorsements = window.TDContent.ENDORSEMENT_GROUPS.map(
    (g) => `
    <article class="endorse-card">
      <img src="${window.TDUtils.img(g.cover)}" alt="${window.TDUtils.esc(g.guest)}" loading="lazy" />
      <div class="endorse-card-body">
        <p class="endorse-guest">${window.TDUtils.esc(g.guest)}</p>
        <p class="endorse-tag">${window.TDUtils.esc(g.tag)} · ${window.TDUtils.esc(g.title)}</p>
      </div>
    </article>`
  ).join('')

  const creds = window.TDContent.CREDENTIALS.map(
    (c) => `<div class="card step-card"><div class="step-num">·</div><div><p class="step-title">${window.TDUtils.esc(c.year)} · ${window.TDUtils.esc(c.title)}</p><p class="step-desc">${window.TDUtils.esc(c.desc)}</p></div></div>`
  ).join('')

  app.innerHTML = `
    <div class="page-wrap">
      <div>
        <section class="about-hero">
          <img src="${window.TDUtils.img('/images/portraits/portrait-main.jpg')}" alt="${window.TDUtils.esc(window.TDContent.BRAND.name)}" />
          <div class="about-hero-overlay"></div>
          <div class="about-hero-content">
            <h1 class="about-hero-name">${window.TDUtils.esc(window.TDContent.BRAND.name)}</h1>
            <p>${window.TDUtils.esc(window.TDContent.BRAND.slogan)}</p>
            <p style="opacity:0.85">${window.TDUtils.esc(window.TDContent.BRAND.tagline)}</p>
          </div>
        </section>
        <div class="card">
          <p>${window.TDUtils.esc(window.TDContent.BRAND.intro)}</p>
          <p><strong>擅长：</strong>${window.TDUtils.esc(window.TDContent.BRAND.expertiseSummary)}</p>
          <p class="text-muted">${window.TDUtils.esc(window.TDContent.BRAND.scope)}</p>
        </div>
        <section class="block"><h2 class="block-title">个人形象</h2><div class="portrait-scroll">${portraits}</div></section>
        <section class="block"><h2 class="block-title">行业交流 · 坐而论道</h2><div class="endorse-scroll">${endorsements}</div></section>
        <section class="block">
          <h2 class="block-title">前辈背书 · 与我何干</h2>
          ${['yu', 'feng']
            .map((key) => {
              const g = window.TDContent.GUEST_PROFILES[key]
              return `<div class="card"><p><strong>${window.TDUtils.esc(g.name)}</strong> · ${window.TDUtils.esc(g.tag)}</p>${g.lines.map((l) => `<p class="text-muted" style="line-height:1.65;margin-top:10px">${window.TDUtils.esc(l)}</p>`).join('')}</div>`
            })
            .join('')}
        </section>
        <section class="card">
          <h2 class="block-title">18 个服务业态</h2>
          <div class="scope-grid">${scopes}</div>
          <p class="text-muted" style="margin-top:12px">等共 ${window.TDContent.SERVICE_SCOPES.length} 类 · 详见小程序</p>
        </section>
        <section class="block"><h2 class="block-title">行业资历</h2>${creds}</section>
        <div class="card"><p class="text-muted" style="font-size:13px;line-height:1.65">${window.TDUtils.esc(window.TDContent.COMPLIANCE)}</p></div>
        <div class="action-row"><a href="#consult/start" class="btn-primary">${window.TDUtils.esc(window.TDContent.HOME_COMMUNITY.ctaText)} →</a></div>
      </div>
    </div>`
}

function openMeasureModal(initialGame) {
  closeModal()
  modalRoot.innerHTML = `
    <div class="modal-mask" id="measure-mask">
      <div class="modal" style="max-width:520px;padding-top:48px">
        <button type="button" class="modal-close" id="measure-close">×</button>
        <div id="measure-root"></div>
      </div>
    </div>`
  const root = document.getElementById('measure-root')
  if (measureController) measureController.destroy()
  measureController = window.createMeasureController(root, {
    onClose: closeModal
  })
  if (initialGame === 'store') measureController.openStoreGame()
  else measureController.openList()
  document.getElementById('measure-close').addEventListener('click', closeModal)
  document.getElementById('measure-mask').addEventListener('click', (e) => {
    if (e.target.id === 'measure-mask') closeModal()
  })
}

function openTopicModal(index) {
  const topics = hotTopics()
  const topic = topics[index]
  if (!topic) return
  closeModal()

  if (topic.isFounder) {
    modalRoot.innerHTML = `
      <div class="modal-mask" data-close-mask>
        <div class="modal">
          <button type="button" class="modal-close" data-close>×</button>
          <span class="hero-badge" style="display:inline-block;background:rgba(26,54,104,0.08);color:var(--color-primary);padding:4px 12px;border-radius:999px;font-size:12px">头大大投稿</span>
          <h2 class="modal-title">${window.TDUtils.esc(topic.title)}</h2>
          <p class="modal-meta">${window.TDUtils.esc(topic.submitter)} · 头大大谈经营</p>
          <div class="modal-body">${topic.paragraphs.map((p) => `<p>${window.TDUtils.esc(p)}</p>`).join('')}</div>
          <a href="#consult/start" class="btn-primary" style="width:100%;margin-top:16px" data-close-link>有类似困惑 · 立即开聊</a>
        </div>
      </div>`
  } else {
    modalRoot.innerHTML = `
      <div class="modal-mask" data-close-mask>
        <div class="modal">
          <button type="button" class="modal-close" data-close>×</button>
          <span class="hero-badge" style="display:inline-block;background:rgba(232,93,76,0.1);color:var(--color-coral);padding:4px 12px;border-radius:999px;font-size:12px">老板投稿</span>
          <h2 class="modal-title">#${window.TDUtils.esc(topic.label)}</h2>
          <p class="modal-meta">${window.TDUtils.esc(topic.submitter)} · ${topic.displayCount} 位老板关注</p>
          <p class="modal-body">${window.TDUtils.esc(topic.intro)}</p>
          <a href="#consult/start" class="btn-primary" style="width:100%;margin-top:16px" data-close-link>带着困惑去咨询</a>
        </div>
      </div>`
  }
  bindModalClose()
}

function openIpModal(key) {
  const col = window.TDContent.IP_COLUMNS.find((c) => c.key === key)
  if (!col) return
  closeModal()
  modalRoot.innerHTML = `
    <div class="modal-mask" data-close-mask>
      <div class="modal">
        <button type="button" class="modal-close" data-close>×</button>
        <h2 class="modal-title">${window.TDUtils.esc(col.name)}</h2>
        <p class="modal-meta">${window.TDUtils.esc(col.desc)}</p>
        <ul class="modal-body" style="padding-left:20px">${col.points.map((p) => `<li style="margin-bottom:10px">${window.TDUtils.esc(p)}</li>`).join('')}</ul>
        <button type="button" class="btn-primary" style="width:100%;margin-top:12px" data-close>知道了</button>
      </div>
    </div>`
  bindModalClose()
}

function openTopicSubmitModal() {
  closeModal()
  modalRoot.innerHTML = `
    <div class="modal-mask" data-close-mask>
      <div class="modal">
        <button type="button" class="modal-close" data-close>×</button>
        <h2 class="modal-title">说出你的经营困惑</h2>
        <p class="text-muted">${window.TDUtils.esc(window.TDContent.TOPIC_SUBMIT_HINTS[0])}</p>
        <p class="field-label">一句话标题</p>
        <input class="field-input" id="submit-label" maxlength="16" placeholder="例如：商场店人流大但不转化" />
        <p class="field-label">所属方向</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
          ${window.TDContent.TOPIC_CATEGORY_OPTIONS.map((c) => `<button type="button" class="option-item" style="width:auto;padding:8px 14px" data-cat="${c.key}">${window.TDUtils.esc(c.label)}</button>`).join('')}
        </div>
        <p class="field-label">具体困境</p>
        <textarea class="field-input" id="submit-intro" rows="4" maxlength="200" placeholder="描述你的现状"></textarea>
        <div class="form-nav" style="margin-top:16px">
          <button type="button" class="btn-secondary" data-close>取消</button>
          <button type="button" class="btn-primary" id="submit-topic">发布投稿</button>
        </div>
      </div>
    </div>`
  bindModalClose()
  window.TDUtils.onId('submit-topic', 'click', () => {
    alert('投稿已收到（网页演示版），感谢分享！')
    closeModal()
  })
}

function openPrivacyModal() {
  modalRoot.innerHTML = `
    <div class="modal-mask" data-close-mask>
      <div class="modal">
        <button type="button" class="modal-close" data-close>×</button>
        <h2 class="modal-title">隐私政策</h2>
        <div class="modal-body">
          <p>为响应您的咨询需求，我们可能收集：问卷答案、业态与投资情况、所在城市、手机号码，以及您自愿填写的年龄、性别等画像信息。</p>
          <p>上述信息仅用于初步沟通、经营诊断匹配、项目进度通知与交付跟进。不会用于与咨询无关的营销推送。</p>
          <p>您有权查询、更正或要求删除您的咨询信息。主体：头大大谈经营（个人）。</p>
        </div>
        <button type="button" class="btn-primary" style="width:100%;margin-top:12px" data-close>知道了</button>
      </div>
    </div>`
  bindModalClose()
}

function bindModalClose() {
  modalRoot.querySelectorAll('[data-close], [data-close-mask]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (el.dataset.closeMask && e.target !== el) return
      closeModal()
    })
  })
  modalRoot.querySelectorAll('[data-close-link]').forEach((el) => {
    el.addEventListener('click', closeModal)
  })
}

function closeModal() {
  if (measureController) measureController.destroy()
  measureController = null
  modalRoot.innerHTML = ''
}

function render() {
  const { page, sub } = route()
  setActiveNav(page === 'consult' || page === 'questionnaire' ? 'consult' : page)

  if (page === 'home' || page === '') renderHome()
  else if (page === 'consult') renderConsult()
  else if (page === 'about') renderAbout()
  else if (page === 'share') renderSharePage()
  else if (page === 'measure') {
    renderHome()
    setTimeout(() => openMeasureModal(sub === 'store' ? 'store' : null), 0)
  } else if (page === 'questionnaire') {
    location.hash = 'consult/start'
  } else renderHome()
}

window.addEventListener('hashchange', render)

bindSiteNav()

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo-img')
  if (logo && window.__SITE_IMG_BASE) {
    logo.src = window.__SITE_IMG_BASE + '/brand/toudada-talk-business-logo.png'
  }
})

try {
  render()
} catch (bootErr) {
  console.error(bootErr)
  const appEl = document.getElementById('app')
  if (appEl) {
    appEl.innerHTML =
      '<div class="card" style="padding:24px"><h2>页面加载失败</h2><p>' +
      (bootErr.message || bootErr) +
      '</p><p class="text-muted">请用本地服务器打开：python3 -m http.server 8765 → http://localhost:8765/web/</p></div>'
  }
}
