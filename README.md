# Dead Air — The Relay Campaign v0.9

A standalone seven-chapter retro zombie FPS with environmental puzzles and a connected story. **[Play Dead Air](https://dumb-tony.github.io/dead-air/)** · [Source repository](https://github.com/Dumb-Tony/dead-air) · [Offline HTML](dist/index.html).

## Aftershock expansion — v0.9

- Three new chapters continue after Transmission Chamber: **Northline Freight**, **Salt Ward**, and **Breakwater Station**. Restore rail routes, rescue the clinic's patients, then sever the coastal uplink.
- Optional service-cache puzzles and extra story clues on **all seven floors**, including the original four. Read each cipher, activate three latches in the correct order, and find the supply cache. Power Exchange's cache offers an early carbine.
- **Security carbine** in Northline Cargo Arrivals (24-round magazine, rapid fire) and **flare launcher** in Salt Ward Oxygen Plant (single-shot impact blast). Both have new art and animated reloads. Select acquired weapons with **1–4**.
- **Spitters** launch visible acid you can dodge sideways. **Screamers** call nearby infected. Their warning lights/captions give you time to interrupt either attack with a shot. Both have directional artwork and collapse animations.
- Six illustrated arrival cards and a new final extraction image carry the story beyond Relay 6. Briefings are skippable. The original local erasure remains successful; the continuation concerns a separate relay shipped before quarantine.

Load an existing checkpoint to continue. Completed Chapter 4 saves now lead to Chapter 5; earlier saves gain the optional secret fixtures without resetting progress. The full game and its artwork remain embedded in one offline HTML file. Source images and prompts: [art/aftershock](art/aftershock/README.md). Design and spoilers: [GDD.md](GDD.md), [STORY.md](STORY.md).

## Play

Open `dist/index.html` in Chrome, Edge or Firefox on a desktop. Nothing to install and no internet needed. Click **Begin expedition**. An unlocked click only captures the mouse; it never fires. Once captured, left-click fires normally. Mouse capture is optional: arrow keys also look, and Space fires. Hold right-click or toggle Z for focused aim. Headphones recommended at comfortable volume. This build uses synthesized audio, not voice acting.

WASD move · mouse/arrow keys look · Shift sprint · C crouch · E interact · click/Space fire (hold for repeated fire) · right-click/Z aim · R reload · 1–4 weapons · Q bottle · G delayed noisemaker · V door wedge · H heal · F light · M full map · J journal · Esc pause/resume.

Find the handle in Lockers, start the West Pump, survive 50 seconds of running machinery, retrieve the archive schematic and return to the maintenance terminal. You may stop/resume the pump. Maintenance heals and saves but does not refill ammunition.

## Animation update — v0.8

All three zombie classes now have eight-frame collapse sequences: hit recoil, buckling knees, shoulder impact and a persistent crumpled corpse. Bodies no longer use the standing artwork rotated flat onto the floor. Pistol and shotgun reloads have eight distinct poses with moving hands, magazine/shell handling and a return to the ready grip. Both renderers use the animation artwork.

Animations follow simulation time and pause with gameplay. Reload duration and ammo rules are unchanged; saves remain compatible. This is authored sprite animation rather than physics ragdolls or skeletal weapon animation. Source art and prompts: [art/animation](art/animation/README.md). The single offline HTML includes all assets. Live build: **https://dumb-tony.github.io/dead-air/**.

## Whole-game art update — v0.7

Alex now has cinematic title artwork and detailed gloved first-person hands. Both guns use matching idle, aimed, reload and firing artwork. Worn concrete, steel and canvas materials carry the realistic zombie aesthetic through all four floors. Medical bags, ammunition, puzzle hardware, the shotgun pickup, distraction devices and door wedges use detailed transparent artwork integrated with world lighting.

The existing layouts, puzzles, story, combat rules and saves remain compatible. Weapons and zombies retain a retro sprite presentation. All artwork is embedded in the standalone HTML; the source PNGs and exact prompts are in [art/presentation](art/presentation/README.md). The canvas fallback shares the weapon artwork and plain wall material, with simpler world props.

Published on GitHub Pages at **https://dumb-tony.github.io/dead-air/** from this repository’s dist folder using the existing deployment workflow. Source: **https://github.com/Dumb-Tony/dead-air**.

## Zombie art update — v0.6

Three detailed character atlases replace the simple primary zombie models: a decayed maintenance worker, an infected rescue worker, and armored security. Four directional views, animated surface deformation, lighting, contact shadows, hit recoil and falling death poses integrate them into the world. The canvas fallback uses the same artwork.

This is deliberately a directional-sprite presentation suited to the retro FPS, rather than a fully sculpted 3D character system. Damage, hit bounds, movement, campaign progression and saves are unchanged. Art remains embedded in the offline HTML. Source images and exact generation prompts are in [art/zombies](art/zombies/README.md); generated with the built-in image tool, not Higgsfield.

## Seven-chapter campaign

You play Alex Vale, an emergency technician returning to Relay Station 6 after a distress call from your sister Mara. The quarantine has failed, the staff are dead, and the PA is speaking in your voice. A skippable opening briefing explains your arrival; 28 discoverable records and chapter-ending scenes reveal what happened. [STORY.md](STORY.md) contains the complete narrative and spoilers.

| Chapter | Goal | Starting zombies |
| --- | --- | ---: |
| West Pump | Recover the breaker, drain the archive, find the route | 14 |
| Ventilation Works | Recover a filter, set intake/exhaust, purge the shaft | 18 |
| Power Exchange | Synchronize relays TWO → ONE → THREE, retrieve a power core | 20 |
| Transmission Chamber | Isolate three feeds, erase the carrier, reach extraction | 24 |
| Northline Freight | Find dispatch key, align rail points, open clinic route | 26 |
| Salt Ward | Recover battery, restore oxygen, release quarantine shutters | 28 |
| Breakwater Station | Find severance key, ground feeds in order, cut uplink | 32 |

Floors have distinct authored layouts, room signs, map labels and lighting. Timed cycles can pause and resume: Ventilation 30 seconds, Transmission 40, Northline 25, Salt Ward 30, Breakwater 35. Ordered relay, grounding and secret puzzles reset after a wrong input without consuming resources.

At chapter completion choose **Continue**. Weapons, remaining ammunition and campaign counters carry forward. Each new chapter heals you and provides a minimum reserve of 48 pistol rounds, 12 shells, one medkit, three bottles, two noisemakers and two wedges. Supplies are finite within each floor. Arrival checkpoints and completed-chapter checkpoints preserve progress; medical terminals heal and save. Death restores the last checkpoint, not every recent action.

Old West Pump checkpoints remain compatible, including completed ones: load the save and continue to Ventilation Works. Start a new campaign to see the opening and use the fourteen-zombie first-floor layout. New saves remember their chapter, puzzle progress, equipment and completed-chapter statistics. The game remains a single offline HTML file; the canvas fallback is supported with simpler artwork.

## Visual update v0.4.1

Detailed, distinct pistol and shotgun models now include sights, barrels, grip textures, gloved hands, a moving pistol slide and shotgun fore-end. The world shotgun uses the same geometry. Ammo cartridges, shells, a strapped medical bag and a shaped breaker handle replace the generic pickup silhouettes.

Zombies have tapered uniform torsos, pockets, belts, heavy armor, reflective runner strips, facial geometry, hair/helmet variants and corrected horizontal corpse poses. This pass changes WebGL presentation; the environment, combat tuning, puzzles and save format remain the same. The simpler canvas fallback remains available.

## What changed in v0.4

- Faster movement and strafing, wider field of view, snappier pistol/shotgun handling, automatic reload on an empty trigger, and nearby supply collection.
- Fourteen zombies across the station: shamblers, quick runners, and tougher armored brutes. The shotgun can damage up to three zombies in its spread. More ammunition supports fighting through the level.
- New modeled undead with reaching arms, animated strides, curved facial geometry, wounds and torn uniforms; quarantine signs, blood trails, electrical cabinets, warmer emergency lighting and a redesigned combat HUD.
- The breaker → pump → archive → return puzzle stays intact; the pump now completes in 50 running seconds. The unlabeled minimap, visible drainage water and capture-only mouse clicks remain.

**Start a new expedition for the full 14-zombie encounter layout.** Existing checkpoints remain compatible and convert their old monsters into zombies while preserving the saved four-enemy roster and progress.

## Earlier v0.3 improvements

- A native WebGL 3D renderer replaces the primary raycast presentation: modeled doors, fixtures, machinery, shelving, pipework, creatures and first-person equipment; higher-resolution procedural materials; room lighting, flashlight falloff and distance fog. No library or asset downloads are required.
- The archive is visibly flooded. Reinforced observation windows in East Service let you inspect it before the bulkheads unlock. Animated water lowers with pump progress and disappears when the archive is drained.
- A grated sump beside the pump also lowers visibly. The machinery has a live display showing drainage percentage, water level and running/stopped state.
- Physical sign faces use consistent texture orientation. The raycast fallback's mirrored wall textures are corrected too.
- **Click-to-capture never shoots.** Returning from the journal or a menu and clicking to lock the mouse cannot spend ammo or make gunfire. Left-click and right-click aiming require an already-captured mouse; Space and Z remain keyboard alternatives.

The simulation, original map, saves and minimap remain intact. Collision and navigation still use the authored grid; the 3D rendering does not add jumping or vertical level traversal. A canvas renderer remains available when WebGL cannot initialize. Its water treatment is simpler than the primary renderer.

## Earlier v0.2 improvements

- Persistent top-right minimap: unlabeled layout, player heading, door states, objective diamonds, terminal and supply markers. Enemies are not revealed. Red doors are locked; amber doors are wedged. The larger labeled map remains on M.
- Room-specific industrial surfaces, projected floor/ceiling materials, signs, pipes, shelving, redesigned creature silhouettes and weapon models, and a quieter HUD.
- Focused aim, vertical look, immediate and held firing, smoother crouch and weapon transitions, and sprint/aim camera adjustments. Aiming slows movement. Shots respect vertical aim.
- J opens a pauseable field journal. Read notes persist in checkpoints; unrecovered notes indicate which room to search.
- Enemies make local patrols and search around their last evidence. Searches expire. Closed maintenance doors strongly insulate sound; open doors transmit it.
- Acoustic signature meter, low ventilation ambience, brightness and reduced-motion controls, persistent settings, and expedition completion statistics.
- Stronger save validation, compatibility with valid v0.1 checkpoints, stale sound-field cleanup on load, and protection against closing doors around actors.

The complete game is still one offline HTML file, with no external assets, libraries or build step. Mouse capture depends on browser support; all four arrow keys provide fallback looking. The primary renderer now uses 3D geometry, while movement and navigation retain the existing grid.

## Published game and source

- Play online: https://dumb-tony.github.io/dead-air/
- Public source repository: https://github.com/Dumb-Tony/dead-air
- Standalone HTML: [dist/index.html](dist/index.html). Download it and open it locally to play offline.

The project is extracted at `C:\GPT\_DEV\Dead-Air`, including the original Git history from `Dead-Air-Project.zip`. The original prototype commit is `85ac706da0f39363590b9137b9847b9f99ae0ccc`.

GitHub Pages is deployed by `.github/workflows/pages.yml` on pushes to `main`, or manually through GitHub Actions. The workflow runs `node tests/check.mjs` and uploads `dist` as the Pages site; there is no build step. `dist/index.html` remains the single source and portable game file.

To publish changes from PowerShell:

```powershell
Set-Location 'C:\GPT\_DEV\Dead-Air'
node tests/check.mjs
git add dist/index.html README.md
git commit -m "Update Dead Air"
git push origin main
```

Wait for the **Deploy GitHub Pages** workflow to finish before checking the live game. Browser saves belong to the browser and origin; saves from a local HTML file do not automatically transfer to GitHub Pages. No license has been assigned to this project.

## Development

Edit `dist/index.html`; no build step. Optional checks: `node tests/check.mjs` (62 checks, including an expedition navigated with enemies active). See `TEST-REPORT.md` for actual validation and limitations. This is a four-chapter playable campaign slice; a four-to-six-hour playtime has not been established.


For local visual review, run `node tests/preview.mjs` and open http://127.0.0.1:4174/. Named local-only fixtures include `?review=archive-full`, `archive-half`, `archive-empty`, `pump-full`, `pump-empty`, `maintenance-sign` and `lockers`. These review states are injected by the local server and are not present in the standalone game or Pages deployment.

New local visual fixtures: `?review=chapter1` through `chapter4`, with `-complete` for each debrief. These inject review states only in the local preview server.
