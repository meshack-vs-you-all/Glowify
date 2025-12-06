#!/bin/bash
# Setup script for Shopify Theme Development

set -e

echo "🚀 Setting up Shopify Theme Development Environment..."

# Activate virtual environment
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js first."
    exit 1
fi

# Install Shopify CLI if not already installed
if ! command -v shopify &> /dev/null; then
    echo "📦 Installing Shopify CLI..."
    npm install -g @shopify/cli @shopify/theme
else
    echo "✅ Shopify CLI already installed: $(shopify version)"
fi

# Load environment variables
if [ -f .env ]; then
    echo "✅ Found .env file"
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "⚠️  .env file not found. Please create it from .env.example"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Activate virtual environment: source venv/bin/activate"
echo "2. Authenticate with Shopify: shopify auth login"
echo "3. Start development: shopify theme dev --store=\$SHOPIFY_STORE_URL"
echo ""

