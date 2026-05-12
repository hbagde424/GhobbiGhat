#!/usr/bin/env node

/**
 * Upload Environment Variables from .env to Vercel
 * Automatically reads .env file and uploads to Vercel projects
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const BACKEND_PROJECT = 'dhobighat';
const FRONTEND_PROJECT = 'dhobighat-frontend';
const ENV_FILE = path.join(__dirname, 'backend', '.env');

console.log('\n🚀 Vercel Environment Variables Upload Script');
console.log('='.repeat(60));

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

// Check if .env file exists
if (!fs.existsSync(ENV_FILE)) {
    console.log(`\n❌ Error: .env file not found at ${ENV_FILE}`);
    process.exit(1);
}

console.log(`✅ .env file found at ${ENV_FILE}`);

// Parse .env file
function parseEnvFile(filePath) {
    const envContent = fs.readFileSync(filePath, 'utf-8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
        // Skip comments and empty lines
        if (!line || line.startsWith('#')) return;

        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const cleanKey = key.trim();
            const cleanValue = valueParts.join('=').trim().replace(/^["']|["']$/g, '');

            // Skip empty values and development-only variables
            if (cleanValue && cleanKey !== 'PORT' && !cleanKey.includes('EXPIRE')) {
                envVars[cleanKey] = cleanValue;
            }
        }
    });

    return envVars;
}

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

// Set environment variables for a project
async function setEnvironmentVariables(projectName, envVars) {
    console.log(`\n📝 Setting up ${projectName}...`);
    console.log('-'.repeat(60));

    let successCount = 0;
    let errorCount = 0;

    for (const [key, value] of Object.entries(envVars)) {
        // Skip empty values
        if (!value) {
            console.log(`  ⏭️  ${key} (empty, skipped)`);
            continue;
        }

        try {
            const response = await makeRequest(
                'POST',
                `/v10/projects/${projectName}/env`,
                {
                    key: key,
                    value: value,
                    target: ['production']
                }
            );

            if (response.status === 200 || response.status === 201) {
                console.log(`  ✅ ${key}`);
                successCount++;
            } else if (response.status === 409) {
                // Variable already exists, update it
                console.log(`  🔄 ${key} (updating...)`);
                // Try to update
                const updateResponse = await makeRequest(
                    'PATCH',
                    `/v10/projects/${projectName}/env/${key}`,
                    {
                        value: value,
                        target: ['production']
                    }
                );
                if (updateResponse.status === 200) {
                    console.log(`  ✅ ${key} (updated)`);
                    successCount++;
                } else {
                    console.log(`  ⚠️  ${key} - Status: ${updateResponse.status}`);
                    errorCount++;
                }
            } else {
                console.log(`  ⚠️  ${key} - Status: ${response.status}`);
                errorCount++;
            }
        } catch (error) {
            console.log(`  ❌ ${key} - Error: ${error.message}`);
            errorCount++;
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('-'.repeat(60));
    console.log(`✅ Success: ${successCount} | ⚠️  Errors: ${errorCount}`);

    return { successCount, errorCount };
}

// Main function
async function main() {
    try {
        // Parse .env file
        console.log('\n📖 Parsing .env file...');
        const envVars = parseEnvFile(ENV_FILE);
        const varCount = Object.keys(envVars).length;
        console.log(`✅ Found ${varCount} environment variables`);

        // Set backend environment variables
        const backendResult = await setEnvironmentVariables(BACKEND_PROJECT, envVars);

        // Set frontend environment variables (only VITE_API_URL)
        console.log(`\n📝 Setting up ${FRONTEND_PROJECT}...`);
        console.log('-'.repeat(60));
        const frontendEnv = {
            'VITE_API_URL': 'https://dhobighat.vercel.app'
        };
        const frontendResult = await setEnvironmentVariables(FRONTEND_PROJECT, frontendEnv);

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('✅ Environment variables upload complete!');
        console.log('='.repeat(60));

        console.log('\n📋 Next Steps:');
        console.log('1. Go to: https://vercel.com/dashboard');
        console.log('2. Click on backend project: ' + BACKEND_PROJECT);
        console.log('3. Go to Deployments → Redeploy');
        console.log('4. Wait 2-3 minutes for deployment');
        console.log('5. Repeat for frontend project');
        console.log('6. Test your application');

        console.log('\n📊 Summary:');
        console.log(`   Backend: ${backendResult.successCount} success, ${backendResult.errorCount} errors`);
        console.log(`   Frontend: ${frontendResult.successCount} success, ${frontendResult.errorCount} errors`);

        console.log('\n🎉 Done!');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
