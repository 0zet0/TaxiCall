System.register(["./basedecoder-legacy-67980f1e.js"],(function(t,n){"use strict";var e;return{setters:[t=>{e=t.B}],execute:function(){const n=257;function r(t,n){for(let e=n.length-1;e>=0;e--)t.push(n[e]);return t}function o(t){const e=new Uint16Array(4093),o=new Uint8Array(4093);for(let n=0;n<=257;n++)e[n]=4096,o[n]=n;let c=258,f=9,i=0;function s(){c=258,f=9}function u(t){const e=function(t,e,r){const o=e%8,c=Math.floor(e/8),f=8-o,i=e+r-8*(c+1);let s=8*(c+2)-(e+r);const u=8*(c+2)-e;if(s=Math.max(0,s),c>=t.length)return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"),n;let l=t[c]&2**(8-o)-1;l<<=r-f;let a=l;if(c+1<t.length){let n=t[c+1]>>>s;n<<=Math.max(0,r-u),a+=n}if(i>8&&c+2<t.length){const n=8*(c+3)-(e+r);a+=t[c+2]>>>n}return a}(t,i,f);return i+=f,e}function l(t,n){return o[c]=n,e[c]=t,c++,c-1}function a(t){const n=[];for(let r=t;4096!==r;r=e[r])n.push(o[r]);return n}const h=[];s();const d=new Uint8Array(t);let g,w=u(d);for(;w!==n;){if(256===w){for(s(),w=u(d);256===w;)w=u(d);if(w===n)break;if(w>256)throw new Error(`corrupted code at scanline ${w}`);r(h,a(w)),g=w}else if(w<c){const t=a(w);r(h,t),l(g,t[t.length-1]),g=w}else{const t=a(g);if(!t)throw new Error(`Bogus entry. Not in dictionary, ${g} / ${c}, position: ${i}`);r(h,t),h.push(t[t.length-1]),l(g,t[t.length-1]),g=w}c+1>=2**f&&(12===f?g=void 0:f++),w=u(d)}return new Uint8Array(h)}t("default",class extends e{decodeBlock(t){return o(t).buffer}})}}}));