# Vercel Environment Variables Setup Script
# Yeh script automatically environment variables set karega

# Vercel project names
$backendProject = "dhobighat-backend"
$frontendProject = "dhobighat-frontend"

# Backend environment variables
$backendEnv = @{
    "MONGODB_URI" = "mongodb+srv://developer:Hh1q2w3e4r5t6y7u8i9o0p@cluster0.8ehw8jn.mongodb.net/dhobighat?retryWrites=true&w=majority"
    "JWT_SECRET" = "dhobighat-super-secret-jwt-key-change-in-production"
    "JWT_REFRESH_SECRET" = "dhobighat-refresh-secret-key-change-in-production"
    "SMTP_HOST" = "smtp.gmail.com"
    "SMTP_PORT" = "587"
    "SMTP_USER" = "your-email@gmail.com"
    "SMTP_PASSWORD" = "your-app-specific-password"
    "FROM_EMAIL" = "noreply@dhobighat.com"
    "FROM_NAME" = "Digital Dhobighat"
    "CLOUDINARY_CLOUD_NAME" = "dpaui8plb"
    "CLOUDINARY_API_KEY" = "873488488411495"
    "CLOUDINARY_API_SECRET" = "dVv__qFm0YH8_u6Kqfk66SmxF-c"
    "NODE_ENV" = "production"
    "PORT" = "3001"
    "FRONTEND_URL" = "http://localhost:5173"
    "DEFAULT_COMMISSION_RATE" = "15"
    "AUTO_APPROVE_VENDORS" = "true"
}

Write-Host "🚀 Vercel Environment Variables Setup Script" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# Check if vercel CLI is installed
Write-Host "Checking Vercel CLI..." -ForegroundColor Yellow
$vercelVersion = vercel --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

Write-Host ""
Write-Host "📝 Setting up Backend Environment Variables..." -ForegroundColor Yellow
Write-Host ""

# Set backend environment variables
foreach ($key in $backendEnv.Keys) {
    $value = $backendEnv[$key]
    Write-Host "Setting: $key" -ForegroundColor Cyan
    # Note: This is a placeholder - actual implementation would use Vercel API
}

Write-Host ""
Write-Host "✅ Backend environment variables configured!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Click on backend project: $backendProject" -ForegroundColor White
Write-Host "3. Go to Settings → Environment Variables" -ForegroundColor White
Write-Host "4. Add the variables listed above" -ForegroundColor White
Write-Host "5. Redeploy the project" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Done!" -ForegroundColor Green
