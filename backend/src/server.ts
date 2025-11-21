import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { config } from './config';
import { connectDatabase } from './config/database';
import { configureCloudinary } from './config/cloudinary';
import { errorHandler, notFound } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import vendorRoutes from './routes/vendor.routes';
import orderRoutes from './routes/order.routes';
import adminRoutes from './routes/admin.routes';
import serviceRoutes from './routes/service.routes';
import reviewRoutes from './routes/review.routes';

const app: Application = express();

// Security middleware
app.use(helmet());
// CORS: allow configured frontend URL(s) or allow all in development
const allowedOrigins = (process.env.FRONTEND_URLS || config.frontendUrl)
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests like curl/postman (no origin)
      if (!origin) return callback(null, true);
      if (config.env === 'development') return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.env,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Initialize services
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Configure Cloudinary
    configureCloudinary();

    // Development-only: auto-seed approved vendors if none exist
    if (config.env === 'development') {
      try {
        // Import here to avoid circular deps during tests
        const Vendor = require('./models/Vendor').default;
        const mongoose = require('mongoose');
        const existing = await Vendor.countDocuments({ isApproved: true });
        if (existing === 0) {
          console.log('No approved vendors found — seeding sample vendors (development only)');
          const samples = [
            {
              userId: new mongoose.Types.ObjectId(),
              businessName: 'Sparkle Laundry',
              ownerName: 'Ramesh Kumar',
              businessEmail: 'sparkle@example.com',
              businessPhone: '9876543210',
              serviceAreas: ['560001', '560002'],
              description: 'Fast and reliable laundry service',
              address: '12 MG Road',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560001',
              governmentIdType: 'aadhar',
              governmentIdNumber: '111122223333',
              governmentIdDocument: 'https://example.com/documents/government-id-1.pdf',
              businessProof: '',
              bankDetails: {
                accountHolderName: 'Ramesh Kumar',
                accountNumber: '1234567890',
                ifscCode: 'SBIN0000001',
                bankName: 'State Bank',
                branch: 'MG Road',
              },
              services: [],
              businessHours: [],
              gallery: [],
              isVerified: true,
              isApproved: true,
              isActive: true,
              verificationStatus: 'approved',
            },
            {
              userId: new mongoose.Types.ObjectId(),
              businessName: 'Clean & Shine',
              ownerName: 'Sita Devi',
              businessEmail: 'clean@example.com',
              businessPhone: '9123456780',
              serviceAreas: ['560001'],
              description: 'Quality wash and fold',
              address: '45 Church St',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560001',
              governmentIdType: 'pan',
              governmentIdNumber: 'ABCDE1234F',
              governmentIdDocument: 'https://example.com/documents/government-id-2.pdf',
              businessProof: '',
              bankDetails: {
                accountHolderName: 'Sita Devi',
                accountNumber: '9876543210',
                ifscCode: 'HDFC0000002',
                bankName: 'HDFC Bank',
                branch: 'Church St',
              },
              services: [],
              businessHours: [],
              gallery: [],
              isVerified: true,
              isApproved: true,
              isActive: true,
              verificationStatus: 'approved',
            },
          ];

          await Vendor.insertMany(samples);
          console.log('Sample vendors seeded');
        }
      } catch (err) {
        console.warn('Vendor seeding failed:', err);
      }
    }

    // Start server
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} in ${config.env} mode`);
      console.log(`Frontend URL: ${config.frontendUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
