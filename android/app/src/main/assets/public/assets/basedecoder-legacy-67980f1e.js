System.register([],(function(e,t){"use strict";return{execute:function(){function t(e,t){let r=e.length-t,n=0;do{for(let r=t;r>0;r--)e[n+t]+=e[n],n++;r-=t}while(r>0)}function r(e,t,r){let n=0,i=e.length;const o=i/r;for(;i>t;){for(let r=t;r>0;--r)e[n+t]+=e[n],++n;i-=t}const l=e.slice();for(let s=0;s<o;++s)for(let t=0;t<r;++t)e[r*s+t]=l[(r-t-1)*o+s]}e("B",class{async decode(e,n){const i=await this.decodeBlock(n),o=e.Predictor||1;if(1!==o){const n=!e.StripOffsets;return function(e,n,i,o,l,s){if(!n||1===n)return e;for(let t=0;t<l.length;++t){if(l[t]%8!=0)throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");if(l[t]!==l[0])throw new Error("When decoding with predictor, all samples must have the same size.")}const a=l[0]/8,c=2===s?1:l.length;for(let f=0;f<o&&!(f*c*i*a>=e.byteLength);++f){let o;if(2===n){switch(l[0]){case 8:o=new Uint8Array(e,f*c*i*a,c*i*a);break;case 16:o=new Uint16Array(e,f*c*i*a,c*i*a/2);break;case 32:o=new Uint32Array(e,f*c*i*a,c*i*a/4);break;default:throw new Error(`Predictor 2 not allowed with ${l[0]} bits per sample.`)}t(o,c)}else 3===n&&(o=new Uint8Array(e,f*c*i*a,c*i*a),r(o,c,a))}return e}(i,o,n?e.TileWidth:e.ImageWidth,n?e.TileLength:e.RowsPerStrip||e.ImageLength,e.BitsPerSample,e.PlanarConfiguration)}return i}})}}}));
