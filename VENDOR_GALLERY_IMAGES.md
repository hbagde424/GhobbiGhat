# Vendor Gallery Images Reference

## Professional Laundry Service Images

These are high-quality, free images from Unsplash that are used in the vendor card galleries.

### Image 1: Professional Laundry Worker
**URL:** `https://images.unsplash.com/photo-1582735689369-6fe1ba1ed94b?w=500&h=400&fit=crop`

**Description:** Professional laundry worker handling clothes with care
- Shows professionalism and expertise
- Builds customer trust
- Demonstrates service quality

---

### Image 2: Industrial Washing Machines
**URL:** `https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=400&fit=crop`

**Description:** Row of modern washing machines in a laundry facility
- Shows equipment quality
- Demonstrates scale of operation
- Indicates modern technology

---

### Image 3: Folded Clean Clothes
**URL:** `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop`

**Description:** Neatly folded clean clothes and linens
- Shows end result quality
- Demonstrates attention to detail
- Builds confidence in service

---

## How Images Are Used

Each vendor card displays these images in a rotating carousel:

```
Vendor Card Layout:
┌─────────────────────────┐
│   [Image Gallery]       │  ← Carousel with navigation
│   (h-48 = 192px)        │
├─────────────────────────┤
│ Business Name           │
│ ⭐ 4.5 (12 reviews)     │
├─────────────────────────┤
│ 📍 City                 │
│ Description...          │
│ [Service Badges]        │
├─────────────────────────┤
│ 📞 Phone Number         │
├─────────────────────────┤
│ [Schedule Pickup Button]│
└─────────────────────────┘
```

## Image Rotation Pattern

The seed script assigns images in a rotating pattern:

| Vendor | Image 1 | Image 2 | Image 3 |
|--------|---------|---------|---------|
| Sparkle Laundry | Worker | Machines | Folded |
| Clean & Shine | Folded | Machines | Worker |
| Express Wash | Machines | Worker | Folded |
| Premium Dry Clean | Worker | Folded | Machines |
| Quick Laundry | Folded | Worker | Machines |

This ensures variety while maintaining professional appearance across all vendors.

## Image Specifications

- **Aspect Ratio:** 4:3 (500x400px)
- **Format:** JPG
- **Source:** Unsplash (Free, no attribution required)
- **License:** Unsplash License (free for commercial use)
- **CDN:** Unsplash CDN (fast, reliable)

## Adding More Images

To add more images to the rotation:

1. Find high-quality laundry service images on Unsplash
2. Get the image ID from the URL
3. Add to `backend/seed-vendor-images.ts`:

```typescript
const vendorGalleries = [
  {
    businessName: 'Sparkle Laundry',
    gallery: [
      'https://images.unsplash.com/photo-[NEW_ID]?w=500&h=400&fit=crop',
      // ... more images
    ],
  },
];
```

4. Run: `npm run seed:images`

## Recommended Image Search Terms

For finding similar images on Unsplash:

- "laundry service"
- "washing clothes"
- "dry cleaning"
- "professional laundry"
- "clean clothes"
- "ironing clothes"
- "laundry worker"
- "washing machine"
- "folded clothes"
- "laundry facility"

## Image Performance

- **Load Time:** < 1 second per image (Unsplash CDN)
- **Caching:** Browser caches images automatically
- **Responsive:** Images scale to fit card size
- **Fallback:** Placeholder shown if image fails to load

## Troubleshooting Image Issues

### Images Not Loading?
1. Check internet connection
2. Verify Unsplash CDN is accessible
3. Check browser console for CORS errors
4. Try clearing browser cache

### Images Look Blurry?
1. Images are optimized for 500x400px
2. Larger displays may show slight blur
3. Consider using higher resolution images

### Carousel Not Working?
1. Ensure gallery array has multiple images
2. Check browser console for JavaScript errors
3. Verify CSS is loaded correctly

## Future Image Enhancements

1. **Vendor-Specific Images** - Allow vendors to upload their own
2. **Image Optimization** - Automatic WebP conversion
3. **Lazy Loading** - Load images only when visible
4. **Image Analytics** - Track which images perform best
5. **AI Image Selection** - Auto-select best images
6. **Image Verification** - Ensure images are appropriate

## License Information

All images used are from Unsplash, which provides:
- ✅ Free for commercial use
- ✅ No attribution required (but appreciated)
- ✅ Can be modified
- ✅ Can be used in projects
- ✅ No permission needed

**Unsplash License:** https://unsplash.com/license
