import{a as b}from"./index-7376b9a9.js";import{r as i,l as L,m as B,a as o,o as M,c as P,w as t,b as e,f as p,d as c,t as g,e as W,n as N}from"./index-1590be2c.js";const X={class:"responsive-datatable"},Z={"data-label":"T/r"},ee={"data-label":"Fan nomi"},ae={"data-label":"Boshqarish"},te={class:"d-flex justify-end"},le=c("div",null,"Hech narsa topilmadi",-1),oe={class:"text-h5"},ie={__name:"Groups",setup(ne){const T=[{title:"T/r",align:"start",key:"no",sortable:!1},{title:"Guruh Nomi",key:"name"},{title:"Boshqarish",key:"actions",sortable:!1}],U=[a=>!!a||"Required"],x=i(""),d=i([]),h=i(null),r=i(!1),f=i(!1),s=i(-1),v=i(-1),u=i({name:""}),w={name:""},$=L(()=>s.value===-1?"Guruh Yaratish":"Guruhni O'zgartirish");B(r,a=>a||V()),B(f,a=>a||k());const D=async()=>{const{data:a}=await b.get("/group");d.value=a},H=async()=>{const{valid:a}=await h.value.validate();a&&Q()},S=a=>{s.value=d.value.indexOf(a),v.value=a._id,u.value=Object.assign({},a),r.value=!0},Y=a=>{s.value=d.value.indexOf(a),u.value=Object.assign({},a),v.value=a._id,f.value=!0},F=async()=>{const{data:a}=await b.delete(`/group/${v.value}`);a&&(d.value.splice(s.value,1),k())},V=()=>{r.value=!1,N(()=>{var a;u.value=Object.assign({},w),v.value=-1,s.value=-1,(a=h.value)==null||a.reset()})},k=()=>{f.value=!1,N(()=>{var a;u.value=Object.assign({},w),v.value=-1,s.value=-1,(a=h.value)==null||a.reset()})},Q=async()=>{if(s.value>-1){const{data:a}=await b.put(`/group/${v.value}`,u.value);Object.assign(d.value[s.value],a)}else{const{data:a}=await b.post("/group",u.value);d.value.push(a)}V()};return D(),(a,n)=>{const C=o("v-text-field"),_=o("v-col"),m=o("v-btn"),y=o("v-row"),O=o("v-sheet"),R=o("v-data-table"),j=o("v-card-title"),A=o("v-form"),I=o("v-container"),E=o("v-card-text"),q=o("v-card"),G=o("v-dialog"),z=o("v-spacer"),J=o("v-card-actions");return M(),P(I,{fluid:""},{default:t(()=>[e(y,null,{default:t(()=>[e(_,{cols:"12"},{default:t(()=>[e(O,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[e(y,{justify:"space-between"},{default:t(()=>[e(_,{cols:"12",sm:"4"},{default:t(()=>[e(C,{label:"Qidirish",modelValue:x.value,"onUpdate:modelValue":n[0]||(n[0]=l=>x.value=l),variant:"outlined",color:"primary",density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),e(_,{cols:"12",sm:"4",md:"3"},{default:t(()=>[e(m,{block:"",color:"primary",onClick:n[1]||(n[1]=l=>r.value=!0),variant:"tonal"},{default:t(()=>[p("Guruh yaratish")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(_,{cols:"12"},{default:t(()=>[e(O,{elevation:"1",color:"surface",width:"100%",class:"pa-2",rounded:""},{default:t(()=>[c("div",X,[e(R,{headers:T,search:x.value,items:d.value},{"item.no":t(({index:l})=>[c("td",Z,g(l+1)+".",1)]),"item.name":t(({item:l})=>[c("td",ee,g(l.raw.name),1)]),"item.actions":t(({item:l})=>[c("td",ae,[c("div",te,[e(m,{icon:"mdi-pencil",variant:"text",size:"40",color:"primary",onClick:K=>S(l.raw)},null,8,["onClick"]),e(m,{icon:"mdi-delete",variant:"text",size:"40",color:"primary",onClick:K=>Y(l.raw)},null,8,["onClick"])])])]),"no-data":t(()=>[le]),_:1},8,["search","items"])])]),_:1})]),_:1})]),_:1}),e(G,{modelValue:r.value,"onUpdate:modelValue":n[3]||(n[3]=l=>r.value=l),"max-width":"550px"},{default:t(()=>[e(q,null,{default:t(()=>[e(j,{class:"mt-2 ml-2 mb-0"},{default:t(()=>[c("span",oe,g(W($)),1)]),_:1}),e(E,{class:"px-2 pt-0"},{default:t(()=>[e(I,null,{default:t(()=>[e(A,{ref_key:"form",ref:h},{default:t(()=>[e(y,null,{default:t(()=>[e(_,{cols:"12"},{default:t(()=>[e(C,{modelValue:u.value.name,"onUpdate:modelValue":n[2]||(n[2]=l=>u.value.name=l),label:"Guruh Nomi","hide-details":"",rules:U,color:"primary",variant:"outlined"},null,8,["modelValue"])]),_:1}),e(_,{cols:"12"},{default:t(()=>[e(m,{variant:"tonal",color:"primary",block:"",onClick:H,height:"45"},{default:t(()=>[p(" Saqlash ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(G,{modelValue:f.value,"onUpdate:modelValue":n[4]||(n[4]=l=>f.value=l),"max-width":"500px"},{default:t(()=>[e(q,null,{default:t(()=>[e(j,{class:"text-h6"},{default:t(()=>[p(" Ushbu ma'lumotni ochirmoqchimisiz ")]),_:1}),e(J,null,{default:t(()=>[e(z),e(m,{color:"blue-darken-1",variant:"text",onClick:k},{default:t(()=>[p(" Yo'q ")]),_:1}),e(m,{color:"blue-darken-1",variant:"text",onClick:F},{default:t(()=>[p(" Ha ")]),_:1}),e(z)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};export{ie as default};
