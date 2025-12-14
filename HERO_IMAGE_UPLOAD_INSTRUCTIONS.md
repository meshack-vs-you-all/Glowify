# How to Upload the Mint Green Stroller Hero Image

## Current Status
The hero section is currently showing a placeholder SVG. You need to upload your mint green stroller image through the Shopify Theme Customizer.

## Steps to Upload the Image

### Option 1: Through Theme Customizer (Recommended)

1. **Access Theme Customizer:**
   - Go to: https://admin.shopify.com/store/ccxwq4-cp/themes/186188431730/editor
   - Or navigate: Online Store → Themes → Customize (on the "Glowify - Hero Image Full Fit" theme)

2. **Find Hero Section:**
   - In the left sidebar, scroll to find the **"Hero"** section
   - Click on it to expand

3. **Upload Desktop Hero Image:**
   - Click on the **"Desktop Hero Image (≥1024px)"** image picker
   - Upload your mint green stroller image
   - **Recommended size:** 1920x1080px (16:9 aspect ratio)
   - The image should be the mint green stroller on a soft mint green background

4. **Upload Tablet Hero Image (Optional):**
   - Click on **"Tablet Hero Image (768-1023px)"**
   - Upload a tablet-optimized version
   - **Recommended size:** 1024x768px (4:3 aspect ratio)

5. **Upload Mobile Hero Image (Optional):**
   - Click on **"Mobile Hero Image (≤767px)"**
   - Upload a mobile-optimized version
   - **Recommended size:** 768x1024px (9:16 aspect ratio)

6. **Save:**
   - Click **"Save"** in the top right corner

### Option 2: Through Files (If you have the image file)

If you have the image file saved locally:

1. **Upload to Shopify Files:**
   - Go to: Settings → Files
   - Click **"Upload files"**
   - Upload your mint green stroller image
   - Copy the image URL

2. **Use in Theme Customizer:**
   - Go to Theme Customizer → Hero section
   - Click on the image picker
   - Select the uploaded image from your files

## Image Requirements

Based on your description, the image should be:
- **Subject:** Premium baby stroller (mint green fabric, cream frame, light brown handle)
- **Background:** Soft mint green solid color or subtle blurred lifestyle scene
- **Style:** Professional product photography, clean and minimal
- **Aspect Ratios:**
  - Desktop: 16:9 (1920x1080px)
  - Tablet: 4:3 (1024x768px) 
  - Mobile: 9:16 (768x1024px)

## What Happens After Upload

Once you upload the image:
- The hero section will automatically fill the entire space (no gaps)
- The image will scale responsively for desktop, tablet, and mobile
- Hot reload will show changes immediately if you're running the dev server

## Localhost Hot Reload

To see changes in real-time:

1. **Start the dev server:**
   ```bash
   cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify
   ./start-dev-server.sh
   ```

2. **Access localhost:**
   - Open: http://localhost:9292
   - Changes will hot reload automatically

3. **Stop the server:**
   - Press `Ctrl+C` in the terminal

## Troubleshooting

- **Image not showing?** Make sure you clicked "Save" in the Theme Customizer
- **Image not filling space?** The CSS is already configured - refresh the page
- **Dev server not working?** Check that port 9292 is not in use by another process


