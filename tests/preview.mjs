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
 if(review.startsWith('death-')){const setup="state.enemies.forEach(e=>e.hp=0);for(const[index,x]of[[0,3.8],[3,5.5],[9,7.2]]){const e=state.enemies[index];e.x=x;e.y=18;e.deathTime=state.time-3;}"+(review==='death-loop'?"const originalUpdate=update;update=dt=>{originalUpdate(dt);for(const e of state.enemies)e.deathTime=state.time-state.time%2.5;};":"");html=html.replace('</script>',setup+'</script>');}
 if(review.startsWith('reload-')){const setup="state.owned[1]=true;state.gun="+(review==='reload-shotgun'?1:0)+";state.enemies.forEach(e=>e.hp=0);const originalUpdate=update;update=dt=>{originalUpdate(dt);state.reload=(state.gun?1:.65)*(1-(state.time%2)/2);};";html=html.replace('</script>',setup+'</script>');}
 if(url.searchParams.has('phase')&&(review.startsWith('death-')||review.startsWith('reload-'))){const phase=Math.max(0,Math.min(.999,Number(url.searchParams.get('phase'))||0));const setup="update=dt=>{clock+=dt;"+(review.startsWith('death-')?"for(const e of state.enemies)e.deathTime=state.time-"+phase+"*(e.type==='brute'?1.15:e.type==='runner'?.72:.95);":"state.reload=(state.gun?1:.65)*(1-"+phase+");")+"};";html=html.replace('</script>',setup+'</script>');}
 if(url.searchParams.get('fallback')==='1'){html=html.replace('</script>',"scene3D?.dispose?.();scene3D=null;$('scene3d').style.display='none';canvas.style.opacity='1';</script>");}
 const chapterMatch=/^chapter([1-4])(-complete)?$/.exec(url.searchParams.get('review')||'');
 if(chapterMatch){const ch=+chapterMatch[1]-1;const setup="state=campaignState("+ch+");rebuildPresentation();resume(false);updateEnemies=()=>{};"+(chapterMatch[2]?"completeChapter();":"");html=html.replace('</script>',setup+'</script>');}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(html);
}).listen(4174,'127.0.0.1',()=>console.log('Dead Air: http://127.0.0.1:4174 — visual fixtures: ?review=archive-full, archive-half, archive-empty, pump-full, pump-empty, maintenance-sign, lockers, archive-inside'));
