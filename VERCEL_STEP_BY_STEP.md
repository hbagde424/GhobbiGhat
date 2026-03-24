# 📸 Vercel Deployment - Step by Step (With Your Screenshots)

## 🎯 Screenshot 1: Root Directory Selection

### Aap Dekh Rahe Ho:
```
Root Directory
├─ GhobbiGhat (root)
├─ backend
└─ frontend
```

### 👉 Kya Karna Hai:

**Step 1**: Click on `backend` radio button
```
( ) GhobbiGhat (root)
(●) backend          ← Click here
( ) frontend
```

**Step 2**: Click **"Continue"** button

---

## 🎯 Screenshot 2: Project Configuration

### Aap Dekh Rahe Ho:
```
Vercel Team: hbagde424's projects
Project Name: hbagde424-GhobbiGhat
Application Preset: Other
```

### 👉 Kya Karna Hai:

**Step 1**: Change Project Name
```
Current: hbagde424-GhobbiGhat
Change to: hbagde424-GhobbiGhat-Backend
```

**Step 2**: Keep Application Preset as `Other`
```
Application Preset: Other ✓
```

**Step 3**: Click **"Deploy"** button

---

## 🔐 Step 3: Environment Variables Setup

### After Clicking Deploy, You'll See:

A form to add environment variables. Yahan pe aapko 22 variables add karne hain.

### 📝 Variables to Add (In Order):

#### **1. Database**
```
Name: MONGODB_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/dhobighat?retryWrites=true&w=majority
```

#### **2. JWT Secrets**
```
Name: JWT_SECRET
Value: MySecretKey@2024#DhobiGhat!

Name: JWT_REFRESH_SECRET
Value: RefreshSecret@2024#DhobiGhat!
```

#### **3. Email Configuration**
```
Name: SMTP_HOST
Value: smtp.gmail.com

Name: SMTP_PORT
Value: 587

Name: SMTP_USER
Value: your-email@gmail.com

Name: SMTP_PASSWORD
Value: your-app-password-from-gmail

Name: FROM_EMAIL
Value: noreply@dhobighat.com

Name: FROM_NAME
Value: Digital Dhobighat
```

#### **4. Twilio (Optional)**
```
Name: TWILIO_ACCOUNT_SID
Value: your-twilio-sid

Name: TWILIO_AUTH_TOKEN
Value: your-twilio-token

Name: TWILIO_PHONE_NUMBER
Value: +1234567890
```

#### **5. Razorpay**
```
Name: RAZORPAY_KEY_ID
Value: rzp_test_xxxxx

Name: RAZORPAY_KEY_SECRET
Value: xxxxx
```

#### **6. Cloudinary**
```
Name: CLOUDINARY_CLOUD_NAME
Value: dpaui8plb

Name: CLOUDINARY_API_KEY
Value: 873488488411495

Name: CLOUDINARY_API_SECRET
Value: dVv__qFm0YH8_u6Kqfk66SmxF-c
```

#### **7. Other Configuration**
```
Name: NODE_ENV
Value: production

Name: PORT
Value: 3001

Name: FRONTEND_URL
Value: https://your-frontend-url.vercel.app

Name: AUTO_APPROVE_VENDORS
Value: true

Name: DEFAULT_COMMISSION_RATE
Value: 15
```

---

## 🎨 Frontend Deployment

### After Backend is Deployed:

**Step 1**: Go back to Vercel dashboard
**Step 2**: Click **"Add New"** → **"Project"**
**Step 3**: Select same repository
**Step 4**: Select **`frontend`** as root directory
**Step 5**: Click **"Continue"**

### Project Configuration:
```
Project Name: hbagde424-GhobbiGhat-Frontend
Application Preset: Other
```

### Environment Variables:
```
Name: VITE_API_URL
Value: https://your-backend-url.vercel.app
```

**Replace** `https://your-backend-url.vercel.app` with actual backend URL!

---

