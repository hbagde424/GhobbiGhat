# Cloudinary Setup

To enable photo uploads, you need to configure Cloudinary credentials in your backend `.env` file.

## 1. Update Backend .env

Open `backend/.env` and add/update the following variables:

```env
CLOUDINARY_CLOUD_NAME=dpaui8plb
CLOUDINARY_API_KEY=873488488411495
CLOUDINARY_API_SECRET=your_actual_api_secret_here
```

> **IMPORTANT:**
> 1. The **API Secret** is a short string (approx 27 characters), NOT the long `CLOUDINARY_URL=...` string.
> 2. Copy **only** the secret from your Cloudinary Dashboard (reveal it by clicking the eye icon).
> 3. Ensure there are no spaces around the `=` sign.

## 2. Restart Backend

After updating the `.env` file, restart the backend server:

```bash
cd backend
npm run dev
```

## Features Implemented

### Vendor Side
- **Pickup Confirmation:** When marking an order as "Picked Up", vendors can now:
  - Upload photos of the items collected
  - Enter the total number of items picked up
- **Delivery Confirmation:** When marking an order as "Delivered", vendors can now:
  - Upload photos of the cleaned items
  - Enter the total number of items returned (validated against pickup count)

### User Side
- **Order Details:** Users can view the full details of their order, including:
  - Pickup photos and item count
  - Delivery photos and returned item count
  - Status timeline
  - Payment details

### Backend
- Secure file upload handling using Multer
- Cloudinary integration for image storage
- Database schema updates to track item counts and photo URLs
