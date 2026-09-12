# DEAD AIR — Game Design Document

Version 0.4 · September 11, 2026 · Single-player zombie action FPS

## 1. Product and creative pillars

You are trapped beneath Relay Station 6 after an emergency transmission arrives in your own voice: “Do not let me reach the transmitter.” Restore the facility and find the surface, while deciding whether restoring its voice is a mistake.

**Core promise:** move fast, clear the undead, and solve the station’s machinery to open the route forward. Three pillars: responsive retro shooting; authored environmental puzzles; a breached industrial quarantine atmosphere. Acoustics and resource choices remain tactical tools, with combat now the primary rhythm.

Full-campaign target: 4–6 hours, one authored interconnected station, no procedural map generation or compulsory grinding. This first delivery is a desktop, standalone, offline HTML first-person prototype with 3D rendering and grid-based simulation of one expedition, not the finished campaign or full 3D production art.

## 2. Player loop

At maintenance: heal, save, inspect map and choose next objective. Depart through an acoustically insulated door. Search lockers for breaker handle, supplies and maintenance notes. Open alternate paths and place a delayed noisemaker. Install handle at west pump; start its 50-second cycle. Use continuous machinery as footstep cover while managing approaching threats. Drained archive unlocks. Recover lift schematic, return to maintenance, and use its terminal to complete the slice.

Retreat is allowed at any point. Stopping the pump retains drainage progress. Reaching maintenance does not replenish ammunition or resurrect enemies. Defeated enemies remain defeated. New game resets the expedition only after confirmation.

## 3. Controls and handling

WASD movement; mouse horizontal and bounded vertical look using optional pointer lock; all four arrow keys provide fallback looking; Shift sprint; C toggle crouch; left click/Space fire (immediate press and held repeat); right-click held or Z toggled focused aim; E interact; R reload; Q throw bottle; G place delayed noisemaker; V wedge/unwedge targeted door; H medical kit; F flashlight; M map; J field journal; Esc pause/resume. Mouse sensitivity, volume, brightness, captions, reduced flashes and reduced motion are adjustable from the menu and persist in browser storage. Focused aim narrows the view and slows movement; vertical aim must intersect the target. Crouch and aim transitions are smoothed.

No mouse lock or fullscreen dependency for starting. Movement is collision-resolved on both axes with a player radius. Diagonal velocity normalized. Crouch is slower and quieter, sprint faster and louder. No stamina bar in the slice. Weapon fire has short cooldown, visible recoil, hit confirmation and enemy stagger. Controls clear on focus loss; simulation pauses when window loses focus.

## 4. Acoustic contract

The prototype uses a connected grid as an acoustic graph. Sound spends strength crossing floor cells; heavy closed doors add substantial attenuation (10 units; 40 for closed maintenance seals); concrete blocks transmission. It can travel around a wall through a connected corridor but cannot pass directly through concrete. Open doors carry sound without the closed-door penalty. The player hears filtered directional cues under the same path attenuation. Acoustic captions optionally indicate bearing and relative strength, not exact enemy coordinates.

Sound events carry location, strength and category. Zombies compare received strength against a threshold and investigate the event location, not the player's live coordinates. Their memory expires; new evidence is required for continued pursuit. Visual detection at short range remains possible. Machinery produces a persistent masking field: a weaker footstep or bottle sound at a zombie is masked by the pump. Gunshots exceed the mask locally. All zombie classes investigate footsteps and machinery.

Prototype event strengths (game units, not real decibels): crouch 1.6; walk 5; sprint 10; metal floor multiplier 1.45; door 7; bottle 16; pistol 27; shotgun 35; pump 20; noisemaker 22. Ordinary closed-door attenuation 10, closed maintenance seal attenuation 40, floor-cell transmission cost 1. Open seals transmit sound normally. Field strengths and timers are tuning values, not promises of physical realism.

Essential fairness rules: no detection through concrete; no global alert spawned by one gunshot; searches expire; no silent teleporting spawns; machinery complications telegraphed. UI says MASKED only when nearby pump cover is strong enough to plausibly cover ordinary footsteps; it is not an invisibility state.

## 5. Combat and resource economy

Pistol: 8 rounds, 35 damage, 0.16-second fire interval, 0.65-second reload. Shotgun: 4 shells, damage max(38, 105 − distance × 5), 0.55-second interval, 1-second reload, up to three visible targets inside its spread. Switch with 1/2. Reload conserves ammunition; an empty trigger starts reload when reserve is available without a gunshot. Hits respect horizontal and vertical aim and line of sight.

