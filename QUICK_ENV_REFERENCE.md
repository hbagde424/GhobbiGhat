# ⚡ Quick Environment Variables Reference

## 🎯 Aapke Screenshots Ke Liye

### Screenshot 1: Root Directory
**Select**: `backend` folder
**Click**: Continue

### Screenshot 2: Project Setup
**Project Name**: `hbagde424-GhobbiGhat-Backend`
**Preset**: `Other`
**Click**: Deploy

---

## 📝 Backend Environment Variables (Copy-Paste Ready)

### Database
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dhobighat?retryWrites=true&w=majority
```

### JWT
```
JWT_SECRET = MySecretKey@2024#DhobiGhat!
JWT_REFRESH_SECRET = RefreshSecret@2024#DhobiGhat!
```

### Email (Gmail)
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-app-password-from-gmail
FROM_EMAIL = noreply@dhobighat.com
FROM_NAME = Digital Dhobighat
```

### Twilio (Optional)
```
TWILIO_ACCOUNT_SID = your-twilio-sid
TWILIO_AUTH_TOKEN = your-twilio-token
TWILIO_PHONE_NUMBER = +1234567890
```

### Razorpay
```
RAZORPAY_KEY_ID = rzp_test_xxxxx
RAZORPAY_KEY_SECRET = xxxxx
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
FRONTEND_URL = https://your-frontend-url.vercel.app
AUTO_APPROVE_VENDORS = true
DEFAULT_COMMISSION_RATE = 15
```

---

## 🎨 Frontend Environment Variables

### Only 1 Variable:
```
VITE_API_URL = https://your-backend-url.vercel.app
```

---

## 🔑 Credentials Kaise Milenge?

### MongoDB Atlas
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster
4. Get connection string
5. Replace username:password

### Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Generate password
4. Copy 16-character password

### Cloudinary
1. Go to: https://cloudinary.com
2. Sign up (free)
3. Go to Dashboard
4. Copy Cloud Name, API Key, API Secret

### Razorpay
1. Go to: https://razorpay.com
2. Sign up
3. Go to Settings → API Keys
4. Copy Key ID and Key Secret (test mode)

### Twilio (Optional)
1. Go to: https://www.twilio.com
2. Sign up
3. Go to Console
4. Copy Account SID and Auth Token
5. Add phone number

---

## ✅ Total Variables Needed

### Backend: 22 variables
- 1 Database
- 2 JWT
- 6 Email
- 3 Twilio
- 2 Razorpay
- 3 Cloudinary
- 5 Other

### Frontend: 1 variable
- 1 API URL

---

## 🚀 Deployment Order

1. **Backend First**
   - Deploy backend
   - Get backend URL
   - Copy it

2. **Frontend Second**
   - Deploy frontend
   - Use backend URL in VITE_API_URL
   - Deploy

---

## 📊 Variable Types

| Type | Count | Examples |
|------|-------|----------|
| Database | 1 | MONGODB_URI |
| Authentication | 2 | JWT_SECRET, JWT_REFRESH_SECRET |
| Email | 6 | SMTP_HOST, SMTP_PORT, etc. |
| SMS | 3 | TWILIO_ACCOUNT_SID, etc. |
| Payment | 2 | RAZORPAY_KEY_ID, etc. |
| Images | 3 | CLOUDINARY_CLOUD_NAME, etc. |
| Config | 5 | NODE_ENV, PORT, etc. |
| **Total** | **22** | - |

---

## 🎯 In Vercel Dashboard

### Add Variable:
1. Click **"Add"** button
2. Enter **Name** (e.g., `MONGODB_URI`)
3. Enter **Value** (e.g., `mongodb+srv://...`)
4. Click **"Add"** again for next variable

### Or After Deployment:
1. Go to project
2. Click **"Settings"**
3. Click **"Environment Variables"**
4. Click **"Add New"**
5. Fill Name and Value
6. Click **"Save"**
7. Go to **"Deployments"**
8. Click **"Redeploy"**

---

## ⚠️ Important Notes

1. **Never share secrets** - Keep them private
2. **Use test keys** - For Razorpay, use test mode initially
3. **Update FRONTEND_URL** - After frontend deployment
4. **Redeploy after changes** - If you update env variables
5. **Check logs** - If something fails

---

## 🎉 After Everything

### Your Live URLs:
```
Frontend: https://hbagde424-GhobbiGhat-Frontend.vercel.app
Backend: https://hbagde424-GhobbiGhat-Backend.vercel.app
```

### Test:
1. Open frontend URL
2. Check if it loads
3. Try features
4. Check console for errors

---

**Status**: Ready to Fill Environment Variables ✅
**Time**: ~30 minutes
**Difficulty**: Easy ✅
