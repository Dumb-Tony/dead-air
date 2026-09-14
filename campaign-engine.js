function enrichLore(l,ch){
 const used=new Set(l.items.map(i=>Math.floor(i.x)+','+Math.floor(i.y)));
 const place=(r)=>{for(let y=r.y+r.h-2;y>r.y;y--)for(let x=r.x+2;x<r.x+r.w-1;x++){const key=x+','+y;if(!used.has(key)&&l.grid[y][x]===1&&l.items.every(i=>Math.hypot(i.x-x-.5,i.y-y-.5)>2.1)){used.add(key);return{x:x+.5,y:y+.5};}}throw Error('No lore placement');};
 const stories=ch<7?earlyLore[ch]:longNight[ch-7].lore;
 stories.forEach(([name,text],j)=>l.items.push({id:'lore-'+j,...place(l.rooms[ch<7?Math.min(l.rooms.length-1,j+3):[2,6,7][j]]),type:'note',name,text}));
 if(ch>=7)l.items.push({id:'keepsake',...place(l.rooms[7]),type:'cache',name:'Lost-property cabinet'});
 return l;
}
function migrateLongNight(s){
 if(s.longNightVersion===1)return s;
 const ch=s.chapter||0;if(ch<0||ch>=chapters.length||!Array.isArray(s.items))return s;
 const l=layoutFor(ch),old=l.items.filter(i=>!i.id.startsWith('lore-')&&i.id!=='keepsake');
 if(s.items.length===old.length&&s.items.every((i,n)=>i.id===old[n].id))s.items.push(...l.items.slice(old.length).map(i=>({...i,taken:false})));
 s.longNightVersion=1;s.archive=s.archive||[];s.keepsakes=s.keepsakes||[];s.quest=s.quest||{done:[],sequence:[],cycle:0,running:false};return s;
}
function validLongNight(s){
 if(s.archive!==undefined&&(!Array.isArray(s.archive)||s.archive.length>180||s.archive.some(a=>!a||typeof a.key!=='string'||typeof a.title!=='string'||typeof a.text!=='string'||a.text.length>4000||!Number.isInteger(a.chapter)||a.chapter<0||a.chapter>=chapters.length)))return false;
 if(s.keepsakes!==undefined&&(!Array.isArray(s.keepsakes)||s.keepsakes.length>7||new Set(s.keepsakes).size!==s.keepsakes.length||s.keepsakes.some(n=>!Number.isInteger(n)||n<7||n>=chapters.length)))return false;
 if((s.chapter||0)<7)return true;
 if(s.quest?.circuit!==undefined&&(!Number.isInteger(s.quest.circuit)||s.quest.circuit<0||s.quest.circuit>7))return false;
 const q=s.quest,c=chapters[s.chapter];return !!(q&&Array.isArray(q.done)&&new Set(q.done).size===q.done.length&&q.done.every(id=>c.steps[id])&&Array.isArray(q.sequence)&&q.sequence.length<=3&&q.sequence.every((id,n)=>id===c.order[n])&&Number.isFinite(q.cycle)&&q.cycle>=0&&q.cycle<=c.hold&&typeof q.running==='boolean'&&q.done.every(id=>c.steps[id].needs.every(n=>q.done.includes(n)))&&(!q.running||c.steps.control.needs.every(n=>q.done.includes(n))));
}
function archiveRecord(key,title,text,chapter=state.chapter||0){state.archive=state.archive||[];if(!state.archive.some(a=>a.key===key))state.archive.push({key,title,text,chapter});}
function rememberRecords(){for(const id of state.notes||[]){const note=state.items.find(i=>i.id===id);if(note)archiveRecord((state.chapter||0)+':'+id,note.name,note.text);}}
function archiveArticles(){
 return (state.archive||[]).filter(a=>a.chapter!==(state.chapter||0)||a.key.includes(':task:')||a.key.includes(':keepsake')).map(a=>{const article=document.createElement('article'),label=document.createElement('small'),heading=document.createElement('h3'),body=document.createElement('p');label.textContent='CAMPAIGN ARCHIVE / '+chapters[a.chapter].title.toUpperCase();heading.textContent=a.title;body.textContent=a.text;article.append(label,heading,body);return article;});
}
let journalReturnMode='play';
function closeFieldJournal(){if(journalReturnMode==='play')resume(false);else showMenu(journalReturnMode);}
function loreAction(i){
 if(i.id!=='keepsake')return false;ensureExpansion(state);
 if(!['lore-0','lore-1'].every(id=>(state.notes||[]).includes(id))){tell('LOST PROPERTY — identify the owner. Read the personal records in '+chapters[state.chapter].names[2]+' and '+chapters[state.chapter].names[6]+'.',8);return true;}
 if(i.taken)return true;i.taken=true;const [name,text]=longNight[state.chapter-7].keepsake;if(!state.keepsakes.includes(state.chapter))state.keepsakes.push(state.chapter);archiveRecord(state.chapter+':keepsake',name,text);rememberRecords();save();tell('KEEPSAKE RECOVERED — '+name+'. Read its story in J.',7);return true;
}
function keepsakeEnding(){return state.keepsakes?.length?'At the hospital, '+state.keepsakes.length+' recovered keepsake'+(state.keepsakes.length===1?' is':'s are')+' placed beside the written histories. Small, ordinary lives are remembered too.':'At the hospital, the families receive the written histories. The silence belongs to the living now.';}
function longObjective(){
 const c=chapters[state.chapter],q=state.quest||{done:[],sequence:[],cycle:0};if(state.won)return state.chapter===chapters.length-1?'The story is complete. Return to the living.':'Chapter complete — continue the journey';
 if(q.running)return c.objects[9].toUpperCase()+' / '+Math.floor(q.cycle/c.hold*100)+'% — defend or explore';
 if(q.done.includes('route')&&!q.done.includes('access')&&!['a','b','c'].every(id=>q.done.includes(id)))return c.circuit?'ALIGN CIRCUIT / '+c.circuit.labels.map((n,j)=>n+': '+((q.circuit||0)&(1<<j)?'ON':'OFF')).join(' · ')+' / procedure in journal':'Calibrate the three controls / '+q.sequence.length+' of 3 / consult the route card in J';
 const next=['key','record','route',...c.order,'access','proof','consent','control','release','exit'].find(id=>!q.done.includes(id));
 const step=c.steps[next];return step?(q.sequence.length&&['a','b','c'].includes(next)?'SEQUENCE '+q.sequence.length+'/3 — ':'')+step.name+' / '+step.room:'Reach the exit';
}
function longAction(i){
 ensureExpansion(state);const c=chapters[state.chapter],q=state.quest;
 if(i.id==='base'){state.p.hp=100;rememberRecords();save();return true;}
 const step=c.steps[i.id];if(!step)return false;
 if(q.done.includes(i.id)){tell('Already completed. '+longObjective(),4);return true;}
 if(step.needs.some(id=>!q.done.includes(id))){tell('REQUIRES: '+step.needs.filter(id=>!q.done.includes(id)).map(id=>c.steps[id].name).join(' / '),6);return true;}
 if(c.circuit&&['a','b','c'].includes(i.id)){
  q.circuit=(q.circuit||0)^c.circuit.masks[['a','b','c'].indexOf(i.id)];
  if(q.circuit===c.circuit.target){q.done.push('a','b','c');save();tell('CIRCUIT ALIGNED — release the lower wing.',5);}else{save();tell(longObjective(),7);}sound(i.x,i.y,20,'machinery');return true;
 }
 if(['a','b','c'].includes(i.id)){
  if(i.id!==c.order[q.sequence.length]){q.done=q.done.filter(id=>!['a','b','c'].includes(id));q.sequence=[];tell('SEQUENCE RESET — '+c.sequenceHint,7);sound(i.x,i.y,23,'machinery');return true;}
  q.sequence.push(i.id);
 }
 if(i.id==='control'){
  q.running=!q.running;rememberRecords();save();tell(q.running?'CYCLE STARTED — progress survives stopping or saving.':'CYCLE PAUSED — progress retained.',5);sound(i.x,i.y,28,'machinery');return true;
 }
 q.done.push(i.id);if(['key','proof','consent'].includes(i.id))i.taken=true;
 for(const d of state.doors)if(d.requires&&q.done.includes(d.requires))d.locked=false;
 if(step.text){archiveRecord(state.chapter+':task:'+i.id,step.name,step.text);radio(step.text);}
 if(i.id==='exit'){completeChapter();return true;}
 rememberRecords();save();tell(step.name.toUpperCase()+' / COMPLETE — '+longObjective(),6);sound(i.x,i.y,20,'machinery');return true;
}
function updateLongQuest(dt){
 const q=state.quest,c=chapters[state.chapter];if(!q?.running)return;
 const before=q.cycle;q.cycle=Math.min(c.hold,q.cycle+dt);
 if(Math.floor(before/3)!==Math.floor(q.cycle/3)){const control=state.items.find(i=>i.id==='control');sound(control.x,control.y,28,'machinery');}
 if(q.cycle>=c.hold){q.running=false;if(!q.done.includes('control'))q.done.push('control');save();radio('Physical cycle complete. '+longObjective());}
}
