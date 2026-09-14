# Aftershock campaign art — v0.9

Generated with the built-in image-generation tool on 14 September 2026. Exact final prompts are retained alongside each selected PNG. All seven selected PNGs are embedded byte-for-byte in `dist/index.html`; playing does not request external assets.

| Asset | Layout and use |
| --- | --- |
| carbine.png | 4×2 first-person atlas: ready, aimed, fire, five reload poses |
| flare.png | 4×2 first-person atlas: ready, alternate view, fire, five reload poses. The alternate front-facing view is intentionally unused. |
| spitter.png | 2×2 directional yellow-suited infected: front, right, rear, left |
| screamer.png | 2×2 directional blue-uniform dispatcher: front, right, rear, left |
| death-spitter.png | Eight collapse poses, generated using spitter.png as its identity reference |
| death-screamer.png | Eight collapse poses, generated using screamer.png as its identity reference |
| scenes.png | 2×2 illustrated scenes: freight, clinic, coastal relay, Mara at extraction |

Death atlases use the existing runtime normalization to preserve scale and a common floor baseline. Weapon cells receive an inset at their borders to prevent neighboring-frame texture bleed. No source pixels are overwritten. Earlier unused generation attempts remain outside the repository.
