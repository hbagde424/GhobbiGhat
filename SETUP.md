# Digital Dhobighat - Complete Setup Guide

## Overview
Complete online laundry service platform with:
- Backend: Node.js + Express + MongoDB + TypeScript
- Frontend: React + TypeScript + Vite + shadcn/ui
- Features: User, Vendor, Admin, Super Admin panels

## Prerequisites
- Node.js 18+ (https://nodejs.org/)
- MongoDB 6+ (https://www.mongodb.com/try/download/community)
- npm or yarn
- Git

## Quick Start

### 1. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Windows: Download from mongodb.com and install
# Mac: brew install mongodb-community
# Linux: Follow mongodb docs

# Start MongoDB
mongod

# MongoDB will run on mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Use it in backend/.env as MONGODB_URI

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (already created, update values)
# Update these in .env:
# - MONGODB_URI (if using Atlas)
# - SMTP credentials for email
# - Other API keys as needed

# Start development server
npm run dev

# Server will run on http://localhost:6789
```

### 3. Frontend Setup

```bash
# Navigate to frontend folder (open new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will run on http://localhost:5173
```

## Configuration

### Backend Environment Variables

Edit `backend/.env`:

```env
# Required
NODE_ENV=development
PORT=6789
MONGODB_URI=mongodb://localhost:27017/dhobighat
JWT_SECRET=your-secret-key

# Email (For Gmail - Enable 2FA and create App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Optional (Can add later)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

### Frontend Environment Variables

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:6789/api
```

## Testing the Application

### 1. Register Users

**User Registration:**
1. Go to http://localhost:5173
2. Click "Get Started"
3. Fill the registration form
4. Email: user@test.com
5. Password: Test@123
6. Phone: 9876543210

**Create Super Admin (Using MongoDB):**
```javascript
// Connect to MongoDB
mongosh

// Use dhobighat database
use dhobighat

// Create super admin user
db.users.insertOne({
  name: "Super Admin",
  email: "admin@dhobighat.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash "SuperAdmin@123"
  phone: "9999999999",
  role: "superadmin",
  isEmailVerified: true,
  isPhoneVerified: true,
  isActive: true,
  addresses: [],
  loyaltyPoints: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### 2. Create Services (Admin Panel)

Once logged in as admin, create services:
- Wash & Fold
- Dry Cleaning
- Ironing
- Stain Removal
- Premium Care

### 3. Register as Vendor

1. Create a vendor account
2. Fill business details
3. Upload documents
4. Admin approves vendor

### 4. Test Order Flow

1. User searches for vendors
2. Selects vendor
3. Schedules pickup
4. Vendor accepts order
5. Updates status
6. User receives notifications
7. User reviews vendor

## API Documentation

### Authentication
```bash
# Register
POST http://localhost:6789/api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}

# Login
POST http://localhost:6789/api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Vendors
```bash
# Search vendors
GET http://localhost:6789/api/vendors/search?pincode=400001

# Get vendor by ID
GET http://localhost:6789/api/vendors/:vendorId
```

### Orders
```bash
# Create order (requires authentication)
POST http://localhost:6789/api/orders
Authorization: Bearer <token>
{
  "vendorId": "...",
  "serviceType": "...",
  "pickupAddress": {...},
  "pickupDate": "2024-01-15T10:00:00Z",
  "pickupTimeSlot": "10:00 AM - 12:00 PM"
}
```

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If error, start MongoDB
mongod
```

### Port Already in Use
```bash
# Backend (Port 6789)
# Windows
netstat -ano | findstr :6789
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:6789 | xargs kill -9

# Frontend (Port 5173)
# Change port in vite.config.ts
```

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
Make sure backend FRONTEND_URL matches your frontend URL in .env

## Project Structure

```
DhobiGhat/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuration
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utilities
│   │   └── server.ts     # Entry point
│   ├── .env              # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Pages
│   │   ├── services/     # API services
│   │   └── lib/          # Utilities
│   ├── .env              # Environment variables
│   └── package.json
│
└── SETUP.md              # This file
```

## Features Implemented

✅ User authentication and authorization
✅ Role-based access (User, Vendor, Admin, Super Admin)
✅ Vendor registration and verification
✅ Order management
✅ Payment integration (Razorpay)
✅ Email notifications
✅ File upload (Cloudinary)
✅ Review and rating system
✅ Location-based vendor search
✅ Commission management
✅ Vendor payouts
✅ Admin dashboard
✅ Real-time order tracking

## Next Steps

1. **Email Setup**: Configure SMTP credentials for email notifications
2. **Payment Gateway**: Add Razorpay keys for online payments
3. **File Upload**: Configure Cloudinary for image uploads
4. **SMS**: Add Twilio credentials for SMS notifications
5. **Production**: Deploy to cloud (Vercel for frontend, Railway/Render for backend)

## Support

For issues or questions:
- Check MongoDB is running
- Check both servers are running
- Check .env files are configured
- Check console for errors

## Development Tips

```bash
# Backend logs
npm run dev  # Shows all API requests

# Frontend logs
Check browser console (F12)

# MongoDB data
mongosh
use dhobighat
db.users.find()
db.vendors.find()
db.orders.find()
```

## Production Deployment

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect Railway/Render to repo
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set VITE_API_URL to production backend URL
4. Deploy

Enjoy building with Digital Dhobighat! 🚀
