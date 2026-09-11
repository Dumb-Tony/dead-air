# Validation — Dead Air

September 11, 2026

## v0.2 validation — September 11, 2026

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
