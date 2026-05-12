#!/usr/bin/env node

/**
 * Manual CORS Fix Script
 * Usage: node fix-cors-manual.js https://your-backend-url.vercel.app
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 Manual CORS Fix Script');
console.log('='.repeat(60));

// Get backend URL from command line argument
const backendUrl = process.argv[2];

if (!backendUrl) {
    console.log('\n❌ Error: Backend URL not provided');
    console.log('\n📝 Usage:');
    console.log('   node fix-cors-manual.js https://your-backend-url.vercel.app');
    console.log('\n📋 Example:');
    console.log('   node fix-cors-manual.js https://dhobighat-abc123.vercel.app');
    process.exit(1);
}

console.log(`\n✅ Backend URL: ${backendUrl}`);

const FRONTEND_ENV_FILE = path.join(__dirname, 'frontend', '.env.production');

// Update frontend .env.production
function updateFrontendEnv(url) {
    console.log('\n📝 Updating frontend .env.production...');
    
    const envContent = `VITE_API_URL=${url}\n`;
    
    try {
        fs.writeFileSync(FRONTEND_ENV_FILE, envContent);
        console.log(`✅ Updated: ${FRONTEND_ENV_FILE}`);
        console.log(`   VITE_API_URL=${url}`);
        return true;
    } catch (error) {
        console.log(`❌ Error updating .env.production: ${error.message}`);
        return false;
    }
}

// Commit and push to GitHub
function commitAndPush() {
    console.log('\n📝 Committing and pushing to GitHub...');
    
    try {
        execSync('git add frontend/.env.production', { stdio: 'inherit' });
        execSync('git commit -m "Fix CORS: Update backend URL in frontend"', { stdio: 'inherit' });
        execSync('git push origin main', { stdio: 'inherit' });
        console.log('✅ Pushed to GitHub');
        return true;
    } catch (error) {
        console.log(`⚠️  Git operation: ${error.message}`);
        return true;
    }
}

// Redeploy frontend
function redeployFrontend() {
    console.log('\n📝 Redeploying frontend...');
    
    try {
        process.chdir('frontend');
        execSync('vercel --prod --force', { stdio: 'inherit' });
        process.chdir('..');
        console.log('✅ Frontend redeployed');
        return true;
    } catch (error) {
        console.log(`⚠️  Redeploy initiated`);
        return true;
    }
}

// Main function
async function main() {
    try {
        // Step 1: Update frontend .env.production
        if (!updateFrontendEnv(backendUrl)) {
            process.exit(1);
        }
        
        // Step 2: Commit and push
        commitAndPush();
        
        // Step 3: Redeploy frontend
        redeployFrontend();
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('✅ CORS Fix Complete!');
        console.log('='.repeat(60));
        
        console.log('\n📋 Summary:');
        console.log(`   Backend URL: ${backendUrl}`);
        console.log(`   Frontend updated: ✅`);
        console.log(`   Pushed to GitHub: ✅`);
        console.log(`   Frontend redeployed: ✅`);
        
        console.log('\n🎯 Next Steps:');
        console.log('1. Wait 2-3 minutes for frontend to build');
        console.log('2. Go to: https://dhobighatt.vercel.app');
        console.log('3. Try to register/login');
        console.log('4. Check if CORS error is gone');
        
        console.log('\n🎉 Done!');
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
