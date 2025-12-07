// Cart functionality with AJAX and toast notifications

(function() {
  'use strict';

  // Initialize cart functionality
  function initCart() {
    // Handle add to cart forms - check for both class and action
    const addToCartForms = document.querySelectorAll('form.product-form, form[action*="/cart/add"], form[action="/cart/add"]');
    
    if (addToCartForms.length === 0) {
      console.log('No add to cart forms found');
      return;
    }
    
    addToCartForms.forEach(form => {
      // Make sure form has action attribute
      if (!form.action || !form.action.includes('/cart/add')) {
        form.action = '/cart/add';
      }
      
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitButton?.textContent || submitButton?.value || 'Add to cart';
        
        // Disable button and show loading state
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = submitButton.value = 'Adding...';
        }
        
        try {
          const formData = new FormData(form);
          
          // Log for debugging
          console.log('Submitting to cart:', form.action);
          
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
          });
          
          if (!response.ok) {
            let errorMessage = 'Failed to add item to cart';
            try {
              const error = await response.json();
              errorMessage = error.description || error.message || errorMessage;
            } catch (e) {
              errorMessage = `Server error: ${response.status}`;
            }
            throw new Error(errorMessage);
          }
          
          const item = await response.json();
          
          // Update cart count
          updateCartCount();
          
          // Show success message
          showCartMessage(`${item.product_title || 'Item'} added to cart!`, 'success');
          
          // Optional: Open cart drawer or redirect
          // Uncomment if you want to redirect to cart
          // window.location.href = '/cart';
          
        } catch (error) {
          console.error('Cart error:', error);
          
          // Show error message
          showCartMessage(
            error.message || 'Failed to add item to cart. Please try again.',
            'error'
          );
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
          showCartMessage('Failed to update cart. Please try again.', 'error');
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
          showCartMessage('Failed to remove item. Please try again.', 'error');
        }
      });
    });
  }
  
  // Show cart message (toast or alert fallback)
  function showCartMessage(message, type) {
    // Try to use Toast system if available
    if (window.Toast && typeof window.Toast.show === 'function') {
      window.Toast.show(message, type, type === 'success' ? 'Success' : 'Error');
      return;
    }
    
    // Fallback: Create simple toast notification
    const toast = document.createElement('div');
    toast.className = `cart-toast cart-toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10B981' : '#EF4444'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // Add CSS for toast animation
  if (!document.getElementById('cart-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'cart-toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Update cart count in header
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch cart');
        return response.json();
      })
      .then(cart => {
        const cartCountElements = document.querySelectorAll('[data-cart-count]');
        cartCountElements.forEach(el => {
          el.textContent = cart.item_count || 0;
          if (cart.item_count > 0) {
            el.style.display = 'flex';
          } else {
            el.style.display = 'none';
          }
        });
      })
      .catch(err => {
        console.error('Error fetching cart:', err);
        // Don't show error to user for cart count updates
      });
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

