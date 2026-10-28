'use strict';
(async function () {
  const pct = document.getElementById('pct');
  await Assets.load((p) => { pct.textContent = Math.round(p * 100) + '%'; });
  // web fonts (subset of DejaVu Sans Mono) so text metrics are identical everywhere
  try {
    for (const [file, weight] of [['fonts/mono.woff', 'normal'], ['fonts/mono-bold.woff', 'bold']]) {
      const ff = new FontFace('DejaVu Sans Mono', Assets.readBytes(file).buffer, { weight });
      await ff.load(); document.fonts.add(ff);
    }
  } catch (e) { console.warn('font load failed', e); }
  const order = ['Storage', 'Lang', 'Resources', 'Vibra', 'SoundPlayer', 'Mesh3D', 'Renderer3D', 'Ui', 'CityMode', 'GameMIDlet', 'House', 'MenuController', 'GameCanvas', 'PlatformFactory'];
  for (const n of order) eval(n + '.$clinit()');       // HighScores statics are initialised lazily (needs screen size)
  document.getElementById('loading').style.display = 'none';
  const game = new House();
  window.game = game;
  // toolbar: fullscreen / sound / sprite smoothing
  const full = () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); };
  const snd = document.getElementById('bSnd'), sm = document.getElementById('bSm');
  const showSnd = () => { snd.textContent = MidiAudio.muted ? '🔇' : '🔊'; snd.classList.toggle('off', MidiAudio.muted); };
  const showSm = () => sm.classList.toggle('off', !Graphics.smooth);
  const toggleSnd = () => { MidiAudio.setMuted(!MidiAudio.muted); showSnd(); };
  const toggleSm = () => { Graphics.smooth = !Graphics.smooth; try { localStorage.setItem('citybloxx.smooth', Graphics.smooth ? '1' : '0'); } catch (e) {} showSm(); };
  try { Graphics.smooth = localStorage.getItem('citybloxx.smooth') === '1'; } catch (e) {}
  document.getElementById('bFull').onclick = (e) => { e.target.blur(); full(); };
  snd.onclick = (e) => { e.target.blur(); MidiAudio.unlock(); toggleSnd(); };
  sm.onclick = (e) => { e.target.blur(); toggleSm(); };
  showSnd(); showSm();
  window.addEventListener('keydown', (e) => {
    if (Display.formOpen || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'KeyF') full(); else if (e.code === 'KeyM') toggleSnd(); else if (e.code === 'KeyP') toggleSm();
  });
  game.startFromLauncher();
})().catch((e) => { console.error(e); document.getElementById('pct').textContent = 'Error: ' + e.message; });
