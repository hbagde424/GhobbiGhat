import mongoose from 'mongoose';
import Vendor from './src/models/Vendor';
import { config } from './src/config';

// Professional dhobi/laundry service images - High quality working URLs
const defaultGallery = [
  'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'https://images.pexels.com/photos/3945684/pexels-photo-3945684.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
];

async function seedVendorImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log('✅ Connected to MongoDB');

    // Get all vendors
    const allVendors = await Vendor.find({});
    console.log(`\n📋 Found ${allVendors.length} vendors`);

    let updatedCount = 0;

    // Update ALL vendors with gallery images
    for (const vendor of allVendors) {
      // Only update if gallery is empty or missing
      if (!vendor.gallery || vendor.gallery.length === 0) {
        vendor.gallery = defaultGallery;
        await vendor.save();
        updatedCount++;
        console.log(`✅ Updated: ${vendor.businessName}`);
      } else {
        console.log(`⏭️  Skipped: ${vendor.businessName} (already has images)`);
      }
    }

    console.log(`\n✨ Updated ${updatedCount} vendors with gallery images!`);
    console.log('📸 All vendors now have images');
    console.log('🔄 Refresh your browser to see the changes!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding vendor images:', error);
    process.exit(1);
  }
}

seedVendorImages();
