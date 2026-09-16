# Dead Air — The Relay Campaign v0.12.0

A standalone fourteen-chapter retro zombie FPS with environmental puzzles and a connected story. **[Play Dead Air](https://dumb-tony.github.io/dead-air/)** · [Source repository](https://github.com/Dumb-Tony/dead-air) · [Offline HTML](dist/index.html).

## Recognizable objects and field journal — v0.12.0

**[Play Dead Air](https://dumb-tony.github.io/dead-air/)**. Interactive objects now use their physical purpose across all fourteen chapters, including existing checkpoints:

- Personal lore uses open bound notebooks; notices and evidence use paper records; maps and plans use blueprints. The journal is a warm paper notebook with clipped records, ruled pages, readable text and a highlighted entry when you collect a note.
- Computer terminals have a monitor, readable screen, keyboard, stand and cables. Service latches have mechanical handles and lamps; valves have handwheels; electrical controls have breaker switches. Latches and controls reflect completed puzzle state.
- Lost property uses a drawer cabinet, and service caches use supply chests. Filters, batteries, keys, cranks, tools, demolition charges, microfilm readers, duplication presses, counterweight machinery and signal lamps have distinct models.
- Presentation is derived from each object's role without changing saved item types, locations or puzzle requirements. The lightweight fallback renderer also distinguishes object categories. New models, textures and journal styling are embedded in the standalone HTML.

128 automated checks pass, including full campaign routes, save compatibility, object classification, latch feedback and note-reading interactions. Source files: `fixture-design.js`, `fixture-models.js`, `journal.css`; built by `tests/build-long-night.mjs`. GitHub Pages still publishes `dist/` from `main`; [offline HTML](dist/index.html) and [source](https://github.com/Dumb-Tony/dead-air) remain available.

## Recorded sound pass — v0.11.0

**[Play Dead Air](https://dumb-tony.github.io/dead-air/)** — published from this repository's `main` branch and `dist/` folder through the existing GitHub Pages workflow. The [standalone HTML](dist/index.html) contains the identical audio bank and works offline; existing checkpoints remain compatible.

- 32 embedded recordings: distinct pistol, shotgun and carbine reports; a layered flare launch; magazine mechanics and a separate sound for every completed shotgun shell insertion.
- Iron doors opening, metal door slams and zombie pounding; concrete, metal and water footsteps; glass bottles, impacts, zombie deaths, pickups, equipment switches, healing and object interactions.
- Six zombie vocal takes with type-dependent pitch and small variations. Nearby damage reactions, ambient groans, and screamer warnings use the same spatial mix. Distance and obstructing walls/doors reduce world sounds without changing enemy hearing rules.
- Machinery, water and restrained metal ambience, with a short room echo and a compressor to control overlapping effects. Playback voices are capped and cleared on pauses/checkpoint changes; interrupted reloads cannot leave future insertion sounds playing.
- Master volume and directional captions remain available. **Audio, comfort & mouse settings → Sound check** cycles through six examples. Audio unlocks on a click or keyboard gesture, including the first action after loading.

123 automated checks cover the full campaign and the sound bank/event hooks, including shell timing, muting, voice cleanup and first-action playback. Browser checks confirmed real output, weapon reports, zombie impacts, four separate shell sounds, and pause cleanup. These are functional playback checks, not a human listening/mix review. See [validation](TEST-REPORT.md) and [recording licenses and credits](audio/CREDITS.md).

## Shotgun and zombie balance — v0.10.1

**[Play the updated game](https://dumb-tony.github.io/dead-air/)**. The shotgun now inserts **one shell every 0.8 seconds**, repeating its reload animation until full or out of reserve shells. Its ammo counter stays visible during reload. Fire to interrupt once a shell is available; already inserted shells remain loaded. An unfinished insertion neither grants nor consumes a shell. Loading a checkpoint cancels only the unfinished insertion. Other weapons retain their magazine reloads.

Zombie health now varies deterministically between individuals: runners **45–55**, shamblers **70–90**, spitters **100–120**, screamers **115–135**, and brutes **170–190**. A full-health brute survives any single shotgun blast and takes two solid close-range hits; distance or previous damage can change the number needed. Old checkpoints scale living enemies' remaining health proportionally, once, without resurrecting corpses. No new expedition is required.

112 checks pass, including complete fourteen-chapter combat routes, per-shell timing and conservation, interrupted/empty reload behavior, partial-save restoration, brute hit counts and health migration. The public game and standalone HTML contain the same update.

## The Long Night — v0.10.0

**[Play the published campaign](https://dumb-tony.github.io/dead-air/)**. Load an existing checkpoint to continue; a completed Breakwater save now offers Civic Underpass. The standalone [offline HTML](dist/index.html) includes every chapter and all artwork. GitHub Pages continues to deploy the dist folder from main through the repository's existing workflow.

- **Seven new chapters**, bringing the campaign to fourteen: Civic Underpass, Municipal Records, Meridian Observatory, Hollow Reservoir, Alder House, Witness Vault, and The Quiet Line.
- Each new map has nine rooms across a 50 × 43 grid, looping passages, cover partitions, staged lower-wing locks, twelve objective fixtures, finite combat encounters, and frequent objective checkpoints. The first seven maps keep their geometry and progression.
- A deeper final act follows the signed warnings, suppressed hearing, original carrier trial, a surviving researcher, and the identities of the victims. Relay 6 and the coast remain saved. A three-page illustrated epilogue gives the story a definitive ending.
- **35 additional optional personal records** across all fourteen chapters, **seven new supply-cache puzzles**, and **seven personal keepsakes**. Keepsakes require identifying their owners from two local records; they are optional and never block the main ending. Their stories include workplace jokes, amateur astronomy, care-home chess, and lives outside the disaster.
- Ordered machinery procedures and two coupled-circuit puzzles. Circuit controls change multiple lamps; use the recorded procedure and the HUD lamp state to align them. Incorrect inputs can be reversed, with no consumed quest resource.
- A **campaign-wide journal** preserves recovered records and evidence across chapter transitions. Use J or Campaign journal in the menu, including after finishing. Existing pre-expansion saves retain their current-floor records; records discarded by earlier versions cannot be reconstructed retroactively.
- New chapter and ending artwork, embedded offline. Source atlas and exact prompt: [art/long-night](art/long-night/README.md).

### Campaign length

**2–3 hours is the design target, not a verified playtime claim for this build.** The complete automated route takes about 35 simulated minutes with perfect route/solution knowledge, quick aiming, all caches and new keepsakes, and no time spent reading. That is a regression measurement, not a first-time player estimate. First-time exploration, puzzle-solving, reading, retries and pacing still need human measurement before the target can be advertised as achieved. See [CAMPAIGN-PACING.md](CAMPAIGN-PACING.md).

### Authoring and verification

104 checks cover all fourteen chapters, live-enemy movement replays under both aiming contracts, save migration, secrets, circuit reversibility, gate dependencies, ending/journal behavior and offline assets. Run node tests/check.mjs from the repository. Browser fixtures use node tests/preview.mjs and ?review=chapter10, ?scene=10, or ?review=chapter14-complete.

The new act is authored in campaign-content.js and campaign-engine.js. node tests/build-long-night.mjs embeds them and the artwork into the standalone HTML using the preserved v0.9.2 commit as its baseline. Rebuilding requires a full Git clone containing commit 5a608d0; playing and checking the distributed HTML do not.

## Aftershock expansion — v0.9

### v0.9.2 opening cinematic

New expeditions begin with a **32-second illustrated cinematic**: Mara's distress call, Alex's return to Relay Station 6, the abandoned maintenance checkpoint, the impossible PA warning, and a DEAD AIR title reveal. Camera movement, fades, letterboxing, captions and synthesized sound carry the backstory. It plays directly inside the offline HTML, without streaming a video or downloading assets.

Use **Pause/Space**, **Next scene/Enter**, or **Skip intro/Escape**. The opening automatically enters West Pump when finished. **Watch opening** in the menu replays it without resetting gameplay or checkpoints. Reduced motion keeps its camera still; changing tabs pauses playback. Later chapter briefings remain manually advanced. Source art and prompt: [art/intro](art/intro/README.md).

### v0.9.1 handling and clearance fixes

Carbine fire while aiming down sights now retains its centered sight pose, with recoil and a muzzle flash instead of switching to hip-fire art. Decorative cabinets, shelves, pipes, clinic beds and coastal panels keep clear of door approaches; signs relocate to continuous walls instead of spanning corridor openings. Bullet impacts produce short-lived sparks/debris, projectile trails are fuller, and flare bursts scatter fading sparks. Reduced-flash and reduced-motion settings remain supported. The patch passes 85 checks, including complete seven-chapter routes and new rendering/placement regressions.

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
