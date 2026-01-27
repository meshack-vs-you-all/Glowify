/**
 * Recently Viewed Products
 * Tracks and displays recently viewed products using LocalStorage
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'glowify_recently_viewed';
  const MAX_ITEMS = 12;

  /**
   * Get recently viewed products from LocalStorage
   */
  function getRecentlyViewed() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error reading recently viewed:', e);
      return [];
    }
  }

  /**
   * Save recently viewed products to LocalStorage
   */
  function saveRecentlyViewed(products) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving recently viewed:', e);
    }
  }

  /**
   * Add current product to recently viewed
   */
  function addToRecentlyViewed(productData) {
    if (!productData || !productData.id) return;

    let products = getRecentlyViewed();

    // Remove if already exists
    products = products.filter(p => p.id !== productData.id);

    // Add to beginning
    products.unshift({
      id: productData.id,
      handle: productData.handle,
      title: productData.title,
      price: productData.price,
      compare_at_price: productData.compare_at_price,
      image: productData.image,
      url: productData.url
    });

    // Keep only max items
    products = products.slice(0, MAX_ITEMS);

    saveRecentlyViewed(products);
  }

  /**
   * Get product data from current page
   */
  function getCurrentProductData() {
    if (typeof window.productData !== 'undefined') {
      return window.productData;
    }

    // Fallback: extract from page
    const productJson = document.querySelector('[data-product-json]');
    if (productJson) {
      try {
        return JSON.parse(productJson.textContent);
      } catch (e) {
        console.error('Error parsing product JSON:', e);
      }
    }

    return null;
  }

  /**
   * Initialize on product page
   */
  function initProductTracking() {
    if (document.body.classList.contains('template-product')) {
      const productData = getCurrentProductData();
      if (productData) {
        addToRecentlyViewed({
          id: productData.id,
          handle: productData.handle,
          title: productData.title,
          price: productData.price,
          compare_at_price: productData.compare_at_price,
          image: productData.featured_image || productData.images?.[0],
          url: window.location.pathname
        });
      }
    }
  }

  /**
   * Render recently viewed products
   */
  function renderRecentlyViewed(container) {
    if (!container) return;

    const products = getRecentlyViewed();

    // Hide if less than 2 items
    if (products.length < 2) {
      container.style.display = 'none';
      return;
    }

    container.style.display = '';

    const track = container.querySelector('[data-recently-viewed-track]');
    if (!track) return;

    // Clear existing
    track.innerHTML = '';

    // Filter out current product if on product page
    const currentHandle = window.location.pathname.split('/').pop();
    const filteredProducts = products.filter(p => p.handle !== currentHandle);

    if (filteredProducts.length < 2) {
      container.style.display = 'none';
      return;
    }

    // Render products
    filteredProducts.slice(0, 8).forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'recently-viewed__item';
      productCard.innerHTML = `
        <a href="${product.url}" class="recently-viewed__link">
          <div class="recently-viewed__image-wrapper">
            ${product.image
          ? `<img src="${product.image}" alt="${product.title}" loading="lazy" class="recently-viewed__image">`
          : '<div class="recently-viewed__placeholder"></div>'
        }
          </div>
          <div class="recently-viewed__info">
            <h3 class="recently-viewed__title">${product.title}</h3>
            <div class="product-card__price price-component price-component--small">
              ${product.compare_at_price && product.compare_at_price > product.price
          ? `<span class="price-item price-item--sale">${formatMoney(product.price)}</span>
                   <span class="price-item price-item--compare">${formatMoney(product.compare_at_price)}</span>`
          : `<span class="price-item price-item--regular">${formatMoney(product.price)}</span>`
        }
            </div>
          </div>
        </a>
      `;
      track.appendChild(productCard);
    });

    // Initialize scroll if needed
    initHorizontalScroll(track);
  }

  /**
   * Format money (simple version - can be enhanced with Shopify money format)
   */
  function formatMoney(cents) {
    if (typeof window.Shopify !== 'undefined' && window.Shopify.formatMoney) {
      return window.Shopify.formatMoney(cents);
    }
    return '$' + (cents / 100).toFixed(2);
  }

  /**
   * Initialize horizontal scroll
   */
  function initHorizontalScroll(track) {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  /**
   * Initialize
   */
  function init() {
    // Track current product
    initProductTracking();

    // Render recently viewed section
    const container = document.querySelector('[data-recently-viewed]');
    if (container) {
      renderRecentlyViewed(container);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for global access
  window.RecentlyViewed = {
    get: getRecentlyViewed,
    add: addToRecentlyViewed,
    render: renderRecentlyViewed
  };
})();

