#!/bin/bash
# Keep preview server running in background (for client meetings)

cd "$(dirname "$0")"

# Activate venv and load env
source venv/bin/activate
export $(cat .env | grep -v '^#' | xargs)

# Start server in background with nohup (survives terminal close)
cd theme-new
nohup npx @shopify/cli theme dev --store=$SHOPIFY_STORE_URL --open > ../preview-server.log 2>&1 &

# Save PID
echo $! > ../preview-server.pid

echo "✅ Preview server started in background!"
echo "📋 PID: $(cat ../preview-server.pid)"
echo "📝 Logs: preview-server.log"
echo ""
echo "🔗 Preview URL: https://ccxwq4-cp.myshopify.com/?preview_theme_id=186029506930"
echo ""
echo "To stop server:"
echo "  kill \$(cat preview-server.pid)"
echo ""
echo "To check if running:"
echo "  ps aux | grep shopify"

