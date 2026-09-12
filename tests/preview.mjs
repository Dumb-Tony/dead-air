import http from 'node:http';
import fs from 'node:fs';
const fixtures={
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
 if(fixture){const setup=`\n// Local visual-test fixture; never included in the distributable.\nstate=fresh();state.p.x=${fixture.x};state.p.y=${fixture.y};state.p.a=${fixture.a};state.drain=${fixture.drain};state.installed=true;state.handle=true;mode='play';started=true;updateEnemies=()=>{};lookPitch=.06;$('veil').classList.add('hidden');$('hud').classList.remove('hidden');$('brightness').value='105';$('motionSetting').checked=true;\n`;const lineup=url.searchParams.get('review')==='zombie-lineup'?"state.enemies.forEach(e=>e.hp=0);for(const[index,x]of[[0,3.8],[3,5.5],[9,7.2]]){const e=state.enemies[index];e.hp=e.type==='brute'?140:e.type==='runner'?45:70;e.x=x;e.y=18;e.target={x:state.p.x,y:state.p.y};}updateEnemies=()=>{};":'';html=html.replace('</script>',setup+lineup+'</script>');}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(html);
}).listen(4174,'127.0.0.1',()=>console.log('Dead Air: http://127.0.0.1:4174 — visual fixtures: ?review=archive-full, archive-half, archive-empty, pump-full, pump-empty, maintenance-sign, lockers, archive-inside'));
