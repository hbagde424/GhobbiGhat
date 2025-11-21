# 🧺 Digital Dhobighat - Online Laundry Service Platform

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D6.0.0-green.svg)

> **India's First Complete Digital Dhobighat Platform** - Connecting customers with local laundry service providers

A full-stack laundry service platform with **4 comprehensive panels**: User, Vendor, Admin, and Super Admin. Built with **MERN + TypeScript** stack.

## ✨ Features

### 👤 User Panel
- 🔐 Secure authentication (JWT-based)
- 📍 Location-based vendor search
- 📅 Schedule pickup & delivery
- 📦 Real-time order tracking
- 💳 Multiple payment options (Razorpay, COD)
- ⭐ Review and rate vendors
- 📱 In-app notifications
- 📧 Email notifications
- 📍 Multiple address management
- 🎁 Loyalty points system

### 🏪 Vendor Panel
- 📝 Business registration & verification
- 📋 Order management dashboard
- 📸 Photo-based inventory tracking
- 💰 Earnings & commission tracking
- ⏰ Business hours management
- 🏦 Bank account management
- 📊 Analytics dashboard
- 🔔 Real-time order notifications
- 📥 Accept/reject orders
- ✉️ Customer communication

### 👨‍💼 Admin Panel
- 📊 Comprehensive dashboard
- 👥 User management
- 🏪 Vendor verification & approval
- 📦 Order monitoring
- 💸 Commission settings
- 💰 Payout management
- 📈 Revenue analytics
- ⚙️ System settings
- 🚫 User/vendor moderation
- 📧 Bulk notifications

### 🔧 Super Admin Panel
- 👨‍💼 Admin management
- 🌍 Global settings
- 🔐 Role & permissions
- 📊 Access logs
- 🛠️ System configuration

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **SMS**: Twilio
- **Payment**: Razorpay
- **Security**: Helmet, CORS, Rate Limiting

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **State Management**: React Context + TanStack Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notifications**: Sonner

## 📁 Project Structure

```
DhobiGhat/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers (7 files)
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models (8 schemas)
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Entry point
│   ├── .env                # Environment variables
│   ├── package.json
│   └── README.md
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   ├── Navbar.tsx
│   │   │   └── NavLink.tsx
│   │   ├── contexts/      # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── pages/         # Page components
│   │   │   ├── user/      # User dashboard pages
│   │   │   ├── vendor/    # Vendor dashboard pages
│   │   │   └── admin/     # Admin dashboard pages
│   │   ├── services/      # API services
│   │   │   ├── auth.service.ts
│   │   │   ├── vendor.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── admin.service.ts
│   │   │   └── api.service.ts
│   │   ├── lib/           # Utilities
│   │   │   ├── api-client.ts
│   │   │   └── utils.ts
│   │   └── App.tsx
│   ├── .env               # Environment variables
│   ├── package.json
│   └── README.md
│
├── SETUP.md               # Detailed setup guide
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
```bash
# Install Node.js 18+
node --version

# Install MongoDB 6+
mongod --version

# Install npm
npm --version
```

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd DhobiGhat

# Setup Backend
cd backend
npm install
# Configure .env file
npm run dev

# Setup Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:6789
- API Health: http://localhost:6789/health

## 📖 Documentation

- **Setup Guide**: [SETUP.md](./SETUP.md) - Detailed setup instructions
- **Backend API**: [backend/README.md](./backend/README.md) - API documentation
- **Frontend**: [frontend/README.md](./frontend/README.md) - Frontend docs

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=6789
MONGODB_URI=mongodb://localhost:27017/dhobighat
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:6789/api
```

## 📊 Database Models

- **User**: Customer & admin accounts
- **Vendor**: Laundry service provider details
- **Service**: Available laundry services
- **Order**: Order details & tracking
- **Review**: Customer reviews & ratings
- **Notification**: In-app notifications
- **Payout**: Vendor payment records
- **Settings**: System configuration

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register        # Register user
POST   /api/auth/login           # Login
GET    /api/auth/me              # Get current user
POST   /api/auth/logout          # Logout
```

### Vendors
```
GET    /api/vendors/search       # Search vendors
GET    /api/vendors/:id          # Get vendor details
POST   /api/vendors/register     # Register vendor
GET    /api/vendors/profile/me   # Get vendor profile
```

### Orders
```
POST   /api/orders               # Create order
GET    /api/orders/my-orders     # Get user orders
GET    /api/orders/:id           # Get order details
PUT    /api/orders/:id/cancel    # Cancel order
```

### Reviews
```
POST   /api/reviews              # Create review
GET    /api/reviews/vendor/:id   # Get vendor reviews
```

## 🎯 Key Features Implementation

### Real-Time Order Tracking
Orders go through multiple status stages:
1. Pending (Order placed)
2. Accepted (Vendor accepted)
3. Picked Up (Clothes collected)
4. In Progress (Being processed)
5. Ready (Ready for delivery)
6. Out for Delivery (On the way)
7. Delivered (Completed)

### Commission System
- Platform charges configurable commission (default 15%)
- Calculated on each order
- Tracked in vendor earnings
- Admin manages commission rates

### Payment Integration
- **Razorpay**: Online payments (Card, UPI, Net Banking)
- **COD**: Cash on Delivery option
- Secure payment processing
- Automatic refunds on cancellation

### Notification System
- **Email**: Order updates, verification emails
- **SMS**: Critical notifications (optional)
- **In-App**: Real-time notifications
- **Push**: Mobile notifications (future)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 📱 Mobile App (Future)

The API is designed to support mobile applications:
- React Native
- Flutter
- Native iOS/Android

## 🌐 Deployment

### Backend (Railway/Render)
```bash
# Build
npm run build

# Start production
npm start
```

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Preview
npm run preview
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Developed with ❤️ for the Indian laundry service industry

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - NoSQL database
- **Express** - Web framework

## 📞 Support

For support, email support@dhobighat.com or join our community forum.

## 🗺️ Roadmap

### ✅ Completed
- [x] User authentication & authorization
- [x] Vendor management system
- [x] Order processing & tracking
- [x] Payment integration (Razorpay)
- [x] Review & rating system
- [x] Admin panel with analytics
- [x] User dashboard (orders, profile, addresses)
- [x] Vendor dashboard (orders, earnings, analytics)
- [x] Admin dashboard (users, vendors, orders)
- [x] Complete REST API with 50+ endpoints
- [x] Role-based access control
- [x] Email & SMS notifications
- [x] File upload with Cloudinary
- [x] Commission management
- [x] Multi-address support

### 🚧 Future Enhancements
- [ ] Mobile applications (React Native)
- [ ] Push notifications
- [ ] Advanced analytics & reports
- [ ] Subscription plans for vendors
- [ ] Multi-language support
- [ ] Route optimization for delivery
- [ ] AI-based stain detection
- [ ] Automated pricing based on demand
- [ ] WhatsApp integration
- [ ] Invoice generation
- [ ] Customer loyalty rewards program
- [ ] Vendor performance metrics

## 📸 Screenshots

(Add screenshots of your application here)

---

**Built with passion for transforming the traditional dhobighat into a digital platform! 🚀**
