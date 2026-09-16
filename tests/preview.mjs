import http from 'node:http';
import fs from 'node:fs';
const fixtures={
 'death-loop':{x:5.5,y:14.5,a:Math.PI/2,drain:0},
 'death-settled':{x:5.5,y:14.5,a:Math.PI/2,drain:0},
 'reload-pistol':{x:5.5,y:17.5,a:Math.PI/2,drain:0},
 'reload-shotgun':{x:5.5,y:17.5,a:Math.PI/2,drain:0},
 'supplies':{x:5.5,y:14.5,a:Math.PI/2,drain:0},
 'equipment':{x:5.5,y:17.5,a:Math.PI/2,drain:0},
 'zombie-profiles':{x:5.5,y:14.5,a:Math.PI/2,drain:0},
 'zombie-rear':{x:5.5,y:14.5,a:Math.PI/2,drain:0},
 'zombie-fallback':{x:5.5,y:14.5,a:Math.PI/2,drain:0},
 'zombie-lineup':{x:5.5,y:14.5,a:Math.PI/2,drain:0},
 'archive-full':{x:23.5,y:12.5,a:Math.PI/2,drain:0},
 'archive-half':{x:23.5,y:12.5,a:Math.PI/2,drain:37.5},
 'archive-empty':{x:23.5,y:12.5,a:Math.PI/2,drain:75},
 'pump-full':{x:5.5,y:17.5,a:Math.PI/2,drain:0},
 'pump-empty':{x:5.5,y:17.5,a:Math.PI/2,drain:75},
 'maintenance-sign':{x:5.5,y:2.5,a:0,drain:0},
 'lockers':{x:25,y:6.5,a:-Math.PI/2,drain:0},
 'archive-inside':{x:24,y:18,a:0,drain:75}
};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');if(url.pathname!=='/'){res.writeHead(404);res.end();return;}
 let html=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');const fixture=fixtures[url.searchParams.get('review')];
 if(fixture){const setup=`\n// Local visual-test fixture; never included in the distributable.\nstate=fresh();state.p.x=${fixture.x};state.p.y=${fixture.y};state.p.a=${fixture.a};state.drain=${fixture.drain};state.installed=true;state.handle=true;mode='play';started=true;updateEnemies=()=>{};lookPitch=.06;$('veil').classList.add('hidden');$('hud').classList.remove('hidden');$('brightness').value='105';$('motionSetting').checked=true;\n`;const supplies=url.searchParams.get('review')==='supplies'?"state.enemies.forEach(e=>e.hp=0);for(const[id,x]of[['handle',3.7],['shotgun',4.9],['med1',6.1],['ammo1',7.3]]){const i=state.items.find(i=>i.id===id);i.x=x;i.y=16.5;}":'';const equipment=url.searchParams.get('review')==='equipment'?"state.owned[1]=true;state.gun=1;":'';const lineup=url.searchParams.get('review')?.startsWith('zombie-')?"state.enemies.forEach(e=>e.hp=0);for(const[index,x]of[[0,3.8],[3,5.5],[9,7.2]]){const e=state.enemies[index];e.hp=e.type==='brute'?140:e.type==='runner'?45:70;e.x=x;e.y=18;e.target={x:state.p.x,y:state.p.y};}updateEnemies=()=>{};":'';const variant=url.searchParams.get('review');const angle=variant==='zombie-profiles'?"for(const e of state.enemies)e.target={x:e.x+3,y:e.y};":variant==='zombie-rear'?"for(const e of state.enemies)e.target={x:e.x,y:e.y+3};":variant==='zombie-fallback'?"scene3D?.dispose?.();scene3D=null;$('scene3d').style.display='none';canvas.style.opacity='1';":"";html=html.replace('</script>',setup+supplies+equipment+lineup+angle+'</script>');}
 const review=url.searchParams.get('review')||'';
 if(url.searchParams.has('fixture')){const kind=url.searchParams.get('fixture');if(['journal','document','blueprint','computer','latch','switchboard','valve','cabinet','cache','tool','key','battery','exit','filter','crank','charge','reader','damper','press','winch','beacon'].includes(kind))html=html.replace('</script>',`state=campaignState(7);state.enemies.forEach(e=>e.hp=0);const f=state.items.find(i=>fixtureKind(i)==='${kind}')||{id:'preview',name:'Preview',type:'terminal',x:5.5,y:5.5};state.items=[f];const originalKind=fixtureKind;fixtureKind=i=>i===f?'${kind}':originalKind(i);f.x=5.5;f.y=5.5;const a=fixtureYaw(f);state.p={...state.p,x:f.x-Math.sin(a)*1.7,y:f.y-Math.cos(a)*1.7,a:Math.atan2(Math.cos(a),Math.sin(a))};lookPitch=.10;updateEnemies=()=>{};rebuildPresentation();resume(false);</script>`);}
 if(review.startsWith('death-')){const setup="state.enemies.forEach(e=>e.hp=0);for(const[index,x]of[[0,3.8],[3,5.5],[9,7.2]]){const e=state.enemies[index];e.x=x;e.y=18;e.deathTime=state.time-3;}"+(review==='death-loop'?"const originalUpdate=update;update=dt=>{originalUpdate(dt);for(const e of state.enemies)e.deathTime=state.time-state.time%2.5;};":"");html=html.replace('</script>',setup+'</script>');}
 if(review.startsWith('reload-')){const setup="state.owned[1]=true;state.gun="+(review==='reload-shotgun'?1:0)+";state.enemies.forEach(e=>e.hp=0);const originalUpdate=update;update=dt=>{originalUpdate(dt);state.reload=(state.gun?1:.65)*(1-(state.time%2)/2);};";html=html.replace('</script>',setup+'</script>');}
 if(url.searchParams.has('phase')&&(review.startsWith('death-')||review.startsWith('reload-'))){const phase=Math.max(0,Math.min(.999,Number(url.searchParams.get('phase'))||0));const setup="update=dt=>{clock+=dt;"+(review.startsWith('death-')?"for(const e of state.enemies)e.deathTime=state.time-"+phase+"*(e.type==='brute'?1.15:e.type==='runner'?.72:.95);":"state.reload=(state.gun?1:.65)*(1-"+phase+");")+"};";html=html.replace('</script>',setup+'</script>');}
 const chapterMatch=/^chapter(1[0-4]|[1-9])(-complete)?$/.exec(url.searchParams.get('review')||'');
 if(chapterMatch){const ch=+chapterMatch[1]-1;const setup="state=campaignState("+ch+");rebuildPresentation();resume(false);updateEnemies=()=>{};"+(chapterMatch[2]?"completeChapter();":"");html=html.replace('</script>',setup+'</script>');}
 if(url.searchParams.has('room'))html=html.replace('</script>',"{const r=rooms[Math.max(1,Math.min(rooms.length-1,"+(Number(url.searchParams.get('room'))||1)+"))];state.p.x=r.x+3.5;state.p.y=r.y+4.5;state.p.a="+(chapterMatch?.[1]==='6'?'Math.PI':'0')+";}</script>");
 if(url.searchParams.has('scene'))html=html.replace('</script>',"state=campaignState("+(Math.max(4,Math.min(13,Number(url.searchParams.get('scene'))-1)))+");rebuildPresentation();startChapterScene();</script>");
 if(url.searchParams.has('gear')){const gun=url.searchParams.get('gear')==='flare'?3:2;html=html.replace('</script>',"state=campaignState(4);state.p={...state.p,x:15.5,y:5.5,a:0};state.enemies.forEach(e=>e.hp=0);acquireWeapon("+gun+");rebuildPresentation();resume(false);"+(url.searchParams.has('reload')?"update=dt=>{clock+=dt;state.reload=weaponDef().reload*(1-(clock%2)/2);};":"")+"</script>");}
 if(url.searchParams.has('specials'))html=html.replace('</script>',"state=campaignState(4);state.p={...state.p,x:15.5,y:2.5,a:Math.PI/2};state.enemies.forEach(e=>e.hp=0);for(const [n,type,x]of [[0,'spitter',14.3],[1,'screamer',16.7]])Object.assign(state.enemies[n],{hp:enemyHealth(type),type,x,y:6.2,target:{x:15.5,y:2.5},deathTime:0});updateEnemies=()=>{};updateSpecials=()=>{};acquireWeapon(2);rebuildPresentation();resume(false);"+(url.searchParams.get('specials')==='dead'?"state.enemies.forEach(e=>{e.hp=0;e.deathTime=state.time-3});":"")+"</script>");
 if(url.searchParams.has('ads'))html=html.replace('</script>',"aimToggle=true;camera.aim=1;"+(url.searchParams.get('ads')==='fire'?"update=dt=>{clock+=dt;recoil=.92;};":"")+"</script>");
 if(url.searchParams.has('door'))html=html.replace('</script>',"{const d=state.doors[Math.max(0,Math.min(state.doors.length-1,"+(Number(url.searchParams.get('door'))||0)+"))];d.open=true;const h=!!grid[d.y]?.[d.x-1]&&!!grid[d.y]?.[d.x+1];state.p.x=d.x+.5-(h?2:0);state.p.y=d.y+.5-(h?0:2);state.p.a=h?0:Math.PI/2;state.enemies.forEach(e=>e.hp=0);}</script>");
 if(url.searchParams.has('particles'))html=html.replace('</script>',"update=dt=>{clock+=dt;impactParticles=[];impactBurst(state.p.x+3,1.35,state.p.y,true);updateImpactParticles(.2);state.projectiles=[{type:'blast',x:state.p.x+4,y:state.p.y,height:1,life:.14,vx:0,vy:0}];};</script>");
 if(url.searchParams.has('intro'))html=html.replace('</script>',"startNew();intro.ready=true;intro.time="+Math.max(0,Math.min(31.8,Number(url.searchParams.get('intro'))||0))+";renderIntro();"+(url.searchParams.has('still')?"intro.paused=true;":"")+"</script>");
 if(url.searchParams.has('handling'))html=html.replace('</script>',"state=campaignState(0);state.enemies.forEach(e=>e.hp=0);state.owned[1]=true;state.gun=1;state.mag[1]=0;state.reserve[1]=6;rebuildPresentation();resume(false);"+(url.searchParams.get('handling')==='brute'?"state.p={...state.p,x:23.5,y:4.5,a:0};state.mag[1]=4;Object.assign(state.enemies[0],{type:'brute',hp:190,maxHp:190,x:25,y:4.5});updateEnemies=()=>{};":"")+"</script>");
 if(url.searchParams.get('fallback')==='1'){html=html.replace('</script>',"scene3D?.dispose?.();scene3D=null;$('scene3d').style.display='none';canvas.style.opacity='1';</script>");}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(html);
}).listen(4174,'127.0.0.1',()=>console.log('Dead Air: http://127.0.0.1:4174 — visual fixtures: ?review=archive-full, archive-half, archive-empty, pump-full, pump-empty, maintenance-sign, lockers, archive-inside'));
