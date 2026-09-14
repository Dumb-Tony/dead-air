# Validation — Dead Air

## v0.9.2 opening cinematic — September 14, 2026

91 checks pass, including the existing full seven-chapter movement/combat routes. New checks cover five-shot timing, automatic entry into West Pump, no gameplay simulation or ammunition use during the intro, pause/hidden-page behavior, skipping/stepping, replay preservation of gameplay and checkpoints, reduced motion, intact offline artwork, and unchanged later chapter briefings.

Browser review checked the opening layout at 1280×720, the replay menu action, Space pause, Enter next scene, Escape returning from replay, and warning/error logs. The cinematic uses animated illustrations and synthesized cues; no recorded dialogue, streamed video or additional runtime dependencies were added. These are functional and visual checks, not a human audio-mix review.

## v0.9.1 handling, clearance and particles — September 14, 2026

85 checks pass. Added regression coverage for repeated aimed carbine shots, hip-fire/reload transitions, reduced-flash behavior, all seven chapters' decorative footprints versus expanded door approach areas, continuous wall support for room signs, and bounded/expiring/reset cosmetic particles. The existing full seven-chapter routes with active enemies and optional secrets still pass for both aiming contracts. These are automated input replays, not extended human feel testing.

Browser fixtures reviewed aimed firing in WebGL and canvas, a cleared Northline platform doorway, softer impact sparks and flare bursts, and ordinary keyboard firing from the aimed pose. No warning/error logs appeared during the inspected sessions. Carbine fire uses the existing aimed artwork with recoil and an added muzzle-flash effect; it never selects the hip-fire frame while aimed. Decorative placement changes preserve map collision and saved objective coordinates. Cosmetic particle counts are capped at 96 and cleared when loading or changing chapters.

## v0.9 Aftershock validation — September 14, 2026

81 checks pass. Complete automated movement, interaction and combat routes cover all seven chapters and all seven optional cache puzzles with enemies active, in both the original and WebGL aiming contracts. These are automated input replays with route knowledge, not human combat-feel testing. New checks cover v0.8 migration, the Chapter 4→5 transition, timed objectives and pause/resume, final grounding order, single-use cache rewards, carbine handling, projectile cover/dodging/vertical aim, Screamer interruption/alerting, and save round-trips. All seven new PNG sources match their embedded bytes.

Browser review at 1280×720 verified WebGL loading of all five directional enemy atlases, nine animation atlases and six presentation assets; the new infected and settled corpses; carbine hip/aim alignment and magazine reload pose; flare firing and completed reload; freight briefing progression into gameplay; clinic environment and final completion UI with Mara artwork. Canvas fallback review covered the new infected and carbine. No warning/error logs appeared during the inspected sessions. Source and exact generation prompts are retained under art/aftershock. Cinematics are illustrated text cards, and characters use directional sprite animation. Cross-device performance and extended human listening/feel testing remain outside this pass.

## v0.8 animation validation — September 13, 2026

67 checks pass, including full automated four-chapter routes, death sequence progression/settling, saved and legacy corpse timing, both reload sequences without early ammo transfer, and exact embedded animation sources. Browser visual fixtures cover all three death classes, intermediate collapse and settled poses, magazine and shell stages, and canvas fallback. Original artwork is retained; runtime matte extraction and baseline packing prepare the frames. These are sprite animation and automated/fixture checks, not physics ragdolls or an extended human feel test.


## v0.7 unified art validation — September 13, 2026

63 checks pass, including intact embedding of all six new presentation PNGs, the full four-chapter automated movement/combat routes, save compatibility, puzzle progression, and mouse recapture without firing. These are automated input simulations, not human combat-feel testing.

Browser visual fixtures at 1280×720 covered all four floors, title artwork and menu legibility, supplies, hip and aimed weapons, a shotgun shot followed by its reload pose, and the canvas fallback. Weapon scale and individual sight offsets were adjusted after visual inspection. No warning/error logs appeared during the inspected WebGL session. Detailed world props use transparent camera-facing artwork; existing collision geometry is retained. Canvas world props remain simpler. Extended cross-device performance testing is not included.

The standalone HTML embeds all artwork and needs no external assets. Original PNGs and exact generation prompts are committed under art/presentation.

September 11, 2026

## v0.6 zombie art validation — September 13, 2026

62 checks pass: the existing full campaign regressions plus front/profile/rear view selection and exact agreement between all three embedded PNGs and their source assets. All atlases are 1254×1254 RGBA; sampled outside pixels have zero alpha.

