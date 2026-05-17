/* ════════════════════════════════════════════════════════
   PAGE : BAIJIU (/baijiu, /baijiu/saveur/:slug, /baijiu/marque/:slug)
   — padding-top réduit à 4rem (navbar 64px compacte)
   — carte relief avec puces cliquables
════════════════════════════════════════════════════════ */
import { arrowSVG, chinaMapRelief } from '../js/helpers.js';
import { FLAVORS, BRANDS, BOTTLES } from '../js/data.js';

/* ─── Page principale ────────────────────────────────── */
export function renderBaijiu(t) {
  const tr = t().baijiu;

  // Points de la carte : coordonnées en % sur l'image relief (960×675)
  // Chaque province est placée géographiquement sur la carte
  const MAP_PINS = [
    { slug: 'guizhou',   label: 'Guizhou',  zh: '贵州', x: 63.5, y: 68.5 },
    { slug: 'sichuan',   label: 'Sichuan',  zh: '四川', x: 57.0, y: 59.5 },
    { slug: 'jiangsu',   label: 'Jiangsu',  zh: '江苏', x: 74.5, y: 45.5 },
    { slug: 'anhui',     label: 'Anhui',    zh: '安徽', x: 72.0, y: 50.5 },
    { slug: 'henan',     label: 'Henan',    zh: '河南', x: 68.5, y: 43.5 },
    { slug: 'shanxi',    label: 'Shanxi',   zh: '山西', x: 65.5, y: 34.5 },
    { slug: 'beijing',   label: 'Pékin',    zh: '北京', x: 69.0, y: 27.0 },
    { slug: 'hebei',     label: 'Hebei',    zh: '河北', x: 70.5, y: 31.5 },
    { slug: 'guangxi',   label: 'Guangxi',  zh: '广西', x: 63.5, y: 76.5 },
    { slug: 'shaanxi',   label: 'Shaanxi',  zh: '陕西', x: 61.5, y: 43.0 },
    { slug: 'hubei',     label: 'Hubei',    zh: '湖北', x: 67.5, y: 55.5 },
    { slug: 'shandong',  label: 'Shandong', zh: '山东', x: 73.5, y: 38.0 },
    { slug: 'henan2',    label: 'Henan',    zh: '河南', x: 68.5, y: 43.5, hidden: true }, // duplicate → même pin
    { slug: 'anhui2',    label: 'Anhui',    zh: '安徽', x: 72.0, y: 50.5, hidden: true },
    { slug: 'guizhou2',  label: 'Guizhou',  zh: '贵州', x: 63.5, y: 68.5, hidden: true },
  ];

  // Filtrer les doublons (on garde une seule puce par coordonnées uniques)
  const uniquePins = MAP_PINS.filter(p => !p.hidden);

  // Trouver le slug de saveur le plus proche pour chaque province
  const pinsFlavors = uniquePins.map(pin => {
    const fl = FLAVORS.find(f =>
      f.region && (
        f.region.slug === pin.slug ||
        f.region.name?.toLowerCase().includes(pin.label.toLowerCase()) ||
        pin.label.toLowerCase().includes(f.region.name?.toLowerCase())
      )
    );
    return { ...pin, flavorSlug: fl?.slug || null, flavorName: fl?.name || null, flavorZh: fl?.nameZh || null };
  });

  return `
<div style="padding-top:4rem;">

  <!-- ── Hero ── -->
  <section class="px-6-12" style="padding-top:2.5rem;padding-bottom:2rem;">
    <div class="max-1280">
      <div class="reveal"><p class="overline">${tr.overline}</p></div>
      <div class="reveal" style="transition-delay:60ms;">
        <h1 class="font-serif" style="margin-top:.75rem;">${tr.title || 'Baijiu'}</h1>
      </div>
      <div class="reveal" style="transition-delay:120ms;">
        <p style="font-family:'Outfit',sans-serif;font-size:1.0625rem;color:#555049;line-height:1.6;margin-top:1rem;max-width:40rem;">${tr.lead}</p>
      </div>
    </div>
  </section>

  <!-- ── Grille des saveurs ── -->
  <section class="px-6-12" style="padding-bottom:2.5rem;">
    <div class="max-1280">
      <div class="reveal"><p class="overline">${tr.flavorsOverline}</p></div>
      <div id="flavor-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:.625rem;margin-top:1.5rem;">
        ${FLAVORS.map((f, i) => `
          <a href="/baijiu/saveur/${f.slug}" data-nav="/baijiu/saveur/${f.slug}"
             class="flavor-chip reveal" style="transition-delay:${i * 25}ms;">
            <p class="chip-num">0${String(i + 1).padStart(2, '0')} · ${f.nameZh}</p>
            <h3 class="font-serif" style="margin-top:.375rem;font-size:clamp(.95rem,1.4vw,1.2rem);">${f.name}</h3>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <!-- ── Carte relief ── -->
  <section class="px-6-12" style="padding-bottom:3.5rem;">
    <div class="max-1280">
      <div class="reveal">
        <p class="overline">${tr.mapOverline}</p>
        <h2 class="font-serif" style="margin-top:.625rem;">${tr.mapTitle}</h2>
      </div>
      <div class="reveal" style="margin-top:1.75rem;transition-delay:80ms;">
        ${chinaMapRelief(pinsFlavors)}
        <div class="map-legend">
          <div class="map-legend-item">
            <div class="map-legend-pin-demo"></div>
            <span>Province productrice — cliquer pour explorer</span>
          </div>
          <span style="font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:.22em;color:#9E814B;text-transform:uppercase;">Survoler puis cliquer →</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Nos offres ── -->
  <section class="px-6-12 py-24" style="background:#F5F4F0;">
    <div class="max-1280">
      <div class="reveal"><p class="overline">${tr.offeringsOverline}</p></div>
      <div class="offerings-grid" style="margin-top:2rem;">
        ${tr.offerings.map((o, i) => `
          <div class="reveal offering-card" style="transition-delay:${i * 80}ms;">
            <p style="font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#6B0F1A;">0${i + 1}</p>
            <h3 class="font-serif" style="margin-top:.875rem;">${o.title}</h3>
            <p style="margin-top:.875rem;font-family:'Outfit',sans-serif;font-size:14px;color:#555049;line-height:1.6;">${o.desc}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

</div>`;
}

/* ─── Page saveur ────────────────────────────────────── */
export function renderBaijiuFlavor(slug, t) {
  const flavor = FLAVORS.find(f => f.slug === slug);
  if (!flavor) return renderBaijiu(t);
  const brands  = BRANDS.filter(b => b.flavor === slug);
  const bottles = brands.map(b => BOTTLES.find(bt => bt.brand === b.slug)).filter(Boolean);

  return `
<div style="padding-top:4rem;">

  <section class="px-6-12" style="padding-top:2.5rem;padding-bottom:2rem;">
    <div class="max-1280">
      <a href="/baijiu" data-nav="/baijiu" class="back-link">← Baijiu</a>
      <div class="reveal">
        <h1 class="font-serif" style="margin-top:1rem;">${flavor.name}</h1>
      </div>
      <div class="reveal" style="transition-delay:100ms;">
        <p style="font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#9E814B;margin-top:.375rem;">${flavor.nameZh}</p>
      </div>
      <div class="reveal" style="transition-delay:160ms;">
        <p style="font-family:'Outfit',sans-serif;font-size:1.0625rem;color:#555049;line-height:1.6;margin-top:1.5rem;max-width:40rem;">${flavor.description}</p>
      </div>
    </div>
  </section>

  <section class="px-6-12 py-16" style="background:#F5F4F0;">
    <div class="max-1280">
      <div class="reveal">
        <p class="overline">Les maisons</p>
        <h2 class="font-serif" style="margin-top:.75rem;">Deux signatures à découvrir.</h2>
      </div>
      <div class="brand-pair" style="margin-top:2rem;">
        ${brands.map(b => `
          <a href="/baijiu/marque/${b.slug}" data-nav="/baijiu/marque/${b.slug}" class="brand-card reveal">
            <div class="editorial-img aspect-4-5"><img src="${b.image}" alt="${b.name}" loading="lazy"/></div>
            <div style="margin-top:.875rem;">
              <p style="font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#9E814B;">${b.style}</p>
              <h3 class="font-serif" style="margin-top:.375rem;">${b.name}</h3>
            </div>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="px-6-12 py-16">
    <div class="max-1280">
      <div class="reveal">
        <p class="overline">Présentation filmée</p>
        <h2 class="font-serif" style="margin-top:.75rem;">L'aromatique ${flavor.name}.</h2>
      </div>
      <div class="video-frame reveal" style="margin-top:2rem;transition-delay:80ms;">
        <iframe src="${flavor.video}" title="${flavor.name}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>
  </section>

  ${bottles.length ? `
  <section class="px-6-12 py-16" style="background:#F5F4F0;">
    <div class="max-1280">
      <div class="reveal">
        <p class="overline">Bouteilles phares</p>
        <h2 class="font-serif" style="margin-top:.75rem;">Acheter une signature.</h2>
      </div>
      <div class="brand-pair" style="margin-top:2rem;">
        ${bottles.map(b => `
          <a href="${b.shopUrl}" target="_blank" rel="noopener" class="brand-card reveal">
            <div class="editorial-img aspect-4-5"><img src="${b.image}" alt="${b.name}" loading="lazy"/></div>
            <div style="margin-top:.875rem;">
              <h3 class="font-serif" style="font-size:1.125rem;">${b.name}</h3>
              <p style="margin-top:.375rem;font-family:'Outfit',sans-serif;font-size:13px;color:#555049;line-height:1.5;">${b.description}</p>
            </div>
          </a>`).join('')}
      </div>
    </div>
  </section>` : ''}

</div>`;
}

/* ─── Page marque ────────────────────────────────────── */
export function renderBaijiuBrand(slug, t) {
  const brand  = BRANDS.find(b => b.slug === slug);
  if (!brand) return renderBaijiu(t);
  const flavor = FLAVORS.find(f => f.slug === brand.flavor);

  return `
<div style="padding-top:4rem;">

  <section class="px-6-12" style="padding-top:2.5rem;padding-bottom:2rem;">
    <div class="max-1280">
      <a href="/baijiu/saveur/${brand.flavor}" data-nav="/baijiu/saveur/${brand.flavor}" class="back-link">← ${flavor?.name}</a>
      <div class="reveal">
        <h1 class="font-serif" style="margin-top:1rem;">${brand.name}</h1>
      </div>
      <p style="font-family:'Outfit',sans-serif;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#9E814B;margin-top:.375rem;">${brand.style}</p>
    </div>
  </section>

  <section class="px-6-12" style="margin-bottom:3.5rem;">
    <div class="max-1280 reveal">
      <div class="editorial-img aspect-16-9">
        <img src="${brand.image}" alt="${brand.name}" loading="lazy"/>
      </div>
    </div>
  </section>

  <section class="px-6-12" style="padding-bottom:4rem;">
    <div class="max-1280">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;">
        <div class="reveal">
          <p class="overline">La maison</p>
          <h2 class="font-serif" style="margin-top:.625rem;font-size:clamp(1.25rem,2vw,1.625rem);">Description</h2>
          <p style="margin-top:1.25rem;font-family:'Outfit',sans-serif;color:#555049;line-height:1.6;">${brand.description}</p>
        </div>
        <div class="reveal" style="transition-delay:120ms;">
          <p class="overline">Histoire</p>
          <h2 class="font-serif" style="margin-top:.625rem;font-size:clamp(1.25rem,2vw,1.625rem);">Origine</h2>
          <p style="margin-top:1.25rem;font-family:'Outfit',sans-serif;color:#555049;line-height:1.6;">${brand.history}</p>
        </div>
      </div>
    </div>
  </section>

  <div class="cta-banner">
    <div class="max-1280">
      <p class="overline overline-white">Capital Prestige</p>
      <h2 class="font-serif" style="color:#fff;margin-top:1.25rem;font-size:clamp(1.375rem,2.5vw,2rem);">
        Découvrir ${brand.name} en dégustation privée.
      </h2>
      <a href="/contact" data-nav="/contact" class="btn-light" style="margin-top:2rem;">
        Demander l'accès ${arrowSVG()}
      </a>
    </div>
  </div>

</div>`;
}
