# ⚡ Quick Fix: Environment Variables

## ❌ Error
```
Environment Variable "MONGODB_URI" references Secret "mongodb_uri", which does not exist.
```

## ✅ Fix (2 minutes)

### Step 1: Go to Vercel
https://vercel.com/dashboard

### Step 2: Select Backend Project
Click on your backend project

### Step 3: Settings → Environment Variables
1. Click **"Settings"** tab
2. Click **"Environment Variables"**

### Step 4: Delete Wrong Variables
Delete all variables with `@` symbol:
- Delete `MONGODB_URI = @mongodb_uri`
- Delete `JWT_SECRET = @jwt_secret`
- Delete all other `@` variables

### Step 5: Add Correct Variables
Click **"Add New Variable"** and add these:

```
Name: MONGODB_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/dhobighat
```

```
Name: JWT_SECRET
Value: your_secret_key_here
```

```
Name: CLOUDINARY_NAME
Value: your_cloudinary_name
```

```
Name: CLOUDINARY_API_KEY
Value: your_api_key
```

```
Name: CLOUDINARY_API_SECRET
Value: your_api_secret
```

```
Name: RAZORPAY_KEY_ID
Value: your_razorpay_key
```

```
Name: RAZORPAY_KEY_SECRET
Value: your_razorpay_secret
```

```
Name: EMAIL_USER
Value: your_email@gmail.com
```

```
Name: EMAIL_PASSWORD
Value: your_app_password
```

```
Name: TWILIO_ACCOUNT_SID
Value: your_twilio_sid
```

```
Name: TWILIO_AUTH_TOKEN
Value: your_twilio_token
```

```
Name: TWILIO_PHONE_NUMBER
Value: +1234567890
```

```
Name: NODE_ENV
Value: production
```

### Step 6: Redeploy
1. Go to **"Deployments"** tab
2. Click latest deployment
3. Click **"Redeploy"** button
4. Wait for deployment

---

## 🎯 Key Points

✅ **Use actual values** - Not `@` symbols
✅ **No `@` in values** - Only plain text
✅ **Redeploy after changes** - Important!
✅ **Check MongoDB URI** - Must be correct format

---

## 📝 MongoDB URI Format

```
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

Get this from MongoDB Atlas:
1. Go to MongoDB Atlas
2. Click "Connect"
3. Copy connection string
4. Replace `<password>` with your password
5. Replace `<dbname>` with `dhobighat`

---

## ✅ Done!

After redeploy, your backend should work! 🚀

---

**Time**: 2 minutes
**Difficulty**: Easy ✅
