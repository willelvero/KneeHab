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
    document.body.classList.remove('nav-open-lock');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn && nav) {
    openBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = nav.classList.toggle('is-open');
      openBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
  }
  // Tap outside the open dropdown to close it.
  document.addEventListener('click', function (e) {
    if (!nav || !nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || (openBtn && openBtn.contains(e.target))) return;
    closeNav();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // --- Video carousels (prev/next + single-play) ---
  var carBtns = document.querySelectorAll('.carousel-btn');
  carBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var scope = btn.closest('.carousel-panel') || btn.closest('section');
      var track = scope && scope.querySelector('.carousel-track');
      if (!track) return;
      var card = track.querySelector('.vid-card');
      var step = card ? card.getBoundingClientRect().width + 18 : 280;
      track.scrollBy({ left: btn.getAttribute('data-dir') === 'next' ? step : -step, behavior: 'smooth' });
    });
  });
  var vids = document.querySelectorAll('.vid-el');
  vids.forEach(function (v) {
    v.addEventListener('play', function () {
      vids.forEach(function (o) { if (o !== v) o.pause(); });
    });
  });

  // --- Results carousel: dropdown switches the active category panel ---
  var resultsFilter = document.getElementById('results-cat');
  if (resultsFilter) {
    var panels = document.querySelectorAll('.results-panels .carousel-panel');
    var showCat = function (cat) {
      panels.forEach(function (p) {
        var match = p.getAttribute('data-cat') === cat;
        p.hidden = !match;
        if (!match) {
          p.querySelectorAll('.vid-el').forEach(function (v) { v.pause(); });
        }
      });
    };
    resultsFilter.addEventListener('change', function () { showCat(resultsFilter.value); });
    showCat(resultsFilter.value);
  }

  // --- Product color galleries (swipe + swatch dots) ---
  document.querySelectorAll('[data-gallery]').forEach(function (gal) {
    var track = gal.querySelector('.gallery-track');
    var slides = gal.querySelectorAll('.gallery-slide');
    var dots = gal.querySelectorAll('.gallery-dot');
    if (!track || !slides.length) return;

    var setActive = function (i) {
      dots.forEach(function (d, di) {
        var on = di === i;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    };

    // Click a swatch -> scroll to that color.
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var i = parseInt(dot.getAttribute('data-i'), 10) || 0;
        gal.classList.add('is-touched');
        track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
        setActive(i);
      });
    });

    // Sync active swatch with manual swipe/scroll.
    var raf;
    track.addEventListener('scroll', function () {
      gal.classList.add('is-touched');
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var i = Math.round(track.scrollLeft / track.clientWidth);
        if (i < 0) i = 0; if (i > slides.length - 1) i = slides.length - 1;
        setActive(i);
      });
    }, { passive: true });
  }, this);

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
