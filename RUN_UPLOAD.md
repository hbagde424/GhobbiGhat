# 🚀 Run Upload Script

## ⚠️ IMPORTANT: Get Token First!

### Step 1: Go to Vercel
👉 https://vercel.com/account/tokens

### Step 2: Create Token
1. Click **"Create Token"**
2. Name: `DhobiGhat-Setup`
3. Expiration: `7 days`
4. Click **"Create"**
5. **COPY THE TOKEN** (won't show again!)

---

## 💻 Step 3: Set Token in PowerShell

Open PowerShell and run:

```powershell
$env:VERCEL_TOKEN = "paste_your_token_here"
```

**Replace** `paste_your_token_here` with actual token!

---

## ▶️ Step 4: Run Script

```bash
node upload-env-to-vercel.js
```

---

## ✅ Script Will:

1. Read `.env` file
2. Upload 20+ variables to backend
3. Upload VITE_API_URL to frontend
4. Show success/error for each
5. Display summary

---

## 🎉 After Script:

1. Go to Vercel dashboard
2. Redeploy backend
3. Redeploy frontend
4. Test everything
5. **Live!**

---

**Ready?** Get token and run! 🚀
