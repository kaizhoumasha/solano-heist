"use strict";
/* Solano Heist — main: game start, the update/draw orchestration, the game loop.
   Loaded last, after every module above has defined its part. */
let startClickPending = false;
function startGame(){audio();S.started=true;startClickPending=true;if(SHOT==='chase'){S.inCar=cars[15]||cars[0];S.onFoot=false;S.wanted=3;S.mission=2;S.missionTimer=0;spawnPolice(3)}if(SHOT==='mission'){S.mission=3;S.x=800;S.y=600}if(SHOT==='drive'){S.inCar=cars[15]||cars[0];S.onFoot=false;S.mission=1}if(SHOT==='play'){S.x=1600;S.y=1200}}
cv.addEventListener('click',()=>{if(!S.started)startGame()});
addEventListener('keydown',e=>{if(e.key==='Enter'&&!S.started)startGame()});
if(SHOT&&SHOT!=='start'){load();setTimeout(()=>{if(!S.started)startGame()},300)}
/* ---- update: one frame of simulation, in the original order ---- */
function update(dt){
  if(!S.started||S.paused||S.dead||S.win)return;
  const m = MISSIONS[S.mission];
  if(m&&m.time){S.missionTimer+=dt;if(S.missionTimer>m.time){S.hp=0;S.dead=true;say('Out of time — busted')}}
  updateWanted(dt);
  updatePlayer(dt);
  updateTraffic(dt);
  updatePeds(dt);
  updatePolice(dt);
  updateBullets(dt);
  updatePickups(dt);
  updateMissions(dt);
  if(S.hp<=0){S.hp=0;S.dead=true}
  if(msgT>0)msgT-=dt;
  updateEffects(dt);
}
/* ---- draw: one frame of rendering, in the original order ---- */
function draw(){
  ctx.fillStyle='#0b0f14';ctx.fillRect(0,0,W,H);
  const cam = camera();
  ctx.save();ctx.translate(-cam.x,-cam.y);
  drawWorld();
  const tgt = missionTarget();
  drawMarkers(tgt);
  drawPeds();
  drawCars();
  drawPolice();
  drawBullets();
  drawPlayer();
  drawEffects();
  ctx.restore();
  if(S.started){drawHUD(tgt)} else {drawTitleScreen()}
}
let last = performance.now();
function loop(t){const dt=Math.min(0.05,(t-last)/1000);last=t;update(dt);draw();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
