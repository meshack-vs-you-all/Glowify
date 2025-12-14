# 🔍 How to Access Templates in Shopify Admin

## ⚠️ IMPORTANT: Why Templates Don't Show in Pages List

**Templates are NOT pages** - they are design files that appear in the **Template dropdown** when creating pages.

**The issue:** Templates only show in the dropdown if you're viewing/previewing the theme that contains them.

---

## ✅ SOLUTION: Preview the Correct Theme First

### **Step 1: Preview the Theme with Templates**

1. **Go to:** `https://admin.shopify.com/store/ccxwq4-cp/themes`
2. **Find:** "Glowify Enhanced - Complete Pages" (Theme ID: #186109985138)
3. **Click:** "Actions" → "Preview"
4. **Copy the preview URL** - you'll need this

**OR use this direct preview link:**
```
https://ccxwq4-cp.myshopify.com?preview_theme_id=186109985138
```

### **Step 2: Create Page WHILE Previewing That Theme**

**IMPORTANT:** You must be previewing the theme to see its templates!

1. **While previewing theme #186109985138**, go to:
   `https://admin.shopify.com/store/ccxwq4-cp/pages`
2. **Click "Add page"**
3. **Scroll down to "Template" dropdown**
4. **You should NOW see:**
   - `page` (default)
   - `page.about`
   - `page.contact`
   - `page.terms-of-service` ✅
   - `page.privacy-policy` ✅
   - `page.refund-policy` ✅
   - `page.shipping-policy` ✅
   - `page.cookie-policy` ✅
   - `page.faq` ✅

---

## 🔧 Alternative: Use Theme Editor

### **Method 1: Edit Code in Theme Editor**

1. **Go to:** `https://admin.shopify.com/store/ccxwq4-cp/themes/186109985138/editor`
2. **Click "..." menu** (top right)
3. **Click "Edit code"**
4. **Navigate to:** `templates/` folder
5. **You'll see all your templates there!**

### **Method 2: Verify via CLI**

```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify/theme-new
npx @shopify/cli theme pull --store=$SHOPIFY_STORE_URL --theme=186109985138 --only=templates/
ls templates/page.*.liquid
```

---

## ✅ VERIFICATION: Templates ARE Pushed

**Latest Push:**
- **Theme ID:** #186109985138
- **Status:** Successfully pushed
- **Templates Included:** All 8 page templates

**Templates Pushed:**
1. ✅ `page.terms-of-service.liquid`
2. ✅ `page.privacy-policy.liquid`
3. ✅ `page.refund-policy.liquid`
4. ✅ `page.shipping-policy.liquid`
5. ✅ `page.cookie-policy.liquid`
6. ✅ `page.faq.liquid`
7. ✅ `page.about.liquid`
8. ✅ `page.contact.liquid`

---

## 🎯 STEP-BY-STEP: Create a Page with Template

### **Complete Process:**

1. **Preview the theme:**
   ```
   https://ccxwq4-cp.myshopify.com?preview_theme_id=186109985138
   ```

2. **Open Admin in new tab (keep preview open):**
   ```
   https://admin.shopify.com/store/ccxwq4-cp/pages
   ```

3. **Click "Add page"**

4. **Fill in:**
   - **Title:** "Terms of Service"
   - **Content:** (optional - template has default)
   - **Template:** Select `page.terms-of-service` ⬅️ **HERE!**
   - **Visibility:** Visible
   - **Save**

5. **Test the page:**
   ```
   https://ccxwq4-cp.myshopify.com/pages/terms-of-service?preview_theme_id=186109985138
   ```

---

## 🔍 TROUBLESHOOTING

### **Templates Still Not Showing?**

**Check 1: Are you previewing the right theme?**
- Must preview theme #186109985138
- Templates only show for the active/previewed theme

**Check 2: Clear browser cache**
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Or try incognito/private window

**Check 3: Verify templates are in theme**
- Go to Theme Editor → Edit Code → Templates folder
- You should see all `page.*.liquid` files

**Check 4: Try creating page from Theme Editor**
- Theme Editor → Pages section → Add page
- Template dropdown should show all templates

---

## 📋 QUICK REFERENCE

**Theme ID:** #186109985138  
**Theme Name:** Glowify Enhanced - Complete Pages  
**Preview URL:** `https://ccxwq4-cp.myshopify.com?preview_theme_id=186109985138`  
**Theme Editor:** `https://admin.shopify.com/store/ccxwq4-cp/themes/186109985138/editor`  
**Create Pages:** `https://admin.shopify.com/store/ccxwq4-cp/pages`

---

**Remember:** Templates appear in the **Template dropdown** when creating pages, NOT in the pages list. You must be previewing the theme to see its templates!

