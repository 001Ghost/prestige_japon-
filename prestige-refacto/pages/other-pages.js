/* ════════════════════════════════════════════════════════
   PAGE : PRESTIGE ACADÉMIE (/prestige-academie)
════════════════════════════════════════════════════════ */
import { IMAGES } from '../js/config.js';
import { arrowSVG } from '../js/helpers.js';

export function renderAcademie(t) {
  const tr = t().academie;
  const epImgs = [IMAGES.champagneHouse, IMAGES.wineCellar, IMAGES.bordeauxChateau];
  return `
<div style="padding-top:8rem;">
  <section class="px-6-12 pb-20">
    <div class="max-1440 grid-12" style="align-items:flex-end;">
      <div style="grid-column:span 8;">
        <div class="reveal">
          <p class="overline">${tr.overline}</p>
          <p style="font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#9E814B;margin-top:.5rem;">${tr.brandName}</p>
        </div>
        <div class="reveal" style="transition-delay:100ms;"><h1 class="font-serif" style="margin-top:2rem;">${tr.title}</h1></div>
      </div>
      <div class="reveal" style="transition-delay:200ms;grid-column:span 4;">
        <p style="font-family:'Outfit',sans-serif;font-size:1.0625rem;color:#555049;line-height:1.6;">${tr.lead}</p>
        <a href="${tr.youtubeUrl}" target="_blank" rel="noopener" class="cp-link" style="display:inline-flex;align-items:center;gap:.5rem;margin-top:2rem;font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#6B0F1A;">${tr.ctaWatch} ${arrowSVG(14)}</a>
      </div>
    </div>
  </section>

  <section class="px-6-12" style="margin-bottom:8rem;">
    <div style="max-width:1640px;margin:0 auto;" class="reveal">
      <div class="editorial-img aspect-21-9"><img src="${IMAGES.wineClass}" alt="${tr.title}" loading="lazy"/></div>
    </div>
  </section>

  <section class="px-6-12 py-24">
    <div class="max-1440">
      <div class="grid-12" style="align-items:flex-end;">
        <div class="col-7 reveal">
          <p class="overline">${tr.videoOverline}</p>
          <h2 class="font-serif" style="font-size:clamp(2rem,4vw,3.5rem);line-height:1.05;margin-top:1.5rem;">${tr.masterClassTitle}</h2>
        </div>
        <div class="col-4-start-9 reveal" style="transition-delay:120ms;">
          <p style="font-family:'Outfit',sans-serif;color:#555049;line-height:1.6;">${tr.masterClassBody}</p>
        </div>
      </div>
      <div class="episodes-grid" style="margin-top:4rem;">
        ${tr.episodes.map((ep, i) => `
          <div class="reveal" style="transition-delay:${i * 100}ms;">
            <a href="${tr.youtubeUrl}" target="_blank" rel="noopener" style="display:block;">
              <div class="editorial-img aspect-4-5" style="position:relative;">
                <img src="${epImgs[i]}" alt="${ep.title}" loading="lazy"/>
                <div class="play-btn-overlay">
                  <div class="play-circle"><div class="play-arrow"></div></div>
                </div>
              </div>
              <div style="margin-top:1.5rem;">
                <p class="overline">${ep.tag}</p>
                <h3 class="font-serif" style="font-size:clamp(1.25rem,1.8vw,1.625rem);margin-top:.75rem;line-height:1.15;">${ep.title}</h3>
                <p style="font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#9E814B;margin-top:.75rem;">${ep.host}</p>
                <p style="margin-top:1rem;font-family:'Outfit',sans-serif;font-size:14px;color:#555049;line-height:1.6;">${ep.body}</p>
              </div>
            </a>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="px-6-12 py-32" style="background:#0A0A0A;color:#fff;">
    <div class="max-1440">
      <div class="lbbc-grid">
        <div class="reveal">
          <p class="overline overline-gold">${tr.lbbcOverline}</p>
          <h2 class="font-serif" style="color:#fff;font-size:clamp(1.75rem,3.5vw,2.75rem);margin-top:1.5rem;line-height:1.1;">${tr.lbbcTitle}</h2>
          <p style="font-family:'Outfit',sans-serif;color:rgba(255,255,255,.65);line-height:1.6;margin-top:1.5rem;max-width:32rem;">${tr.lbbcBody}</p>
          <a href="${tr.youtubeUrl}" target="_blank" rel="noopener" class="btn-light" style="margin-top:2.5rem;">${tr.ctaJoin} ${arrowSVG()}</a>
        </div>
        <div class="reveal" style="transition-delay:120ms;">
          <div class="lbbc-stats">
            ${tr.lbbcStats.map(s => `<div class="lbbc-stat"><div class="num">${s.num}</div><div class="label">${s.label}</div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`;
}

/* ════════════════════════════════════════════════════════
   PAGE : EXPOSITIONS PRIVÉES (/private-expositions)
════════════════════════════════════════════════════════ */
export function renderPrivateExpositions(t) {
  const tr = t().expositions;
  const imgs = [IMAGES.privateDinner, IMAGES.tasting, IMAGES.cultural, IMAGES.vineyard];
  return `
<div style="padding-top:8rem;">
  <section class="px-6-12 pb-20">
    <div class="max-1440">
      <div class="reveal"><p class="overline">${tr.overline}</p></div>
      <div class="reveal" style="transition-delay:100ms;"><h1 class="font-serif" style="margin-top:2rem;">${tr.title}</h1></div>
      <div class="reveal" style="transition-delay:200ms;"><p style="font-family:'Outfit',sans-serif;font-size:1.0625rem;color:#555049;line-height:1.6;margin-top:2.5rem;max-width:40rem;">${tr.lead}</p></div>
    </div>
  </section>

  ${tr.items.map((item, i) => `
    <section class="${i % 2 === 0 ? 'exposition-section-light' : 'exposition-section-dark'}">
      <div class="max-1440 px-6-12 py-32">
        <div class="grid-12" style="align-items:center;">
          <div class="reveal col-7" style="${i % 2 === 1 ? 'order:2;grid-column:6/span 7;' : ''}">
            <div class="editorial-img aspect-4-5"><img src="${imgs[i]}" alt="${item.title}" loading="lazy"/></div>
          </div>
          <div class="reveal col-4 ${i % 2 === 1 ? '' : 'col-4-start-9'}" style="transition-delay:120ms;${i % 2 === 1 ? 'order:1;grid-column:2/span 4;' : ''}">
            <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:${i % 2 === 1 ? '#E5D397' : '#6B0F1A'};">${item.kicker}</p>
            <h2 class="font-serif" style="font-size:clamp(2rem,4vw,3rem);margin-top:1.5rem;line-height:1.05;${i % 2 === 1 ? 'color:#fff;' : ''}">${item.title}</h2>
            <p style="margin-top:2rem;font-family:'Outfit',sans-serif;font-size:1rem;line-height:1.6;max-width:28rem;color:${i % 2 === 1 ? 'rgba(255,255,255,.7)' : '#555049'};">${item.body}</p>
          </div>
        </div>
      </div>
    </section>`).join('')}

  <section class="px-6-12 py-32" style="background:#F5F4F0;">
    <div style="max-width:1100px;margin:0 auto;text-align:center;">
      <div class="reveal"><h2 class="font-serif" style="font-size:clamp(1.75rem,3.5vw,2.75rem);">${t().home.partnershipCta}</h2></div>
      <div class="reveal" style="transition-delay:100ms;">
        <a href="/contact" data-nav="/contact" class="btn-primary" style="margin-top:3rem;">${t().contact.emailCta} ${arrowSVG()}</a>
      </div>
    </div>
  </section>
</div>`;
}

/* ════════════════════════════════════════════════════════
   PAGE : ÉVÉNEMENTS (/events)
════════════════════════════════════════════════════════ */
export function renderEvents(t) {
  const tr = t().events;
  const serviceImgs = [IMAGES.gala, IMAGES.tasting, IMAGES.museum, IMAGES.meeting, IMAGES.showroom];
  return `
<div style="padding-top:8rem;">
  <section class="px-6-12 pb-20">
    <div class="max-1440 grid-12" style="align-items:flex-end;">
      <div style="grid-column:span 8;">
        <div class="reveal"><p class="overline">${tr.overline}</p></div>
        <div class="reveal" style="transition-delay:100ms;"><h1 class="font-serif" style="margin-top:2rem;">${tr.title}</h1></div>
      </div>
      <div class="reveal" style="transition-delay:200ms;grid-column:span 4;">
        <p style="font-family:'Outfit',sans-serif;color:#555049;line-height:1.6;">${tr.lead}</p>
      </div>
    </div>
  </section>

  <section class="px-6-12" style="margin-bottom:8rem;">
    <div style="max-width:1640px;margin:0 auto;" class="reveal">
      <div class="editorial-img aspect-21-9"><img src="${IMAGES.gallery}" alt="" loading="lazy"/></div>
    </div>
  </section>

  <section class="px-6-12 py-32" style="background:#0A0A0A;color:#fff;">
    <div class="max-1440">
      <div class="reveal">
        <p class="overline overline-gold">Challenges</p>
        <h2 class="font-serif" style="color:#fff;font-size:clamp(2rem,4vw,3.5rem);margin-top:1.5rem;line-height:1.05;max-width:56rem;">${tr.challengeTitle}</h2>
      </div>
      <div class="challenges-grid" style="margin-top:4rem;">
        ${tr.challenges.map((c, i) => `
          <div class="reveal challenge-card" style="transition-delay:${i * 80}ms;">
            <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#C5A059;">${c.tag}</p>
            <h3 class="font-serif" style="font-size:clamp(1.25rem,1.8vw,1.625rem);margin-top:1rem;color:#fff;">${c.title}</h3>
            <p style="margin-top:1rem;font-family:'Outfit',sans-serif;font-size:14px;color:rgba(255,255,255,.65);line-height:1.6;">${c.body}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="px-6-12 py-32">
    <div class="max-1440">
      <div class="reveal"><p class="overline">${tr.servicesOverline}</p></div>
      <div class="event-services-list">
        ${tr.services.map((s, i) => `
          <div class="event-service-item reveal" style="transition-delay:${(i % 3) * 80}ms;">
            <div class="editorial-img" style="aspect-ratio:${i === 0 || i === 3 ? '16/9' : '4/3'};"><img src="${serviceImgs[i] || serviceImgs[0]}" alt="${s.title}" loading="lazy"/></div>
            <div style="margin-top:1.5rem;">
              <p style="font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#6B0F1A;">0${i + 1}</p>
              <h3 class="font-serif" style="margin-top:.75rem;">${s.title}</h3>
              <p style="margin-top:1rem;font-family:'Outfit',sans-serif;font-size:14px;color:#555049;line-height:1.6;">${s.desc}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="px-6-12 py-32" style="background:#F5F4F0;">
    <div class="max-1440">
      <div class="reveal"><p class="overline">${tr.processOverline}</p><h2 class="font-serif" style="margin-top:1rem;">${tr.processTitle}</h2></div>
      <div style="margin-top:3rem;display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;">
        ${tr.process.map((p, i) => `
          <div class="reveal" style="transition-delay:${i * 100}ms;border-top:1px solid #6B0F1A;padding-top:2rem;">
            <p style="font-family:'Cormorant Garamond',serif;font-size:3rem;color:#6B0F1A;opacity:.3;">${p.num}</p>
            <h3 class="font-serif" style="margin-top:1rem;">${p.title}</h3>
            <p style="margin-top:1rem;font-family:'Outfit',sans-serif;font-size:14px;color:#555049;line-height:1.6;">${p.body}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="px-6-12 py-32" style="background:#6B0F1A;color:#fff;">
    <div style="max-width:1100px;margin:0 auto;text-align:center;">
      <div class="reveal">
        <p class="overline overline-white">${tr.brandsOverline}</p>
        <h2 class="font-serif" style="color:#fff;margin-top:1.5rem;font-size:clamp(1.75rem,3.5vw,2.75rem);">${tr.brandsTitle}</h2>
      </div>
      <div class="reveal" style="transition-delay:100ms;">
        <a href="/contact" data-nav="/contact" class="btn-light" style="margin-top:3rem;">${tr.brandsCta} ${arrowSVG()}</a>
      </div>
    </div>
  </section>
</div>`;
}

/* ════════════════════════════════════════════════════════
   PAGE : CONTACT (/contact)
════════════════════════════════════════════════════════ */
export function renderContact(t) {
  const tr = t().contact;
  return `
<div style="padding-top:8rem;">
  <section class="px-6-12 py-32">
    <div class="max-1440">
      <div class="grid-12">
        <div style="grid-column:span 7;">
          <div class="reveal"><p class="overline">${tr.overline}</p></div>
          <div class="reveal" style="transition-delay:100ms;"><h1 class="font-serif" style="margin-top:2rem;">${tr.title}</h1></div>
          <div class="reveal" style="transition-delay:200ms;">
            <p style="font-family:'Outfit',sans-serif;font-size:1.0625rem;color:#555049;line-height:1.6;margin-top:2rem;max-width:36rem;">${tr.lead}</p>
          </div>
          <div class="reveal" style="transition-delay:280ms;margin-top:3rem;">
            <p style="font-family:'Outfit',sans-serif;font-size:14px;color:#555049;line-height:1.6;margin-bottom:1.5rem;">${tr.emailLabel}</p>
            <a href="mailto:${tr.sidebarEmail}" class="btn-primary">${tr.emailCta} ${arrowSVG()}</a>
          </div>
        </div>
        <div style="grid-column:span 4;grid-column-start:9;" class="reveal" style="transition-delay:150ms;">
          <div class="contact-sidebar">
            <p class="overline">${tr.sidebarTitle}</p>
            <div class="contact-info-row" style="margin-top:2rem;">
              <p style="font-family:'Outfit',sans-serif;font-size:14px;color:#555049;line-height:1.6;">${tr.sidebarBody}</p>
            </div>
            <div class="contact-info-row" style="margin-top:1.5rem;border-top:1px solid rgba(10,10,10,.1);padding-top:1.5rem;">
              <a href="mailto:${tr.sidebarEmail}" style="font-family:'Cormorant Garamond',serif;font-size:1.25rem;color:#6B0F1A;transition:opacity .3s;" onmouseover="this.style.opacity='.7'" onmouseout="this.style.opacity='1'">${tr.sidebarEmail}</a>
            </div>
            <div class="contact-info-row" style="margin-top:1.5rem;border-top:1px solid rgba(10,10,10,.1);padding-top:1.5rem;">
              <p style="font-family:'Outfit',sans-serif;font-size:13px;color:#555049;letter-spacing:.05em;">${tr.sidebarHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`;
}
