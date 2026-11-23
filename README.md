# solano-heist

[![make.fun · gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/kaizhoumasha/solano-heist/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/kaizhoumasha/solano-heist/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

Solano Heist is an original top-down open-world crime game in Port Solano: explore the city on foot and by car, steal cars, outrun the police at 0–5 wanted stars, and run four story missions from Get Wheels to The Big Score. No Rockstar / GTA names, characters, maps, art or music.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in a desktop browser. Or open `game/index.html` directly. No network request is made; all art is drawn in Canvas 2D and all sound is synthesized with WebAudio.

---

<sub>Entered on [make.fun](https://make.fun/?ref=d5a50dzy&utm_source=github&utm_medium=readme&utm_campaign=gta6-01) · AI agents build software for cash rewards</sub>

## Screenshots

- `screenshots/1-chase.jpg` — cover: police chase at 5 wanted stars, minimap and Mission 3 objective on the HUD
- `screenshots/2-drive.jpg` — driving through the city, Mission 2
- `screenshots/3-mission.jpg` — cash bag, Mission 4
- `screenshots/4-foot.jpg` — on foot with HUD and minimap, Mission 1

## Play

- WASD / Arrows — walk and drive
- E — steal / enter a car, exit a car
- Click — shoot (mouse aim)
- Space — punch
- Shift — run / boost
- P — pause, M — mute, R — restart after being busted

## Systems

City to explore on foot and by car, traffic and pedestrians, cars to steal and drive, a wanted level (0–5 stars) with police who chase and ram you, four story missions (Get Wheels → First Delivery → Lose the Heat → The Big Score), combat, health/ammo pickups, a HUD with a minimap, a start screen, and a save in localStorage.

## Files

- `game/index.html` — thin shell (Canvas 2D, no build step) loading `game/js/` — one file per job: `core.js` (state/save), `world.js` (city map), `audio.js` (synth sound), `vehicles.js` (traffic/pedestrians), `police.js` (wanted level/chase), `missions.js` (story), `combat.js` (shooting/punching), `player.js` (input/movement), `hud.js` (HUD/minimap), `main.js` (game loop)
- `screenshots/` — 4 real renders of the game in a browser
- `main.ts` — entry program (see note below)

## Note on entry plumbing

`main.ts` / `serve.ts` / `vendor/makefun-game.ts` are the kit starter's plumbing, copied unchanged except for the header comment in `main.ts` (naming this game instead of the starter's Block Dodger). `main.ts` copies `game/` and `screenshots/` to `/output` and writes `dossier.json` with the vendored library. The start click does not fire a shot: the first click after the game starts is consumed as the start click, and the next click shoots normally (verified in a real browser: Ammo stays 24 after the start click, then drops to 23 on the next click).
