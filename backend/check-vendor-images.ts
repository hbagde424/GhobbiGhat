import mongoose from 'mongoose';
import Vendor from './src/models/Vendor';
import { config } from './src/config';

async function checkVendorImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Get all vendors
    const vendors = await Vendor.find({}).select('businessName gallery');
    
    console.log(`📋 Found ${vendors.length} vendors:\n`);

    vendors.forEach((vendor, index) => {
      console.log(`${index + 1}. ${vendor.businessName}`);
      if (vendor.gallery && vendor.gallery.length > 0) {
        console.log(`   ✅ Gallery: ${vendor.gallery.length} images`);
        vendor.gallery.forEach((img, i) => {
          console.log(`      ${i + 1}. ${img.substring(0, 80)}...`);
        });
      } else {
        console.log(`   ❌ Gallery: Empty or missing`);
      }
      console.log('');
    });

    console.log('✨ Check complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking vendor images:', error);
    process.exit(1);
  }
}

checkVendorImages();
