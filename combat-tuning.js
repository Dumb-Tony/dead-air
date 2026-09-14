// Shotgun inserts are individual transactions; only completed shells enter the tube.
function updateReload(dt){
 if(state.reload<=0)return;
 state.reload-=dt;
 while(state.reload<=1e-8){
  const g=state.gun,w=weaponDef(g),n=Math.min(g===1?1:w.capacity-state.mag[g],w.capacity-state.mag[g],state.reserve[g]);
  state.mag[g]+=n;state.reserve[g]-=n;
  if(g!==1||n===0||state.mag[g]>=w.capacity||state.reserve[g]<=0){state.reload=0;break;}
  audioEvent('click',.15);state.reload+=w.reload;
 }
}
function migrateCombat(s){
 if(s.combatVersion===1||!Array.isArray(s.enemies))return;
 const oldHealth={shambler:70,listener:70,runner:45,crawler:45,brute:140,spitter:80,screamer:90};
 for(const e of s.enemies){
  const type=e.type==='listener'?'shambler':e.type==='crawler'?'runner':e.type;
  const maximum=enemyHealth(type,Number.isInteger(e.id)?e.id:1),oldMaximum=e.maxHp||oldHealth[e.type]||70;
  if(e.hp>0)e.hp=Math.max(1,Math.ceil(Math.min(1,e.hp/oldMaximum)*maximum));
  e.maxHp=maximum;
 }
 s.combatVersion=1;
}
