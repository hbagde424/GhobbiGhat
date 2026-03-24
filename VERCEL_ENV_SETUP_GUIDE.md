# 🔧 Vercel Environment Variables Setup Guide

## 📸 Screenshots Se Dekh Rahe Ho?

Bilkul! Main aapko step-by-step batata hoon kya fill karna hai! 👇

---

## 🎯 Backend Deployment - Root Directory Select

### Screenshot 1: Root Directory Selection

**Aap dekh rahe ho:**
```
Root Directory
├─ GhobbiGhat (root)
├─ backend
└─ frontend
```

**Kya Karna Hai:**
1. **`backend` folder select karo** (radio button click karo)
2. Click **"Continue"** button

---

## 🎯 Backend Deployment - Project Setup

### Screenshot 2: Project Configuration

**Aap dekh rahe ho:**
```
Vercel Team: hbagde424's projects
Project Name: hbagde424-GhobbiGhat
Application Preset: Other
```

**Kya Karna Hai:**

1. **Project Name** - Change karo:
   ```
   hbagde424-GhobbiGhat-Backend
   ```
   (Ya koi bhi naam jo aapko pasand ho)

2. **Application Preset** - Select karo:
   - Dropdown kholo
   - **"Other"** select karo (already selected hai)
   - Click outside to close

3. **Click "Deploy"** button

---

## 🔐 Environment Variables - Backend

### After Clicking Deploy, You'll See:

**"Configure Project"** page with:
- Build Command
- Output Directory
- Environment Variables

### 📝 Fill These Environment Variables:

#### 1. **Database Configuration**
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dhobighat?retryWrites=true&w=majority
```

**Kaise Milega:**
- MongoDB Atlas account banao: https://www.mongodb.com/cloud/atlas
- Free cluster create karo
- Connection string copy karo
- Username aur password replace karo

#### 2. **JWT Secrets**
```
JWT_SECRET = your-super-secret-jwt-key-12345-change-this
JWT_REFRESH_SECRET = your-refresh-secret-key-67890-change-this
```

**Kya Karo:**
- Koi bhi random string likho (jitna lamba utna better)
- Example: `MySecretKey@2024#DhobiGhat!`

#### 3. **Email Configuration**
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-app-password
FROM_EMAIL = noreply@dhobighat.com
FROM_NAME = Digital Dhobighat
```

**Kaise Milega:**
- Gmail account use karo
- 2-factor authentication enable karo
- App password generate karo: https://myaccount.google.com/apppasswords
- Woh password yahan paste karo

#### 4. **Twilio SMS (Optional)**
```
TWILIO_ACCOUNT_SID = your-twilio-account-sid
TWILIO_AUTH_TOKEN = your-twilio-auth-token
TWILIO_PHONE_NUMBER = +1234567890
```

**Kaise Milega:**
- Twilio account banao: https://www.twilio.com
- Account SID aur Auth Token copy karo
- Phone number add karo

#### 5. **Razorpay Payment**
```
RAZORPAY_KEY_ID = your-razorpay-key-id
RAZORPAY_KEY_SECRET = your-razorpay-key-secret
```

**Kaise Milega:**
- Razorpay account banao: https://razorpay.com
- Dashboard se API keys copy karo
- Test mode keys use karo initially

#### 6. **Cloudinary Images**
```
CLOUDINARY_CLOUD_NAME = your-cloud-name
CLOUDINARY_API_KEY = your-api-key
CLOUDINARY_API_SECRET = your-api-secret
```

**Kaise Milega:**
- Cloudinary account banao: https://cloudinary.com
- Dashboard se credentials copy karo
- Free tier available hai

#### 7. **Other Configuration**
```
NODE_ENV = production
PORT = 3001
FRONTEND_URL = https://your-frontend-url.vercel.app
AUTO_APPROVE_VENDORS = true
DEFAULT_COMMISSION_RATE = 15
```

**Kya Karo:**
- `NODE_ENV` = `production` (fixed)
- `PORT` = `3001` (fixed)
- `FRONTEND_URL` = Frontend URL (baad mein update karna)
- `AUTO_APPROVE_VENDORS` = `true` (testing ke liye)
- `DEFAULT_COMMISSION_RATE` = `15` (commission percentage)

---

## 📋 Environment Variables - Complete List

### Backend (All Variables)

| Variable | Value | Example |
|----------|-------|---------|
| MONGODB_URI | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dhobighat` |
| JWT_SECRET | Random secret key | `MySecret@2024#Key` |
| JWT_REFRESH_SECRET | Random refresh key | `RefreshSecret@2024#Key` |
| SMTP_HOST | Gmail SMTP | `smtp.gmail.com` |
| SMTP_PORT | Gmail port | `587` |
| SMTP_USER | Your Gmail | `your-email@gmail.com` |
| SMTP_PASSWORD | Gmail app password | `xxxx xxxx xxxx xxxx` |
| FROM_EMAIL | Sender email | `noreply@dhobighat.com` |
| FROM_NAME | Sender name | `Digital Dhobighat` |
| TWILIO_ACCOUNT_SID | Twilio SID | `ACxxxxxxxxxxxxxxxx` |
| TWILIO_AUTH_TOKEN | Twilio token | `xxxxxxxxxxxxxxxx` |
| TWILIO_PHONE_NUMBER | Twilio number | `+1234567890` |
| RAZORPAY_KEY_ID | Razorpay key | `rzp_test_xxxxxxxx` |
| RAZORPAY_KEY_SECRET | Razorpay secret | `xxxxxxxxxxxxxxxx` |
| CLOUDINARY_CLOUD_NAME | Cloud name | `dpaui8plb` |
| CLOUDINARY_API_KEY | API key | `873488488411495` |
| CLOUDINARY_API_SECRET | API secret | `dVv__qFm0YH8_u6Kqfk66SmxF-c` |
| NODE_ENV | Environment | `production` |
| PORT | Server port | `3001` |
| FRONTEND_URL | Frontend URL | `https://your-frontend.vercel.app` |
| AUTO_APPROVE_VENDORS | Auto approve | `true` |
| DEFAULT_COMMISSION_RATE | Commission % | `15` |

