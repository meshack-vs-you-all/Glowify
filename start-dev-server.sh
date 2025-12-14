#!/bin/bash
# Start Shopify Theme Dev Server with Hot Reload

cd /home/meshack/crafted-edge-solutions-clients/Negus/Glowify
source venv/bin/activate 2>/dev/null || true
export $(cat .env | grep -v '^#' | xargs) 2>/dev/null

cd theme-new

echo "=== STARTING SHOPIFY THEME DEV SERVER ==="
echo "Store: $SHOPIFY_STORE_URL"
echo "Port: 9292"
echo "Localhost URL: http://localhost:9292"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npx --yes @shopify/cli theme dev --store=$SHOPIFY_STORE_URL --port=9292
