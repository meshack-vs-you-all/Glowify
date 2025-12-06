#!/bin/bash
# Start Shopify Theme Development Server

cd "$(dirname "$0")"
source venv/bin/activate
export $(cat .env | grep -v '^#' | xargs)

echo "🚀 Starting Shopify theme development server..."
echo "Store: $SHOPIFY_STORE_URL"
echo ""
echo "This will create a development theme and give you a preview URL."
echo "Press Ctrl+C to stop the server."
echo ""

cd theme-new
npx --yes @shopify/cli@3.88.0 theme dev --store=$SHOPIFY_STORE_URL

