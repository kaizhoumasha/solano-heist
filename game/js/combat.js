"use strict";
/* Solano Heist — combat: shooting, punching, bullets and hit effects. */
let bullets = [], effects = [];
function shoot(){if(S.ammo<=0){say('Out of ammo — find an ammo pickup');tone(120,.1,'square',.05);return}S.ammo--;S.shots++;const cam=camera();const wx=cam.x+mouse.x,wy=cam.y+mouse.y;const a=Math.atan2(wy-S.y,wx-S.x);bullets.push({x:S.x,y:S.y,angle:a,speed:900,life:0.8});sfx.shoot()}
function punch(){if(!S.started||S.onFoot===false)return;let hit=false;for(const p of police){if(dist(S.x,S.y,p.x,p.y)<70){p.hp-=25;hit=true;effects.push({x:p.x,y:p.y,t:0.4,txt:'-25'})}}for(const pd of peds){if(dist(S.x,S.y,pd.x,pd.y)<50){pd.flee=3;hit=true}}if(hit){sfx.hit();S.shots++}}
function updateBullets(dt){
  for(const b of bullets){b.x+=Math.cos(b.angle)*b.speed*dt;b.y+=Math.sin(b.angle)*b.speed*dt;b.life-=dt;
    for(const p of police){if(dist(b.x,b.y,p.x,p.y)<28){p.hp-=34;S.hits++;effects.push({x:p.x,y:p.y,t:0.4,txt:'-34'});b.life=0;addWanted(1);break}}
    for(const c of cars){if(c!==S.inCar&&dist(b.x,b.y,c.x,c.y)<28){c.hp-=20;b.life=0;if(c.hp<=0)c.dead=true;break}}}
  bullets=bullets.filter(b=>b.life>0);
}
function updateEffects(dt){effects.forEach(e=>e.t-=dt);effects=effects.filter(e=>e.t>0)}
function drawBullets(){
  ctx.fillStyle='#ff0';for(const b of bullets){ctx.beginPath();ctx.arc(b.x,b.y,4,0,7);ctx.fill()}
}
function drawEffects(){
  for(const e of effects){ctx.fillStyle='#ff0';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillText(e.txt,e.x,e.y)}
}
