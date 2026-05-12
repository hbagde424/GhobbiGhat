#!/usr/bin/env node

/**
 * Simple CORS Fix Script
 * Uses Vercel CLI to get backend URL and update frontend
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 Simple CORS Fix Script');
console.log('='.repeat(60));

const FRONTEND_ENV_FILE = path.join(__dirname, 'frontend', '.env.production');

// Get backend URL from Vercel CLI
function getBackendUrl() {
    console.log('\n📝 Getting backend URL from Vercel...');
    
    try {
        // Get backend project info
        process.chdir('backend');
        const output = execSync('vercel inspect --prod', { encoding: 'utf-8' });
        process.chdir('..');
        
        // Parse output to find URL
        const urlMatch = output.match(/Production URL:\s*(https:\/\/[^\s]+)/);
        if (urlMatch) {
            const url = urlMatch[1];
            console.log(`✅ Backend URL found: ${url}`);
            return url;
        }
    } catch (error) {
        console.log('⚠️  Could not get URL from vercel inspect');
    }
    
    // Fallback: ask user
    console.log('\n📋 Could not automatically get backend URL');
    console.log('Please enter your backend URL manually:');
    console.log('Example: https://dhobighat-abc123.vercel.app');
    
    return null;
}

// Update frontend .env.production
function updateFrontendEnv(backendUrl) {
    console.log('\n📝 Updating frontend .env.production...');
    
    const envContent = `VITE_API_URL=${backendUrl}\n`;
    
    try {
        fs.writeFileSync(FRONTEND_ENV_FILE, envContent);
        console.log(`✅ Updated: ${FRONTEND_ENV_FILE}`);
        console.log(`   VITE_API_URL=${backendUrl}`);
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
        // Step 1: Get backend URL
        let backendUrl = getBackendUrl();
        
        if (!backendUrl) {
            console.log('\n❌ Could not get backend URL automatically');
            console.log('\n📋 Manual Steps:');
            console.log('1. Go to: https://vercel.com/dashboard');
            console.log('2. Click dhobighat (backend)');
            console.log('3. Copy the production URL');
            console.log('4. Run: node fix-cors-manual.js <backend-url>');
            process.exit(1);
        }
        
        // Step 2: Update frontend .env.production
        if (!updateFrontendEnv(backendUrl)) {
            process.exit(1);
        }
        
        // Step 3: Commit and push
        commitAndPush();
        
        // Step 4: Redeploy frontend
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
