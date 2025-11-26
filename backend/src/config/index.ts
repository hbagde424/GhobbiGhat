import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Debug: Check if .env is loaded
if (!process.env.CLOUDINARY_API_KEY) {
  console.warn('WARNING: CLOUDINARY_API_KEY is not set. Check your .env file location and content.');
  console.log('Looking for .env at:', path.join(__dirname, '../../.env'));
} else {
  console.log('Cloudinary configuration loaded.');
}

export const config = {
  // Server
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '6789', 10),

  // Database
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/dhobighat',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',

  // Email
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.FROM_EMAIL || 'noreply@dhobighat.com',
    fromName: process.env.FROM_NAME || 'Digital Dhobighat',
  },

  // Twilio
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },

  // Razorpay
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Admin
  superAdmin: {
    email: process.env.SUPER_ADMIN_EMAIL || 'admin@dhobighat.com',
    password: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin@123',
  },

  // Commission
  defaultCommissionRate: parseFloat(process.env.DEFAULT_COMMISSION_RATE || '15'),

  // Auto-approve vendors (for development/testing)
  autoApproveVendors: process.env.AUTO_APPROVE_VENDORS === 'true',

  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
  maxFilesPerUpload: parseInt(process.env.MAX_FILES_PER_UPLOAD || '10', 10),
};
