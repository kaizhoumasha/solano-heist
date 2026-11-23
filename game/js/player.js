"use strict";
/* Solano Heist — player: keyboard/mouse input, stealing cars, movement, restart. */
const keys = {}, mouse = {x:640,y:360,down:false};
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key===' '){e.preventDefault();punch()}if(e.key.toLowerCase()==='e')enterExitCar();if(e.key.toLowerCase()==='p')S.paused=!S.paused;if(e.key.toLowerCase()==='m'){muted=!muted;say(muted?'Sound muted':'Sound on')}if(e.key.toLowerCase()==='r'&&S.dead)restart()});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
cv.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width*1280;mouse.y=(e.clientY-r.top)/r.height*720});
cv.addEventListener('mousedown',e=>{if(!S.started){startGame();startClickPending=false;return}if(S.paused||S.dead||S.win)return;if(startClickPending){startClickPending=false;return}shoot()});
function enterExitCar(){if(!S.started||S.dead)return;if(S.inCar){const c=S.inCar;S.inCar=null;S.onFoot=true;S.x=c.x+40;S.y=c.y;return}let best=null,bd=90;for(const c of cars){if(c.dead)continue;const d=dist(S.x,S.y,c.x,c.y);if(d<bd){bd=d;best=c}}if(best){if(best.parked||best.traffic){S.inCar=best;S.onFoot=false;best.parked=false;best.traffic=false;addWanted(1);say('Car stolen — wanted +1 star');sfx.car()}else{S.inCar=best;S.onFoot=false}}}
function restart(){Object.assign(S,{x:1600,y:1200,hp:100,money:50,ammo:24,wanted:0,mission:0,missionTimer:0,win:false,dead:false,missionDone:false});police=[];bags.forEach(b=>b.taken=false);save()}
function updatePlayer(dt){
  const run = keys['shift']?1.7:1;
  if(S.inCar){const c=S.inCar;const fwd=(keys['w']||keys['arrowup']?1:0)-(keys['s']||keys['arrowdown']?0.6:0);c.speed=clamp(c.speed+fwd*320*dt,-140,340*run);c.speed*=Math.pow(0.4,dt);if(Math.abs(c.speed)>10){c.angle+=(keys['a']||keys['arrowleft']?-1:0)*1.9*dt*Math.sign(c.speed)+(keys['d']||keys['arrowright']?1:0)*1.9*dt*Math.sign(c.speed)}c.x+=Math.cos(c.angle)*c.speed*dt;c.y+=Math.sin(c.angle)*c.speed*dt;S.x=c.x;S.y=c.y;S.angle=c.angle;collide(c,26);c.x=clamp(c.x,40,3160);c.y=clamp(c.y,40,2360);if(Math.abs(c.speed)>200&&Math.random()<dt*2)sfx.car();
    for(const pd of peds){if(dist(c.x,c.y,pd.x,pd.y)<30&&Math.abs(c.speed)>80){pd.flee=5;pd.x+=(pd.x-c.x)*0.5;addWanted(1);say('Pedestrian hit — wanted up');break}}
  }else{
    let dx=(keys['d']||keys['arrowright']?1:0)-(keys['a']||keys['arrowleft']?1:0),dy=(keys['s']||keys['arrowdown']?1:0)-(keys['w']||keys['arrowup']?1:0);
    const l=Math.hypot(dx,dy)||1;if(dx||dy){S.angle=Math.atan2(dy,dx);S.x+=dx/l*190*run*dt;S.y+=dy/l*190*run*dt}
    collide(S,16);S.x=clamp(S.x,20,3180);S.y=clamp(S.y,20,2380);
  }
}
function drawPlayer(){
  ctx.save();ctx.translate(S.x,S.y);ctx.rotate(S.angle);
  if(S.inCar){}else{ctx.fillStyle='#f80';ctx.beginPath();ctx.arc(0,0,13,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(6,-4,14,8);ctx.fillStyle='#222';ctx.beginPath();ctx.arc(0,0,5,0,7);ctx.fill()}
  ctx.restore();
  if(!S.inCar){ctx.strokeStyle='#fff';ctx.beginPath();ctx.arc(S.x,S.y,18,0,7);ctx.stroke()}
}
