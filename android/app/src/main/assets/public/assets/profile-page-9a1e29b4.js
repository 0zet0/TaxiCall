import{d as w,y as x,X as v,e as S,b as k,A as y,r as i,o as P,c as C,w as r,a as c,g as e,h as o,Y as _,Z as f,t as V,j as I,P as B,p as b,k as M,_ as N}from"./index-8b483585.js";import{_ as D}from"./arrow-34c7938c.js";const l=n=>(b("data-v-41d114dd"),n=n(),M(),n),T={class:"profile-page flex flex-col items-center"},U={class:"flex items-center w-full"},j=l(()=>e("div",{class:"--center w-full"},[e("span",{class:"font-400-20"},"Профиль")],-1)),z=l(()=>e("img",{alt:"Silhouette of a person's head",src:"https://ionicframework.com/docs/img/demos/avatar.svg"},null,-1)),A={class:"flex flex-col gap-5 w-full mt-30"},E=l(()=>e("span",{class:"font-400-20"},"Имя",-1)),R={class:"flex flex-col gap-5 w-full mt-30"},W=l(()=>e("span",{class:"font-400-20"},"Фамимлия",-1)),X={class:"flex flex-col gap-5 w-full mt-30"},Y=l(()=>e("span",{class:"font-400-20"},"Номер телефона",-1)),Z={class:"profile-page__wrapper w-full p-20 h-60 rounded-5 font-400-20"},q={class:"flex size-full flex-end"},F=w({__name:"profile-page",setup(n){const d=x(),s=v();S();const p=k();async function u(){await s.logout(),p.showPage("auth",!1,!0)}return y(()=>{d.show=!1}),(G,t)=>{const m=i("ion-avatar"),g=i("ion-content"),h=i("ion-page");return P(),C(h,null,{default:r(()=>[c(g,{fullscreen:!0},{default:r(()=>[e("div",T,[e("div",U,[e("img",{class:"profile-page__arrow",src:D,alt:"",onClick:t[0]||(t[0]=(...a)=>o(p).backPage&&o(p).backPage(...a))}),j]),c(m,{class:"w-170 h-170 mt-40"},{default:r(()=>[z]),_:1}),e("div",A,[E,_(e("input",{class:"profile-page__wrapper w-full p-20 h-60 rounded-5 font-400-20",type:"text","onUpdate:modelValue":t[1]||(t[1]=a=>o(s).profile.first_name=a)},null,512),[[f,o(s).profile.first_name]])]),e("div",R,[W,_(e("input",{class:"profile-page__wrapper w-full p-20 h-60 rounded-5 font-400-20",type:"text","onUpdate:modelValue":t[2]||(t[2]=a=>o(s).profile.last_name=a)},null,512),[[f,o(s).profile.last_name]])]),e("div",X,[Y,e("span",Z,"+"+V(o(s).profile.phone),1)]),e("div",q,[c(o(B),{class:"w-full",onClick:u},{default:r(()=>[I("Выйти из профиля")]),_:1})])])]),_:1})]),_:1})}}});const K=N(F,[["__scopeId","data-v-41d114dd"]]);export{K as default};
