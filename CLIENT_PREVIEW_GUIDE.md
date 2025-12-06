# 🎨 Client Preview Guide

## 🔗 Preview Access Options

### Option 1: Development Server (Current - Active for 3+ hours)

**Preview URL:** https://ccxwq4-cp.myshopify.com/?preview_theme_id=186029506930

**Status:** ✅ Server is running in background

**How to Keep Running:**
- Server is running in background (PID in /tmp/shopify-preview.log)
- Will stay active as long as your terminal session is open
- For 3+ hours: Keep terminal/SSH session active

**To Check Status:**
```bash
ps aux | grep shopify
```

**To Restart if Needed:**
```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus
./start-preview.sh
```

---

### Option 2: Shopify Admin Access (RECOMMENDED for Client)

**Better for client meetings - no server dependency!**

#### Step 1: Push as Unpublished Theme
```bash
cd theme-new
shopify theme push --store=$SHOPIFY_STORE_URL --unpublished --theme=glowify-enhanced
```

#### Step 2: Get Preview Link from Admin
1. Go to: https://ccxwq4-cp.myshopify.com/admin/themes
2. Find "glowify-enhanced" in "Unpublished themes"
3. Click "Actions" → "Preview"
4. Copy the preview URL
5. **This link works without dev server!**

**Advantages:**
- ✅ No server needed
- ✅ Works from anywhere
- ✅ Client can access independently
- ✅ More stable for presentations

---

### Option 3: Screenshots (Backup)

If preview isn't accessible, use screenshots:
- Homepage
- Product page
- Collection page
- Cart page
- Mobile view

---

## 📱 What to Show Client

### Homepage Features
1. **Hero Section** - "Welcome to Glowify" with Shop Now button
2. **Trust Badges** - 4 benefits (Shipping, Security, Returns, Support)
3. **Featured Products** - Product grid with hover effects
4. **Newsletter** - Email signup

### Key Points to Highlight
- ✅ Clean, modern design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations
- ✅ Professional appearance
- ✅ Easy to customize in Shopify admin

### Pages to Demo
1. Homepage
2. Product page (click any product)
3. Collection/Catalog page
4. Cart (add item, then view cart)
5. Search (use search bar)
6. Contact page

---

## 🎯 Current Preview Status

**URL:** https://ccxwq4-cp.myshopify.com/?preview_theme_id=186029506930

**Server:** Running in background

**Theme Status:** ✅ Fully functional

**Ready for:** Client presentation

---

## 💡 Tips for Client Meeting

1. **Show Mobile View** - Resize browser to show responsiveness
2. **Demonstrate Hover Effects** - Hover over product cards
3. **Test Navigation** - Show menu, cart, search
4. **Explain Customization** - Mention admin setup guide
5. **Show Design System** - Colors, typography, spacing

---

## 🔄 If Server Stops

**Quick Restart:**
```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus
./start-preview.sh
```

**Or Use Admin Preview** (Option 2 above - recommended!)

---

**Good luck with your client meeting!** 🚀

