# Product Image Cropping Update

## Changes Made

### 1. Uniform Image Display
- Changed product card aspect ratio from **4:5 (125%)** to **1:1 (100%)** for consistent square display
- All product images in featured collection, collection pages, search results, and related products now display uniformly

### 2. Stroller-Focused Cropping
- Added `object-position: center 30%` to crop images to focus on the stroller
- Images now show the upper-middle portion (where the stroller typically appears)
- Uses the "Amazing Product" stroller as reference for cropping position

### 3. Where Changes Apply
The changes apply to all product displays that use the `product-card` snippet:
- ✅ Featured Collection section (homepage)
- ✅ Collection pages
- ✅ Search results
- ✅ Related products section
- ✅ Any other section using `{% render 'product-card' %}`

### 4. Product Page Images
- Product page images remain unchanged (full gallery view)
- Only collection/homepage product cards are cropped
- Users can see all product images when visiting individual product pages

## Technical Details

**File Modified:** `theme-new/snippets/product-card.liquid`

**CSS Changes:**
```css
.product-card__image-wrapper {
  padding-top: 100%; /* Changed from 125% to 100% for 1:1 ratio */
}

.product-card__image {
  object-position: center 30%; /* Crop to show stroller (upper-middle) */
  object-fit: cover; /* Maintains aspect ratio while filling container */
}
```

## Result

- All product cards now display in uniform 1:1 square format
- Images are cropped to consistently show the stroller portion
- Consistent appearance across homepage, collections, and search
- Full product images still available on individual product pages


