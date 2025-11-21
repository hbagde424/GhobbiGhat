import mongoose from 'mongoose';
import Vendor from './src/models/Vendor';
import { config } from './src/config';

async function approveAllPendingVendors() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.mongoUri);
        console.log('✅ Connected to MongoDB');

        // Find all pending vendors
        const pendingVendors = await Vendor.find({
            verificationStatus: 'pending',
            isApproved: false,
        });

        console.log(`\n📋 Found ${pendingVendors.length} pending vendors:\n`);

        if (pendingVendors.length === 0) {
            console.log('✨ No pending vendors to approve!');
            process.exit(0);
        }

        // Display vendors
        pendingVendors.forEach((vendor, index) => {
            console.log(`${index + 1}. ${vendor.businessName}`);
            console.log(`   Owner: ${vendor.ownerName}`);
            console.log(`   Email: ${vendor.businessEmail}`);
            console.log(`   City: ${vendor.city}, ${vendor.state}`);
            console.log(`   Created: ${vendor.createdAt}`);
            console.log('');
        });

        // Approve all
        const result = await Vendor.updateMany(
            {
                verificationStatus: 'pending',
                isApproved: false,
            },
            {
                $set: {
                    isApproved: true,
                    isVerified: true,
                    verificationStatus: 'approved',
                },
            }
        );

        console.log(`✅ Approved ${result.modifiedCount} vendors!`);
        console.log('\n🎉 All pending vendors are now approved and will appear in search results!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error approving vendors:', error);
        process.exit(1);
    }
}

approveAllPendingVendors();