---

## 🎨 Frontend Deployment

### Step 1: Add New Project
1. Go back to Vercel dashboard
2. Click **"Add New"** → **"Project"**
3. Select same repository
4. Select **`frontend`** folder as root directory

### Step 2: Project Configuration
1. **Project Name**: `hbagde424-GhobbiGhat-Frontend`
2. **Application Preset**: `Other`
3. Click **"Deploy"**

### Step 3: Environment Variables - Frontend

**Only 1 variable needed:**

```
VITE_API_URL = https://your-backend-url.vercel.app
```

**Replace** `https://your-backend-url.vercel.app` with actual backend URL!

---

## 🔄 How to Add Environment Variables in Vercel

### Method 1: During Deployment
1. Before clicking "Deploy"
2. Look for **"Environment Variables"** section
3. Click **"Add"** button
4. Fill in:
   - **Name**: Variable name (e.g., `MONGODB_URI`)
   - **Value**: Variable value (e.g., `mongodb+srv://...`)
5. Click **"Add"** again for next variable
6. Click **"Deploy"**

### Method 2: After Deployment
1. Go to Vercel dashboard
2. Click on your project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left menu
5. Click **"Add New"** button
6. Fill in Name and Value
7. Click **"Save"**
8. Go to **"Deployments"** tab
9. Click **"Redeploy"** on latest deployment

---

## 📊 Step-by-Step Vercel Setup

### Backend Deployment Steps:

```
1. Vercel Dashboard
   ↓
2. Click "Add New" → "Project"
   ↓
3. Select Repository: hbagde424/GhobbiGhat
   ↓
4. Select Root Directory: backend
   ↓
5. Click "Continue"
   ↓
6. Project Name: hbagde424-GhobbiGhat-Backend
   ↓
7. Application Preset: Other
   ↓
8. Add Environment Variables (22 variables)
   ↓
9. Click "Deploy"
   ↓
10. Wait 2-3 minutes
   ↓
11. Copy Backend URL
```

### Frontend Deployment Steps:

```
1. Vercel Dashboard
   ↓
2. Click "Add New" → "Project"
   ↓
3. Select Repository: hbagde424/GhobbiGhat
   ↓
4. Select Root Directory: frontend
   ↓
5. Click "Continue"
   ↓
6. Project Name: hbagde424-GhobbiGhat-Frontend
   ↓
7. Application Preset: Other
   ↓
8. Add Environment Variable:
   VITE_API_URL = https://backend-url.vercel.app
   ↓
9. Click "Deploy"
   ↓
10. Wait 2-3 minutes
   ↓
11. Copy Frontend URL
```

---

## ✅ Checklist

### Before Deployment
- [ ] GitHub account ready
- [ ] Vercel account ready
- [ ] MongoDB Atlas account ready
- [ ] Cloudinary account ready
- [ ] Razorpay account ready
- [ ] Gmail account ready
- [ ] Twilio account ready (optional)

### Backend Deployment
- [ ] Root directory: `backend`
- [ ] All 22 environment variables added
- [ ] Deployment successful
- [ ] Backend URL copied

### Frontend Deployment
- [ ] Root directory: `frontend`
- [ ] VITE_API_URL set correctly
- [ ] Deployment successful
- [ ] Frontend URL copied

### Testing
- [ ] Backend URL accessible
- [ ] Frontend URL accessible
- [ ] API calls working
- [ ] No console errors

---

## 🆘 Common Issues

### "Build Failed"
- Check build logs in Vercel
- Make sure environment variables are correct
- Check package.json scripts

### "API Not Connecting"
- Check VITE_API_URL in frontend
- Make sure backend URL is correct
- Check CORS in backend

### "Database Connection Error"
- Check MONGODB_URI is correct
- Check IP whitelist in MongoDB Atlas
- Add 0.0.0.0 to whitelist

### "Email Not Sending"
- Check SMTP credentials
- Check Gmail app password
- Enable "Less secure apps" if needed

---

## 📞 Quick Reference

### Vercel Dashboard
https://vercel.com/dashboard

### MongoDB Atlas
https://cloud.mongodb.com

### Cloudinary
https://cloudinary.com

### Razorpay
https://razorpay.com

### Gmail App Passwords
https://myaccount.google.com/apppasswords

### Twilio
https://www.twilio.com

---

## 🎉 After Deployment

### Your URLs:
```
Frontend: https://hbagde424-GhobbiGhat-Frontend.vercel.app
Backend: https://hbagde424-GhobbiGhat-Backend.vercel.app
```

### Test:
1. Open frontend URL
2. Check if pages load
3. Try to view vendors
4. Check browser console for errors

---

**Status**: Ready for Environment Variable Setup ✅
**Time**: ~30 minutes (gathering credentials)
**Difficulty**: Easy ✅
