// Included inside the WebGL renderer, sharing its existing materials and meshes.
texture('record-paper',g=>{
 g.fillStyle='#d7c99e';g.fillRect(0,0,512,512);g.fillStyle='#b8a77e';for(let n=0;n<1000;n++)g.fillRect((n*73)%512,(n*139)%512,2,1);
 g.strokeStyle='#978d7338';for(let y=125;y<460;y+=27){g.beginPath();g.moveTo(44,y);g.lineTo(465,y);g.stroke();}
 g.fillStyle='#474942';g.font='bold 26px monospace';g.fillText('FIELD RECORD',42,66);g.fillStyle='#7b4638';g.fillRect(42,85,112,5);
 g.fillStyle='#545448';for(let j=0;j<11;j++)for(let k=0;k<4;k++)g.fillRect(46+k*98,124+j*27,48+(j*13+k*17)%40,3);
 g.strokeStyle='#8e4b36';g.lineWidth=3;g.strokeRect(336,403,128,58);g.font='20px monospace';g.fillStyle='#8e4b36';g.fillText('ORIGINAL',345,440);
});
texture('record-blueprint',g=>{
 g.fillStyle='#254b58';g.fillRect(0,0,512,512);g.strokeStyle='#729da13d';for(let n=16;n<512;n+=24){g.beginPath();g.moveTo(n,0);g.lineTo(n,512);g.moveTo(0,n);g.lineTo(512,n);g.stroke();}
 g.strokeStyle='#c1d5c4';g.lineWidth=4;for(let j=0;j<6;j++)g.strokeRect(52+j%3*144,114+Math.floor(j/3)*154,105,105);g.beginPath();g.moveTo(104,170);g.lineTo(392,170);g.lineTo(392,324);g.lineTo(104,324);g.stroke();g.fillStyle='#e1c981';g.font='bold 27px monospace';g.fillText('SERVICE ROUTE',40,60);g.font='18px monospace';g.fillText('LOCAL COPY / KEEP DRY',42,475);
});
texture('terminal-screen',g=>{
 g.fillStyle='#072623';g.fillRect(0,0,512,512);g.fillStyle='#97cfaa';g.font='bold 34px monospace';g.fillText('RELAY / LOCAL',35,62);g.fillStyle='#36675c';g.fillRect(34,86,442,3);g.font='24px monospace';for(const [j,t]of ['STATION ONLINE','> ACCESS RECORDS','> SYSTEM CONTROL','> FIELD CHECKPOINT'].entries())g.fillText(t,35,140+j*54);g.fillStyle='#73a987';for(let j=0;j<35;j++)g.fillRect(36+j*12,435-((j*19)%77),7,((j*19)%77)+12);g.fillStyle='#00140e28';for(let y=0;y<512;y+=5)g.fillRect(0,y,512,2);
});
function designedFixture(i){
 const kind=fixtureKind(i);if(['ammo','med','shotgun','carbine','flare','pump'].includes(kind))return false;
 const yaw=fixtureYaw(i),co=Math.cos(yaw),si=Math.sin(yaw),done=fixtureComplete(i),steel=[.43,.50,.46],dark=[.12,.17,.16],brass=[.67,.49,.23],paper=[1.04,.99,.87],light=done?[.28,.88,.55]:[.93,.58,.22];
 const p=(x,y,z)=>[i.x+x*co+z*si,y,i.y-x*si+z*co];
 const b=(mat,x,y,z,w,h,d,tint=steel,turn=0,emission=0)=>box(mat,...p(x,y,z),w,h,d,tint,yaw+turn,emission);
 const r=(a,c,d,t=steel)=>rod(p(...a),p(...c),d,t);
 const face=(mat,x,y,z,w,h,emission=0)=>drawMesh(displayMesh,mat,model(...p(x,y,z),w,h*2,1,yaw),[1,1,1],emission);
 const top=(mat,x,y,z,w,d)=>drawMesh(plane,mat,model(...p(x,y,z),w,1,d,yaw+Math.PI),paper,.06);
 const desk=()=>{b('metal',0,.75,0,.88,.065,.68);for(const x of [-.36,.36])for(const z of [-.24,.24])b('metal',x,.36,z,.045,.72,.045,dark);b('metal',0,.26,.24,.73,.04,.04,dark);};
 const lamp=(x,y,z)=>b('white',x,y,z,.035,.035,.018,light,0,.7);
 if(['document','journal','blueprint'].includes(kind)){
  desk();b('cloth',0,.793,.015,.67,.024,.49,[.32,.26,.18]);
  if(kind==='journal'){
   b('grip',0,.82,0,.64,.027,.44,[.32,.14,.075]);b('white',-.151,.849,0,.288,.04,.40,paper);b('white',.151,.849,0,.288,.04,.40,paper);top('record-paper',-.153,.871,0,.285,.4);top('record-paper',.153,.871,0,.285,.4);b('cloth',0,.86,0,.025,.036,.43,[.31,.23,.12]);b('cloth',.08,.873,.19,.022,.004,.14,[.60,.15,.09]);
  }else{b('white',0,.817,.01,.48,.025,.49,paper,-.08);top(kind==='blueprint'?'record-blueprint':'record-paper',0,.837,0,.46,.49);if(kind==='document'){b('metal',0,.845,.222,.16,.018,.025,brass);r([-.065,.84,.24],[.065,.84,.24],.01,steel);}}
  r([.34,.802,-.17],[.34,.802,.17],.012,brass);return true;
 }
 if(kind==='computer'||kind==='reader'){
  desk();b('grip',0,.82,.12,.22,.09,.21,dark);b('metal',0,1.08,.12,.68,.48,.40);b('grip',0,1.08,-.086,.59,.36,.028,dark);face(kind==='reader'?'record-blueprint':'terminal-screen',0,1.08,-.105,.52,.285,.38);b('metal',0,.82,-.22,.59,.045,.19,[.63,.66,.55]);for(let y=0;y<3;y++)for(let x=0;x<11;x++)b('grip',-.25+x*.05,.85,-.29+y*.053,.035,.015,.032,dark);lamp(.28,.9,-.101);for(let j=0;j<5;j++)b('grip',.346,1.05+j*.035,.14,.007,.01,.23,dark);r([.17,.77,.25],[.29,.23,.25],.018,dark);if(kind==='reader')for(const x of [-.21,.21]){r([x,1.40,.06],[x,1.40,-.04],.20,steel);r([x,1.40,-.05],[x,1.40,-.06],.06,dark);}return true;
 }
 if(['latch','switchboard','valve','damper'].includes(kind)){
  b('metal',0,.56,.12,.15,1.12,.16,dark);b('metal',0,.08,.1,.49,.12,.45);b('metal',0,1.00,0,.56,.57,.24);b('hazard',0,1.28,-.13,.57,.065,.022);for(const x of [-.23,.23])for(const y of [.78,1.23])b('metal',x,y,-.133,.028,.028,.025,brass);
  if(kind==='damper'){for(let n=0;n<6;n++)b('metal',0,.84+n*.06,-.15,.39,.027,.09,steel);r([.20,.87,-.17],[.20,done?.90:1.14,-.24],.027,brass);}
  else if(kind==='valve'){
   r([0,1.02,-.11],[0,1.02,-.32],.075,brass);for(let n=0;n<16;n++){const a=n*TAU/16,c=(n+1)*TAU/16;r([Math.cos(a)*.2,1.02+Math.sin(a)*.2,-.29],[Math.cos(c)*.2,1.02+Math.sin(c)*.2,-.29],.028,[.61,.21,.10]);}for(let n=0;n<4;n++){const a=n*Math.PI/2+(done?.5:0);r([0,1.02,-.29],[Math.cos(a)*.2,1.02+Math.sin(a)*.2,-.29],.019,brass);}
  }else if(kind==='latch'){
   b('grip',0,1.01,-.135,.20,.36,.027,dark);r([0,.86,-.15],[0,done?.91:1.16,-.29],.043,steel);b('grip',0,done?.91:1.16,-.29,.30,.065,.06,[.61,.27,.12]);b('metal',0,.83,-.17,.27,.045,.07,brass);
  }else for(let n=0;n<3;n++){const x=-.16+n*.16;b('grip',x,1.00,-.135,.1,.28,.02,dark);r([x,.91,-.15],[x,done?.93:1.10,-.22],.023,brass);b('grip',x,done?.93:1.10,-.22,.08,.047,.04,[.52,.20,.09]);}
  lamp(.20,.84,-.15);return true;
 }
 if(kind==='cabinet'||kind==='cache'){
  const cabinet=kind==='cabinet';b('metal',0,cabinet?.63:.31,0,.79,cabinet?1.20:.56,.59,cabinet?[.52,.43,.30]:[.32,.43,.31]);
  for(let n=0;n<(cabinet?3:1);n++){const y=cabinet?.27+n*.37:.33;b('grip',0,y,-.305,.69,cabinet?.32:.37,.02,dark);b('metal',0,y,-.322,.65,cabinet?.28:.32,.017,cabinet?[.59,.51,.37]:steel);r([-.1,y,-.34],[.1,y,-.34],.022,brass);b('white',0,y+.078,-.336,.14,.043,.009,paper);}
  if(!cabinet){b('hazard',0,.61,0,.83,.035,.64);lamp(.30,.45,-.34);}return true;
 }
 if(kind==='exit'){
  b('metal',0,.56,0,.22,1.12,.22);b('metal',0,1.19,0,.64,.35,.14,dark);b('white',0,1.19,-.08,.55,.26,.016,[.32,.62,.47],0,.25);r([-.18,1.19,-.10],[.16,1.19,-.10],.025,[.82,.92,.75]);r([.16,1.19,-.10],[.06,1.28,-.10],.025,[.82,.92,.75]);r([.16,1.19,-.10],[.06,1.10,-.10],.025,[.82,.92,.75]);b('hazard',0,.12,0,.45,.15,.44);return true;
 }
 if(['press','winch'].includes(kind)){
  desk();for(const x of [-.30,.30])b('metal',x,1.08,.12,.065,.59,.10);b('metal',0,1.38,.12,.67,.10,.14);r([0,.84,.12],[0,1.44,.12],.055,brass);b('metal',0,1.02,.12,.49,.12,.37);b('white',0,.83,-.08,.4,.035,.33,paper);if(kind==='press')top('record-paper',0,.852,-.08,.4,.33);else for(let n=0;n<9;n++)r([-.21,1.07+n*.021,-.1],[.21,1.07+n*.021,-.1],.012,dark);r([-.21,1.44,.12],[.21,1.44,.12],.025,steel);return true;
 }
 if(kind==='beacon'){
  b('metal',0,.52,0,.12,1.04,.13);b('metal',0,.08,0,.5,.1,.43);b('metal',0,1.10,0,.42,.36,.28);const tint=/BLUE/.test(i.name)?[.27,.66,1]:/WHITE/.test(i.name)?[.85,.94,.85]:[1,.62,.22];drawMesh(sphere,'white',model(...p(0,1.12,-.16),.28,.28,.09,yaw),tint,done?.8:.32);b('grip',.22,.91,0,.04,.12,.2);return true;
 }
 if(['tool','crank','key','battery','filter','charge'].includes(kind)){
  desk();if(kind==='battery'){b('grip',0,.97,0,.27,.37,.24,[.30,.38,.23]);for(const x of [-.08,.08])b('metal',x,1.18,0,.04,.06,.05,brass);b('hazard',0,.98,-.127,.25,.12,.01);}
  else if(kind==='filter'){b('metal',0,.94,0,.43,.30,.23);for(let n=0;n<11;n++)b('grip',-.18+n*.036,.94,-.13,.013,.24,.02,dark);b('hazard',0,1.10,0,.43,.03,.24);}
  else if(kind==='charge'){for(let n=0;n<3;n++)r([-.13+n*.13,.84,-.16],[-.13+n*.13,.84,.16],.10,[.55,.18,.09]);for(const z of [-.10,.10])b('grip',0,.902,z,.39,.015,.03,dark);r([0,.91,.13],[.19,.91,.21],.009,[.71,.48,.15]);}
  else if(kind==='crank'){r([-.23,.82,0],[.03,.82,0],.032,steel);r([.03,.82,0],[.03,.94,0],.032,steel);r([.03,.94,0],[.23,.94,0],.045,[.58,.27,.12]);}
  else if(kind==='tool'){r([-.26,.82,0],[.19,.82,0],.045,steel);b('grip',-.14,.824,0,.23,.05,.07,[.59,.22,.08]);for(const z of [-.055,.055])b('metal',.23,.827,z,.12,.046,.036,steel);}
  else{b('metal',-.12,.825,0,.14,.023,.13,brass);r([-.05,.827,0],[.24,.827,0],.025,brass);for(let n=0;n<3;n++)b('metal',.15+n*.035,.827,.03,.015,.021,.07,brass);}return true;
 }
 return false;
}
