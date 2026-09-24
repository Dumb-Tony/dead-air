// Presentation and evasion timers are transient; old checkpoints need no migration.
let stepCooldown=0,stepRemaining=0,stepVector={x:0,y:0};
function safeImpulse(body,dx,dy,enemy=false){
 const count=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.08));
 for(let n=0;n<count;n++)move(body,dx/count,dy/count,enemy);
}
function quickstep(){
 if(mode!=='play'||stepCooldown>0)return;
 let forward=(keys.KeyW?1:0)-(keys.KeyS?1:0),side=(keys.KeyD?1:0)-(keys.KeyA?1:0);
 if(!forward&&!side)forward=-1;
 const length=Math.hypot(forward,side),a=state.p.a;
 stepVector={x:(Math.cos(a)*forward-Math.sin(a)*side)/length,y:(Math.sin(a)*forward+Math.cos(a)*side)/length};
 stepRemaining=.16;stepCooldown=2;audioEvent('gear',.18);
 sound(state.p.x,state.p.y,8,'footstep',true);
}
function updateQuickstep(dt){
 stepCooldown=Math.max(0,stepCooldown-dt);
 if(stepRemaining>0){const slice=Math.min(dt,stepRemaining);safeImpulse(state.p,stepVector.x*8*slice,stepVector.y*8*slice);stepRemaining=Math.max(0,stepRemaining-dt);}
}
function enemyMelee(e,dt){
 if(e.stagger>0){e.meleeWindup=0;return false;}
 if(e.meleeWindup>0){
  e.meleeWindup=Math.max(0,e.meleeWindup-dt);
  if(e.meleeWindup===0){
   e.attack=e.type==='brute'?1.25:.9;
   if(!safe(state.p)&&dist(e,state.p)<.95&&sees(e,state.p,1.1)){
    hurtPlayer(e.type==='brute'?22:e.type==='runner'?8:12);
    audioAt('zombie-'+e.type,e,.3);caption('You are hit — move!',1.2);
   }
  }
  return true;
 }
 if(e.attack<=0&&(e.windup||0)<=0&&!safe(state.p)&&dist(e,state.p)<.95&&sees(e,state.p,1.1)){
  e.meleeWindup=e.type==='brute'?.65:e.type==='runner'?.3:.45;
  audioAt('zombie-'+e.type,e,.22);return true;
 }
 return false;
}
function combatReadiness(){
 const warning=state.enemies.some(e=>e.hp>0&&e.meleeWindup>0&&dist(e,state.p)<1.6&&sees(state.p,e,2));
 const node=$('combatReady');node.textContent=warning?'INCOMING STRIKE · X EVADE':stepCooldown>0?'QUICKSTEP '+stepCooldown.toFixed(1)+'s':'X QUICKSTEP';
 node.classList.toggle('incoming',warning);node.style.opacity=mode==='play'?'1':'0';
 $('cross').style.transform='translate(-50%,-50%) '+($('motionSetting').checked?'scale(1)':killFlash>0?'scale(1.4)':hitTimer>0?'scale(1.16)':'scale(1)');
 $('cross').style.filter=killFlash>0&&!$('flashSetting').checked?'drop-shadow(0 0 5px #ffc679)':'none';
}
