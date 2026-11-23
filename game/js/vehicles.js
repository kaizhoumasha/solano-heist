"use strict";
/* Solano Heist — vehicles: traffic cars, parked cars to steal, pedestrians. */
const CAR_COLS = ['#c33','#3c3','#36c','#cc3','#c6c','#eee','#f80','#0cc'];
function makeCar(x,y,angle,traffic){return{x,y,angle,speed:0,traffic:!!traffic,dir:traffic?(rng()>.5?0:Math.PI/2):0,color:CAR_COLS[Math.floor(rng()*CAR_COLS.length)],hp:100,dead:false,parked:!traffic}}
const cars = [];
for(let i=0;i<14;i++){const rx=ROADS_X[Math.floor(rng()*ROADS_X.length)],ry=ROADS_Y[Math.floor(rng()*ROADS_Y.length)];cars.push(makeCar(rx+(rng()*80-40),ry+(rng()*80-40),rng()*6.28,true))}
for(let i=0;i<12;i++){let x,y,t=0;do{x=200+rng()*2800;y=200+rng()*2000;t++}while(!onRoad(x,y)&&t<50);cars.push(makeCar(x,y,rng()*6.28,false))}
const peds = [];
for(let i=0;i<26;i++){let x=100+rng()*3000,y=100+rng()*2200;peds.push({x,y,angle:rng()*6.28,speed:20+rng()*25,c:'#'+['e8c39a','c9a06a','8a6a4a','d9a0a0'][i%4],flee:0})}
function updateTraffic(dt){
  for(const c of cars){if(c===S.inCar||c.dead)continue;if(c.traffic){c.speed=70;const ax=Math.abs(Math.cos(c.dir))>0.5;c.x+=Math.cos(c.dir)*c.speed*dt;c.y+=Math.sin(c.dir)*c.speed*dt;if(c.x<80||c.x>3120||c.y<80||c.y>2320){c.dir+=Math.PI/2;if(c.dir>6.28)c.dir-=6.28}if(onRoad(c.x,c.y)===false){c.x=ROADS_X[0];c.y=ROADS_Y[0]}if(Math.random()<dt*0.05)c.dir=(Math.random()>.5?0:Math.PI/2)+(Math.random()>.5?0:Math.PI)}}
}
function updatePeds(dt){
  for(const pd of peds){if(pd.flee>0){pd.flee-=dt;pd.x+=Math.cos(pd.angle)*90*dt;pd.y+=Math.sin(pd.angle)*90*dt}else{pd.x+=Math.cos(pd.angle)*pd.speed*dt;pd.y+=Math.sin(pd.angle)*pd.speed*dt;if(Math.random()<dt*0.1)pd.angle+=(Math.random()-0.5)*2;if(hitBuilding(pd.x,pd.y,8))pd.angle+=Math.PI/2}pd.x=clamp(pd.x,20,3180);pd.y=clamp(pd.y,20,2380)}
}
function drawPeds(){
  for(const pd of peds){ctx.save();ctx.translate(pd.x,pd.y);ctx.fillStyle=pd.c;ctx.beginPath();ctx.arc(0,0,8,0,7);ctx.fill();ctx.fillStyle='#222';ctx.fillRect(-6,-3,12,5);ctx.restore()}
}
function drawCars(){
  for(const c of cars){if(c.dead)continue;ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.angle);ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(-20,-11,42,24);ctx.fillStyle=c.color;ctx.fillRect(-20,-11,40,22);ctx.fillStyle='#9fd8ff';ctx.fillRect(4,-9,10,18);ctx.fillStyle='#111';ctx.fillRect(-16,-13,8,4);ctx.fillRect(-16,9,8,4);ctx.fillRect(12,-13,8,4);ctx.fillRect(12,9,8,4);ctx.restore()}
}
