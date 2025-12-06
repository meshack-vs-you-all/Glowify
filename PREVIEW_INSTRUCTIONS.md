# 🎨 Preview Your Theme

## Quick Start

I've created a script to make this easier. Run:

```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus
./start-preview.sh
```

## Manual Method

If you prefer to run it manually:

```bash
cd /home/meshack/crafted-edge-solutions-clients/Negus
source venv/bin/activate
export $(cat .env | grep -v '^#' | xargs)
cd theme-new
npx @shopify/cli theme dev --store=$SHOPIFY_STORE_URL
```

## What to Expect

1. **First Time:** You may need to authenticate
   - The CLI will open your browser
   - Log in to your Shopify account
   - Authorize the CLI

2. **After Authentication:** You'll see:
   ```
   ┃ Preview URL: https://ccxwq4-cp.myshopify.com/?preview_theme_id=XXXXX
   ┃ Theme Editor: https://admin.shopify.com/store/ccxwq4-cp/themes/XXXXX/editor
   ```

3. **Copy the Preview URL** and open it in your browser!

## Important Notes

- ✅ **Safe:** This creates a development theme - won't affect your live store
- ✅ **Hot Reload:** Changes auto-sync as you edit files
- ✅ **Preview Only:** Customers won't see this theme
- ⏸️ **Press Ctrl+C** to stop the server

## Sharing with Client

### Option 1: Screenshots (Easiest)
- Take screenshots of key pages
- Share via email/Slack

### Option 2: Preview URL (Direct Access)
- Share the preview URL directly
- Client can view but not edit
- URL works as long as dev server is running

### Option 3: ngrok (For Local Development)
If you need to share a local server:
```bash
# Install ngrok
# Then tunnel the preview URL
ngrok http https://ccxwq4-cp.myshopify.com
```

### Option 4: Deploy as Unpublished Theme
```bash
cd theme-new
shopify theme push --store=$SHOPIFY_STORE_URL --unpublished
```
Then share the theme preview link from Shopify Admin.

## Troubleshooting

**"Authentication required"**
- Run: `shopify auth login`
- Or: `npx @shopify/cli auth login`

**"Store not found"**
- Check `.env` file has correct `SHOPIFY_STORE_URL`
- Format: `https://ccxwq4-cp.myshopify.com/`

**"Permission denied"**
- Make sure you have collaborator access
- Check collaborator code in `.env`

---

**Ready?** Run `./start-preview.sh` and get your preview URL! 🚀

