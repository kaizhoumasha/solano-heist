"use strict";
/* Solano Heist — core: canvas, shared game state, helpers, save.
   Loaded first; every other module reads these bindings. */
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const W = 1280, H = 720, WORLD_W = 3200, WORLD_H = 2400;
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rng = mulberry32(20261121);
const clamp = (v,a,b)=>v<a?a:v>b?b:v, dist = (x1,y1,x2,y2)=>Math.hypot(x2-x1,y2-y1);
const params = new URLSearchParams(location.search);
const SHOT = params.get('shot') || null;
/* ---- shared state ---- */
const S = {x:1600,y:1200,angle:0,hp:100,money:50,ammo:24,wanted:0,wantedTimer:0,crimeTimer:0,inCar:null,onFoot:true,speed:0,mission:0,missionTimer:0,missionDone:false,win:false,dead:false,started:false,paused:false,score:0,shots:0,hits:0};
let msg = '', msgT = 0;
function say(t){msg = t; msgT = 4}
function camera(){return{x:clamp(S.x-640,0,WORLD_W-1280),y:clamp(S.y-360,0,WORLD_H-720)}}
function save(){try{localStorage.setItem('solano-heist-save-v1',JSON.stringify({x:S.x,y:S.y,money:S.money,mission:S.mission,hp:S.hp,ammo:S.ammo}))}catch(e){}}
function load(){try{const d=JSON.parse(localStorage.getItem('solano-heist-save-v1')||'null');if(d){S.x=d.x;S.y=d.y;S.money=d.money;S.mission=d.mission;S.hp=d.hp;S.ammo=d.ammo;say('Save loaded — mission '+(d.mission+1))}}catch(e){}}
