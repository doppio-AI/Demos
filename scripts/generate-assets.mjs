import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'msedge' });

const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await og.setContent(`<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box} html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#FFF9F8;font-family:'Lato',sans-serif;color:#29284F}
.stage{position:relative;width:100%;height:100%;padding:62px 74px;display:grid;grid-template-columns:1fr 440px;gap:54px;align-items:center;overflow:hidden}
.blob{position:absolute;border-radius:44% 56% 63% 37% / 47% 42% 58% 53%;pointer-events:none}
.b1{width:500px;height:540px;right:-100px;top:-160px;background:#F7DDE4;opacity:.6;transform:rotate(12deg)}
.b2{width:270px;height:240px;right:250px;bottom:-140px;background:#EAE4F2;opacity:.7;transform:rotate(-12deg)}
.copy{position:relative;z-index:2}
.brand{display:flex;align-items:center;gap:12px;margin-bottom:34px}
.brand svg{width:44px;height:44px}
.brand span{display:block;font-family:'Poppins';font-size:16px;font-weight:500;letter-spacing:-.03em;line-height:1.1}
.brand small{display:block;margin-top:5px;font-family:'Poppins';font-size:8px;font-weight:500;letter-spacing:.17em;color:#943F62;text-transform:uppercase}
.eyebrow{display:flex;align-items:center;gap:11px;margin:0 0 18px;color:#AD4D77;font-family:'Poppins';font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.eyebrow:before{content:'';width:28px;height:1px;background:currentColor;opacity:.7}
h1{margin:0;max-width:520px;font-family:'Poppins';font-size:74px;font-weight:300;line-height:.98;letter-spacing:-.065em;color:#29284F}
h1 em{font-style:normal;color:#AD4D77;font-weight:500}
p.lede{max-width:450px;margin:24px 0 0;color:#716B83;font-size:16px;line-height:1.7}
.name{margin-top:30px;padding-top:20px;border-top:1px solid rgba(41,40,79,.15);display:flex;align-items:center;justify-content:space-between;gap:24px}
.name strong{display:block;font-family:'Poppins';font-size:16px;font-weight:500;letter-spacing:-.025em}
.name span{display:block;margin-top:4px;color:#716B83;font-size:11px;letter-spacing:.04em}
.credentials{display:flex;gap:22px;margin-top:8px;color:#716B83;font-size:9px;letter-spacing:.02em}
.credentials b{display:block;margin-top:2px;color:#29284F;font-family:'Poppins';font-size:11px;font-weight:500}
.arch{position:relative;z-index:2;width:440px;height:506px;overflow:hidden;border-radius:220px 220px 30px 30px;background:linear-gradient(150deg,#f9e3e8,#fff6f3 50%,#efe7f2);box-shadow:0 30px 70px rgba(81,55,72,.17);justify-self:end}
.arch svg.flower{position:absolute;left:50%;top:47%;width:330px;transform:translate(-50%,-50%) rotate(-3deg);color:#AD4D77;opacity:.6}
.arch .vtext{position:absolute;right:18px;top:130px;color:rgba(41,40,79,.5);font-family:'Poppins';font-size:7px;font-weight:500;letter-spacing:.18em;writing-mode:vertical-rl;text-transform:uppercase}
.plate{position:absolute;left:20px;right:20px;bottom:18px;padding:19px 22px;border-radius:15px;background:rgba(255,249,248,.91);box-shadow:0 16px 35px rgba(60,38,51,.12);backdrop-filter:blur(12px)}
.plate small{display:block;margin-bottom:7px;color:#943F62;font-family:'Poppins';font-size:7px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.plate strong{display:block;font-family:'Poppins';font-size:27px;font-weight:400;letter-spacing:-.045em;line-height:1.1}
.plate span{display:block;margin-top:6px;color:#716B83;font-family:'Poppins';font-size:8px;letter-spacing:.13em;text-transform:uppercase}
.footer{position:absolute;left:74px;right:74px;bottom:24px;z-index:2;display:flex;justify-content:space-between;color:#716B83;font-family:'Poppins';font-size:8px;letter-spacing:.11em;text-transform:uppercase}
</style></head><body>
<div class="stage">
  <span class="blob b1"></span><span class="blob b2"></span>
  <div class="copy">
    <div class="brand">
      <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" fill="#AD4D77" opacity=".1"/><circle cx="24" cy="24" r="21.25" stroke="#AD4D77" stroke-width=".75" opacity=".45"/><path d="M24 34.25C23.4 32.8 13.75 27.1 13.75 20.35C13.75 16.55 16.65 13.75 20.15 13.75C21.9 13.75 23.25 14.6 24 15.75C24.75 14.6 26.1 13.75 27.85 13.75C31.35 13.75 34.25 16.55 34.25 20.35C34.25 27.1 24.6 32.8 24 34.25Z" fill="#AD4D77" opacity=".16"/><path d="M24 34.25C23.4 32.8 13.75 27.1 13.75 20.35C13.75 16.55 16.65 13.75 20.15 13.75C21.9 13.75 23.25 14.6 24 15.75C24.75 14.6 26.1 13.75 27.85 13.75C31.35 13.75 34.25 16.55 34.25 20.35C34.25 27.1 24.6 32.8 24 34.25Z" stroke="#AD4D77" stroke-width="1.35" stroke-linejoin="round"/><path d="M24 34.5C24.15 37.1 24.65 39.3 26.2 41" stroke="#AD4D77" stroke-width="1.2" stroke-linecap="round"/><path d="M35.2 10.7L35.8 12.9L38 13.5L35.8 14.1L35.2 16.3L34.6 14.1L32.4 13.5L34.6 12.9L35.2 10.7Z" fill="#AD4D77"/></svg>
      <div><span>Dra. Claudia Magally</span><small>Ginecología &amp; Obstetricia</small></div>
    </div>
    <p class="eyebrow">Ginecología &amp; Obstetricia · Querétaro</p>
    <h1>Tu salud<br>es una<br><em>prioridad.</em></h1>
    <p class="lede">Atención cercana, información clara y acompañamiento médico en cada etapa de tu vida.</p>
    <div class="name">
      <div><strong>Dra. Claudia Magally Ramírez García</strong><span>Hospital Star Médica Querétaro</span></div>
      <div class="credentials">
        <div>Cédula profesional<b>11704457</b></div>
        <div>Céd. especialidad<b>14272223</b></div>
      </div>
    </div>
  </div>
  <div class="arch">
    <svg class="flower" viewBox="0 0 560 720" fill="none">
      <path d="M286 705C276 629 303 563 279 486C260 425 263 382 287 328" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M281 588C243 557 201 560 180 591C211 616 258 615 281 588Z" fill="#F7DDE4" fill-opacity=".45" stroke="currentColor" stroke-width="1.15"/>
      <path d="M280 639C315 602 360 596 387 622C361 652 314 660 280 639Z" fill="#F7DDE4" fill-opacity=".35" stroke="currentColor" stroke-width="1.15"/>
      <g transform="translate(291 281)">
        <path d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z" fill="#F7DDE4" fill-opacity=".35" stroke="currentColor" stroke-width="1.25"/>
        <path d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z" transform="rotate(51.4)" stroke="currentColor" stroke-width="1.25"/>
        <path d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z" transform="rotate(102.8)" fill="#F7DDE4" fill-opacity=".3" stroke="currentColor" stroke-width="1.25"/>
        <path d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z" transform="rotate(154.2)" stroke="currentColor" stroke-width="1.25"/>
        <path d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z" transform="rotate(205.6)" fill="#F7DDE4" fill-opacity=".35" stroke="currentColor" stroke-width="1.25"/>
        <path d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z" transform="rotate(257)" stroke="currentColor" stroke-width="1.25"/>
        <path d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z" transform="rotate(308.4)" fill="#F7DDE4" fill-opacity=".3" stroke="currentColor" stroke-width="1.25"/>
        <circle r="23" fill="#F7DDE4" fill-opacity=".8" stroke="currentColor" stroke-width="1.1"/>
        <circle r="12" stroke="currentColor" stroke-width="1" opacity=".55"/>
      </g>
      <path d="M423 357C423 347 431 339 440 344C445 337 456 341 456 351C456 364 440 374 440 374C440 374 423 365 423 357Z" stroke="currentColor" stroke-width="1.1" fill="#FFF9F8" fill-opacity=".4"/>
      <path d="M119 261L121 270L130 272L121 274L119 283L117 274L108 272L117 270L119 261Z" fill="#FFF9F8" stroke="currentColor" stroke-width="1"/>
      <circle cx="472" cy="242" r="3.2" fill="currentColor"/>
    </svg>
    <span class="vtext">Querétaro · México</span>
    <div class="plate"><small>Ginecología &amp; Obstetricia</small><strong>Dra. Claudia Magally</strong><span>Ramírez García</span></div>
  </div>
  <div class="footer"><span>Tu salud es una prioridad.</span><span>Ginecología · Obstetricia · Colposcopia · Climaterio</span></div>
</div>
</body></html>`);
await og.evaluate(() => document.fonts.ready);
await og.waitForTimeout(900);
await og.screenshot({ path: 'public/og-image.png', type: 'png' });

