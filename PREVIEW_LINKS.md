# Preview Links for Client

## Theme Information
- **Store:** ccxwq4-cp.myshopify.com
- **Development Theme ID:** #186029506930
- **Theme Name:** Glowify Complete Pages (or check in Shopify Admin)

---

## Option 1: Direct Preview URL (Recommended for Client)

Use this URL to share with your client:

```
https://ccxwq4-cp.myshopify.com?preview_theme_id=186029506930
```

**How to use:**
1. Copy the URL above
2. Share it with your client
3. They can click it to preview the theme
4. They'll see a banner at the top saying "You're previewing a theme"

---

## Option 2: Shopify Admin Preview

1. Go to: **Shopify Admin → Online Store → Themes**
2. Find your development theme (ID: #186029506930)
3. Click **"Actions" → "Preview"**
4. This opens the preview in a new tab
5. Copy that URL to share with client

---

## Option 3: Local Development Server

If you're running `shopify theme dev`, you can access:

**Local URL:**
```
http://localhost:9292
```

**Note:** This only works on your local machine. To share with client, use Option 1 or 2.

---

## How to Start Dev Server (if needed)

```bash
cd theme-new
npx @shopify/cli theme dev --store=$SHOPIFY_STORE_URL --port=9292
```

This will:
- Start a local server at `http://localhost:9292`
- Sync changes in real-time
- Show preview URL in terminal

---

## Sharing with Client

### Best Method:
1. Use **Option 1** (Direct Preview URL) - easiest for client
2. Send them: `https://ccxwq4-cp.myshopify.com?preview_theme_id=186029506930`
3. They can bookmark it and access anytime

### What Client Will See:
- Full theme preview with all your changes
- Banner at top: "You're previewing a theme"
- All functionality works (cart, navigation, etc.)
- They can browse products, collections, pages

---

## Important Notes

⚠️ **The preview link only works if:**
- The theme is pushed to Shopify (✅ Done)
- The theme ID is correct (✅ Verified: #186029506930)
- The store is accessible

✅ **All changes are live in the preview:**
- Product image adjustments
- Responsive hero section
- Theme color updates
- Footer trust badges
- Announcement bar ($500 message)
- All performance optimizations

---

## Quick Test Checklist

Before sharing with client, verify:

1. ✅ Announcement bar shows "$500" (not $100)
2. ✅ Announcement bar uses theme accent color (sage green)
3. ✅ Product images are uniform size
4. ✅ Footer trust badges are visible
5. ✅ Hero section is responsive (test on mobile/tablet/desktop)
6. ✅ All links work correctly

---

## Troubleshooting

**If preview link doesn't work:**
1. Check theme ID in Shopify Admin → Themes
2. Verify theme is published/pushed
3. Try Option 2 (Admin Preview) instead

**If client can't access:**
- Make sure they're logged into Shopify (if required)
- Check if store has password protection
- Try incognito/private browser window
