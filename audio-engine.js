// Embedded PCM recordings, decoded once on the first user gesture. No network or timers.
const soundBuffers=new Map(),soundVoices=new Set(),soundLast=new Map(),soundPending=[];
const soundStats={ready:0,played:0,errors:0,peakVoices:0,outputPeak:0,last:'',events:{}};
let effectsBus,roomSend,roomDelay,roomGain,soundMeter,soundMeterData,soundAmbientClock=0;
function initSoundBank(){
 if(effectsBus)return;
 const limiter=ac.createDynamicsCompressor();limiter.threshold.value=-12;limiter.knee.value=18;limiter.ratio.value=5;limiter.attack.value=.003;limiter.release.value=.18;
 master.disconnect();master.connect(limiter);soundMeter=ac.createAnalyser();soundMeter.fftSize=256;soundMeterData=new Float32Array(256);limiter.connect(soundMeter);soundMeter.connect(ac.destination);
 effectsBus=ac.createGain();effectsBus.gain.value=.72;effectsBus.connect(master);
 roomSend=ac.createBiquadFilter();roomSend.type='lowpass';roomSend.frequency.value=1800;
 roomDelay=ac.createDelay(.3);roomDelay.delayTime.value=.095;
 roomGain=ac.createGain();roomGain.gain.value=.12;
 roomSend.connect(roomDelay);roomDelay.connect(roomGain);roomGain.connect(effectsBus);
 for(const [id,encoded] of Object.entries(soundBank))try{
  const raw=atob(encoded),bytes=Uint8Array.from(raw,c=>c.charCodeAt(0)),view=new DataView(bytes.buffer);
  let data=0,size=0,rate=0,channels=0,bits=0;
  for(let p=12;p+8<=bytes.length;){const tag=raw.slice(p,p+4),n=view.getUint32(p+4,true);if(tag==='fmt '){if(view.getUint16(p+8,true)!==1)throw Error('PCM required');channels=view.getUint16(p+10,true);rate=view.getUint32(p+12,true);bits=view.getUint16(p+22,true);}if(tag==='data'){data=p+8;size=n;break;}p+=8+n+(n%2);}
  if(!data||channels!==1||bits!==16||!rate||data+size>bytes.length)throw Error('Invalid clip');
  const b=ac.createBuffer(1,size/2,rate),samples=b.getChannelData(0);for(let n=0;n<samples.length;n++)samples[n]=view.getInt16(data+n*2,true)/32768;
  soundBuffers.set(id,b);
 }catch{soundStats.errors++;}
 soundStats.ready=soundBuffers.size;
}
function stopSoundVoice(v){try{v.src.stop();}catch{}v.cleanup();}
function stopGameSounds(){soundPending.length=0;for(const v of [...soundVoices])stopSoundVoice(v);}
function flushPendingSounds(){const pending=soundPending.splice(0);for(const p of pending)if(Date.now()-p.when<250)audioEvent(...p.args);}
function playClip(id,volume=.3,bearing=0,options={}){
 if(!ac||ac.state!=='running'||!effectsBus||+$('volume').value===0||volume<=0)return;
 const buffer=soundBuffers.get(id);if(!buffer)return;
 if(soundVoices.size>=32)stopSoundVoice(soundVoices.values().next().value);
 const src=ac.createBufferSource(),gain=ac.createGain(),pan=ac.createStereoPanner(),filter=ac.createBiquadFilter();
 const rate=options.rate||1;src.buffer=buffer;src.playbackRate.value=rate;
 gain.gain.value=Math.min(1,volume);pan.pan.value=Math.sin(bearing);
 filter.type='lowpass';filter.frequency.value=options.muffled?950:options.cutoff||18000;
 src.connect(filter);filter.connect(gain);gain.connect(pan);pan.connect(effectsBus);
 if(options.room!==false)pan.connect(roomSend);
 const v={src,kind:options.kind,gun:state.gun,cleanup(){if(!soundVoices.delete(v))return;src.disconnect();filter.disconnect();gain.disconnect();pan.disconnect();}};
 soundVoices.add(v);src.onended=v.cleanup;src.start();
 soundStats.played++;soundStats.last=id;soundStats.events[id]=(soundStats.events[id]||0)+1;soundStats.peakVoices=Math.max(soundStats.peakVoices,soundVoices.size);
}
function audioEvent(type,vol=.3,bearing=0,options={}){
 if(!ac)return;
 if(ac.state==='suspended'){if(soundPending.length<8)soundPending.push({args:[type,vol,bearing,options],when:Date.now()});return;}
 if(ac.state!=='running')return;
 const variant=()=>Math.floor(Math.random()*3),rate=()=>.95+Math.random()*.1;
 const aliases={gunshot:'pistol',shotgun:'shotgun',carbine:'rifle',bottle:'glass',door:'door-open',click:'latch',pickup:'gear',paper:'gear',heal:'gear',switch:'switch',hit:'hit',body:'body',bash:'door-bash'};
 if(type==='footstep'){
  const p=state.p,z=zone[Math.floor(p.y)]?.[Math.floor(p.x)],wet=!state.chapter&&((z===6&&state.drain<75)||(p.x>=6&&p.x<=9&&Math.floor(p.y)===20));
  playClip((wet?'splash':[5,7].includes(z)?'metalstep':'step')+variant(),vol*.65,bearing,{...options,rate:rate(),room:false});return;
 }
 if(type==='enemy'||type.startsWith('zombie-')){
  const kind=type.slice(7),r={brute:.67,runner:1.23,spitter:.88,screamer:1.4}[kind]||.96;
  playClip('groan'+Math.floor(Math.random()*6),vol*.8,bearing,{...options,rate:r*rate()});return;
 }
 if(type==='reload'){
  const g=state.gun;if(g===1){playClip('gear',vol*.5,0,{room:false});return;}
  const id=g===2?'reload-carbine':g===3?'rack':'reload-pistol',b=soundBuffers.get(id);
  playClip(id,vol,0,{rate:b?b.duration/weaponDef(g).reload:1,kind:'reload',room:false});return;
 }
 if(type==='shell'){playClip('shell',vol,0,{rate:rate(),room:false});return;}
 if(type==='flare'){playClip('shotgun',vol*.65,bearing,{...options,rate:.65,cutoff:2200});playClip('splash1',vol*.22,bearing,{rate:.7});return;}
 if(type==='machinery'){playClip('door-open',vol*.5,bearing,{...options,rate:.55});playClip('door-close',vol*.25,bearing,options);return;}
 if(type==='radio'||type==='confirm'||type==='denied'){
  // Radios and electronic controls retain authored electronic tones.
  if(!effectsBus||+$('volume').value===0)return;
  const t=ac.currentTime;if(t-(soundLast.get('tone')??-1)<.08)return;soundLast.set('tone',t);
  if(soundVoices.size>=32)stopSoundVoice(soundVoices.values().next().value);
  const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(type==='denied'?130:650,t);o.frequency.setValueAtTime(type==='denied'?95:900,t+.065);g.gain.setValueAtTime(vol*.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+.16);o.connect(g);g.connect(effectsBus);
  const v={src:o,cleanup(){if(!soundVoices.delete(v))return;o.disconnect();g.disconnect();}};soundVoices.add(v);o.onended=v.cleanup;o.start();o.stop(t+.17);return;
 }
 playClip(aliases[type]||type,vol,bearing,{...options,rate:options.rate||rate()});
}
// Hearing propagation remains an AI concern. These audible-only cues cannot alert enemies.
function audioAt(type,entity,volume=.4){
 if(!ac)return;const d=dist(entity,state.p);if(d>16)return;
 const strength=received(field(entity.x,entity.y,18),state.p);if(strength<=0)return;
 audioEvent(type,volume*Math.min(1,strength/16),angle(Math.atan2(entity.y-state.p.y,entity.x-state.p.x)-state.p.a),{muffled:!sees(state.p,entity,20)});
}
function enemyImpactSound(e){audioAt(e.hp<=0?'body':'hit',e,.55);const last=soundLast.get('pain-'+e.id)||-10;if(state.time-last>.4){soundLast.set('pain-'+e.id,state.time);audioAt('zombie-'+e.type,e,e.hp<=0?.38:.28);}}
function updateSoundscape(dt){
 if(soundMeter){soundMeter.getFloatTimeDomainData(soundMeterData);for(const n of soundMeterData)soundStats.outputPeak=Math.max(soundStats.outputPeak,Math.abs(n));}
 for(const v of [...soundVoices])if(v.kind==='reload'&&(state.reload<=0||state.gun!==v.gun||mode!=='play'))stopSoundVoice(v);
 if(!ac||mode!=='play')return;
 soundAmbientClock-=dt;if(soundAmbientClock>0)return;soundAmbientClock=5+Math.random()*5;
 if(!state.chapter&&state.drain<75)audioAt('splash'+Math.floor(Math.random()*3),{x:7.5,y:20.5},state.running?.28:.12);
 if(!safe(state.p))audioEvent('metal',.018,Math.random()*Math.PI*2,{rate:.55,cutoff:1100});
}
