/* ════════════════════════════════════════════════════════
   APP.JS — Point d'entrée principal, routeur & i18n
   Ce fichier orchestre tout le site.
════════════════════════════════════════════════════════ */
import { T } from './config.js';
import { revealObserver } from './helpers.js';

// Pages
import { renderHome }              from '../pages/home.js';
import { renderWhoWeAre }          from '../pages/who-we-are.js';
import { renderBaijiu, renderBaijiuFlavor, renderBaijiuBrand } from '../pages/baijiu.js';
import { renderChineseWine, renderWineRegion, renderWineBrand } from '../pages/wine.js';
import { renderAcademie, renderPrivateExpositions, renderEvents, renderContact } from '../pages/other-pages.js';

/* ════════════════════════════════════════════════════════
   ÉTAT & LANGUE
════════════════════════════════════════════════════════ */
let lang = localStorage.getItem('cp-lang') || 'fr';
const t  = () => T[lang] || T.fr;

// Expose router globalement pour la carte SVG
window.router = (path) => router(path);

/* ════════════════════════════════════════════════════════
   I18N
════════════════════════════════════════════════════════ */
function setLang(l) {
  lang = l;
  localStorage.setItem('cp-lang', l);
  document.documentElement.lang = l;
  updateLangButtons();
  updateI18n();
  router();
}

function updateLangButtons() {
  const isDark = document.getElementById('main-navbar').classList.contains('on-dark-hero');
  document.querySelectorAll('.lang-btn').forEach(b => {
    const active = b.dataset.lang === lang;
    b.style.opacity = active ? '1' : '0.4';
    b.style.color   = active ? (isDark ? '#C5A059' : '#6B0F1A') : '';
  });
}

function updateI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const parts = el.dataset.i18n.split('.');
    let val = t();
    for (const p of parts) val = val?.[p];
    if (val) el.textContent = val;
  });
}

/* ════════════════════════════════════════════════════════
   ROUTEUR
════════════════════════════════════════════════════════ */
function router(path) {
  path = path || location.pathname;
  const app    = document.getElementById('app');
  const navbar = document.getElementById('main-navbar');
  window.scrollTo(0, 0);
  closeMobileMenu();

  // Rendu de la page correspondante
  const isHome = path === '/';
  if      (path === '/')                           app.innerHTML = renderHome(t);
  else if (path === '/who-we-are')                 app.innerHTML = renderWhoWeAre(t);
  else if (path === '/baijiu')                     app.innerHTML = renderBaijiu(t);
  else if (path.startsWith('/baijiu/saveur/'))     app.innerHTML = renderBaijiuFlavor(path.replace('/baijiu/saveur/',''), t);
  else if (path.startsWith('/baijiu/marque/'))     app.innerHTML = renderBaijiuBrand(path.replace('/baijiu/marque/',''), t);
  else if (path === '/chinese-wine' || path === '/vin-chinois') app.innerHTML = renderChineseWine(t, lang);
  else if (path.startsWith('/vin-chinois/region/')) app.innerHTML = renderWineRegion(path.replace('/vin-chinois/region/',''), t, lang);
  else if (path.startsWith('/vin-chinois/marque/')) app.innerHTML = renderWineBrand(path.replace('/vin-chinois/marque/',''), t);
  else if (path === '/prestige-academie')          app.innerHTML = renderAcademie(t);
  else if (path === '/private-expositions')        app.innerHTML = renderPrivateExpositions(t);
  else if (path === '/events')                     app.innerHTML = renderEvents(t);
  else if (path === '/contact')                    app.innerHTML = renderContact(t);
  else                                             app.innerHTML = renderHome(t);

  // État de la navbar
  if (isHome) {
    navbar.classList.remove('scrolled', 'light-page');
    navbar.classList.add('on-dark-hero');
    window.addEventListener('scroll', handleHomeScroll);
  } else {
    navbar.classList.remove('on-dark-hero', 'scrolled');
    navbar.classList.add('light-page');
    window.removeEventListener('scroll', handleHomeScroll);
  }

  // Liens actifs
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.remove('active');
    const navPath = el.dataset.nav;
    if (navPath === path || (navPath !== '/' && path.startsWith(navPath.split('/').slice(0, 2).join('/')))) {
      el.classList.add('active');
    }
  });

  updateI18n();
  updateLangButtons();
  setTimeout(() => revealObserver(), 50);
}

/* ════════════════════════════════════════════════════════
   SCROLL HANDLER (page d'accueil seulement)
════════════════════════════════════════════════════════ */
function handleHomeScroll() {
  const navbar  = document.getElementById('main-navbar');
  const scrolled = window.scrollY > 24;
  navbar.classList.toggle('scrolled',     scrolled);
  navbar.classList.toggle('on-dark-hero', !scrolled);
  updateLangButtons();
}

/* ════════════════════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════════════════════ */
function navigate(path) {
  history.pushState({}, '', path);
  router(path);
}

// Délégation globale des clics pour tous les liens [data-nav]
document.addEventListener('click', e => {
  const el = e.target.closest('[data-nav]');
  if (el) {
    const href = el.dataset.nav;
    if (href && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  }
});

window.addEventListener('popstate', () => router(location.pathname));

/* ════════════════════════════════════════════════════════
   MENU MOBILE
════════════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) { closeMobileMenu(); }
  else {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
  }
});

/* ════════════════════════════════════════════════════════
   BOUTONS DE LANGUE
════════════════════════════════════════════════════════ */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

/* ════════════════════════════════════════════════════════
   DÉMARRAGE
════════════════════════════════════════════════════════ */
document.documentElement.lang = lang;
router(location.pathname);
updateI18n();
updateLangButtons();
