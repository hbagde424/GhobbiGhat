# ⚡ Quick Automatic Setup - 3 Commands

## 🎯 Bilkul Simple!

### Command 1: Get Vercel Token
```
Go to: https://vercel.com/account/tokens
Click: Create Token
Copy: The token
```

### Command 2: Set Token (Windows PowerShell)
```powershell
$env:VERCEL_TOKEN = "paste_your_token_here"
```

### Command 3: Run Setup Script
```bash
node setup-vercel-env.js
```

---

## ✅ Done!

Script automatically set all environment variables! 🎉

---

## 📋 Next Steps

1. Go to: https://vercel.com/dashboard
2. Click backend project
3. Go to Deployments → Redeploy
4. Wait 3 minutes
5. Click frontend project
6. Go to Deployments → Redeploy
7. Wait 3 minutes
8. Open frontend URL
9. Test everything
10. 🎉 Live!

---

## 🆘 If Error

### "VERCEL_TOKEN not set"
```powershell
$env:VERCEL_TOKEN = "your_token"
```

### "Project not found"
Check project names:
- Backend: `dhobighat-backend`
- Frontend: `dhobighat-frontend`

---

**Total Time**: ~15 minutes ⏱️
**Difficulty**: Easy ✅

**Ready?** Get your token and run the script! 🚀
