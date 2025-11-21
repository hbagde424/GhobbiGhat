# SSL Certificate Error Fix

## Problem
The backend was throwing an "Internal Server Error" with the message:
`Error: self-signed certificate in certificate chain`

This occurs when Node.js rejects the SSL certificate of an external service (like Cloudinary, MongoDB, or Email) because of:
1.  A local proxy (corporate network).
2.  Antivirus software inspecting HTTPS traffic.
3.  Self-signed certificates in development.

## Solution
We explicitly told Node.js to accept self-signed certificates when running in **development mode**.

**File Modified:** `backend/src/server.ts`

**Code Added:**
```typescript
if (config.env === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}
```

## Security Note
This setting is **ONLY** applied when `NODE_ENV=development`. It is **NOT** safe for production and is correctly scoped to development only.

## Verification
Restart the backend server (`npm run dev`). The error should disappear when uploading files or connecting to the database.
