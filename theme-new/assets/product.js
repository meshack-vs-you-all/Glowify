/**
 * Enhanced Product Page JavaScript
 * Handles product page interactions, variant selection, image gallery, and sticky cart
 */

(function() {
  'use strict';

  const productForm = document.querySelector('form[action*="/cart/add"]');
  if (!productForm) return;

  const productData = getProductData();
  let currentVariant = productData?.selected_or_first_available_variant;

  /**
   * Get product data from page
   */
  function getProductData() {
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
   * Update variant selection
   */
  function updateVariant(optionName, optionValue) {
    if (!productData) return;

    const options = {};
    const optionInputs = productForm.querySelectorAll('input[type="radio"][name^="options"]');
    
    optionInputs.forEach(input => {
      if (input.checked) {
        const name = input.name.replace('options[', '').replace(']', '');
        options[name] = input.value;
      }
    });

    // Find matching variant
    const variant = productData.variants.find(v => {
      return v.options.every((opt, index) => {
        const optionName = productData.options[index].toLowerCase();
        return options[optionName] === opt;
      });
    });

    if (variant) {
      currentVariant = variant;
      updateVariantUI(variant);
    }
  }

  /**
   * Update UI based on selected variant
   */
  function updateVariantUI(variant) {
    // Update price
    const priceElement = document.querySelector('[data-product-price]');
    if (priceElement && variant) {
      const price = variant.price;
      const comparePrice = variant.compare_at_price;
      
      if (comparePrice && comparePrice > price) {
        priceElement.innerHTML = `
          <span class="product-price__current">${formatMoney(price)}</span>
          <span class="product-price__compare">${formatMoney(comparePrice)}</span>
        `;
      } else {
        priceElement.innerHTML = `<span class="product-price__current">${formatMoney(price)}</span>`;
      }
    }

    // Update availability
    const addToCartBtn = productForm.querySelector('[data-add-to-cart]');
    if (addToCartBtn) {
      if (variant.available) {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = addToCartBtn.dataset.addText || 'Add to Cart';
        addToCartBtn.classList.remove('button--disabled');
      } else {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = addToCartBtn.dataset.soldOutText || 'Sold Out';
        addToCartBtn.classList.add('button--disabled');
      }
    }

    // Update image if variant has image
    if (variant.featured_image) {
      updateMainImage(variant.featured_image.src);
    }

    // Update URL without reload
    if (variant.id) {
      const newUrl = `${window.location.pathname}?variant=${variant.id}`;
      window.history.replaceState({}, '', newUrl);
    }
  }

  /**
   * Update main product image
   */
  function updateMainImage(imageSrc) {
    const mainImage = document.querySelector('[data-product-main-image]');
    if (mainImage) {
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.onload = () => {
          mainImage.style.opacity = '1';
        };
      }, 150);
    }
  }

  /**
   * Format money
   */
  function formatMoney(cents) {
    if (typeof window.Shopify !== 'undefined' && window.Shopify.formatMoney) {
      return window.Shopify.formatMoney(cents);
    }
    return '$' + (cents / 100).toFixed(2);
  }

  /**
   * Initialize variant selectors
   */
  function initVariantSelectors() {
    const optionInputs = productForm.querySelectorAll('input[type="radio"][name^="options"]');
    
    optionInputs.forEach(input => {
      input.addEventListener('change', () => {
        const optionName = input.name.replace('options[', '').replace(']', '');
        updateVariant(optionName, input.value);
      });
    });
  }

  /**
   * Initialize image gallery
   */
  function initImageGallery() {
    const thumbnails = document.querySelectorAll('[data-product-thumbnail]');
    const mainImage = document.querySelector('[data-product-main-image]');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const imageSrc = this.dataset.imageSrc;
        if (mainImage && imageSrc) {
          updateMainImage(imageSrc);
        }

        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('product-gallery__thumbnail--active'));
        this.classList.add('product-gallery__thumbnail--active');
      });
    });

    // Zoom on hover (desktop)
    if (mainImage && window.innerWidth >= 1024) {
      const galleryContainer = mainImage.closest('.product-gallery__main');
      if (galleryContainer) {
        let zoomEnabled = false;
        
        galleryContainer.addEventListener('mouseenter', () => {
          zoomEnabled = true;
        });

        galleryContainer.addEventListener('mouseleave', () => {
          zoomEnabled = false;
          mainImage.style.transform = 'scale(1)';
        });

        galleryContainer.addEventListener('mousemove', (e) => {
          if (!zoomEnabled) return;
          
          const rect = galleryContainer.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          
          mainImage.style.transformOrigin = `${x}% ${y}%`;
          mainImage.style.transform = 'scale(2)';
        });
      }
    }
  }

  /**
   * Initialize sticky add to cart (mobile)
   */
  function initStickyCart() {
    if (window.innerWidth >= 1024) return; // Desktop only

    const stickyCart = document.querySelector('[data-sticky-cart]');
    const productInfo = document.querySelector('[data-product-info]');
    if (!stickyCart || !productInfo) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyCart.classList.remove('sticky-cart--visible');
        } else {
          stickyCart.classList.add('sticky-cart--visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-100px 0px 0px 0px'
    });

    observer.observe(productInfo);
  }

  /**
   * Initialize quantity controls
   */
  function initQuantityControls() {
    const quantityInput = productForm.querySelector('[data-quantity-input]');
    const decreaseBtn = productForm.querySelector('[data-quantity-decrease]');
    const increaseBtn = productForm.querySelector('[data-quantity-increase]');

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        const current = parseInt(quantityInput.value) || 1;
        if (current > 1) {
          quantityInput.value = current - 1;
        }
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        const current = parseInt(quantityInput.value) || 1;
        quantityInput.value = current + 1;
      });
    }
  }

  /**
   * Initialize
   */
  function init() {
    initVariantSelectors();
    initImageGallery();
    initQuantityControls();
    
    // Sticky cart on mobile
    if (window.innerWidth < 1024) {
      initStickyCart();
    }

    // Update variant on page load if variant ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const variantId = urlParams.get('variant');
    if (variantId && productData) {
      const variant = productData.variants.find(v => v.id.toString() === variantId);
      if (variant) {
        currentVariant = variant;
        updateVariantUI(variant);
      }
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle resize for sticky cart
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth < 1024) {
        initStickyCart();
      }
    }, 250);
  });
})();

