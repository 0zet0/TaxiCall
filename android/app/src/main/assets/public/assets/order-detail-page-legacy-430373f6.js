System.register(["./index-legacy-c109d5ca.js","./index.vue_vue_type_script_setup_true_lang-legacy-c7d15995.js","./index.vue_vue_type_script_setup_true_lang-legacy-0173b84f.js","./index-legacy-8a17a961.js","./index-legacy-57243029.js"],(function(e,a){"use strict";var t,r,l,d,s,o,i,n,c,p,u,_,v,f,g,x,m,h,w,b,k,y,O,A,$,C,j,L,F,S,D;return{setters:[e=>{t=e.d,r=e.b,l=e.u,d=e.l,s=e.y,o=e.x,i=e.e,n=e.A,c=e.B,p=e.C,u=e.r,_=e.o,v=e.c,f=e.w,g=e.a,x=e.g,m=e.h,h=e.f,w=e.t,b=e.E,k=e.m,y=e.H,O=e.p,A=e.k,$=e.j,C=e._},e=>{j=e.R,L=e._},e=>{F=e._},e=>{S=e.S},e=>{D=e.g}],execute:function(){var a=document.createElement("style");a.textContent=".order-detail-page__location[data-v-966217a5]{position:absolute;right:15px;top:-60px}.order-detail-page__back[data-v-966217a5]{position:absolute;left:15px;top:-60px}.order-detail-page__rotate[data-v-966217a5]{transform:rotate(180deg)}.order-detail-page__wrapper[data-v-966217a5]{background:#eee;border-radius:25px 25px 0 0}.order-detail-page__text[data-v-966217a5]{color:#9d9d9d}.order-detail-page__address_circle[data-v-966217a5]{width:15px;height:15px;border-radius:50%;border:3px solid #0cf;aspect-ratio:1/1}.order-detail-page__address_rect[data-v-966217a5]{width:15px;height:15px;border:3px solid #343434;aspect-ratio:1/1}.order-detail-page__address_line[data-v-966217a5]{height:1px;width:100%;background:#eee}.order-detail-page__address_btn[data-v-966217a5]{padding:10px 14px;border-radius:15px;background:#eee}.order-detail-page__text[data-v-966217a5]{color:#000;font-family:Open Sans;font-style:normal}.order-detail-page__line[data-v-966217a5]{width:100%;height:1px;background:#eee}.order-detail-page__card[data-v-966217a5]{padding:18px 20px;background:#fff}.order-detail-page__card.top[data-v-966217a5]{border-radius:25px 25px 0 0}.order-detail-page__card.bottom[data-v-966217a5]{border-radius:0 0 25px 25px}\n",document.head.appendChild(a);const M=e=>(O("data-v-966217a5"),e=e(),A(),e),P={class:"order-detail-page"},B={class:"order-detail-page__wrapper size-full"},E={class:"order-detail-page__card top flex flex-col items-center w-full"},R={key:0,class:"flex flex-col items-center mt-20 gap-8"},z={class:"font-700-24 auto-truncate"},H={class:"font-400-18 auto-truncate"},I={key:1,class:"flex mt-25"},Z={class:"--center flex-col gap-7 w-full"},q=M((()=>x("img",{alt:"Silhouette of a person's head",src:"https://ionicframework.com/docs/img/demos/avatar.svg"},null,-1))),G={class:"order-detail-page__text font-400-12 text-center"},J={class:"order-detail-page__address flex flex-col w-full mt-25"},K={class:"flex gap-20 items-center w-full"},N=M((()=>x("span",{class:"order-detail-page__address_circle"},null,-1))),Q={class:"flex gap-20 items-center justify-between w-full"},T={class:"font-400-16 truncate"},U=M((()=>x("svg",{xmlns:"http://www.w3.org/2000/svg",width:"15",height:"15",viewBox:"0 0 15 15",fill:"none"},[x("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.11568 7.50005L4.55762 2.94199L5.4415 2.05811L10.8834 7.50005L5.4415 12.942L4.55762 12.0581L9.11568 7.50005Z",fill:"#00CCFF"})],-1))),V=M((()=>x("div",{class:"flex gap-25 w-full"},[x("span",{class:"w-15"}),x("div",{class:"order-detail-page__address_line"})],-1))),W={class:"flex gap-20 items-center w-full"},X=M((()=>x("span",{class:"order-detail-page__address_rect"},null,-1))),Y={class:"flex gap-20 items-center justify-between w-full"},ee={class:"font-400-16 truncate"},ae={class:"order-detail-page__card --center flex-col gap-7 w-full mt-25"},te=M((()=>x("span",{class:"order-detail-page__text font-400-12 text-center"},[$(" Отменить "),x("br"),$(" заказ ")],-1)));e("default",C(t({__name:"order-detail-page",setup(e){const a=r();l();const t=d(),O=s(),A=o(),$=o(!0),C=i(),M=o(),re=async()=>{t.selectedActiveOrders.id&&(await t.cancelOrders(t.selectedActiveOrders.id)?(M.value.$el.message="Ваш заказ успешно отменен.",M.value.$el.present(),a.backPage()):(M.value.$el.message="Не удалось отменить заказ!",M.value.$el.present()))};return n((async()=>{await c(),$.value=!0,A.value.$el.present(),a.showMenu=!0,O.show=!0,a.toggle=e=>{$.value=!e,a.show=!e,e?A.value.$el.dismiss():"OrderDetailPage"===C.currentRoute.value.name&&A.value.$el.present()}})),p((()=>{$.value=!1,A.value.$el.dismiss(),a.showMenu=!1})),(e,r)=>{const l=u("ion-avatar"),d=u("ion-modal"),s=u("ion-toast"),o=u("ion-content"),i=u("ion-page");return _(),v(i,null,{default:f((()=>[g(o,{fullscreen:!0},{default:f((()=>[x("div",P,[g(d,{ref_key:"modal",ref:A,style:{"--height":"auto"},"initial-breakpoint":1,breakpoints:[0,1],"is-open":!0,"backdrop-breakpoint":.5,onDidDismiss:r[2]||(r[2]=()=>$.value&&m(a).backPage())},{default:f((()=>[x("div",B,[g(m(S),{class:"flex flex-col items-center",height:"auto"},{default:f((()=>{var e,a,d,s;return[x("div",E,[m(t).selectedActiveOrders.performer?(_(),h("div",R,[x("span",z,w(`За рулем ${(null===(e=m(t).selectedActiveOrders.performer)||void 0===e?void 0:e.first_name)||"Водитель"}`),1),x("span",H,w(`${(null===(a=m(t).selectedActiveOrders.performer.transport)||void 0===a?void 0:a.color)||""} ${(null===(d=m(t).selectedActiveOrders.performer.transport)||void 0===d?void 0:d.model)||""}`),1)])):b("",!0),m(t).selectedActiveOrders.performer?(_(),h("div",I,[x("div",Z,[g(l,{class:"w-55 h-55"},{default:f((()=>[q])),_:1}),x("span",G,w(null===(s=m(t).selectedActiveOrders.performer)||void 0===s?void 0:s.first_name),1)])])):b("",!0),x("div",J,[x("div",K,[N,g(m(j),{class:"w-full h-60 flex items-center rounded-10 pl-5 pr-5",onClick:r[0]||(r[0]=k((()=>{}),["prevent","stop"]))},{default:f((()=>[x("div",Q,[x("span",T,w(m(D)(m(t).selectedActiveOrders.from_address,!0)),1),U])])),_:1})]),V,x("div",W,[X,g(m(j),{class:"w-full h-60 flex items-center rounded-10 pl-5 pr-5"},{default:f((()=>[x("div",Y,[x("span",ee,w(m(D)(m(t).selectedActiveOrders.to_addresses[0],!0)),1),g(m(L),{onClick:r[1]||(r[1]=k((()=>{}),["prevent","stop"]))})])])),_:1})])])]),x("div",ae,[g(m(y),{class:"w-55 h-55",background:"#F5F4F2",color:"#000",onClick:k(re,["prevent","stop"])},{default:f((()=>[g(m(F))])),_:1},8,["onClick"]),te])]})),_:1})])])),_:1},512),g(s,{ref_key:"toast",ref:M,message:"Ваш заказ успешно отменен.",duration:4e3},null,512)])])),_:1})])),_:1})}}}),[["__scopeId","data-v-966217a5"]]))}}}));