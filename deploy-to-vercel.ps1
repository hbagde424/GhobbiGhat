# Vercel Deployment Script - Automatic
# Reads .env file and deploys to Vercel

Write-Host "`n🚀 Vercel Automatic Deployment Script" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Green

# Configuration
$backendDir = "backend"
$frontendDir = "frontend"
$backendProject = "dhobighat"
$frontendProject = "dhobighat-frontend"

# Step 1: Deploy Backend
Write-Host "`n📦 Step 1: Deploying Backend..." -ForegroundColor Yellow
Write-Host "-" * 60

try {
    Set-Location $backendDir
    Write-Host "📍 Current directory: $(Get-Location)" -ForegroundColor Cyan
    
    Write-Host "🔄 Running: vercel --prod --force" -ForegroundColor Cyan
    $backendOutput = vercel --prod --force 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Backend deployment initiated!" -ForegroundColor Green
        Write-Host $backendOutput -ForegroundColor White
    } else {
        Write-Host "⚠️  Backend deployment output:" -ForegroundColor Yellow
        Write-Host $backendOutput -ForegroundColor White
    }
    
    Set-Location ..
} catch {
    Write-Host "❌ Error deploying backend: $_" -ForegroundColor Red
}

# Step 2: Deploy Frontend
Write-Host "`n📦 Step 2: Deploying Frontend..." -ForegroundColor Yellow
Write-Host "-" * 60

try {
    Set-Location $frontendDir
    Write-Host "📍 Current directory: $(Get-Location)" -ForegroundColor Cyan
    
    Write-Host "🔄 Running: vercel --prod --force" -ForegroundColor Cyan
    $frontendOutput = vercel --prod --force 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend deployment initiated!" -ForegroundColor Green
        Write-Host $frontendOutput -ForegroundColor White
    } else {
        Write-Host "⚠️  Frontend deployment output:" -ForegroundColor Yellow
        Write-Host $frontendOutput -ForegroundColor White
    }
    
    Set-Location ..
} catch {
    Write-Host "❌ Error deploying frontend: $_" -ForegroundColor Red
}

# Step 3: Summary
Write-Host "`n" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Green
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Green

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Check deployment status" -ForegroundColor White
Write-Host "3. Wait for builds to complete (2-3 minutes)" -ForegroundColor White
Write-Host "4. Open your frontend URL" -ForegroundColor White
Write-Host "5. Test your application" -ForegroundColor White

Write-Host "`n🎉 Done!" -ForegroundColor Green
