# DEAD AIR — Game Design Document

Version 0.1 · September 11, 2026 · Single-player survival FPS

## 1. Product and creative pillars

You are trapped beneath Relay Station 6 after an emergency transmission arrives in your own voice: “Do not let me reach the transmitter.” Restore the facility and find the surface, while deciding whether restoring its voice is a mistake.

**Core promise:** deliberately make noise, survive its consequences, return with permanent progress. Three pillars: understandable acoustics; powerful but consequential combat; preparation that survives contact with the unexpected. Grounded industrial spaces contain one impossible phenomenon: a broadcast that knows things it should not.

Full-campaign target: 4–6 hours, one authored interconnected station, no procedural map generation or compulsory grinding. This first delivery is a desktop, standalone, offline HTML 2.5D first-person prototype of one expedition, not the finished campaign or full 3D production art.

## 2. Player loop

At maintenance: heal, save, inspect map and choose next objective. Depart through an acoustically insulated door. Search lockers for breaker handle, supplies and maintenance notes. Open alternate paths and place a delayed noisemaker. Install handle at west pump; start its 75-second cycle. Use continuous machinery as footstep cover while managing approaching threats. Drained archive unlocks. Recover lift schematic, return to maintenance, and use its terminal to complete the slice.

Retreat is allowed at any point. Stopping the pump retains drainage progress. Reaching maintenance does not replenish ammunition or resurrect enemies. Defeated enemies remain defeated. New game resets the expedition only after confirmation.

## 3. Controls and handling

WASD movement; mouse horizontal look using optional pointer lock; arrow left/right fallback turning; Shift sprint; C toggle crouch; left click/Space fire; E interact; R reload; Q throw bottle; G place delayed noisemaker; V wedge/unwedge targeted door; H medical kit; F flashlight; M map; Esc pause. Mouse sensitivity, volume, captions and reduced flashes adjustable from menu.

No mouse lock or fullscreen dependency for starting. Movement is collision-resolved on both axes with a player radius. Diagonal velocity normalized. Crouch is slower and quieter, sprint faster and louder. No stamina bar in the slice. Weapon fire has short cooldown, visible recoil, hit confirmation and enemy stagger. Controls clear on focus loss; simulation pauses when window loses focus.

## 4. Acoustic contract

The prototype uses a connected grid as an acoustic graph. Sound spends strength crossing floor cells; heavy closed doors add substantial attenuation; concrete blocks transmission. It can travel around a wall through a connected corridor but cannot pass directly through concrete. Open doors carry sound without the closed-door penalty. The player hears filtered directional cues under the same path attenuation. Acoustic captions optionally indicate bearing and relative strength, not exact enemy coordinates.

Sound events carry location, strength and category. Listeners compare received strength against a threshold and investigate the event location, not the player's live coordinates. Their memory expires; new evidence is required for continued pursuit. Visual detection at short range remains possible. Machinery produces a persistent masking field: a weaker footstep or bottle sound at a listener is masked by the pump. Gunshots exceed the mask locally. Crawlers ignore footsteps and investigate machinery vibration, with separate short-range visual detection.

Prototype event strengths (game units, not real decibels): crouch 1.6; walk 5; sprint 10; metal floor multiplier 1.45; door 7; bottle 16; pistol 27; shotgun 35; pump 20; noisemaker 22. Closed-door attenuation 10, floor-cell transmission cost 1. Field strengths and timers are tuning values, not promises of physical realism.

Essential fairness rules: no detection through concrete; no global alert spawned by one gunshot; searches expire; no silent teleporting spawns; machinery complications telegraphed. UI says MASKED only when nearby pump cover is strong enough to plausibly cover ordinary footsteps; it is not an invisibility state.

## 5. Combat and resource economy

Pistol: 8-round magazine, 35 damage, 0.30-second fire interval, 1.2-second reload. Shotgun: 4-round tube simplified to magazine reload, 90 close-range damage with falloff, 0.9-second fire interval, 1.8-second reload. Switch with 1/2. No ammunition is lost through tactical reload. Empty fire clicks without creating a gunshot event. Hits require line of sight and a narrow angular cone; shotgun has a wider cone. Multiple pellets/detailed ballistics are deferred.

Listeners: 70 health; crawlers: 45 health. Successful hit staggers for 0.5 seconds. Contact attack has a cooldown rather than per-frame damage. Health 100. A medical kit restores 45 up to cap; cannot be consumed at full health. Maintenance terminal heals fully and saves but gives no new consumables. Initial pistol ammunition 8 loaded + 12 reserve; supplies contain finite extra ammunition, medicine and shotgun. Bottles and noisemakers are finite in this slice; closed doors, movement, safe-room healing and path choices remain free alternatives.

Three recoverable wedges can hold a door closed against enemies or hold it open as a retreat route. Closed unwedged doors can be opened by an investigating enemy after a telegraphed delay; wedged doors require several seconds of pounding, then lose the wedge. Player can remove an intact wedge. Enemies cannot enter the insulated maintenance room.

## 6. Enemies

