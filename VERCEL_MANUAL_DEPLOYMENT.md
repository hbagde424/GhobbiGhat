# 🚀 Manual Vercel Deployment - Step by Step

## ✅ GitHub Push Complete!

Your code is now on GitHub! 🎉

**Repository**: https://github.com/hbagde424/GhobbiGhat

---

## 📋 Now Deploy to Vercel (Manual Steps)

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Login with your GitHub account
3. Click **"Add New..."** button
4. Select **"Project"**

---

## 🔧 Backend Deployment

### Step 1: Import Repository
1. Select your GitHub repository: `hbagde424/GhobbiGhat`
2. Click **"Import"**

### Step 2: Configure Backend
1. **Project Name**: `dhobighat-backend` (or any name)
2. **Root Directory**: Click dropdown and select `backend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Add Environment Variables
Click **"Environment Variables"** and add these:

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
```

### Step 4: Deploy
1. Click **"Deploy"** button
2. Wait for deployment to complete (2-3 minutes)
3. **Copy the Backend URL** (e.g., `https://dhobighat-backend.vercel.app`)

---

## 🎨 Frontend Deployment

### Step 1: Add New Project
1. Go back to Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. Select same repository: `hbagde424/GhobbiGhat`
4. Click **"Import"**

### Step 2: Configure Frontend
1. **Project Name**: `dhobighat-frontend` (or any name)
2. **Root Directory**: Click dropdown and select `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_API_URL = https://your-backend-url.vercel.app
```

**Replace** `https://your-backend-url.vercel.app` with the actual backend URL from Step 1!

### Step 4: Deploy
1. Click **"Deploy"** button
2. Wait for deployment to complete (2-3 minutes)
3. **Copy the Frontend URL** (e.g., `https://dhobighat-frontend.vercel.app`)

---

## ✅ Testing After Deployment

### Test Backend
Open in browser:
```
https://your-backend-url.vercel.app/api/health
```

Should see: `{"status":"ok"}` or similar

### Test Frontend
Open in browser:
```
https://your-frontend-url.vercel.app
```

Should see your DhobiGhat application!

### Test Features
1. ✅ Pages load
2. ✅ Navigation works
3. ✅ Vendor listing loads
4. ✅ Images display
5. ✅ No console errors

---

## 🔗 Connect Frontend to Backend

If frontend can't connect to backend:

1. Go to Frontend project in Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Update `VITE_API_URL` to correct backend URL
4. Click **"Redeploy"** button

---

## 📊 Your Deployment URLs

After deployment, you'll have:

```
Frontend: https://your-frontend-url.vercel.app
Backend: https://your-backend-url.vercel.app
```

Save these URLs!

---

## 🆘 Troubleshooting

### Build Failed?
1. Check build logs in Vercel
2. Look for error messages
3. Fix locally and push to GitHub
4. Vercel will auto-redeploy

### API Not Connecting?
1. Check `VITE_API_URL` in frontend environment variables
2. Make sure backend URL is correct
3. Check backend is deployed and working

### Database Error?
1. Check `MONGODB_URI` is correct
2. Check IP whitelist in MongoDB Atlas (add 0.0.0.0)
3. Check credentials

### Images Not Loading?
1. Check Cloudinary credentials
2. Verify image URLs are accessible
3. Check CORS headers

---

## 📝 Environment Variables Reference

### Backend Variables (13 total)
```
MONGODB_URI          - MongoDB connection string
JWT_SECRET           - Secret key for JWT tokens
CLOUDINARY_NAME      - Cloudinary account name
CLOUDINARY_API_KEY   - Cloudinary API key
CLOUDINARY_API_SECRET - Cloudinary API secret
RAZORPAY_KEY_ID      - Razorpay key ID
RAZORPAY_KEY_SECRET  - Razorpay key secret
EMAIL_USER           - Email address for sending
EMAIL_PASSWORD       - Email app password
TWILIO_ACCOUNT_SID   - Twilio account SID
TWILIO_AUTH_TOKEN    - Twilio auth token
TWILIO_PHONE_NUMBER  - Twilio phone number
NODE_ENV             - Set to "production"
```

### Frontend Variables (1 total)
```
VITE_API_URL         - Backend API URL
```

---

## 🎯 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables added
- [ ] Frontend deployed to Vercel
- [ ] Frontend VITE_API_URL set correctly
- [ ] Frontend redeployed
- [ ] Backend URL accessible
- [ ] Frontend URL accessible
- [ ] API calls working
- [ ] Database connected
- [ ] Images loading
- [ ] No console errors

---

## 🎉 You're Live!

Once everything is working:

**Frontend**: https://your-frontend-url.vercel.app
**Backend**: https://your-backend-url.vercel.app

Your DhobiGhat application is now live on Vercel! 🚀

---

## 📞 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/hbagde424/GhobbiGhat
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Cloudinary**: https://cloudinary.com
- **Razorpay**: https://razorpay.com

---

**Status**: Ready for Manual Deployment ✅
**Time to Deploy**: 10-15 minutes
**Difficulty**: Easy ✅
