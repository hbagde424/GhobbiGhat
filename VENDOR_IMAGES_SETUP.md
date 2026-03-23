# Vendor Images Setup Guide

## Overview
The vendor cards have been redesigned with professional image galleries. This guide explains how to add and manage vendor images.

## Features Added

### 1. **Image Gallery Display**
- Each vendor card displays a professional image from their gallery
- Image carousel with navigation arrows (visible on hover)
- Image counter showing current position (e.g., "1/3")
- Smooth zoom effect on hover
- Fallback placeholder for vendors without images

### 2. **Responsive Card Layout**
- **Desktop (lg)**: 3-column grid
- **Tablet (md)**: 2-column grid
- **Mobile (sm)**: 1-column grid
- Vertical card design with image at top
- Better visual hierarchy and spacing

### 3. **Card Information Structure**
- Business name with line clamping
- Rating and review count prominently displayed
- Location with map icon
- Description preview (2 lines max)
- Services as compact badges (max 2 shown + "+X more")
- Phone number in footer
- "Schedule Pickup" button at bottom

## How to Add Images to Vendors

### Option 1: Using the Seed Script (Recommended)

1. **Run the seed script to add images to existing vendors:**
   ```bash
   cd backend
   npm run seed:images
   ```

   This will add professional laundry service images from Unsplash to vendors like:
   - Sparkle Laundry
   - Clean & Shine
   - Express Wash
   - Premium Dry Clean
   - Quick Laundry

### Option 2: Manual Database Update

Update vendor documents in MongoDB with gallery URLs:

```javascript
db.vendors.updateOne(
  { businessName: "Sparkle Laundry" },
  {
    $set: {
      gallery: [
        "https://images.unsplash.com/photo-1582735689369-6fe1ba1ed94b?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop"
      ]
    }
  }
)
```

### Option 3: During Vendor Registration

When vendors register, they can upload images which are stored in the `gallery` field via Cloudinary.

## Image Sources

### Recommended Free Stock Photo Sites:
1. **Unsplash** - High-quality, free images
   - Search: "laundry service", "washing clothes", "dry cleaning"
   - URLs: `https://images.unsplash.com/...`

2. **Pexels** - Free stock photos
   - Search: "laundry", "cleaning service"

3. **Pixabay** - Free images and videos
   - Search: "laundry service", "professional cleaning"

4. **Adobe Stock** - Premium images (paid)
   - Search: "dhobionline", "laundry service"

5. **Shutterstock** - Professional stock photos (paid)
   - Search: "laundry service", "commercial laundry"

6. **iStock** - Professional images (paid)
   - Search: "commercial laundry service"

## Image Best Practices

### Image Specifications:
- **Aspect Ratio**: 16:9 or 4:3 (card displays at h-48 = 192px height)
- **Recommended Size**: 500x400px or larger
- **Format**: JPG, PNG, WebP
- **File Size**: < 500KB for optimal loading

### Image Content Ideas:
1. **Professional Laundry Workers** - Building trust
2. **Washing Machines** - Showing equipment quality
3. **Folded Clean Clothes** - Showing results
4. **Ironing/Pressing** - Service quality
5. **Storefront/Facility** - Business location
6. **Happy Customers** - Social proof
7. **Service in Action** - Process transparency

### Image URLs Format:
```
https://images.unsplash.com/photo-[ID]?w=500&h=400&fit=crop
```

## Vendor Model Structure

The Vendor model includes a `gallery` field:

```typescript
gallery: string[]; // Array of image URLs
```

## Frontend Implementation

### VendorCard Component Features:
- Automatic image carousel
- Keyboard/mouse navigation
- Image error handling with fallback
- Lazy loading support
- Responsive image display
- Smooth transitions and animations

### Usage:
```tsx
<VendorCard vendor={vendor} navigate={navigate} />
```

## Troubleshooting

### Images Not Showing?
1. Check if gallery array is populated in database
2. Verify image URLs are accessible (not blocked by CORS)
3. Check browser console for errors
4. Ensure images are in supported format

### Slow Loading?
1. Optimize image size (< 500KB)
2. Use CDN-hosted images
3. Implement lazy loading
4. Consider WebP format for better compression

### Image Carousel Not Working?
1. Ensure gallery has multiple images
2. Check browser console for JavaScript errors
3. Verify CSS classes are loaded

## Future Enhancements

1. **Image Upload During Registration** - Allow vendors to upload images
2. **Image Optimization** - Automatic resizing and compression
3. **Image Validation** - Check image quality and dimensions
4. **Lightbox Gallery** - Click to view full-size images
5. **Image Analytics** - Track which images get most views
6. **AI Image Tagging** - Auto-categorize images
7. **Image Rotation** - Vendors can manage image order

## Commands Reference

```bash
# Seed vendor images
npm run seed:images

# Seed services
npm run seed:services

# Approve pending vendors
npm run approve:vendors

# Start development server
npm run dev

# Build for production
npm run build
```

## Files Modified

1. **frontend/src/pages/Vendors.tsx**
   - Added VendorCard component with image gallery
   - Updated grid layout to 3 columns
   - Added image carousel functionality

2. **frontend/src/index.css**
   - Added vendor card styling classes
   - Added image hover animations
   - Added responsive grid utilities

3. **backend/seed-vendor-images.ts** (NEW)
   - Script to seed vendor gallery images
   - Uses Unsplash images for demo

4. **backend/package.json**
   - Added `seed:images` script

## Support

For issues or questions about vendor images:
1. Check the troubleshooting section above
2. Review image URLs for accessibility
3. Verify database records have gallery field populated
4. Check browser console for errors