Listener states: patrol/idle → investigate → search → return; chase requires sight or renewed audible evidence. On lost sight chase updates stop at last known location. Search lasts about 8 seconds. Stronger recent evidence replaces weaker distant evidence. Two Listeners occupy different parts of the map, one further Listener guards the archive approach. Crawler starts in the eastern service route; pump vibration draws it out. All start physically placed; there is no invisible encounter director in this slice.

Full campaign additions, not implemented: Custodian sabotages active systems after following predictable equipment cues; rare Mimic reproduces recorded voices, not arbitrary omniscient player tracking. Introduce these only after listeners and sound masking are proven.

## 7. Level and objectives

The West Pump is a looped service level with Maintenance (northwest), service spine, Lockers (northeast), West Pump (southwest), pipe gallery (south link), Archive (southeast), and east service route. Concrete walls, metal service floors, heavy acoustic doors and a maintenance shortcut give the routes distinct properties. Physical colored fixtures correspond to labeled map markers. Map reveals architecture and objective fixtures, not enemies.

Objective state machine: find handle → install/start pump → drain → collect schematic → return/use maintenance terminal → completion. Pump can pause/resume at its console. After 35 seconds a warning announces a vibration surge; this is a louder sound event, not a hidden spawn. Drainage reaches 100% after 75 running seconds. Archive bulkhead refuses opening before drain completion. Maintenance shortcut requires releasing its latch from the outer side once, then stays unlocked.

## 8. Narrative and presentation

Visual thesis: deep blue-green concrete, rusted steel, amber maintenance displays and emergency red lights. Retro 2.5D rendering intentionally supports single-file portability. Doors are visibly striped; terminals glow; machinery has a distinct silhouette. Gameplay brightness must allow routes and threats to be read without maximum display brightness. Flashlight increases visibility but is not a limited battery in the slice, avoiding attrition through necessary navigation.

Procedural Web Audio provides machinery hum, gunshot transients, directional footsteps, door impacts and radio tones. Captions carry all plot-relevant announcements. No externally hosted assets, fonts or libraries. No recorded voice acting in v0.1; narrative audio is represented by radio tones and readable subtitles. Accessibility includes independent volume setting, captions, reduced flashes, keyboard-only fallback looking and a pauseable map. Full rebinding, gamepad and touch gameplay deferred.

Three short notes establish workers' adaptations: padding door frames, never answering a personal announcement, and noticing future timestamps. Ending: “The pump was the first mistake.” Full campaign resolves the voice mystery through authored broadcasts; no microphone access or voice cloning.

## 9. Saving and failure

Maintenance interaction records the entire mutable expedition state to localStorage: objective flags, player equipment, doors, remaining pickups, enemies and drainage. Major pump completion also takes a checkpoint. Death offers checkpoint load or restart. Pausing and switching tabs stops simulation and pump audio. Saved data is schema-versioned and validated before adoption. Storage failures do not block play; the UI reports no persistent save. Browser file-origin persistence varies, so checkpoints are a convenience, not a substitute for storing game files.

No diegetic resurrection, randomized weapon jams or invisible emergency-supply spawning in v0.1. Those would complicate fairness and story. In-memory checkpoint works even if persistent storage is unavailable.

## 10. Production architecture

`dist/index.html` is the complete distributable: inline CSS, JavaScript, procedural world and audio. Canvas raycasting renders walls, doors, floor bands and depth-tested billboards. A fixed 1/60-second simulation avoids frame-rate-dependent movement and attacks. Grid pathfinding navigates enemies, weighted sound flood handles acoustics. Rendering does not determine collision or AI.

The source can be opened directly by double-clicking the HTML file. No Node, server, network, installers or build step required to play. Development checks use optional Node script `tests/check.mjs`. Local repository is initialized on `main`; no remote is invented. A Git bundle allows transferring committed history separately from the portable project archive.

## 11. Acceptance and playtest gates

Automated checks: HTML script parses; level rooms connected; closed door attenuates more than open; concrete blocks direct sound and bullets; enemy hears at sufficient strength; mask suppresses footsteps but not nearby shots; objective cannot skip drainage; health/ammunition remain bounded; save restores progress; complete expedition is achievable through interactions.

Human playtest gates before expanding: start without fullscreen; mouse capture failure still playable; directional sound is understandable; player predicts a closed door's effect; can complete without eliminating every enemy; a bad shot is recoverable; at least two useful pump approaches; first-time completion target 10–20 minutes; replay target 5–8. Browser and listening playtests must be recorded separately from simulation tests; no claim of validated feel without them.

## 12. Milestones and exclusions

M1 (this build): complete West Pump loop, sound, combat, checkpoint, map, tutorial, endpoint. M2: human playtest and balance; improve enemy silhouettes, acoustic mix, interaction reach and navigation. M3: authored art/audio, verticality/full-3D decision, recorder and remote switches. M4: ventilation and transmission expeditions; Custodian and Mimic. M5: complete compact campaign, endings, accessibility, optimization and release QA.

Deferred: multiplayer, procedural generation, crafting trees, microphone input, real-world silence detection, open world, RPG stat levels, physical magazine management, destructible concrete and Steam integration. Resolve engine transition after M2; retain the acoustic graph and save model whether moving to Unity or another full 3D engine.
