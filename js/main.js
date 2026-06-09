// KneeHab — main script: mobile nav, scroll reveals, sticky-header state.

(function () {
  'use strict';

  // --- Mobile nav open/close ---
  var openBtn = document.getElementById('nav-open');
  var closeBtn = document.getElementById('nav-close');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn && nav) {
    openBtn.addEventListener('click', function () {
      nav.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // --- Sticky header state on scroll ---
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Scroll reveals ---
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    reveals.forEach(function (el) { io.observe(el); });
  }
})();