Shamblers: 70 health; runners: 45; brutes: 140. Hit stagger is 0.35 seconds, or 0.18 for brutes. Melee hits deal 12, 8 and 22 respectively with a 0.9-second cooldown. Player health is 100; medkits restore 45 up to cap. Maintenance heals and saves without restocking. Start with 8+48 pistol rounds and 12 reserve shells; acquire the shotgun in West Pump. Ammo pickups grant 16 pistol rounds and 6 shells. Nearby ammunition and medical pickups collect automatically; quest objects still require interaction.

Three recoverable wedges can hold a door closed against enemies or hold it open as a retreat route. Closed unwedged doors can be opened by an investigating enemy after a telegraphed delay; wedged doors require several seconds of pounding, then lose the wedge. Player can remove an intact wedge. Enemies cannot enter the insulated maintenance room.

## 6. Enemies

Zombie states: patrol/idle → investigate → search → return; chase follows sight or renewed audible evidence. Searches expire after about 8 seconds. Fourteen authored starting positions contain shamblers, runners and brutes, with no invisible spawn director. Chase speeds are 2.05, 3.05 and 1.65 units/second respectively. Player movement is 3.8, sprint 5.6 and crouch 1.6, with aiming at 80% movement speed.

Future encounter work: more authored zombie ambushes, weapon variety, and additional machinery puzzles. Prior speculative monster classes are superseded by the zombie direction.

## 7. Level and objectives

The West Pump is a looped service level with Maintenance (northwest), service spine, Lockers (northeast), West Pump (southwest), pipe gallery (south link), Archive (southeast), and east service route. Concrete walls, metal service floors, heavy acoustic doors and a maintenance shortcut give the routes distinct properties. Physical colored fixtures correspond to labeled map markers. A persistent top-right minimap reveals the overall architecture, player heading, door states and fixtures using icons without words. The larger labeled map remains available on M. Neither map reveals enemies.

Objective state machine: find handle → install/start pump → drain → collect schematic → return/use maintenance terminal → completion. Pump can pause/resume at its console. After about 23.3 running seconds a warning announces a vibration surge; this is a louder sound event, not a hidden spawn. Drainage reaches 100% after 50 running seconds. Archive bulkhead refuses opening before drain completion. Maintenance shortcut requires releasing its latch from the outer side once, then stays unlocked.

## 8. Narrative and presentation

Visual thesis: deep blue-green concrete, rusted steel, amber maintenance displays and emergency red lights. The native WebGL renderer and all generated geometry/materials remain embedded in the single HTML file. Doors are visibly striped; terminals glow; machinery has a distinct silhouette. Gameplay brightness must allow routes and threats to be read without maximum display brightness. Flashlight increases visibility but is not a limited battery in the slice, avoiding attrition through necessary navigation.

Procedural Web Audio provides machinery hum, gunshot transients, directional footsteps, door impacts and radio tones. Captions carry all plot-relevant announcements. No externally hosted assets, fonts or libraries. No recorded voice acting in v0.1; narrative audio is represented by radio tones and readable subtitles. Accessibility includes independent volume setting, captions, reduced flashes, keyboard-only fallback looking and a pauseable map. Full rebinding, gamepad and touch gameplay deferred.

The J field journal pauses play, retains read notes in checkpoints, and lists room hints for missing records. Three short notes establish workers' adaptations: padding door frames, never answering a personal announcement, and noticing future timestamps. Ending: “The pump was the first mistake.” Full campaign resolves the voice mystery through authored broadcasts; no microphone access or voice cloning.

## 9. Saving and failure

Maintenance interaction records the entire mutable expedition state to localStorage: objective flags, player equipment, doors, remaining pickups, enemies and drainage. Major pump completion also takes a checkpoint. Death offers checkpoint load or restart. Pausing and switching tabs stops simulation and pump audio. Saved data is schema-versioned and validated before adoption. Storage failures do not block play; the UI reports no persistent save. Browser file-origin persistence varies, so checkpoints are a convenience, not a substitute for storing game files.

No diegetic resurrection, randomized weapon jams or invisible emergency-supply spawning in v0.1. Those would complicate fairness and story. In-memory checkpoint works even if persistent storage is unavailable.

## 10. Production architecture

`dist/index.html` is the complete distributable: inline CSS, JavaScript, procedural world and audio. Native WebGL renders modeled environments, fixtures and enemies with procedural materials, room lighting, flashlight illumination, fog and animated water. Canvas raycasting remains a compatibility fallback. A fixed 1/60-second simulation avoids frame-rate-dependent movement and attacks. Grid pathfinding navigates enemies, weighted sound flood handles acoustics. Rendering does not determine collision or AI.

