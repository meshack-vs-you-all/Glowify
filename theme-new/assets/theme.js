// Theme JavaScript - Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
  // Fade in animations for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate elements on scroll
  document.querySelectorAll('.product-card, .hero-slide, .section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Product card hover animations
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add to cart animations
  const addToCartForms = document.querySelectorAll('form[action*="/cart/add"]');
  addToCartForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const button = this.querySelector('button[type="submit"]');
      if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
      }
    });
  });
});

