/**
 * Product Gallery Script
 * Handles thumbnail selection and main image updates.
 */

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.product-gallery-section');
  if (!gallery) return;

  const thumbs = gallery.querySelectorAll('[data-thumbnail-id]');
  const mainImages = gallery.querySelectorAll('[data-main-image-item]');

  function activateImage(index) {
    // Update Thumbs
    thumbs.forEach(thumb => {
      thumb.classList.toggle('active', thumb.dataset.imageIndex == index);
      thumb.setAttribute('aria-current', thumb.dataset.imageIndex == index);
    });

    // Update Main Images
    // For desktop: scroll to or show the image
    // For mobile: scroll snap
    mainImages.forEach(img => {
      const isMatch = img.dataset.imageIndex == index;
      img.classList.toggle('active', isMatch);
      if (isMatch) {
         img.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }

  // Thumb Click Handler
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const index = this.dataset.imageIndex;
      activateImage(index);
    });
  });

  // Optional: Handle variant change events if your theme emits them
  document.addEventListener('variant:changed', (e) => {
    const variant = e.detail.variant;
    if (variant && variant.featured_media) {
       const mediaId = variant.featured_media.id;
       const targetThumb = Array.from(thumbs).find(t => t.dataset.thumbnailId == mediaId);
       if (targetThumb) {
         activateImage(targetThumb.dataset.imageIndex);
       }
    }
  });
});
