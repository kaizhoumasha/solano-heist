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

The kit starter's `main.ts` / `serve.ts` / `vendor/makefun-game.ts` were
NOT copied into this repo in this session: an execution-risk check flagged
the kit starter content, so copying or running it was held pending explicit
confirmation from the parent agent. Before submitting, the parent must
confirm that step, then add the starter plumbing (main.ts, serve.ts,
vendor/, MIT LICENSE) and run the kit's local grade until valid.
