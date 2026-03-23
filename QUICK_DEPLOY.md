# ⚡ Quick Deploy to Vercel - 5 Minutes

## 🚀 Super Quick Steps

### Step 1: Push to GitHub (2 min)
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy Backend (1.5 min)
1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository
4. Set **Root Directory** to `backend`
5. Add these **Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_url
   JWT_SECRET=your_secret
   CLOUDINARY_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   RAZORPAY_KEY_ID=your_id
   RAZORPAY_KEY_SECRET=your_secret
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_password
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=your_number
   NODE_ENV=production
   ```
6. Click **Deploy**
7. Wait for deployment ✅
8. **Copy Backend URL** (e.g., `https://dhobighat-backend.vercel.app`)

### Step 3: Deploy Frontend (1.5 min)
1. Click **"Add New"** → **"Project"** again
2. Select same GitHub repository
3. Set **Root Directory** to `frontend`
4. Add **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```
   (Replace with actual backend URL from Step 2)
5. Click **Deploy**
6. Wait for deployment ✅
7. **Copy Frontend URL** (e.g., `https://dhobighat-frontend.vercel.app`)

---

## ✅ Done!

Your app is now live:
- **Frontend**: https://your-frontend-url.vercel.app
- **Backend**: https://your-backend-url.vercel.app

---

## 🧪 Quick Test

1. Open frontend URL in browser
2. Try to view vendors
3. Check if images load
4. Try to create an order
5. Check browser console for errors

---

## 🆘 If Something Goes Wrong

### Build Failed?
- Check Vercel build logs
- Run `npm run build` locally to see errors
- Fix errors and push to GitHub
- Redeploy

### API Not Connecting?
- Check `VITE_API_URL` in frontend environment variables
- Make sure backend URL is correct
- Check backend is deployed and working

### Database Not Connecting?
- Check `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0)
- Check credentials

---

## 📚 Full Guide

For detailed instructions, see: **VERCEL_DEPLOYMENT_GUIDE.md**

---

**Time to Deploy**: ~5 minutes ⚡
**Difficulty**: Easy ✅
