import{d as T,e as b,f as y,h as G}from"../chunks/C4Gu0MGd.js";import{e as $}from"../chunks/KjYeVjkE.js";import"../chunks/NZTpNUN0.js";import{I,a as B,b as w,p as E,f as P,t as v,c as S,d as l,i as x,ao as _,$ as j,s as g,r as i}from"../chunks/Bp7a5Wgv.js";import{s as z}from"../chunks/CvtWGm_s.js";import{h as M}from"../chunks/CXuh_ngx.js";import{s as N}from"../chunks/Jqpb2jq0.js";import{E as O}from"../chunks/UWNd23f3.js";import{b as W}from"../chunks/Dh8AOo2j.js";import"../chunks/IVZvQc6H.js";import{v as q}from"../chunks/BTEaUJ4b.js";import"../chunks/CBNN8OxY.js";import{I as C,s as L}from"../chunks/Dxvg61WF.js";import{l as U,s as A}from"../chunks/BfGgFdEn.js";function D(a,e){const o=U(e,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.525.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
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
 */const d=[["path",{d:"m15 18-6-6 6-6"}]];C(a,A({name:"chevron-left"},()=>o,{get iconNode(){return d},children:(s,n)=>{var r=I(),t=B(r);L(t,e,"default",{}),w(s,r)},$$slots:{default:!0}}))}const F=!1,H=async a=>{await a.parent();const e=a.params.id,o=await T(e);o||$(404);const d=o.setGroupTemplates.flatMap(r=>r.setTemplates.map(t=>t.exerciseGuid)),s=[...new Set(d)],n=(await Promise.all(s.map(r=>b(r)))).reduce((r,t)=>(t&&(r[t.guid]=t),r),{});return{referrer:a.url.searchParams.get("referrer"),exerciseByGuid:n,workoutTemplateId:e,workoutTemplate:o}},ie=Object.freeze(Object.defineProperty({__proto__:null,load:H,prerender:F},Symbol.toStringTag,{value:"Module"}));var J=P('<div class="flex flex-grow flex-col overflow-y-auto overflow-x-hidden"><div class="flex w-full flex-grow flex-col sm:container sm:mx-auto"><div class="mb-16 mt-4"><div class="flex flex-shrink flex-row"><a class="flex flex-shrink flex-row"><!> </a></div> <div class="flex flex-grow flex-col"><div class="card flex flex-shrink flex-col"><!></div></div></div></div></div>');function de(a,e){E(e,!0);let o=_(()=>G(e.data.workoutTemplate)),d=_(()=>e.data.referrer||`${W}/${y()}/workout-templates`);var s=J();M(p=>{v(()=>j.title=x(o).name)});var n=l(s),r=l(n),t=l(r),m=l(t),f=l(m);D(f,{});var h=g(f);i(m),i(t);var c=g(t,2),u=l(c),k=l(u);O(k,{get exerciseByGuid(){return e.data.exerciseByGuid},get workoutTemplateId(){return e.data.workoutTemplateId},get workoutTemplate(){return e.data.workoutTemplate}}),i(u),i(c),i(r),i(n),i(s),v(p=>{N(m,"href",x(d)),z(h,` ${p??""}`)},[()=>q()]),w(a,s),S()}export{de as component,ie as universal};
