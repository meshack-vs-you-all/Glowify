(function () {
  'use strict';

  const productForm = document.querySelector('form.product-form');
  if (!productForm) return;

  const productData = getProductData();
  let currentVariant = productData?.selected_or_first_available_variant;

  /**
   * Get product data from page
   */
  function getProductData() {
    // Attempt to find the script tag with product json
    const script = document.querySelector('script[data-product-json]');
    if (script) {
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        console.error('Error parsing product JSON:', e);
      }
    }
    // Fallback if we defined it globally or attached to the section
    const section = document.querySelector('[data-product-info]');
    if (section && section.dataset.productJson) {
      return JSON.parse(section.dataset.productJson);
    }
    return null;
  }

  /**
   * Update variant selection
   */
  function updateVariant() {
    if (!productData) return;

    const options = {};
    // Gather checked radios
    const checkedRadios = productForm.querySelectorAll('input[type="radio"][name^="options"]:checked');
    checkedRadios.forEach(radio => {
      const name = radio.name.match(/\[(.*?)\]/)[1]; // Extract option name from options[Color]
      options[name] = radio.value;
    });

    // Find matching variant
    const variant = productData.variants.find(v => {
      return v.options.every((opt, index) => {
        const optionName = productData.options[index];
        return options[optionName] === opt;
      });
    });

    if (variant) {
      currentVariant = variant;
      updateVariantUI(variant);

      // Update hidden input for form submission
      const idInput = productForm.querySelector('input[name="id"]');
      if (idInput) idInput.value = variant.id;
    }
  }

  /**
   * Update UI based on selected variant
   */
  function updateVariantUI(variant) {
    // Update price - Scoped traversal
    const productContainer = productForm.closest('.product-page') || productForm.closest('.product-card') || document;
    const priceContainer = productContainer.querySelector('.product-price') || productContainer.querySelector('.price-component');

    if (priceContainer) {
      if (variant.compare_at_price > variant.price) {
        priceContainer.innerHTML = `
          <span class="price-item price-item--sale">${formatMoney(variant.price)}</span>
          <span class="price-item price-item--compare">${formatMoney(variant.compare_at_price)}</span>
        `;
      } else {
        priceContainer.innerHTML = `<span class="price-item price-item--regular">${formatMoney(variant.price)}</span>`;
      }
    }

    // Update Button State
    const addBtn = productForm.querySelector('[name="add"]');
    const qtyWrapper = productForm.querySelector('[data-quantity-wrapper]');

    if (addBtn) {
      if (variant.available) {
        addBtn.disabled = false;
        addBtn.innerHTML = `
          <span>Add to Bag</span>
          <span class="separator">•</span>
          <span class="btn-price">${formatMoney(variant.price)}</span>
        `;
        // Show quantity when available
        if (qtyWrapper) qtyWrapper.classList.remove('hidden');
      } else {
        addBtn.disabled = true;
        addBtn.textContent = 'Sold Out';
        // Hide quantity when sold out
        if (qtyWrapper) qtyWrapper.classList.add('hidden');
      }
    }

    // Update Image (if variant has distinct image)
    if (variant.featured_image) {
      const matchingThumb = document.querySelector(`.product-gallery__thumb[data-image-url*="${variant.featured_image.src.split('?')[0]}"]`); // Loose match on src
      if (matchingThumb) {
        matchingThumb.click();
      } else {
        // Direct update if no thumb found
        updateMainImage(variant.featured_image.src);
      }
    }

    // Update URL state
    if (variant.id) {
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', newUrl);
    }
  }

  /**
   * Update main product image
   */
  function updateMainImage(src) {
    const mainImg = document.querySelector('[data-main-image]');
    if (!mainImg) return;

    // Simple fade transition
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.onload = () => {
        mainImg.style.opacity = '1';
      };
      // Handle cached images that don't trigger onload
      if (mainImg.complete) mainImg.style.opacity = '1';
    }, 200);
  }

  /**
   * Init Gallery Interactions
   */
  function initGallery() {
    const thumbs = document.querySelectorAll('.product-gallery__thumb');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        // Active state
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Update main image
        const newSrc = this.dataset.imageUrl;
        updateMainImage(newSrc);
      });
    });
  }

  /**
   * Init Quantity
   */
  function initQuantity() {
    const selector = document.querySelector('.quantity-selector');
    if (!selector) return;

    const input = selector.querySelector('.qty-input');
    const btns = selector.querySelectorAll('.qty-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        let val = parseInt(input.value);
        if (btn.dataset.action === 'increase') {
          input.value = val + 1;
        } else if (btn.dataset.action === 'decrease' && val > 1) {
          input.value = val - 1;
        }
      });
    });
  }

  /**
   * Helper: Format Money
   */
  function formatMoney(cents) {
    if (typeof window.Shopify !== 'undefined' && window.Shopify.formatMoney) {
      return window.Shopify.formatMoney(cents);
    }
    return '$' + (cents / 100).toFixed(2);
  }

  // Initialization
  function init() {
    // Listen for variant changes
    const radios = productForm.querySelectorAll('input[type="radio"][name^="options"]');
    radios.forEach(radio => {
      radio.addEventListener('change', updateVariant);
    });

    initGallery();
    initQuantity();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