Local browser review at 1280×720 checked front, profile and rear lineup views; lighting and transparency; canvas fallback artwork; two pistol hits killing the runner; and the beginning of the death fall. Diagnostics reported all three art sets loaded in WebGL, with no warning/error logs during inspection. These are visual fixture checks, not a full manual combat-feel playtest. Automated complete-route replays remain the campaign regression evidence.

The implementation uses four directional sprites with surface animation rather than fully articulated 3D characters. Direction changes are discrete, and corpse artwork lies flat. The art increases the standalone HTML size but requires no external downloads. Cross-GPU and extended performance testing remain open.

## v0.5 campaign validation — September 12, 2026

60 checks pass. Added coverage includes distinct floor layouts and valid enemy placement, ventilation prerequisites/pause/resume, relay order reset and gates, final erasure/extraction locks, map-aware checkpoint validation and loading, invalid campaign metadata, resource/counter carryover, skippable opening and legacy completed-save continuation.

The navigation driver completed all four chapters continuously with enemies active, using both canvas and 3D aiming contracts. West Pump took 87 simulated seconds; subsequent chapters took 63, 33 and 73 seconds, using 20, 24 and 22 shots and stopping 18, 20 and 24 zombies. The driver knows the route, aims accurately, heals when needed and switches weapons when empty; these are integration results, not human playtime or difficulty claims.

Local browser review checked the opening cards, entry into gameplay, first debrief and Continue transition, WebGL Ventilation startup, Power Exchange map, final chapter startup and ending. No browser errors were returned in those checks. Review fixtures freeze enemies and set state; they are excluded from the shipped HTML. Normal gameplay remains tested separately. Cross-GPU performance, audio listening and extended first-time human playtests remain open.

## v0.4.1 visual validation — September 12, 2026

The existing 49 gameplay regressions pass. Local WebGL review at 1280×720 inspected pistol, shotgun, aimed view, firing/reload controls, the three zombie classes and all four portable supply types. No browser warning/error logs were returned. The aimed shotgun stock initially obstructed the view and was corrected before release. Local equipment and supply fixtures are excluded from the distributable. This is a procedural-art update, not a change to combat balance or level layout; the canvas fallback retains its simpler assets. Cross-GPU and extended human playtesting remain open.

## v0.4 validation — September 11, 2026

49 automated checks pass. New regressions cover the fourteen-zombie roster, three-target shotgun spread using one shell, automatic empty-trigger reload, four-monster checkpoint conversion, and the 50-second pump cycle. Existing mouse capture, journal return, minimap, water, collision, save and objective checks remain.

Both canvas and 3D shooting-contract navigation runs completed the full expedition with enemies active: 87 simulated seconds, 22 shots, 14 kills, 100 health after returning to the healing terminal. The driver knows the route and aims accurately; these results establish integration and navigability, not human difficulty or first-time completion time.

Local WebGL browser review at 1280×720 checked the three zombie classes, curved faces, reaching limbs, quarantine materials/HUD and full/empty archive water. Visual fixtures freeze enemy simulation for inspection; normal startup and combat are checked separately. A browser startup check caught an accidentally renamed event API, corrected before release; test mocks now use the real addEventListener API.

The release retains the capture-only click behavior. Browser pointer-lock success is unavailable in the in-app browser, so the locked firing branch remains covered by the automated contract. Cross-GPU compatibility, audio listening quality and extended human difficulty testing remain open. All art is procedural, with no external runtime assets.

## Historical v0.3 validation — September 11, 2026

`node tests/check.mjs` — **44 checks passed**. New regressions cover capture-only clicks, firing while captured, return from journal, unlocked right clicks, water-level progression/clamping, fallback wall orientation, 3D shot height and full navigation using the 3D shooting contract.

The navigation driver completed the expedition with enemies active under both rendering contracts. The 3D shot contract completed in 131 simulated seconds using 5 shots and stopping 3 threats; the driver chooses headings and accurate aim, so this remains an integration check rather than a human difficulty assessment.

Local in-app browser visual review confirmed WebGL initialization at 1280×720, readable maintenance/archive/pump signage, modeled scenery, flooded and half-drained archive water, the cleared archive floor, full/empty sump states, and the pump's 0%/100% drainage display. The read-only game diagnostics confirmed the WebGL renderer and water levels. No warning or error logs were returned during these checks.

The exact reported input sequence was exercised in the browser: read a maintenance memo, return from the journal, click the game view. Ammunition remained 8/12 and the HUD remained QUIET. Space then reduced ammo to 7/12 and produced GUNSHOT feedback. Successful pointer capture is unavailable in this browser; the already-captured firing branch is covered by the automated regression.

