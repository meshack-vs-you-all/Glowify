#!/bin/bash
# Create portable archive with all files including sensitive data

cd "$(dirname "$0")"

ARCHIVE_NAME="glowify-theme-portable-$(date +%Y%m%d-%H%M%S).zip"
TEMP_DIR="glowify-portable-temp"

echo "📦 Creating portable archive..."

# Create temp directory
mkdir -p "$TEMP_DIR"

# Copy all files except large directories
echo "Copying files..."
rsync -av \
  --exclude='venv/' \
  --exclude='node_modules/' \
  --exclude='.git/' \
  --exclude='*.zip' \
  --exclude='archive/' \
  --exclude='glowify-portable-temp/' \
  --exclude='.shopify/' \
  . "$TEMP_DIR/"

# Create README for portable version
cat > "$TEMP_DIR/PORTABLE_README.md" << 'EOF'
# 📦 Portable Glowify Theme Package

This archive contains everything needed to work with the Glowify theme on a new computer.

## ✅ What's Included

- ✅ Complete theme files (theme-new/)
- ✅ All credentials (.env file)
- ✅ Product CSV data
- ✅ All documentation
- ✅ Setup scripts
- ✅ Design specifications

## 🚀 Quick Setup on New PC

### 1. Extract Archive
Extract this zip file to your desired location.

### 2. Install Prerequisites
```bash
# Install Node.js (if not installed)
# Download from: https://nodejs.org/

# Install Python 3 (if not installed)
# Usually pre-installed on Linux/Mac
```

### 3. Run Setup
```bash
cd [extracted-folder]
./setup.sh
```

### 4. Start Preview Server
```bash
./start-preview.sh
```

## 📋 Files Included

- `theme-new/` - Complete Shopify theme
- `.env` - Store credentials (IMPORTANT: Keep secure!)
- `products_export_1.csv` - Product data
- `enhanced_design_prompt.md` - Design specifications
- `ADMIN_SETUP.md` - Shopify admin guide
- All documentation files

## ⚠️ Important Notes

- **Credentials:** The `.env` file contains sensitive data. Keep it secure!
- **No Git History:** This archive doesn't include .git folder (too large)
- **No Dependencies:** Node modules and Python venv excluded (will be reinstalled)

## 🔗 Preview Access

Once setup is complete, you can:
1. Run `./start-preview.sh` for development preview
2. OR push to Shopify and access via admin theme editor

## 📝 Next Steps

1. Extract archive
2. Run setup script
3. Start preview server
4. Configure in Shopify admin (see ADMIN_SETUP.md)

---

**Created:** $(date)
EOF

# Create zip file
echo "Creating zip archive..."
cd "$TEMP_DIR"
zip -r "../$ARCHIVE_NAME" . -q
cd ..

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Archive created: $ARCHIVE_NAME"
echo "📦 Size: $(du -h "$ARCHIVE_NAME" | cut -f1)"
echo ""
echo "This archive includes:"
echo "  ✅ Theme files"
echo "  ✅ Credentials (.env)"
echo "  ✅ Product CSV"
echo "  ✅ All documentation"
echo "  ✅ Setup scripts"
echo ""
echo "⚠️  Keep this archive secure - it contains sensitive credentials!"

