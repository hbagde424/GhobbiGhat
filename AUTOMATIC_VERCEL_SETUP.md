# 🤖 Automatic Vercel Setup - Using Script

## ✅ Bilkul! Automatic kar sakte ho!

Main ne ek script banaya hai jo automatically environment variables set karega.

---

## 🚀 Step 1: Get Vercel Token

### Vercel Token Kaise Milega:

1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name: `DhobiGhat-Setup`
4. Expiration: `7 days` (or more)
5. Click **"Create"**
6. **Copy the token** (save it somewhere safe)

---

## 🔧 Step 2: Set Environment Variable

### Windows (PowerShell):
```powershell
$env:VERCEL_TOKEN = "your_token_here"
```

### Windows (CMD):
```cmd
set VERCEL_TOKEN=your_token_here
```

### Mac/Linux:
```bash
export VERCEL_TOKEN=your_token_here
```

---

## ▶️ Step 3: Run Setup Script

### Run the script:
```bash
node setup-vercel-env.js
```

### Script will:
1. ✅ Connect to Vercel API
2. ✅ Set backend environment variables (17 total)
3. ✅ Set frontend environment variables (1 total)
4. ✅ Show success/error for each variable

---

## 📊 What Script Does

### Backend Variables (17):
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
✅ PORT
✅ FRONTEND_URL
✅ DEFAULT_COMMISSION_RATE
✅ AUTO_APPROVE_VENDORS
```

### Frontend Variables (1):
```
✅ VITE_API_URL
```

---

## ✅ After Script Runs

### Step 1: Redeploy Backend
1. Go to: https://vercel.com/dashboard
2. Click `dhobighat-backend`
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
3. Run: node setup-vercel-env.js
   ↓
4. Script sets all variables automatically
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

## 🆘 Troubleshooting

### "VERCEL_TOKEN not set"
```
Solution: Set the environment variable first
Windows: set VERCEL_TOKEN=your_token
Mac/Linux: export VERCEL_TOKEN=your_token
```

### "API Error"
```
Solution: Check if token is valid
Go to: https://vercel.com/account/tokens
Make sure token hasn't expired
```

### "Project not found"
```
Solution: Make sure project names are correct
Backend: dhobighat-backend
Frontend: dhobighat-frontend
```

---

## 📝 Script Files

### Files Created:
1. `setup-vercel-env.js` - Main setup script
2. `setup-vercel-env.ps1` - PowerShell version (optional)

### How to Run:
```bash
# Using Node.js
node setup-vercel-env.js

# Or using npm
npx node setup-vercel-env.js
```

---

## 🎉 After Everything

### Your Live URLs:
```
Frontend: https://dhobighat-frontend.vercel.app
Backend: https://dhobighat-backend.vercel.app
```

### Test:
1. Open frontend URL
2. Check if it loads
3. Try to view vendors
4. Check browser console
5. If all good → **Live! 🎉**

---

## 📞 Quick Reference

| Step | Command | Time |
|------|---------|------|
| Get Token | Go to vercel.com/account/tokens | 2 min |
| Set Token | `set VERCEL_TOKEN=...` | 1 min |
| Run Script | `node setup-vercel-env.js` | 1 min |
| Redeploy Backend | Vercel dashboard | 3 min |
| Redeploy Frontend | Vercel dashboard | 3 min |
| Test | Open URLs | 5 min |
| **Total** | | **~15 min** |

---

## ✨ Benefits of Automatic Setup

✅ No manual clicking in Vercel dashboard
✅ All variables set at once
✅ Less chance of errors
✅ Faster deployment
✅ Repeatable process

---

**Status**: Ready for Automatic Setup ✅
**Time**: ~15 minutes
**Difficulty**: Easy ✅

**Let's automate!** 🤖
