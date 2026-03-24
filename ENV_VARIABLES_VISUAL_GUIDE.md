# 🎨 Environment Variables - Visual Guide

## ❌ What's Wrong

```
Vercel Error:
"Environment Variable 'MONGODB_URI' references Secret 'mongodb_uri', 
which does not exist."
```

This happens when you use `@` symbol but the secret doesn't exist.

---

## ✅ What's Right

### Format 1: Direct Value (Recommended)
```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/db
```
✅ Works immediately
✅ No extra setup needed
✅ Simple and straightforward

### Format 2: Secret Reference (Advanced)
```
MONGODB_URI = @mongodb_uri
```
⚠️ Requires creating secret first
⚠️ More secure for sensitive data
⚠️ Extra setup needed

---

## 🚀 Step-by-Step Fix

### Step 1: Open Vercel Dashboard
```
https://vercel.com/dashboard
```

### Step 2: Select Backend Project
```
Click on: dhobighat-backend (or your project name)
```

### Step 3: Go to Settings
```
Click: Settings tab
```

### Step 4: Environment Variables
```
Click: Environment Variables
```

### Step 5: Current State (Wrong)
```
MONGODB_URI = @mongodb_uri          ❌ Wrong
JWT_SECRET = @jwt_secret            ❌ Wrong
CLOUDINARY_NAME = @cloudinary_name  ❌ Wrong
...
```

### Step 6: Delete Wrong Variables
```
Click X button next to each @variable
```

### Step 7: Add Correct Variables
```
Click: Add New Variable

MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/dhobighat ✅
JWT_SECRET = your_secret_key_here ✅
CLOUDINARY_NAME = your_name ✅
...
```

### Step 8: Redeploy
```
Go to: Deployments tab
Click: Redeploy button
Wait: 2-3 minutes
```

---

## 📊 Variable Comparison

| Variable | Wrong Format | Right Format |
|----------|--------------|--------------|
| MONGODB_URI | `@mongodb_uri` | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| JWT_SECRET | `@jwt_secret` | `your_secret_key_here` |
| CLOUDINARY_NAME | `@cloudinary_name` | `your_cloudinary_name` |
| EMAIL_USER | `@email_user` | `your_email@gmail.com` |

---

## 🎯 All Variables to Add

```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/dhobighat
JWT_SECRET = your_secret_key_here
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
RAZORPAY_KEY_ID = your_razorpay_key
RAZORPAY_KEY_SECRET = your_razorpay_secret
EMAIL_USER = your_email@gmail.com
EMAIL_PASSWORD = your_app_password
TWILIO_ACCOUNT_SID = your_twilio_sid
TWILIO_AUTH_TOKEN = your_twilio_token
TWILIO_PHONE_NUMBER = +1234567890
NODE_ENV = production
```

---

## 🔍 Where to Get Values

### MONGODB_URI
```
1. Go to: https://cloud.mongodb.com
2. Click: Connect
3. Copy: Connection String
4. Replace <password> with your password
5. Replace <dbname> with dhobighat
```

### JWT_SECRET
```
Any random string, e.g.:
your_super_secret_key_12345
```

### CLOUDINARY_*
```
1. Go to: https://cloudinary.com
2. Dashboard → Settings
3. Copy: Cloud Name, API Key, API Secret
```

### RAZORPAY_*
```
1. Go to: https://razorpay.com
2. Settings → API Keys
3. Copy: Key ID, Key Secret
```

### EMAIL_*
```
1. Gmail: Use app password (not regular password)
2. Other: Use your email credentials
```

### TWILIO_*
```
1. Go to: https://www.twilio.com
2. Console → Account SID, Auth Token
3. Phone Numbers → Your number
```

---

## ✅ Verification Checklist

- [ ] All `@` variables deleted
- [ ] All actual values added
- [ ] MONGODB_URI has correct format
- [ ] JWT_SECRET is set
- [ ] CLOUDINARY variables added
- [ ] RAZORPAY variables added
- [ ] EMAIL variables added
- [ ] TWILIO variables added
- [ ] NODE_ENV = production
- [ ] Redeploy clicked
- [ ] Deployment successful

---

## 🎊 After Fix

```
✅ Variables added correctly
✅ Deployment successful
✅ Backend running
✅ API responding
✅ Database connected
```

---

## 🆘 Still Not Working?

### Check 1: MongoDB URI Format
```
✅ Correct: mongodb+srv://user:pass@cluster.mongodb.net/dbname
❌ Wrong: @mongodb_uri
```

### Check 2: All Variables Present
```
✅ All 13 backend variables added
✅ No @ symbols in values
✅ All values are actual credentials
```

### Check 3: Redeploy
```
✅ Clicked Redeploy button
✅ Waited for deployment to complete
✅ Checked deployment logs
```

---

## 📞 Quick Reference

| Step | Action | Time |
|------|--------|------|
| 1 | Delete wrong variables | 1 min |
| 2 | Add correct variables | 3 min |
| 3 | Redeploy | 3 min |
| **Total** | **Fix Complete** | **~7 min** |

---

**Status**: Ready to Fix ✅
**Difficulty**: Easy ✅
**Time**: ~7 minutes
