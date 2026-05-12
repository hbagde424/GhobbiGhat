# 🔗 Get Backend URL from Vercel

## 📋 Steps:

### Step 1: Go to Vercel Dashboard
👉 https://vercel.com/dashboard

### Step 2: Click Backend Project
👉 Click `dhobighat`

### Step 3: Find Production URL
1. Look at the top of the page
2. You'll see a URL like:
   ```
   https://dhobighat-abc123def456.vercel.app
   ```
3. **Copy this URL**

---

## 💻 Run Fix Script

Once you have the URL, run:

```bash
node fix-cors-manual.js https://your-backend-url.vercel.app
```

**Replace** `https://your-backend-url.vercel.app` with actual URL!

### Example:
```bash
node fix-cors-manual.js https://dhobighat-abc123def456.vercel.app
```

---

## ✅ Script Will:

1. ✅ Update frontend/.env.production
2. ✅ Commit to GitHub
3. ✅ Push to GitHub
4. ✅ Redeploy frontend

---

## 🎯 After Script:

1. Wait 2-3 minutes
2. Go to: https://dhobighatt.vercel.app
3. Try to register/login
4. CORS error should be gone! ✅

---

**Status**: Ready to Get Backend URL ✅
