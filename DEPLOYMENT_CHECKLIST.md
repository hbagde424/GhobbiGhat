# ✅ Deployment Checklist - DhobiGhat

## 🎯 Pre-Deployment (Local)

### Code Quality
- [ ] No TypeScript errors: `npm run lint`
- [ ] No console errors
- [ ] All imports correct
- [ ] No hardcoded URLs
- [ ] Environment variables used properly

### Testing
- [ ] Frontend builds: `npm run build`
- [ ] Backend builds: `npm run build`
- [ ] Local testing done
- [ ] API endpoints working
- [ ] Database connected

### Git Setup
- [ ] Code committed: `git add .`
- [ ] Commit message clear: `git commit -m "message"`
- [ ] Pushed to GitHub: `git push origin main`
- [ ] GitHub repository public/accessible

---

## 🔧 Backend Deployment (Vercel)

### Project Setup
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Repository selected
- [ ] Root directory: `backend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### Environment Variables
- [ ] `MONGODB_URI` added
- [ ] `JWT_SECRET` added
- [ ] `CLOUDINARY_NAME` added
- [ ] `CLOUDINARY_API_KEY` added
- [ ] `CLOUDINARY_API_SECRET` added
- [ ] `RAZORPAY_KEY_ID` added
- [ ] `RAZORPAY_KEY_SECRET` added
- [ ] `EMAIL_USER` added
- [ ] `EMAIL_PASSWORD` added
- [ ] `TWILIO_ACCOUNT_SID` added
- [ ] `TWILIO_AUTH_TOKEN` added
- [ ] `TWILIO_PHONE_NUMBER` added
- [ ] `NODE_ENV` = `production`

### Deployment
- [ ] Deploy button clicked
- [ ] Build successful
- [ ] No build errors
- [ ] Deployment URL noted
- [ ] API health check: `/api/health`

### Post-Deployment
- [ ] Backend URL working
- [ ] Database connected
- [ ] Seed scripts run (if needed)
- [ ] API endpoints responding

---

## 🎨 Frontend Deployment (Vercel)

### Project Setup
- [ ] New Vercel project created
- [ ] GitHub repository selected
- [ ] Root directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL` = backend URL
- [ ] All other env vars set

### Deployment
- [ ] Deploy button clicked
- [ ] Build successful
- [ ] No build errors
- [ ] Deployment URL noted

### Post-Deployment
- [ ] Frontend URL working
- [ ] Pages loading
- [ ] Navigation working
- [ ] API calls connecting to backend

---

## 🔗 Integration Testing

### Frontend to Backend
- [ ] API calls working
- [ ] Data loading
- [ ] Forms submitting
- [ ] Authentication working
- [ ] No CORS errors

### User Flows
- [ ] Login/Register working
- [ ] Vendor listing working
- [ ] Vendor details loading
- [ ] Order creation working
- [ ] Payment flow working

### Error Handling
- [ ] Error messages showing
- [ ] Network errors handled
- [ ] Validation working
- [ ] Fallbacks in place

---

## 🗄️ Database

### MongoDB Atlas
- [ ] Cluster created
- [ ] Connection string copied
- [ ] IP whitelist configured (0.0.0.0 for dev)
- [ ] Database user created
- [ ] Collections created

### Data
- [ ] Services seeded
- [ ] Vendors seeded
- [ ] Images added
- [ ] Test data present

---

## 🔐 Security

### Environment Variables
- [ ] No secrets in code
- [ ] All secrets in Vercel
- [ ] .env files in .gitignore
- [ ] .env.example created

### CORS
- [ ] CORS enabled in backend
- [ ] Frontend URL whitelisted
- [ ] API endpoints protected

### Database
- [ ] IP whitelist set
- [ ] Strong passwords used
- [ ] Connection string secure

---

## 📊 Monitoring

### Vercel Dashboard
- [ ] Deployments visible
- [ ] Build logs accessible
- [ ] Environment variables set
- [ ] Domains configured

### Logs
- [ ] Backend logs accessible
- [ ] Frontend errors visible
- [ ] Database logs checked
- [ ] No critical errors

---

## 🚀 Go Live

### Final Checks
- [ ] All tests passed
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] All features working

### Documentation
- [ ] README updated
- [ ] Deployment guide created
- [ ] Environment variables documented
- [ ] Troubleshooting guide ready

### Announcement
- [ ] Team notified
- [ ] Users informed
- [ ] Support ready
- [ ] Monitoring active

---

## 📝 URLs to Save

```
Frontend: https://your-frontend-url.vercel.app
Backend: https://your-backend-url.vercel.app
GitHub: https://github.com/YOUR_USERNAME/dhobighat
Vercel Dashboard: https://vercel.com/dashboard
MongoDB Atlas: https://cloud.mongodb.com
```

---

## 🆘 Troubleshooting

### If Build Fails
1. Check build logs in Vercel
2. Run `npm run build` locally
3. Fix errors
4. Push to GitHub
5. Redeploy

### If API Not Connecting
1. Check `VITE_API_URL` in frontend
2. Check backend URL is correct
3. Check CORS in backend
4. Check network tab in browser

### If Database Not Connecting
1. Check `MONGODB_URI` in backend
2. Check IP whitelist in MongoDB
3. Check credentials
4. Check connection string format

---

## ✨ Success Indicators

- ✅ Frontend loads without errors
- ✅ Backend API responding
- ✅ Database connected
- ✅ Images loading
- ✅ Forms submitting
- ✅ Authentication working
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Performance good
- ✅ All features working

---

## 📞 Support

If anything goes wrong:
1. Check Vercel logs
2. Check browser console
3. Check network tab
4. Read error messages carefully
5. Check VERCEL_DEPLOYMENT_GUIDE.md

---

**Status**: Ready for Deployment ✅
**Last Updated**: March 23, 2026
