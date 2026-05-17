/* ════════════════════════════════════════════════════════
   HELPERS.JS — Utilitaires partagés entre toutes les pages
════════════════════════════════════════════════════════ */

export function arrowSVG(size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
}

export function revealObserver() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 100px 0px' });
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { requestAnimationFrame(() => el.classList.add('is-visible')); }
    else io.observe(el);
  });
}

/* ─── chinaMap (ancienne — conservée, utilisée sur les pages vin) ─── */
export function chinaMap(points, basePath) {
  const clickableProvs = {};
  points.forEach(p => {
    const provId = SLUG_TO_PROV[p.slug] || p.slug;
    clickableProvs[provId] = p;
  });

  const WINE_FILL   = '#6B0F1A';
  const WINE_HOVER  = '#8B1A28';
  const WINE_STROKE = '#4A0A12';
  const BASE_FILL   = '#DDD8CC';
  const BASE_STROKE = '#B5AFA3';

  function centroid(d) {
    const pts = [...d.matchAll(/[ML]\s*([\d.]+)[,\s]\s*([\d.]+)/g)].map(m => [+m[1], +m[2]]);
    if (!pts.length) return [0, 0];
    return [pts.reduce((a, c) => a + c[0], 0) / pts.length, pts.reduce((a, c) => a + c[1], 0) / pts.length];
  }

  const svgPaths = PROVINCES.map(p => {
    const wine = Object.prototype.hasOwnProperty.call(clickableProvs, p.id);
    const pt = clickableProvs[p.id];
    let label = p.nameEn;
    if (pt && pt.name) label = pt.nameZh ? `${pt.name} · ${pt.nameZh}` : pt.name;
    let nav = null;
    if (wine && pt) nav = `${basePath}/${pt.slug}`;
    return `<path class="cp${wine ? ' wr' : ''}" d="${p.d}" fill="${wine ? WINE_FILL : BASE_FILL}" stroke="${wine ? WINE_STROKE : BASE_STROKE}" stroke-width="${wine ? '2' : '0.8'}" stroke-linejoin="round" stroke-linecap="round" data-label="${label}" ${nav ? `data-nav="${nav}"` : ''} style="cursor:${wine ? 'pointer' : 'default'}"/>`;
  }).join('\n');

  const labelEls = PROVINCES.filter(p => Object.prototype.hasOwnProperty.call(clickableProvs, p.id)).map(p => {
    const [cx, cy] = centroid(p.d);
    const short = p.nameEn.replace(/\s*\(.*\)/, '');
    const fsize = short.length > 8 ? '7.5' : '9';
    return `<text x="${cx.toFixed(0)}" y="${cy.toFixed(0)}" text-anchor="middle" dominant-baseline="middle" font-family="'Outfit',sans-serif" font-size="${fsize}" font-weight="500" fill="rgba(255,255,255,0.90)" pointer-events="none" style="user-select:none">${short}</text>`;
  }).join('\n');

  return `<div class="cpmap">
<style>
.cpmap{position:relative;width:100%;max-width:860px;margin:0 auto}
.cpmap svg{width:100%;height:auto;display:block;filter:drop-shadow(0 6px 20px rgba(0,0,0,0.13))}
.cp.wr{transition:fill .2s ease}
.cp.wr:hover{fill:${WINE_HOVER};filter:brightness(1.08)}
#cptip{position:absolute;pointer-events:none;z-index:40;background:#6B0F1A;color:#fff;padding:5px 14px;font-family:'Outfit',sans-serif;font-size:12px;font-weight:500;letter-spacing:.06em;white-space:nowrap;transform:translate(-50%,-130%);opacity:0;transition:opacity .15s;box-shadow:0 4px 18px rgba(0,0,0,.28);}
#cptip::after{content:'';position:absolute;left:50%;bottom:-5px;transform:translateX(-50%);border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #6B0F1A}
#cptip.on{opacity:1}
</style>
<svg viewBox="30 0 730 560" xmlns="http://www.w3.org/2000/svg">
  <g>${svgPaths}</g>
  <g pointer-events="none">${labelEls}</g>
</svg>
<div id="cptip"></div>
<script>(function(){
  var tip=document.getElementById('cptip');
  var wrap=document.querySelector('.cpmap');
  document.querySelectorAll('.cp.wr').forEach(function(el){
    el.addEventListener('mouseenter',function(e){tip.textContent=this.dataset.label;tip.classList.add('on');mv(e)});
    el.addEventListener('mousemove',mv);
    el.addEventListener('mouseleave',function(){tip.classList.remove('on')});
    el.addEventListener('click',function(e){var n=this.dataset.nav;if(n){e.preventDefault();history.pushState({},'',n);window.router(n)}});
  });
  function mv(e){var r=wrap.getBoundingClientRect();tip.style.left=(e.clientX-r.left)+'px';tip.style.top=(e.clientY-r.top)+'px'}
})()<\/script>
</div>`;
}

