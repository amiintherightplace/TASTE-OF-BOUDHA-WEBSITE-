/**
 * Taste of Boudha and Sherpa Bar — Gallery Filter & Accessible Lightbox
 */
(function () {
  'use strict';

  var utils = window.BoudhaUtils;

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('gallery-grid');
    var filterButtons = document.querySelectorAll('[data-gallery-filter]');
    var countEl = document.getElementById('gallery-count');

    var lightbox = document.getElementById('gallery-lightbox');
    var lbImg = document.getElementById('lightbox-img');
    var lbTitle = document.getElementById('lightbox-title');
    var lbDesc = document.getElementById('lightbox-desc');
    var lbCounter = document.getElementById('lightbox-counter');
    var lbClose = document.getElementById('lightbox-close');
    var lbPrev = document.getElementById('lightbox-prev');
    var lbNext = document.getElementById('lightbox-next');

    if (!grid || !lightbox) return;

    var allCards = Array.prototype.slice.call(grid.querySelectorAll('.gallery-item'));
    var activeCategory = 'all';
    var visibleCards = allCards.slice();
    var activeIndex = 0;
    var lastTrigger = null;

    function updateFilter(category) {
      activeCategory = category;
      filterButtons.forEach(function (btn) {
        var btnCat = btn.getAttribute('data-gallery-filter');
        btn.setAttribute('aria-pressed', btnCat === category ? 'true' : 'false');
      });

      visibleCards = [];
      allCards.forEach(function (card) {
        var cardCat = card.getAttribute('data-category');
        var show = category === 'all' || cardCat === category;
        card.hidden = !show;
        if (show) {
          visibleCards.push(card);
        }
      });

      if (countEl) {
        countEl.textContent = visibleCards.length + ' of ' + allCards.length + ' photographs';
      }
    }

    function renderLightboxFrame(index) {
      if (visibleCards.length === 0) return;
      activeIndex = index;
      var card = visibleCards[activeIndex];
      var img = card.querySelector('img');
      var title = card.getAttribute('data-title') || '';
      var desc = card.getAttribute('data-desc') || '';

      if (lbImg && img) {
        lbImg.setAttribute('src', img.getAttribute('src') || '');
        lbImg.setAttribute('alt', img.getAttribute('alt') || title);
      }
      if (lbTitle) lbTitle.textContent = title;
      if (lbDesc) lbDesc.textContent = desc;
      if (lbCounter) lbCounter.textContent = (activeIndex + 1) + ' / ' + visibleCards.length;
    }

    function openLightbox(triggerCard) {
      var index = visibleCards.indexOf(triggerCard);
      if (index === -1) return;
      lastTrigger = triggerCard.querySelector('.gallery-item__trigger');
      renderLightboxFrame(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      if (lbClose) {
        window.setTimeout(function () {
          lbClose.focus();
        }, 40);
      }
    }

    function closeLightbox() {
      if (!lightbox.classList.contains('is-open')) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
    }

    function stepLightbox(delta) {
      if (!utils || visibleCards.length === 0) return;
      var nextIndex = utils.stepGalleryIndex(activeIndex, delta, visibleCards.length);
      renderLightboxFrame(nextIndex);
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.getAttribute('data-gallery-filter') || 'all';
        updateFilter(category);
      });
    });

    allCards.forEach(function (card) {
      var trigger = card.querySelector('.gallery-item__trigger');
      if (trigger) {
        trigger.addEventListener('click', function () {
          openLightbox(card);
        });
      }
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', function () { stepLightbox(-1); });
    if (lbNext) lbNext.addEventListener('click', function () { stepLightbox(1); });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepLightbox(1);
      }
    });

    updateFilter('all');
  });
})();
