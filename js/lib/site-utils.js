/**
 * Taste of Boudha and Sherpa Bar — Shared Pure Utility Logic
 * Works in browser globals (classic script) and Node.js unit tests (CommonJS/require).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BoudhaUtils = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var BUSINESS_CONFIG = Object.freeze({
    name: 'Taste of Boudha and Sherpa Bar',
    category: 'Nepalese Restaurant',
    address: 'Baidam Road, Pokhara, Gandaki Province 33700, Nepal',
    phoneDisplay: '980-6514322',
    phoneHref: 'tel:+9779806514322',
    whatsappNumber: '9779806514322',
    whatsappBaseUrl: 'https://wa.me/9779806514322',
    mapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Taste+of+Boudha+and+Sherpa+Bar+Pokhara',
    mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Taste+of+Boudha+and+Sherpa+Bar+Pokhara',
    mapsEmbedUrl: 'https://maps.google.com/maps?q=Taste+of+Boudha+and+Sherpa+Bar,+Baidam+Road,+Pokhara+33700,+Nepal&t=&z=16&ie=UTF8&iwloc=&output=embed'
  });

  /**
   * Builds a properly encoded WhatsApp URL with an optional pre-filled message.
   * Always resolves to https://wa.me/9779806514322
   */
  function buildWhatsAppUrl(message) {
    if (typeof message !== 'string' || message.trim().length === 0) {
      return BUSINESS_CONFIG.whatsappBaseUrl;
    }
    return BUSINESS_CONFIG.whatsappBaseUrl + '?text=' + encodeURIComponent(message.trim());
  }

  /**
   * Formats a structured WhatsApp inquiry message from the Contact page composer.
   */
  function composeWhatsAppInquiry(fields) {
    var name = fields && typeof fields.name === 'string' ? fields.name.trim() : '';
    var topic = fields && typeof fields.topic === 'string' ? fields.topic.trim() : 'General Inquiry';
    var notes = fields && typeof fields.message === 'string' ? fields.message.trim() : '';

    if (!name || !notes) {
      return {
        valid: false,
        error: 'Please enter your name and your question before opening WhatsApp.',
        url: ''
      };
    }

    var lines = [
      'Hello Taste of Boudha and Sherpa Bar,',
      'Name: ' + name,
      'Topic: ' + topic,
      'Message: ' + notes
    ];
    var fullMessage = lines.join('\n');

    return {
      valid: true,
      error: '',
      text: fullMessage,
      url: buildWhatsAppUrl(fullMessage)
    };
  }

  /**
   * Resolves the current page filename slug from a pathname (e.g. "/menu.html" -> "menu.html", "/" -> "index.html").
   */
  function resolveActivePage(pathname) {
    if (typeof pathname !== 'string' || pathname.trim() === '' || pathname === '/') {
      return 'index.html';
    }
    var cleaned = pathname.split('?')[0].split('#')[0];
    var segments = cleaned.split('/').filter(Boolean);
    if (segments.length === 0) {
      return 'index.html';
    }
    var last = segments[segments.length - 1].toLowerCase();
    var validPages = ['index.html', 'menu.html', 'gallery.html', 'about.html', 'contact.html'];
    if (validPages.indexOf(last) !== -1) {
      return last;
    }
    var withExt = last + '.html';
    if (validPages.indexOf(withExt) !== -1) {
      return withExt;
    }
    return 'index.html';
  }

  /**
   * Wraps lightbox index safely in circular gallery navigation.
   */
  function stepGalleryIndex(currentIndex, delta, totalItems) {
    if (!Number.isInteger(totalItems) || totalItems <= 0) {
      return -1;
    }
    var safeCurrent = Number.isInteger(currentIndex) ? currentIndex : 0;
    var step = Number.isInteger(delta) ? delta : 0;
    return ((safeCurrent + step) % totalItems + totalItems) % totalItems;
  }

  /**
   * Filters gallery items by category key ("all" returns all items).
   */
  function filterGalleryItems(items, category) {
    if (!Array.isArray(items)) {
      return [];
    }
    if (!category || category === 'all') {
      return items.slice();
    }
    return items.filter(function (item) {
      return item && item.category === category;
    });
  }

  /**
   * Normalizes and filters official menu categories when provided by the restaurant owner.
   */
  function filterMenuCategories(categories, activeCategoryId, searchQuery, activeGroupId) {
    if (!Array.isArray(categories) || categories.length === 0) {
      return [];
    }
    var query = typeof searchQuery === 'string' ? searchQuery.trim().toLowerCase() : '';
    var hasCategoryFilter = activeCategoryId && activeCategoryId !== 'all';
    var hasGroupFilter = activeGroupId && activeGroupId !== 'all';

    return categories
      .filter(function (cat) {
        if (!cat || !Array.isArray(cat.items)) return false;
        if (hasCategoryFilter && cat.id !== activeCategoryId) return false;
        if (hasGroupFilter && cat.group !== activeGroupId) return false;
        return true;
      })
      .map(function (cat) {
        var matchingItems = cat.items.filter(function (item) {
          if (!item || !item.name) return false;
          if (!query) return true;
          var haystack = (item.name + ' ' + cat.title + ' ' + (item.description || '')).toLowerCase();
          return haystack.indexOf(query) !== -1;
        });
        return {
          id: cat.id,
          group: cat.group || '',
          title: cat.title,
          subtitle: cat.subtitle || '',
          image: cat.image || '',
          imageAlt: cat.imageAlt || '',
          items: matchingItems
        };
      })
      .filter(function (cat) {
        return cat.items.length > 0;
      });
  }

  return {
    BUSINESS_CONFIG: BUSINESS_CONFIG,
    buildWhatsAppUrl: buildWhatsAppUrl,
    composeWhatsAppInquiry: composeWhatsAppInquiry,
    resolveActivePage: resolveActivePage,
    stepGalleryIndex: stepGalleryIndex,
    filterGalleryItems: filterGalleryItems,
    filterMenuCategories: filterMenuCategories
  };
}));