## 📊 Complete Checklist

### Before Starting:
- [ ] GitHub account ready
- [ ] Vercel account ready
- [ ] MongoDB Atlas account ready
- [ ] Cloudinary account ready
- [ ] Razorpay account ready
- [ ] Gmail account ready

### Backend Deployment:
- [ ] Root directory: `backend` selected
- [ ] Project name: `hbagde424-GhobbiGhat-Backend`
- [ ] Application preset: `Other`
- [ ] All 22 environment variables added
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy backend URL

### Frontend Deployment:
- [ ] Root directory: `frontend` selected
- [ ] Project name: `hbagde424-GhobbiGhat-Frontend`
- [ ] Application preset: `Other`
- [ ] VITE_API_URL set with backend URL
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy frontend URL

### Testing:
- [ ] Open frontend URL in browser
- [ ] Check if pages load
- [ ] Try to view vendors
- [ ] Check browser console for errors
- [ ] Test API calls

---

## 🔑 Where to Get Credentials

### MongoDB Atlas
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create account
3. Create free cluster
4. Click "Connect"
5. Copy connection string
6. Replace username:password
```

### Gmail App Password
```
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Generate password
4. Copy 16-character password
```

### Cloudinary
```
1. Go to: https://cloudinary.com
2. Sign up
3. Go to Dashboard
4. Copy Cloud Name, API Key, API Secret
```

### Razorpay
```
1. Go to: https://razorpay.com
2. Sign up
3. Go to Settings → API Keys
4. Copy Key ID and Key Secret (test mode)
```

### Twilio (Optional)
```
1. Go to: https://www.twilio.com
2. Sign up
3. Go to Console
4. Copy Account SID and Auth Token
5. Add phone number
```

---

## ⚡ Quick Summary

### What You're Doing:
1. Deploying backend to Vercel
2. Adding 22 environment variables
3. Deploying frontend to Vercel
4. Adding 1 environment variable
5. Testing everything

### Time Required:
- Backend deployment: 5 minutes
- Frontend deployment: 5 minutes
- Total: ~10 minutes (+ time to gather credentials)

### Result:
```
Frontend: https://hbagde424-GhobbiGhat-Frontend.vercel.app
Backend: https://hbagde424-GhobbiGhat-Backend.vercel.app
```

---

## 🎯 Next Steps

### Right Now:
1. Gather all credentials (MongoDB, Gmail, etc.)
2. Have them ready before starting

### Then:
1. Follow this guide step by step
2. Add all environment variables
3. Deploy backend
4. Deploy frontend
5. Test everything

### Finally:
1. Your app is live! 🎉
2. Share the URLs
3. Monitor for errors

---

## 🆘 If Something Goes Wrong

### Build Failed?
1. Check build logs in Vercel
2. Look for error messages
3. Fix locally and push to GitHub
4. Vercel will auto-redeploy

### API Not Connecting?
1. Check VITE_API_URL in frontend
2. Make sure backend URL is correct
3. Check backend is deployed

### Database Error?
1. Check MONGODB_URI is correct
2. Check IP whitelist in MongoDB Atlas
3. Add 0.0.0.0 to whitelist

---

## 📞 Reference Links

| Service | Link |
|---------|------|
| Vercel Dashboard | https://vercel.com/dashboard |
| MongoDB Atlas | https://cloud.mongodb.com |
| Cloudinary | https://cloudinary.com |
| Razorpay | https://razorpay.com |
| Gmail App Passwords | https://myaccount.google.com/apppasswords |
| Twilio | https://www.twilio.com |

---

## ✅ Success Indicators

When everything is working:
- ✅ Frontend URL loads
- ✅ Backend API responds
- ✅ Database connected
- ✅ Images loading
- ✅ No console errors
- ✅ All features working

---

**Status**: Ready for Deployment ✅
**Time**: ~10 minutes
**Difficulty**: Easy ✅

**Let's Deploy!** 🚀
