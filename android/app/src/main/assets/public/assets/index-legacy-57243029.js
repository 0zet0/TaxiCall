System.register([],(function(e,t){"use strict";return{execute:function(){e("g",(function(e,t){if(!e)return"";if(t){if("address"===e.type){let t="";return e.street&&(t+=e.street),e.name&&(t+=`, ${e.name}`),t}return e.name||""}if("address"===e.type){let t="";return e.city&&(t+=e.city),e.region&&(t+=`, ${e.region}`),t}return e.street||""}))}}}));