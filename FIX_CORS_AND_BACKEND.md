# 🔧 Fix CORS Error - Complete Solution

## ❌ Error:
```
CORS policy: Response to preflight request doesn't pass access control check
No 'Access-Control-Allow-Origin' header is present
```

## 🔍 Root Cause:
Frontend using placeholder URL: `https://your-backend-url.vercel.app`

---

## ✅ Solution: 3 Steps

### Step 1: Deploy Backend Properly

1. Go to: https://vercel.com/dashboard
2. Click `dhobighat` (backend project)
3. Go to **Settings** → **Environment Variables**
4. Add/Update these variables:

```
MONGODB_URI = mongodb+srv://developer:Hh1q2w3e4r5t6y7u8i9o0p@cluster0.8ehw8jn.mongodb.net/dhobighat?retryWrites=true&w=majority
JWT_SECRET = dhobighat-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET = dhobighat-refresh-secret-key-change-in-production
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-app-specific-password
FROM_EMAIL = noreply@dhobighat.com
FROM_NAME = Digital Dhobighat
CLOUDINARY_CLOUD_NAME = dpaui8plb
CLOUDINARY_API_KEY = 873488488411495
CLOUDINARY_API_SECRET = dVv__qFm0YH8_u6Kqfk66SmxF-c
NODE_ENV = production
FRONTEND_URL = https://dhobighatt.vercel.app
DEFAULT_COMMISSION_RATE = 15
AUTO_APPROVE_VENDORS = true
```

5. Go to **Deployments** → **Redeploy**
6. Wait 2-3 minutes
7. **Copy Backend URL** (e.g., `https://dhobighat-xxxxx.vercel.app`)

---

### Step 2: Update Frontend with Actual Backend URL

1. Open: `frontend/.env.production`
2. Replace:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```
   With actual backend URL:
   ```
   VITE_API_URL=https://dhobighat-xxxxx.vercel.app
   ```

3. Save file
4. Commit and push:
   ```bash
   git add frontend/.env.production
   git commit -m "Update backend URL in frontend"
   git push origin main
   ```

---

### Step 3: Redeploy Frontend

1. Go to: https://vercel.com/dashboard
2. Click `dhobighatt` (frontend project)
3. Go to **Deployments** → **Redeploy**
4. Wait 2-3 minutes

---

## 🎯 Verify CORS is Fixed

1. Open frontend URL: https://dhobighatt.vercel.app
2. Open browser console (F12)
3. Try to register/login
4. Check if CORS error is gone
5. If successful → **No errors!** ✅

---

## 📝 Backend URL Format

Your backend URL will be something like:
```
https://dhobighat-abc123def456.vercel.app
```

**Use this exact URL in frontend!**

---

## 🔐 CORS Configuration

Backend already has CORS configured:
```javascript
const allowedOrigins = (process.env.FRONTEND_URLS || config.frontendUrl)
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (config.env === 'development') return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
```

So CORS will work once:
1. Backend is deployed with correct FRONTEND_URL
2. Frontend uses correct backend URL

---

## ✅ Checklist

- [ ] Backend deployed with all environment variables
- [ ] Backend URL copied
- [ ] Frontend .env.production updated with backend URL
- [ ] Frontend redeployed
- [ ] CORS error gone
- [ ] API calls working

---

## 🚀 After Fix

1. Frontend can call backend API
2. CORS error will be gone
3. Authentication will work
4. All features will work
5. **Live! 🎉**

---

**Status**: Ready for CORS Fix ✅
**Time**: 10 minutes
**Difficulty**: Easy ✅
