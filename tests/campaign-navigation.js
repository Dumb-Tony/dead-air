(()=>{// Uses ordinary movement and interaction; enemies remain active.
function campaignUse(id){
 const item=state.items.find(i=>i.id===id);let destination=null;
 for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]]){const p={x:item.x+dx,y:item.y+dy};if(solid(p.x,p.y))continue;try{testRoute(p);destination=p;break;}catch{}}
 if(!destination)throw new Error('Unreachable fixture '+id);testWalk(destination);testUse(id);
}
function campaignWait(){let ticks=0;while(state.progress.running&&mode==='play'){if(++ticks>9000)throw new Error('Timed objective stuck');if(!testCombatTick()){keys={};update(1/60);}}if(mode!=='play')throw new Error('Died during campaign objective');}
const results=[],contract3D=!!scene3D;
for(let chapter=1;chapter<4;chapter++){
 if(state.won&&(state.chapter||0)===chapter-1)nextChapter();else state=campaignState(chapter);mode='play';resetTransient();if(contract3D)scene3D={name:'test'};state.gun=1;
 if(chapter===1){campaignUse('key');campaignUse('a');campaignUse('b');campaignUse('control');campaignWait();}
 if(chapter===2){campaignUse('r2');campaignUse('r1');campaignUse('r3');campaignUse('key');}
 if(chapter===3){campaignUse('a');campaignUse('b');campaignUse('c');campaignUse('control');campaignWait();}
 campaignUse('exit');if(!state.won)throw new Error('Chapter did not complete '+chapter);
 results.push({chapter:chapter+1,health:state.p.hp,seconds:Math.round(state.time-state.chapterStart.time),shots:state.shots-state.chapterStart.shots,kills:state.kills-state.chapterStart.kills});
}
return JSON.stringify(results);
})()