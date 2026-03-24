import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { config } from '../src/config';
import { connectDatabase } from '../src/config/database';
import { configureCloudinary } from '../src/config/cloudinary';
import { errorHandler, notFound } from '../src/middleware/errorHandler';

// Import routes
import authRoutes from '../src/routes/auth.routes';
import userRoutes from '../src/routes/user.routes';
import vendorRoutes from '../src/routes/vendor.routes';
import orderRoutes from '../src/routes/order.routes';
import adminRoutes from '../src/routes/admin.routes';
import serviceRoutes from '../src/routes/service.routes';
import reviewRoutes from '../src/routes/review.routes';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS: allow configured frontend URL(s) or allow all in development
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests like curl/postman (no origin)
      if (!origin) return callback(null, true);
      if (config.env === 'development') return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, true); // Allow all for now
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

// Initialize database connection
let dbConnected = false;
let dbConnecting = false;

async function initializeDatabase() {
  if (dbConnected || dbConnecting) return;
  
  dbConnecting = true;
  try {
    await connectDatabase();
    configureCloudinary();
    dbConnected = true;
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    dbConnecting = false;
  }
}

// Initialize on first request
app.use(async (_req, _res, next) => {
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('Initialization error:', error);
  }
  next();
});

export default app;
