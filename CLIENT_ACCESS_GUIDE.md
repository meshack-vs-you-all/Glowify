# 🔗 Client Access Guide - Glowify Theme Preview

## 🚀 Development Server Status

**Server is running!** You can now access the theme preview using the links below.

---

## 📍 Access Points

### 1. **Local Hot-Reload URL** (For Development)
```
http://127.0.0.1:9292
```
- **Best for:** Real-time development and testing
- **Features:** Instant hot-reload on file changes
- **Access:** Only accessible on your local machine
- **Note:** This is the fastest way to see changes as you edit files

---

### 2. **Shopify Preview URL** (For Client Sharing)
```
https://ccxwq4-cp.myshopify.com/?preview_theme_id=[THEME_ID]
```
- **Best for:** Sharing with clients and stakeholders
- **Features:** Live preview on actual Shopify store
- **Access:** Anyone with the link can view
- **Note:** Theme ID will be shown in terminal output when server starts

**To get the exact URL:**
1. Check the terminal where the dev server is running
2. Look for the line: `┃ Preview URL: https://...`
3. Copy that URL and share with client

---

### 3. **Theme Editor** (For Configuration)
```
https://ccxwq4-cp.myshopify.com/admin/themes/[THEME_ID]/editor
```
- **Best for:** Configuring sections, adding content, customizing
- **Features:** Full theme customizer access
- **Access:** Requires Shopify admin login
- **Note:** Theme ID will be shown in terminal output

---

## 🎯 What to Test

### New Sections
1. **Testimonials/Reviews**
   - Add via Theme Customizer → Sections
   - Test carousel navigation
   - Verify star ratings display

2. **Recently Viewed Products**
   - View multiple products
   - Check if section appears
   - Test horizontal scroll

3. **Related Products**
   - Go to any product page
   - Verify related products show
   - Test quick-add functionality

4. **FAQ Accordion**
   - Add to any page
   - Test search functionality
   - Test accordion expand/collapse

### Product Page
1. **Enhanced Gallery**
   - Test image switching
   - Test thumbnail navigation
   - Test hover zoom (desktop)

2. **Variant Selection**
   - Test all variant options
   - Verify price updates
   - Test color swatches

3. **Sticky Cart (Mobile)**
   - Test on mobile device or resize browser
   - Scroll past product info
   - Verify sticky cart appears

4. **Trust Badges**
   - Verify badges display
   - Check "Why People Love" section

---

## 📱 Mobile Testing

**Important:** Test on actual mobile devices or use browser dev tools:

1. **Chrome DevTools:**
   - Press `F12` or `Ctrl+Shift+I`
   - Click device toolbar icon
   - Select device (iPhone, iPad, etc.)

2. **Test These Features:**
   - Sticky add-to-cart button
   - Mobile menu
   - Touch interactions
   - Responsive layouts

---

## ✅ Pre-Deployment Checklist

Before pushing to Shopify admin themes, verify:

- [ ] All sections display correctly
- [ ] Product page works on mobile
- [ ] Variant selection updates price
- [ ] Add to cart functionality works
- [ ] Images load properly
- [ ] No console errors
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Responsive design works on all breakpoints
- [ ] Client has reviewed and approved

---

## 🚀 Deploying to Shopify Admin Themes

Once everything is confirmed and functional:

### Step 1: Stop Dev Server
Press `Ctrl+C` in the terminal where the server is running

### Step 2: Push as Unpublished Theme
```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify/theme-new
source ../venv/bin/activate
export $(cat ../.env | grep -v '^#' | xargs)
shopify theme push --store=$SHOPIFY_STORE_URL --unpublished
```

### Step 3: Preview in Shopify Admin
1. Go to: `https://ccxwq4-cp.myshopify.com/admin/themes`
2. Find your new theme (will be listed as "Unpublished")
3. Click "Preview" to test
4. Click "Customize" to make any final adjustments

### Step 4: Publish (When Ready)
1. In Shopify Admin → Themes
2. Find your new theme
3. Click "Actions" → "Publish"
4. Confirm publication

---

## 🔧 Troubleshooting

### Server Not Starting?
```bash
# Check if port is in use
lsof -i :9292

# Kill process if needed
kill -9 [PID]

# Restart server
./start-dev-server.sh
```

### Preview URL Not Working?
- Make sure dev server is running
- Check terminal for any error messages
- Verify `.env` file has correct store URL
- Try restarting the server

### Changes Not Showing?
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check terminal for any errors

---

## 📞 Support

If you encounter any issues:
1. Check terminal output for errors
2. Verify all files are saved
3. Check browser console for JavaScript errors
4. Review `IMPLEMENTATION_SUMMARY.md` for details

---

## 🎉 Next Steps

1. **Test Everything** - Use the access points above
2. **Get Client Approval** - Share preview URL
3. **Make Adjustments** - If needed, edit and hot-reload
4. **Deploy** - Push to Shopify when ready
5. **Publish** - Make it live!

---

**Last Updated:** Server starting - check terminal for exact URLs!

