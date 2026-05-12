# 🔑 Get Vercel Token

## 📋 Steps to Get Token:

### Step 1: Go to Vercel Account
👉 https://vercel.com/account/tokens

### Step 2: Create New Token
1. Click **"Create Token"** button
2. Fill:
   ```
   Token Name: DhobiGhat-Setup
   Expiration: 7 days (or more)
   ```
3. Click **"Create"**

### Step 3: Copy Token
1. Token will be displayed
2. **Copy it** (it won't show again!)
3. Save it somewhere safe

---

## 🔐 Token Format

Token looks like:
```
vercel_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 💻 Set Token in PowerShell

### Copy this command:
```powershell
$env:VERCEL_TOKEN = "paste_your_token_here"
```

### Replace `paste_your_token_here` with actual token

### Example:
```powershell
$env:VERCEL_TOKEN = "vercel_abc123def456ghi789"
```

---

## ✅ Verify Token is Set

Run this:
```powershell
echo $env:VERCEL_TOKEN
```

Should show your token!

---

## 🚀 Next Step

After setting token, run:
```bash
node upload-env-to-vercel.js
```

---

**Status**: Ready to Get Token ✅
