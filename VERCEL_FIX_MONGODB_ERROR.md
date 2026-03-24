# 🔧 Fix: MONGODB_URI Error in Vercel

## ❌ Error Message:
```
Environment Variable "MONGODB_URI" references Secret "mongodb_uri", which does not exist.
```

## ✅ Solution:

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your backend project: `dhobighat-backend`
3. Click **"Settings"** tab

### Step 2: Go to Environment Variables
1. In left menu, click **"Environment Variables"**
2. Look for `MONGODB_URI` in the list

### Step 3: Fix the Variable
1. Find `MONGODB_URI` row
2. Click the **"Edit"** button (pencil icon)
3. Clear the current value
4. Paste your MongoDB connection string:
   ```
   mongodb+srv://Vercel-Admin-DhobbiGhat:hTYkkXP5rZZhxfhq@dhobbighat.gqaopcv.mongodb.net/?retryWrites=true&w=majority
   ```
5. Click **"Save"**

### Step 4: Redeploy
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click **"Redeploy"** button
4. Wait for deployment to complete

---

## 📝 MongoDB Connection String

Your connection string from `.env` file:
```
mongodb+srv://Vercel-Admin-DhobbiGhat:hTYkkXP5rZZhxfhq@dhobbighat.gqaopcv.mongodb.net/?retryWrites=true&w=majority
```

**Use this exact string in Vercel!**

---

## 🔐 All Environment Variables to Add

If you haven't added them yet, add these in Vercel:

### Database
```
MONGODB_URI = mongodb+srv://Vercel-Admin-DhobbiGhat:hTYkkXP5rZZhxfhq@dhobbighat.gqaopcv.mongodb.net/?retryWrites=true&w=majority
```

### JWT
```
JWT_SECRET = dhobighat-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET = dhobighat-refresh-secret-key-change-in-production
```

### Email
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-app-specific-password
FROM_EMAIL = noreply@dhobighat.com
FROM_NAME = Digital Dhobighat
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME = dpaui8plb
CLOUDINARY_API_KEY = 873488488411495
CLOUDINARY_API_SECRET = dVv__qFm0YH8_u6Kqfk66SmxF-c
```

### Other
```
NODE_ENV = production
PORT = 3001
FRONTEND_URL = http://localhost:5173
DEFAULT_COMMISSION_RATE = 15
AUTO_APPROVE_VENDORS = true
```

### Optional (Twilio & Razorpay)
```
TWILIO_ACCOUNT_SID = (leave empty if not using)
TWILIO_AUTH_TOKEN = (leave empty if not using)
TWILIO_PHONE_NUMBER = (leave empty if not using)
RAZORPAY_KEY_ID = (leave empty if not using)
RAZORPAY_KEY_SECRET = (leave empty if not using)
```

---

## ✅ Checklist

- [ ] Go to Vercel dashboard
- [ ] Open backend project settings
- [ ] Go to Environment Variables
- [ ] Find MONGODB_URI
- [ ] Edit and paste correct connection string
- [ ] Save changes
- [ ] Go to Deployments
- [ ] Click Redeploy
- [ ] Wait for deployment
- [ ] Check if error is gone

---

## 🎯 After Fixing

1. Deployment should succeed
2. You'll get a backend URL
3. Then deploy frontend
4. Add frontend URL to FRONTEND_URL variable
5. Done! 🎉

---

## 🆘 If Still Getting Error

### Check:
1. MongoDB connection string is correct
2. No extra spaces in the value
3. Username and password are correct
4. Cluster is active in MongoDB Atlas

### If MongoDB is down:
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Check cluster status
3. Make sure it's running
4. Restart if needed

---

**Status**: Ready to Fix ✅
**Time**: 5 minutes
**Difficulty**: Easy ✅
