/**
 * Collection Page Functionality
 * Handles sorting, filtering, and view toggle using Shopify URL parameters
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const filterForm = document.querySelector('[data-filters-form]');
    const sortSelect = document.querySelector('[data-collection-sort]');
    const filterToggle = document.querySelector('[data-filter-toggle]');
    const filterContainer = document.querySelector('[data-collection-filters]');
    const filterClose = document.querySelector('[data-filter-close]');

    // bind events
    if (filterForm) {
      filterForm.addEventListener('input', debounce((e) => {
        // Only submit on change for text/number inputs after delay
        submitForm();
      }, 500));

      filterForm.addEventListener('change', (e) => {
        // Immediate submit for checkboxes/radio
        if (e.target.type !== 'number' && e.target.type !== 'text') {
          submitForm();
        }
      });

      // Prevent double submit on price inputs
      filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm();
      });
    }

    // Sort Select
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        // Determine if we should update a hidden input in the form or redirect
        const url = new URL(window.location.href);
        url.searchParams.set('sort_by', sortSelect.value);
        window.location.href = url.toString();
      });
    }

    // Mobile Drawer Toggles
    if (filterToggle && filterContainer) {
      filterToggle.addEventListener('click', () => {
        filterContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (filterClose && filterContainer) {
      filterClose.addEventListener('click', () => {
        filterContainer.classList.remove('active');
        document.body.style.overflow = '';
      });

      // Close on overlay click
      const overlay = document.querySelector('[data-filter-close]:not(button)');
      if (overlay) {
        overlay.addEventListener('click', () => {
          filterContainer.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    }

    // Load More Functionality
    const loadMoreBtn = document.querySelector('[data-load-more]');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', async () => {
        const nextUrl = loadMoreBtn.dataset.nextUrl;
        if (!nextUrl) return;

        // Loading state
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.querySelector('span:not(.loading-spinner)').classList.add('hidden');
        loadMoreBtn.querySelector('.loading-spinner').classList.remove('hidden');

        try {
          const response = await fetch(nextUrl);
          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');

          // Append Products
          const newProducts = doc.querySelectorAll('.product-card');
          const grid = document.querySelector('[data-collection-grid]');
          newProducts.forEach(product => {
            // Ensure animation classes are reset so they fade in
            grid.appendChild(product);
          });

          // Update Load More Button
          const newBtn = doc.querySelector('[data-load-more]');
          if (newBtn && newBtn.dataset.nextUrl) {
            loadMoreBtn.dataset.nextUrl = newBtn.dataset.nextUrl;
            loadMoreBtn.classList.remove('loading');
            loadMoreBtn.querySelector('span:not(.loading-spinner)').classList.remove('hidden');
            loadMoreBtn.querySelector('.loading-spinner').classList.add('hidden');
          } else {
            loadMoreBtn.remove(); // No more pages
          }

          // Re-init any product card listeners (if needed)

        } catch (e) {
          console.error('Error loading more products:', e);
          loadMoreBtn.classList.remove('loading');
        }
      });
    }

    // Helper: Debounce
    function debounce(fn, wait) {
      let t;
      return function () {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, arguments), wait);
      };
    }

    // Helper: Submit Form
    function submitForm() {
      const formData = new FormData(filterForm);
      const searchParams = new URLSearchParams(formData).toString();
      const url = new URL(window.location.href);

      // Keep sort_by if it exists
      const currentSort = url.searchParams.get('sort_by');

      // Construct new URL
      let newPath = window.location.pathname + '?' + searchParams;
      if (currentSort) {
        newPath += '&sort_by=' + currentSort;
      }

      // Navigate
      window.location.href = newPath;
    }
  });
})();

