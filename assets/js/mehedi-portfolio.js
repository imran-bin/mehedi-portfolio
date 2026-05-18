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

  var faqButtons = document.querySelectorAll('.faq-btn');
  if (faqButtons.length) {
    faqButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var answer = btn.nextElementSibling;
        var willOpen = !btn.classList.contains('open');

        faqButtons.forEach(function (otherBtn) {
          otherBtn.classList.remove('open');
          var otherAnswer = otherBtn.nextElementSibling;
          if (otherAnswer && otherAnswer.classList.contains('faq-answer')) {
            otherAnswer.classList.remove('open');
          }
        });

        if (willOpen) {
          btn.classList.add('open');
          if (answer && answer.classList.contains('faq-answer')) {
            answer.classList.add('open');
          }
        }
      });
    });
  }

  var slider = document.getElementById('heroSlider');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slide'));
    var dotsWrap = document.getElementById('heroSliderDots');
    var subtitle = document.getElementById('heroSubtitle');
    var description = document.getElementById('heroDescription');
    var current = 0;
    var timer = null;

    function render(index) {
      current = index;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === current);
      });
      if (subtitle) {
        subtitle.classList.remove('hero-text-fadeup');
        subtitle.textContent = slides[current].getAttribute('data-subtitle') || '';
        void subtitle.offsetWidth;
        subtitle.classList.add('hero-text-fadeup');
      }
      if (description) {
        description.classList.remove('hero-text-fadeup');
        description.textContent = slides[current].getAttribute('data-description') || '';
        void description.offsetWidth;
        description.classList.add('hero-text-fadeup');
      }
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.hero-slider-dot').forEach(function (dot, i) {
          dot.classList.toggle('active', i === current);
        });
      }
    }

    function start() {
      stop();
      timer = setInterval(function () {
        render((current + 1) % slides.length);
      }, 4500);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    if (dotsWrap && slides.length > 1) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to hero slide ' + (i + 1));
        dot.addEventListener('click', function () {
          render(i);
          start();
        });
        dotsWrap.appendChild(dot);
      });
    }

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    render(0);
    if (slides.length > 1) start();
  }

  var socialGrid = document.getElementById('socialGrid');
  var socialLoadMoreBtn = document.getElementById('socialLoadMoreBtn');
  if (socialGrid) {
    var socialCards = Array.prototype.slice.call(socialGrid.querySelectorAll('.social-card'));
    var socialInitial = parseInt(socialGrid.getAttribute('data-initial-show') || '3', 3);
    var socialBatch = parseInt(socialGrid.getAttribute('data-batch-size') || '3', 3);
    if (!Number.isFinite(socialInitial) || socialInitial < 1) socialInitial = 3;
    if (!Number.isFinite(socialBatch) || socialBatch < 1) socialBatch = 3;
    var socialVisible = Math.min(socialInitial, socialCards.length);

    function renderSocialBatch() {
      socialVisible = Math.min(socialVisible + socialBatch, socialCards.length);
      socialCards.forEach(function (card, i) {
        card.style.display = i < socialVisible ? '' : 'none';
      });
      if (socialLoadMoreBtn) {
        socialLoadMoreBtn.style.display = socialVisible >= socialCards.length ? 'none' : '';
      }
    }

    socialCards.forEach(function (card, i) {
      card.style.display = i < socialVisible ? '' : 'none';
    });
    if (socialLoadMoreBtn) {
      socialLoadMoreBtn.style.display = socialVisible >= socialCards.length ? 'none' : '';
      socialLoadMoreBtn.addEventListener('click', renderSocialBatch);
    }
  }

  var videoGrid = document.getElementById('videoGrid');
  var loadMoreBtn = document.getElementById('videoLoadMoreBtn');
  if (videoGrid) {
    var videoCards = Array.prototype.slice.call(videoGrid.querySelectorAll('.video-card'));
    var initialShow = parseInt(videoGrid.getAttribute('data-initial-show'), 3);
    var batchSize = parseInt(videoGrid.getAttribute('data-batch-size'), 3);
    if (!Number.isFinite(initialShow) || initialShow < 1) initialShow = 3;
    if (!Number.isFinite(batchSize) || batchSize < 1) batchSize = 3;
    var visibleCount = Math.min(initialShow, videoCards.length);

    function renderVideoBatch() {
      visibleCount = Math.min(visibleCount + batchSize, videoCards.length);
      videoCards.forEach(function (card, i) {
        card.style.display = i < visibleCount ? '' : 'none';
      });
      if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleCount >= videoCards.length ? 'none' : '';
      }
    }

    videoCards.forEach(function (card, i) {
      card.style.display = i < visibleCount ? '' : 'none';
    });
    if (loadMoreBtn) {
      loadMoreBtn.style.display = visibleCount >= videoCards.length ? 'none' : '';
      loadMoreBtn.addEventListener('click', renderVideoBatch);
    }
  }

  var galleryGrid = document.getElementById('galleryGrid');
  var galleryLoadMoreBtn = document.getElementById('galleryLoadMoreBtn');
  if (galleryGrid) {
    var galleryCards = Array.prototype.slice.call(galleryGrid.querySelectorAll('.gallery-item'));
    var galleryInitial = parseInt(galleryGrid.getAttribute('data-initial-show') || '6', 10);
    var galleryBatch = parseInt(galleryGrid.getAttribute('data-batch-size') || '6', 10);
    if (!Number.isFinite(galleryInitial) || galleryInitial < 1) galleryInitial = 6;
    if (!Number.isFinite(galleryBatch) || galleryBatch < 1) galleryBatch = 6;
    var galleryVisible = Math.min(galleryInitial, galleryCards.length);

    function renderGalleryBatch() {
      galleryVisible = Math.min(galleryVisible + galleryBatch, galleryCards.length);
      galleryCards.forEach(function (card, i) {
        card.style.display = i < galleryVisible ? '' : 'none';
      });
      if (galleryLoadMoreBtn) {
        galleryLoadMoreBtn.style.display = galleryVisible >= galleryCards.length ? 'none' : '';
      }
    }

    galleryCards.forEach(function (card, i) {
      card.style.display = i < galleryVisible ? '' : 'none';
    });
    if (galleryLoadMoreBtn) {
      galleryLoadMoreBtn.style.display = galleryVisible >= galleryCards.length ? 'none' : '';
      galleryLoadMoreBtn.addEventListener('click', renderGalleryBatch);
    }
  }

  var overlay = document.getElementById('videoOverlay');
  var iframe = document.getElementById('videoIframe');
  var iframeWrap = document.querySelector('.video-frame-wrap');
  var noLinkMessage = document.getElementById('videoNoLinkMessage');
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
      '</div><div id="videoNoLinkMessage" style="display:none;padding:24px;color:#d1d5db;text-align:center;font-size:1rem">No link in this video.</div></div></div>';
    document.body.appendChild(wrapper.firstElementChild);
    overlay = document.getElementById('videoOverlay');
    iframe = document.getElementById('videoIframe');
    iframeWrap = document.querySelector('.video-frame-wrap');
    noLinkMessage = document.getElementById('videoNoLinkMessage');
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
      if (!url) {
        iframe.src = '';
        if (iframeWrap) iframeWrap.style.display = 'none';
        if (noLinkMessage) noLinkMessage.style.display = 'block';
      } else {
        if (iframeWrap) iframeWrap.style.display = '';
        if (noLinkMessage) noLinkMessage.style.display = 'none';
        iframe.src = url;
      }
      modalTitle.textContent = title;
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
    });
  });

  if (overlay && iframe) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        iframe.src = '';
        if (iframeWrap) iframeWrap.style.display = '';
        if (noLinkMessage) noLinkMessage.style.display = 'none';
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
    if (modalClose) {
      modalClose.addEventListener('click', function () {
        iframe.src = '';
        if (iframeWrap) iframeWrap.style.display = '';
        if (noLinkMessage) noLinkMessage.style.display = 'none';
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      });
    }
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.style.display === 'flex') {
        iframe.src = '';
        if (iframeWrap) iframeWrap.style.display = '';
        if (noLinkMessage) noLinkMessage.style.display = 'none';
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
  }

  var galleryOverlay = document.getElementById('galleryLightboxOverlay');
  var galleryImage = document.getElementById('galleryLightboxImage');
  var galleryClose = document.getElementById('galleryLightboxClose');

  function ensureGalleryLightbox() {
    if (galleryOverlay && galleryImage && galleryClose) return;
    var wrapper = document.createElement('div');
    wrapper.innerHTML =
      '<div id="galleryLightboxOverlay" class="gallery-lightbox-overlay" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Gallery image preview">' +
      '<div class="gallery-lightbox-dialog">' +
      '<button id="galleryLightboxClose" class="gallery-lightbox-close" type="button" aria-label="Close image">&times;</button>' +
      '<img id="galleryLightboxImage" class="gallery-lightbox-image" src="" alt="Gallery Preview">' +
      '</div></div>';
    document.body.appendChild(wrapper.firstElementChild);
    galleryOverlay = document.getElementById('galleryLightboxOverlay');
    galleryImage = document.getElementById('galleryLightboxImage');
    galleryClose = document.getElementById('galleryLightboxClose');
  }

  ensureGalleryLightbox();

  function openGalleryLightbox(src) {
    if (!galleryOverlay || !galleryImage || !src) return;
    if (galleryOverlay.style.display === 'flex' && galleryImage.src === src) return;
    galleryImage.src = src;
    galleryOverlay.style.display = 'flex';
    galleryOverlay.classList.add('open');
    galleryOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeGalleryLightbox() {
    if (!galleryOverlay || !galleryImage) return;
    galleryOverlay.classList.remove('open');
    galleryOverlay.setAttribute('aria-hidden', 'true');
    setTimeout(function () {
      if (galleryOverlay.getAttribute('aria-hidden') === 'true') {
        galleryOverlay.style.display = 'none';
        galleryImage.src = '';
      }
    }, 180);
  }

  var hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.querySelectorAll('.gallery-popup-trigger').forEach(function (item) {
    item.addEventListener('click', function () {
      var src = item.getAttribute('data-gallery-src') || '';
      openGalleryLightbox(src);
    });
  });

  if (galleryOverlay) {
    galleryOverlay.addEventListener('click', function (e) {
      if (e.target === galleryOverlay) closeGalleryLightbox();
    });
  }
  if (galleryClose) {
    galleryClose.addEventListener('click', closeGalleryLightbox);
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && galleryOverlay && galleryOverlay.style.display === 'flex') {
      closeGalleryLightbox();
    }
  });
})();
