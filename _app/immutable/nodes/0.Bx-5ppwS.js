import{u as Nt,v as Dt,w as Q,x as q,I as S,s as N,y as Lt,z as Mt,A as qt,e as Kt,B as Vt,m as Ft}from"../chunks/C2UbbaYp.js";import"../chunks/DsnmJJEf.js";import{o as Ht}from"../chunks/BSG17un0.js";import{aH as Ut,N as $t,L as $,M as It,aI as ut,Q as jt,R as Gt,T as Xt,U as dt,Y as vt,aJ as Z,af as ht,aE as pt,W as mt,q as Wt,a0 as Qt,ah as gt,am as bt,aK as _t,k as Jt,_ as Yt,$ as tt,w as Zt,e as J,u as it,r as te,I as ee,aL as re,a8 as ne,O as oe,aM as ae,aN as ie,ai as se,aO as F,aP as ce,aQ as le,aR as fe,ak as Et,C as nt,p as H,h as ot,f as T,D as st,t as K,b as w,c as U,H as V,aF as ct,d as A,g as x,a6 as Y,s as P,aC as W,a as R,aS as ue}from"../chunks/DKyuKv9V.js";import{a as de,o as wt,e as ve,d as lt,s as Ot,b as he}from"../chunks/Bvir9z7y.js";import{r as at}from"../chunks/BcXGvWV-.js";import{p as B,l as D,s as L,i as I}from"../chunks/BkpU17rM.js";import{b as Pt}from"../chunks/DqiZpyGC.js";import"../chunks/Dt8rrK3f.js";import{n as pe,p as me}from"../chunks/r2eH1Dq8.js";const et=0,j=1,rt=2;function ge(e,t,r,a,o){$&&It();var i=e,n=Ut(),s=Jt,l=vt,h,f,d,b=n?ht(void 0):pt(void 0,!1,!1),c=n?ht(void 0):pt(void 0,!1,!1),v=!1;function u(m,g){v=!0,g&&(gt(p),bt(p),_t(s));try{m===et&&r&&(h?Yt(h):h=mt(()=>r(i))),m!==et&&h&&tt(h,()=>h=null),m!==j&&f&&tt(f,()=>f=null),m!==rt&&d&&tt(d,()=>d=null)}finally{g&&(_t(null),bt(null),gt(null),Zt())}}var p=$t(()=>{if(l===(l=t()))return;let m=$&&ut(l)===(i.data===jt);if(m&&(i=Gt(),Xt(i),dt(!1),m=!0),ut(l)){var g=l;v=!1,g.then(y=>{g===l&&(Z(b,y),u(j,!0))},y=>{if(g===l)throw Z(c,y),u(rt,!0),c.v}),$?r&&(h=mt(()=>r(i))):Wt(()=>{v||u(et,!0)})}else Z(b,l),u(j,!1);return m&&dt(!0),()=>l=vt});$&&(i=Qt)}function yt(e,t,r){J(()=>{var a=it(()=>t(e,r?.())||{});if(r&&a?.update){var o=!1,i={};te(()=>{var n=r();ee(n),o&&re(i,n)&&(i=n,a.update(n))}),o=!0}if(a?.destroy)return()=>a.destroy()})}const be=()=>performance.now(),O={tick:e=>requestAnimationFrame(e),now:()=>be(),tasks:new Set};function zt(){const e=O.now();O.tasks.forEach(t=>{t.c(e)||(O.tasks.delete(t),t.f())}),O.tasks.size!==0&&O.tick(zt)}function _e(e){let t;return O.tasks.size===0&&O.tick(zt),{promise:new Promise(r=>{O.tasks.add(t={c:e,f:r})}),abort(){O.tasks.delete(t)}}}function G(e,t){Et(()=>{e.dispatchEvent(new CustomEvent(t))})}function we(e){if(e==="float")return"cssFloat";if(e==="offset")return"cssOffset";if(e.startsWith("--"))return e;const t=e.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(r=>r[0].toUpperCase()+r.slice(1)).join("")}function xt(e){const t={},r=e.split(";");for(const a of r){const[o,i]=a.split(":");if(!o||i===void 0)break;const n=we(o.trim());t[n]=i.trim()}return t}const ye=e=>e;function xe(e,t,r){var a=Nt,o,i,n,s=null;a.a??={element:e,measure(){o=this.element.getBoundingClientRect()},apply(){if(n?.abort(),i=this.element.getBoundingClientRect(),o.left!==i.left||o.right!==i.right||o.top!==i.top||o.bottom!==i.bottom){const l=t()(this.element,{from:o,to:i},r?.());n=X(this.element,l,void 0,1,()=>{n?.abort(),n=void 0})}},fix(){if(!e.getAnimations().length){var{position:l,width:h,height:f}=getComputedStyle(e);if(l!=="absolute"&&l!=="fixed"){var d=e.style;s={position:d.position,width:d.width,height:d.height,transform:d.transform},d.position="absolute",d.width=h,d.height=f;var b=e.getBoundingClientRect();if(o.left!==b.left||o.top!==b.top){var c=`translate(${o.left-b.left}px, ${o.top-b.top}px)`;d.transform=d.transform?`${d.transform} ${c}`:c}}}},unfix(){if(s){var l=e.style;l.position=s.position,l.width=s.width,l.height=s.height,l.transform=s.transform}}},a.a.element=e}function At(e,t,r,a){var o=(e&le)!==0,i=(e&fe)!==0,n=o&&i,s=(e&ce)!==0,l=n?"both":o?"in":"out",h,f=t.inert,d=t.style.overflow,b,c;function v(){return Et(()=>h??=r()(t,a?.()??{},{direction:l}))}var u={is_global:s,in(){if(t.inert=f,!o){c?.abort(),c?.reset?.();return}i||b?.abort(),G(t,"introstart"),b=X(t,v(),c,1,()=>{G(t,"introend"),b?.abort(),b=h=void 0,t.style.overflow=d})},out(y){if(!i){y?.(),h=void 0;return}t.inert=!0,G(t,"outrostart"),c=X(t,v(),b,0,()=>{G(t,"outroend"),y?.()})},stop:()=>{b?.abort(),c?.abort()}},p=ne;if((p.transitions??=[]).push(u),o&&de){var m=s;if(!m){for(var g=p.parent;g&&(g.f&oe)!==0;)for(;(g=g.parent)&&(g.f&ae)===0;);m=!g||(g.f&ie)!==0}m&&J(()=>{it(()=>u.in())})}}function X(e,t,r,a,o){var i=a===1;if(se(t)){var n,s=!1;return Wt(()=>{if(!s){var p=t({direction:i?"in":"out"});n=X(e,p,r,a,o)}}),{abort:()=>{s=!0,n?.abort()},deactivate:()=>n.deactivate(),reset:()=>n.reset(),t:()=>n.t()}}if(r?.deactivate(),!t?.duration)return o(),{abort:F,deactivate:F,reset:F,t:()=>a};const{delay:l=0,css:h,tick:f,easing:d=ye}=t;var b=[];if(i&&r===void 0&&(f&&f(0,1),h)){var c=xt(h(0,1));b.push(c,c)}var v=()=>1-a,u=e.animate(b,{duration:l,fill:"forwards"});return u.onfinish=()=>{u.cancel();var p=r?.t()??1-a;r?.abort();var m=a-p,g=t.duration*Math.abs(m),y=[];if(g>0){var _=!1;if(h)for(var k=Math.ceil(g/16.666666666666668),C=0;C<=k;C+=1){var E=p+m*d(C/k),z=xt(h(E,1-E));y.push(z),_||=z.overflow==="hidden"}_&&(e.style.overflow="hidden"),v=()=>{var M=u.currentTime;return p+m*d(M/g)},f&&_e(()=>{if(u.playState!=="running")return!1;var M=v();return f(M,1-M),!0})}u=e.animate(y,{duration:g,fill:"forwards"}),u.onfinish=()=>{v=()=>a,f?.(a,1-a),o()}},{abort:()=>{u&&(u.cancel(),u.effect=null,u.onfinish=F)},deactivate:()=>{o=F},reset:()=>{a===0&&f?.(1,0)},t:()=>v()}}class ft{#t=new WeakMap;#e;#r;static entries=new WeakMap;constructor(t){this.#r=t}observe(t,r){var a=this.#t.get(t)||new Set;return a.add(r),this.#t.set(t,a),this.#n().observe(t,this.#r),()=>{var o=this.#t.get(t);o.delete(r),o.size===0&&(this.#t.delete(t),this.#e.unobserve(t))}}#n(){return this.#e??(this.#e=new ResizeObserver(t=>{for(var r of t){ft.entries.set(r.target,r);for(var a of this.#t.get(r.target)||[])a(r)}}))}}var Ae=new ft({box:"border-box"});function ke(e,t,r){var a=Ae.observe(e,()=>r(e[t]));J(()=>(it(()=>r(e[t])),a))}const Ce=!0,Re=!0,Te=async e=>{await e.parent(),await Dt.id()},yr=Object.freeze(Object.defineProperty({__proto__:null,load:Te,prerender:Ce,ssr:Re},Symbol.toStringTag,{value:"Module"})),We="data:image/png;base64,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",kt=()=>{};function Ee(e,t=0,r={}){let a=!1,o=null,i=null;const n=[],s=[],l=r.before||kt,h=r.after||kt;function f(){return o!==null?(clearTimeout(o),o=null,!0):!1}function d(){f()&&(i=null),a=!1,n.length=0,s.length=0}function b(){if(i!==null)return i()}function c(p){for(const m of n)m(p);d()}function v(p){for(const m of s)m(p);d()}const u=function(...m){const g=this;function y(){const _=e.apply(g,m);if(h(),typeof _?.then=="function")try{_.then(c),typeof _?.catch=="function"&&_.catch(v)}catch(k){v(k)}else c(_);return _}return a||(a=!0,l()),i=y,f(),o=setTimeout(y,t),new Promise((_,k)=>{n.push(_),s.push(k)})};return u.cancel=d,u.flush=b,u}function Oe(e,t={enabled:!0}){let{enabled:r,eventType:a,nodeForEvent:o,options:i}=Ct(t);function n(l){l.target&&e&&!e.contains(l.target)&&!l.defaultPrevented&&e.dispatchEvent(new CustomEvent("clickoutside",{detail:l}))}let s;return t.enabled!==!1&&(s=wt(o,a,n,i)),{update(l){s?.(),{enabled:r,eventType:a,nodeForEvent:o,options:i}=Ct(l),r&&(s=wt(o,a,n,i))},destroy(){s?.()}}}function Ct(e={}){return{enabled:e.enabled??!0,nodeForEvent:e.limit?.parent??document,eventType:e.event??"click",options:typeof e.options=="boolean"?{capture:e.options}:e.options}}function Pe(e,t="body"){let r;async function a(i){if(t=i,typeof t=="string"){if(r=document.querySelector(t),r===null&&(await nt(),r=document.querySelector(t)),r===null)throw new Error(`No element found matching css selector: "${t}"`)}else if(t instanceof HTMLElement)r=t;else throw new TypeError(`Unknown portal target type: ${t===null?"null":typeof t}. Allowed types: string (CSS selector) or HTMLElement.`);r.appendChild(e),e.hidden=!1}function o(){e.parentNode&&e.parentNode.removeChild(e)}return a(t),{update:a,destroy:o}}var ze=T('<div role="menu" tabindex="-1"><!></div>');function Be(e,t){H(t,!0);let r=B(t,"anchorPosition",3,"bottom-right"),a=B(t,"position",3,"top-right"),o=B(t,"open",15,!1),i=B(t,"closeOnClickOutside",3,!0),n,s=ct(0);ot(()=>{t.anchor&&n&&o()&&l()});async function l(){if(!o())return;const c=t.anchor.getBoundingClientRect();switch(n.style.top=n.style.left=n.style.bottom=n.style.right="",await nt(),r()){case"top-left":{n.style.top=`${c.top}px`,n.style.left=`${c.left}px`;break}case"top-right":{n.style.top=`${c.top}px`,n.style.right=`${t.anchor.ownerDocument.body.offsetWidth-c.right}px`;break}case"top-center":{n.style.top=`${c.top}px`,n.style.left=`${c.left+c.width*.5-V(s)*.5}px`;break}case"bottom-right":{n.style.top=`${c.bottom}px`,n.style.right=`${t.anchor.ownerDocument.body.offsetWidth-c.right}px`;break}case"bottom-left":{n.style.top=`${c.bottom}px`,n.style.left=`${c.left}px`;break}case"bottom-center":{n.style.top=`${c.bottom}px`,n.style.left=`${c.left+c.width*.5-V(s)*.5}px`;break}}await nt();const v=n.getBoundingClientRect();v.left<0?(n.style.right="",n.style.left="0px"):v.right>t.anchor.ownerDocument.body.offsetWidth&&(n.style.right="0px",n.style.left=""),v.top<0?n.style.top="0px":v.top>t.anchor.ownerDocument.body.offsetHeight&&(n.style.top="",n.style.bottom="0px")}ot(()=>{const c=Ee(l,0);return window.addEventListener("resize",c),document.addEventListener("scroll",c,!0),()=>{window.removeEventListener("resize",c),document.removeEventListener("scroll",c,!0)}});function h(c){c.stopPropagation(),o()&&o(!1)}var f=ze();let d;var b=A(f);st(b,()=>t.children),x(f),Pt(f,c=>n=c,()=>n),J(()=>ke(f,"offsetWidth",c=>Y(s,c))),yt(f,c=>Pe?.(c)),yt(f,(c,v)=>Oe?.(c,v),()=>({event:"pointerdown",enabled:i()})),K(c=>d=Q(f,1,"card absolute z-20 flex max-h-full max-w-full flex-col overflow-hidden p-0 shadow transition-transform duration-75 focus:outline-none",null,d,c),[()=>({"scale-0":!o(),"scale-100":o(),"origin-top-right":a()==="top-right","origin-top-left":a()==="top-left","origin-top":a()==="top-center","origin-bottom-right":a()==="bottom-right","origin-bottom-left":a()==="bottom-left","origin-bottom":a()==="bottom-center"})]),ve("clickoutside",f,h),w(e,f),U()}function Se(e,t){e.preventDefault(),e.stopPropagation(),t(!t())}var Ne=T('<div><div class="flex min-w-fit flex-grow items-center justify-center"><!></div> <!></div>');function De(e,t){H(t,!0);let r=B(t,"name",3,""),a=B(t,"className",3,""),o=B(t,"open",15,!1),i=B(t,"closeOnClickOutside",3,!0),n=ct(void 0);var s=Ne(),l=A(s);l.__pointerdown=[Se,o];var h=A(l);st(h,()=>t.button),x(l);var f=P(l,2);Be(f,{get anchor(){return V(n)},get anchorPosition(){return t.anchorPosition},get position(){return t.position},get closeOnClickOutside(){return i()},get children(){return t.children},get open(){return o()},set open(d){o(d)}}),x(s),Pt(s,d=>Y(n,d),()=>V(n)),K(()=>{Q(s,1,`static flex min-w-fit flex-col ${a()??""}`),q(l,"aria-label",r())}),w(e,s),U()}lt(["pointerdown"]);function Le(e,t){const r=D(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56"}]];S(e,L({name:"loader-circle"},()=>r,{get iconNode(){return a},children:(o,i)=>{var n=W(),s=R(n);N(s,t,"default",{}),w(o,n)},$$slots:{default:!0}}))}function Me(e,t){const r=D(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];S(e,L({name:"circle-check"},()=>r,{get iconNode(){return a},children:(o,i)=>{var n=W(),s=R(n);N(s,t,"default",{}),w(o,n)},$$slots:{default:!0}}))}function qe(e,t){const r=D(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];S(e,L({name:"circle-x"},()=>r,{get iconNode(){return a},children:(o,i)=>{var n=W(),s=R(n);N(s,t,"default",{}),w(o,n)},$$slots:{default:!0}}))}function Ke(e,t){const r=D(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];S(e,L({name:"info"},()=>r,{get iconNode(){return a},children:(o,i)=>{var n=W(),s=R(n);N(s,t,"default",{}),w(o,n)},$$slots:{default:!0}}))}function Ve(e,t){const r=D(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M4 12h16"}],["path",{d:"M4 18h16"}],["path",{d:"M4 6h16"}]];S(e,L({name:"menu"},()=>r,{get iconNode(){return a},children:(o,i)=>{var n=W(),s=R(n);N(s,t,"default",{}),w(o,n)},$$slots:{default:!0}}))}function Fe(e,t){const r=D(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];S(e,L({name:"settings"},()=>r,{get iconNode(){return a},children:(o,i)=>{var n=W(),s=R(n);N(s,t,"default",{}),w(o,n)},$$slots:{default:!0}}))}function He(e,t){const r=D(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const a=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];S(e,L({name:"triangle-alert"},()=>r,{get iconNode(){return a},children:(o,i)=>{var n=W(),s=R(n);N(s,t,"default",{}),w(o,n)},$$slots:{default:!0}}))}var Ue=ue('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 523.49" fill="currentColor" class="svelte-1gdf6cp"><path d="M85.54,320.91h145.64c11,0,19.91,8.92,19.91,19.91h0c0,11-8.92,19.91-19.91,19.91H72.65c-8.54,0-23.99-1.96-31.42-5.36-15.88-7.26-25.82-23.16-27.36-39.86-.42-4.54-.84-9.09-1.47-13.61v-.06c-.73-5.18,5.5-8.28,9.26-4.64,5.11,4.96,12.19,10.17,21.98,14.68,13.12,6.05,27.46,9.01,41.91,9.01Z"></path><path d="M360.22,342.48c-.14-59.29-49.01-106.96-108.31-106.96h-28.89c-2.91,0-5.26,2.36-5.26,5.26v29.3c0,2.91,2.36,5.26,5.26,5.26h29.07c37.13,0,67.96,29.65,68.3,66.77.34,37.45-30.02,68.02-67.4,68.02H114.8c-11.66,0-21.11,9.45-21.11,21.11v14.12c0,2.54,2.06,4.6,4.6,4.6h154.7c59.21,0,107.37-48.24,107.22-107.49Z"></path><path d="M406.26,95.97c3.11,0,5.48-2.81,4.91-5.87-2.41-12.93-9.48-27.75-9.48-27.75C385.68,24.48,348.75,0,307.62,0,307.62,0,307.63,0,307.62,0,280.27,0,254.54,10.75,235.18,30.28c-19.37,19.53-29.9,45.36-29.67,72.72,0,.94.03,1.87.06,2.8,1.48,41.52,29.5,77.82,69.71,90.32l33.32,10.36.39.12c29.54,8.52,56.1,26.44,74.79,50.45,19.22,24.68,29.37,54.13,29.37,85.16,0,78-65.4,141.45-145.78,141.45h0c-11,0-19.91,8.92-19.91,19.91v15.26c0,2.57,2.08,4.66,4.66,4.66h15.26c49.48,0,96.02-18.79,131.05-52.91,35.18-34.26,54.55-79.85,54.55-128.37,0-39.98-13.06-77.89-37.77-109.63-23.78-30.54-57.5-53.33-94.98-64.19l-33.12-10.3c-24.09-7.49-40.86-29.07-41.74-53.72-.02-.57-.03-1.15-.04-1.72-.14-16.66,6.29-32.4,18.12-44.34,11.82-11.93,27.51-18.49,44.16-18.49,25.09,0,47.62,14.93,57.4,38.05l2.97,6.92c2.91,6.78,9.57,11.18,16.95,11.18h21.33Z"></path><path d="M375.85,108.76c-6.87,0-13.07-4.11-15.75-10.44h0c-4.28-10.13-15.97-14.87-26.1-10.58l-12.07,5.1c-3.46,1.47-5.08,5.46-3.62,8.93l5.1,12.07c8.93,21.11,29.51,34.75,52.43,34.75h93.22c17.08,0,30.93-13.85,30.93-30.93h0c0-4.91-3.98-8.9-8.9-8.9h-115.25Z"></path><path d="M179.13,234.87c-4.49-.34-11.57-1.07-17.85-2.61-42.82-11.45-74.3-36.05-93.68-71.5-6.69-12.25-10.89-24.12-13.51-33.87-3.81-14.17-16.37-24.23-31.02-24.95l-8.61-.42c-2.39-.12-4.47,1.63-4.77,4.01L.76,177.12c-4.62,31.93,12.43,62.53,38.71,80.32,13.96,9.45,30.24,14.45,47.07,14.45l74.75,3.06h17.47c2.72,0,4.93-2.21,4.93-4.93v-30.24c0-2.58-1.98-4.73-4.55-4.92Z"></path></svg>');function $e(e){var t=Ue();w(e,t)}const Ie=""+new URL("../assets/logo-horizontal.TsqDIa3F.webp",import.meta.url).href;function je(e,t){Y(t,!1)}var Ge=T('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'),Xe=T('<button class="btn primary icon flex"><!></button>'),Qe=T('<a><!><span class="ms-4"> </span></a>'),Je=T('<div class="card flex min-h-fit flex-shrink flex-row justify-between p-0"><div class="ms-2 flex flex-shrink flex-row items-center justify-center"><a class="flex flex-row items-center justify-center"><span class="inline-block h-8"><!></span> <img class="my-1 ms-2 inline-block h-6 max-sm:hidden" alt="DuckDuckFit"/></a> <!></div> <div class="me-2 flex flex-shrink flex-row"><div class="m-1 flex flex-col content-center justify-center"><!></div></div></div>');function Ye(e,t){H(t,!0);let r=ct(!1);var a=Je(),o=A(a),i=A(o),n=A(i),s=A(n);$e(s),x(n);var l=P(n,2);x(i);var h=P(i,2);ge(h,()=>pe.complete,c=>{var v=Ge(),u=A(v),p=A(u);Le(p,{}),x(u),x(v),w(c,v)}),x(o);var f=P(o,2),d=A(f),b=A(d);De(b,{get open(){return V(r)},set open(v){Y(r,v,!0)},button:v=>{var u=Xe(),p=A(u);Ve(p,{}),x(u),w(v,u)},children:(v,u)=>{var p=Qe();p.__click=[je,r];var m=A(p);Fe(m,{});var g=P(m),y=A(g,!0);x(g),x(p),K((_,k,C)=>{q(p,"href",_),Q(p,1,k),Ot(y,C)},[()=>at("/settings/application"),()=>Lt({"default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600":!0,"bg-black/10":me.route.id?.startsWith("/(initted)/settings")}),()=>Mt()]),w(v,p)},$$slots:{button:!0,default:!0}}),x(d),x(f),x(a),K(c=>{q(i,"href",c),q(l,"src",Ie)},[()=>at("/")]),w(e,a),U()}lt(["click"]);function Ze(e){const t=e-1;return t*t*t+1}function Rt(e){const t=typeof e=="string"&&e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return t?[parseFloat(t[1]),t[2]||"px"]:[e,"px"]}function Tt(e,{delay:t=0,duration:r=400,easing:a=Ze,x:o=0,y:i=0,opacity:n=0}={}){const s=getComputedStyle(e),l=+s.opacity,h=s.transform==="none"?"":s.transform,f=l*(1-n),[d,b]=Rt(o),[c,v]=Rt(i);return{delay:t,duration:r,easing:a,css:(u,p)=>`
			transform: ${h} translate(${(1-u)*d}${b}, ${(1-u)*c}${v});
			opacity: ${l-f*p}`}}function tr(e){const t=e-1;return t*t*t+1}function er(e,{from:t,to:r},a={}){var{delay:o=0,duration:i=C=>Math.sqrt(C)*120,easing:n=tr}=a,s=getComputedStyle(e),l=s.transform==="none"?"":s.transform,[h,f]=s.transformOrigin.split(" ").map(parseFloat);h/=e.clientWidth,f/=e.clientHeight;var d=rr(e),b=e.clientWidth/r.width/d,c=e.clientHeight/r.height/d,v=t.left+t.width*h,u=t.top+t.height*f,p=r.left+r.width*h,m=r.top+r.height*f,g=(v-p)*b,y=(u-m)*c,_=t.width/r.width,k=t.height/r.height;return{delay:o,duration:typeof i=="function"?i(Math.sqrt(g*g+y*y)):i,easing:n,css:(C,E)=>{var z=E*g,M=E*y,Bt=C+E*_,St=C+E*k;return`transform: ${l} translate(${z}px, ${M}px) scale(${Bt}, ${St});`}}}function rr(e){if("currentCSSZoom"in e)return e.currentCSSZoom;for(var t=e,r=1;t!==null;)r*=+getComputedStyle(t).zoom,t=t.parentElement;return r}function nr(e,t){qt(t.notification.id)}var or=T('<button><div class="mr-2 h-6 w-6 text-white"><!></div> <div class="flex-grow text-left text-white"> </div></button>');function ar(e,t){H(t,!0);var r=or();let a;r.__click=[nr,t];var o=A(r),i=A(o);{var n=f=>{qe(f,{})},s=f=>{var d=W(),b=R(d);{var c=u=>{Me(u,{})},v=u=>{var p=W(),m=R(p);{var g=_=>{Ke(_,{})},y=_=>{var k=W(),C=R(k);{var E=z=>{He(z,{})};I(C,z=>{t.notification.type==="warning"&&z(E)},!0)}w(_,k)};I(m,_=>{t.notification.type==="info"?_(g):_(y,!1)},!0)}w(u,p)};I(b,u=>{t.notification.type==="success"?u(c):u(v,!1)},!0)}w(f,d)};I(i,f=>{t.notification.type==="error"?f(n):f(s,!1)})}x(o);var l=P(o,2),h=A(l,!0);x(l),x(r),K(f=>{a=Q(r,1,"m-1 flex flex-grow cursor-pointer flex-row items-center px-3 py-2 shadow",null,a,f),Ot(h,t.notification.message)},[()=>({"bg-green-600":t.notification.type==="success","bg-red-600":t.notification.type==="error","bg-blue-600":t.notification.type==="info","bg-yellow-600":t.notification.type==="warning"})]),w(e,r),U()}lt(["click"]);var ir=T("<div><!></div>"),sr=T('<div class="fixed top-0 left-1/2 z-[100000] -translate-x-1/2"><div class="flex flex-col"></div></div>');function cr(e){var t=sr(),r=A(t);Kt(r,13,()=>Vt,a=>a.id,(a,o)=>{var i=ir(),n=A(i);ar(n,{get notification(){return V(o)}}),x(i),xe(i,()=>er,null),At(1,i,()=>Tt,()=>({y:-64,duration:300})),At(2,i,()=>Tt,()=>({y:-64,duration:300})),w(a,i)}),x(r),x(t),w(e,t)}var lr=T('<link rel="shortcut icon"/> <link rel="manifest" crossorigin="use-credentials"/>',1),fr=T("<!> <!> <!>",1);function xr(e,t){H(t,!0),ot(()=>{Ft()==="dark"?document.body.classList.add("dark"):document.body.classList.remove("dark")}),Ht(()=>{document.body.classList.add("hydrated")});var r=fr();he(n=>{var s=lr(),l=R(s),h=P(l,2);K(f=>{q(l,"href",We),q(h,"href",f)},[()=>at("/manifest.json")]),w(n,s)});var a=R(r);Ye(a,{});var o=P(a,2);st(o,()=>t.children);var i=P(o,2);cr(i),w(e,r),U()}export{xr as component,yr as universal};
