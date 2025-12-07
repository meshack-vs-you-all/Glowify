// Cart functionality with AJAX and toast notifications

(function() {
  'use strict';

  // Initialize cart functionality
  function initCart() {
    // Handle add to cart forms
    const addToCartForms = document.querySelectorAll('form[action*="/cart/add"]');
    
    addToCartForms.forEach(form => {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitButton?.textContent || submitButton?.value;
        
        // Disable button and show loading state
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = submitButton.value = 'Adding...';
        }
        
        try {
          const formData = new FormData(form);
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            body: formData
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.description || 'Failed to add item to cart');
          }
          
          const item = await response.json();
          
          // Update cart count
          updateCartCount();
          
          // Show success toast
          if (window.Toast) {
            window.Toast.show(
              `${item.product_title} added to cart`,
              'success',
              'Added to Cart'
            );
          }
          
          // Optional: Open cart drawer or redirect
          // Uncomment if you want to redirect to cart
          // window.location.href = '/cart';
          
        } catch (error) {
          console.error('Cart error:', error);
          
          // Show error toast
          if (window.Toast) {
            window.Toast.show(
              error.message || 'Failed to add item to cart. Please try again.',
              'error',
              'Error'
            );
          }
        } finally {
          // Re-enable button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.value = originalText;
          }
        }
      });
    });
    
    // Handle cart quantity updates
    const quantityButtons = document.querySelectorAll('[data-quantity-increase], [data-quantity-decrease]');
    
    quantityButtons.forEach(button => {
      button.addEventListener('click', async function() {
        const input = this.closest('.quantity-selector')?.querySelector('input[type="number"]');
        if (!input) return;
        
        const isIncrease = this.hasAttribute('data-quantity-increase');
        let value = parseInt(input.value) || 0;
        
        if (isIncrease) {
          value++;
        } else {
          value = Math.max(0, value - 1);
        }
        
        input.value = value;
        
        // Update cart via AJAX
        const cartItem = input.closest('[data-cart-item]');
        if (!cartItem) return;
        
        const key = cartItem.dataset.key;
        if (!key) return;
        
        try {
          const response = await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: key,
              quantity: value
            })
          });
          
          if (!response.ok) throw new Error('Failed to update cart');
          
          const cart = await response.json();
          
          // Reload page to show updated cart
          window.location.reload();
          
        } catch (error) {
          console.error('Cart update error:', error);
          if (window.Toast) {
            window.Toast.show('Failed to update cart. Please try again.', 'error');
          }
        }
      });
    });
    
    // Handle cart item removal
    const removeButtons = document.querySelectorAll('[data-cart-remove]');
    
    removeButtons.forEach(button => {
      button.addEventListener('click', async function(e) {
        e.preventDefault();
        
        if (!confirm('Remove this item from cart?')) return;
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        try {
          const response = await fetch(href, {
            method: 'GET'
          });
          
          if (!response.ok) throw new Error('Failed to remove item');
          
          // Reload page to show updated cart
          window.location.reload();
          
        } catch (error) {
          console.error('Cart remove error:', error);
          if (window.Toast) {
            window.Toast.show('Failed to remove item. Please try again.', 'error');
          }
        }
      });
    });
  }
  
  // Update cart count in header
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCountElements = document.querySelectorAll('[data-cart-count]');
        cartCountElements.forEach(el => {
          el.textContent = cart.item_count;
          if (cart.item_count > 0) {
            el.style.display = 'flex';
          } else {
            el.style.display = 'none';
          }
        });
      })
      .catch(err => console.error('Error fetching cart:', err));
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
  } else {
    initCart();
  }
  
  // Update cart count on page load
  updateCartCount();
  
  // Listen for cart updates from other tabs/windows
  window.addEventListener('storage', function(e) {
    if (e.key === 'cart-updated') {
      updateCartCount();
    }
  });
  
})();

