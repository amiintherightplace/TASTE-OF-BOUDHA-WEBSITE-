/**
 * Taste of Boudha and Sherpa Bar — Shared Site Controller
 * Handles navigation state, accessible mobile drawer, WhatsApp links,
 * menu rendering, contact composer, back-to-top, and scroll reveals.
 */
(function () {
  'use strict';

  var utils = window.BoudhaUtils;

  function initActiveNavigation() {
    if (!utils) return;
    var activeSlug = utils.resolveActivePage(window.location.pathname);
    var navLinks = document.querySelectorAll('.primary-nav__link, .mobile-drawer__link');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var linkSlug = utils.resolveActivePage(href);
      if (linkSlug === activeSlug) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function initMobileDrawer() {
    var toggleBtn = document.getElementById('nav-toggle');
    var drawer = document.getElementById('mobile-drawer');
    var closeBtn = document.getElementById('drawer-close');
    var backdrop = document.getElementById('drawer-backdrop');

    if (!toggleBtn || !drawer) return;

    var drawerLinks = drawer.querySelectorAll('a, button');
    var lastFocused = null;

    function openDrawer() {
      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
      document.body.classList.add('drawer-open');
      if (closeBtn) {
        window.setTimeout(function () {
          closeBtn.focus();
        }, 40);
      }
    }

    function closeDrawer(restoreFocus) {
      if (!drawer.classList.contains('is-open')) return;
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('drawer-open');
      if (restoreFocus !== false && lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    toggleBtn.addEventListener('click', function () {
      var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer(true);
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeDrawer(true);
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeDrawer(true);
      });
    }

    drawerLinks.forEach(function (el) {
      if (el.tagName === 'A') {
        el.addEventListener('click', function () {
          closeDrawer(false);
        });
      }
    });

    document.addEventListener('keydown', function (event) {
      if (!drawer.classList.contains('is-open')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer(true);
        return;
      }

      if (event.key === 'Tab' && drawerLinks.length > 0) {
        var focusable = Array.prototype.slice.call(drawerLinks).filter(function (el) {
          return !el.hasAttribute('disabled') && el.offsetParent !== null;
        });
        if (focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && drawer.classList.contains('is-open')) {
        closeDrawer(false);
      }
    });
  }

  function initWhatsAppLinks() {
    if (!utils) return;
    var nodes = document.querySelectorAll('[data-whatsapp-msg]');
    nodes.forEach(function (node) {
      var msg = node.getAttribute('data-whatsapp-msg') || '';
      node.setAttribute('href', utils.buildWhatsAppUrl(msg));
    });
  }

  function initSmoothScrollAndBackToTop() {
    var backToTopBtn = document.getElementById('back-to-top');
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function updateBackToTop() {
      if (!backToTopBtn) return;
      if (window.scrollY > 360) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }

    if (backToTopBtn) {
      updateBackToTop();
      window.addEventListener('scroll', updateBackToTop, { passive: true });
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        var targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          event.preventDefault();
          targetEl.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  function initScrollReveals() {
    var items = document.querySelectorAll('[data-reveal]');
    if (items.length === 0) return;

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    document.documentElement.classList.add('js-reveal-ready');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    items.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });
  }

  function initImageFallbacks() {
    var images = document.querySelectorAll('.media-frame img');
    images.forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) {
        img.parentElement.classList.add('is-broken');
      }
      img.addEventListener('error', function () {
        if (img.parentElement) {
          img.parentElement.classList.add('is-broken');
        }
      });
    });
  }

  function initMenuPage() {
    var menuRoot = document.getElementById('official-menu-root');
    var highlightsRoot = document.getElementById('confirmed-highlights-root');
    var data = window.BOUDHA_MENU_DATA;

    if (!menuRoot || !data || !utils) return;

    if (highlightsRoot && Array.isArray(data.confirmedHighlights)) {
      highlightsRoot.innerHTML = data.confirmedHighlights
        .map(function (item) {
          var waHref = utils.buildWhatsAppUrl(item.whatsappMessage);
          return (
            '<article class="highlight-card">' +
            '  <div class="media-frame media-frame--4x3">' +
            '    <img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.imageAlt) + '" loading="lazy" />' +
            '    <div class="media-fallback"><span>Taste of Boudha and Sherpa Bar</span></div>' +
            '  </div>' +
            '  <div class="highlight-card__body">' +
            '    <span class="kicker">' + escapeHtml(item.highlightLabel) + '</span>' +
            '    <h3 class="card-title">' + escapeHtml(item.name) + '</h3>' +
            '    <p class="body-copy">' + escapeHtml(item.note) + '</p>' +
            '    <div>' +
            '      <a class="btn btn--whatsapp" href="' + escapeHtml(waHref) + '" target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>' +
            '    </div>' +
            '  </div>' +
            '</article>'
          );
        })
        .join('');
    }

    var categories = Array.isArray(data.officialMenuCategories) ? data.officialMenuCategories : [];
    var groups = Array.isArray(data.menuGroups) ? data.menuGroups : [];
    if (categories.length === 0) {
      var inquiryHref = utils.buildWhatsAppUrl(
        'Hello Taste of Boudha and Sherpa Bar, could you please share today\'s official menu and prices?'
      );
      menuRoot.innerHTML =
        '<div class="menu-notice" role="region" aria-label="Menu update notice">' +
        '  <div>' +
        '    <span class="kicker">Menu Update In Progress</span>' +
        '    <h2 class="section-title">Official Menu Being Confirmed</h2>' +
        '    <p class="lead-copy" style="margin-top: 0.85rem;">' +
        '      Please reach out on WhatsApp or call 980-6514322 for today\'s full offerings.' +
        '    </p>' +
        '  </div>' +
        '  <div class="btn-group" style="justify-self: end;">' +
        '    <a class="btn btn--whatsapp" href="' + escapeHtml(inquiryHref) + '" target="_blank" rel="noopener noreferrer">Request Today\'s Menu on WhatsApp</a>' +
        '    <a class="btn btn--outline" href="tel:+9779806514322">Call 980-6514322</a>' +
        '  </div>' +
        '</div>';
      return;
    }

    var activeGroup = 'all';
    var activeCategory = 'all';
    var searchTerm = '';

    var groupTabsHtml = groups
      .map(function (grp) {
        return (
          '<button type="button" class="filter-tab" data-group="' + escapeHtml(grp.id) + '" aria-pressed="' + (activeGroup === grp.id) + '">' +
          escapeHtml(grp.label) +
          '</button>'
        );
      })
      .join('');

    menuRoot.innerHTML =
      '<div class="menu-controls">' +
      (groupTabsHtml
        ? '  <div class="filter-tabs" role="group" aria-label="Menu sections">' + groupTabsHtml + '</div>'
        : '') +
      '  <div class="menu-controls__inputs">' +
      '    <div class="menu-controls__field">' +
      '      <label class="sr-only" for="menu-category-select">Filter by menu category</label>' +
      '      <select id="menu-category-select" class="menu-select"></select>' +
      '    </div>' +
      '    <div class="menu-controls__field">' +
      '      <label class="sr-only" for="menu-search-input">Search menu dishes</label>' +
      '      <input id="menu-search-input" class="menu-search" type="search" placeholder="Search dishes, drinks, or categories..." />' +
      '    </div>' +
      '  </div>' +
      '  <div class="menu-controls__meta">' +
      '    <p id="menu-summary-count" class="gallery-count tabular-nums" aria-live="polite"></p>' +
      '    <p class="menu-controls__note">' + escapeHtml(data.lastConfirmedNote || '') + '</p>' +
      '  </div>' +
      '</div>' +
      '<div id="menu-sections-list"></div>';

    var groupBtns = menuRoot.querySelectorAll('.filter-tab[data-group]');
    var categorySelect = document.getElementById('menu-category-select');
    var searchEl = document.getElementById('menu-search-input');
    var summaryEl = document.getElementById('menu-summary-count');
    var sectionsListEl = document.getElementById('menu-sections-list');

    function populateCategorySelect() {
      if (!categorySelect) return;
      var groupCats = categories.filter(function (cat) {
        return activeGroup === 'all' || cat.group === activeGroup;
      });
      var optionsHtml =
        '<option value="all">All Categories (' + groupCats.length + ')</option>' +
        groupCats
          .map(function (cat) {
            return (
              '<option value="' + escapeHtml(cat.id) + '">' +
              escapeHtml(cat.title) + ' (' + cat.items.length + ')' +
              '</option>'
            );
          })
          .join('');
      categorySelect.innerHTML = optionsHtml;
      var hasActive = groupCats.some(function (cat) {
        return cat.id === activeCategory;
      });
      if (!hasActive) {
        activeCategory = 'all';
      }
      categorySelect.value = activeCategory;
    }

    function renderMenuSections() {
      var filtered = utils.filterMenuCategories(categories, activeCategory, searchTerm, activeGroup);
      var totalItems = filtered.reduce(function (sum, cat) {
        return sum + cat.items.length;
      }, 0);

      if (summaryEl) {
        summaryEl.textContent =
          'Showing ' + filtered.length + (filtered.length === 1 ? ' category' : ' categories') +
          ' · ' + totalItems + (totalItems === 1 ? ' item' : ' items');
      }

      if (!sectionsListEl) return;

      if (filtered.length === 0) {
        sectionsListEl.innerHTML =
          '<div class="menu-empty">' +
          '  <p class="body-copy">No menu items match your current filter or search.</p>' +
          '  <button type="button" id="menu-reset-btn" class="btn btn--outline">Reset Menu Filters</button>' +
          '</div>';
        var resetBtn = document.getElementById('menu-reset-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', function () {
            activeGroup = 'all';
            activeCategory = 'all';
            searchTerm = '';
            if (searchEl) searchEl.value = '';
            groupBtns.forEach(function (btn) {
              btn.setAttribute('aria-pressed', String(btn.getAttribute('data-group') === 'all'));
            });
            populateCategorySelect();
            renderMenuSections();
          });
        }
        return;
      }

      sectionsListEl.innerHTML = filtered
        .map(function (cat) {
          var rowsHtml = cat.items
            .map(function (item) {
              var priceHtml = item.price
                ? '<span class="menu-row__price tabular-nums">' + escapeHtml(item.price) + '</span>'
                : '';
              return (
                '<li class="menu-row">' +
                '  <div class="menu-row__main">' +
                '    <span class="menu-row__name">' + escapeHtml(item.name) + '</span>' +
                (item.description ? '<span class="menu-row__desc">' + escapeHtml(item.description) + '</span>' : '') +
                '  </div>' +
                priceHtml +
                '</li>'
              );
            })
            .join('');

          var thumbHtml = cat.image
            ? '<div class="menu-category__thumb"><img src="' + escapeHtml(cat.image) + '" alt="' + escapeHtml(cat.imageAlt || cat.title) + '" loading="lazy" /></div>'
            : '';

          return (
            '<section class="menu-category" aria-labelledby="cat-' + escapeHtml(cat.id) + '">' +
            '  <header class="menu-category__header">' +
            '    <div class="menu-category__title-wrap">' +
            thumbHtml +
            '      <div>' +
            '        <h3 class="menu-category__title" id="cat-' + escapeHtml(cat.id) + '">' + escapeHtml(cat.title) + '</h3>' +
            '        <p class="menu-category__count tabular-nums">' + cat.items.length + (cat.items.length === 1 ? ' item' : ' items') + '</p>' +
            '      </div>' +
            '    </div>' +
            '  </header>' +
            '  <ul class="menu-ledger">' + rowsHtml + '</ul>' +
            '</section>'
          );
        })
        .join('');
    }

    groupBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeGroup = btn.getAttribute('data-group') || 'all';
        activeCategory = 'all';
        groupBtns.forEach(function (other) {
          other.setAttribute('aria-pressed', String(other === btn));
        });
        populateCategorySelect();
        renderMenuSections();
      });
    });

    if (categorySelect) {
      categorySelect.addEventListener('change', function () {
        activeCategory = categorySelect.value || 'all';
        renderMenuSections();
      });
    }

    if (searchEl) {
      searchEl.addEventListener('input', function () {
        searchTerm = searchEl.value;
        renderMenuSections();
      });
    }

    populateCategorySelect();
    renderMenuSections();
  }

  function initContactComposer() {
    var form = document.getElementById('whatsapp-composer-form');
    if (!form || !utils) return;

    var nameInput = document.getElementById('inquiry-name');
    var topicInput = document.getElementById('inquiry-topic');
    var msgInput = document.getElementById('inquiry-message');
    var feedbackEl = document.getElementById('composer-feedback');
    var directLinkEl = document.getElementById('composer-direct-link');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var result = utils.composeWhatsAppInquiry({
        name: nameInput ? nameInput.value : '',
        topic: topicInput ? topicInput.value : '',
        message: msgInput ? msgInput.value : ''
      });

      if (!result.valid) {
        if (feedbackEl) {
          feedbackEl.textContent = result.error;
          feedbackEl.className = 'form-feedback form-feedback--error';
        }
        if (directLinkEl) {
          directLinkEl.hidden = true;
        }
        return;
      }

      if (feedbackEl) {
        feedbackEl.textContent = 'Message prepared for WhatsApp. Click below if WhatsApp did not open automatically.';
        feedbackEl.className = 'form-feedback form-feedback--success';
      }
      if (directLinkEl) {
        directLinkEl.setAttribute('href', result.url);
        directLinkEl.hidden = false;
      }

      window.open(result.url, '_blank', 'noopener,noreferrer');
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initActiveNavigation();
    initMobileDrawer();
    initWhatsAppLinks();
    initSmoothScrollAndBackToTop();
    initScrollReveals();
    initImageFallbacks();
    initMenuPage();
    initContactComposer();
  });
})();
