function n(t,i){if(!t)return"";if(i)if(t.type==="address"){let e="";return t.street&&(e+=t.street),t.name&&(e+=", ".concat(t.name)),e}else return t.name||"";else if(t.type==="address"){let e="";return t.city&&(e+=t.city),t.region&&(e+=", ".concat(t.region)),e}else return t.street||""}export{n as g};