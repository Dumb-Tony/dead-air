(()=>{
function use(id){
 const item=state.items.find(i=>i.id===id);if(!item)throw Error('Missing '+id);let destination;
 for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]]){const p={x:item.x+dx,y:item.y+dy};if(solid(p.x,p.y))continue;try{testRoute(p);destination=p;break;}catch{}}
 if(!destination)throw Error('Unreachable '+id+' in '+state.chapter);testWalk(destination);testUse(id);
 if(mode==='journal')resume(false);
}
const results=[],contract3D=!!scene3D;
for(let ch=7;ch<chapters.length;ch++){
 if(state.won&&state.chapter===ch-1)nextChapter();else state=campaignState(ch);
 mode='play';resetTransient();if(contract3D)scene3D={name:'test'};state.gun=state.owned[2]?2:1;
 for(const id of ['key','record','route',...chapters[ch].order,'access','proof','consent','control'])use(id);
 let ticks=0;while(state.quest.running&&mode==='play'){if(++ticks>10000)throw Error('Cycle stuck');if(!testCombatTick()){keys={};update(1/60);}}
 if(mode!=='play')throw Error('Died '+ch);
 for(const id of ['lore-0','lore-1','lore-2','keepsake',...secretOrders[ch].map(id=>'secret-'+id),'secret-cache','release','exit'])use(id);
 if(!state.won)throw Error('Not complete '+ch);if(!valid(state))throw Error('Invalid final save '+ch);if(!state.keepsakes.includes(ch))throw Error('Keepsake not acquired '+ch);if(!state.secrets.found)throw Error('Cache not acquired '+ch);
 results.push({chapter:ch+1,seconds:Math.round(state.time-state.chapterStart.time),hp:state.p.hp,kills:state.kills-state.chapterStart.kills,keepsakes:state.keepsakes.length});
}
return JSON.stringify(results);
})()
