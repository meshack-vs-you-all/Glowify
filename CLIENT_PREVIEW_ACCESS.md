# 🔗 Client Preview Access - Glowify Theme

## 🚀 Quick Start - Start Preview Server

### **Method 1: Use Start Script (Easiest)**

```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify
./start-preview.sh
```

### **Method 2: Manual Command**

```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify
source venv/bin/activate
export $(cat .env | grep -v '^#' | xargs)
cd theme-new
shopify theme dev --store=$SHOPIFY_STORE_URL
```

---

## 📡 Access URLs

### **1. Shopify Preview URL** ⭐ (Best for Client Sharing)

When you start the server, you'll see output like:

```
┃ Preview URL: https://ccxwq4-cp.myshopify.com/?preview_theme_id=XXXXX
┃ Theme Editor: https://admin.shopify.com/store/ccxwq4-cp/themes/XXXXX/editor
```

**Copy the "Preview URL" and share it with your client!**

This URL:
- ✅ Works externally (no localhost needed)
- ✅ Accessible from anywhere in the world
- ✅ Shows the live theme on Shopify
- ✅ Safe (doesn't affect live store)
- ✅ Perfect for client sharing

### **2. Localhost Access** (Development Only)

The Shopify CLI also runs a local server at:
- **URL:** `http://127.0.0.1:9292` or `http://localhost:9292`
- **Purpose:** Hot-reload during development
- **Note:** This is for local development only, not for client preview

---

## 📋 What Happens When You Start

1. **Creates Development Theme** - A separate theme on your Shopify store
2. **Syncs Files** - Uploads all theme files to Shopify
3. **Starts Local Server** - Runs at `http://127.0.0.1:9292` for hot-reload
4. **Provides Preview URL** - Shows in terminal output
5. **Hot Reload** - Changes sync automatically

---

## 🎯 For Client Sharing

### **Best Method: Shopify Preview URL**

1. Start the server: `./start-preview.sh`
2. Look for the line: `┃ Preview URL: https://...`
3. Copy that URL
4. Share with client - they can access it from anywhere!

**Example Preview URL:**
```
https://ccxwq4-cp.myshopify.com/?preview_theme_id=186063749490
```

### **Alternative: Theme Editor Preview**

1. Go to **Shopify Admin → Online Store → Themes**
2. Find your development theme
3. Click **"Actions" → "Preview"**
4. Copy the preview URL from the browser

---

## 🔧 Troubleshooting

### **Preview URL Not Showing?**

1. Check `.env` file exists with `SHOPIFY_STORE_URL`
2. Verify Shopify CLI is installed: `shopify version`
3. Check you're authenticated: `shopify auth status`

### **Can't Access Localhost?**

- Localhost (`127.0.0.1:9292`) is for development only
- Use the **Shopify Preview URL** instead for external access
- The preview URL works from anywhere in the world

### **Server Won't Start?**

```bash
# Check environment
source venv/bin/activate
export $(cat .env | grep -v '^#' | xargs)
echo $SHOPIFY_STORE_URL  # Should show your store URL

# Try starting again
cd theme-new
shopify theme dev --store=$SHOPIFY_STORE_URL
```

---

## 📝 Notes

- **Development Theme** = Safe, doesn't affect live store
- **Preview URL** = Best for client sharing (external access)
- **Localhost** = For development only (hot-reload)
- **Hot Reload** = Changes sync automatically when editing files

---

## ✅ Quick Checklist

- [ ] Run `./start-preview.sh`
- [ ] Copy the Preview URL from terminal
- [ ] Share Preview URL with client
- [ ] Test all pages work correctly
- [ ] Verify policy pages are accessible

---

**Ready?** Run `./start-preview.sh` and get your preview URL! 🚀