/* ─── chinaMapRelief — carte Baijiu avec image relief + puces ─────────
   Utilisée par renderBaijiu() dans baijiu.js.

   @param pins  Array<{
     slug:        string,
     label:       string,   nom FR affiché
     zh:          string,   caractère chinois
     x:           number,   position % horizontal sur l'image
     y:           number,   position % vertical   sur l'image
     flavorSlug:  string|null,
     flavorName:  string|null,
     flavorZh:    string|null,
   }>
   @param imgSrc string  chemin vers relief-china.png
────────────────────────────────────────────────────────────────────── */
export function chinaMapRelief(pins, imgSrc = 'maps/relief-china.png') {
  const pinsHTML = pins.map(pin => `
    <button
      class="map-pin"
      style="left:${pin.x}%;top:${pin.y}%;"
      data-slug="${pin.slug}"
      data-label="${pin.label}"
      data-zh="${pin.zh}"
      data-flavor-slug="${pin.flavorSlug || ''}"
      data-flavor-name="${pin.flavorName || pin.label}"
      data-flavor-zh="${pin.flavorZh || pin.zh}"
      aria-label="${pin.label}"
    >
      <span class="pin-ring"></span>
      <span class="pin-dot"></span>
      <span class="pin-label">${pin.label}<span class="pin-zh"> ${pin.zh}</span></span>
    </button>`).join('');

  return `
<div class="map-relief-wrap" id="map-relief-wrap">
  <img
    src="${imgSrc}"
    alt="Carte topographique de la Chine"
    class="map-relief-img"
    draggable="false"
  />
  ${pinsHTML}
  <div class="map-pin-tooltip" id="map-pin-tooltip" aria-hidden="true">
    <p class="mpt-region"></p>
    <p class="mpt-name font-serif"></p>
    <p class="mpt-desc"></p>
    <span class="mpt-cta">Explorer →</span>
  </div>
</div>`;
}

/* ─── initMapPins — brancher les events après injection dans le DOM ───
   Appeler dans votre routeur après chaque render de /baijiu.
   Requiert window.__navigate(path) dans votre routeur SPA.
────────────────────────────────────────────────────────────────────── */
export function initMapPins() {
  const wrap    = document.getElementById('map-relief-wrap');
  const tooltip = document.getElementById('map-pin-tooltip');
  if (!wrap || !tooltip) return;

  const ttRegion = tooltip.querySelector('.mpt-region');
  const ttName   = tooltip.querySelector('.mpt-name');
  const ttDesc   = tooltip.querySelector('.mpt-desc');
  const ttCta    = tooltip.querySelector('.mpt-cta');

  function positionTooltip(pin) {
    const wRect = wrap.getBoundingClientRect();
    const pRect = pin.getBoundingClientRect();
    const ttW = 210;
    const ttH = 100;
    let left = pRect.left - wRect.left + 16;
    let top  = pRect.top  - wRect.top  - ttH - 8;
    if (left + ttW > wRect.width - 8) left = pRect.left - wRect.left - ttW - 8;
    if (top < 4) top = pRect.top - wRect.top + 22;
    tooltip.style.left = left + 'px';
    tooltip.style.top  = top  + 'px';
  }

  function hideTooltip() {
    tooltip.classList.remove('is-visible');
  }

  wrap.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      const { flavorName, flavorZh, label, zh, flavorSlug } = pin.dataset;
      ttRegion.textContent = `${label} · ${zh}`;
      ttName.textContent   = flavorName && flavorName !== label
        ? `${flavorName} (${flavorZh})`
        : label;
      ttDesc.textContent   = flavorSlug ? 'Cliquer pour explorer cet arôme' : 'Province productrice';
      ttCta.style.display  = flavorSlug ? 'inline' : 'none';
      positionTooltip(pin);
      tooltip.classList.add('is-visible');
    });

    pin.addEventListener('mouseleave', hideTooltip);

    pin.addEventListener('click', () => {
      const { flavorSlug } = pin.dataset;
      if (flavorSlug && typeof window.__navigate === 'function') {
        window.__navigate(`/baijiu/saveur/${flavorSlug}`);
      }
    });
  });

  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) hideTooltip();
  });
}

