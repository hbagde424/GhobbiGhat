#!/usr/bin/env node

/**
 * Vercel Environment Variables Setup Script
 * Automatically sets environment variables for backend and frontend projects
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const BACKEND_PROJECT = 'dhobighat-backend';
const FRONTEND_PROJECT = 'dhobighat-frontend';
const TEAM_ID = 'hbagde424'; // Your Vercel team ID

// Backend environment variables
const backendEnv = {
    'MONGODB_URI': 'mongodb+srv://developer:Hh1q2w3e4r5t6y7u8i9o0p@cluster0.8ehw8jn.mongodb.net/dhobighat?retryWrites=true&w=majority',
    'JWT_SECRET': 'dhobighat-super-secret-jwt-key-change-in-production',
    'JWT_REFRESH_SECRET': 'dhobighat-refresh-secret-key-change-in-production',
    'SMTP_HOST': 'smtp.gmail.com',
    'SMTP_PORT': '587',
    'SMTP_USER': 'your-email@gmail.com',
    'SMTP_PASSWORD': 'your-app-specific-password',
    'FROM_EMAIL': 'noreply@dhobighat.com',
    'FROM_NAME': 'Digital Dhobighat',
    'CLOUDINARY_CLOUD_NAME': 'dpaui8plb',
    'CLOUDINARY_API_KEY': '873488488411495',
    'CLOUDINARY_API_SECRET': 'dVv__qFm0YH8_u6Kqfk66SmxF-c',
    'NODE_ENV': 'production',
    'PORT': '3001',
    'FRONTEND_URL': 'http://localhost:5173',
    'DEFAULT_COMMISSION_RATE': '15',
    'AUTO_APPROVE_VENDORS': 'true'
};

// Frontend environment variables
const frontendEnv = {
    'VITE_API_URL': 'https://dhobighat-backend.vercel.app'
};

console.log('\n🚀 Vercel Environment Variables Setup Script');
console.log('='.repeat(50));

// Check if VERCEL_TOKEN is set
if (!VERCEL_TOKEN) {
    console.log('\n❌ Error: VERCEL_TOKEN environment variable not set');
    console.log('\n📝 To set it:');
    console.log('   Windows: set VERCEL_TOKEN=your_token_here');
    console.log('   Mac/Linux: export VERCEL_TOKEN=your_token_here');
    console.log('\n📖 Get your token from: https://vercel.com/account/tokens');
    process.exit(1);
}

console.log('\n✅ VERCEL_TOKEN found');

// Function to make API request
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

// Function to set environment variables
async function setEnvironmentVariables(projectName, envVars) {
    console.log(`\n📝 Setting up ${projectName}...`);
    
    for (const [key, value] of Object.entries(envVars)) {
        try {
            const response = await makeRequest(
                'POST',
                `/v9/projects/${projectName}/env`,
                {
                    key: key,
                    value: value,
                    target: ['production']
                }
            );

            if (response.status === 200 || response.status === 201) {
                console.log(`  ✅ ${key}`);
            } else {
                console.log(`  ⚠️  ${key} - Status: ${response.status}`);
            }
        } catch (error) {
            console.log(`  ❌ ${key} - Error: ${error.message}`);
        }
    }
}

// Main function
async function main() {
    try {
        // Set backend environment variables
        await setEnvironmentVariables(BACKEND_PROJECT, backendEnv);

        // Set frontend environment variables
        await setEnvironmentVariables(FRONTEND_PROJECT, frontendEnv);

        console.log('\n' + '='.repeat(50));
        console.log('✅ Environment variables setup complete!');
        console.log('\n📋 Next Steps:');
        console.log('1. Go to: https://vercel.com/dashboard');
        console.log('2. Click on backend project');
        console.log('3. Go to Deployments → Redeploy');
        console.log('4. Repeat for frontend project');
        console.log('\n🎉 Done!');
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
