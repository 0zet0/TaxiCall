System.register(["./basedecoder-legacy-67980f1e.js"],(function(e,t){"use strict";var n;return{setters:[e=>{n=e.B}],execute:function(){e("default",class extends n{decodeBlock(e){const t=new DataView(e),n=[];for(let r=0;r<e.byteLength;++r){let e=t.getInt8(r);if(e<0){const s=t.getUint8(r+1);e=-e;for(let t=0;t<=e;++t)n.push(s);r+=1}else{for(let s=0;s<=e;++s)n.push(t.getUint8(r+s+1));r+=e+1}}return new Uint8Array(n).buffer}})}}}));