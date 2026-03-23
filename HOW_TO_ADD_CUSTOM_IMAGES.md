# 🎨 How to Add Custom Images to Vendor Cards

## 📸 Current Images

Your vendor cards are now using **high-quality Unsplash images** for laundry services:

1. **Professional Laundry Worker** - Shows expertise
2. **Industrial Washing Machines** - Shows equipment
3. **Folded Clean Clothes** - Shows results

---

## 🎯 How to Add Your Own Images

### Option 1: Use Adobe Stock Images (Recommended)

If you want to use the Adobe Stock dhobi images you found:

1. **Download the images** from Adobe Stock
2. **Upload to a CDN** (Cloudinary, AWS S3, etc.)
3. **Get the image URLs**
4. **Add to seed script** (see below)

### Option 2: Use Free Stock Photo Sites

**Best Free Sites for Laundry/Dhobi Images:**
- Unsplash: https://unsplash.com (search: "laundry")
- Pexels: https://pexels.com (search: "laundry service")
- Pixabay: https://pixabay.com (search: "dhobi")
- Freepik: https://freepik.com (search: "laundry")

### Option 3: Use Your Own Photos

1. **Take photos** of your laundry service
2. **Upload to Cloudinary** (free tier available)
3. **Get the image URLs**
4. **Add to seed script**

---

## 🔧 How to Update Images in Code

### Step 1: Get Image URLs

For each image you want to use, get the full URL:
- Example: `https://images.unsplash.com/photo-1582735689369-6fe1ba1ed94b?w=800&h=600&fit=crop`

### Step 2: Edit the Seed Script

**File**: `backend/seed-vendor-images.ts`

```typescript
const vendorGalleries = [
  {
    businessName: 'Sparkle Laundry',
    gallery: [
      'https://your-image-url-1',  // Replace with your image
      'https://your-image-url-2',  // Replace with your image
      'https://your-image-url-3',  // Replace with your image
    ],
  },
  {
    businessName: 'Clean & Shine',
    gallery: [
      'https://your-image-url-1',
      'https://your-image-url-2',
      'https://your-image-url-3',
    ],
  },
];
```

### Step 3: Run the Seed Script

```bash
cd backend
npm run seed:images
```

### Step 4: Refresh Browser

1. Hard refresh: `Ctrl+Shift+R`
2. Go to: `http://localhost:8080/vendors`
3. See your new images!

---

## 📝 Example: Adding Adobe Stock Images

If you have Adobe Stock images, here's how to add them:

### 1. Download from Adobe Stock
- Go to the image page
- Click "Download"
- Save the image

### 2. Upload to Cloudinary (Free)
- Go to: https://cloudinary.com
- Sign up (free tier)
- Upload your image
- Copy the image URL

### 3. Add to Seed Script
```typescript
const vendorGalleries = [
  {
    businessName: 'Sparkle Laundry',
    gallery: [
      'https://res.cloudinary.com/your-account/image/upload/v123/dhobi-1.jpg',
      'https://res.cloudinary.com/your-account/image/upload/v123/dhobi-2.jpg',
      'https://res.cloudinary.com/your-account/image/upload/v123/dhobi-3.jpg',
    ],
  },
];
```

### 4. Run Seed Script
```bash
npm run seed:images
```

---

## 🌐 Using Cloudinary (Recommended for Custom Images)

### Why Cloudinary?
- ✅ Free tier (25GB storage)
- ✅ Fast CDN
- ✅ Image optimization
- ✅ Easy to use
- ✅ No credit card needed

### Steps:
1. **Sign up**: https://cloudinary.com (free)
2. **Upload images**: Drag and drop
3. **Copy URL**: Click "Copy URL"
4. **Paste in seed script**
5. **Run**: `npm run seed:images`

---

## 📊 Image Best Practices

### Image Size
- **Recommended**: 800x600px or larger
- **Minimum**: 500x400px
- **Aspect Ratio**: 4:3 or 16:9

### File Size
- **Recommended**: < 500KB
- **Optimal**: 100-300KB
- **Format**: JPG, PNG, or WebP

### Image Quality
- ✅ High resolution
- ✅ Professional appearance
- ✅ Relevant to laundry/dhobi
- ✅ Good lighting
- ✅ Clear subject

---

## 🎨 Image Ideas for Dhobi/Laundry

### Essential Images:
1. **Dhobi/Worker** - Shows professionalism
2. **Washing Process** - Shows service
3. **Clean Clothes** - Shows results
4. **Ironing/Pressing** - Shows quality
5. **Storefront** - Shows business

### Optional Images:
- Delivery service
- Customer testimonials
- Equipment/machinery
- Before/after
- Team photos

---

## 🔄 How to Change Images for Specific Vendors

### Edit Individual Vendor

```typescript
const vendorGalleries = [
  {
    businessName: 'Sparkle Laundry',  // Change this vendor
    gallery: [
      'https://new-image-1.jpg',
      'https://new-image-2.jpg',
      'https://new-image-3.jpg',
    ],
  },
];
```

### Add New Vendor

```typescript
const vendorGalleries = [
  // ... existing vendors ...
  {
    businessName: 'Your New Vendor',  // Add new vendor
    gallery: [
      'https://image-1.jpg',
      'https://image-2.jpg',
      'https://image-3.jpg',
    ],
  },
];
```

---

## 🚀 Quick Commands

```bash
# Update images
npm run seed:images

# Start frontend
npm run dev

# View vendors
http://localhost:8080/vendors
```

---

## 🐛 Troubleshooting

### Images Not Showing?
1. Check image URLs are correct
2. Verify images are publicly accessible
3. Hard refresh browser (Ctrl+Shift+R)
4. Check browser console for errors

### Images Load Slowly?
1. Optimize image size (< 500KB)
2. Use CDN-hosted images
3. Try different image format (WebP)
4. Check internet connection

### Wrong Images Showing?
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check seed script has correct URLs
4. Run `npm run seed:images` again

---

## 📚 Resources

### Free Image Sites:
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com
- Freepik: https://freepik.com

### Image Hosting:
- Cloudinary: https://cloudinary.com (free)
- AWS S3: https://aws.amazon.com/s3/
- Imgur: https://imgur.com (free)

### Image Tools:
- TinyPNG: https://tinypng.com (compress)
- Canva: https://canva.com (edit)
- Pixlr: https://pixlr.com (edit)

---

## ✨ Summary

To add custom images:
1. Get image URLs
2. Edit `backend/seed-vendor-images.ts`
3. Replace URLs in gallery arrays
4. Run `npm run seed:images`
5. Refresh browser

**That's it!** Your vendor cards will show the new images. 🎉

---

## 💡 Pro Tips

1. **Use consistent images** - Same style for all vendors
2. **High quality** - Professional appearance matters
3. **Relevant images** - Show laundry/dhobi services
4. **Multiple images** - 3 images per vendor is ideal
5. **Update regularly** - Keep content fresh

---

## 🎯 Next Steps

1. Find images you like (Adobe Stock, Unsplash, etc.)
2. Get the image URLs
3. Edit the seed script
4. Run `npm run seed:images`
5. Refresh and enjoy!

**Happy customizing!** 🚀
