"use strict";
/* Solano Heist — missions: the four-mission story, cash bags, pickups, markers. */
const MISSIONS = [
 {title:'1 · Get Wheels',text:'Steal any car (walk to it, press E). Port Solano is yours — just don\'t get caught yet.',goal:'car'},
 {title:'2 · First Delivery',text:'Drive to the South Dock marker. A package is waiting. Don\'t scratch the paint too much.',goal:'dock',time:150},
 {title:'3 · Lose the Heat',text:'The cops are on you. Reach the Hideout (The Gull Bar) or survive 45 seconds with 3 stars.',goal:'hideout',time:60},
 {title:'4 · The Big Score',text:'Collect 3 cash bags across the city, then get back to the Hideout. This is the job Rex has been waiting for.',goal:'bags'}];
const bags = [{x:500,y:500,taken:false},{x:2100,y:1200,taken:false},{x:900,y:1900,taken:false}];
const pickups = [{x:1200,y:400,kind:'health'},{x:2000,y:1600,kind:'ammo'},{x:800,y:1200,kind:'health'},{x:2800,y:800,kind:'ammo'}];
function missionTarget(){const m=MISSIONS[S.mission];if(!m)return null;if(m.goal==='car'){let best=null,bd=1e9;for(const c of cars){if(c.dead)continue;const d=dist(S.x,S.y,c.x,c.y);if(d<bd){bd=d;best=c}}return best?{x:best.x,y:best.y,label:'Steal a car'}:null}if(m.goal==='dock')return MARKERS.dock;if(m.goal==='hideout')return HIDEOUT;if(m.goal==='bags'){const b=bags.find(b=>!b.taken);return b?{x:b.x,y:b.y,label:'Cash bag'}:HIDEOUT}return null}
function updatePickups(dt){
  for(const pk of pickups){if(!pk.taken&&dist(S.x,S.y,pk.x,pk.y)<36){pk.taken=true;if(pk.kind==='health'){S.hp=Math.min(100,S.hp+40);say('Health +40')}else{S.ammo+=24;say('Ammo +24')}sfx.pickup();S.money+=10}}
}
function updateMissions(dt){
  const m = MISSIONS[S.mission];
  if(m){
    if(m.goal==='car'&&S.inCar){S.mission++;S.money+=100;S.missionTimer=0;say('Mission complete — +$100');sfx.win();save()}
    else if(m.goal==='dock'&&dist(S.x,S.y,MARKERS.dock.x,MARKERS.dock.y)<70){S.mission++;S.money+=200;S.missionTimer=0;addWanted(1);say('Delivery done — +$200, but the cops noticed');sfx.win();save()}
    else if(m.goal==='hideout'){if(dist(S.x,S.y,HIDEOUT.x,HIDEOUT.y)<80){S.mission++;S.money+=300;S.missionTimer=0;S.wanted=0;police=[];say('You lost them — +$300');sfx.win();save()}else if(m.time&&S.missionTimer>45){S.mission++;S.money+=300;S.missionTimer=0;S.wanted=Math.max(0,S.wanted-2);say('Survived the heat — +$300');sfx.win();save()}}
    else if(m.goal==='bags'){for(const b of bags){if(!b.taken&&dist(S.x,S.y,b.x,b.y)<40){b.taken=true;S.money+=150;say('Cash bag — +$150');sfx.coin()}}if(bags.every(b=>b.taken)&&dist(S.x,S.y,HIDEOUT.x,HIDEOUT.y)<80){S.win=true;S.money+=800;sfx.win();save()}}
    if(S.mission>=MISSIONS.length){S.win=true}
  }
}
function drawMarkers(tgt){
  if(tgt&&S.started&&!S.win){const pulse=1+Math.sin(Date.now()/200)*0.15;ctx.fillStyle='#ff0';ctx.beginPath();ctx.arc(tgt.x,tgt.y,16*pulse,0,7);ctx.fill();ctx.fillStyle='#000';ctx.font='bold 20px sans-serif';ctx.textAlign='center';ctx.fillText('★',tgt.x,tgt.y+7);ctx.fillStyle='#ff0';ctx.font='bold 14px sans-serif';ctx.fillText(tgt.label||'',tgt.x,tgt.y-26)}
  ctx.fillStyle='#f80';for(const b of bags){if(!b.taken){ctx.fillRect(b.x-10,b.y-8,20,16);ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.fillText('$',b.x,b.y+4);ctx.fillStyle='#f80'}}
  for(const pk of pickups){if(!pk.taken){ctx.fillStyle=pk.kind==='health'?'#0f0':'#ff0';ctx.beginPath();ctx.arc(pk.x,pk.y,12,0,7);ctx.fill();ctx.fillStyle='#000';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText(pk.kind==='health'?'+':'A',pk.x,pk.y+5)}}
  ctx.fillStyle='#f0f';ctx.fillRect(HIDEOUT.x-14,HIDEOUT.y-14,28,28);ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.fillText('HIDE',HIDEOUT.x,HIDEOUT.y+4);
}
