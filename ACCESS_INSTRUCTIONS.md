# Access Instructions - Preview Links

## 🚀 Quick Access Options

### Option 1: Local Development Server (For You)

**Local URL:**
```
http://localhost:9292
```

**Status:** Dev server is starting in the background

**To access:**
1. Open your browser
2. Go to: `http://localhost:9292`
3. You'll see the live theme with all changes

**Note:** This only works on your local machine. Changes sync automatically.

---

### Option 2: Direct Preview URL (Share with Client)

**Preview URL:**
```
https://ccxwq4-cp.myshopify.com?preview_theme_id=186029506930
```

**To access:**
1. Copy the URL above
2. Open in any browser
3. Works from anywhere (not just your machine)
4. Perfect for sharing with client

---

### Option 3: Shopify Admin Preview

**Steps:**
1. Go to: https://admin.shopify.com/store/ccxwq4-cp
2. Navigate to: **Online Store → Themes**
3. Find your development theme (ID: #186029506930)
4. Click **"Actions" → "Preview"**
5. Copy the preview URL from the browser address bar

---

## 🔧 Managing the Dev Server

### Check if server is running:
```bash
lsof -i :9292
```

### Stop the server:
```bash
pkill -f "shopify.*theme dev"
```

### Restart the server:
```bash
cd theme-new
npx @shopify/cli theme dev --store=$SHOPIFY_STORE_URL --port=9292
```

---

## 📋 What You'll See

When you access the preview, verify:

✅ **Announcement Bar:**
- Shows "Free shipping on orders above $500"
- Uses theme accent color (sage green)

✅ **Product Pages:**
- Images are uniform size (square)
- Hover zoom works on desktop
- Thumbnails are clickable

✅ **Hero Section:**
- Responsive images (upload in Theme Customizer)
- Text left-aligned on desktop, centered on mobile

✅ **Footer:**
- Trust badges visible (Secure Checkout, Fast Shipping, Quality Guaranteed)
- All policy links working

✅ **Theme Colors:**
- Consistent sage green accent throughout
- Buttons, links, icons all match

---

## 🌐 Sharing with Client

**Best method:** Send them the direct preview URL:
```
https://ccxwq4-cp.myshopify.com?preview_theme_id=186029506930
```

They can:
- Access from any device
- Bookmark it for easy access
- Share with team members
- Test on mobile/tablet/desktop

---

## ⚠️ Troubleshooting

**If localhost:9292 doesn't work:**
1. Wait a few seconds (server may still be starting)
2. Check terminal for any errors
3. Try restarting the dev server

**If preview URL doesn't work:**
1. Verify theme is pushed: `npx @shopify/cli theme push`
2. Check theme ID in Shopify Admin
3. Try the Shopify Admin preview method instead

---

## 📞 Quick Reference

- **Local Access:** http://localhost:9292
- **Client Preview:** https://ccxwq4-cp.myshopify.com?preview_theme_id=186029506930
- **Shopify Admin:** https://admin.shopify.com/store/ccxwq4-cp
- **Theme ID:** #186029506930

