/* ── Modal ── */
function openModal(id, courseName) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
  if (courseName) {
    const el = document.getElementById('selected-course');
    if (el) el.value = courseName;
  }
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal(backdrop.id);
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
});

/* ── Stationery / stab tabs ── */
document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    btn.closest('.modal').querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    btn.closest('.modal').querySelectorAll('.stab-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('tab-' + tab).classList.remove('hidden');
  });
});

/* ── Form submit ── */
function handleSubmit(e, modalId) {
  e.preventDefault();
  const form = e.target;
  const successHTML = '<div style="text-align:center;padding:32px 0"><p style="font-size:2.5rem">✓</p><p style="color:var(--green);font-size:1.2rem;font-weight:700;margin-top:12px">Request received!</p><p style="color:var(--text-dim);margin-top:8px">We\'ll be in touch on WhatsApp or email shortly.</p></div>';
  if (modalId === 'inline-consult') {
    form.innerHTML = successHTML;
  } else {
    form.innerHTML = successHTML;
    setTimeout(() => closeModal(modalId), 3000);
  }
}

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal-up, .reveal-section').forEach(el => revealObserver.observe(el));

/* ── Hero Parallax ── */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
}, { passive: true });

/* ── 3D Tilt on cards ── */
const TILT_MAX = 10;
document.querySelectorAll('.service-card, .portfolio-card, .contact-card, .dept-card, .course-card, .catalog-item').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const tx = ((r.height / 2 - (e.clientY - r.top))  / (r.height / 2)) * TILT_MAX;
    const ty = (((e.clientX - r.left) - r.width / 2)  / (r.width  / 2)) * TILT_MAX;
    card.style.setProperty('--tx', `${tx.toFixed(2)}deg`);
    card.style.setProperty('--ty', `${ty.toFixed(2)}deg`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tx', '0deg');
    card.style.setProperty('--ty', '0deg');
  });
});

/* ── Magnetic Buttons ── */
const MAGNETIC_RANGE = 60;
const MAGNETIC_PULL  = 0.38;
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('pointermove', (e) => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    if (Math.sqrt(dx*dx + dy*dy) < MAGNETIC_RANGE) {
      btn.style.transform = `translate(${dx * MAGNETIC_PULL}px, ${dy * MAGNETIC_PULL}px) scale(1.04)`;
    }
  });
  btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
});

/* ── Staggered card entrance ── */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.service-card, .dept-card, .course-card, .catalog-item').forEach(card => {
  card.style.animationPlayState = 'paused';
  cardObserver.observe(card);
});
