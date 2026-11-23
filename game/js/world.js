"use strict";
/* Solano Heist — world: the city map, roads, buildings, collision, markers. */
const ROADS_X = [400,800,1200,1600,2000,2400,2800], ROADS_Y = [400,800,1200,1600,2000];
const buildings = [];
for(let bx=0;bx<7;bx++)for(let by=0;by<5;by++){
  const x0 = (bx===0?80:ROADS_X[bx-1]+70), y0 = (by===0?80:ROADS_Y[by-1]+70);
  const x1 = (bx<7?ROADS_X[bx]-70:3120), y1 = (by<5?ROADS_Y[by]-70:2320);
  const n = 1+Math.floor(rng()*2);
  for(let i=0;i<n;i++){
    const w = 120+rng()*180, h = 90+rng()*140;
    const x = x0+rng()*Math.max(1,(x1-x0-w)), y = y0+rng()*Math.max(1,(y1-y0-h));
    const cols = ['#7a5a3a','#5a6b7a','#8a6a4a','#4a6a5a','#6a5a7a','#7a7a5a','#5a5a6a'];
    buildings.push({x,y,w,h,c:cols[Math.floor(rng()*cols.length)],roof:rng()>.5});
  }
}
const parks = [{x:100,y:1700,w:280,h:220},{x:2500,y:100,w:260,h:220}];
const water = {x:0,y:0,w:60,h:2400};
const HIDEOUT = {x:2600,y:2000,label:'Hideout — The Gull Bar'};
const MARKERS = {dock:{x:600,y:2000,label:'South Dock'},plaza:{x:1600,y:800,label:'Solano Plaza'},north:{x:2400,y:400,label:'North Gate'}};
function onRoad(x,y){return ROADS_X.some(r=>Math.abs(x-r)<55)||ROADS_Y.some(r=>Math.abs(y-r)<55)}
function hitBuilding(x,y,r){for(const b of buildings){if(x+r>b.x&&x-r<b.x+b.w&&y+r>b.y&&y-r<b.y+b.h)return b}return null}
function collide(p,r){const b=hitBuilding(p.x,p.y,r);if(!b)return;const cx=clamp(p.x,b.x,b.x+b.w),cy=clamp(p.y,b.y,b.y+b.h);const dx=p.x-cx,dy=p.y-cy,d=Math.hypot(dx,dy)||1;if(d<r){p.x=cx+dx/d*r;p.y=cy+dy/d*r}}
/* Draw the ground, water, roads and buildings (caller has translated to world space). */
function drawWorld(){
  ctx.fillStyle='#2a4a2a';ctx.fillRect(0,0,WORLD_W,WORLD_H);
  ctx.fillStyle='#3a5a3a';for(const p of parks)ctx.fillRect(p.x,p.y,p.w,p.h);
  ctx.fillStyle='#2a6a9a';ctx.fillRect(water.x,water.y,water.w,water.h);
  ctx.fillStyle='#333';for(const r of ROADS_X)ctx.fillRect(r-55,0,110,WORLD_H);for(const r of ROADS_Y)ctx.fillRect(0,r-55,WORLD_W,110);
  ctx.strokeStyle='#e8c33a';ctx.setLineDash([22,18]);ctx.lineWidth=3;
  for(const r of ROADS_X){ctx.beginPath();ctx.moveTo(r,0);ctx.lineTo(r,WORLD_H);ctx.stroke()}
  for(const r of ROADS_Y){ctx.beginPath();ctx.moveTo(0,r);ctx.lineTo(WORLD_W,r);ctx.stroke()}
  ctx.setLineDash([]);
  for(const b of buildings){ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(b.x+6,b.y+8,b.w,b.h);ctx.fillStyle=b.c;ctx.fillRect(b.x,b.y,b.w,b.h);ctx.fillStyle='rgba(255,255,255,.18)';ctx.fillRect(b.x+8,b.y+8,b.w-16,10);if(b.roof){ctx.fillStyle='#c8d8e8';for(let i=0;i<3;i++)for(let j=0;j<2;j++)ctx.fillRect(b.x+14+i*30,b.y+24+j*28,14,12)}}
}
