# Dead Air sound recordings

The standalone HTML embeds all 32 selected clips. No streaming, account, or external asset request is required. `bank/` contains mono 22.05 kHz, 16-bit PCM WAV files; `manifest.json` records source filenames and excerpts. Clips were trimmed, converted to mono, resampled, peak-normalized with short edge fades, and mixed/pitch-varied in the game. The original authors do not endorse Dead Air.

| Recordings | Creator | License and source |
| --- | --- | --- |
| Pistol, rifle, shotgun | **Michel Baradari / apollo-music.de** | **[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)** — [Chaingun, Pistol, Rifle, Shotgun Shots](https://opengameart.org/content/chaingun-pistol-rifle-shotgun-shots), [original pack](https://opengameart.org/sites/default/files/shots.7z). Copyright Michel Baradari. Edits listed above. |
| Zombie voices, six excerpts | Darsycho | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) — [Zombie moans](https://opengameart.org/content/zombie-moans) |
| Reloads, shell/latch excerpts, shotgun rack | SpringySpringo | CC0 — [Gun Reload Sounds](https://opengameart.org/content/gun-reload-sounds) |
| Steps, plate/metal impacts, glass, body/punch/soft impacts | Kenney | CC0 — [Impact Sounds](https://kenney.nl/assets/impact-sounds) |
| Iron door opening | forseti1121 (OpenGameArt upload: recorded source linked on asset page) | CC0 — [Iron Door](https://opengameart.org/content/iron-door), [original Freesound recording](https://freesound.org/people/forseti1121/sounds/319324/) |
| Three short water effects | ezwa, edited by qubodup | Public domain / CC0 — [6 Short Water Splashes](https://opengameart.org/content/6-short-water-splashes) |

Gunfire attribution also appears inside the game, under **Sound credits**, so it travels with the offline HTML. Keep this file and the in-game notice when redistributing the recordings. The firearm recordings retain CC BY 3.0 independently of the project's code license.

## Build

`node tests/build-long-night.mjs` embeds `bank/` and `audio-engine.js` into the published HTML. It does not require an audio library. For re-authoring clips, download the linked source packs into the ignored `audio/source/` directory and run `tests/prepare-audio.py` with NumPy and SoundFile installed. Do not commit entire downloaded packs.