The source can be opened directly by double-clicking the HTML file. No Node, server, network, installers or build step required to play. Development checks use optional Node script `tests/check.mjs`. The public repository is https://github.com/Dumb-Tony/dead-air and the playable deployment is https://dumb-tony.github.io/dead-air/. Pushes to main run the checks and deploy dist through GitHub Actions. The original prototype history remains intact.

## 11. Acceptance and playtest gates

Automated checks: HTML script parses; level rooms connected; closed door attenuates more than open; concrete blocks direct sound and bullets; enemy hears at sufficient strength; mask suppresses footsteps but not nearby shots; objective cannot skip drainage; health/ammunition remain bounded; save restores progress; complete expedition is achievable through interactions.

Human playtest gates before expanding: start without fullscreen; mouse capture failure still playable; directional sound is understandable; player predicts a closed door's effect; can complete without eliminating every enemy; a bad shot is recoverable; at least two useful pump approaches; first-time completion target 10–20 minutes; replay target 5–8. Browser and listening playtests must be recorded separately from simulation tests; no claim of validated feel without them.

## 12. Milestones and exclusions

M1 (this build): complete West Pump loop, sound, combat, checkpoint, map, tutorial, endpoint. M2: human playtest and balance; improve enemy silhouettes, acoustic mix, interaction reach and navigation. M3: authored art/audio, verticality/full-3D decision, recorder and remote switches. M4: ventilation and transmission expeditions; Custodian and Mimic. M5: complete compact campaign, endings, accessibility, optimization and release QA.

Deferred: multiplayer, procedural generation, crafting trees, microphone input, real-world silence detection, open world, RPG stat levels, physical magazine management, destructible concrete and Steam integration. Resolve engine transition after M2; retain the acoustic graph and save model whether moving to Unity or another full 3D engine.


## 13. v0.2 implementation and validation

The presentation pass adds room-specific procedural concrete/metal textures, floor and ceiling projection, signage and decorative props, redesigned enemy and equipment silhouettes, low ventilation ambience, and a compact instrumentation HUD. Decorative props are visual dressing; architecture and doors define collision. The game still uses a 2.5D renderer and synthesized audio.

The save schema remains version 1 for compatibility; journal discoveries are an optional extension migrated on load. Invalid coordinates, timers, enemy targets, emitter data and journal IDs are rejected. Loading clears stale pump masking and camera/input transients. Doors refuse to close around the player or a living enemy.

36 automated checks pass, including a complete expedition through normal movement and interactions with enemies active. Browser checks cover rendering, start/load, firing, movement, focused aim, minimap, journal, pause and setting persistence. See TEST-REPORT.md for limits. Human listening, multi-browser testing and first-time-player difficulty/playtime tuning remain M2 work; this release does not claim the full campaign is complete.


## 14. v0.3 visual and input revision

The main renderer uses true 3D geometry while preserving the original 2D collision, acoustic and navigation graph. Walls and ceilings are 2.8 world units high; the camera eye is 1.35 units above the floor, lowered for crouching. A wider default view, mipmapped materials, beveled equipment geometry, lighting and fog replace the flat billboard presentation. Three-dimensional shot-height checks match the camera; existing saves remain version 1.

The flooded archive water level is 0.675 world units initially and falls with the actual drainage fraction. At completion the water surface is removed, exposing the floor. Observation windows between East Service and the archive show the change before entry is available. Windows remain solid acoustic/interaction boundaries. A recessed sump covered by walkable grating falls from -0.05 to -0.62 units; residual water remains at its bottom. The pump console reports drainage and water percentage. Water is a rendering of objective state, not a separate fluid simulation.

Wall signage is modeled with consistent front-face texture coordinates. The raycast fallback also corrects side-dependent wall texture handedness and displays animated wet areas. If WebGL cannot initialize, the fallback remains playable with simpler graphics.

An unlocked left click only attempts pointer capture and clears held fire. No shot, ammunition cost or acoustic event is generated. Once the pointer is already captured, left click fires and supports held fire; right click aims. Space fires without pointer capture and Z toggles aim. Returning from a journal/menu therefore cannot accidentally discharge the weapon.


## v0.4 presentation and compatibility

Quarantine Breach shifts the slice toward Doom/Wolfenstein-style pace while retaining the industrial story and puzzle route. WebGL zombies have articulated limbs, rounded heads, curved facial textures, wounds, differing uniforms, and distinct heavy silhouettes. Warmer lamps, quarantine signage, hazard thresholds, blood decals and electrical panels reinforce the setting. The HUD adds a kill count. Water, readable signs and the unlabeled minimap remain.

Save version 1 remains readable: four-enemy legacy saves migrate listener to shambler and crawler to runner without resetting mission state or reviving kills. New expeditions use fourteen enemies. The game remains one offline HTML file with synthesized audio and procedural assets.
