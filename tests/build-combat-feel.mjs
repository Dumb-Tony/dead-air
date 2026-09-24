import fs from 'node:fs';
export function buildCombatFeel(html){
 const replace=(a,b)=>{if(!html.includes(a))throw Error('Missing combat feel anchor: '+a.slice(0,90));html=html.replace(a,b);};
 replace('function damageEnemy(e,amount){',fs.readFileSync(new URL('../combat-feel.js',import.meta.url),'utf8')+'\nfunction damageEnemy(e,amount){');
 replace('e.hp-=amount;e.stagger=', 'e.hp-=amount;e.meleeWindup=0;e.stagger=');
 replace('for(const e of candidates.slice(0,w.targets))damageEnemy(e,g===1?Math.max(38,105-dist(e,state.p)*5):w.damage);',"for(const e of candidates.slice(0,w.targets)){const distance=dist(e,state.p);damageEnemy(e,g===1?Math.max(38,105-distance*5):w.damage);if(g===1&&e.hp>0){const push=(e.type==='brute'?.16:.48)*Math.max(.25,1-distance/12),dx=e.x-state.p.x,dy=e.y-state.p.y,d=Math.hypot(dx,dy)||1;safeImpulse(e,dx/d*push,dy/d*push,true);e.repath=0;}}");
 replace("if(d<.8&&!safe(state.p)&&sees(e,state.p,1)&&e.attack<=0){state.p.hp=Math.max(0,state.p.hp-(e.type==='brute'?22:e.type==='runner'?8:12));e.attack=.9;hurt=.55;audioEvent('hit',.7);audioAt('zombie-'+e.type,e,.3);caption('You are hit — move!',2);if(state.p.hp<=0){showMenu('dead');return;}}", "if(enemyMelee(e,dt)){if(mode!=='play')return;continue;}");
 replace('function update(dt){clock+=dt;', 'function update(dt){updateQuickstep(dt);clock+=dt;');
 replace('function resetTransient(){stopGameSounds();', 'function resetTransient(){stepCooldown=0;stepRemaining=0;stopGameSounds();');
 replace("if(e.code==='KeyE')interact();", "if(e.code==='KeyX')quickstep();if(e.code==='KeyE')interact();");
 replace('function draw(dt=1/60){', 'function draw(dt=1/60){combatReadiness();');
 replace('e.hp>0&&e.windup>0){const d=', 'e.hp>0&&(e.windup>0||e.meleeWindup>0)){const d=');
 replace("e.type==='spitter'?[.48,1,.14]:[.2,.65,1],.9);", "e.meleeWindup>0?[1,.32,.08]:e.type==='spitter'?[.48,1,.14]:[.2,.65,1],.9);");
 replace("hit=!dead?e.stagger*.055:0;", "hit=!dead&&!$('motionSetting').checked?(e.stagger*.18-(e.meleeWindup>0?.025*Math.sin(state.time*24):0)):0;");
 replace('<div id="storyLayer"', '<div id="combatReady" aria-live="off"></div><div id="storyLayer"');
 replace('</style>', '#combatReady{position:fixed;left:50%;bottom:13%;transform:translateX(-50%);z-index:4;color:#c4c8bc;font:10px monospace;letter-spacing:.12em;pointer-events:none;text-shadow:0 2px 4px #000;opacity:0}#combatReady.incoming{color:#ffb071;background:#210a06bb;padding:7px 12px;border-top:2px solid #e88640}#cross{transition:transform .06s,filter .06s}@media(prefers-reduced-motion:reduce){#cross{transition:none}}</style>');
 replace('<b>Shift</b> Sprint · <b>C</b>', '<b>Shift</b> Sprint · <b>X</b> Quickstep · <b>C</b>');
 replace('version:\'0.13.0\',cinematic:',"version:'0.14.0',quickstep:{ready:stepCooldown<=0,cooldown:stepCooldown,active:stepRemaining>0},cinematic:");
 return html.replaceAll('v0.13.0','v0.14.0');
}
