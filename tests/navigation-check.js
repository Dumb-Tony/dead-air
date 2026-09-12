// Navigate the expedition using ordinary movement, interactions and combat.
// Test steering may choose headings, but never teleports or disables enemies.
function testRoute(destination){
 const start={x:Math.floor(state.p.x),y:Math.floor(state.p.y)},goal={x:Math.floor(destination.x),y:Math.floor(destination.y)},queue=[start],parents=new Map([[start.y*W+start.x,null]]);
 for(let head=0;head<queue.length;head++){
  const p=queue[head];if(p.x===goal.x&&p.y===goal.y)break;
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+dx,y=p.y+dy,key=y*W+x,door=doorAt(x,y);if(!grid[y]?.[x]||parents.has(key)||door?.locked)continue;parents.set(key,p.y*W+p.x);queue.push({x,y});}
 }
 let key=goal.y*W+goal.x;if(!parents.has(key))throw new Error('No test route');const result=[];while(parents.get(key)!==null){result.push({x:key%W+.5,y:Math.floor(key/W)+.5});key=parents.get(key);}return result.reverse();
}
function testCombatTick(){
 const threats=state.enemies.filter(e=>e.hp>0&&dist(e,state.p)<6&&sees(state.p,e,6)).sort((a,b)=>dist(a,state.p)-dist(b,state.p));
 if(threats.length&&!safe(state.p)){
  const e=threats[0];state.p.a=Math.atan2(e.y-state.p.y,e.x-state.p.x);lookPitch=scene3D?(1.35-1.25)/(2*dist(e,state.p)):0;keys={};if(state.mag[state.gun]===0)reload();else fire();update(1/60);if(state.p.hp<45&&state.meds>0){state.meds--;state.p.hp=Math.min(100,state.p.hp+45);}return true;
 }
 return false;
}
function testWalk(destination){
 const waypoints=testRoute(destination);let ticks=0;
 for(const waypoint of waypoints){
  while(dist(state.p,waypoint)>.08){
   if(mode!=='play')throw new Error('Navigation interrupted: '+mode);if(++ticks>30000)throw new Error('Navigation stuck near '+JSON.stringify(state.p));
   if(testCombatTick())continue;
   lookPitch=0;state.p.a=Math.atan2(waypoint.y-state.p.y,waypoint.x-state.p.x);
   const door=doorAt(Math.floor(waypoint.x),Math.floor(waypoint.y));if(door&&!door.open&&dist(state.p,waypoint)<1.9){keys={};interact();}
   keys={KeyW:true};update(1/60);
  }
 }
 keys={};
}
function testUse(id){const item=state.items.find(i=>i.id===id);state.p.a=Math.atan2(item.y-state.p.y,item.x-state.p.x);interact();}
state=fresh();mode='play';resetTransient();
testWalk({x:27.5,y:3.5});testUse('handle');
if(!state.handle)throw new Error('Handle not acquired');
testWalk({x:22.5,y:4.5});testUse('ammo1');
testWalk({x:4.5,y:14.5});testUse('shotgun');
testWalk({x:5.5,y:18.5});testUse('pump');
if(!state.running)throw new Error('Pump not running');
while(state.drain<75&&mode==='play'){if(!testCombatTick()){keys={};update(1/60);}}
if(mode!=='play')throw new Error('Did not survive pump');
testWalk({x:27.5,y:22.5});testUse('schematic');
if(!state.schematic)throw new Error('Schematic not acquired');
testWalk({x:4.5,y:3.5});testUse('base');
if(!state.won)throw new Error('Expedition did not complete');
JSON.stringify({health:state.p.hp,seconds:Math.round(state.time),shots:state.shots,kills:state.kills,ammo:state.mag,reserve:state.reserve});
