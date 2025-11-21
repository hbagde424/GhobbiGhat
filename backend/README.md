# Digital Dhobighat Backend API

Complete backend API for Digital Dhobighat - Online Laundry Service Platform built with Node.js, Express, MongoDB, and TypeScript.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 👥 **Multi-User Roles** - User, Vendor, Admin, Super Admin
- 📦 **Order Management** - Complete order lifecycle tracking
- 💳 **Payment Integration** - Razorpay integration for online payments
- 📧 **Email Notifications** - Automated email notifications via Nodemailer
- 📱 **SMS Integration** - Twilio integration for SMS notifications
- 📸 **File Upload** - Cloudinary integration for image storage
- ⭐ **Review System** - Customer reviews and ratings
- 💰 **Vendor Payouts** - Automated payout management
- 🔍 **Search & Filters** - Location-based vendor search
- 📊 **Analytics** - Order and revenue analytics

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **SMS**: Twilio
- **Payment**: Razorpay
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
copy .env.example .env
```

4. Configure environment variables in `.env`:
```env
NODE_ENV=development
PORT=6789
MONGODB_URI=mongodb://localhost:27017/dhobighat
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173

# Add other keys as needed
```

5. Start development server
```bash
npm run dev
```

6. Build for production
```bash
npm run build
npm start
```

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### User Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "9876543210"
}
```

#### Add Address
```http
POST /api/users/addresses
Authorization: Bearer <token>
Content-Type: application/json

{
  "label": "Home",
  "fullAddress": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "isDefault": true
}
```

### Vendor Endpoints

#### Register Vendor
```http
POST /api/vendors/register
Authorization: Bearer <token>
Content-Type: multipart/form-data

businessName: Fresh Laundry
ownerName: John Doe
businessPhone: 9876543210
address: 123 Business St
city: Mumbai
state: Maharashtra
pincode: 400001
serviceAreas: ["400001", "400002"]
governmentIdType: aadhar
governmentIdNumber: 1234-5678-9012
```

#### Search Vendors
```http
GET /api/vendors/search?pincode=400001
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "vendorId": "vendor_id_here",
  "serviceType": "service_id_here",
  "pickupAddress": {...},
  "deliveryAddress": {...},
  "pickupDate": "2024-01-15T10:00:00Z",
  "pickupTimeSlot": "10:00 AM - 12:00 PM"
}
```

#### Get My Orders
```http
GET /api/orders/my-orders
Authorization: Bearer <token>
```

#### Track Order
```http
GET /api/orders/:orderId/track
Authorization: Bearer <token>
```

### Admin Endpoints

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <admin_token>
```

#### Get All Vendors
```http
GET /api/admin/vendors
Authorization: Bearer <admin_token>
```

#### Approve Vendor
```http
PUT /api/admin/vendors/:vendorId/approve
Authorization: Bearer <admin_token>
```

## Database Models

### User Model
- Basic user information
- Multiple addresses
- Email and phone verification
- Role-based permissions

### Vendor Model
- Business information
- Service areas (pincodes)
- Bank details
- Verification documents
- Ratings and reviews

### Order Model
- Order details
- Status tracking
- Payment information
- Commission calculation
- Item inventory with photos

### Service Model
- Service categories
- Pricing
- Estimated time

### Review Model
- Customer ratings
- Comments
- Photos
- Vendor responses

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── server.ts        # Entry point
├── .env.example         # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- Request validation
- Rate limiting
- CORS protection
- MongoDB injection protection
- Helmet for HTTP headers

## Error Handling

Centralized error handling with custom error classes:
- `AppError` - Base error class
- `ValidationError` - 400
- `AuthenticationError` - 401
- `AuthorizationError` - 403
- `NotFoundError` - 404
- `ConflictError` - 409

## Environment Variables

Required environment variables:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `FRONTEND_URL` - Frontend application URL
- `RAZORPAY_KEY_ID` - Razorpay key
- `CLOUDINARY_CLOUD_NAME` - Cloudinary config
- `SMTP_HOST` - Email server config

## Development

```bash
# Run in development mode
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## Testing

```bash
npm test
```

## License

ISC

## Support

For support, email support@dhobighat.com
