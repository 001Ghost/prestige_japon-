/* ════════════════════════════════════════════════════════
   PAGE : ACCUEIL (/)
════════════════════════════════════════════════════════ */
import { IMAGES } from '../js/config.js';
import { arrowSVG } from '../js/helpers.js';

export function renderHome(t) {
  const tr = t().home;
  const prevImgs = [IMAGES.baijiuPour, IMAGES.wineBottle, IMAGES.wineClass, IMAGES.gala];
  return `
<div>
  <!-- HERO -->
  <section class="hero-section" style="margin-top:-80px;">
    <img class="hero-bg" src="${IMAGES.heroAlt}" alt="Capital Prestige" loading="eager" />
    <div class="hero-overlay-div hero-overlay"></div>
    <div class="hero-content">
      <div class="reveal" style="transition-delay:0ms;">
        <p class="overline" style="color:#C5A059;margin-bottom:2rem;">${tr.overline}</p>
      </div>
      <div class="reveal" style="transition-delay:120ms;">
        <h1 class="hero-headline">${tr.headline}</h1>
      </div>
      <div class="reveal" style="transition-delay:260ms;">
        <div style="margin-top:2.5rem;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:2.5rem;">
          <p style="font-family:'Outfit',sans-serif;color:rgba(255,255,255,.85);font-size:1.0625rem;max-width:28rem;line-height:1.6;">${tr.subhead}</p>
          <div style="display:flex;flex-wrap:wrap;gap:1rem;">
            <a href="/baijiu" data-nav="/baijiu" class="btn-light">${tr.ctaB2C} ${arrowSVG()}</a>
            <a href="/events" data-nav="/events" class="btn-ghost" style="background:transparent;color:#fff;border-color:#fff;">${tr.ctaB2B} ${arrowSVG()}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-scroll">
      <span class="overline" style="color:rgba(255,255,255,.7);letter-spacing:.28em;">${tr.scroll}</span>
      <div class="hero-scroll-line"></div>
    </div>
  </section>

  <!-- AUTHORITY -->
  <section class="px-6-12 py-24" style="margin-top:80px;">
    <div class="max-1440 grid-12" style="align-items:flex-end;">
      <div class="col-7 reveal">
        <p class="overline">${tr.authorityOverline}</p>
        <h2 class="font-serif" style="font-size:clamp(2.25rem,5vw,4.5rem);line-height:1.05;margin-top:1.5rem;letter-spacing:-.01em;max-width:48rem;">${tr.authorityTitle}</h2>
      </div>
      <div class="col-4-start-9 reveal" style="transition-delay:120ms;">
        <ul class="authority-list">
          ${tr.authorityBullets.map((b, i) => `<li><span class="authority-num">0${i + 1}</span>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <!-- JOURNEY -->
  <section class="px-6-12 py-24" style="background:#F5F4F0;">
    <div class="max-1440">
      <div class="reveal">
        <p class="overline">${tr.journeysOverline}</p>
        <h2 class="font-serif" style="font-size:clamp(2rem,4vw,3.75rem);line-height:1.05;margin-top:1.5rem;letter-spacing:-.01em;max-width:48rem;">${tr.journeysTitle}</h2>
      </div>
      <div class="journey-grid" style="margin-top:4rem;">
        <div class="reveal">
          <a href="/private-expositions" data-nav="/private-expositions" style="display:block;cursor:pointer;">
            <div class="editorial-img aspect-4-5"><img src="${IMAGES.baijiuPour}" alt="${tr.journeyB2C.title}" loading="lazy"/></div>
            <div style="margin-top:2rem;">
              <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#6B0F1A;">${tr.journeyB2C.kicker}</p>
              <h3 class="font-serif" style="font-size:clamp(1.625rem,2.5vw,2.25rem);margin-top:1rem;line-height:1.1;">${tr.journeyB2C.title}</h3>
              <p style="margin-top:1.25rem;font-family:'Outfit',sans-serif;font-size:15px;color:#555049;line-height:1.6;max-width:28rem;">${tr.journeyB2C.body}</p>
              <span class="cp-link" style="display:inline-flex;align-items:center;gap:.5rem;margin-top:2rem;font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#6B0F1A;">${tr.journeyB2C.cta} ${arrowSVG(14)}</span>
            </div>
          </a>
        </div>
        <div class="reveal" style="transition-delay:140ms;">
          <a href="/events" data-nav="/events" style="display:block;cursor:pointer;">
            <div class="editorial-img aspect-4-5"><img src="${IMAGES.wineBottle}" alt="${tr.journeyB2B.title}" loading="lazy"/></div>
            <div style="margin-top:2rem;">
              <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#6B0F1A;">${tr.journeyB2B.kicker}</p>
              <h3 class="font-serif" style="font-size:clamp(1.625rem,2.5vw,2.25rem);margin-top:1rem;line-height:1.1;">${tr.journeyB2B.title}</h3>
              <p style="margin-top:1.25rem;font-family:'Outfit',sans-serif;font-size:15px;color:#555049;line-height:1.6;max-width:28rem;">${tr.journeyB2B.body}</p>
              <span class="cp-link" style="display:inline-flex;align-items:center;gap:.5rem;margin-top:2rem;font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#6B0F1A;">${tr.journeyB2B.cta} ${arrowSVG(14)}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- PREVIEWS -->
  <section class="px-6-12 py-24">
    <div class="max-1440">
      <div class="reveal">
        <p class="overline">${tr.previewsOverline}</p>
        <h2 class="font-serif" style="font-size:clamp(2rem,4vw,3.75rem);line-height:1.05;margin-top:1.5rem;max-width:48rem;">${tr.previewsTitle}</h2>
      </div>
      <div class="preview-grid" style="margin-top:4rem;">
        ${tr.previews.map((p, i) => `
          <div class="reveal" style="transition-delay:${i * 90}ms;">
            <a href="${p.to}" data-nav="${p.to}" style="display:block;cursor:pointer;">
              <div class="editorial-img" style="aspect-ratio:5/6;"><img src="${prevImgs[i]}" alt="${p.title}" loading="lazy"/></div>
              <div style="margin-top:1.5rem;display:flex;align-items:flex-start;justify-content:space-between;gap:1.5rem;">
                <div>
                  <p class="overline">${p.tag}</p>
                  <h3 class="font-serif" style="font-size:clamp(1.5rem,2.2vw,2rem);margin-top:.75rem;line-height:1.15;">${p.title}</h3>
                  <p style="margin-top:.75rem;font-family:'Outfit',sans-serif;font-size:15px;color:#555049;max-width:22rem;line-height:1.6;">${p.desc}</p>
                </div>
                <span style="color:rgba(10,10,10,.4);margin-top:.75rem;flex-shrink:0;">${arrowSVG(22)}</span>
              </div>
            </a>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- PARTNERSHIP -->
  <section class="partnership-section">
    <img src="${IMAGES.wineCellar}" alt="" loading="lazy" />
    <div class="partnership-overlay"></div>
    <div class="partnership-content">
      <div class="reveal"><p class="overline" style="color:#E5D397;">${tr.partnershipOverline}</p></div>
      <div class="reveal" style="transition-delay:100ms;">
        <h2 class="font-serif" style="color:#fff;font-size:clamp(1.75rem,4vw,3.75rem);line-height:1.08;letter-spacing:-.01em;margin-top:2rem;">${tr.partnershipTitle}</h2>
      </div>
      <div class="reveal" style="transition-delay:200ms;">
        <p style="font-family:'Outfit',sans-serif;color:rgba(255,255,255,.8);font-size:1.0625rem;margin-top:2rem;max-width:36rem;line-height:1.6;">${tr.partnershipBody}</p>
      </div>
      <div class="reveal" style="transition-delay:300ms;">
        <a href="/contact" data-nav="/contact" class="btn-light" style="margin-top:3rem;">${tr.partnershipCta} ${arrowSVG()}</a>
      </div>
    </div>
  </section>
</div>`;
}
