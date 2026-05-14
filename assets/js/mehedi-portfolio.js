(function () {
  'use strict';

  var nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  var toggle = document.getElementById('mobileToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        toggle.textContent = '☰';
      } else {
        menu.style.display = 'flex';
        toggle.textContent = '✕';
      }
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.style.display = 'none';
        toggle.textContent = '☰';
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('.nav-logo').forEach(function (l) {
    l.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function (el) { obs.observe(el); });

  var overlay = document.getElementById('videoOverlay');
  var iframe = document.getElementById('videoIframe');
  var modalTitle = document.getElementById('videoModalTitle');
  var modalClose = document.getElementById('videoModalClose');

  function ensureVideoModal() {
    if (overlay && iframe && modalTitle) return;
    var wrapper = document.createElement('div');
    wrapper.innerHTML =
      '<div id="videoOverlay" class="video-modal-overlay" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="videoModalTitle">' +
      '<div class="video-modal"><div class="video-modal-header">' +
      '<h3 id="videoModalTitle">ভিডিও</h3>' +
      '<button id="videoModalClose" class="video-modal-close" type="button" aria-label="Close video">&times;</button>' +
      '</div><div class="video-frame-wrap">' +
      '<iframe id="videoIframe" src="" title="Portfolio Video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
      '</div></div></div>';
    document.body.appendChild(wrapper.firstElementChild);
    overlay = document.getElementById('videoOverlay');
    iframe = document.getElementById('videoIframe');
    modalTitle = document.getElementById('videoModalTitle');
    modalClose = document.getElementById('videoModalClose');
  }

  function normalizeVideoUrl(url) {
    if (!url) return '';
    if (url.indexOf('youtube.com/watch') !== -1) {
      var id = '';
      try {
        id = new URL(url, window.location.origin).searchParams.get('v') || '';
      } catch (e) {
        var m = url.match(/[?&]v=([^&]+)/);
        id = m ? m[1] : '';
      }
      if (id) return 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    }
    if (url.indexOf('youtu.be/') !== -1) {
      var shortId = (url.split('youtu.be/')[1] || '').split('?')[0];
      if (shortId) return 'https://www.youtube.com/embed/' + shortId + '?autoplay=1&rel=0';
    }
    return url;
  }

  ensureVideoModal();

  document.querySelectorAll('.video-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (!overlay || !iframe || !modalTitle) return;
      var url = normalizeVideoUrl(card.getAttribute('data-embed') || '');
      var title = card.getAttribute('data-title') || 'Video';
      iframe.src = url;
      modalTitle.textContent = title;
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
    });
  });

  if (overlay && iframe) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        iframe.src = '';
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
    if (modalClose) {
      modalClose.addEventListener('click', function () {
        iframe.src = '';
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      });
    }
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.style.display === 'flex') {
        iframe.src = '';
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
  }
})();
