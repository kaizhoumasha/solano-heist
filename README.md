# Solano Heist — Make GTA 6 (gta6-01)

An original top-down open-world crime game in Port Solano, built for make.fun
bounty gta6-01. No Rockstar / GTA names, characters, maps, art or music.

## Play

Open `game/index.html` in a desktop browser, or serve `game/` with any
static server. No network request is made; all art is drawn in Canvas 2D
and all sound is synthesized with WebAudio.

- WASD / Arrows — walk and drive
- E — steal / enter a car, exit a car
- Click — shoot (mouse aim)
- Space — punch
- Shift — run / boost
- P — pause, M — mute, R — restart after being busted

## Systems

City to explore on foot and by car, traffic and pedestrians, cars to steal
and drive, a wanted level (0–5 stars) with police who chase and ram you,
four story missions (Get Wheels → First Delivery → Lose the Heat →
The Big Score), combat, health/ammo pickups, a HUD with a minimap, a start
screen, and a save in localStorage.

## Files

- `game/index.html` — the whole game (Canvas 2D, no build step)
- `screenshots/` — 3–4 real renders of the game in a browser
- `main.ts` — entry program (see note below)

## Note on entry plumbing

`main.ts` / `serve.ts` / `vendor/makefun-game.ts` are the kit starter's
plumbing, copied unchanged except for the header comment in `main.ts`
(naming this game instead of the starter's Block Dodger). `main.ts` copies
`game/` and `screenshots/` to `/output` and writes `dossier.json` with the
vendored library. The start click does not fire a shot: the first click
after the game starts is consumed as the start click, and the next click
shoots normally (verified in a real browser: Ammo stays 24 after the start
click, then drops to 23 on the next click).
