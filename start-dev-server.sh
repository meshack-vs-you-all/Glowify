#!/bin/bash
# Start Shopify CLI dev server with hot-reload

cd "$(dirname "$0")/theme-new"

# Load environment variables if .env exists
if [ -f "../../.env" ]; then
    export $(cat ../../.env | grep -v '^#' | xargs)
elif [ -f "../.env" ]; then
    export $(cat ../.env | grep -v '^#' | xargs)
fi

# Activate virtual environment if it exists
if [ -f "../../venv/bin/activate" ]; then
    source ../../venv/bin/activate
elif [ -f "../venv/bin/activate" ]; then
    source ../venv/bin/activate
fi

echo "🚀 Starting Shopify CLI dev server..."
echo "📡 Hot-reload will be available at: http://127.0.0.1:9292"
echo "🔗 Preview link will be shown below"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npx @shopify/cli theme dev --store=$SHOPIFY_STORE_URL --theme="glowify-enhanced"

