(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero: open the frames column by column, then the text cell */
  const hero = document.querySelector('.hero');
  hero.querySelectorAll('.col').forEach((col, c) => {
    col.querySelectorAll('.frame img').forEach((img, r) => img.style.setProperty('--d', `${c * 0.08 + r * 0.12}s`));
  });
  hero.querySelector('.cell-photo').style.setProperty('--d', '0.2s');
  [...hero.querySelector('.cell-text').children].forEach((el, i) => el.style.setProperty('--d', `${0.35 + i * 0.07}s`));
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));

  /* Hero columns drift at different speeds as the page scrolls */
  const cols = [...hero.querySelectorAll('.col')];
  const speeds = [0.10, -0.06, 0.04, -0.09, 0.07];
  if (!reduce && matchMedia('(min-width: 720px)').matches) {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight);
        cols.forEach((col, i) => { col.style.transform = `translateY(${y * speeds[i]}px)`; });
        ticking = false;
      });
    }, { passive: true });
  }

  /* Section entrances: heading, then text, then pictures, staggered */
  const groups = [
    ...document.querySelectorAll('.rail-pin, .rail-title, .project, .about-photo, .about-text, .facts, .list, .contact-say, .form, .footer'),
  ];
  groups.forEach(group => {
    const parts = group.matches('.project')
      ? [group.querySelector('.strip'), group.querySelector('.caption'), ...group.querySelector('.body').children]
      : group.matches('.list, .footer, .facts') ? [...group.querySelectorAll('.section-title, .rows li, .group, .tile, .facts > div')]
      : [...group.children];
    parts.forEach((el, i) => {
      el.dataset.reveal = '';
      el.style.setProperty('--d', `${Math.min(i, 10) * 0.075}s`);
    });
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  /* The CalenDue film plays only while it is on screen */
  const clip = document.querySelector('.clip');
  if (clip && !reduce) {
    new IntersectionObserver(([e]) => { e.isIntersecting ? clip.play().catch(() => {}) : clip.pause(); }, { threshold: 0.4 }).observe(clip);
  }

  /* Sorting: the same twelve projects, re-ordered by what mattered */
  const list = document.getElementById('projects');
  const note = document.getElementById('sort-note');
  const buttons = [...document.querySelectorAll('.sort')];
  const notes = {
    strongest: 'The ones with the most behind them come first.',
    learned: 'Ordered by how much each one taught me.',
    proud: 'Ordered by how proud I am of each one.',
    built: 'Oldest first, in the order I built them.',
  };

  function sortBy(key, animate = true) {
    const items = [...list.children];
    const before = new Map(items.map(el => [el, el.getBoundingClientRect().top]));
    items.sort((a, b) => a.dataset[key] - b.dataset[key]).forEach(el => list.appendChild(el));

    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sort === key)));
    note.textContent = notes[key];

    items.forEach(el => {
      const why = el.querySelector('.why');
      const text = why.dataset[`why${key[0].toUpperCase()}${key.slice(1)}`];
      if (!animate || reduce) { why.textContent = text; return; }
      why.classList.add('swap');
      setTimeout(() => { why.textContent = text; why.classList.remove('swap'); }, 220);
    });

    if (!animate || reduce) return;
    items.forEach(el => {
      el.classList.add('in');
      el.querySelectorAll('[data-reveal]').forEach(p => p.classList.add('in'));
      const dy = before.get(el) - el.getBoundingClientRect().top;
      if (!dy) return;
      el.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.16,1,.3,1)' });
    });
  }

  buttons.forEach(b => b.addEventListener('click', () => {
    sortBy(b.dataset.sort);
    const url = new URL(location.href);
    b.dataset.sort === 'strongest' ? url.searchParams.delete('sort') : url.searchParams.set('sort', b.dataset.sort);
    history.replaceState(null, '', url);
    const top = document.getElementById('work').getBoundingClientRect().top;
    if (top < -40) document.getElementById('work').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));
  const initial = new URLSearchParams(location.search).get('sort');
  if (initial && notes[initial]) sortBy(initial, false);

  /* Saskatoon time, which never changes for daylight saving */
  const clock = document.getElementById('clock');
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Regina', hour: 'numeric', minute: '2-digit' });
  const tick = () => { clock.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 15000);

  /* Contact form: send without leaving the page; the plain form still works without this */
  const form = document.getElementById('contact-form');
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    try {
      const res = await fetch('https://formsubmit.co/ajax/ayotundeogunade13@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = 'Sent. I will get back to you soon.';
    } catch {
      status.textContent = 'That did not send. Email me at ayotundeogunade13@gmail.com instead.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
})();
