import{d as u,x as s,U as i,o as _,f as d,a4 as v,J as p,_ as f}from"./index-8b483585.js";const h=u({__name:"index",props:{height:{type:String,default:"auto"}},setup(n){const e=s(),l=s({height:0}),t=s(!1);return i(()=>{e.value.ontouchstart=o=>{l.value=e.value.getBoundingClientRect(),t.value=!1,setTimeout(()=>{t.value=!0},100)},e.value.ontouchend=()=>{t.value=!0},e.value.ontouchmove=o=>{const{scrollTop:a,scrollHeight:r}=e.value,c=a+l.value.height+1>=r;(a===0||c)&&t.value||(o.stopPropagation(),t.value=!1)}}),(o,a)=>(_(),d("div",{class:"scrollbar-list",ref_key:"scrollcontainer",ref:e,style:p({height:n.height})},[v(o.$slots,"default",{},void 0,!0)],4))}});const m=f(h,[["__scopeId","data-v-b75365de"]]);export{m as S};