The local visual fixtures in `tests/preview.mjs` deliberately set camera/mission states for inspection. Those fixtures are not included in the playable HTML. Shader rendering, materials and water were visually reviewed; physics, audio listening quality and cross-GPU compatibility were not exhaustively playtested. The fallback has simpler visuals, and the environment remains a prototype rather than production art.

## Historical v0.2 validation — September 11, 2026

`node tests/check.mjs` — **36 checks passed** in Node 24.19.0.

The original 21 checks remain. New checks cover minimap rendering without enemy reveals, journal discovery/persistence, legacy checkpoint loading, malformed save data, solid-wall save rejection, stale masking cleanup, maintenance door acoustic isolation/open transmission, enemy patrol/search expiry, doorway obstruction, focused-aim movement and vertical shot alignment.

`tests/navigation-check.js` drives a complete expedition through ordinary movement, fixture interactions and combat with all enemies active. It does not teleport or disable enemies. The driver chooses headings and perfect aim, uses a medical kit if necessary, and knows the route. Result: completed in 131 simulated seconds, 6 shots, 3 threats stopped, returned to maintenance at 100 health. This establishes navigability and objective integration, **not** realistic first-time-player timing, difficulty or combat feel.

Local browser checks in the Codex in-app browser verified:

- Title screen and game load; existing checkpoint loads.
- Textured room, weapon and persistent unlabeled minimap render correctly.
- Space fires immediately (ammunition visibly decreased from 8 to 7).
- Keyboard movement advances the player; the live read-only game diagnostics confirmed changed coordinates.
- Z changes to focused aim with centered equipment and narrower view.
- J opens the journal and pauses; Escape opens pause/settings.
- Brightness 115 and reduced motion enabled persisted after reload.
- No warning/error entries were returned by the browser log checks.

The in-app browser cannot acquire pointer lock, so real captured-mouse yaw/pitch and right-button aim need normal desktop-browser playtesting. Keyboard fallback starts and runs without capture. Audio synthesis initializes without observed errors, but listening quality was not assessed. No claim of a full browser combat playthrough or cross-browser performance validation is made.


## Historical v0.1 validation

`node tests/check.mjs` — 21 checks passed in Node 24.19.0.

Checks cover embedded JavaScript syntax, absence of external dependencies, movement without pointer lock, diagonal normalization, door collision, acoustic attenuation, concrete obstruction, sound investigation, machinery masking, distinct Crawler hearing, pistol hit/stagger/kill, bullet obstruction, empty weapons, ammunition conservation, wedge recovery, archive gating, complete objective-state integration, checkpoint round-trip, invalid-save rejection, safe-room routing, objective-room connectivity, and renderer/HUD API execution.

The objective integration test operates the real interaction functions and advances simulation through pumping and its pause/resume. It places the player at fixtures and disables enemies to isolate objective correctness. It is **not** a full human or automated navigational combat playthrough.

The simulation checks exercise canvas rendering against a mocked drawing interface. The deployed browser smoke test below additionally verifies visible rendering. Audio quality, successful pointer lock, save compatibility across browsers and subjective difficulty remain unverified. The optional read-only WebMCP integration was advertised by the test browser but was not called.

## Next human checks

1. Open `dist/index.html` locally in current Edge/Chrome/Firefox. Start without fullscreen. Verify mouse look, arrow-key fallback, Space fire and pause/resume.
2. With comfortable headphone volume, compare an open versus closed fire door. Confirm footsteps become harder to locate around the pump.
3. Finish the expedition through each approach, with enemies enabled. Confirm a bad shot can be recovered from by retreating.
4. Save in maintenance, close/reopen the file, and load. Local file storage support depends on browser settings.
5. Tune difficulty, readability, sound balance and playtime from observations before adding further campaign content.

## Scope caveats

Retro 2.5D renderer, procedural materials/enemy billboards and synthesized sound. No full vertical geometry, voice acting, Mimic, Custodian, flashlight batteries, recorder, multiplayer or full campaign yet. Map pauses play. Desktop keyboard required.

## GitHub Pages deployment smoke test

September 11, 2026: https://dumb-tony.github.io/dead-air/ loaded in the Codex in-app desktop browser. Clicking **Begin expedition** dismissed the menu and rendered the maintenance room, weapon, objective, health and supplies. The **M** keyboard input opened the maintenance map. No warning or error entries were returned by the browser console log check. Mouse capture was unavailable in this browser; the game displayed its arrow-key fallback message and still started. Successful mouse capture and audible output were not verified.

All 21 simulation checks also passed locally. GitHub Actions deployment run https://github.com/Dumb-Tony/dead-air/actions/runs/34564874252 completed successfully, including its game checks. The original prototype commit remains in the published Git history, and `dist/index.html` is unchanged from that commit. This was a load/start/map smoke test, not a full combat playthrough.
