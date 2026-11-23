"use strict";
/* Solano Heist — police: the wanted level, police spawning, chase and ramming. */
let police = [];
function spawnPolice(n){for(let i=0;i<n;i++){const a=rng()*6.28;police.push({x:clamp(S.x+Math.cos(a)*500,60,3140),y:clamp(S.y+Math.sin(a)*500,60,2340),angle:a,speed:0,hp:60,color:'#123',siren:0})}}
function addWanted(n){S.wanted=clamp(S.wanted+n,0,5);S.crimeTimer=0;if(n>0)sfx.siren()}
function updateWanted(dt){
  S.crimeTimer+=dt;if(S.crimeTimer>25&&S.wanted>0&&police.length===0){S.wanted--;S.crimeTimer=0}
  if(S.wanted>0&&police.length<Math.min(5,S.wanted+1))spawnPolice(1);
  if(S.wanted===0)police=[];
}
function updatePolice(dt){
  for(const p of police){const a=Math.atan2(S.y-p.y,S.x-p.x);let da=a-p.angle;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;p.angle+=clamp(da,-2.4*dt,2.4*dt);p.speed=clamp(p.speed+220*dt,0,300);p.x+=Math.cos(p.angle)*p.speed*dt;p.y+=Math.sin(p.angle)*p.speed*dt;p.siren+=dt;if(p.siren>0.9){p.siren=0;sfx.siren()}
    if(dist(p.x,p.y,S.x,S.y)<34){S.hp-=22*dt;effects.push({x:S.x,y:S.y,t:0.3,txt:'RAMMED!'});
      if(S.inCar){S.inCar.hp-=20*dt;if(S.inCar.hp<=0){S.inCar.dead=true;S.inCar=null;S.onFoot=true;say('Your car is wrecked!')}}
      if(S.hp<=0){S.hp=0;S.dead=true;say('Busted by the Solano PD')}}}
  police=police.filter(p=>p.hp>0&&dist(p.x,p.y,S.x,S.y)<1200);
}
function drawPolice(){
  for(const p of police){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle='#123';ctx.fillRect(-20,-11,40,22);ctx.fillStyle='#fff';ctx.fillRect(-4,-11,8,22);ctx.fillStyle=(Date.now()/300%2<1)?'#f00':'#00f';ctx.fillRect(-8,-13,16,5);ctx.restore()}
}
