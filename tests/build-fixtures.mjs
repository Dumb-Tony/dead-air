import fs from 'node:fs';
const root=new URL('../',import.meta.url);
export function buildFixtures(html){
 const replace=(a,b)=>{if(!html.includes(a))throw Error('Missing fixture anchor: '+a.slice(0,90));html=html.replace(a,b);};
 replace('function sprite(type){',fs.readFileSync(new URL('fixture-design.js',root),'utf8')+'\nfunction sprite(type){');
 replace(' function item(i){if(illustratedItem(i))return;',fs.readFileSync(new URL('fixture-models.js',root),'utf8')+'\n function item(i){if(designedFixture(i)||illustratedItem(i))return;');
 replace('img=atlas||sprites[e.type];', 'img=atlas||(e.hp===undefined&&e.id?fixtureSprite(e):null)||sprites[e.type];');
 replace('</style>',fs.readFileSync(new URL('journal.css',root),'utf8')+'\n</style>');
 replace("if(note.id===focusId)article.style.borderColor='#d1ac73';", "if(read&&fixtureKind(note)==='blueprint')article.classList.add('blueprint');if(note.id===focusId)article.classList.add('focus-record');");
 replace("$('closeJournal').focus?.();", "$('closeJournal').focus?.({preventScroll:true});if(focusId)$('journalEntries').querySelector?.('.focus-record')?.scrollIntoView({block:'center'});");
 replace("archiveCount:state.archive?.length||0,frameRate", "archiveCount:state.archive?.length||0,fixturePresentation:{kinds:[...new Set(state.items.filter(i=>!i.taken).map(fixtureKind))],nearby:state.items.filter(i=>!i.taken&&dist(i,state.p)<3).map(i=>({id:i.id,name:i.name,appearance:fixtureKind(i),complete:fixtureComplete(i)}))},frameRate");
 return html.replaceAll('v0.11.0','v0.12.0').replaceAll("version:'0.11.0'","version:'0.12.0'");
}
