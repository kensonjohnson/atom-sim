(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(o){if(o.ep)return;o.ep=!0;const t=r(o);fetch(o.href,t)}})();const f=1e3,u=1e3,d=700,S=8,_=200,G=.8,M={yellow:.1,red:1e-4,green:.2,blue:-2e-4},I={yellow:1e-4,red:.1,green:.34,blue:-2e-4},N={yellow:-.34,red:.17,green:.32,blue:-2e-4},T={yellow:5e-4,red:2e-4,green:2e-4,blue:-.001},g=document.getElementById("canvas");g.width=f;g.height=u;const y=g.getContext("2d");function U(c,n,r){y.fillStyle=c,y.fillRect(0,0,n,r)}function h(c,n,r,s){y.fillStyle=r,y.fillRect(c,n,s,s)}function w(c,n,r){return{xPosition:Math.random()*n,yPosition:Math.random()*r,xVelocity:0,yVelocity:0,color:c}}function m(c,n,r,s,o){const t=[];for(let i=0;i<c;i++){const e=w(s,n,r);t.push(e)}return{color:s,atoms:t,rules:o}}function x(c,n,r,s,o,t,i,e){for(const l of r)for(const a of r)F(l.atoms,a.atoms,l.rules[a.color],s,o,i,e);c.clearRect(0,0,s,o),U("black",s,o);for(const l of n)h(l.xPosition,l.yPosition,l.color,t);requestAnimationFrame(()=>{x(c,n,r,s,o,t,i,e)})}function F(c,n,r,s,o,t,i){for(const e of c){let l=0,a=0;for(const O of n){const p=e.xPosition-O.xPosition,P=e.yPosition-O.yPosition,E=Math.sqrt(p*p+P*P);if(E&&E<t){const A=r*(1/E);l-=A*p,a-=A*P}}e.xVelocity=(e.xVelocity+l)*i,e.xPosition+=e.xVelocity,e.yVelocity=(e.yVelocity+a)*i,e.yPosition+=e.yVelocity,(e.xPosition<0||e.xPosition>s)&&(e.xVelocity*=-1),(e.yPosition<0||e.yPosition>o)&&(e.yVelocity*=-1)}}const L=m(d,f,u,"yellow",M),R=m(d,f,u,"red",I),V=m(d,f,u,"green",N),b=m(d,f,u,"blue",T),C=[L,R,V,b],Y=[...L.atoms,...R.atoms,...V.atoms,...b.atoms];x(y,Y,C,f,u,S,_,G);
