# Preview Links & Hot-Reload Setup

## 🚀 Hot-Reload Development Server

### Start Dev Server (Hot-Reload)

**Option 1: Using the script**
```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify
./start-dev-server.sh
```

**Option 2: Manual command**
```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify/theme-new
source ../../venv/bin/activate
export $(cat ../../.env | grep -v '^#' | xargs)
npx @shopify/cli theme dev --store=$SHOPIFY_STORE_URL --theme="glowify-enhanced"
```

### Hot-Reload URL
Once the server starts, you'll see output like:
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Your local theme is available at:              │
│  http://127.0.0.1:9292                         │
│                                                 │
│  Your preview URL:                              │
│  https://ccxwq4-cp.myshopify.com?preview_theme_id=... │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Local Hot-Reload**: `http://127.0.0.1:9292`
- Updates instantly on file changes
- No need to push to Shopify
- Perfect for development

**Preview URL**: (Shown in terminal output)
- Live preview on your Shopify store
- Share with clients/stakeholders

---

## 📡 Shopify Admin Preview

### Current Theme Preview
After pushing to Shopify, access via:

**Theme Customizer Preview**:
1. Go to Shopify Admin → Online Store → Themes
2. Find "Glowify Enhanced" theme
3. Click "Actions" → "Preview"
4. Or click "Customize" to edit

**Direct Preview Link**:
```
https://ccxwq4-cp.myshopify.com?preview_theme_id=[THEME_ID]
```

*(Theme ID will be shown after pushing)*

---

## ✅ Changes Implemented

### 1. Branded Hero Section
- ✅ Display font for headline: "Where Little Moments Become Big Memories."
- ✅ Clean sans-serif for subline and body text
- ✅ Proper typography hierarchy and spacing
- ✅ Responsive scaling

### 2. Footer Trust Badges
- ✅ Trust badges merged into footer
- ✅ App block support with `essential-banners-block` HTML
- ✅ Centered layout on desktop
- ✅ Stacked on mobile
- ✅ Old trust-badges section removed from homepage

### 3. Product Card Hover Effects
- ✅ Subtle shadow and glow on hover
- ✅ Smooth lift effect (translateY -3px)
- ✅ Border glow with accent color
- ✅ Enhanced box-shadow (0 8px 20px rgba)
- ✅ Smooth transitions (0.3s ease)

---

## 🎨 Typography Rules Applied

**Hero Headline (Large)**:
- Font: Primary display font (`--font-display-family`)
- Weight: Bold
- Letter spacing: -0.02em
- Responsive: 36px mobile → 56px desktop

**Subline, Body, Footer**:
- Font: Clean sans-serif (`--font-body-family`)
- Weight: Regular
- Consistent spacing and hierarchy

---

## 📝 Next Steps

1. **Start Dev Server**:
   ```bash
   ./start-dev-server.sh
   ```

2. **Access Hot-Reload**:
   - Open `http://127.0.0.1:9292` in browser
   - Changes update automatically

3. **Push to Shopify** (when ready):
   ```bash
   cd theme-new
   npx @shopify/cli theme push --store=$SHOPIFY_STORE_URL --unpublished --theme="glowify-enhanced"
   ```

4. **Add Trust Badges App**:
   - Go to Theme Customizer → Footer
   - Click "Add block" → Select your trust badges app
   - The `essential-banners-block` div will render automatically

---

## 🔧 Troubleshooting

**Dev server won't start?**
- Check `.env` file exists with `SHOPIFY_STORE_URL`
- Ensure virtual environment is activated
- Verify Shopify CLI is installed: `npx @shopify/cli --version`

**Hot-reload not working?**
- Check terminal for errors
- Verify port 9292 is not in use
- Try restarting the dev server

**Trust badges not showing?**
- Ensure app is installed in Shopify
- Add app block in Theme Customizer → Footer
- Check browser console for errors

---

## 📞 Support

For issues or questions:
- Check terminal output for error messages
- Verify all environment variables are set
- Ensure theme is pushed to Shopify for admin preview

