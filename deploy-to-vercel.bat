@echo off
REM Vercel Automatic Deployment Script

echo.
echo ========================================
echo   Vercel Automatic Deployment
echo ========================================
echo.

REM Deploy Backend
echo Step 1: Deploying Backend...
echo ----------------------------------------
cd backend
echo Running: vercel --prod --force
call vercel --prod --force
cd ..

echo.
echo Step 2: Deploying Frontend...
echo ----------------------------------------
cd frontend
echo Running: vercel --prod --force
call vercel --prod --force
cd ..

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to: https://vercel.com/dashboard
echo 2. Check deployment status
echo 3. Wait for builds to complete
echo 4. Open your frontend URL
echo 5. Test your application
echo.
echo Done!
pause
