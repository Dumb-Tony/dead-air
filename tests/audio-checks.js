// Called by check.mjs after the route suite; exercise real game hooks with a Web Audio test double.
context.atob=s=>Buffer.from(s,'base64').toString('binary');
run(`window.AudioContext=class {
 constructor(){this.state='running';this.currentTime=1;this.sampleRate=22050;this.destination={};}
 resume(){this.state='running';return Promise.resolve();}
 createGain(){return this.node();}createStereoPanner(){return this.node();}createBiquadFilter(){return this.node();}createDelay(){return this.node();}createDynamicsCompressor(){return this.node();}createAnalyser(){return this.node();}createOscillator(){return this.node();}createBufferSource(){return this.node();}
 createBuffer(c,n,rate){const samples=new Float32Array(n);return {duration:n/rate,length:n,getChannelData:()=>samples};}
 node(){const p=()=>({value:0,setValueAtTime(v){this.value=v;},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){},setTargetAtTime(){}});return {gain:p(),pan:p(),frequency:p(),playbackRate:p(),delayTime:p(),threshold:p(),knee:p(),ratio:p(),attack:p(),release:p(),connect(){},disconnect(){},start(){},stop(){},getFloatTimeDomainData(a){a.fill(0);}};}
};initAudio();`);
test('all embedded sound clips decode into non-silent normalized PCM',()=>{
 assert.equal(run('soundStats.ready'),32);assert.equal(run('soundStats.errors'),0);
 assert(run('[...soundBuffers.values()].every(b=>b.duration>.03&&b.duration<4&&b.getChannelData(0).some(x=>Math.abs(x)>.5)&&b.getChannelData(0).every(x=>Math.abs(x)<.9))'));
});
test('all four guns dispatch distinct audible weapon reports',()=>{
 for(const [g,sample] of [[0,'pistol'],[1,'shotgun'],[2,'rifle'],[3,'shotgun']]){run(`state=fresh();state.gun=${g};state.mag[${g}]=4;state.enemies.forEach(e=>e.hp=0);soundStats.events={};fire()`);assert(run(`soundStats.events['${sample}']>0`));}
});
test('shotgun audio inserts exactly one sound per completed shell',()=>{
 run('state.gun=1;state.mag[1]=0;state.reserve[1]=4;soundStats.events={};reload();updateReload(.79)');assert.equal(run('soundStats.events.shell||0'),0);
 run('updateReload(.01)');assert.equal(run('soundStats.events.shell'),1);run('updateReload(2.4)');assert.equal(run('soundStats.events.shell'),4);assert.equal(run('state.mag[1]'),4);
});
test('interrupted shotgun reload cannot produce phantom shell sounds',()=>{
 run('state.gun=1;state.mag[1]=1;state.reserve[1]=4;soundStats.events={};reload();updateReload(.4);fire();updateReload(2)');assert.equal(run('soundStats.events.shell||0'),0);
});
test('magazine sound playback fits reload and stops after weapon switching',()=>{
 run('state.mag[0]=0;reload()');assert(run('[...soundVoices].some(v=>v.kind==="reload")'));run('state.gun=1;state.reload=0;updateSoundscape(.01)');assert(!run('[...soundVoices].some(v=>v.kind==="reload")'));
});
test('master mute prevents recorded and electronic sound allocation',()=>{
 run("$('volume').value=0;audioEvent('gunshot');audioEvent('radio');");assert.equal(run('soundVoices.size'),0);run("$('volume').value=55");
});
test('voice cap and pause cleanup bound repeated combat audio',()=>{
 run("for(let i=0;i<100;i++)audioEvent('shotgun');");assert.equal(run('soundVoices.size'),32);run('showMenu()');assert.equal(run('soundVoices.size'),0);
});
test('inaudible distant zombie voices allocate no playback',()=>{
 run("audioAt('zombie-brute',{x:100,y:100},1)");assert.equal(run('soundVoices.size'),0);
});
test('doors have opening and closing recordings through real interaction',()=>{
 run('state.p={...state.p,x:8,y:4.5,a:0};soundStats.events={};interact();interact()');assert(run('soundStats.events["door-open"]>0'));assert(run('soundStats.events["door-close"]>0'));
});
test('zombie damage and player injuries create impact audio',()=>{
 run('state.p={...state.p,x:23.5,y:4.5,a:0};state.enemies[0].x=25;state.enemies[0].y=4.5;soundStats.events={};damageEnemy(state.enemies[0],1000);hurtPlayer(5)');assert(run('soundStats.events.body>0'));assert(run('soundStats.events.hit>0'));
});
test('first gesture audio is replayed after unlock, but pause discards it',()=>{
 run("soundStats.events={};ac.state='suspended';audioEvent('shotgun',.5);ac.state='running';flushPendingSounds()");assert.equal(run('soundStats.events.shotgun'),1);
 run("ac.state='suspended';audioEvent('shotgun',.5);showMenu();ac.state='running';flushPendingSounds()");assert.equal(run('soundStats.events.shotgun'),1);
});
