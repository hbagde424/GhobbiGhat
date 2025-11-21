import mongoose from 'mongoose';
import Service from './src/models/Service';
import { config } from './src/config';

const services = [
    {
        name: 'Wash & Fold',
        description: 'Regular washing and folding service for everyday clothes',
        icon: '👕',
        category: 'wash_fold',
        basePrice: 80,
        unit: 'kg',
        estimatedTime: '24-48 hours',
        isActive: true,
    },
    {
        name: 'Dry Cleaning',
        description: 'Professional dry cleaning for delicate and formal wear',
        icon: '🧥',
        category: 'dry_cleaning',
        basePrice: 150,
        unit: 'piece',
        estimatedTime: '48-72 hours',
        isActive: true,
    },
    {
        name: 'Ironing Only',
        description: 'Professional ironing service for wrinkle-free clothes',
        icon: '🔥',
        category: 'ironing',
        basePrice: 40,
        unit: 'kg',
        estimatedTime: '12-24 hours',
        isActive: true,
    },
    {
        name: 'Stain Removal',
        description: 'Specialized stain removal treatment for tough stains',
        icon: '✨',
        category: 'stain_removal',
        basePrice: 100,
        unit: 'piece',
        estimatedTime: '48-72 hours',
        isActive: true,
    },
    {
        name: 'Premium Care',
        description: 'Premium care for designer and luxury garments',
        icon: '👔',
        category: 'premium_care',
        basePrice: 250,
        unit: 'piece',
        estimatedTime: '72-96 hours',
        isActive: true,
    },
    {
        name: 'Wash & Iron',
        description: 'Complete wash and iron service for fresh, crisp clothes',
        icon: '👗',
        category: 'wash_fold',
        basePrice: 120,
        unit: 'kg',
        estimatedTime: '24-48 hours',
        isActive: true,
    },
];

async function seedServices() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('🗑️  Cleared existing services');

        // Insert new services
        const createdServices = await Service.insertMany(services);
        console.log(`✅ Created ${createdServices.length} services:`);

        createdServices.forEach((service) => {
            console.log(`   - ${service.name} (₹${service.basePrice}/${service.unit})`);
        });

        console.log('\n✨ Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding services:', error);
        process.exit(1);
    }
}

seedServices();
