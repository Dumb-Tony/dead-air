test('all chapters give notes, mechanical latches and computers distinct identities',()=>{
 for(let ch=0;ch<18;ch++){
  run(`state=campaignState(${ch})`);
  assert(run('state.items.filter(i=>i.type==="note").every(i=>["journal","document","blueprint"].includes(fixtureKind(i)))'));
  assert(run('state.items.filter(i=>/^secret-[abc]$/.test(i.id)).every(i=>fixtureKind(i)==="latch")'));
  assert.equal(run('fixtureKind(state.items.find(i=>i.id==="base"))'),'computer');
 }
});
test('specific campaign props reflect their physical function',()=>{
 for(const [ch,id,kind]of [[1,'key','filter'],[1,'a','damper'],[2,'key','battery'],[8,'key','crank'],[8,'route','reader'],[8,'control','press'],[9,'control','beacon'],[10,'control','winch'],[13,'proof','charge']]){
  assert.equal(run(`fixtureKind(layoutFor(${ch}).items.find(i=>i.id==='${id}'))`),kind);
 }
});
test('visual classification never changes persistent state or puzzle types',()=>{
 run('state=campaignState(10);const beforeFixtures=JSON.stringify(state);for(const i of state.items){fixtureKind(i);fixtureYaw(i);fixtureComplete(i);}');assert(run('beforeFixtures===JSON.stringify(state)'));
});
test('latch position and lamp follow the puzzle sequence without revealing it',()=>{
 run('state=campaignState(0);state.secrets.sequence=[]');assert.equal(run('fixtureComplete(state.items.find(i=>i.id==="secret-a"))'),false);
 run('state.secrets.sequence=["a"]');assert.equal(run('fixtureComplete(state.items.find(i=>i.id==="secret-a"))'),true);assert.equal(run('fixtureComplete(state.items.find(i=>i.id==="secret-b"))'),false);
});
test('paper reading still opens and closes the journal through real interaction',()=>{
 run('state=campaignState(0);const noteForFixture=state.items.find(i=>i.id==="note1");state.p={...state.p,x:noteForFixture.x-1,y:noteForFixture.y,a:0};interact()');assert.equal(run('mode'),'journal');assert(run('state.notes.includes("note1")'));run('closeFieldJournal()');assert.equal(run('mode'),'play');
});
