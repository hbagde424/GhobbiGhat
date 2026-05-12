# 🤖 Automatic Environment Variables Upload

## ✅ Bilkul Automatic!

Main ne ek script banaya hai jo `.env` file se automatically Vercel pe upload karega! 🚀

---

## 🎯 3 Simple Steps:

### **Step 1**: Get Vercel Token
```
Go to: https://vercel.com/account/tokens
Click: Create Token
Copy: The token
```

### **Step 2**: Set Token (PowerShell)
```powershell
$env:VERCEL_TOKEN = "paste_your_token_here"
```

### **Step 3**: Run Upload Script
```bash
node upload-env-to-vercel.js
```

---

## ✅ Script Automatically:

✅ Reads `.env` file
✅ Parses all variables
✅ Uploads to backend project
✅ Uploads to frontend project
✅ Shows success/error for each
✅ Handles existing variables

---

## 📊 What Gets Uploaded:

### Backend (from .env):
```
✅ MONGODB_URI
✅ JWT_SECRET
✅ JWT_REFRESH_SECRET
✅ SMTP_HOST
✅ SMTP_PORT
✅ SMTP_USER
✅ SMTP_PASSWORD
✅ FROM_EMAIL
✅ FROM_NAME
✅ CLOUDINARY_CLOUD_NAME
✅ CLOUDINARY_API_KEY
✅ CLOUDINARY_API_SECRET
✅ NODE_ENV
✅ FRONTEND_URL
✅ SUPER_ADMIN_EMAIL
✅ SUPER_ADMIN_PASSWORD
✅ DEFAULT_COMMISSION_RATE
✅ MAX_FILE_SIZE
✅ MAX_FILES_PER_UPLOAD
```

### Frontend:
```
✅ VITE_API_URL
```

---

## 🚀 After Script Runs:

### Step 1: Redeploy Backend
1. Go to: https://vercel.com/dashboard
2. Click `dhobighat`
3. Go to **"Deployments"** tab
4. Click **"Redeploy"** on latest deployment
5. Wait 2-3 minutes

### Step 2: Redeploy Frontend
1. Click `dhobighat-frontend`
2. Go to **"Deployments"** tab
3. Click **"Redeploy"** on latest deployment
4. Wait 2-3 minutes

### Step 3: Test
1. Open frontend URL
2. Check if pages load
3. Try features
4. Check console for errors

---

## 🎯 Complete Workflow

```
1. Get Vercel Token
   ↓
2. Set VERCEL_TOKEN environment variable
   ↓
3. Run: node upload-env-to-vercel.js
   ↓
4. Script uploads all variables automatically
   ↓
5. Go to Vercel dashboard
   ↓
6. Redeploy backend
   ↓
7. Redeploy frontend
   ↓
8. Test everything
   ↓
9. 🎉 Live!
```

---

## 📝 Script Features

✅ Reads from `.env` file
✅ Skips comments and empty lines
✅ Handles existing variables
✅ Shows progress for each variable
✅ Error handling
✅ Rate limiting protection
✅ Summary report

---

## 🆘 Troubleshooting

### "VERCEL_TOKEN not set"
```powershell
$env:VERCEL_TOKEN = "your_token"
```

### "Project not found"
Check project names:
- Backend: `dhobighat`
- Frontend: `dhobighat-frontend`

### "API Error"
- Check if token is valid
- Check if token hasn't expired
- Try again in a few seconds

---

## ✨ Benefits

✅ No manual clicking
✅ All variables at once
✅ Less chance of errors
✅ Faster deployment
✅ Repeatable process
✅ Reads from actual .env file

---

## 📞 Quick Reference

| Step | Command | Time |
|------|---------|------|
| Get Token | Go to vercel.com/account/tokens | 2 min |
| Set Token | `$env:VERCEL_TOKEN = "..."` | 1 min |
| Run Script | `node upload-env-to-vercel.js` | 2 min |
| Redeploy Backend | Vercel dashboard | 3 min |
| Redeploy Frontend | Vercel dashboard | 3 min |
| Test | Open URLs | 5 min |
| **Total** | | **~16 min** |

---

## 🎉 After Everything

### Your Live URLs:
```
Frontend: https://dhobighat-frontend.vercel.app
Backend: https://dhobighat.vercel.app
```

### Test:
1. Open frontend URL
2. Check if it loads
3. Try to view vendors
4. Check browser console
5. If all good → **Live! 🎉**

---

**Status**: Ready for Automatic Upload ✅
**Time**: ~15 minutes
**Difficulty**: Easy ✅

**Let's automate!** 🤖