/* ─── Données cartographiques (provinces SVG) ─── */
const SLUG_TO_PROV = {
  'xinjiang': 'xinjiang', 'gansu': 'gansu', 'ningxia': 'ningxia',
  'inner-mongolia': 'inner-mongolia', 'yunnan': 'yunnan',
  'beijing': 'beijing', 'tianjin': 'tianjin', 'hebei': 'hebei',
  'shanxi': 'shanxi', 'henan': 'henan', 'shandong': 'shandong', 'liaoning': 'liaoning',
  'sauce-aroma': 'guizhou', 'strong-aroma': 'sichuan', 'light-aroma': 'shanxi',
  'rice-aroma': 'guangxi', 'phoenix-aroma': 'shaanxi', 'mixed-aroma': 'hubei',
  'sesame-aroma': 'shandong', 'te-aroma': 'jiangxi', 'medicinal-aroma': 'guizhou',
  'laobaigan-aroma': 'hebei', 'chi-aroma': 'guangdong', 'fuyu-aroma': 'hunan',
};

const PROVINCES = [
  { id: 'xinjiang',       nameEn: 'Xinjiang',       d: 'M 42,80 L 60,60 L 84,46 L 114,36 L 146,30 L 178,30 L 206,38 L 226,54 L 234,74 L 228,96 L 210,114 L 184,126 L 154,132 L 122,128 L 92,116 L 66,100 Z' },
  { id: 'xizang',         nameEn: 'Tibet',          d: 'M 90,222 L 118,204 L 150,192 L 184,186 L 214,188 L 238,200 L 248,220 L 240,242 L 218,258 L 188,266 L 156,264 L 126,252 L 102,234 Z' },
  { id: 'qinghai',        nameEn: 'Qinghai',        d: 'M 154,134 L 180,124 L 208,120 L 234,126 L 254,140 L 260,160 L 252,182 L 232,196 L 204,202 L 174,198 L 148,184 L 136,164 L 140,146 Z' },
  { id: 'yunnan',         nameEn: 'Yunnan',         d: 'M 228,352 L 252,338 L 280,332 L 308,336 L 326,352 L 328,374 L 312,392 L 284,402 L 256,398 L 230,382 L 218,362 Z' },
  { id: 'guizhou',        nameEn: 'Guizhou',        d: 'M 334,338 L 358,326 L 386,324 L 410,336 L 420,356 L 412,378 L 390,390 L 362,392 L 336,380 L 322,360 L 328,342 Z' },
  { id: 'guangxi',        nameEn: 'Guangxi',        d: 'M 328,392 L 356,382 L 388,380 L 416,390 L 432,410 L 428,434 L 408,450 L 378,456 L 346,450 L 320,432 L 312,410 Z' },
  { id: 'guangdong',      nameEn: 'Guangdong',      d: 'M 424,392 L 456,380 L 492,376 L 526,386 L 548,406 L 546,432 L 526,450 L 494,460 L 458,458 L 426,444 L 408,422 L 414,402 Z' },
  { id: 'hainan',         nameEn: 'Hainan',         d: 'M 448,494 L 468,486 L 488,490 L 498,504 L 492,518 L 474,524 L 454,518 L 442,506 Z' },
  { id: 'sichuan',        nameEn: 'Sichuan',        d: 'M 246,240 L 272,228 L 302,222 L 334,226 L 356,242 L 362,264 L 352,286 L 328,300 L 298,304 L 268,298 L 248,280 L 242,260 Z' },
  { id: 'chongqing',      nameEn: 'Chongqing',      d: 'M 356,264 L 374,256 L 394,262 L 400,278 L 388,296 L 368,298 L 350,286 L 346,270 Z' },
  { id: 'shaanxi',        nameEn: 'Shaanxi',        d: 'M 304,168 L 328,160 L 352,160 L 372,172 L 378,194 L 370,216 L 352,232 L 326,240 L 300,234 L 282,218 L 282,196 L 292,178 Z' },
  { id: 'gansu',          nameEn: 'Gansu',          d: 'M 182,130 L 210,118 L 240,114 L 268,120 L 288,136 L 290,158 L 274,174 L 248,182 L 218,180 L 190,168 L 174,150 Z' },
  { id: 'ningxia',        nameEn: 'Ningxia',        d: 'M 290,136 L 308,126 L 326,126 L 340,138 L 340,158 L 326,170 L 306,170 L 290,158 Z' },
  { id: 'inner-mongolia', nameEn: 'Inner Mongolia', d: 'M 164,68 L 196,52 L 234,42 L 278,36 L 322,34 L 364,38 L 400,50 L 430,68 L 448,90 L 442,112 L 414,126 L 374,134 L 334,136 L 294,130 L 258,122 L 228,116 L 196,116 L 168,118 L 152,108 L 154,88 L 162,74 Z' },
  { id: 'shanxi',         nameEn: 'Shanxi',         d: 'M 370,130 L 396,120 L 420,120 L 444,132 L 452,154 L 444,176 L 424,190 L 398,194 L 372,186 L 356,170 L 358,150 Z' },
  { id: 'hebei',          nameEn: 'Hebei',          d: 'M 360,94 L 392,82 L 426,78 L 460,82 L 486,98 L 494,120 L 482,142 L 456,154 L 424,158 L 392,150 L 364,134 L 352,114 Z' },
  { id: 'beijing',        nameEn: 'Beijing',        d: 'M 456,100 L 472,92 L 490,96 L 498,112 L 492,128 L 474,136 L 456,130 L 446,116 Z' },
  { id: 'tianjin',        nameEn: 'Tianjin',        d: 'M 494,120 L 510,114 L 524,120 L 526,134 L 514,144 L 498,142 L 486,132 Z' },
  { id: 'liaoning',       nameEn: 'Liaoning',       d: 'M 456,72 L 488,58 L 522,52 L 556,56 L 582,70 L 596,90 L 588,112 L 564,126 L 530,132 L 494,124 L 464,108 L 452,88 Z' },
  { id: 'jilin',          nameEn: 'Jilin',          d: 'M 558,52 L 586,38 L 618,32 L 650,36 L 672,52 L 676,72 L 656,88 L 626,96 L 592,92 L 566,76 Z' },
  { id: 'heilongjiang',   nameEn: 'Heilongjiang',   d: 'M 618,30 L 648,16 L 682,8 L 716,10 L 742,26 L 748,50 L 730,68 L 700,78 L 664,74 L 636,58 Z' },
  { id: 'shandong',       nameEn: 'Shandong',       d: 'M 446,156 L 474,144 L 508,140 L 542,146 L 568,162 L 572,184 L 554,200 L 524,208 L 492,206 L 460,196 L 440,178 L 438,162 Z' },
  { id: 'henan',          nameEn: 'Henan',          d: 'M 368,192 L 396,184 L 426,184 L 452,196 L 462,218 L 456,242 L 434,256 L 404,260 L 372,254 L 350,238 L 346,214 L 358,198 Z' },
  { id: 'hubei',          nameEn: 'Hubei',          d: 'M 348,264 L 376,256 L 408,256 L 436,268 L 446,290 L 436,314 L 410,328 L 378,330 L 348,318 L 330,298 L 332,276 Z' },
  { id: 'jiangsu',        nameEn: 'Jiangsu',        d: 'M 488,202 L 518,192 L 548,190 L 572,204 L 578,228 L 566,252 L 540,264 L 508,266 L 478,256 L 460,238 L 462,214 Z' },
  { id: 'anhui',          nameEn: 'Anhui',          d: 'M 438,258 L 466,250 L 494,250 L 516,264 L 520,290 L 506,312 L 478,324 L 448,322 L 422,306 L 412,282 L 420,262 Z' },
  { id: 'shanghai',       nameEn: 'Shanghai',       d: 'M 572,248 L 588,242 L 602,248 L 606,262 L 596,272 L 578,272 L 566,260 Z' },
  { id: 'zhejiang',       nameEn: 'Zhejiang',       d: 'M 508,268 L 534,258 L 562,256 L 584,268 L 594,292 L 586,318 L 564,334 L 534,338 L 506,326 L 490,308 L 490,286 Z' },
  { id: 'jiangxi',        nameEn: 'Jiangxi',        d: 'M 444,326 L 470,316 L 500,314 L 524,328 L 532,352 L 520,376 L 494,388 L 462,388 L 434,372 L 420,348 L 424,328 Z' },
  { id: 'fujian',         nameEn: 'Fujian',         d: 'M 526,326 L 556,314 L 584,314 L 606,330 L 614,358 L 600,384 L 572,396 L 540,394 L 514,378 L 504,350 L 510,328 Z' },
  { id: 'hunan',          nameEn: 'Hunan',          d: 'M 376,332 L 406,326 L 436,332 L 456,350 L 456,376 L 438,396 L 408,406 L 374,404 L 344,390 L 330,366 L 334,342 Z' },
];