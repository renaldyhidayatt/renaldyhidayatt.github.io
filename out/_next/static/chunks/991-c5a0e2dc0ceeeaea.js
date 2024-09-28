"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[991],{5257:function(e,r,t){t.d(r,{Y:function(){return c}});var n=t(7437);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,t(7461).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);var i=t(8792),o=t(5754),l=t(1657),s=t(9213);function c(e){let{slug:r,title:t,description:c,date:u,tags:d}=e;return(0,n.jsxs)("article",{className:"flex flex-col gap-2 border-border border-b py-3 text-[#585a5c] dark:text-slate-200",children:[(0,n.jsx)("div",{children:(0,n.jsx)("h2",{className:"text-2xl font-bold",children:(0,n.jsx)(i.default,{href:"/"+r,children:t})})}),(0,n.jsx)("div",{className:"flex gap-2",children:null==d?void 0:d.map(e=>(0,n.jsx)(s.V,{tag:e},e))}),(0,n.jsx)("div",{className:"max-w-none text-muted-foreground",children:c}),(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsxs)("dl",{children:[(0,n.jsx)("dt",{className:"sr-only",children:"Published On"}),(0,n.jsxs)("dd",{className:"text-sm sm:text-base font-medium flex items-center gap-1",children:[(0,n.jsx)(a,{className:"h-4 w-4"}),(0,n.jsx)("time",{dateTime:u,children:(0,l.p6)(u)})]})]}),(0,n.jsx)(i.default,{href:"/"+r,className:(0,l.cn)((0,o.d)({variant:"link"}),"py-0"),children:"Read more →"})]})]})}},4189:function(e,r,t){t.d(r,{e:function(){return v}});var n=t(7437),a=t(2265),i=t(7461);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,i.Z)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);var l=t(7805);(0,i.Z)("MoreHorizontal",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);var s=t(1657),c=t(5754);let u=e=>{let{className:r,...t}=e;return(0,n.jsx)("nav",{role:"navigation","aria-label":"pagination",className:(0,s.cn)("mx-auto flex w-full justify-center",r),...t})};u.displayName="Pagination";let d=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("ul",{ref:r,className:(0,s.cn)("flex flex-row items-center gap-1",t),...a})});d.displayName="PaginationContent";let f=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("li",{ref:r,className:(0,s.cn)("",t),...a})});f.displayName="PaginationItem";let m=e=>{let{className:r,isActive:t,size:a="icon",...i}=e;return(0,n.jsx)("a",{"aria-current":t?"page":void 0,className:(0,s.cn)((0,c.d)({variant:t?"outline":"ghost",size:a}),t?"bg-[rgb(124,58,237)] text-white font-bold border border-[rgb(124,58,237)]":"bg-white text-[rgb(124,58,237)] hover:bg-[rgb(104,50,210)]",r),...i})};m.displayName="PaginationLink";let h=e=>{let{className:r,...t}=e;return(0,n.jsxs)(m,{"aria-label":"Go to previous page",size:"default",className:(0,s.cn)("gap-1 pl-2.5",r),...t,children:[(0,n.jsx)(o,{className:"h-4 w-4"}),(0,n.jsx)("span",{children:"Previous"})]})};h.displayName="PaginationPrevious";let x=e=>{let{className:r,...t}=e;return(0,n.jsxs)(m,{"aria-label":"Go to next page",size:"default",className:(0,s.cn)("gap-1 pr-2.5",r),...t,children:[(0,n.jsx)("span",{children:"Next"}),(0,n.jsx)(l.Z,{className:"h-4 w-4"})]})};function v(e){let{totalPages:r,currentPage:t,onPageChange:a,className:i}=e,o=t>1?t-1:null,l=t<r?t+1:null;return(0,n.jsx)(u,{className:i,children:(0,n.jsxs)(d,{children:[o&&(0,n.jsx)(f,{children:(0,n.jsx)(h,{onClick:()=>a(o)})}),Array.from({length:r},(e,r)=>(0,n.jsx)(f,{className:"hidden sm:inline-block",children:(0,n.jsx)(m,{isActive:t===r+1,onClick:()=>a(r+1),children:r+1})},"page-button-".concat(r))),l&&(0,n.jsx)(f,{children:(0,n.jsx)(x,{onClick:()=>a(l)})})]})})}x.displayName="PaginationNext"},9213:function(e,r,t){t.d(r,{V:function(){return s}});var n=t(7437),a=t(8792),i=t(9584);t(2265);var o=t(7742);t(1657);let l=(0,o.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function s(e){let{tag:r,current:t,count:o}=e;return(0,n.jsxs)(a.default,{className:l({variant:t?"default":"secondary",className:"no-underline rounded-md text-[#585a5c] dark:text-slate-200"}),href:"/tags/".concat((0,i.o)(r)),children:[r," ",o?"(".concat(o,")"):null]})}},5754:function(e,r,t){t.d(r,{d:function(){return s},z:function(){return c}});var n=t(7437),a=t(2265),i=t(9143),o=t(7742),l=t(1657);let s=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=a.forwardRef((e,r)=>{let{className:t,variant:a,size:o,asChild:c=!1,...u}=e,d=c?i.g7:"button";return(0,n.jsx)(d,{className:(0,l.cn)(s({variant:a,size:o,className:t})),ref:r,...u})});c.displayName="Button"},7815:function(e,r,t){t.d(r,{Ol:function(){return l},Zb:function(){return o},aY:function(){return c},ll:function(){return s}});var n=t(7437),a=t(2265),i=t(1657);let o=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("div",{ref:r,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",t),...a})});o.displayName="Card";let l=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("div",{ref:r,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",t),...a})});l.displayName="CardHeader";let s=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("h3",{ref:r,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",t),...a})});s.displayName="CardTitle",a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("p",{ref:r,className:(0,i.cn)("text-sm text-muted-foreground",t),...a})}).displayName="CardDescription";let c=a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("div",{ref:r,className:(0,i.cn)("p-6 pt-0",t),...a})});c.displayName="CardContent",a.forwardRef((e,r)=>{let{className:t,...a}=e;return(0,n.jsx)("div",{ref:r,className:(0,i.cn)("flex items-center p-6 pt-0",t),...a})}).displayName="CardFooter"},1657:function(e,r,t){t.d(r,{Fs:function(){return c},O2:function(){return l},Ys:function(){return s},cn:function(){return i},p6:function(){return o}});var n=t(3167),a=t(1367);function i(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,a.m6)((0,n.W)(r))}function o(e){return new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}function l(e){return e.sort((e,r)=>e.date>r.date?-1:e.date<r.date?1:0)}function s(e){let r={};return e.forEach(e=>{if(e.published){var t;null===(t=e.tags)||void 0===t||t.forEach(e=>{var t;r[e]=(null!==(t=r[e])&&void 0!==t?t:0)+1})}}),r}function c(e){return Object.keys(e).sort((r,t)=>e[t]-e[r])}t(9584)},7461:function(e,r,t){t.d(r,{Z:function(){return o}});var n=t(2265),a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),o=(e,r)=>{let t=(0,n.forwardRef)(({color:t="currentColor",size:o=24,strokeWidth:l=2,absoluteStrokeWidth:s,className:c="",children:u,...d},f)=>(0,n.createElement)("svg",{ref:f,...a,width:o,height:o,stroke:t,strokeWidth:s?24*Number(l)/Number(o):l,className:["lucide",`lucide-${i(e)}`,c].join(" "),...d},[...r.map(([e,r])=>(0,n.createElement)(e,r)),...Array.isArray(u)?u:[u]]));return t.displayName=`${e}`,t}},7805:function(e,r,t){t.d(r,{Z:function(){return n}});/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,t(7461).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},8792:function(e,r,t){t.d(r,{default:function(){return a.a}});var n=t(5250),a=t.n(n)},7907:function(e,r,t){var n=t(5313);t.o(n,"usePathname")&&t.d(r,{usePathname:function(){return n.usePathname}}),t.o(n,"useRouter")&&t.d(r,{useRouter:function(){return n.useRouter}}),t.o(n,"useSearchParams")&&t.d(r,{useSearchParams:function(){return n.useSearchParams}})},7742:function(e,r,t){t.d(r,{j:function(){return i}});let n=e=>"boolean"==typeof e?"".concat(e):0===e?"0":e,a=function(){for(var e,r,t=0,n="";t<arguments.length;)(e=arguments[t++])&&(r=function e(r){var t,n,a="";if("string"==typeof r||"number"==typeof r)a+=r;else if("object"==typeof r){if(Array.isArray(r))for(t=0;t<r.length;t++)r[t]&&(n=e(r[t]))&&(a&&(a+=" "),a+=n);else for(t in r)r[t]&&(a&&(a+=" "),a+=t)}return a}(e))&&(n&&(n+=" "),n+=r);return n},i=(e,r)=>t=>{var i;if((null==r?void 0:r.variants)==null)return a(e,null==t?void 0:t.class,null==t?void 0:t.className);let{variants:o,defaultVariants:l}=r,s=Object.keys(o).map(e=>{let r=null==t?void 0:t[e],a=null==l?void 0:l[e];if(null===r)return null;let i=n(r)||n(a);return o[e][i]}),c=t&&Object.entries(t).reduce((e,r)=>{let[t,n]=r;return void 0===n||(e[t]=n),e},{});return a(e,s,null==r?void 0:null===(i=r.compoundVariants)||void 0===i?void 0:i.reduce((e,r)=>{let{class:t,className:n,...a}=r;return Object.entries(a).every(e=>{let[r,t]=e;return Array.isArray(t)?t.includes({...l,...c}[r]):({...l,...c})[r]===t})?[...e,t,n]:e},[]),null==t?void 0:t.class,null==t?void 0:t.className)}}}]);