const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
await icon.setContent(`<!doctype html><html><head><style>html,body{margin:0;width:180px;height:180px;background:#FFF9F8;display:grid;place-items:center}svg{width:180px;height:180px;display:block}</style></head><body><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="bg" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#D77BA4"/><stop offset="1" stop-color="#943F62"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="#FFF9F8"/><circle cx="32" cy="32" r="24" fill="#F7DDE4"/><path d="M32 47C31.2 45 18 37.5 18 28.2C18 23.1 22 19.3 26.8 19.3C29.2 19.3 31 20.5 32 22.1C33 20.5 34.8 19.3 37.2 19.3C42 19.3 46 23.1 46 28.2C46 37.5 32.8 45 32 47Z" fill="url(#bg)"/><path d="M32 47C31.2 45 18 37.5 18 28.2C18 23.1 22 19.3 26.8 19.3C29.2 19.3 31 20.5 32 22.1C33 20.5 34.8 19.3 37.2 19.3C42 19.3 46 23.1 46 28.2C46 37.5 32.8 45 32 47Z" fill="none" stroke="#943F62" stroke-width="1.2" stroke-linejoin="round"/><path d="M32 47.5C32.2 51 33 54 35 56" stroke="#943F62" stroke-width="1.2" stroke-linecap="round"/><path d="M48 12L49 16L53 17L49 18L48 22L47 18L43 17L47 16L48 12Z" fill="#D77BA4"/></svg></body></html>`);
await icon.screenshot({ path: 'public/apple-touch-icon.png', type: 'png' });

await browser.close();

