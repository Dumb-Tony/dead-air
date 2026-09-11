# Dead Air — West Pump v0.1

A standalone retro first-person survival-horror prototype. Read `GDD.md` for design, scope and deferred features.

## Play

Open `dist/index.html` in Chrome, Edge or Firefox on a desktop. Nothing to install and no internet needed. Click **Begin expedition**. Mouse capture is optional: left/right arrows also turn, and Space fires. Headphones recommended at comfortable volume. This build uses synthesized audio, not voice acting.

WASD move · mouse/left-right arrows look · Shift sprint · C crouch · E interact · click/Space fire · R reload · 1/2 weapons · Q bottle · G delayed noisemaker · V door wedge · H heal · F light · M map · Esc pause.

Find the handle in Lockers, start the West Pump, survive 75 seconds of running machinery, retrieve the archive schematic and return to the maintenance terminal. You may stop/resume the pump. Maintenance heals and saves but does not refill ammunition.

## Save on your Windows PC

Extract the project ZIP into your chosen `GPT_DEV` folder, producing `GPT_DEV\Dead-Air\`. This chat's build environment cannot write directly to your Windows drive. The ZIP contains a local `.git` repository with committed source. In PowerShell, `git -C "C:\your\path\GPT_DEV\Dead-Air" status` verifies it (replace the example path with your actual folder).

If your ZIP extractor omits the hidden `.git` directory, clone the supplied bundle instead: `git clone "C:\path\Dead-Air.git.bundle" "C:\your\path\GPT_DEV\Dead-Air"`. Use an empty destination. Git must be installed for Git commands; playing the HTML does not require Git.

## Publish to your own GitHub repository

No GitHub repository was created by this delivery: the available connection lacked repository creation. In GitHub create an empty repository named `dead-air` (private is a safe initial choice), without adding README/license/gitignore. Then inside the extracted project run:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/dead-air.git
git push -u origin main
```

Use your normal GitHub sign-in flow; never paste access tokens into chat. If a remote already exists, inspect `git remote -v` before changing it. No license has been assigned to your project.

## Development

Edit `dist/index.html`; no build step. Optional checks: `node tests/check.mjs`. See `TEST-REPORT.md` for actual validation and limitations. This is a 2.5D prototype, not the full four-to-six-hour campaign.
