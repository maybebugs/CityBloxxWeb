# City Bloxx – browser port (JavaScript)

Open `index.html` in any modern browser (works straight from the file system – no server needed).

## Controls
Arrow keys / WASD – move, **Space / Enter** – select / drop block, **Z** / **F1** – left soft key, **X** / **Esc** – right soft key,
Backspace – clear, mouse click / touch – tap (drops the block), mouse wheel – up/down in menus.
**F** fullscreen, **M** sound on/off, **P** smooth/crisp sprites (also toolbar buttons, top right).
Language follows the browser language (`?lang=de` overrides). Progress and high scores are stored in `localStorage`.

## Layout
- `index.html`, `style.css`, `assets.js` (all game assets, base64) – page + data
- `js/engine/` – platform layer written for the browser: Canvas 2D graphics, software 3D rasteriser + OBJ loader,
  Web Audio MIDI player, byte streams, storage, input
- `js/game/` – the game itself (House, CityMode, Ui, MenuController, HighScores, …), translated 1:1 from the Java sources
  with `tools/j2js.py` (type-aware Java→JS translator) and then patched (main loop → requestAnimationFrame,
  resource loading, locale)
- `tools/bundle.py` – rebuilds `assets.js` from the original `assets/` folder

## Rendering
The game renders at the real screen resolution (integer scale 1–4×, text and shapes as vectors, 3D at up to 2×; `?q3d=3` raises 3D quality).
Sprites are scaled crisp by default; press **P** for smoothed sprites.
