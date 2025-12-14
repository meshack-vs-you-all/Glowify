# 🚀 Quick Setup Guide - Policy Pages

## ⚡ Fast Setup (5 Minutes)

### Step 1: Copy Policy Content to Shopify Admin

1. Go to **Shopify Admin → Settings → Policies**
2. For each policy, click **"Create from template"** or **"Add policy"**
3. Copy and paste content from `POLICY_CONTENT/` folder:

   - **Terms of Service:** Copy from `terms-of-service.txt`
   - **Privacy Policy:** Copy from `privacy-policy.txt`
   - **Refund Policy:** Copy from `refund-policy.txt`
   - **Shipping Policy:** Copy from `shipping-policy.txt`

4. **Important:** Replace all placeholders:
   - `[store_name]` → Your store name
   - `[your_email]` → Your email
   - `[your_phone]` → Your phone
   - `[your_address]` → Your address
   - `[DATE]` → Today's date

### Step 2: Create Cookie Policy Page

1. Go to **Online Store → Pages → Add page**
2. **Title:** Cookie Policy
3. **Content:** Copy from `POLICY_CONTENT/cookie-policy.txt`
4. **Template:** Select `page.cookie-policy`
5. **Save**

### Step 3: Update Footer Menu

1. Go to **Online Store → Navigation**
2. Edit your **Footer** menu (or create one)
3. Add these links:
   - Terms of Service
   - Privacy Policy
   - Cookie Policy
   - Refund Policy (optional)
   - Shipping Policy (optional)

### Step 4: Test Everything

```bash
cd theme-new
shopify theme dev --store=$SHOPIFY_STORE_URL
```

Visit your preview URL and test:
- [ ] All policy pages load
- [ ] Footer links work
- [ ] Pages look correct on mobile
- [ ] Customer account pages work (login, register)

---

## 📋 Detailed Instructions

See `THEME_AUDIT_REPORT.md` for complete setup instructions.

---

## ✅ What Was Created

### Theme Templates (11 files)
- 5 Policy page templates
- 1 FAQ page template
- 3 Customer account templates
- 1 Generic page section
- 1 JSON template (Online Store 2.0)

### Policy Content Files (5 files)
- Ready-to-paste text files for Shopify Admin

### Documentation
- Complete audit report
- Setup instructions
- Validation commands

---

## 🎯 Next Steps

1. ✅ Review policy content
2. ✅ Replace placeholders
3. ✅ Create pages in Shopify Admin
4. ✅ Test locally
5. ✅ Deploy to store

---

**Need Help?** See `THEME_AUDIT_REPORT.md` for detailed instructions.

