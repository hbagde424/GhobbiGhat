# 🚀 Vercel Deployment Guide - DhobiGhat

## Overview
Yeh guide aapke full-stack project ko Vercel pe deploy karne ke liye hai. Frontend aur Backend dono ko separately deploy karna padega.

---

## 📋 Prerequisites

1. **Vercel Account** - https://vercel.com
2. **GitHub Account** - Code ko GitHub pe push karna hoga
3. **Environment Variables** - Sab secrets ready hone chahiye

---

## 🔧 Step 1: GitHub Setup

### 1.1 GitHub Repository Create Karo
```bash
# Agar pehle se nahi hai toh:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dhobighat.git
git push -u origin main
```

### 1.2 GitHub Settings
- Repository ko public ya private rakh sakte ho
- Vercel automatically GitHub se connect hoga

---

## 🎯 Step 2: Backend Deployment (Vercel)

### 2.1 Backend Ko Vercel Pe Deploy Karo

1. **Vercel Dashboard** pe jaao: https://vercel.com/dashboard
2. **"Add New..."** → **"Project"** click karo
3. **GitHub repository** select karo
4. **Root Directory** set karo: `backend`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Start Command**: `node dist/server.ts`

### 2.2 Environment Variables Add Karo

Vercel dashboard mein **Settings** → **Environment Variables** mein ye add karo:

```
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_API_SECRET = your_cloudinary_api_secret
RAZORPAY_KEY_ID = your_razorpay_key_id
RAZORPAY_KEY_SECRET = your_razorpay_key_secret
EMAIL_USER = your_email@gmail.com
EMAIL_PASSWORD = your_app_password
TWILIO_ACCOUNT_SID = your_twilio_sid
TWILIO_AUTH_TOKEN = your_twilio_token
TWILIO_PHONE_NUMBER = your_twilio_number
NODE_ENV = production
PORT = 3001
```

### 2.3 Deploy Karo
- **Deploy** button click karo
- Deployment complete hone ka wait karo
- Backend URL note karo (e.g., `https://dhobighat-backend.vercel.app`)

---

## 🎨 Step 3: Frontend Deployment (Vercel)

### 3.1 Frontend Ko Vercel Pe Deploy Karo

1. **Vercel Dashboard** pe jaao
2. **"Add New..."** → **"Project"** click karo
3. **GitHub repository** select karo (same repo)
4. **Root Directory** set karo: `frontend`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`

### 3.2 Environment Variables Add Karo

```
VITE_API_URL = https://your-backend-url.vercel.app
```

(Backend URL ko replace karo jo Step 2.3 mein note kiya tha)

### 3.3 Deploy Karo
- **Deploy** button click karo
- Deployment complete hone ka wait karo
- Frontend URL note karo (e.g., `https://dhobighat-frontend.vercel.app`)

---

## 🔗 Step 4: Connect Frontend aur Backend

### 4.1 Frontend Environment Variable Update Karo

1. Vercel dashboard mein frontend project kholo
2. **Settings** → **Environment Variables**
3. `VITE_API_URL` ko update karo:
   ```
   VITE_API_URL = https://your-backend-url.vercel.app
   ```

### 4.2 Redeploy Frontend
- **Deployments** tab mein jaao
- Latest deployment ke liye **Redeploy** button click karo

---

## 🗄️ Step 5: Database Setup

### 5.1 MongoDB Atlas Setup (Agar pehle se nahi hai)

1. **MongoDB Atlas** pe jaao: https://www.mongodb.com/cloud/atlas
2. **Create Account** aur **Free Cluster** banao
3. **Connection String** copy karo
4. Vercel mein `MONGODB_URI` environment variable mein paste karo

### 5.2 Database Seeding

Backend deployment ke baad, database ko seed karna padega:

```bash
# Local machine se:
cd backend
npm run seed:services
npm run seed:images
```

Ya Vercel mein **Function** create karke seed script run kar sakte ho.

---

## 🧪 Step 6: Testing

### 6.1 Frontend Test Karo
```
https://your-frontend-url.vercel.app
```

### 6.2 Backend API Test Karo
```
https://your-backend-url.vercel.app/api/health
```

### 6.3 Common Issues

**Issue**: CORS Error
```
Solution: Backend mein CORS settings check karo
```

**Issue**: API Connection Failed
```
Solution: VITE_API_URL environment variable check karo
```

**Issue**: Database Connection Error
```
Solution: MONGODB_URI aur IP whitelist check karo
```

---

## 📊 Deployment Checklist

### Backend
- [ ] GitHub repository setup
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Build successful
- [ ] API endpoints working
- [ ] Database connected
- [ ] Seed scripts run

### Frontend
- [ ] Root directory set to `frontend`
- [ ] Build command correct
- [ ] Environment variables added
- [ ] VITE_API_URL pointing to backend
- [ ] Build successful
- [ ] Pages loading
- [ ] API calls working

---

## 🚀 Quick Deploy Commands

### Local Testing (Before Deploy)
```bash
# Backend
cd backend
npm run build
npm run start

# Frontend (in another terminal)
cd frontend
npm run build
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel

# Deploy frontend
cd frontend
vercel
```

---

## 📝 Environment Variables Reference

### Backend (.env)
```
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dhobighat
JWT_SECRET=your_super_secret_key_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.vercel.app
```

---

## 🔐 Security Tips

1. **Never commit .env files** - Already in .gitignore
2. **Use Vercel Environment Variables** - Secrets safe rahe
3. **Enable HTTPS** - Vercel automatically karta hai
4. **Set up CORS properly** - Backend mein configure karo
5. **Database IP Whitelist** - MongoDB Atlas mein 0.0.0.0 allow karo (production mein specific IPs)

---

## 📞 Troubleshooting

### Build Fails
```
Check: package.json scripts
Check: TypeScript errors
Check: Missing dependencies
```

### API Not Connecting
```
Check: VITE_API_URL environment variable
Check: Backend URL correct hai
Check: CORS enabled hai
```

### Database Connection Error
```
Check: MONGODB_URI correct hai
Check: IP whitelist mein Vercel IP add hai
Check: Database credentials correct hain
```

### Images Not Loading
```
Check: Cloudinary credentials
Check: Image URLs accessible hain
Check: CORS headers set hain
```

---

## 🎯 Next Steps

1. **Monitor Deployments** - Vercel dashboard se logs check karo
2. **Set up Analytics** - Vercel Analytics enable karo
3. **Configure Custom Domain** - Domain connect karo
4. **Set up CI/CD** - Automatic deployments enable karo
5. **Monitor Performance** - Vercel Analytics use karo

---

## 📚 Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Vercel CLI**: https://vercel.com/cli
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Cloudinary**: https://cloudinary.com
- **Razorpay**: https://razorpay.com

---

## ✅ Deployment Complete!

Jab sab kuch setup ho jaye, aapka application production mein live hoga!

**Frontend**: https://your-frontend-url.vercel.app
**Backend**: https://your-backend-url.vercel.app

---

**Last Updated**: March 23, 2026
**Status**: Ready for Deployment ✅
