# Email Credentials Error Fix

## Problem
The backend was throwing an "Internal Server Error" with the message:
`Error: Missing credentials for "PLAIN"`

This occurred because the application attempted to send an email (e.g., for order status updates) but the SMTP credentials (`SMTP_USER`, `SMTP_PASSWORD`) were missing in the `.env` file.

## Solution
We modified the `sendEmail` function in `backend/src/services/email.service.ts` to make email sending **optional** if credentials are missing.

**Changes Implemented:**
1.  **Credential Check:** Before attempting to send, we check if `config.smtp.user` and `config.smtp.password` exist.
2.  **Graceful Fallback:** If credentials are missing, we log the email details to the console instead of crashing.
3.  **Error Handling:** In development mode, even if sending fails (e.g., network error), we catch the error and don't throw it, preventing the API request from failing.

**Code Snippet:**
```typescript
if (!config.smtp.user || !config.smtp.password) {
  console.log('⚠️ SMTP credentials missing. Skipping email send.');
  // ... log email details ...
  return;
}
```

## Verification
1.  Try updating an order status again.
2.  The request should succeed (200 OK).
3.  Check the backend terminal logs; you should see the "Email Preview" instead of an error.
