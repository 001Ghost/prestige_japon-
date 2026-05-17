/* ════════════════════════════════════════════════════════
   PAGE : VIN CHINOIS (/chinese-wine, /vin-chinois/region/:slug, /vin-chinois/marque/:slug)
════════════════════════════════════════════════════════ */
import { arrowSVG, chinaMap } from '../js/helpers.js';
import { REGIONS, WINE_BRANDS } from '../js/data.js';

export function renderChineseWine(t, lang) {
  const tr = t().wine;
  const mapPoints = REGIONS.map(r => ({ slug: r.slug, name: r.name, x: r.x, y: r.y }));
  const pageTitle = lang === 'fr' ? 'Le vin chinois' : lang === 'zh' ? '中国葡萄酒' : 'Chinese Wine';
  return `
<div style="padding-top:8rem;">
  <section class="px-6-12 pb-16">
    <div class="max-1280">
      <div class="reveal"><p class="overline">${tr.overline}</p></div>
      <div class="reveal" style="transition-delay:80ms;"><h1 class="font-serif" style="margin-top:1.5rem;">${pageTitle}</h1></div>
      <div class="reveal" style="transition-delay:160ms;"><p style="font-family:'Outfit',sans-serif;font-size:1.0625rem;color:#555049;line-height:1.6;margin-top:1.5rem;max-width:40rem;">${tr.lead}</p></div>
    </div>
  </section>

  <section class="px-6-12 pb-32">
    <div class="max-1280">
      <div class="reveal">
        <p class="overline">${tr.mapOverline}</p>
        <h2 class="font-serif" style="margin-top:1rem;">${tr.mapTitle}</h2>
      </div>
      <div style="margin-top:2.5rem;" class="reveal">
        ${chinaMap(mapPoints, '/vin-chinois/region')}
        <div class="map-legend">
          <div class="map-legend-item"><div class="map-legend-swatch wine"></div><span>Région cliquable</span></div>
          <div class="map-legend-item"><div class="map-legend-swatch other"></div><span>Autre province</span></div>
          <span style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.2em;color:#9E814B;text-transform:uppercase;">Cliquez une région pour explorer →</span>
        </div>
      </div>
    </div>
  </section>

  <section class="px-6-12 py-24" style="background:#F5F4F0;">
    <div class="max-1280">
      <div class="reveal"><p class="overline">${tr.offeringsOverline}</p></div>
      <div class="offerings-grid" style="margin-top:3rem;">
        ${tr.offerings.map((o, i) => `
          <div class="reveal offering-card" style="transition-delay:${i * 80}ms;">
            <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#6B0F1A;">0${i + 1}</p>
            <h3 class="font-serif" style="margin-top:1rem;">${o.title}</h3>
            <p style="margin-top:1rem;font-family:'Outfit',sans-serif;font-size:14px;color:#555049;line-height:1.6;">${o.desc}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>
</div>`;
}

export function renderWineRegion(slug, t, lang) {
  const region = REGIONS.find(r => r.slug === slug);
  if (!region) return renderChineseWine(t, lang);
  const brands = WINE_BRANDS.filter(b => b.region === slug);
  const backLabel = lang === 'fr' ? 'Le vin chinois' : lang === 'en' ? 'Chinese Wine' : '中国葡萄酒';
  return `
<div style="padding-top:8rem;">
  <section class="px-6-12 pb-16">
    <div class="max-1280">
      <a href="/chinese-wine" data-nav="/chinese-wine" class="back-link">← ${backLabel}</a>
      <div class="reveal"><h1 class="font-serif" style="margin-top:1.5rem;">${region.name}</h1></div>
      <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#9E814B;margin-top:.5rem;">${region.nameZh}</p>
      <div class="reveal" style="transition-delay:120ms;"><p style="font-family:'Outfit',sans-serif;font-size:1.0625rem;color:#555049;line-height:1.6;margin-top:2rem;max-width:40rem;">${region.description}</p></div>
    </div>
  </section>

  <section class="px-6-12 py-16">
    <div class="max-1280">
      <div class="reveal"><p class="overline">Présentation filmée</p><h2 class="font-serif" style="margin-top:1rem;">La région en mouvement.</h2></div>
      <div class="video-frame reveal" style="margin-top:2.5rem;transition-delay:80ms;">
        <iframe src="${region.video}" title="${region.name}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </section>

  ${brands.length ? `
  <section class="px-6-12 py-16" style="background:#F5F4F0;">
    <div class="max-1280">
      <div class="reveal"><p class="overline">Les maisons</p><h2 class="font-serif" style="margin-top:1rem;">Deux signatures à découvrir.</h2></div>
      <div class="region-brand-grid" style="margin-top:2.5rem;">
        ${brands.slice(0, 2).map(b => `
          <a href="/vin-chinois/marque/${b.slug}" data-nav="/vin-chinois/marque/${b.slug}" class="brand-card reveal">
            <div class="editorial-img aspect-4-5"><img src="${b.image}" alt="${b.name}" loading="lazy"/></div>
            <div style="margin-top:1rem;">
              <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#9E814B;">${b.style}</p>
              <h3 class="font-serif" style="margin-top:.5rem;">${b.name}</h3>
            </div>
          </a>`).join('')}
      </div>
    </div>
  </section>` : ''}
</div>`;
}

export function renderWineBrand(slug, t) {
  const brand = WINE_BRANDS.find(b => b.slug === slug);
  if (!brand) return renderChineseWine(t);
  const region = REGIONS.find(r => r.slug === brand.region);
  return `
<div style="padding-top:8rem;">
  <section class="px-6-12 pb-16">
    <div class="max-1280">
      <a href="/vin-chinois/region/${brand.region}" data-nav="/vin-chinois/region/${brand.region}" class="back-link">← ${region?.name}</a>
      <div class="reveal"><h1 class="font-serif" style="margin-top:1.5rem;">${brand.name}</h1></div>
      <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#9E814B;margin-top:.5rem;">${brand.style}</p>
    </div>
  </section>
  <section class="px-6-12" style="margin-bottom:4rem;">
    <div class="max-1280 reveal"><div class="editorial-img aspect-16-9"><img src="${brand.image}" alt="${brand.name}" loading="lazy"/></div></div>
  </section>
  <section class="px-6-12 pb-20">
    <div class="max-1280">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;">
        <div class="reveal">
          <p class="overline">Le domaine</p>
          <h2 class="font-serif" style="margin-top:.75rem;font-size:clamp(1.25rem,2vw,1.625rem);">Description</h2>
          <p style="margin-top:1.5rem;font-family:'Outfit',sans-serif;color:#555049;line-height:1.6;">${brand.description}</p>
        </div>
        <div class="reveal" style="transition-delay:120ms;">
          <p class="overline">Histoire</p>
          <h2 class="font-serif" style="margin-top:.75rem;font-size:clamp(1.25rem,2vw,1.625rem);">Origine</h2>
          <p style="margin-top:1.5rem;font-family:'Outfit',sans-serif;color:#555049;line-height:1.6;">${brand.history}</p>
        </div>
      </div>
    </div>
  </section>
  <div class="cta-banner">
    <div class="max-1280">
      <p class="overline overline-white">Capital Prestige</p>
      <h2 class="font-serif" style="color:#fff;margin-top:1.5rem;font-size:clamp(1.375rem,2.5vw,2rem);">Découvrir ${brand.name} en dégustation privée.</h2>
      <a href="/contact" data-nav="/contact" class="btn-light" style="margin-top:2.5rem;">Demander l'accès <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>
    </div>
  </div>
</div>`;
}
