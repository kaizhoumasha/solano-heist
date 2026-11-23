"use strict";
/* Solano Heist — HUD: health/stars panel, minimap, mission panel, overlays, title screen. */
function drawHUD(tgt){
  ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(12,12,300,96);
  ctx.fillStyle='#fff';ctx.font='bold 20px sans-serif';ctx.textAlign='left';ctx.fillText('SOLANO HEIST',20,36);
  ctx.fillStyle=S.hp>30?'#0f0':'#f00';ctx.fillRect(20,48,180*S.hp/100,14);ctx.strokeStyle='#fff';ctx.strokeRect(20,48,180,14);
  ctx.fillStyle='#fff';ctx.font='16px sans-serif';ctx.fillText('HP '+Math.round(S.hp)+'  $'+S.money+'  Ammo '+S.ammo,20,84);
  ctx.fillStyle='#ff0';ctx.font='bold 22px sans-serif';ctx.fillText('★'.repeat(S.wanted)+'☆'.repeat(5-S.wanted),20,106);
  const spd=S.inCar?Math.round(Math.abs(S.inCar.speed)*0.9):0;ctx.fillStyle='#fff';ctx.font='16px sans-serif';ctx.fillText(S.inCar?('Driving — '+spd+' mph'):'On foot — WASD to move, E near a car',330,36);
  // minimap
  const mw=220,mh=165,mx=W-mw-14,my=14;ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(mx-4,my-4,mw+8,mh+8);
  ctx.save();ctx.beginPath();ctx.rect(mx,my,mw,mh);ctx.clip();ctx.fillStyle='#2a4a2a';ctx.fillRect(mx,my,mw,mh);ctx.strokeStyle='#666';for(const r of ROADS_X){ctx.beginPath();ctx.moveTo(mx+r/WORLD_W*mw,my);ctx.lineTo(mx+r/WORLD_W*mw,my+mh);ctx.stroke()}for(const r of ROADS_Y){ctx.beginPath();ctx.moveTo(mx,my+r/WORLD_H*mh);ctx.lineTo(mx+mw,my+r/WORLD_H*mh);ctx.stroke()}
  ctx.fillStyle='#f0f';ctx.fillRect(mx+HIDEOUT.x/WORLD_W*mw-3,my+HIDEOUT.y/WORLD_H*mh-3,6,6);
  if(tgt){ctx.fillStyle='#ff0';ctx.beginPath();ctx.arc(mx+tgt.x/WORLD_W*mw,my+tgt.y/WORLD_H*mh,5,0,7);ctx.fill()}
  for(const p of police){ctx.fillStyle='#0af';ctx.fillRect(mx+p.x/WORLD_W*mw-2,my+p.y/WORLD_H*mh-2,4,4)}
  ctx.fillStyle='#f00';ctx.beginPath();ctx.arc(mx+S.x/WORLD_W*mw,my+S.y/WORLD_H*mh,5,0,7);ctx.fill();ctx.restore();
  ctx.fillStyle='#fff';ctx.font='13px sans-serif';ctx.fillText('MAP — Port Solano',mx,my+mh+18);
  // mission
  const m=MISSIONS[S.mission];ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(12,H-92,560,80);
  ctx.fillStyle='#ff0';ctx.font='bold 17px sans-serif';ctx.fillText(m?m.title:'All missions done',22,H-66);
  ctx.fillStyle='#fff';ctx.font='15px sans-serif';ctx.fillText(m?m.text:'You pulled the Big Score. Port Solano is yours.',22,H-42);
  if(m&&m.time)ctx.fillText('Time left: '+Math.max(0,Math.ceil(m.time-S.missionTimer))+'s',22,H-20);
  if(msgT>0){ctx.fillStyle='#ff0';ctx.font='bold 20px sans-serif';ctx.textAlign='center';ctx.fillText(msg,640,110)}
  if(S.paused){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='bold 42px sans-serif';ctx.textAlign='center';ctx.fillText('PAUSED — press P',640,360)}
  if(S.dead){ctx.fillStyle='rgba(80,0,0,.7)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='bold 44px sans-serif';ctx.textAlign='center';ctx.fillText('BUSTED',640,320);ctx.font='22px sans-serif';ctx.fillText('Press R to restart — your save is kept',640,360)}
  if(S.win){ctx.fillStyle='rgba(0,60,0,.7)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#ff0';ctx.font='bold 44px sans-serif';ctx.textAlign='center';ctx.fillText('THE BIG SCORE — YOU WIN',640,320);ctx.fillStyle='#fff';ctx.font='22px sans-serif';ctx.fillText('Final take: $'+S.money+'  ·  Shots '+S.shots+'  Hits '+S.hits,640,360)}
}
function drawTitleScreen(){
  ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#ff0';ctx.font='bold 64px sans-serif';ctx.textAlign='center';ctx.fillText('SOLANO HEIST',640,180);
  ctx.fillStyle='#fff';ctx.font='28px sans-serif';ctx.fillText('An open-world crime game in Port Solano',640,225);
  ctx.font='18px sans-serif';ctx.fillText('Rex Marlowe is back in town. Steal cars, lose the cops, pull the Big Score.',640,260);
  ctx.fillStyle='#0f0';ctx.font='bold 24px sans-serif';ctx.fillText('CLICK TO START  ·  or press Enter',640,330);
  ctx.fillStyle='#ddd';ctx.font='17px sans-serif';
  ctx.fillText('WASD / Arrows — walk & drive   ·   E — steal / exit car   ·   Click — shoot   ·   Space — punch',640,380);
  ctx.fillText('Shift — run / boost   ·   P — pause   ·   M — mute   ·   Progress saves automatically',640,410);
  ctx.fillStyle='#ff0';ctx.font='17px sans-serif';ctx.fillText('Missions: Get Wheels → First Delivery → Lose the Heat → The Big Score',640,450);
  ctx.fillStyle='#888';ctx.font='14px sans-serif';ctx.fillText('Original game. No Rockstar / GTA names, characters, maps, art or music.',640,490);
}
