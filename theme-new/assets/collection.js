/**
 * Collection Page Functionality
 * Handles sorting, filtering, view toggle, and load more
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const collectionPage = document.querySelector('[data-collection-page]');
    if (!collectionPage) return;

    const filterToggle = document.querySelector('[data-filter-toggle]');
    const filters = document.querySelector('[data-collection-filters]');
    const filterClose = document.querySelector('[data-filter-close]');
    const viewToggle = document.querySelectorAll('[data-view]');
    const grid = document.querySelector('[data-collection-grid]');
    const sortSelect = document.querySelector('[data-collection-sort]');
    const priceFilter = document.querySelector('[data-price-filter]');
    const availabilityFilters = document.querySelectorAll('[data-filter-availability]');
    const filterApply = document.querySelector('[data-filter-apply]');
    const filterClear = document.querySelector('[data-filter-clear]');
    const loadMoreBtn = document.querySelector('[data-load-more]');
    const countDisplay = document.querySelector('[data-collection-count]');

    let allProducts = [];
    let filteredProducts = [];
    let currentSort = 'manual';
    let currentFilters = {
      priceMin: 0,
      priceMax: 1000,
      availability: []
    };

    // Initialize products array
    function initProducts() {
      const productCards = grid.querySelectorAll('.product-card');
      allProducts = Array.from(productCards).map(card => {
        const link = card.querySelector('a[href*="/products/"]');
        const priceEl = card.querySelector('.product-card__price');
        let price = 0;
        
        // Extract price - check for sale price first, then regular price
        if (priceEl) {
          const salePrice = priceEl.querySelector('.product-card__price--sale');
          const regularPrice = priceEl.querySelector('span:not(.product-card__price--compare)');
          const priceText = salePrice ? salePrice.textContent : (regularPrice ? regularPrice.textContent : priceEl.textContent);
          price = extractPrice(priceText);
        }
        
        // Check availability - if badge says "Sale" it's available, otherwise check if sold out
        const badge = card.querySelector('.product-card__badge');
        const isAvailable = !badge || !badge.textContent.toLowerCase().includes('sold');
        
        return {
          element: card,
          title: card.querySelector('.product-card__title')?.textContent.trim() || '',
          price: price,
          available: isAvailable,
          url: link?.href || ''
        };
      });
      filteredProducts = [...allProducts];
    }

    // Extract price from text (handles $, commas, etc.)
    function extractPrice(text) {
      const match = text.match(/[\d,]+\.?\d*/);
      if (match) {
        return parseFloat(match[0].replace(/,/g, ''));
      }
      return 0;
    }

    // Filter toggle
    if (filterToggle && filters) {
      filterToggle.addEventListener('click', () => {
        filters.classList.toggle('active');
      });
    }

    if (filterClose && filters) {
      filterClose.addEventListener('click', () => {
        filters.classList.remove('active');
      });
    }

    // View toggle
    if (viewToggle.length > 0) {
      viewToggle.forEach(btn => {
        btn.addEventListener('click', function() {
          const view = this.dataset.view;
          viewToggle.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          if (grid) {
            grid.className = `collection-page__grid collection-page__grid--${view}`;
          }
        });
      });
    }

    // Price filter sliders
    if (priceFilter) {
      const priceMin = priceFilter.querySelector('[data-price-min]');
      const priceMax = priceFilter.querySelector('[data-price-max]');
      const priceMinDisplay = priceFilter.querySelector('[data-price-min-display]');
      const priceMaxDisplay = priceFilter.querySelector('[data-price-max-display]');

      if (priceMin && priceMax) {
        // Set max based on actual product prices
        const prices = allProducts.map(p => p.price).filter(p => p > 0);
        const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices) / 100) * 100 : 1000;
        const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices) / 100) * 100 : 0;
        
        priceMin.min = minPrice;
        priceMin.max = maxPrice;
        priceMax.min = minPrice;
        priceMax.max = maxPrice;
        priceMin.value = minPrice;
        priceMax.value = maxPrice;
        currentFilters.priceMin = minPrice;
        currentFilters.priceMax = maxPrice;

        // Update displays
        function updatePriceDisplays() {
          if (priceMinDisplay) {
            priceMinDisplay.textContent = `$${parseInt(priceMin.value)}`;
          }
          if (priceMaxDisplay) {
            const maxVal = parseInt(priceMax.value);
            priceMaxDisplay.textContent = maxVal >= maxPrice ? `$${maxVal}+` : `$${maxVal}`;
          }
          currentFilters.priceMin = parseFloat(priceMin.value);
          currentFilters.priceMax = parseFloat(priceMax.value);
        }

        priceMin.addEventListener('input', updatePriceDisplays);
        priceMax.addEventListener('input', updatePriceDisplays);
        updatePriceDisplays();
      }
    }

    // Availability filters
    if (availabilityFilters.length > 0) {
      availabilityFilters.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          const value = this.value;
          if (this.checked) {
            if (!currentFilters.availability.includes(value)) {
              currentFilters.availability.push(value);
            }
          } else {
            currentFilters.availability = currentFilters.availability.filter(v => v !== value);
          }
        });
      });
    }

    // Apply filters
    if (filterApply) {
      filterApply.addEventListener('click', function() {
        applyFilters();
        if (filters) {
          filters.classList.remove('active');
        }
      });
    }

    // Clear filters
    if (filterClear) {
      filterClear.addEventListener('click', function() {
        // Reset price sliders
        if (priceFilter) {
          const priceMin = priceFilter.querySelector('[data-price-min]');
          const priceMax = priceFilter.querySelector('[data-price-max]');
          const maxPrice = Math.max(...allProducts.map(p => p.price), 1000);
          if (priceMin) priceMin.value = 0;
          if (priceMax) priceMax.value = maxPrice;
          currentFilters.priceMin = 0;
          currentFilters.priceMax = maxPrice;
        }

        // Reset availability checkboxes
        availabilityFilters.forEach(checkbox => {
          checkbox.checked = false;
        });
        currentFilters.availability = [];

        applyFilters();
        if (filters) {
          filters.classList.remove('active');
        }
      });
    }

    // Apply filters function
    function applyFilters() {
      filteredProducts = allProducts.filter(product => {
        // Price filter
        const priceMatch = product.price >= currentFilters.priceMin && 
                          product.price <= currentFilters.priceMax;

        // Availability filter
        let availabilityMatch = true;
        if (currentFilters.availability.length > 0) {
          if (currentFilters.availability.includes('in_stock')) {
            availabilityMatch = product.available;
          } else if (currentFilters.availability.includes('out_of_stock')) {
            availabilityMatch = !product.available;
          }
          // If both are selected, show all
          if (currentFilters.availability.includes('in_stock') && 
              currentFilters.availability.includes('out_of_stock')) {
            availabilityMatch = true;
          }
        }

        return priceMatch && availabilityMatch;
      });

      // Sort filtered products
      sortProducts(filteredProducts);
      renderProducts(filteredProducts);
      updateCount();
    }

    // Sort products
    function sortProducts(products) {
      const sorted = [...products];
      
      switch(currentSort) {
        case 'price-ascending':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-descending':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'title-ascending':
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-descending':
          sorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'created-ascending':
          // Fallback to manual if no date available
          break;
        case 'created-descending':
          // Fallback to manual if no date available
          break;
        case 'manual':
        default:
          // Keep original order
          break;
      }

      return sorted;
    }

    // Render products
    function renderProducts(products) {
      if (!grid) return;

      // Hide all products
      allProducts.forEach(p => {
        p.element.style.display = 'none';
      });

      // Show filtered products
      products.forEach(p => {
        p.element.style.display = '';
      });

      // Show empty message if no products
      const emptyMsg = grid.querySelector('.collection-page__empty');
      if (products.length === 0) {
        if (!emptyMsg) {
          const empty = document.createElement('p');
          empty.className = 'collection-page__empty';
          empty.textContent = 'No products found';
          grid.appendChild(empty);
        }
      } else if (emptyMsg) {
        emptyMsg.remove();
      }
    }

    // Update product count
    function updateCount() {
      if (countDisplay) {
        const count = filteredProducts.length;
        const text = count === 1 ? 'product' : 'products';
        countDisplay.textContent = `${count} ${text}`;
      }
    }

    // Sort select handler - Use Shopify's native sorting via URL
    if (sortSelect) {
      // Set current sort value from URL
      const urlParams = new URLSearchParams(window.location.search);
      const sortParam = urlParams.get('sort_by');
      if (sortParam) {
        sortSelect.value = sortParam;
        currentSort = sortParam;
      }

      sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        
        // Update URL with sort parameter
        const url = new URL(window.location.href);
        if (this.value === 'manual') {
          url.searchParams.delete('sort_by');
        } else {
          url.searchParams.set('sort_by', this.value);
        }
        
        // Reload page with new sort (Shopify handles server-side sorting)
        window.location.href = url.toString();
      });
    }

    // Load more functionality (if pagination exists)
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        // This would typically load next page via AJAX
        // For now, just show a message
        const url = new URL(window.location.href);
        const currentPage = parseInt(url.searchParams.get('page') || '1');
        url.searchParams.set('page', currentPage + 1);
        window.location.href = url.toString();
      });
    }

    // Initialize
    initProducts();
    updateCount();
  });
})();

