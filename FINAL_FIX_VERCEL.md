# 🔧 Final Fix - Vercel Environment Variables

## ❌ Error:
```
Environment Variable "MONGODB_URI" references Secret "mongodb_uri", which does not exist.
```

## ✅ Solution: Manual Fix in Vercel Dashboard

### Step 1: Go to Vercel Dashboard
👉 https://vercel.com/dashboard

### Step 2: Open Backend Project
1. Click on `dhobighat` project
2. Click **"Settings"** tab

### Step 3: Environment Variables
1. Click **"Environment Variables"** in left menu
2. Look for `MONGODB_URI`

### Step 4: Fix MONGODB_URI
1. Find the `MONGODB_URI` row
2. Click **"Edit"** (pencil icon)
3. **Clear** the current value
4. **Paste** this:
   ```
   mongodb+srv://developer:Hh1q2w3e4r5t6y7u8i9o0p@cluster0.8ehw8jn.mongodb.net/dhobighat?retryWrites=true&w=majority
   ```
5. Click **"Save"**

### Step 5: Add Missing Variables

If any of these are missing, add them:

```
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
PORT = 3001
FRONTEND_URL = http://localhost:5173
DEFAULT_COMMISSION_RATE = 15
AUTO_APPROVE_VENDORS = true
```

### Step 6: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on latest deployment
3. Wait 2-3 minutes

---

## 🎯 Quick Checklist

- [ ] Go to Vercel dashboard
- [ ] Open backend project
- [ ] Go to Settings → Environment Variables
- [ ] Fix MONGODB_URI with correct connection string
- [ ] Add any missing variables
- [ ] Go to Deployments
- [ ] Click Redeploy
- [ ] Wait for deployment
- [ ] Check if successful ✅

---

## 📝 Your MongoDB Connection String

```
mongodb+srv://developer:Hh1q2w3e4r5t6y7u8i9o0p@cluster0.8ehw8jn.mongodb.net/dhobighat?retryWrites=true&w=majority
```

**Use this exact string in Vercel!**

---

## ✅ After Backend Deploys

1. Copy backend URL
2. Deploy frontend
3. Add `VITE_API_URL` = backend URL
4. Redeploy frontend
5. Test everything
6. 🎉 Live!

---

**Status**: Ready for Manual Fix ✅
**Time**: 5 minutes
**Difficulty**: Easy ✅
