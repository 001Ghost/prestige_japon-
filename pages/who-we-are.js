import { IMAGES } from '../config.js';

export function renderWho(container, t){
  container.innerHTML = `

  <!-- HERO MAGAZINE STYLE -->
  <section class="relative h-[55vh] min-h-[420px] flex items-end">
    <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2200" class="absolute inset-0 w-full h-full object-cover">
    <div class="hero-overlay absolute inset-0"></div>
    <div class="hero-content pb-12">
      <div class="max-w-2xl reveal">
        <div class="overline overline-white mb-4">About us</div>
        <h1 class="hero-headline">Education first. Culture always.</h1>
        <p class="text-white/80 mt-5 text-[16px] leading-relaxed">
          We study, document and explain Baijiu and Chinese wines through history, terroir and tasting culture.
          Our goal is simple: make complex traditions accessible with clarity and accuracy.
        </p>
      </div>
    </div>
  </section>

  <!-- EDITORIAL INTRO -->
  <section class="py-14 md:py-16">
    <div class="max-w-4xl mx-auto px-6 text-center reveal">
      <p class="text-[18px] leading-relaxed text-[var(--text-secondary)]">
        Baijiu is the most consumed spirit on Earth, yet remains widely misunderstood outside China.
        Chinese wine is one of the fastest-growing wine cultures in the world, yet still largely unexplored.
        This platform exists to bridge that knowledge gap.
      </p>
    </div>
  </section>

  <!-- STORY BLOCK 1 -->
  <section class="py-16 bg-[var(--bg-secondary)]">
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600" class="rounded-xl shadow-lg">
      <div class="reveal">
        <h2 class="font-serif text-3xl mb-4">Why we created this project</h2>
        <p class="text-[15px] text-[var(--text-secondary)] leading-relaxed">
          Outside China, Baijiu is often reduced to stereotypes.
          In reality, it represents more than 2000 years of fermentation science,
          ritual and culinary tradition. We created this platform to present
          facts, history and tasting knowledge in a clear and structured way.
        </p>
      </div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section class="py-18">
    <div class="max-w-5xl mx-auto px-6">
      <div class="overline mb-8">Baijiu timeline</div>
      <div class="space-y-10">

        <div class="grid md:grid-cols-4 gap-4 items-start">
          <div class="font-serif text-2xl">2000+ years</div>
          <div class="md:col-span-3 text-[var(--text-secondary)]">
            Early grain fermentations appear during the Han dynasty. Ancient fermentation starters (qū) begin shaping Chinese distillation culture.
          </div>
        </div>

        <div class="grid md:grid-cols-4 gap-4 items-start">
          <div class="font-serif text-2xl">Yuan dynasty</div>
          <div class="md:col-span-3 text-[var(--text-secondary)]">
            Distillation techniques become widespread across China, giving birth to early forms of Baijiu.
          </div>
        </div>

        <div class="grid md:grid-cols-4 gap-4 items-start">
          <div class="font-serif text-2xl">Ming & Qing</div>
          <div class="md:col-span-3 text-[var(--text-secondary)]">
            Regional styles and aroma families develop. Traditional pit fermentation methods emerge.
          </div>
        </div>

        <div class="grid md:grid-cols-4 gap-4 items-start">
          <div class="font-serif text-2xl">Modern era</div>
          <div class="md:col-span-3 text-[var(--text-secondary)]">
            Baijiu becomes the world’s most consumed spirit and a central part of Chinese culinary culture.
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- STORY BLOCK 2 -->
  <section class="py-16 bg-[var(--bg-secondary)]">
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
      <div class="reveal">
        <h2 class="font-serif text-3xl mb-4">A scientific and cultural approach</h2>
        <p class="text-[15px] text-[var(--text-secondary)] leading-relaxed">
          From fermentation starters (qū) to aroma families, terroirs and rituals,
          we explain Baijiu and Chinese wines with an educational and factual lens.
          No marketing myths. Only culture, history and tasting knowledge.
        </p>
      </div>
      <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600" class="rounded-xl shadow-lg">
    </div>
  </section>

  <!-- VALUES GRID -->
  <section class="py-18">
    <div class="max-w-6xl mx-auto px-6">
      <div class="overline mb-6">Our mission</div>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div class="p-6 border border-[var(--border-light)] rounded-lg">
          <h3 class="font-serif text-xl mb-2">Education</h3>
          <p class="text-sm text-[var(--text-secondary)]">Clear and accessible learning resources.</p>
        </div>
        <div class="p-6 border border-[var(--border-light)] rounded-lg">
          <h3 class="font-serif text-xl mb-2">Culture</h3>
          <p class="text-sm text-[var(--text-secondary)]">Respecting heritage and rituals.</p>
        </div>
        <div class="p-6 border border-[var(--border-light)] rounded-lg">
          <h3 class="font-serif text-xl mb-2">Science</h3>
          <p class="text-sm text-[var(--text-secondary)]">Fermentation, terroir and tasting analysis.</p>
        </div>
        <div class="p-6 border border-[var(--border-light)] rounded-lg">
          <h3 class="font-serif text-xl mb-2">Clarity</h3>
          <p class="text-sm text-[var(--text-secondary)]">Facts over marketing narratives.</p>
        </div>
      </div>
    </div>
  </section>

  `;
}