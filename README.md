# Dead Air — West Pump v0.2

A standalone retro first-person survival-horror prototype. Read `GDD.md` for design, scope and deferred features.

## Play

Open `dist/index.html` in Chrome, Edge or Firefox on a desktop. Nothing to install and no internet needed. Click **Begin expedition**. Mouse capture is optional: arrow keys also look, and Space fires. Hold right-click or toggle Z for focused aim. Headphones recommended at comfortable volume. This build uses synthesized audio, not voice acting.

WASD move · mouse/arrow keys look · Shift sprint · C crouch · E interact · click/Space fire (hold for repeated fire) · right-click/Z aim · R reload · 1/2 weapons · Q bottle · G delayed noisemaker · V door wedge · H heal · F light · M full map · J journal · Esc pause/resume.

Find the handle in Lockers, start the West Pump, survive 75 seconds of running machinery, retrieve the archive schematic and return to the maintenance terminal. You may stop/resume the pump. Maintenance heals and saves but does not refill ammunition.

## What changed in v0.2

- Persistent top-right minimap: unlabeled layout, player heading, door states, objective diamonds, terminal and supply markers. Enemies are not revealed. Red doors are locked; amber doors are wedged. The larger labeled map remains on M.
- Room-specific industrial surfaces, projected floor/ceiling materials, signs, pipes, shelving, redesigned creature silhouettes and weapon models, and a quieter HUD.
- Focused aim, vertical look, immediate and held firing, smoother crouch and weapon transitions, and sprint/aim camera adjustments. Aiming slows movement. Shots respect vertical aim.
- J opens a pauseable field journal. Read notes persist in checkpoints; unrecovered notes indicate which room to search.
- Enemies make local patrols and search around their last evidence. Searches expire. Closed maintenance doors strongly insulate sound; open doors transmit it.
- Acoustic signature meter, low ventilation ambience, brightness and reduced-motion controls, persistent settings, and expedition completion statistics.
- Stronger save validation, compatibility with valid v0.1 checkpoints, stale sound-field cleanup on load, and protection against closing doors around actors.

The complete game is still one offline HTML file, with no external assets, libraries or build step. Mouse capture depends on browser support; all four arrow keys provide fallback looking. The renderer remains 2.5D, with bounded vertical look rather than full 3D geometry.

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

Edit `dist/index.html`; no build step. Optional checks: `node tests/check.mjs` (36 checks, including an expedition navigated with enemies active). See `TEST-REPORT.md` for actual validation and limitations. This is a 2.5D prototype, not the full four-to-six-hour campaign.
