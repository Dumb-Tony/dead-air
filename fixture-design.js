// Presentation is derived, never saved: old checkpoints get the same object identities.
function fixtureKind(i){
 const name=(i.name||'').toLowerCase(),id=i.id||'';
 if(/^secret-[abc]$/.test(id))return 'latch';
 if(id==='keepsake')return 'cabinet';
 if(i.type==='cache')return 'cache';
 if(i.type==='note')return id.startsWith('lore-')?'journal':/cipher|diagram|schematic|map/.test(name)?'blueprint':'document';
 if(id==='exit')return 'exit';
 if(/destruction charge/.test(name))return 'charge';
 if(/microfilm/.test(name))return 'reader';
 if(['record','proof','consent','route'].includes(id))return /diagram|plan|schematic/.test(name)?'blueprint':/ledger|register/.test(name)?'journal':'document';
 if(i.type==='schematic')return 'blueprint';
 if(i.type==='pump')return 'pump';
 if(i.type==='handle')return /filter|cartridge/.test(name)?'filter':/battery|power core|cell/.test(name)?'battery':/crank/.test(name)?'crank':/wrench|breaker handle/.test(name)?'tool':'key';
 if(i.type==='terminal'){
  if(id==='base')return 'computer';
  if(/damper/.test(name))return 'damper';
  if(/duplication|press/.test(name))return 'press';
  if(/counterweight|winch/.test(name))return 'winch';
  if(/beacon|align (blue|amber|white)/.test(name))return 'beacon';
  if(/valve|drain |bypass|pressure|hydraulic/.test(name))return 'valve';
  if(/latch|seal |ground|breaker|feed|relay|align |calibrat|circuit|release|override|disconnect|severance|rail points/.test(name))return 'switchboard';
  return 'computer';
 }
 return i.type;
}
function fixtureComplete(i){
 if(/^secret-[abc]$/.test(i.id))return !!state.secrets?.opened||!!state.secrets?.sequence?.includes(i.id.slice(-1));
 if(i.type==='note')return !!state.notes?.includes(i.id);
 return !!i.taken||!!state.quest?.done?.includes(i.id)||!!state.progress?.flags?.includes(i.id);
}
function fixtureYaw(i){const r=rooms.find(r=>i.x>=r.x&&i.x<r.x+r.w&&i.y>=r.y&&i.y<r.y+r.h);return r?Math.round(Math.atan2(i.x-r.x-r.w/2,i.y-r.y-r.h/2)/(Math.PI/2))*Math.PI/2:0;}
const fixtureSpriteCache={};
function fixtureSprite(i){
 const kind=fixtureKind(i);if(['ammo','med','shotgun','carbine','flare','pump'].includes(kind))return null;
 if(fixtureSpriteCache[kind])return fixtureSpriteCache[kind];
 const c=document.createElement('canvas');c.width=96;c.height=128;const g=c.getContext('2d');
 g.fillStyle='#263737';g.fillRect(12,105,72,9);
 if(['journal','document','blueprint'].includes(kind)){
  g.fillStyle='#5f5141';g.fillRect(12,77,72,8);g.fillRect(18,85,5,32);g.fillRect(74,85,5,32);
  g.fillStyle=kind==='blueprint'?'#437885':'#ccb98b';g.fillRect(23,37,54,41);
  if(kind==='journal'){g.fillStyle='#694736';g.fillRect(20,33,60,5);g.fillStyle='#6e513b';g.fillRect(48,37,3,41);}
  g.fillStyle=kind==='blueprint'?'#bdd4cd':'#665b48';for(let n=0;n<6;n++)g.fillRect(28,45+n*5,kind==='journal'?16:39,1);
  if(kind==='journal')for(let n=0;n<5;n++)g.fillRect(55,45+n*5,16,1);
 }else if(['latch','switchboard','valve','damper'].includes(kind)){
  g.fillStyle='#535e56';g.fillRect(24,23,49,89);g.fillStyle='#c29a58';g.fillRect(29,29,39,8);g.fillStyle='#1e2827';g.fillRect(32,45,33,47);
  if(kind==='valve'){g.strokeStyle='#b65b3a';g.lineWidth=6;g.beginPath();g.arc(49,67,18,0,TAU);g.stroke();g.fillStyle='#b65b3a';g.fillRect(46,49,6,37);}else{g.fillStyle='#af7046';g.fillRect(45,49,7,37);g.fillRect(34,47,28,9);}
 }else if(kind==='computer'||kind==='reader'){
  g.fillStyle='#485c58';g.fillRect(15,27,68,49);g.fillStyle='#071e1c';g.fillRect(21,32,56,37);g.fillStyle='#7ebd8b';for(let n=0;n<5;n++)g.fillRect(26,38+n*5,35-n*4,2);g.fillStyle='#68716a';g.fillRect(8,83,80,9);g.fillRect(20,93,8,26);g.fillRect(70,93,8,26);g.fillStyle='#253730';g.fillRect(23,78,50,4);
 }else if(kind==='cabinet'||kind==='cache'){
  g.fillStyle=kind==='cabinet'?'#796b52':'#536052';g.fillRect(15,kind==='cabinet'?18:66,68,96);for(let n=0;n<(kind==='cabinet'?3:1);n++){g.strokeStyle='#242e29';g.strokeRect(20,25+n*28,58,25);g.fillStyle='#b7a47a';g.fillRect(41,34+n*28,18,4);}
 }else if(kind==='exit'){g.fillStyle='#53665f';g.fillRect(26,25,44,86);g.fillStyle='#a0c5aa';g.fillRect(30,32,36,20);g.fillStyle='#203d35';g.font='bold 12px monospace';g.fillText('EXIT',32,47);}
 else if(kind==='beacon'){g.fillStyle='#4c6157';g.fillRect(38,53,20,62);g.fillStyle='#d0ab59';g.beginPath();g.arc(48,39,23,0,TAU);g.fill();}
 else if(kind==='press'||kind==='winch'){g.fillStyle='#657065';g.fillRect(15,30,9,80);g.fillRect(72,30,9,80);g.fillRect(15,30,66,9);g.fillRect(15,105,66,9);g.fillStyle='#cfba8a';g.fillRect(29,83,38,17);g.fillStyle='#8e7952';g.fillRect(44,35,9,48);}
 else if(['battery','filter','charge'].includes(kind)){g.fillStyle=kind==='charge'?'#964e37':'#777655';g.fillRect(26,52,46,59);g.fillStyle='#282f29';for(let n=0;n<6;n++)g.fillRect(30,61+n*7,38,3);}
 else {g.fillStyle='#4a5448';g.fillRect(20,85,56,28);g.fillStyle='#bda361';g.fillRect(44,39,8,49);g.fillRect(38,39,24,9);}
 return fixtureSpriteCache[kind]=c;
}
