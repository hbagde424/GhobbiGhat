# 🔧 Backend Environment Variables Setup - Final

## ⚠️ Issue:
Backend environment variables Vercel mein set nahi hain.

## ✅ Solution:

### Step 1: Go to Vercel Dashboard
👉 https://vercel.com/dashboard

### Step 2: Click Backend Project
👉 Click `dhobighat`

### Step 3: Go to Settings
👉 Click **"Settings"** tab

### Step 4: Environment Variables
👉 Click **"Environment Variables"** in left menu

### Step 5: Add Variables

Add these variables one by one:

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

RAZORPAY_KEY_ID = (leave empty for now)

RAZORPAY_KEY_SECRET = (leave empty for now)

TWILIO_ACCOUNT_SID = (leave empty for now)

TWILIO_AUTH_TOKEN = (leave empty for now)

TWILIO_PHONE_NUMBER = (leave empty for now)

NODE_ENV = production

FRONTEND_URL = https://dhobighatt.vercel.app

DEFAULT_COMMISSION_RATE = 15

AUTO_APPROVE_VENDORS = true
```

### Step 6: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on latest deployment
3. Wait 2-3 minutes

---

## 🎯 After Redeploy:

1. Go to: https://dhobighatt.vercel.app
2. Try to register/login
3. Check if CORS error is gone
4. **Should work now!** ✅

---

**Status**: Ready for Manual Environment Variable Setup ✅
