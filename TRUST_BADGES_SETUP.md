# Trust Badges App Setup Guide

## Overview
The footer now supports Shopify app blocks, allowing you to integrate the installed trust badges app directly into the footer section.

## Changes Made

### 1. Footer App Block Support
- Added `@app` block type to footer schema
- App blocks render between footer top content and footer bottom (copyright/payment icons)
- Styled with proper spacing and borders for visual separation

### 2. Spacing Improvements
- **Newsletter Section**: Now uses `section--compact` class (reduced padding)
- **Trust Badges Section**: Reduced padding and grid gaps for tighter layout
- **Footer**: Reduced bottom padding for more compact appearance
- Overall spacing between sections is now more cohesive

### 3. Trust Badges Text Update
- Updated "Free Shipping" text from "On orders over $50" to "On orders over $100"
- Matches announcement bar messaging

## How to Add Trust Badges App

### Step 1: Access Theme Customizer
1. Go to Shopify Admin → Online Store → Themes
2. Click "Customize" on the Glowify Enhanced theme
3. Navigate to the Footer section

### Step 2: Add App Block
1. In the Footer section, click "Add block"
2. Look for your installed trust badges app in the list
3. Select the app block
4. Configure the trust badges as needed

### Step 3: Position the App Block
- The app block will appear between the footer columns and the copyright/payment section
- It's styled with borders to visually separate it
- You can reorder blocks by dragging

## Expected Result

The trust badges app will display:
- Security badges (SSL, secure checkout icons)
- Trust seals (money-back guarantee, satisfaction badges)
- Payment method icons (if not already in footer)
- Return policy badges
- Shipping badges

All styled consistently with the theme's design system.

## Technical Details

- **App Block Type**: `@app`
- **Location**: Footer section, between top and bottom sections
- **Styling**: `.footer__app-block` class with spacing and borders
- **Responsive**: Fully responsive, adapts to mobile screens

## Notes

- If you don't see the app in the block list, ensure it's installed and activated
- Some apps may require additional configuration in their app settings
- The app content will automatically inherit theme styling where possible

