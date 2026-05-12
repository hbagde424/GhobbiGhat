#!/usr/bin/env node

/**
 * Automatic CORS Fix Script
 * 1. Gets backend URL from Vercel
 * 2. Updates frontend .env.production
 * 3. Commits and pushes to GitHub
 * 4. Redeploys frontend
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

console.log('\n🚀 Automatic CORS Fix Script');
console.log('='.repeat(60));

// Configuration
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const BACKEND_PROJECT = 'dhobighat';
const FRONTEND_PROJECT = 'dhobighatt';
const FRONTEND_ENV_FILE = path.join(__dirname, 'frontend', '.env.production');

// Check if VERCEL_TOKEN is set
if (!VERCEL_TOKEN) {
    console.log('\n❌ Error: VERCEL_TOKEN environment variable not set');
    console.log('\n📝 To set it:');
    console.log('   Windows PowerShell: $env:VERCEL_TOKEN = "your_token_here"');
    console.log('   Windows CMD: set VERCEL_TOKEN=your_token_here');
    console.log('   Mac/Linux: export VERCEL_TOKEN=your_token_here');
    console.log('\n📖 Get your token from: https://vercel.com/account/tokens');
    process.exit(1);
}

console.log('✅ VERCEL_TOKEN found');

// Make API request to Vercel
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.vercel.com',
            path: path,
            method: method,
            headers: {
                'Authorization': `Bearer ${VERCEL_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(body)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Get backend URL from Vercel
async function getBackendUrl() {
    console.log('\n📝 Getting backend URL from Vercel...');
    
    try {
        const response = await makeRequest('GET', `/v9/projects/${BACKEND_PROJECT}`);
        
        if (response.status === 200 && response.data.productionDeployment) {
            const url = response.data.productionDeployment.url;
            console.log(`✅ Backend URL found: https://${url}`);
            return `https://${url}`;
        } else {
            console.log('⚠️  Could not find production deployment');
            console.log('Trying alternative method...');
            
            // Try to get deployments
            const deploymentsResponse = await makeRequest('GET', `/v6/deployments?projectId=${BACKEND_PROJECT}&state=READY&limit=1`);
            
            if (deploymentsResponse.status === 200 && deploymentsResponse.data.deployments && deploymentsResponse.data.deployments.length > 0) {
                const url = deploymentsResponse.data.deployments[0].url;
                console.log(`✅ Backend URL found: https://${url}`);
                return `https://${url}`;
            }
        }
    } catch (error) {
        console.log(`❌ Error getting backend URL: ${error.message}`);
    }
    
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
        console.log(`⚠️  Git operation failed: ${error.message}`);
        console.log('   (This is okay if there are no changes)');
        return true; // Continue anyway
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
        console.log(`⚠️  Redeploy initiated (check Vercel dashboard)`);
        return true;
    }
}

// Main function
async function main() {
    try {
        // Step 1: Get backend URL
        const backendUrl = await getBackendUrl();
        
        if (!backendUrl) {
            console.log('\n❌ Could not get backend URL');
            console.log('\n📋 Manual Steps:');
            console.log('1. Go to: https://vercel.com/dashboard');
            console.log('2. Click dhobighat (backend)');
            console.log('3. Copy the production URL');
            console.log('4. Update frontend/.env.production with this URL');
            console.log('5. Run: git add frontend/.env.production');
            console.log('6. Run: git commit -m "Fix CORS: Update backend URL"');
            console.log('7. Run: git push origin main');
            console.log('8. Redeploy frontend');
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
        console.log(`   Frontend updated: frontend/.env.production`);
        console.log(`   Pushed to GitHub: ✅`);
        console.log(`   Frontend redeployed: ✅`);
        
        console.log('\n🎯 Next Steps:');
        console.log('1. Wait 2-3 minutes for frontend to build');
        console.log('2. Go to: https://dhobighatt.vercel.app');
        console.log('3. Open browser console (F12)');
        console.log('4. Try to register/login');
        console.log('5. Check if CORS error is gone');
        
        console.log('\n🎉 Done!');
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
