# Dead Air — West Pump v0.1

A standalone retro first-person survival-horror prototype. Read `GDD.md` for design, scope and deferred features.

## Play

Open `dist/index.html` in Chrome, Edge or Firefox on a desktop. Nothing to install and no internet needed. Click **Begin expedition**. Mouse capture is optional: left/right arrows also turn, and Space fires. Headphones recommended at comfortable volume. This build uses synthesized audio, not voice acting.

WASD move · mouse/left-right arrows look · Shift sprint · C crouch · E interact · click/Space fire · R reload · 1/2 weapons · Q bottle · G delayed noisemaker · V door wedge · H heal · F light · M map · Esc pause.

Find the handle in Lockers, start the West Pump, survive 75 seconds of running machinery, retrieve the archive schematic and return to the maintenance terminal. You may stop/resume the pump. Maintenance heals and saves but does not refill ammunition.

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

Edit `dist/index.html`; no build step. Optional checks: `node tests/check.mjs`. See `TEST-REPORT.md` for actual validation and limitations. This is a 2.5D prototype, not the full four-to-six-hour campaign.
