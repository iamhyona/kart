# 팡팡 레이싱

Portrait browser kart racer. Six tracks, six Pangpang characters, solo AI races, item/speed modes, drift charging, and local split-screen for two keyboard players.

## Run

Build: `bash scripts/build.sh`

Core checks: `node scripts/test-engine.mjs`

Serve the generated `dist/` directory with a static web server.

P1: Left/Right, Space drift, 1/2 items, 3 boost.
P2: A/D, Shift drift, Q/E items, R boost.

Mobile has touch controls and automatic acceleration. Multiplayer is local keyboard play; cross-device online networking is not implemented.

Source is in `web/`; graphics are procedural Canvas rendering. No external runtime dependencies.
